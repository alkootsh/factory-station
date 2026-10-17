"""
شاشة التشغيل والتحكم في خطوط الإنتاج والفرز - Line Control & Telemetry View
التحكم في سرعة السير، البوابات، الحساسات، ومتابعة الإنتاجية اللحظية
"""

import customtkinter as ctk
from tkinter import messagebox
import random


class LineControlView(ctk.CTkFrame):
    """إطار التحكم المباشر ومراقبة خط الإنتاج المختار"""

    def __init__(self, master, db, on_alert_triggered=None):
        super().__init__(master, fg_color="transparent")
        self.db = db
        self.on_alert_triggered = on_alert_triggered
        self.current_line_id = None
        self.current_line_data = None

        self.grid_columnconfigure((0, 1), weight=1)
        self.grid_rowconfigure(1, weight=1)

        self.setup_ui()
        self.load_lines_list()

    def setup_ui(self):
        # 1. شريط العنوان واختيار الخط
        top_bar = ctk.CTkFrame(self, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        top_bar.grid(row=0, column=0, columnspan=2, sticky="ew", padx=10, pady=(0, 15))

        title_lbl = ctk.CTkLabel(
            top_bar,
            text="🎛️ غرفة التحكم والمراقبة اللحظية لخطوط الإنتاج (SCADA Control)",
            font=ctk.CTkFont(family="Cairo", size=18, weight="bold"),
            text_color="#38bdf8"
        )
        title_lbl.pack(side="right", padx=15, pady=12)

        # اختيار الخط النشط
        select_box = ctk.CTkFrame(top_bar, fg_color="transparent")
        select_box.pack(side="left", padx=15, pady=8)

        ctk.CTkLabel(
            select_box,
            text="اختر خط الإنتاج:",
            font=ctk.CTkFont(family="Cairo", size=12),
            text_color="#94a3b8"
        ).pack(side="right", padx=6)

        self.line_selector = ctk.CTkComboBox(
            select_box,
            width=280,
            height=34,
            font=ctk.CTkFont(family="Cairo", size=12),
            values=[],
            command=self.on_line_selected
        )
        self.line_selector.pack(side="left")

        # 2. القسم الأيمن: لوحة التحكم الميكانيكية والأوامر اللحظية
        left_col = ctk.CTkFrame(self, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        left_col.grid(row=1, column=1, sticky="nsew", padx=(5, 10), pady=5)
        left_col.grid_columnconfigure(0, weight=1)

        ctk.CTkLabel(
            left_col,
            text="أوامر التشغيل والسرعة الميكانيكية",
            font=ctk.CTkFont(family="Cairo", size=15, weight="bold"),
            text_color="#10b981"
        ).pack(anchor="e", padx=15, pady=(15, 10))

        # بطاقة حالة الخط
        status_box = ctk.CTkFrame(left_col, fg_color="#0f172a", corner_radius=8)
        status_box.pack(fill="x", padx=15, pady=6)

        self.status_badge = ctk.CTkLabel(
            status_box,
            text="حالة الخط: قيد الاستعداد (IDLE)",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            text_color="#f59e0b"
        )
        self.status_badge.pack(padx=12, pady=10)

        # أزرار التشغيل والإيقاف
        btn_grid = ctk.CTkFrame(left_col, fg_color="transparent")
        btn_grid.pack(fill="x", padx=15, pady=8)
        btn_grid.grid_columnconfigure((0, 1, 2), weight=1)

        self.start_btn = ctk.CTkButton(
            btn_grid,
            text="▶ تشغيل الخط",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            fg_color="#10b981",
            hover_color="#059669",
            height=40,
            command=self.start_line
        )
        self.start_btn.grid(row=0, column=2, padx=4, sticky="ew")

        self.stop_btn = ctk.CTkButton(
            btn_grid,
            text="⏸ إيقاف مؤقت",
            font=ctk.CTkFont(family="Cairo", size=13),
            fg_color="#64748b",
            hover_color="#475569",
            height=40,
            command=self.pause_line
        )
        self.stop_btn.grid(row=0, column=1, padx=4, sticky="ew")

        self.estop_btn = ctk.CTkButton(
            btn_grid,
            text="🛑 توقف طارئ",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            fg_color="#ef4444",
            hover_color="#dc2626",
            height=40,
            command=self.emergency_stop
        )
        self.estop_btn.grid(row=0, column=0, padx=4, sticky="ew")

        # شريط تعديل سرعة السير
        speed_box = ctk.CTkFrame(left_col, fg_color="#0f172a", corner_radius=8)
        speed_box.pack(fill="x", padx=15, pady=10)

        self.speed_label = ctk.CTkLabel(
            speed_box,
            text="سرعة السير الحالية: 12.0 كوب/ثانية",
            font=ctk.CTkFont(family="Cairo", size=12, weight="bold"),
            text_color="#e2e8f0"
        )
        self.speed_label.pack(anchor="e", padx=12, pady=(10, 4))

        self.speed_slider = ctk.CTkSlider(
            speed_box,
            from_=4.0,
            to=25.0,
            number_of_steps=21,
            command=self.on_speed_changed
        )
        self.speed_slider.set(12.0)
        self.speed_slider.pack(fill="x", padx=12, pady=(0, 10))

        # الحساسات المخصصة حسب نوع الخط المختار
        self.sensors_card = ctk.CTkFrame(left_col, fg_color="#0f172a", corner_radius=8)
        self.sensors_card.pack(fill="x", padx=15, pady=10)

        self.sensor_title = ctk.CTkLabel(
            self.sensors_card,
            text="قراءات الحساسات المخصصة لنوع الخط",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            text_color="#38bdf8"
        )
        self.sensor_title.pack(anchor="e", padx=12, pady=(10, 6))

        self.sensor_data_lbl = ctk.CTkLabel(
            self.sensors_card,
            text="جاري تحميل قراءات الحساسات...",
            font=ctk.CTkFont(family="Cairo", size=11),
            text_color="#94a3b8",
            justify="right"
        )
        self.sensor_data_lbl.pack(anchor="e", padx=12, pady=(0, 10))

        # زر محاكاة عطل لاختبار نظام التنبيهات
        test_alert_btn = ctk.CTkButton(
            left_col,
            text="⚠️ محاكاة تنبيه عطل مفاجئ بالخط",
            font=ctk.CTkFont(family="Cairo", size=12),
            fg_color="#b45309",
            hover_color="#92400e",
            height=34,
            command=self.simulate_line_fault
        )
        test_alert_btn.pack(fill="x", padx=15, pady=(5, 15))

        # 3. القسم الأيسر: شاشة القياسات والإنتاجية اللحظية (Telemetry & Visual Sorter)
        right_col = ctk.CTkFrame(self, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        right_col.grid(row=1, column=0, sticky="nsew", padx=(10, 5), pady=5)
        right_col.grid_columnconfigure(0, weight=1)

        ctk.CTkLabel(
            right_col,
            text="مؤشرات أداء الخط ومخرجات الفرز الآلي",
            font=ctk.CTkFont(family="Cairo", size=15, weight="bold"),
            text_color="#38bdf8"
        ).pack(anchor="e", padx=15, pady=(15, 10))

        # شبكة المؤشرات اللحظية
        metrics_grid = ctk.CTkFrame(right_col, fg_color="transparent")
        metrics_grid.pack(fill="x", padx=15, pady=5)
        metrics_grid.grid_columnconfigure((0, 1), weight=1)

        self.output_card = self.create_mini_kpi(metrics_grid, 0, 1, "الإنتاجية اللحظية", "0.0 طن/ساعة", "#10b981")
        self.lanes_card = self.create_mini_kpi(metrics_grid, 0, 0, "الحارات المتصلة", "4 حارات", "#3b82f6")
        self.preset_card = self.create_mini_kpi(metrics_grid, 1, 1, "الوصفة النشطة", "--", "#f59e0b")
        self.camera_card = self.create_mini_kpi(metrics_grid, 1, 0, "نظام الرؤية", "GlobalScan 7", "#8b5cf6")

        # مخطط درجات الفرز المئوية
        grades_box = ctk.CTkFrame(right_col, fg_color="#0f172a", corner_radius=8)
        grades_box.pack(fill="x", padx=15, pady=12)

        ctk.CTkLabel(
            grades_box,
            text="توزيع درجات الفرز اللحظية (Pack-out Grades)",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            text_color="#f8fafc"
        ).pack(anchor="e", padx=12, pady=(10, 8))

        self.grade_export_lbl = ctk.CTkLabel(
            grades_box,
            text="🟢 نخب أول تصدير (Grade A): 82.5%  [مخرج رقم 1، 2، 3]",
            font=ctk.CTkFont(family="Cairo", size=12),
            text_color="#34d399"
        )
        self.grade_export_lbl.pack(anchor="e", padx=15, pady=3)

        self.grade_local_lbl = ctk.CTkLabel(
            grades_box,
            text="🟡 نخب ثانٍ محلي (Standard): 13.0%  [مخرج رقم 4، 5]",
            font=ctk.CTkFont(family="Cairo", size=12),
            text_color="#fbbf24"
        )
        self.grade_local_lbl.pack(anchor="e", padx=15, pady=3)

        self.grade_waste_lbl = ctk.CTkLabel(
            grades_box,
            text="🔴 عيوب وتالف صناعي (Reject/Cull): 4.5%  [مخرج الطرد النهائي]",
            font=ctk.CTkFont(family="Cairo", size=12),
            text_color="#f87171"
        )
        self.grade_waste_lbl.pack(anchor="e", padx=15, pady=(3, 10))

        # معلومات الربط والاتصال الصناعي
        comm_box = ctk.CTkFrame(right_col, fg_color="#0f172a", corner_radius=8)
        comm_box.pack(fill="x", padx=15, pady=(0, 15))

        ctk.CTkLabel(
            comm_box,
            text="بيانات الربط والاتصال بالخط (Hardware Interfaces)",
            font=ctk.CTkFont(family="Cairo", size=12, weight="bold"),
            text_color="#94a3b8"
        ).pack(anchor="e", padx=12, pady=(8, 4))

        self.comm_info_lbl = ctk.CTkLabel(
            comm_box,
            text="PLC IP: 192.168.1.50 | Camera IP: 192.168.1.120 | Protocol: Modbus TCP & GigE Vision",
            font=ctk.CTkFont(family="Cairo", size=11),
            text_color="#64748b"
        )
        self.comm_info_lbl.pack(anchor="e", padx=12, pady=(0, 8))

    def create_mini_kpi(self, parent, row, col, title, initial_val, color):
        frame = ctk.CTkFrame(parent, fg_color="#0f172a", corner_radius=8)
        frame.grid(row=row, column=col, padx=4, pady=4, sticky="nsew")

        ctk.CTkLabel(frame, text=title, font=ctk.CTkFont(family="Cairo", size=11), text_color="#94a3b8").pack(anchor="e", padx=10, pady=(6, 0))
        val_lbl = ctk.CTkLabel(frame, text=initial_val, font=ctk.CTkFont(family="Cairo", size=15, weight="bold"), text_color=color)
        val_lbl.pack(anchor="e", padx=10, pady=(0, 6))
        return val_lbl

    def load_lines_list(self):
        """تحميل قائمة الخطوط في القائمة المنسدلة"""
        lines = self.db.get_all_lines()
        self.lines_cache = {f"{l['name']} ({l['code']})": l for l in lines}
        values = list(self.lines_cache.keys())
        self.line_selector.configure(values=values)

        if values:
            self.line_selector.set(values[0])
            self.on_line_selected(values[0])

    def on_line_selected(self, choice):
        """عند اختيار خط إنتاج محدد من القائمة"""
        line = self.lines_cache.get(choice)
        if not line:
            return

        self.current_line_id = line["id"]
        self.current_line_data = line

        # تحديث الواجهة ببيانات الخط
        self.update_ui_for_line(line)

    def update_ui_for_line(self, line):
        """تحديث العناصر الرسومية حسب نوع الخط المختار"""
        line_type = line["line_type"]
        status = line["status"]

        # 1. تحديث شارة الحالة
        status_map = {
            "running": ("حالة الخط: يعمل بكفاءة (RUNNING)", "#10b981"),
            "idle": ("حالة الخط: متوقف ومستعد (IDLE)", "#f59e0b"),
            "alert": ("حالة الخط: تنبيه عطل نشط (ALERT)", "#ef4444"),
            "maintenance": ("حالة الخط: تحت الصيانة (MAINTENANCE)", "#a855f7"),
        }
        text, color = status_map.get(status, ("حالة الخط: غير محدد", "#94a3b8"))
        self.status_badge.configure(text=text, text_color=color)

        # 2. تحديث السرعة والسلايدر
        speed = line.get("speed_cps", 12.0)
        self.speed_slider.set(speed)
        self.speed_label.configure(text=f"سرعة السير الحالية: {speed:.1f} كوب/ثانية")

        # 3. تحديث مؤشرات الأداء
        self.output_card.configure(text=f"{line.get('current_output_tph', 0.0):.1f} طن/ساعة")
        self.lanes_card.configure(text=f"{line.get('lanes_count', 4)} حارات")
        self.preset_card.configure(text=line.get("active_preset", "قياسي"))
        self.camera_card.configure(text=line.get("optical_model", "GlobalScan"))

        # 4. الحساسات المخصصة حسب نوع الخط
        if line_type == "citrus":
            self.sensor_title.configure(text="حساسات خط الموالح (Citrus Telemetry)")
            self.sensor_data_lbl.configure(
                text="• ضغط الهواء المضغوط لبوابات الطرد: 6.2 Bar (طبيعي)\n"
                     "• حساسية رصد التربس والندبات: 94% (High Precision)\n"
                     "• حرارة إضاءة الليد LED Strobe: 36°C (مستقرة)\n"
                     "• ميزان الأكواب الإلكتروني Load Cells: تمت المعايرة الصفرية"
            )
        elif line_type == "apple":
            self.sensor_title.configure(text="حساسات خط التفاح المائي (Apple Flume Telemetry)")
            self.sensor_data_lbl.configure(
                text="• حرارة مياه قناة التفريغ Flume: 11.8°C (مثالية للأنسجة)\n"
                     "• رادار كشف الكدمات الداخلية NIR: نشط (فحص طيفي كامل)\n"
                     "• سرعة بكرات تدوير الثمار 360°: 140 RPM\n"
                     "• منسوب مياه الحوض: 98% (ضمن النطاق الآمن)"
            )
        elif line_type == "dates":
            self.sensor_title.configure(text="حساسات خط التمور (Date Vision Telemetry)")
            self.sensor_data_lbl.configure(
                text="• مقياس الرطوبة الطيفي: 19.4% (مطابق للمواصفة)\n"
                     "• تركيز السكريات الفوري Brix: 67.8°\n"
                     "• فحص التجاعيد وانفصال القشرة: دقة 96%\n"
                     "• الأشعة فوق البنفسجية UV لتعقيم الحزام: نشطة"
            )
        elif line_type == "packaging":
            self.sensor_title.configure(text="حساسات خلية الروبوت والتعبئة (Robotic LinePack)")
            self.sensor_data_lbl.configure(
                text="• ضغط شفط الفاكيوم لكؤوس السيليكون: -0.78 Bar (قوة إحكام ممتازة)\n"
                     "• متبقي الصواني الكرتونية في الملقم: 180 صينية\n"
                     "• عدد ضربات الروبوت في الدقيقة: 68 كرتونة/ساعة\n"
                     "• محاذاة العنقود والاتجاه البصري: 99.2%"
            )
        else:
            self.sensor_title.configure(text="حساسات الخط المخصص")
            self.sensor_data_lbl.configure(
                text="• قراءات الحساسات العامة: مستقرة\n• سرعة المحرك: متزامنة"
            )

        self.comm_info_lbl.configure(
            text=f"PLC IP: {line.get('plc_ip', '--')} | Camera IP: {line.get('camera_ip', '--')} | Protocol: Modbus TCP & GigE Vision"
        )

    def start_line(self):
        """بدء تشغيل الخط ورفع الطاقة الإنتاجية"""
        if not self.current_line_id:
            return
        target_cap = self.current_line_data.get("target_capacity_tph", 8.0)
        speed = self.speed_slider.get()
        actual_output = round((speed / 14.0) * target_cap, 1)

        self.db.update_line_control(self.current_line_id, status="running", speed_cps=speed, output_tph=actual_output)
        self.current_line_data["status"] = "running"
        self.current_line_data["current_output_tph"] = actual_output
        self.update_ui_for_line(self.current_line_data)
        messagebox.showinfo("تم بنجاح", f"تم تشغيل خط الإنتاج ({self.current_line_data['name']}) بنجاح.")

    def pause_line(self):
        """إيقاف ناعم للخط"""
        if not self.current_line_id:
            return
        self.db.update_line_control(self.current_line_id, status="idle", output_tph=0.0)
        self.current_line_data["status"] = "idle"
        self.current_line_data["current_output_tph"] = 0.0
        self.update_ui_for_line(self.current_line_data)

    def emergency_stop(self):
        """توقف طارئ فوري لجميع سيور ومحركات الخط"""
        if not self.current_line_id:
            return
        self.db.update_line_control(self.current_line_id, status="alert", output_tph=0.0, speed_cps=0.0)
        self.current_line_data["status"] = "alert"
        self.current_line_data["current_output_tph"] = 0.0
        self.current_line_data["speed_cps"] = 0.0
        self.update_ui_for_line(self.current_line_data)

        # إطلاق تنبيه توقف طارئ
        self.db.trigger_alert(
            line_id=self.current_line_id,
            alert_code="ALM-ESTOP-999",
            line_type=self.current_line_data["line_type"],
            severity="critical",
            title="توقف طارئ يدوي (E-STOP ACTIVATED)",
            message="تم الضغط على زر التوقف الطارئ وتوقفت جميع المحركات وبوابات الطرد لحماية الخط والعاملين.",
            recommended_action="التأكد من خلو المسار وإعادة تعيين مفتاح الطوارئ قبل استئناف العمل."
        )
        if self.on_alert_triggered:
            self.on_alert_triggered()
        messagebox.showwarning("توقف طارئ", "تم إيقاف خط الإنتاج فوراً بتعشيق فرامل الطوارئ!")

    def on_speed_changed(self, value):
        """تعديل سرعة السير وتحديث الحسابات"""
        self.speed_label.configure(text=f"سرعة السير الحالية: {value:.1f} كوب/ثانية")
        if self.current_line_id and self.current_line_data["status"] == "running":
            target_cap = self.current_line_data.get("target_capacity_tph", 8.0)
            actual_output = round((value / 14.0) * target_cap, 1)
            self.db.update_line_control(self.current_line_id, speed_cps=value, output_tph=actual_output)
            self.output_card.configure(text=f"{actual_output:.1f} طن/ساعة")

    def simulate_line_fault(self):
        """محاكاة حدوث عطل لاختبار محرك التنبيهات المخصص لنوع الخط"""
        if not self.current_line_id:
            return

        line_type = self.current_line_data["line_type"]
        sample_alerts = self.db.get_line_alert_catalog_by_type(line_type)
        fault = random.choice(sample_alerts)

        self.db.trigger_alert(
            line_id=self.current_line_id,
            alert_code=fault["code"],
            line_type=line_type,
            severity=fault["severity"],
            title=fault["title"],
            message=fault["message"],
            recommended_action=fault["action"]
        )

        self.current_line_data["status"] = "alert" if fault["severity"] == "critical" else self.current_line_data["status"]
        self.update_ui_for_line(self.current_line_data)

        if self.on_alert_triggered:
            self.on_alert_triggered()

        messagebox.showwarning(
            "تنبيه صادر من الخط!",
            f"نوع الخط: {line_type.upper()}\n"
            f"كود التنبيه: {fault['code']}\n"
            f"{fault['title']}\n\n"
            f"الإجراء المطلوب: {fault['action']}"
        )
