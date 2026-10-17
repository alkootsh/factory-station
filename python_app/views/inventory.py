"""
إدارة المخزون والأصناف - Inventory Management View
إضافة، تعديل، حذف، والبحث في المنتجات مع تنبيهات انخفاض الكميات
"""

import customtkinter as ctk
from tkinter import messagebox


class InventoryView(ctk.CTkFrame):
    """إطار إدارة المخزون والأصناف"""

    def __init__(self, master, db):
        super().__init__(master, fg_color="transparent")
        self.db = db
        self.selected_product_id = None

        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(2, weight=1)

        self.setup_ui()
        self.load_products()

    def setup_ui(self):
        # 1. شريط العنوان والبحث
        top_bar = ctk.CTkFrame(self, fg_color="transparent")
        top_bar.grid(row=0, column=0, sticky="ew", padx=10, pady=(0, 15))

        title_lbl = ctk.CTkLabel(
            top_bar,
            text="إدارة المخزون والمحاصيل (Inventory)",
            font=ctk.CTkFont(family="Cairo", size=22, weight="bold"),
            text_color="#ffffff"
        )
        title_lbl.pack(side="right")

        self.search_entry = ctk.CTkEntry(
            top_bar,
            placeholder_text="بحث بالاسم أو الكود (SKU)...",
            font=ctk.CTkFont(family="Cairo", size=12),
            width=250,
            height=34
        )
        self.search_entry.pack(side="left", padx=(0, 10))
        self.search_entry.bind("<KeyRelease>", lambda event: self.load_products(self.search_entry.get()))

        # 2. بطاقة إدخال وتعديل البيانات (Form)
        form_card = ctk.CTkFrame(self, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        form_card.grid(row=1, column=0, sticky="ew", padx=10, pady=(0, 15))

        form_title = ctk.CTkLabel(
            form_card,
            text="بيانات الصنف (إضافة / تعديل)",
            font=ctk.CTkFont(family="Cairo", size=14, weight="bold"),
            text_color="#38bdf8"
        )
        form_title.pack(anchor="e", padx=15, pady=(10, 5))

        # شبكة الحقول
        inputs_grid = ctk.CTkFrame(form_card, fg_color="transparent")
        inputs_grid.pack(fill="x", padx=15, pady=10)
        inputs_grid.grid_columnconfigure((0, 1, 2, 3), weight=1)

        # الحقول
        self.sku_entry = self.add_labeled_entry(inputs_grid, "كود الصنف (SKU)", 0, 3)
        self.name_entry = self.add_labeled_entry(inputs_grid, "اسم المنتج / المحصول", 0, 2)
        self.cat_entry = self.add_labeled_entry(inputs_grid, "التصنيف", 0, 1)
        self.unit_entry = self.add_labeled_entry(inputs_grid, "وحدة القياس (كجم/صندوق)", 0, 0)

        self.buy_entry = self.add_labeled_entry(inputs_grid, "سعر الشراء (التكلفة)", 1, 3)
        self.sell_entry = self.add_labeled_entry(inputs_grid, "سعر البيع", 1, 2)
        self.qty_entry = self.add_labeled_entry(inputs_grid, "الكمية المتوفرة", 1, 1)
        self.alert_entry = self.add_labeled_entry(inputs_grid, "حد تنبيه الطلب", 1, 0)

        # أزرار الإجراءات
        btn_bar = ctk.CTkFrame(form_card, fg_color="transparent")
        btn_bar.pack(fill="x", padx=15, pady=(5, 15))

        self.add_btn = ctk.CTkButton(
            btn_bar,
            text="إضافة صنف جديد +",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            fg_color="#10b981",
            hover_color="#059669",
            width=130,
            command=self.save_new_product
        )
        self.add_btn.pack(side="right", padx=5)

        self.edit_btn = ctk.CTkButton(
            btn_bar,
            text="حفظ التعديلات 💾",
            font=ctk.CTkFont(family="Cairo", size=13),
            fg_color="#3b82f6",
            hover_color="#2563eb",
            width=120,
            state="disabled",
            command=self.save_edited_product
        )
        self.edit_btn.pack(side="right", padx=5)

        self.del_btn = ctk.CTkButton(
            btn_bar,
            text="حذف الصنف 🗑️",
            font=ctk.CTkFont(family="Cairo", size=13),
            fg_color="#ef4444",
            hover_color="#dc2626",
            width=100,
            state="disabled",
            command=self.delete_selected_product
        )
        self.del_btn.pack(side="right", padx=5)

        self.clear_btn = ctk.CTkButton(
            btn_bar,
            text="تفريغ الحقول",
            font=ctk.CTkFont(family="Cairo", size=12),
            fg_color="#475569",
            hover_color="#334155",
            width=100,
            command=self.clear_form
        )
        self.clear_btn.pack(side="left", padx=5)

        # 3. جدول الأصناف (Table)
        table_card = ctk.CTkFrame(self, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        table_card.grid(row=2, column=0, sticky="nsew", padx=10, pady=5)
        table_card.grid_rowconfigure(1, weight=1)
        table_card.grid_columnconfigure(0, weight=1)

        ctk.CTkLabel(
            table_card,
            text="قائمة المخزون الحالية (اضغط على أي صنف للتعديل)",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            text_color="#94a3b8"
        ).grid(row=0, column=0, sticky="e", padx=15, pady=10)

        self.scroll_table = ctk.CTkScrollableFrame(table_card, fg_color="transparent")
        self.scroll_table.grid(row=1, column=0, sticky="nsew", padx=15, pady=(0, 15))
        self.scroll_table.grid_columnconfigure((0, 1, 2, 3, 4, 5, 6, 7), weight=1)

    def add_labeled_entry(self, parent, label_text, row, col):
        frame = ctk.CTkFrame(parent, fg_color="transparent")
        frame.grid(row=row, column=col, padx=5, pady=4, sticky="ew")

        lbl = ctk.CTkLabel(
            frame,
            text=label_text,
            font=ctk.CTkFont(family="Cairo", size=11),
            text_color="#cbd5e1"
        )
        lbl.pack(anchor="e", pady=(0, 2))

        entry = ctk.CTkEntry(
            frame,
            font=ctk.CTkFont(family="Cairo", size=12),
            height=32
        )
        entry.pack(fill="x")
        return entry

    def load_products(self, query=""):
        """جلب الأصناف وعرضها في الجدول"""
        for w in self.scroll_table.winfo_children():
            w.destroy()

        headers = ["كود SKU", "اسم الصنف", "التصنيف", "سعر الشراء", "سعر البيع", "الكمية", "الوحدة", "الحالة"]
        for col_idx, h in enumerate(headers):
            lbl = ctk.CTkLabel(
                self.scroll_table,
                text=h,
                font=ctk.CTkFont(family="Cairo", size=12, weight="bold"),
                text_color="#94a3b8"
            )
            lbl.grid(row=0, column=col_idx, padx=5, pady=6, sticky="ew")

        products = self.db.get_all_products(query)
        for r_idx, prod in enumerate(products, start=1):
            is_low = prod["quantity"] <= prod["min_stock_alert"]
            status_text = "⚠️ منخفض" if is_low else "✔️ متوفر"
            status_color = "#ef4444" if is_low else "#10b981"

            cols = [
                (prod["sku"], "#f8fafc"),
                (prod["name"], "#e2e8f0"),
                (prod["category"], "#94a3b8"),
                (f"{prod['buy_price']:,.2f}", "#cbd5e1"),
                (f"{prod['sell_price']:,.2f}", "#38bdf8"),
                (f"{prod['quantity']:,.1f}", "#ffffff"),
                (prod["unit"], "#94a3b8"),
                (status_text, status_color)
            ]

            bg = "#0f172a" if r_idx % 2 == 0 else "transparent"
            for c_idx, (text_val, text_col) in enumerate(cols):
                btn = ctk.CTkButton(
                    self.scroll_table,
                    text=text_val,
                    font=ctk.CTkFont(family="Cairo", size=11),
                    text_color=text_col,
                    fg_color=bg,
                    hover_color="#334155",
                    corner_radius=4,
                    height=28,
                    command=lambda p=prod: self.select_product(p)
                )
                btn.grid(row=r_idx, column=c_idx, padx=2, pady=2, sticky="ew")

    def select_product(self, prod):
        """تعبئة الحقول ببيانات الصنف المختار للتعديل"""
        self.selected_product_id = prod["id"]

        self.sku_entry.delete(0, "end")
        self.sku_entry.insert(0, prod["sku"])

        self.name_entry.delete(0, "end")
        self.name_entry.insert(0, prod["name"])

        self.cat_entry.delete(0, "end")
        self.cat_entry.insert(0, prod["category"])

        self.unit_entry.delete(0, "end")
        self.unit_entry.insert(0, prod["unit"])

        self.buy_entry.delete(0, "end")
        self.buy_entry.insert(0, str(prod["buy_price"]))

        self.sell_entry.delete(0, "end")
        self.sell_entry.insert(0, str(prod["sell_price"]))

        self.qty_entry.delete(0, "end")
        self.qty_entry.insert(0, str(prod["quantity"]))

        self.alert_entry.delete(0, "end")
        self.alert_entry.insert(0, str(prod["min_stock_alert"]))

        self.edit_btn.configure(state="normal")
        self.del_btn.configure(state="normal")
        self.add_btn.configure(state="disabled")

    def clear_form(self):
        """تفريغ حقول الإدخال"""
        self.selected_product_id = None
        for entry in [self.sku_entry, self.name_entry, self.cat_entry, self.unit_entry,
                      self.buy_entry, self.sell_entry, self.qty_entry, self.alert_entry]:
            entry.delete(0, "end")
        self.edit_btn.configure(state="disabled")
        self.del_btn.configure(state="disabled")
        self.add_btn.configure(state="normal")

    def save_new_product(self):
        """حفظ صنف جديد"""
        try:
            sku = self.sku_entry.get()
            name = self.name_entry.get()
            cat = self.cat_entry.get() or "عام"
            unit = self.unit_entry.get() or "kg"
            buy = float(self.buy_entry.get() or 0)
            sell = float(self.sell_entry.get() or 0)
            qty = float(self.qty_entry.get() or 0)
            alert = float(self.alert_entry.get() or 10)

            if not sku or not name:
                messagebox.showerror("خطأ", "يرجى إدخال كود الصنف واسم المنتج")
                return

            self.db.add_product(sku, name, cat, buy, sell, qty, unit, alert)
            messagebox.showinfo("نجاح", f"تمت إضافة الصنف {name} بنجاح إلى المخزون")
            self.clear_form()
            self.load_products()
        except Exception as e:
            messagebox.showerror("خطأ", f"تعذر حفظ الصنف: {str(e)}")

    def save_edited_product(self):
        """تحديث بيانات الصنف المختار"""
        if not self.selected_product_id:
            return
        try:
            self.db.update_product(
                self.selected_product_id,
                self.sku_entry.get(),
                self.name_entry.get(),
                self.cat_entry.get(),
                float(self.buy_entry.get() or 0),
                float(self.sell_entry.get() or 0),
                float(self.qty_entry.get() or 0),
                self.unit_entry.get(),
                float(self.alert_entry.get() or 10)
            )
            messagebox.showinfo("نجاح", "تم تحديث بيانات الصنف بنجاح")
            self.clear_form()
            self.load_products()
        except Exception as e:
            messagebox.showerror("خطأ", f"تعذر التعديل: {str(e)}")

    def delete_selected_product(self):
        """حذف الصنف"""
        if not self.selected_product_id:
            return
        if messagebox.askyesno("تأكيد الحذف", "هل أنت متأكد من حذف هذا الصنف من قاعدة البيانات؟"):
            self.db.delete_product(self.selected_product_id)
            messagebox.showinfo("تم", "تم حذف الصنف بنجاح")
            self.clear_form()
            self.load_products()
