"""
نظام المبيعات والفواتير والضريبة - Sales & Invoicing Module
إنشاء فواتير المبيعات، حساب ضريبة القيمة المضافة 14%، وخصم المخزون آلياً
"""

import customtkinter as ctk
from tkinter import messagebox


class SalesView(ctk.CTkFrame):
    """إطار المبيعات وإصدار الفواتير الضريبية"""

    def __init__(self, master, db, on_invoice_created=None):
        super().__init__(master, fg_color="transparent")
        self.db = db
        self.on_invoice_created = on_invoice_created
        self.invoice_items = []  # بنود الفاتورة الحالية

        self.grid_columnconfigure((0, 1), weight=1)
        self.grid_rowconfigure(1, weight=1)

        self.setup_ui()
        self.refresh_products_list()

    def setup_ui(self):
        # 1. شريط العنوان
        header = ctk.CTkFrame(self, fg_color="transparent")
        header.grid(row=0, column=0, columnspan=2, sticky="ew", padx=10, pady=(0, 15))

        ctk.CTkLabel(
            header,
            text="نقطة البيع وإصدار الفواتير الإلكترونية (POS & Sales)",
            font=ctk.CTkFont(family="Cairo", size=22, weight="bold"),
            text_color="#ffffff"
        ).pack(side="right")

        # 2. العمود الأيمن: منشئ الفاتورة وإضافة البنود
        left_panel = ctk.CTkFrame(self, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        left_panel.grid(row=1, column=1, sticky="nsew", padx=(5, 10), pady=5)
        left_panel.grid_columnconfigure(0, weight=1)

        ctk.CTkLabel(
            left_panel,
            text="إضافة أصناف للفاتورة",
            font=ctk.CTkFont(family="Cairo", size=15, weight="bold"),
            text_color="#10b981"
        ).pack(anchor="e", padx=15, pady=(15, 10))

        # اختيار نوع الفاتورة والعميل
        party_frame = ctk.CTkFrame(left_panel, fg_color="transparent")
        party_frame.pack(fill="x", padx=15, pady=5)

        ctk.CTkLabel(party_frame, text="اسم العميل / المستلم:", font=ctk.CTkFont(family="Cairo", size=11), text_color="#cbd5e1").pack(anchor="e")
        self.party_entry = ctk.CTkEntry(party_frame, font=ctk.CTkFont(family="Cairo", size=12), height=32, placeholder_text="مثال: شركة النيل للتصدير والتبريد")
        self.party_entry.insert(0, "عميل نقدي صالة التعبئة")
        self.party_entry.pack(fill="x", pady=(2, 8))

        # اختيار الصنف
        ctk.CTkLabel(party_frame, text="اختر المنتج / المحصول:", font=ctk.CTkFont(family="Cairo", size=11), text_color="#cbd5e1").pack(anchor="e")
        self.product_combo = ctk.CTkComboBox(party_frame, font=ctk.CTkFont(family="Cairo", size=12), height=32, values=[], command=self.on_product_selected)
        self.product_combo.pack(fill="x", pady=(2, 8))

        # الكمية وسعر الوحدة
        qty_price_grid = ctk.CTkFrame(party_frame, fg_color="transparent")
        qty_price_grid.pack(fill="x", pady=5)
        qty_price_grid.grid_columnconfigure((0, 1), weight=1)

        # حقل السعر
        price_box = ctk.CTkFrame(qty_price_grid, fg_color="transparent")
        price_box.grid(row=0, column=0, padx=3, sticky="ew")
        ctk.CTkLabel(price_box, text="سعر الوحدة (ج.م):", font=ctk.CTkFont(family="Cairo", size=11), text_color="#cbd5e1").pack(anchor="e")
        self.price_entry = ctk.CTkEntry(price_box, font=ctk.CTkFont(family="Cairo", size=12), height=32)
        self.price_entry.pack(fill="x")

        # حقل الكمية
        qty_box = ctk.CTkFrame(qty_price_grid, fg_color="transparent")
        qty_box.grid(row=0, column=1, padx=3, sticky="ew")
        ctk.CTkLabel(qty_box, text="الكمية المطلوبة:", font=ctk.CTkFont(family="Cairo", size=11), text_color="#cbd5e1").pack(anchor="e")
        self.qty_entry = ctk.CTkEntry(qty_box, font=ctk.CTkFont(family="Cairo", size=12), height=32)
        self.qty_entry.insert(0, "1")
        self.qty_entry.pack(fill="x")

        # تسمية توضح الرصيد المتاح
        self.avail_stock_lbl = ctk.CTkLabel(
            party_frame,
            text="الرصيد المتاح بالمستودع: --",
            font=ctk.CTkFont(family="Cairo", size=11),
            text_color="#38bdf8"
        )
        self.avail_stock_lbl.pack(anchor="e", pady=4)

        # زر إضافة البند للفاتورة
        add_item_btn = ctk.CTkButton(
            party_frame,
            text="إدراج في الفاتورة ⬇️",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            fg_color="#3b82f6",
            hover_color="#2563eb",
            height=36,
            command=self.add_item_to_invoice
        )
        add_item_btn.pack(fill="x", pady=10)

        # 3. العمود الأيسر: بنود الفاتورة الحسابية وملخص الضريبة والإجمالي
        right_panel = ctk.CTkFrame(self, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        right_panel.grid(row=1, column=0, sticky="nsew", padx=(10, 5), pady=5)
        right_panel.grid_rowconfigure(1, weight=1)
        right_panel.grid_columnconfigure(0, weight=1)

        ctk.CTkLabel(
            right_panel,
            text="معاينة بنود الفاتورة ومجموع الضريبة",
            font=ctk.CTkFont(family="Cairo", size=15, weight="bold"),
            text_color="#f8fafc"
        ).grid(row=0, column=0, sticky="e", padx=15, pady=12)

        # جدول البنود
        self.items_table = ctk.CTkScrollableFrame(right_panel, fg_color="transparent")
        self.items_table.grid(row=1, column=0, sticky="nsew", padx=15, pady=5)
        self.items_table.grid_columnconfigure((0, 1, 2, 3, 4), weight=1)

        # ملخص الحسابات المالية وضريبة 14%
        totals_card = ctk.CTkFrame(right_panel, fg_color="#0f172a", corner_radius=8, border_width=1, border_color="#334155")
        totals_card.grid(row=2, column=0, sticky="ew", padx=15, pady=15)
        totals_card.grid_columnconfigure((0, 1), weight=1)

        self.subtotal_lbl = self.add_summary_row(totals_card, "المجموع قبل الضريبة (Subtotal):", "0.00 ج.م", 0)
        self.vat_lbl = self.add_summary_row(totals_card, "ضريبة القيمة المضافة (VAT 14%):", "0.00 ج.م", 1, text_color="#f59e0b")
        self.grand_total_lbl = self.add_summary_row(totals_card, "الإجمالي المستحق (Grand Total):", "0.00 ج.م", 2, text_color="#10b981", size=16, is_bold=True)

        # أزرار الحفظ والإلغاء
        actions_bar = ctk.CTkFrame(right_panel, fg_color="transparent")
        actions_bar.grid(row=3, column=0, sticky="ew", padx=15, pady=(0, 15))

        ctk.CTkButton(
            actions_bar,
            text="تأكيد وحفظ الفاتورة وترحيل المخزون ✅",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            fg_color="#10b981",
            hover_color="#059669",
            height=40,
            command=self.confirm_and_save_invoice
        ).pack(side="right", fill="x", expand=True, padx=4)

        ctk.CTkButton(
            actions_bar,
            text="إلغاء الفاتورة",
            font=ctk.CTkFont(family="Cairo", size=12),
            fg_color="#475569",
            hover_color="#334155",
            height=40,
            width=100,
            command=self.reset_invoice
        ).pack(side="left", padx=4)

        self.render_items_table()

    def add_summary_row(self, parent, label_text, val_text, row, text_color="#ffffff", size=12, is_bold=False):
        lbl = ctk.CTkLabel(parent, text=label_text, font=ctk.CTkFont(family="Cairo", size=size, weight="bold" if is_bold else "normal"), text_color="#94a3b8")
        lbl.grid(row=row, column=1, sticky="e", padx=15, pady=4)

        weight = "bold" if is_bold else "normal"
        val_lbl = ctk.CTkLabel(parent, text=val_text, font=ctk.CTkFont(family="Cairo", size=size, weight=weight), text_color=text_color)
        val_lbl.grid(row=row, column=0, sticky="w", padx=15, pady=4)
        return val_lbl

    def refresh_products_list(self):
        """تحديث قائمة المنتجات من قاعدة البيانات"""
        self.products = self.db.get_all_products()
        combo_values = [f"{p['sku']} - {p['name']}" for p in self.products]
        self.product_combo.configure(values=combo_values)
        if combo_values:
            self.product_combo.set(combo_values[0])
            self.on_product_selected(combo_values[0])

    def on_product_selected(self, choice):
        """عند اختيار منتج، يتم تعبئة السعر الافتراضي والكمية المتاحة"""
        sku = choice.split(" - ")[0]
        for p in self.products:
            if p["sku"] == sku:
                self.selected_product = p
                self.price_entry.delete(0, "end")
                self.price_entry.insert(0, str(p["sell_price"]))
                self.avail_stock_lbl.configure(text=f"الرصيد المتاح بالمستودع: {p['quantity']:,.1f} {p['unit']}")
                break

    def add_item_to_invoice(self):
        """إضافة الصنف المحدد إلى جدول الفاتورة"""
        try:
            qty = float(self.qty_entry.get())
            price = float(self.price_entry.get())

            if qty <= 0 or price <= 0:
                messagebox.showerror("خطأ", "يجب أن تكون الكمية والسعر أكبر من الصفر")
                return

            # فحص رصيد المخزن المتاح
            if qty > self.selected_product["quantity"]:
                messagebox.showwarning("تنبيه مخزني", f"الكمية المطلوبة ({qty}) تفوق المتوفر بالمخزون ({self.selected_product['quantity']})")
                return

            line_total = qty * price
            self.invoice_items.append({
                "product_id": self.selected_product["id"],
                "sku": self.selected_product["sku"],
                "product_name": self.selected_product["name"],
                "quantity": qty,
                "unit_price": price,
                "line_total": line_total
            })

            self.render_items_table()
            self.calculate_totals()
            self.qty_entry.delete(0, "end")
            self.qty_entry.insert(0, "1")
        except ValueError:
            messagebox.showerror("خطأ", "يرجى إدخال قيم عددية صحيحة للكمية والسعر")

    def render_items_table(self):
        """إعادة رسم جدول البنود"""
        for w in self.items_table.winfo_children():
            w.destroy()

        headers = ["الصنف", "الكمية", "السعر", "الإجمالي", "حذف"]
        for c, h in enumerate(headers):
            ctk.CTkLabel(
                self.items_table,
                text=h,
                font=ctk.CTkFont(family="Cairo", size=11, weight="bold"),
                text_color="#94a3b8"
            ).grid(row=0, column=c, padx=4, pady=4, sticky="ew")

        if not self.invoice_items:
            ctk.CTkLabel(
                self.items_table,
                text="الفاتورة فارغة حالياً. أضف بنوداً من اللوحة اليمنى.",
                font=ctk.CTkFont(family="Cairo", size=11),
                text_color="#64748b"
            ).grid(row=1, column=0, columnspan=5, pady=20)
            return

        for r, item in enumerate(self.invoice_items, start=1):
            ctk.CTkLabel(self.items_table, text=item["product_name"][:20], font=ctk.CTkFont(family="Cairo", size=11), text_color="#ffffff").grid(row=r, column=0, padx=2, pady=2)
            ctk.CTkLabel(self.items_table, text=f"{item['quantity']}", font=ctk.CTkFont(family="Cairo", size=11), text_color="#cbd5e1").grid(row=r, column=1, padx=2, pady=2)
            ctk.CTkLabel(self.items_table, text=f"{item['unit_price']:,.2f}", font=ctk.CTkFont(family="Cairo", size=11), text_color="#cbd5e1").grid(row=r, column=2, padx=2, pady=2)
            ctk.CTkLabel(self.items_table, text=f"{item['line_total']:,.2f}", font=ctk.CTkFont(family="Cairo", size=11, weight="bold"), text_color="#34d399").grid(row=r, column=3, padx=2, pady=2)

            del_btn = ctk.CTkButton(
                self.items_table,
                text="✕",
                width=24,
                height=22,
                fg_color="#ef4444",
                hover_color="#dc2626",
                command=lambda idx=r-1: self.remove_item(idx)
            )
            del_btn.grid(row=r, column=4, padx=2, pady=2)

    def remove_item(self, idx):
        """حذف بند من الفاتورة"""
        if 0 <= idx < len(self.invoice_items):
            self.invoice_items.pop(idx)
            self.render_items_table()
            self.calculate_totals()

    def calculate_totals(self):
        """حساب المجموع وضريبة 14% والإجمالي النهائي"""
        subtotal = sum(i["line_total"] for i in self.invoice_items)
        vat = subtotal * 0.14
        grand = subtotal + vat

        self.subtotal_lbl.configure(text=f"{subtotal:,.2f} ج.م")
        self.vat_lbl.configure(text=f"{vat:,.2f} ج.م")
        self.grand_total_lbl.configure(text=f"{grand:,.2f} ج.م")

    def reset_invoice(self):
        """إلغاء وتفريغ الفاتورة"""
        self.invoice_items = []
        self.render_items_table()
        self.calculate_totals()

    def confirm_and_save_invoice(self):
        """حفظ الفاتورة في قاعدة البيانات وخصم المخزن"""
        if not self.invoice_items:
            messagebox.showwarning("تنبيه", "لا توجد بنود بالفاتورة لتأكيدها")
            return

        party = self.party_entry.get().strip() or "عميل نقدي"
        try:
            inv_number, grand = self.db.create_invoice(
                invoice_type="sale",
                party_name=party,
                items=self.invoice_items,
                vat_rate=14.0
            )
            messagebox.showinfo(
                "نجاح الفاتورة",
                f"تم حفظ الفاتورة بنجاح!\n\nرقم الفاتورة: {inv_number}\nالإجمالي شامل الضريبة: {grand:,.2f} ج.م\n\nتم خصم الكميات من المخزون آلياً."
            )
            self.reset_invoice()
            self.refresh_products_list()
            if self.on_invoice_created:
                self.on_invoice_created()
        except Exception as e:
            messagebox.showerror("خطأ في الحفظ", f"حدث خطأ أثناء حفظ الفاتورة: {str(e)}")
