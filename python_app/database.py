"""
نظام إدارة الحسابات والتحكم في خطوط الإنتاج والفرز - Database Manager
يدعم إدارة خطوط الإنتاج المتعددة، التنبيهات المخصصة حسب نوع الخط، المخزون، والفواتير
"""

import sqlite3
import os
import json
from datetime import datetime

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "agrobotic_erp.db")


class DatabaseManager:
    """إدارة قاعدة البيانات SQLite للتحكم في خطوط الإنتاج، التنبيهات، والعمليات المالية"""

    def __init__(self, db_path=DB_FILE):
        self.db_path = db_path
        self.init_db()
        self.seed_initial_data()

    def get_connection(self):
        """الحصول على اتصال بقاعدة البيانات مع دعم Row Factory للوصول بالمفتاح"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def init_db(self):
        """إنشاء الجداول الأساسية لمنظومة إدارة خطوط الإنتاج والمحاسبة"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            # 1. جدول خطوط الإنتاج والفرز (Production & Sorting Lines)
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS production_lines (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                code TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                line_type TEXT NOT NULL,        -- 'citrus', 'apple', 'dates', 'packaging', 'custom'
                status TEXT NOT NULL DEFAULT 'idle', -- 'running', 'idle', 'maintenance', 'alert'
                speed_cps REAL DEFAULT 12.0,    -- سرعة السير (أكواب / قطع في الثانية)
                lanes_count INTEGER DEFAULT 4,   -- عدد الحارات (Lanes)
                target_capacity_tph REAL DEFAULT 8.0, -- الطاقة المستهدفة (طن / ساعة)
                current_output_tph REAL DEFAULT 0.0,  -- الطاقة الإنتاجية الحالية
                optical_model TEXT DEFAULT 'GlobalScan 7 RGB+NIR',
                camera_ip TEXT DEFAULT '192.168.1.120',
                plc_ip TEXT DEFAULT '192.168.1.50',
                active_preset TEXT DEFAULT 'صنف تصدير نخب أول',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """)

            # 2. جدول تنبيهات وإنذارات خطوط الإنتاج المخصصة حسب نوع الخط (Line Alerts Engine)
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS line_alerts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                line_id INTEGER NOT NULL,
                alert_code TEXT NOT NULL,       -- كود الإنذار ALM-PRS-212 / ALM-CAM-101 .. إلخ
                line_type TEXT NOT NULL,        -- نوع الخط المرتبط بالتنبيه
                severity TEXT NOT NULL,         -- 'warning' تحذير, 'critical' حرج, 'info' معلومة
                title TEXT NOT NULL,            -- عنوان التنبيه
                message TEXT NOT NULL,          -- رسالة التنبيه الفنية
                recommended_action TEXT NOT NULL, -- الإجراء والتصحيح المقترح فوراً
                status TEXT NOT NULL DEFAULT 'active', -- 'active' نشط, 'resolved' تم حله
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (line_id) REFERENCES production_lines (id) ON DELETE CASCADE
            )
            """)

            # 3. جدول وصفات ومعايير الفرز لكل خط (Sorting Presets)
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS line_presets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                line_type TEXT NOT NULL,
                preset_name TEXT NOT NULL,
                min_size_mm REAL DEFAULT 65.0,
                max_size_mm REAL DEFAULT 85.0,
                color_threshold REAL DEFAULT 80.0,
                defect_tolerance_pct REAL DEFAULT 4.0,
                ejector_delay_ms INTEGER DEFAULT 42,
                extra_params_json TEXT DEFAULT '{}'
            )
            """)

            # 4. جدول سجل أداء وقياسات الخط اللحظية (Telemetry Logs)
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS line_telemetry_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                line_id INTEGER NOT NULL,
                speed_cps REAL,
                total_fruits_processed INTEGER,
                export_grade_pct REAL,
                local_grade_pct REAL,
                waste_pct REAL,
                air_pressure_bar REAL,
                recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (line_id) REFERENCES production_lines (id) ON DELETE CASCADE
            )
            """)

            # 5. جدول الأصناف والمخزون المرتبط بالإنتاج
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sku TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                buy_price REAL NOT NULL DEFAULT 0.0,
                sell_price REAL NOT NULL DEFAULT 0.0,
                quantity REAL NOT NULL DEFAULT 0.0,
                unit TEXT NOT NULL DEFAULT 'kg',
                min_stock_alert REAL NOT NULL DEFAULT 10.0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """)

            # 6. جدول الفواتير
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS invoices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                invoice_number TEXT UNIQUE NOT NULL,
                invoice_type TEXT NOT NULL DEFAULT 'sale',
                party_name TEXT NOT NULL,
                subtotal REAL NOT NULL DEFAULT 0.0,
                vat_rate REAL NOT NULL DEFAULT 14.0,
                vat_amount REAL NOT NULL DEFAULT 0.0,
                grand_total REAL NOT NULL DEFAULT 0.0,
                status TEXT NOT NULL DEFAULT 'completed',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """)

            # 7. جدول بنود الفواتير
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS invoice_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                invoice_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                sku TEXT NOT NULL,
                product_name TEXT NOT NULL,
                quantity REAL NOT NULL,
                unit_price REAL NOT NULL,
                line_total REAL NOT NULL,
                FOREIGN KEY (invoice_id) REFERENCES invoices (id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products (id)
            )
            """)

            # 8. جدول المعاملات والحركات المالية
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tx_type TEXT NOT NULL,
                reference_id TEXT,
                description TEXT NOT NULL,
                amount REAL NOT NULL DEFAULT 0.0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """)

            # 9. جدول إعدادات وتهيئة النظام الأولية والاسم التجاري (System Settings & Commercial Branding)
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS system_settings (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """)

            # 10. جدول الأجهزة والملحقات الصناعية (الموازين، الطابعات، الحساسات، الكروت الإلكترونية)
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS peripherals_devices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                category TEXT NOT NULL, -- 'scale', 'printer', 'sensor', 'card'
                name TEXT NOT NULL,
                model TEXT NOT NULL,
                interface TEXT NOT NULL, -- 'RS-485', 'Modbus TCP', 'Ethernet ZPL', 'USB-VirtualCOM', 'Analog 4-20mA', 'Digital IO'
                port_ip TEXT NOT NULL,
                baud_rate INTEGER DEFAULT 9600,
                status TEXT NOT NULL DEFAULT 'connected', -- 'connected', 'testing', 'offline', 'error'
                current_value REAL DEFAULT 0.0,
                unit TEXT DEFAULT '',
                config_json TEXT DEFAULT '{}',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """)

            # 11. جدول سجلات عمليات الوزن اللحظي والديناميكي (Dynamic Weighing Logs)
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS weighing_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                line_id INTEGER,
                fruit_id INTEGER,
                weight_grams REAL NOT NULL,
                caliber_grade TEXT NOT NULL,
                tare_offset REAL DEFAULT 0.0,
                recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """)

            # 12. جدول مهام وسجلات الطباعة الصناعية (Industrial Print Jobs)
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS print_jobs_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                printer_name TEXT NOT NULL,
                label_type TEXT NOT NULL, -- 'box_label', 'pallet_tag', 'expiry_lot'
                batch_code TEXT NOT NULL,
                barcode_data TEXT NOT NULL,
                printed_content TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'printed',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """)

            conn.commit()

    def seed_initial_data(self):
        """إدخال خطوط الإنتاج الافتراضية والتنبيهات المخصصة والبيانات الأولية"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            # فحص إذا كانت خطوط الإنتاج مضافة
            cursor.execute("SELECT COUNT(*) FROM production_lines")
            if cursor.fetchone()[0] == 0:
                initial_lines = [
                    (
                        "LINE-CIT-01",
                        "خط فرز وتدريج الموالح الذكي (Citrus Master 4-Lane)",
                        "citrus",
                        "running",
                        14.0,
                        4,
                        10.5,
                        9.8,
                        "GlobalScan 7 RGB+NIR 4K",
                        "192.168.1.120",
                        "192.168.1.50",
                        "برتقال فالنسيا نخب أول تصدير",
                    ),
                    (
                        "LINE-APP-02",
                        "خط تفريغ وتدريج التفاحيات المائي (Pome Flume Line)",
                        "apple",
                        "running",
                        10.0,
                        2,
                        6.0,
                        5.4,
                        "Insight 2 NIR Internal Browning",
                        "192.168.1.122",
                        "192.168.1.51",
                        "تفاح جالا أحمر قياسي",
                    ),
                    (
                        "LINE-DAT-03",
                        "خط فحص وفرز التمور بالأشعة (Date Vision Line)",
                        "dates",
                        "idle",
                        8.0,
                        2,
                        3.5,
                        0.0,
                        "Viotec UV + Multispectral Moisture",
                        "192.168.1.124",
                        "192.168.1.52",
                        "تمر مجهول سوبر جامبو",
                    ),
                    (
                        "LINE-PKG-04",
                        "خط التعبئة الآلية بالأذرع الروبوتية (Robotic LinePack)",
                        "packaging",
                        "running",
                        22.0,
                        2,
                        12.0,
                        11.2,
                        "Delta Robot Vision Guidance",
                        "192.168.1.126",
                        "192.168.1.53",
                        "تعبئة صواني كرتون 48 حبة",
                    ),
                ]
                cursor.executemany("""
                INSERT INTO production_lines 
                (code, name, line_type, status, speed_cps, lanes_count, target_capacity_tph, current_output_tph, optical_model, camera_ip, plc_ip, active_preset)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, initial_lines)

                # إضافة تنبيهات مخصصة مبدئية حسب نوع كل خط
                initial_alerts = [
                    (
                        1,
                        "ALM-PRS-212",
                        "citrus",
                        "warning",
                        "انخفاض ضغط هواء بوابات الطرد (5.2 Bar)",
                        "ضغط الهواء المغذي لبوابات الطرد السريعة بالخط أقل من الحد الآمن (6 Bar) مما قد يسبب خطأ في إخراج الثمار.",
                        "فحص كمبروسر الهواء المركزي، صمام التغذية الرئيسي، وفلاتر الهواء للحارة 3.",
                    ),
                    (
                        1,
                        "ALM-CAM-104",
                        "citrus",
                        "info",
                        "تنبيه اتساخ عدسة الكاميرا الضوئية بالحارة 2",
                        "رصد ضبابية خفيفة على مستشعر اللون للكاميرا العلوية بالحارة 2 بسبب غبار شمع الموالح.",
                        "تفعيل نفث الهواء الذاتي للعدسة أو مسح العدسة بقطعة مايكروفايبر جافة.",
                    ),
                    (
                        2,
                        "ALM-TMP-301",
                        "apple",
                        "warning",
                        "ارتفاع حرارة مياه حوض التفريغ المائي (16.5°C)",
                        "درجة حرارة مياه التفريغ أعلى من المعدل المثالي للتفاح (10-12°C)، مما قد يؤثر على صلابة القشرة.",
                        "تشغيل وحدة التبريد Chiller الملحقة بالحوض والتأكد من دورة المياه.",
                    ),
                    (
                        4,
                        "ALM-VAC-502",
                        "packaging",
                        "critical",
                        "ضعف تفريغ شفاط الروبوت ذراع رقم 2 (-0.45 Bar)",
                        "فقدان في قوة إحكام الشفاط (Vacuum) لذراع دلتا مما قد يؤدي لسقوط الثمار داخل الصواني.",
                        "فحص كؤوس السيليكون المطاطية ومضخة الفاكيوم الخاصة بالخلية الروبوتية.",
                    ),
                ]
                cursor.executemany("""
                INSERT INTO line_alerts 
                (line_id, alert_code, line_type, severity, title, message, recommended_action)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """, initial_alerts)

            # فحص المنتجات
            cursor.execute("SELECT COUNT(*) FROM products")
            if cursor.fetchone()[0] == 0:
                initial_products = [
                    ("CIT-VAL-01", "برتقال فالنسيا نخب أول تصدير", "موالح", 12.0, 24.0, 1500.0, "kg", 100.0),
                    ("CIT-NAV-02", "برتقال أبو سرة صنف قياسي", "موالح", 9.5, 18.0, 2200.0, "kg", 150.0),
                    ("APP-GAL-03", "تفاح جالا أحمر فاخر (صندوق 18 كجم)", "تفاحيات", 380.0, 520.0, 120.0, "box", 20.0),
                    ("DAT-MED-04", "تمر مجهول سوبر جامبو (كرتونة 5 كجم)", "تمور", 650.0, 920.0, 85.0, "box", 15.0),
                    ("AVO-HAS-05", "أفوكادو هاس تصدير ناضج للأكل", "استوائي", 45.0, 80.0, 450.0, "kg", 50.0),
                    ("PKG-TRY-06", "صواني كرتون مقسمة 48 حبة (Line Pack)", "مواد تعبئة", 3.2, 5.5, 3000.0, "unit", 500.0),
                    ("PKG-PLT-07", "بالتات خشبية يورو قياسية معالجة حرارياً", "لوجستيات", 140.0, 210.0, 60.0, "unit", 10.0),
                ]
                cursor.executemany("""
                INSERT INTO products (sku, name, category, buy_price, sell_price, quantity, unit, min_stock_alert)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, initial_products)

                cursor.execute("""
                INSERT INTO invoices (invoice_number, invoice_type, party_name, subtotal, vat_rate, vat_amount, grand_total)
                VALUES ('INV-2026-0001', 'sale', 'شركة الأندلس لتصدير الحاصلات', 12480.0, 14.0, 1747.2, 14227.2)
                """)
                inv_id = cursor.lastrowid

                cursor.execute("""
                INSERT INTO invoice_items (invoice_id, product_id, sku, product_name, quantity, unit_price, line_total)
                VALUES (?, 1, 'CIT-VAL-01', 'برتقال فالنسيا نخب أول تصدير', 520.0, 24.0, 12480.0)
                """, (inv_id,))

                cursor.execute("""
                INSERT INTO transactions (tx_type, reference_id, description, amount)
                VALUES ('مبيعات', 'INV-2026-0001', 'فاتورة مبيعات تصدير - شركة الأندلس', 14227.2)
                """)

            # فحص وتعبئة الاسم التجاري الافتراضي
            cursor.execute("SELECT COUNT(*) FROM system_settings WHERE key = 'commercial_brand_name'")
            if cursor.fetchone()[0] == 0:
                branding_data = [
                    ('commercial_brand_name', 'Falcon Eye Agrobotic OS - منظومة عين الصقر'),
                    ('brand_tagline', 'المنظومة الذكية لإدارة والتحكم في خطوط الفرز والتعبئة والأتمتة الزراعية'),
                    ('company_legal_name', 'عين الصقر للهندسة والأنظمة الذكية'),
                    ('facility_name', 'محطة الفرز والتحزيم النموذجية للتصدير'),
                    ('currency_symbol', 'EGP'),
                    ('default_vat_pct', '14.0'),
                    ('active_production_type', 'citrus')
                ]
                cursor.executemany("INSERT OR REPLACE INTO system_settings (key, value) VALUES (?, ?)", branding_data)

            # فحص وتعبئة كروت التحكم، الموازين، الطابعات، والحساسات
            cursor.execute("SELECT COUNT(*) FROM peripherals_devices")
            if cursor.fetchone()[0] == 0:
                initial_devices = [
                    # 1. الموازين الصناعية وديناميكية الوزن (Scales & Dynamic Checkweighers)
                    ('scale', 'ميزان السير اللحظي عالي السرعة (Dynamic Checkweigher)', 'Mettler Toledo / LoadCell HX711', 'Modbus TCP', '192.168.1.70', 115200, 'connected', 214.5, 'g', '{"calibration_factor": 1.024, "tare_offset": 0.0, "sample_rate_hz": 200, "precision_g": 0.5}'),
                    ('scale', 'ميزان فرز الصناديق النهائي (End-of-Line Scale)', 'CAS CI-200A Industrial Scale', 'RS-485 Modbus', 'COM3 / /dev/ttyUSB0', 9600, 'connected', 18.4, 'kg', '{"max_weight_kg": 60, "division_g": 10, "auto_tare": true}'),
                    
                    # 2. الطابعات الصناعية وطابعات الباركود والملصقات (Printers & Coders)
                    ('printer', 'طابعة ملصقات الكراتين والباركود (Barcode & QR Labeler)', 'Zebra ZT411 Industrial (300 DPI)', 'Ethernet ZPL', '192.168.1.80', 9100, 'connected', 1.0, 'job', '{"label_width_mm": 100, "label_height_mm": 150, "protocol": "ZPL II", "dpi": 300}'),
                    ('printer', 'طابعة نفث الحبر لتواريخ الإنتاج واللوط (TIJ Inkjet Batch Coder)', 'Videojet 1580 / Wolke TIJ', 'Ethernet TCP', '192.168.1.81', 8080, 'connected', 1.0, 'job', '{"print_lines": 3, "font_size_pt": 12, "auto_lot_counter": true}'),
                    ('printer', 'طابعة بطاقات البالتات الشاملة (Pallet Tag Applicator)', 'TSC TTP-2410MT High-Speed', 'USB-VirtualCOM', 'COM4', 19200, 'connected', 1.0, 'job', '{"tag_type": "GS1-128", "width_mm": 150}'),

                    # 3. الحساسات الصناعية (Complete Sensors Suite)
                    ('sensor', 'حساس عد الثمار الكهروضوئي (Photoelectric Fruit Counter)', 'Keyence PR-M51 Optical Through-Beam', 'Digital IO', 'DI_00 (PLC Rack 0)', 0, 'connected', 1420.0, 'pulse', '{"response_time_us": 500, "beam_type": "Infrared"}'),
                    ('sensor', 'حساس الليزر ثلاثي الأبعاد لقياس القطر (Laser 3D Profile)', 'Sick OD Mini Triangulation Laser', 'Analog 4-20mA', 'AI_01 (16-bit ADC)', 0, 'connected', 76.4, 'mm', '{"min_range_mm": 40, "max_range_mm": 120, "accuracy_mm": 0.2}'),
                    ('sensor', 'حساس فحص السكرية والصلابة (NIR Brix Spectrometer)', 'Specim FX10 Hyperspectral NIR', 'GigE Vision', '192.168.1.125', 0, 'connected', 11.8, 'Brix%', '{"spectral_range_nm": "900-1700nm", "correlation_r2": 0.94}'),
                    ('sensor', 'إنكودر نبضات السير فائق الدقة (Rotary Line Encoder)', 'Autonics E50S 2500 PPR Quadrature', 'High-Speed Counter', 'HSC_0 (PLC)', 0, 'connected', 14.0, 'cups/s', '{"pulses_per_revolution": 2500, "diameter_mm": 120}'),
                    ('sensor', 'حساس ضغط شبكة الهواء المضغوط (Air Pressure Switch)', 'SMC ISE30A Digital Pressure Sensor', 'Analog 0-10V', 'AI_02', 0, 'connected', 6.8, 'Bar', '{"min_safe_bar": 6.0, "max_safe_bar": 8.5}'),
                    ('sensor', 'حساس حرارة مياه المعالجة والتبريد (RTD PT100)', 'Endress+Hauser PT100 4-Wire RTD', 'Modbus RTU', '192.168.1.72', 9600, 'connected', 11.4, '°C', '{"range_c": "-10 to 60", "alarm_high_c": 16.0}'),

                    # 4. الكروت الإلكترونية ووحدات الـ DAQ (Electronic Cards & Controllers)
                    ('card', 'كارت مشغلات بوابات الطرد فائق السرعة (16-Ch MOSFET Card)', 'OctoPower-16 Industrial Opto-MOSFET', 'SPI / Modbus RTU', 'COM1 / RS-485', 115200, 'connected', 16.0, 'channels', '{"voltage": "24VDC", "current_per_ch": "5A", "pulse_speed_us": 200}'),
                    ('card', 'كارت مرحلات التحكم في المواتير والسير (8-Ch Relay Board)', 'Omron Industrial 8-Ch SPDT Relay Module', 'Digital IO', 'DO_00..07', 0, 'connected', 8.0, 'relays', '{"contact_rating": "10A 250VAC", "snubber_protection": true}'),
                    ('card', 'كارت تحويل إشارات خلايا الوزن (4-Ch 24-Bit ADC Board)', 'TI ADS1256 High-Precision Strain Gauge DAQ', 'RS-485 Modbus', 'COM2', 19200, 'connected', 4.0, 'cells', '{"adc_bits": 24, "samples_per_sec": 30000, "pga_gain": 64}'),
                    ('card', 'بوابة الاتصال الصناعي المعزول (Isolated USB-to-RS485 Hub)', 'Moxa UPort 1450 Industrial Converter', 'USB-to-Serial', '/dev/ttyUSB_HUB', 115200, 'connected', 4.0, 'ports', '{"isolation_kv": 2.5, "baud_max": 921600}')
                ]
                cursor.executemany("""
                INSERT INTO peripherals_devices 
                (category, name, model, interface, port_ip, baud_rate, status, current_value, unit, config_json)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, initial_devices)

            conn.commit()

    # ==========================================
    # دوال إدارة خطوط الإنتاج والتحكم (Line Operations)
    # ==========================================

    def get_all_lines(self):
        """استرجاع جميع خطوط الإنتاج المسجلة"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM production_lines ORDER BY id ASC")
            return [dict(row) for row in cursor.fetchall()]

    def get_line_by_id(self, line_id):
        """استرجاع بيانات خط إنتاج محدد"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM production_lines WHERE id = ?", (line_id,))
            row = cursor.fetchone()
            return dict(row) if row else None

    def add_production_line(self, code, name, line_type, lanes_count=4, speed_cps=12.0, target_capacity=8.0, optical_model="", camera_ip="", plc_ip="", active_preset=""):
        """إضافة خط إنتاج جديد إلى المنظومة"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO production_lines 
            (code, name, line_type, status, speed_cps, lanes_count, target_capacity_tph, current_output_tph, optical_model, camera_ip, plc_ip, active_preset)
            VALUES (?, ?, ?, 'idle', ?, ?, ?, 0.0, ?, ?, ?, ?)
            """, (code, name, line_type, speed_cps, lanes_count, target_capacity, optical_model, camera_ip, plc_ip, active_preset))
            line_id = cursor.lastrowid

            # إضافة تنبيه تعريفي أولي
            self.trigger_alert(
                line_id=line_id,
                alert_code="INF-SYS-001",
                line_type=line_type,
                severity="info",
                title=f"تم تسجيل الخط الجديد ({name})",
                message=f"الخط جاهز للتشغيل وتهيئة الحساسات لنوع {line_type}.",
                recommended_action="إجراء معايرة أولية لحساسات الوزن والكاميرا قبل بدء الإنتاج."
            )
            conn.commit()
            return line_id

    def update_line_control(self, line_id, status=None, speed_cps=None, output_tph=None, preset=None):
        """تحديث حالة التشغيل وسرعة السير والطاقة الإنتاجية للخط"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            updates = []
            params = []
            if status is not None:
                updates.append("status = ?")
                params.append(status)
            if speed_cps is not None:
                updates.append("speed_cps = ?")
                params.append(speed_cps)
            if output_tph is not None:
                updates.append("current_output_tph = ?")
                params.append(output_tph)
            if preset is not None:
                updates.append("active_preset = ?")
                params.append(preset)

            if updates:
                params.append(line_id)
                query = f"UPDATE production_lines SET {', '.join(updates)} WHERE id = ?"
                cursor.execute(query, params)
                conn.commit()

    def delete_production_line(self, line_id):
        """حذف خط إنتاج وكافة سجلاته وتنبيهاته"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM production_lines WHERE id = ?", (line_id,))
            conn.commit()

    # ==========================================
    # محرك التنبيهات المخصصة حسب نوع الخط (Alerts Engine)
    # ==========================================

    def get_line_alerts(self, line_id=None, line_type=None, status="active"):
        """استرجاع التنبيهات حسب الخط أو نوع الخط أو الحالة"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            query = """
            SELECT a.*, l.name as line_name, l.code as line_code 
            FROM line_alerts a
            JOIN production_lines l ON a.line_id = l.id
            WHERE 1=1
            """
            params = []
            if line_id is not None:
                query += " AND a.line_id = ?"
                params.append(line_id)
            if line_type is not None:
                query += " AND a.line_type = ?"
                params.append(line_type)
            if status is not None:
                query += " AND a.status = ?"
                params.append(status)

            query += " ORDER BY CASE a.severity WHEN 'critical' THEN 1 WHEN 'warning' THEN 2 ELSE 3 END, a.created_at DESC"
            cursor.execute(query, params)
            return [dict(row) for row in cursor.fetchall()]

    def trigger_alert(self, line_id, alert_code, line_type, severity, title, message, recommended_action):
        """إطلاق تنبيه فني مخصص حسب نوع الخط"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO line_alerts (line_id, alert_code, line_type, severity, title, message, recommended_action, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'active')
            """, (line_id, alert_code, line_type, severity, title, message, recommended_action))
            alert_id = cursor.lastrowid

            # إذا كان التنبيه حرجاً (critical)، نقوم بتحديث حالة الخط إلى 'alert'
            if severity == "critical":
                cursor.execute("UPDATE production_lines SET status = 'alert' WHERE id = ?", (line_id,))

            conn.commit()
            return alert_id

    def resolve_alert(self, alert_id):
        """إلغاء أو حل التنبيه"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE line_alerts SET status = 'resolved' WHERE id = ?", (alert_id,))
            conn.commit()

    def get_line_alert_catalog_by_type(self, line_type):
        """كتالوج التنبيهات النموذجية لكل نوع خط للمساعدة في الفحص والاختبار"""
        catalog = {
            "citrus": [
                {
                    "code": "ALM-PRS-212",
                    "severity": "warning",
                    "title": "انخفاض ضغط هواء بوابات الطرد السريعة (< 5.8 Bar)",
                    "message": "ضغط الهواء غير كافٍ لفتح بوابات الطرد الهوائي بالسرعة المطلوبة للأكواب، قد يحدث خلط بين درجات الفرز.",
                    "action": "مراجعة صمام الضغط الرئيسي وتنظيف الفلتر الهوائي لوحدة الطرد.",
                },
                {
                    "code": "ALM-CAM-104",
                    "severity": "warning",
                    "title": "ضبابية عدسة الكاميرا الضوئية - غبار الشمع",
                    "message": "تراكم خفيف للغبار وبقايا التشميع على زجاج حجرة التصوير العلوية للحارات.",
                    "action": "تفعيل دورة نفث الهواء المضغوط الذاتي لتنظيف العدسات أو المسح اليدوي.",
                },
                {
                    "code": "ALM-EXP-401",
                    "severity": "critical",
                    "title": "هبوط مفاجئ في نسبة التصدير النخب الأول (< 65%)",
                    "message": "نسبة استبعاد الثمار المصابة بالندبات والتربس ارتفعت فوق الحد المسموح للشحنة.",
                    "action": "إيقاف السير مؤقتاً ومراجعة فحص عينات الشحنة الخام وإعادة ضبط حساسية العيوب السطحية.",
                },
            ],
            "apple": [
                {
                    "code": "ALM-TMP-301",
                    "severity": "warning",
                    "title": "ارتفاع درجة حرارة مياه التفريغ (> 15°C)",
                    "message": "حرارة المياه داخل قنوات التفريغ المائي تتجاوز المعدل الأمثل للحفاظ على تماسك أنسجة التفاح.",
                    "action": "تشغيل وحدة التبريد Chiller والتحقق من سريان مياه التعويض الباردة.",
                },
                {
                    "code": "ALM-NIR-205",
                    "severity": "critical",
                    "title": "رصد كدمات داخلية غير مرئية (Internal Browning) في الصنف",
                    "message": "مستشعر طيف الأشعة تحت الحمراء NIR رصد تلفاً داخلياً في لب الثمار بنسبة تتجاوز 8%.",
                    "action": "تحويل مخرج الدفعة الحالية تلقائياً إلى مسار التصنيع والعصير، وإبلاغ إدارة الجودة.",
                },
                {
                    "code": "ALM-LVL-102",
                    "severity": "warning",
                    "title": "انخفاض منسوب مياه أحواض تفريغ الصناديق Flume",
                    "message": "منسوب المياه أقل من حساس الأمان مما قد يؤدي لاصطدام الثمار بجوانب الحوض.",
                    "action": "فتح صمام التغذية الآلي ومراجعة مضخة تدوير المياه.",
                },
            ],
            "dates": [
                {
                    "code": "ALM-MST-401",
                    "severity": "warning",
                    "title": "انحراف نسبة رطوبة التمور عن المواصفة (خارج نطاق 18-22%)",
                    "message": "مستشعر الرطوبة الضوئي سجل ثماراً ذات رطوبة مرتفعة قد تسبب التخمر داخل العبوات المغلقة.",
                    "action": "إعادة توجيه الثمار الرطبة إلى خط التجفيف وإعادة المعايرة.",
                },
                {
                    "code": "ALM-BRX-302",
                    "severity": "info",
                    "title": "قراءة متوسط تركيز السكريات Brix: 68°",
                    "message": "درجة السكر ضمن النطاق الممتاز للمجهول الفاخر.",
                    "action": "مواصلة الفرز القياسي وتوثيق الدفعة في سجل الصادرات.",
                },
                {
                    "code": "ALM-SKN-209",
                    "severity": "warning",
                    "title": "ارتفاع نسبة انفصال القشرة (Loose Skin > 12%)",
                    "message": "الكاميرات رصدت انفصالاً في القشرة الخارجية يتجاوز مواصفة الدرجة الأولى.",
                    "action": "تحويل المخرجات إلى درجة الفرز الثانية (Standard Grade).",
                },
            ],
            "packaging": [
                {
                    "code": "ALM-VAC-502",
                    "severity": "critical",
                    "title": "انخفاض تفريغ شفاط الروبوت ذراع 2 (< -0.6 Bar)",
                    "message": "ضغط الشفط لذراع دلتا غير كافٍ لحمل الثمار مما يتسبب في سقوطها قبل إنزالها بالكرتون.",
                    "action": "فحص كؤوس الشفط المطاطية والتأكد من عدم انسداد فلتر الفاكيوم.",
                },
                {
                    "code": "ALM-TRY-601",
                    "severity": "warning",
                    "title": "قرب نفاد الصواني الكرتونية في ملقم الخط (Tray Feeder)",
                    "message": "المتبقي في برج الصواني يكفي لأقل من 3 دقائق تشغيل.",
                    "action": "تزويد وحدة التلقيم بحزم كرتون جديدة مقاس 48 حبة.",
                },
                {
                    "code": "ALM-PLT-701",
                    "severity": "info",
                    "title": "اكتمل رص البالتة رقم 14 - في انتظار النقل",
                    "message": "تم رص 70 كرتونة بنجاح على البالتة وجاهزة للربط والاستلام.",
                    "action": "استدعاء ونش الشوكة أو عربة AGV لنقل البالتة لمنطقة التبريد السريع.",
                },
            ],
            "custom": [
                {
                    "code": "ALM-GEN-001",
                    "severity": "warning",
                    "title": "تجاوز حد السرعة المعياري للخط",
                    "message": "سرعة السير الحالية تتجاوز الطاقة القصوى لحساسات الفحص.",
                    "action": "تخفيض السرعة بنسبة 10% لضمان دقة القراءات.",
                }
            ],
        }
        return catalog.get(line_type, catalog["custom"])

    # ==========================================
    # دوال لوحة التحكم العامة والمؤشرات
    # ==========================================

    def get_dashboard_metrics(self):
        """حساب المؤشرات المدمجة لخطوط الإنتاج والعمليات المحاسبية"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            # 1. إحصائيات الخطوط
            cursor.execute("SELECT COUNT(*) FROM production_lines")
            total_lines = cursor.fetchone()[0]

            cursor.execute("SELECT COUNT(*) FROM production_lines WHERE status = 'running'")
            running_lines = cursor.fetchone()[0]

            cursor.execute("SELECT COALESCE(SUM(current_output_tph), 0) FROM production_lines WHERE status = 'running'")
            total_output_tph = cursor.fetchone()[0]

            # 2. إحصائيات التنبيهات النشطة
            cursor.execute("SELECT COUNT(*) FROM line_alerts WHERE status = 'active'")
            active_alerts_count = cursor.fetchone()[0]

            cursor.execute("SELECT COUNT(*) FROM line_alerts WHERE status = 'active' AND severity = 'critical'")
            critical_alerts_count = cursor.fetchone()[0]

            # 3. إحصائيات المبيعات والمخزون
            cursor.execute("SELECT COALESCE(SUM(grand_total), 0) FROM invoices WHERE invoice_type = 'sale'")
            total_sales = cursor.fetchone()[0]

            cursor.execute("SELECT COALESCE(SUM(grand_total), 0) FROM invoices WHERE invoice_type = 'purchase'")
            total_purchases = cursor.fetchone()[0]

            cursor.execute("SELECT COALESCE(SUM(quantity * buy_price), 0) FROM products")
            inventory_val = cursor.fetchone()[0]

            cursor.execute("SELECT COUNT(*) FROM products WHERE quantity <= min_stock_alert")
            low_stock_count = cursor.fetchone()[0]

            return {
                "total_lines": total_lines,
                "running_lines": running_lines,
                "total_output_tph": round(total_output_tph, 1),
                "active_alerts_count": active_alerts_count,
                "critical_alerts_count": critical_alerts_count,
                "total_sales": total_sales,
                "total_purchases": total_purchases,
                "inventory_val": inventory_val,
                "low_stock_count": low_stock_count,
            }

    # ==========================================
    # دوال المخزون والفواتير والتقارير
    # ==========================================

    def get_all_products(self, search_query=""):
        """استرجاع جميع الأصناف مع دعم البحث"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            if search_query:
                q = f"%{search_query}%"
                cursor.execute(
                    "SELECT * FROM products WHERE name LIKE ? OR sku LIKE ? OR category LIKE ? ORDER BY id DESC",
                    (q, q, q)
                )
            else:
                cursor.execute("SELECT * FROM products ORDER BY id DESC")
            return [dict(row) for row in cursor.fetchall()]

    def add_product(self, sku, name, category, buy_price, sell_price, quantity, unit, min_stock):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO products (sku, name, category, buy_price, sell_price, quantity, unit, min_stock_alert)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (sku, name, category, buy_price, sell_price, quantity, unit, min_stock))
            prod_id = cursor.lastrowid
            cursor.execute("""
            INSERT INTO transactions (tx_type, reference_id, description, amount)
            VALUES ('رصيد افتتاحي', ?, ?, ?)
            """, (sku, f"إضافة صنف جديد: {name}", float(quantity) * float(buy_price)))
            conn.commit()
            return prod_id

    def update_product(self, prod_id, sku, name, category, buy_price, sell_price, quantity, unit, min_stock):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            UPDATE products
            SET sku=?, name=?, category=?, buy_price=?, sell_price=?, quantity=?, unit=?, min_stock_alert=?
            WHERE id=?
            """, (sku, name, category, buy_price, sell_price, quantity, unit, min_stock, prod_id))
            conn.commit()

    def delete_product(self, prod_id):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM products WHERE id = ?", (prod_id,))
            conn.commit()

    def create_sale_invoice(self, party_name, items, vat_rate=14.0):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            subtotal = sum(item["quantity"] * item["unit_price"] for item in items)
            vat_amount = round(subtotal * (vat_rate / 100.0), 2)
            grand_total = round(subtotal + vat_amount, 2)

            cursor.execute("SELECT COUNT(*) FROM invoices")
            inv_seq = cursor.fetchone()[0] + 1
            inv_number = f"INV-2026-{str(inv_seq).zfill(4)}"

            cursor.execute("""
            INSERT INTO invoices (invoice_number, invoice_type, party_name, subtotal, vat_rate, vat_amount, grand_total)
            VALUES (?, 'sale', ?, ?, ?, ?, ?)
            """, (inv_number, party_name, subtotal, vat_rate, vat_amount, grand_total))
            invoice_id = cursor.lastrowid

            for item in items:
                cursor.execute("""
                INSERT INTO invoice_items (invoice_id, product_id, sku, product_name, quantity, unit_price, line_total)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """, (
                    invoice_id,
                    item["product_id"],
                    item["sku"],
                    item["name"],
                    item["quantity"],
                    item["unit_price"],
                    item["quantity"] * item["unit_price"]
                ))
                cursor.execute("UPDATE products SET quantity = quantity - ? WHERE id = ?", (item["quantity"], item["product_id"]))

            cursor.execute("""
            INSERT INTO transactions (tx_type, reference_id, description, amount)
            VALUES ('مبيعات', ?, ?, ?)
            """, (inv_number, f"فاتورة مبيعات للعميل: {party_name}", grand_total))

            conn.commit()
            return {"invoice_id": invoice_id, "invoice_number": inv_number, "subtotal": subtotal, "vat": vat_amount, "grand_total": grand_total}

    def get_all_transactions(self):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM transactions ORDER BY id DESC")
            return [dict(row) for row in cursor.fetchall()]

    def get_recent_invoices(self, limit=10):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM invoices ORDER BY id DESC LIMIT ?", (limit,))
            return [dict(row) for row in cursor.fetchall()]

    # ==========================================
    # إعدادات وتهيئة النظام الأولية (Initial Setup & Configuration)
    # ==========================================

    def get_setting(self, key, default=None):
        """الحصول على قيمة إعداد من جدول الإعدادات"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT value FROM system_settings WHERE key = ?", (key,))
            row = cursor.fetchone()
            return row["value"] if row else default

    def set_setting(self, key, value):
        """حفظ أو تحديث إعداد في جدول الإعدادات"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO system_settings (key, value, updated_at)
            VALUES (?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
            """, (key, str(value)))
            conn.commit()

    def is_initial_setup_completed(self):
        """فحص ما إذا كان المستخدم قد أتم الإعداد الأولي للبرنامج"""
        val = self.get_setting("initial_setup_completed", "false")
        return val.lower() in ("true", "1", "yes")

    def get_system_config(self):
        """استرجاع بيانات تهيئة المنشأة ونمط التشغيل النشط"""
        return {
            "setup_completed": self.is_initial_setup_completed(),
            "facility_name": self.get_setting("facility_name", "محطة الفرز والتدريج الذكية"),
            "production_type": self.get_setting("production_type", "citrus"),
            "operating_mode": self.get_setting("operating_mode", "sorting_and_packing"),
            "currency": self.get_setting("currency", "ج.م"),
            "default_vat_rate": float(self.get_setting("default_vat_rate", "14.0")),
            "lanes_count": int(self.get_setting("default_lanes_count", "4")),
            "speed_cps": float(self.get_setting("default_speed_cps", "12.0")),
        }

    def apply_initial_setup(self, facility_name, production_type, operating_mode, lanes_count=4, speed_cps=12.0, currency="ج.م", vat_rate=14.0):
        """
        تهيئة المنظومة بالكامل حسب نوع الإنتاج ونظام التشغيل المحدد في الإعداد الأولي:
        - حفظ اسم المنشأة والعملة ونسبة الضريبة
        - تخصيص الخط الرئيسي الحاكم وتهيئته
        - توليد تنبيهات واختبارات الحساسات المطابقة لنوع الإنتاج
        """
        self.set_setting("facility_name", facility_name)
        self.set_setting("production_type", production_type)
        self.set_setting("operating_mode", operating_mode)
        self.set_setting("default_lanes_count", str(lanes_count))
        self.set_setting("default_speed_cps", str(speed_cps))
        self.set_setting("currency", currency)
        self.set_setting("default_vat_rate", str(vat_rate))
        self.set_setting("initial_setup_completed", "true")

        # تهيئة الخط الأول حسب نوع الإنتاج المختار
        with self.get_connection() as conn:
            cursor = conn.cursor()

            type_info = {
                "citrus": {
                    "code": "LINE-CIT-MAIN",
                    "name": f"خط فرز الموالح الرئيسي - {facility_name}",
                    "optical": "GlobalScan 7 RGB+NIR (قطر + لون + تربس + ندبات)",
                    "preset": "برتقال فالنسيا نخب أول تصدير",
                    "cap": 12.0,
                },
                "apple": {
                    "code": "LINE-APP-MAIN",
                    "name": f"خط تفريغ وتدريج التفاحيات - {facility_name}",
                    "optical": "Insight 2 NIR (كدمات داخلية + سكر + صلابة)",
                    "preset": "تفاح جالا أحمر قياسي",
                    "cap": 8.0,
                },
                "dates": {
                    "code": "LINE-DAT-MAIN",
                    "name": f"خط فحص وفرز التمور الفاخرة - {facility_name}",
                    "optical": "Viotec UV + Multispectral (رطوبة + تجاعيد + سكريات)",
                    "preset": "تمر مجهول سوبر جامبو",
                    "cap": 4.5,
                },
                "packaging": {
                    "code": "LINE-PKG-MAIN",
                    "name": f"خط التعبئة الآلية والروبوتات - {facility_name}",
                    "optical": "Delta Robotics 3D Vision Guidance",
                    "preset": "تعبئة صواني كرتون مقسمة 48 حبة",
                    "cap": 14.0,
                },
                "enterprise": {
                    "code": "LINE-ENT-MULTI",
                    "name": f"الخط المتعدد الشامل - {facility_name}",
                    "optical": "Universal Multi-Crop Optical Sorter",
                    "preset": "تشغيل مرن لجميع المحاصيل",
                    "cap": 10.0,
                },
            }

            info = type_info.get(production_type, type_info["citrus"])

            # التحقق إذا كان الخط موجوداً أو تحديث الخط الأول
            cursor.execute("SELECT id FROM production_lines LIMIT 1")
            first_line = cursor.fetchone()

            if first_line:
                cursor.execute("""
                UPDATE production_lines 
                SET code = ?, name = ?, line_type = ?, lanes_count = ?, speed_cps = ?, target_capacity_tph = ?, optical_model = ?, active_preset = ?
                WHERE id = ?
                """, (info["code"], info["name"], production_type, lanes_count, speed_cps, info["cap"], info["optical"], info["preset"], first_line["id"]))
            else:
                cursor.execute("""
                INSERT INTO production_lines 
                (code, name, line_type, status, speed_cps, lanes_count, target_capacity_tph, current_output_tph, optical_model, camera_ip, plc_ip, active_preset)
                VALUES (?, ?, ?, 'idle', ?, ?, ?, 0.0, ?, '192.168.1.120', '192.168.1.50', ?)
                """, (info["code"], info["name"], production_type, speed_cps, lanes_count, info["cap"], info["optical"], info["preset"]))

            conn.commit()

    # ==========================================
    # دوال الهوية والاسم التجاري للمنظومة (Commercial Branding)
    # ==========================================

    def get_commercial_branding(self):
        """استرجاع بيانات الاسم التجاري والهوية المؤسسية للمنظومة"""
        return {
            "commercial_brand_name": self.get_setting("commercial_brand_name", "Falcon Eye Agrobotic OS - منظومة عين الصقر"),
            "brand_tagline": self.get_setting("brand_tagline", "المنظومة الذكية لإدارة والتحكم في خطوط الفرز والتعبئة والأتمتة الزراعية"),
            "company_legal_name": self.get_setting("company_legal_name", "عين الصقر للهندسة والأنظمة الذكية"),
            "facility_name": self.get_setting("facility_name", "محطة الفرز والتحزيم النموذجية للتصدير"),
            "currency_symbol": self.get_setting("currency_symbol", "EGP"),
            "default_vat_pct": float(self.get_setting("default_vat_pct", "14.0"))
        }

    def update_commercial_branding(self, brand_name, tagline="", company_name="", facility_name=""):
        """تحديث الاسم التجاري والبيانات المؤسسية للمنظومة فوراً"""
        if brand_name:
            self.set_setting("commercial_brand_name", brand_name)
        if tagline:
            self.set_setting("brand_tagline", tagline)
        if company_name:
            self.set_setting("company_legal_name", company_name)
        if facility_name:
            self.set_setting("facility_name", facility_name)
        return self.get_commercial_branding()

    # ==========================================
    # دوال إدارة الملحقات الصناعية (الموازين، الطابعات، الحساسات، الكروت)
    # ==========================================

    def get_peripherals(self, category=None):
        """استرجاع الأجهزة والملحقات الصناعية المسجلة"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            if category:
                cursor.execute("SELECT * FROM peripherals_devices WHERE category = ? ORDER BY id ASC", (category,))
            else:
                cursor.execute("SELECT * FROM peripherals_devices ORDER BY category, id ASC")
            return [dict(row) for row in cursor.fetchall()]

    def update_peripheral_status(self, device_id, status=None, current_value=None):
        """تحديث حالة أو قراءة جهاز أو حساس أو كارت"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            if status is not None and current_value is not None:
                cursor.execute("UPDATE peripherals_devices SET status = ?, current_value = ? WHERE id = ?", (status, current_value, device_id))
            elif status is not None:
                cursor.execute("UPDATE peripherals_devices SET status = ? WHERE id = ?", (status, device_id))
            elif current_value is not None:
                cursor.execute("UPDATE peripherals_devices SET current_value = ? WHERE id = ?", (current_value, device_id))
            conn.commit()

    def register_peripheral(self, category, name, model, interface, port_ip, baud_rate=9600, unit="", config_json="{}"):
        """تسجيل جهاز أو كارت أو ميزان جديد في المنظومة"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO peripherals_devices 
            (category, name, model, interface, port_ip, baud_rate, status, current_value, unit, config_json)
            VALUES (?, ?, ?, ?, ?, ?, 'connected', 0.0, ?, ?)
            """, (category, name, model, interface, port_ip, baud_rate, unit, config_json))
            conn.commit()
            return cursor.lastrowid

    def record_weighing(self, line_id, fruit_id, weight_grams, caliber_grade, tare_offset=0.0):
        """تسجيل قياس وزن ديناميكي من ميزان السير اللحظي"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO weighing_logs (line_id, fruit_id, weight_grams, caliber_grade, tare_offset)
            VALUES (?, ?, ?, ?, ?)
            """, (line_id, fruit_id, weight_grams, caliber_grade, tare_offset))
            conn.commit()
            return cursor.lastrowid

    def get_recent_weighings(self, limit=20):
        """استرجاع أحدث قياسات الوزن اللحظية"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM weighing_logs ORDER BY id DESC LIMIT ?", (limit,))
            return [dict(row) for row in cursor.fetchall()]

    def record_print_job(self, printer_name, label_type, batch_code, barcode_data, printed_content):
        """تسجيل وإرسال أمر طباعة لملصق باركود أو كود إنتاج"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO print_jobs_log (printer_name, label_type, batch_code, barcode_data, printed_content)
            VALUES (?, ?, ?, ?, ?)
            """, (printer_name, label_type, batch_code, barcode_data, printed_content))
            conn.commit()
            return cursor.lastrowid

    def get_recent_print_jobs(self, limit=10):
        """استرجاع أحدث أوامر الطباعة"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM print_jobs_log ORDER BY id DESC LIMIT ?", (limit,))
            return [dict(row) for row in cursor.fetchall()]

