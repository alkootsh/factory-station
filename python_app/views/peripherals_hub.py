"""
منظومة عين الصقر - وحدة الموازين والطابعات والحساسات والكروت الإلكترونية
Falcon Eye Agrobotic OS - Industrial Peripherals & Hardware Hub
إدارة ودعم الموازين الديناميكية، طابعات الباركود والملصقات، كافة الحساسات، وكروت الإشارات والتحكم
"""

import customtkinter as ctk
from tkinter import messagebox
import random
import json
from datetime import datetime


class PeripheralsHubView(ctk.CTkFrame):
    """واجهة تشغيل وإدارة الملحقات الصناعية المتقدمة"""

    def __init__(self, master, db):
        super().__init__(master, fg_color="transparent")
        self.db = db

        # الحالة اللحظية للأجهزة والموازين
        self.active_category = "all"
        self.dynamic_weight = 214.5
        self.tare_value = 0.0
        self.current_caliber = "نخب أول (Grade A: 190-240g)"
        self.recent_print_output = ""

        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(2, weight=1)

        self.setup_ui()

    def setup_ui(self):
        # 1. شريط العنوان والاسم التجاري وإحصائيات الملحقات
        branding = self.db.get_commercial_branding()
        brand_name = branding.get("commercial_brand_name", "Falcon Eye Agrobotic OS - منظومة عين الصقر")

        top_bar = ctk.CTkFrame(self, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        top_bar.grid(row=0, column=0, sticky="ew", padx=10, pady=(0, 10))

        title_box = ctk.CTkFrame(top_bar, fg_color="transparent")
        title_box.pack(side="right", padx=15, pady=10)

        ctk.CTkLabel(
            title_box,
            text=f"⚖️ الموازين والطابعات والحساسات والكروت الإلكترونية",
            font=ctk.CTkFont(family="Cairo", size=17, weight="bold"),
            text_color="#38bdf8"
        ).pack(anchor="e")

        ctk.CTkLabel(
            title_box,
            text=f"الاسم التجاري المعتمد: {brand_name} | دعم تشغيل أجهزة الفرز والتعبئة والربط",
            font=ctk.CTkFont(family="Cairo", size=11),
            text_color="#94a3b8"
        ).pack(anchor="e")

        # أزرار الإجراءات السريعة
        actions_box = ctk.CTkFrame(top_bar, fg_color="transparent")
        actions_box.pack(side="left", padx=15, pady=10)

        change_brand_btn = ctk.CTkButton(
            actions_box,
            text="🏷️ تعديل الاسم التجاري",
            font=ctk.CTkFont(family="Cairo", size=12, weight="bold"),
            fg_color="#0d9488",
            hover_color="#0f766e",
            height=32,
            command=self.open_brand_modal
        )
        change_brand_btn.pack(side="left", padx=5)

        test_all_btn = ctk.CTkButton(
            actions_box,
            text="⚡ فحص كل الملحقات (Hardware Scan)",
            font=ctk.CTkFont(family="Cairo", size=12),
            fg_color="#0284c7",
            hover_color="#0369a1",
            height=32,
            command=self.simulate_hardware_scan
        )
        test_all_btn.pack(side="left", padx=5)

        # 2. أزرار تصفية الأقسام (Tabs)
        filter_bar = ctk.CTkFrame(self, fg_color="#0f172a", corner_radius=10, height=45)
        filter_bar.grid(row=1, column=0, sticky="ew", padx=10, pady=(0, 10))

        categories = [
            ("all", "🌐 الكل (15 ملحق)"),
            ("scale", "⚖️ الموازين وديناميكية الوزن"),
            ("printer", "🏷️ الطابعات والملصقات واللوط"),
            ("sensor", "📡 الحساسات الصناعية الشاملة"),
            ("card", "🎛️ الكروت الإلكترونية ووحدات DAQ")
        ]

        self.filter_buttons = {}
        for cat_id, cat_title in categories:
            btn = ctk.CTkButton(
                filter_bar,
                text=cat_title,
                font=ctk.CTkFont(family="Cairo", size=12, weight="bold" if cat_id == "all" else "normal"),
                fg_color="#334155" if cat_id == "all" else "transparent",
                hover_color="#1e293b",
                height=34,
                corner_radius=8,
                command=lambda c=cat_id: self.filter_category(c)
            )
            btn.pack(side="right", padx=6, pady=5)
            self.filter_buttons[cat_id] = btn

        # 3. الحاوية الرئيسية ذات اللوحين (Panel A: Interactive Live Test / Panel B: Devices Grid)
        content_pane = ctk.CTkFrame(self, fg_color="transparent")
        content_pane.grid(row=2, column=0, sticky="nsew", padx=10, pady=0)
        content_pane.grid_columnconfigure((0, 1), weight=1)
        content_pane.grid_rowconfigure(0, weight=1)

        # اللوح الأيمن: أدوات الاختبار التفاعلي المباشر (الميزان اللحظي، الطابعة الفورية، الكروت)
        self.interactive_frame = ctk.CTkScrollableFrame(content_pane, fg_color="#1e293b", corner_radius=12)
        self.interactive_frame.grid(row=0, column=1, sticky="nsew", padx=(5, 0), pady=0)
        self.interactive_frame.grid_columnconfigure(0, weight=1)

        self.build_interactive_tester(self.interactive_frame)

        # اللوح الأيسر: قائمة الأجهزة المسجلة وحالات الاتصال ومؤشرات القراءة
        self.devices_frame = ctk.CTkScrollableFrame(content_pane, fg_color="#1e293b", corner_radius=12)
        self.devices_frame.grid(row=0, column=0, sticky="nsew", padx=(0, 5), pady=0)
        self.devices_frame.grid_columnconfigure(0, weight=1)

        self.render_devices_list()

    def build_interactive_tester(self, parent):
        """بناء أدوات الاختبار التفاعلي للموازين والطابعات"""
        ctk.CTkLabel(
            parent,
            text="🧪 وحدة الاختبار والتشغيل المباشر للملحقات",
            font=ctk.CTkFont(family="Cairo", size=15, weight="bold"),
            text_color="#10b981"
        ).pack(anchor="e", padx=12, pady=(12, 8))

        # --- أ) بطاقة اختبار ميزان السير اللحظي (Dynamic Checkweigher) ---
        scale_box = ctk.CTkFrame(parent, fg_color="#0f172a", corner_radius=10, border_width=1, border_color="#334155")
        scale_box.pack(fill="x", padx=10, pady=6)

        ctk.CTkLabel(
            scale_box,
            text="⚖️ اختبار الميزان الديناميكي للسير (Checkweigher Dynamic Readout)",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            text_color="#f59e0b"
        ).pack(anchor="e", padx=12, pady=(10, 4))

        # شاشة القراءة الرقمية للوزن الحي
        readout_frame = ctk.CTkFrame(scale_box, fg_color="#020617", corner_radius=8, border_width=1, border_color="#1e293b")
        readout_frame.pack(fill="x", padx=10, pady=6)

        self.weight_label = ctk.CTkLabel(
            readout_frame,
            text=f"{self.dynamic_weight:.1f} g",
            font=ctk.CTkFont(family="Cairo", size=32, weight="bold"),
            text_color="#38bdf8"
        )
        self.weight_label.pack(pady=4)

        self.grade_label = ctk.CTkLabel(
            readout_frame,
            text=f"التصنيف: {self.current_caliber}",
            font=ctk.CTkFont(family="Cairo", size=12, weight="bold"),
            text_color="#34d399"
        )
        self.grade_label.pack(pady=(0, 6))

        # أزرار تحكم الميزان
        scale_ctrls = ctk.CTkFrame(scale_box, fg_color="transparent")
        scale_ctrls.pack(fill="x", padx=10, pady=(4, 10))

        ctk.CTkButton(
            scale_ctrls,
            text="🎲 محاكاة تمرير ثمرة عشوائية",
            font=ctk.CTkFont(family="Cairo", size=11, weight="bold"),
            fg_color="#0284c7",
            hover_color="#0369a1",
            height=28,
            command=self.simulate_dynamic_fruit
        ).pack(side="right", padx=4)

        ctk.CTkButton(
            scale_ctrls,
            text="تصفير الميزان (Tare / Zero)",
            font=ctk.CTkFont(family="Cairo", size=11),
            fg_color="#475569",
            hover_color="#334155",
            height=28,
            command=self.zero_tare_scale
        ).pack(side="right", padx=4)

        # --- ب) بطاقة اختبار طابعات الباركود والملصقات ونفث الحبر ---
        printer_box = ctk.CTkFrame(parent, fg_color="#0f172a", corner_radius=10, border_width=1, border_color="#334155")
        printer_box.pack(fill="x", padx=10, pady=6)

        ctk.CTkLabel(
            printer_box,
            text="🏷️ اختبار طابعة ملصقات الكراتين واللوط (Zebra ZPL & TIJ Batch)",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            text_color="#38bdf8"
        ).pack(anchor="e", padx=12, pady=(10, 4))

        # مدخلات ملصق الإنتاج
        form_frame = ctk.CTkFrame(printer_box, fg_color="transparent")
        form_frame.pack(fill="x", padx=10, pady=4)
        form_frame.grid_columnconfigure((0, 1), weight=1)

        ctk.CTkLabel(form_frame, text="رقم اللوط / التشغيلة:", font=ctk.CTkFont(family="Cairo", size=11), text_color="#94a3b8").grid(row=0, column=1, sticky="e", padx=5)
        self.batch_entry = ctk.CTkEntry(form_frame, height=28, font=ctk.CTkFont(family="Cairo", size=11))
        self.batch_entry.insert(0, f"LOT-EG-{datetime.now().strftime('%y%m%d')}-01")
        self.batch_entry.grid(row=0, column=0, sticky="ew", padx=5, pady=2)

        ctk.CTkLabel(form_frame, text="الصنف والعيار:", font=ctk.CTkFont(family="Cairo", size=11), text_color="#94a3b8").grid(row=1, column=1, sticky="e", padx=5)
        self.variety_entry = ctk.CTkEntry(form_frame, height=28, font=ctk.CTkFont(family="Cairo", size=11))
        self.variety_entry.insert(0, "برتقال فالنسيا نخب أول تصدير - كاليبر 5")
        self.variety_entry.grid(row=1, column=0, sticky="ew", padx=5, pady=2)

        # زر تنفيذ أمر الطباعة
        ctk.CTkButton(
            printer_box,
            text="🖨️ إرسال أمر طباعة ملصق فوري (Print ZPL & Barcode)",
            font=ctk.CTkFont(family="Cairo", size=12, weight="bold"),
            fg_color="#10b981",
            hover_color="#059669",
            height=32,
            command=self.execute_test_print
        ).pack(fill="x", padx=10, pady=(6, 8))

        # صندوق استعراض الملصق المطبوع
        self.print_preview_box = ctk.CTkTextbox(
            printer_box,
            height=110,
            font=ctk.CTkFont(family="Courier", size=10),
            fg_color="#020617",
            text_color="#a7f3d0"
        )
        self.print_preview_box.pack(fill="x", padx=10, pady=(0, 10))
        self.print_preview_box.insert("1.0", "[جاهز للطباعة عبر بروتوكول Zebra ZPL II و TIJ TCP/IP على منفذ 9100]")

        # --- ج) بطاقة اختبار نبضات كروت الطرد والحساسات (Pulse Test) ---
        card_box = ctk.CTkFrame(parent, fg_color="#0f172a", corner_radius=10, border_width=1, border_color="#334155")
        card_box.pack(fill="x", padx=10, pady=6)

        ctk.CTkLabel(
            card_box,
            text="🎛️ كارت مشغلات الطرد السريع (16-Ch Opto-MOSFET Driver)",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            text_color="#a855f7"
        ).pack(anchor="e", padx=12, pady=(10, 4))

        channels_grid = ctk.CTkFrame(card_box, fg_color="transparent")
        channels_grid.pack(fill="x", padx=10, pady=6)
        channels_grid.grid_columnconfigure(tuple(range(8)), weight=1)

        self.ch_buttons = {}
        for ch in range(1, 9):
            btn = ctk.CTkButton(
                channels_grid,
                text=f"CH{ch}",
                font=ctk.CTkFont(family="Cairo", size=10, weight="bold"),
                width=35,
                height=26,
                fg_color="#334155",
                hover_color="#0284c7",
                command=lambda c=ch: self.pulse_channel(c)
            )
            btn.grid(row=0, column=ch-1, padx=2, pady=2)
            self.ch_buttons[ch] = btn

        ctk.CTkLabel(
            card_box,
            text="زمن استجابة البوابة: 200µs | عزل كهروضوئي 2.5kV | جهد 24VDC",
            font=ctk.CTkFont(family="Cairo", size=10),
            text_color="#64748b"
        ).pack(anchor="e", padx=12, pady=(0, 8))

    def render_devices_list(self):
        """عرض قائمة الأجهزة والملحقات حسب القسم المختار"""
        # مسح العناصر الحالية
        for widget in self.devices_frame.winfo_children():
            widget.destroy()

        category_filter = None if self.active_category == "all" else self.active_category
        devices = self.db.get_peripherals(category_filter)

        header_frame = ctk.CTkFrame(self.devices_frame, fg_color="transparent")
        header_frame.pack(fill="x", padx=10, pady=(10, 6))

        count_text = f"الأجهزة المسجلة ({len(devices)})"
        ctk.CTkLabel(
            header_frame,
            text=f"📋 {count_text}",
            font=ctk.CTkFont(family="Cairo", size=14, weight="bold"),
            text_color="#e2e8f0"
        ).pack(side="right")

        cat_icons = {
            "scale": "⚖️",
            "printer": "🏷️",
            "sensor": "📡",
            "card": "🎛️"
        }

        cat_names = {
            "scale": "ميزان صناعي",
            "printer": "طابعة صناعية",
            "sensor": "حساس صناعي",
            "card": "كارت إلكتروني"
        }

        for dev in devices:
            cat = dev.get("category", "sensor")
            icon = cat_icons.get(cat, "🔌")
            cname = cat_names.get(cat, "ملحق")

            card = ctk.CTkFrame(self.devices_frame, fg_color="#0f172a", corner_radius=8, border_width=1, border_color="#334155")
            card.pack(fill="x", padx=10, pady=5)
            card.grid_columnconfigure(0, weight=1)

            # رأس البطاقة
            head = ctk.CTkFrame(card, fg_color="transparent")
            head.pack(fill="x", padx=10, pady=(8, 2))

            ctk.CTkLabel(
                head,
                text=f"{icon} {dev['name']}",
                font=ctk.CTkFont(family="Cairo", size=12, weight="bold"),
                text_color="#f8fafc"
            ).pack(side="right")

            # شارة الحالة
            status = dev.get("status", "connected")
            is_ok = status == "connected"
            badge = ctk.CTkLabel(
                head,
                text="● متصل ونشط" if is_ok else "● جاري الفحص",
                font=ctk.CTkFont(family="Cairo", size=10, weight="bold"),
                text_color="#10b981" if is_ok else "#f59e0b",
                fg_color="#064e3b" if is_ok else "#451a03",
                corner_radius=4,
                padx=6,
                pady=2
            )
            badge.pack(side="left")

            # تفاصيل الموديل والمنفذ والقراءة
            body = ctk.CTkFrame(card, fg_color="transparent")
            body.pack(fill="x", padx=10, pady=(2, 8))

            val_str = f"{dev.get('current_value', 0.0)} {dev.get('unit', '')}".strip()
            details_text = f"الموديل: {dev['model']} | المنفذ/البروتوكول: {dev['interface']} ({dev['port_ip']})"
            if val_str:
                details_text += f" | القراءة: {val_str}"

            ctk.CTkLabel(
                body,
                text=details_text,
                font=ctk.CTkFont(family="Cairo", size=10),
                text_color="#94a3b8"
            ).pack(anchor="e")

    def filter_category(self, category):
        """تصفية عرض الأجهزة"""
        self.active_category = category
        for cat_id, btn in self.filter_buttons.items():
            if cat_id == category:
                btn.configure(fg_color="#334155", font=ctk.CTkFont(family="Cairo", size=12, weight="bold"))
            else:
                btn.configure(fg_color="transparent", font=ctk.CTkFont(family="Cairo", size=12, weight="normal"))
        self.render_devices_list()

    def simulate_dynamic_fruit(self):
        """محاكاة مرور ثمرة على ميزان السير اللحظي وحساب الدرجة"""
        # توليد وزن عشوائي للثمرة بالجرام
        weights = [
            (random.uniform(241, 310), "نخب سوبر جامبو (Super Jumbo > 240g)", "#38bdf8"),
            (random.uniform(190, 240), "نخب أول تصدير (Grade A: 190-240g)", "#10b981"),
            (random.uniform(150, 189), "نخب ثانٍ قياسي (Grade B: 150-189g)", "#f59e0b"),
            (random.uniform(95, 149), "عصير وتصنيع محلي (Juice / Processing < 150g)", "#ef4444")
        ]
        chosen = random.choice(weights)
        self.dynamic_weight = chosen[0]
        self.current_caliber = chosen[1]

        self.weight_label.configure(text=f"{self.dynamic_weight:.1f} g")
        self.grade_label.configure(text=f"التصنيف: {self.current_caliber}", text_color=chosen[2])

        # حفظ القياس في قاعدة البيانات
        self.db.record_weighing(
            line_id=1,
            fruit_id=random.randint(1000, 9999),
            weight_grams=round(self.dynamic_weight, 1),
            caliber_grade=self.current_caliber,
            tare_offset=self.tare_value
        )

    def zero_tare_scale(self):
        """تصفير الميزان اللحظي"""
        self.tare_value = self.dynamic_weight
        self.dynamic_weight = 0.0
        self.current_caliber = "تصفير الميزان (Tare Calibrated 0.0g)"
        self.weight_label.configure(text="0.0 g")
        self.grade_label.configure(text=self.current_caliber, text_color="#94a3b8")
        messagebox.showinfo("معايرة الميزان", "تم تصفير الميزان الديناميكي بنجاح (Tare Offset Calibrated).")

    def execute_test_print(self):
        """تنفيذ أمر طباعة ملصق وتوليد كود ZPL"""
        lot = self.batch_entry.get().strip()
        variety = self.variety_entry.get().strip()
        weight_str = f"{self.dynamic_weight:.1f}g / الصندوق: 18.2kg"
        branding = self.db.get_commercial_branding()
        brand_name = branding.get("commercial_brand_name", "Falcon Eye Agrobotic OS")

        zpl_mock = (
            f"^XA\n"
            f"^FO50,50^A0N,36,36^FD{brand_name}^FS\n"
            f"^FO50,95^A0N,28,28^FDالصنف: {variety}^FS\n"
            f"^FO50,135^A0N,26,26^FDالتشغيلة: {lot} | الوزن: {weight_str}^FS\n"
            f"^FO50,175^BY3^BCN,70,Y,N,N^FD{lot}^FS\n"
            f"^FO50,280^BQN,2,5^FDMA,{lot};GRADE=A;VERIFIED^FS\n"
            f"^XZ"
        )

        self.print_preview_box.delete("1.0", "end")
        self.print_preview_box.insert("1.0", f"--- تم إرسال أمر الطباعة لطابعة Zebra ZT411 (Ethernet 192.168.1.80:9100) ---\n{zpl_mock}")

        # تسجيل مهمة الطباعة في قاعدة البيانات
        self.db.record_print_job(
            printer_name="Zebra ZT411 Industrial",
            label_type="box_label",
            batch_code=lot,
            barcode_data=f"{lot}-GRADE-A",
            printed_content=zpl_mock
        )

    def pulse_channel(self, channel_num):
        """إرسال نبضة اختبار لبوابة طرد هوائية"""
        btn = self.ch_buttons.get(channel_num)
        if btn:
            btn.configure(fg_color="#10b981")
            self.after(300, lambda: btn.configure(fg_color="#334155"))

    def simulate_hardware_scan(self):
        """محاكاة فحص شامل لجميع الملحقات الصناعية"""
        devices = self.db.get_peripherals()
        for dev in devices:
            self.db.update_peripheral_status(dev["id"], status="connected")
        self.render_devices_list()
        messagebox.showinfo(
            "فحص الملحقات الصناعية",
            f"تم فحص جميع الملحقات بنجاح ({len(devices)} أجهزة):\n"
            "- الموازين الديناميكية ومؤشرات خلايا الوزن: نشطة (Modbus TCP)\n"
            "- طابعات الباركود ونفث الحبر TIJ: متصلة وجاهزة (ZPL Port 9100)\n"
            "- حساسات الليزر والإنكودر والطيف الضوئي: تقرأ الإشارات بدقة\n"
            "- كروت المرحلات وبوابات الطرد السريع MOSFET: استجابة فائقة 200µs"
        )

    def open_brand_modal(self):
        """نافذة تعديل الاسم التجاري والهوية المؤسسية للمنظومة"""
        branding = self.db.get_commercial_branding()

        modal = ctk.CTkToplevel(self)
        modal.title("تعديل الاسم التجاري والهوية المؤسسية")
        modal.geometry("540x480")
        modal.grab_set()
        modal.resizable(False, False)

        ctk.CTkLabel(
            modal,
            text="🏷️ تعديل الاسم التجاري والهوية المؤسسية للمنظومة",
            font=ctk.CTkFont(family="Cairo", size=15, weight="bold"),
            text_color="#38bdf8"
        ).pack(padx=20, pady=(20, 10))

        frame = ctk.CTkFrame(modal, fg_color="#1e293b", corner_radius=10)
        frame.pack(fill="both", expand=True, padx=20, pady=10)
        frame.grid_columnconfigure(0, weight=1)

        # 1. الاسم التجاري
        ctk.CTkLabel(frame, text="الاسم التجاري للمنظومة (Brand Name):", font=ctk.CTkFont(family="Cairo", size=12), text_color="#cbd5e1").pack(anchor="e", padx=15, pady=(12, 2))
        brand_entry = ctk.CTkEntry(frame, height=36, font=ctk.CTkFont(family="Cairo", size=12, weight="bold"))
        brand_entry.insert(0, branding.get("commercial_brand_name", ""))
        brand_entry.pack(fill="x", padx=15, pady=(0, 8))

        # 2. الشعار اللفظي
        ctk.CTkLabel(frame, text="الشعار اللفظي (Slogan / Tagline):", font=ctk.CTkFont(family="Cairo", size=12), text_color="#cbd5e1").pack(anchor="e", padx=15, pady=(4, 2))
        tagline_entry = ctk.CTkEntry(frame, height=34, font=ctk.CTkFont(family="Cairo", size=11))
        tagline_entry.insert(0, branding.get("brand_tagline", ""))
        tagline_entry.pack(fill="x", padx=15, pady=(0, 8))

        # 3. اسم المحطة / الشركة
        ctk.CTkLabel(frame, text="اسم الشركة أو المحطة المالكة للخطوط:", font=ctk.CTkFont(family="Cairo", size=12), text_color="#cbd5e1").pack(anchor="e", padx=15, pady=(4, 2))
        company_entry = ctk.CTkEntry(frame, height=34, font=ctk.CTkFont(family="Cairo", size=11))
        company_entry.insert(0, branding.get("company_legal_name", ""))
        company_entry.pack(fill="x", padx=15, pady=(0, 15))

        def save_branding():
            new_brand = brand_entry.get().strip()
            new_tag = tagline_entry.get().strip()
            new_comp = company_entry.get().strip()

            if not new_brand:
                messagebox.showerror("خطأ", "يجب إدخال الاسم التجاري للمنظومة.")
                return

            self.db.update_commercial_branding(
                brand_name=new_brand,
                tagline=new_tag,
                company_name=new_comp
            )

            messagebox.showinfo("تم الحفظ", f"تم تحديث الاسم التجاري للمنظومة بنجاح إلى:\n{new_brand}")
            modal.destroy()

            # تحديث الواجهة الرئيسية إذا توفرت الدالة
            if hasattr(self.master, "update_title_brand"):
                self.master.update_title_brand()
            self.setup_ui()

        ctk.CTkButton(
            modal,
            text="💾 حفظ وتطبيق الاسم التجاري الجديد",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            fg_color="#10b981",
            hover_color="#059669",
            height=40,
            command=save_branding
        ).pack(fill="x", padx=20, pady=(0, 20))
