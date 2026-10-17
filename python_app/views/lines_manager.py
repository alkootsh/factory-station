"""
إدارة وتكوين خطوط الإنتاج والفرز والتعبئة - Lines Manager View
إضافة، تخصيص، وتعديل خطوط الإنتاج بمختلف أنواعها (موالح، تفاح، تمور، تعبئة وروبوتات، خطوط مخصصة)
دون المساس بنواة النظام الأساسية
"""

import customtkinter as ctk
from tkinter import messagebox


class LinesManagerView(ctk.CTkFrame):
    """إطار إدارة وتعريف خطوط الإنتاج المتعددة"""

    def __init__(self, master, db, on_lines_updated=None):
        super().__init__(master, fg_color="transparent")
        self.db = db
        self.on_lines_updated = on_lines_updated
        self.selected_line_id = None

        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(2, weight=1)

        self.setup_ui()
        self.load_lines()

    def setup_ui(self):
        # 1. شريط العنوان العلوي
        header = ctk.CTkFrame(self, fg_color="transparent")
        header.grid(row=0, column=0, sticky="ew", padx=10, pady=(0, 15))

        title_lbl = ctk.CTkLabel(
            header,
            text="🏭 إدارة وتكوين خطوط الإنتاج والفرز والتعبئة (Lines Configuration)",
            font=ctk.CTkFont(family="Cairo", size=20, weight="bold"),
            text_color="#ffffff"
        )
        title_lbl.pack(side="right")

        badge = ctk.CTkLabel(
            header,
            text="معمارية معيارية قابلة للتوسع (Modular Architecture)",
            font=ctk.CTkFont(family="Cairo", size=11),
            text_color="#38bdf8",
            fg_color="#0369a1",
            corner_radius=6,
            padx=10,
            pady=4
        )
        badge.pack(side="left")

        # 2. بطاقة نموذج إضافة / تخصيص خط إنتاج جديد
        form_card = ctk.CTkFrame(self, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        form_card.grid(row=1, column=0, sticky="ew", padx=10, pady=(0, 15))

        form_title = ctk.CTkLabel(
            form_card,
            text="توصيف خط إنتاج / فرز / تعبئة جديد",
            font=ctk.CTkFont(family="Cairo", size=14, weight="bold"),
            text_color="#10b981"
        )
        form_title.pack(anchor="e", padx=15, pady=(12, 5))

        # شبكة الحقول
        grid = ctk.CTkFrame(form_card, fg_color="transparent")
        grid.pack(fill="x", padx=15, pady=8)
        grid.grid_columnconfigure((0, 1, 2, 3), weight=1)

        # الصف الأول: كود الخط، الاسم، نوع الخط، عدد الحارات
        self.code_entry = self.add_labeled_entry(grid, "كود الخط (مثال: LINE-CIT-05)", 0, 3)
        self.name_entry = self.add_labeled_entry(grid, "اسم خط الإنتاج والمحطة", 0, 2)

        # القائمة المنسدلة لنوع الخط
        type_box = ctk.CTkFrame(grid, fg_color="transparent")
        type_box.grid(row=0, column=1, padx=4, pady=4, sticky="ew")
        ctk.CTkLabel(type_box, text="نوع الخط والعملية:", font=ctk.CTkFont(family="Cairo", size=11), text_color="#cbd5e1").pack(anchor="e")
        self.type_combo = ctk.CTkComboBox(
            type_box,
            font=ctk.CTkFont(family="Cairo", size=12),
            height=32,
            values=[
                "خط فرز وتعبئة عنب مائدي فاخر (Table Grapes)",
                "خط فرز وتدريج خضروات صوب وطماطم (Vegetables)",
                "خط غسيل وفرز وتعبئة بطاطس وبصل (Potatoes & Onions)",
                "خط فرز وتدريج موالح (Citrus Line)",
                "خط تفريغ وتدريج تفاحيات مائي (Apple Line)",
                "خط فحص وفرز تمور بالأشعة (Dates Line)",
                "خط تعبئة آلية وروبوتات (Robotic Packing)",
                "خط إنتاج وتصنيع مخصص (Custom Line)",
            ]
        )
        self.type_combo.pack(fill="x")

        self.lanes_entry = self.add_labeled_entry(grid, "عدد الحارات (Lanes)", 0, 0)
        self.lanes_entry.insert(0, "4")

        # الصف الثاني: السرعة، الطاقة المستهدفة طن/ساعة، موديل الكاميرا، عنوان PLC
        self.speed_entry = self.add_labeled_entry(grid, "السرعة القياسية (كوب/ثانية)", 1, 3)
        self.speed_entry.insert(0, "12.0")

        self.target_cap_entry = self.add_labeled_entry(grid, "الطاقة المستهدفة (طن/ساعة)", 1, 2)
        self.target_cap_entry.insert(0, "8.0")

        self.camera_entry = self.add_labeled_entry(grid, "موديل نظام الرؤية / الحساسات", 1, 1)
        self.camera_entry.insert(0, "GlobalScan 7 4K Vision")

        self.plc_entry = self.add_labeled_entry(grid, "عنوان IP لمتحكم PLC الصناعي", 1, 0)
        self.plc_entry.insert(0, "192.168.1.60")

        # شريط الأزرار
        btn_bar = ctk.CTkFrame(form_card, fg_color="transparent")
        btn_bar.pack(fill="x", padx=15, pady=(5, 12))

        self.save_btn = ctk.CTkButton(
            btn_bar,
            text="حفظ وإضافة الخط للمنظومة +",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            fg_color="#10b981",
            hover_color="#059669",
            height=36,
            command=self.save_line
        )
        self.save_btn.pack(side="right", padx=5)

        self.clear_btn = ctk.CTkButton(
            btn_bar,
            text="مسح الحقول ↺",
            font=ctk.CTkFont(family="Cairo", size=13),
            fg_color="#475569",
            hover_color="#334155",
            height=36,
            command=self.clear_form
        )
        self.clear_btn.pack(side="right", padx=5)

        # 3. جدول وبطاقات خطوط الإنتاج النشطة
        table_card = ctk.CTkFrame(self, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        table_card.grid(row=2, column=0, sticky="nsew", padx=10, pady=5)
        table_card.grid_rowconfigure(1, weight=1)
        table_card.grid_columnconfigure(0, weight=1)

        ctk.CTkLabel(
            table_card,
            text="قائمة خطوط الإنتاج والفرز والتعبئة الحالية في المحطة",
            font=ctk.CTkFont(family="Cairo", size=14, weight="bold"),
            text_color="#94a3b8"
        ).grid(row=0, column=0, sticky="e", padx=15, pady=12)

        self.scroll_table = ctk.CTkScrollableFrame(table_card, fg_color="transparent")
        self.scroll_table.grid(row=1, column=0, sticky="nsew", padx=15, pady=(0, 15))
        self.scroll_table.grid_columnconfigure((0, 1, 2, 3, 4, 5, 6), weight=1)

    def add_labeled_entry(self, parent, label_text, row, col):
        frame = ctk.CTkFrame(parent, fg_color="transparent")
        frame.grid(row=row, column=col, padx=4, pady=4, sticky="ew")

        ctk.CTkLabel(frame, text=label_text, font=ctk.CTkFont(family="Cairo", size=11), text_color="#cbd5e1").pack(anchor="e")
        entry = ctk.CTkEntry(frame, font=ctk.CTkFont(family="Cairo", size=12), height=32)
        entry.pack(fill="x", pady=(2, 0))
        return entry

    def load_lines(self):
        """تحميل خطوط الإنتاج وعرضها في الجدول مع أزرار الإجراءات"""
        for w in self.scroll_table.winfo_children():
            w.destroy()

        headers = ["الكود", "اسم الخط", "نوع الخط والعملية", "الحارات", "السرعة", "الطاقة المستهدفة", "إجراء"]
        for c, h in enumerate(headers):
            ctk.CTkLabel(
                self.scroll_table,
                text=h,
                font=ctk.CTkFont(family="Cairo", size=12, weight="bold"),
                text_color="#38bdf8"
            ).grid(row=0, column=c, padx=6, pady=6, sticky="ew")

        lines = self.db.get_all_lines()

        type_names = {
            "citrus": "موالح وفواكه دائرية",
            "apple": "تفاحيات وتفريغ مائي",
            "dates": "تمور وأشعة تحت الحمراء",
            "packaging": "تعبئة آلية وروبوتات",
            "custom": "خط مخصص",
        }

        for r, line in enumerate(lines, start=1):
            bg = "#0f172a" if r % 2 == 0 else "#1e293b"
            row_frame = ctk.CTkFrame(self.scroll_table, fg_color=bg, corner_radius=6)
            row_frame.grid(row=r, column=0, columnspan=7, sticky="ew", pady=2)
            row_frame.grid_columnconfigure((0, 1, 2, 3, 4, 5, 6), weight=1)

            ctk.CTkLabel(row_frame, text=line["code"], font=ctk.CTkFont(family="Cairo", size=11, weight="bold"), text_color="#f8fafc").grid(row=0, column=0, padx=6, pady=6)
            ctk.CTkLabel(row_frame, text=line["name"], font=ctk.CTkFont(family="Cairo", size=11), text_color="#cbd5e1").grid(row=0, column=1, padx=6, pady=6)
            ctk.CTkLabel(row_frame, text=type_names.get(line["line_type"], line["line_type"]), font=ctk.CTkFont(family="Cairo", size=11), text_color="#10b981").grid(row=0, column=2, padx=6, pady=6)
            ctk.CTkLabel(row_frame, text=f"{line['lanes_count']} حارة", font=ctk.CTkFont(family="Cairo", size=11), text_color="#cbd5e1").grid(row=0, column=3, padx=6, pady=6)
            ctk.CTkLabel(row_frame, text=f"{line['speed_cps']} كوب/ث", font=ctk.CTkFont(family="Cairo", size=11), text_color="#f59e0b").grid(row=0, column=4, padx=6, pady=6)
            ctk.CTkLabel(row_frame, text=f"{line['target_capacity_tph']} طن/س", font=ctk.CTkFont(family="Cairo", size=11), text_color="#38bdf8").grid(row=0, column=5, padx=6, pady=6)

            # زر الحذف
            del_btn = ctk.CTkButton(
                row_frame,
                text="حذف 🗑️",
                font=ctk.CTkFont(family="Cairo", size=10),
                width=65,
                height=26,
                fg_color="#ef4444",
                hover_color="#dc2626",
                command=lambda lid=line["id"]: self.delete_line(lid)
            )
            del_btn.grid(row=0, column=6, padx=6, pady=4)

    def save_line(self):
        """حفظ خط إنتاج جديد في قاعدة البيانات"""
        code = self.code_entry.get().strip()
        name = self.name_entry.get().strip()
        raw_type = self.type_combo.get()

        if not code or not name:
            messagebox.showwarning("بيانات ناقصة", "يرجى إدخال كود واسم الخط بشكل صحيح.")
            return

        type_mapping = {
            "خط فرز وتدريج موالح (Citrus Line)": "citrus",
            "خط تفريغ وتدريج تفاحيات مائي (Apple Line)": "apple",
            "خط فحص وفرز تمور بالأشعة (Dates Line)": "dates",
            "خط تعبئة آلية وروبوتات (Robotic Packing)": "packaging",
            "خط إنتاج وتصنيع مخصص (Custom Line)": "custom",
        }
        line_type = type_mapping.get(raw_type, "custom")

        try:
            lanes = int(self.lanes_entry.get().strip() or "4")
            speed = float(self.speed_entry.get().strip() or "12.0")
            target_cap = float(self.target_cap_entry.get().strip() or "8.0")
        except ValueError:
            messagebox.showerror("خطأ إدخال", "يرجى التأكد من كتابة الأرقام بشكل صحيح في خانات الحارات والسرعة والطاقة.")
            return

        cam = self.camera_entry.get().strip()
        plc = self.plc_entry.get().strip()

        try:
            self.db.add_production_line(
                code=code,
                name=name,
                line_type=line_type,
                lanes_count=lanes,
                speed_cps=speed,
                target_capacity=target_cap,
                optical_model=cam,
                camera_ip="192.168.1.130",
                plc_ip=plc,
                active_preset="وصفة قياسية أولية"
            )
            messagebox.showinfo("تم الحفظ", f"تمت إضافة خط الإنتاج الجديد ({name}) بنجاح إلى المنظومة.")
            self.clear_form()
            self.load_lines()
            if self.on_lines_updated:
                self.on_lines_updated()
        except Exception as e:
            messagebox.showerror("خطأ", f"تعذر حفظ الخط: {str(e)}")

    def delete_line(self, line_id):
        """حذف خط الإنتاج بعد تأكيد المستخدم"""
        if messagebox.askyesno("تأكيد الحذف", "هل أنت متأكد من رغبتك في حذف هذا الخط نهائياً؟"):
            self.db.delete_production_line(line_id)
            self.load_lines()
            if self.on_lines_updated:
                self.on_lines_updated()

    def clear_form(self):
        self.code_entry.delete(0, 'end')
        self.name_entry.delete(0, 'end')
        self.code_entry.insert(0, "LINE-NEW-05")
        self.name_entry.insert(0, "خط فرز وتعبئة جديد")
