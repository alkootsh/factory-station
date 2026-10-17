"""
نظام التقارير ودفتر الأستاذ - Reports & Accounting Transactions View
عرض تقرير شامل لكافة الحركات المالية والفواتير وضريبة القيمة المضافة
"""

import customtkinter as ctk
import csv
from tkinter import messagebox, filedialog
from datetime import datetime


class ReportsView(ctk.CTkFrame):
    """إطار التقارير والمعاملات المحاسبية"""

    def __init__(self, master, db):
        super().__init__(master, fg_color="transparent")
        self.db = db

        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(2, weight=1)

        self.setup_ui()
        self.load_transactions()

    def setup_ui(self):
        # 1. شريط العنوان
        header = ctk.CTkFrame(self, fg_color="transparent")
        header.grid(row=0, column=0, sticky="ew", padx=10, pady=(0, 15))

        ctk.CTkLabel(
            header,
            text="التقارير المحاسبية وسجل المعاملات (Financial Reports)",
            font=ctk.CTkFont(family="Cairo", size=22, weight="bold"),
            text_color="#ffffff"
        ).pack(side="right")

        export_btn = ctk.CTkButton(
            header,
            text="تصدير كـ ملف CSV 📥",
            font=ctk.CTkFont(family="Cairo", size=13),
            fg_color="#3b82f6",
            hover_color="#2563eb",
            height=34,
            command=self.export_to_csv
        )
        export_btn.pack(side="left", padx=5)

        # 2. ملخص الضرائب والأرقام
        summary_card = ctk.CTkFrame(self, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        summary_card.grid(row=1, column=0, sticky="ew", padx=10, pady=(0, 15))
        summary_card.grid_columnconfigure((0, 1, 2), weight=1)

        self.total_tx_lbl = self.add_card_metric(summary_card, 2, "عدد المعاملات المسجلة", "0 حركة", "#cbd5e1")
        self.total_vol_lbl = self.add_card_metric(summary_card, 1, "حجم التداول الكلي", "0.00 ج.م", "#10b981")
        self.total_vat_lbl = self.add_card_metric(summary_card, 0, "إجمالي ضريبة VAT (14%) المحصلة", "0.00 ج.م", "#f59e0b")

        # 3. جدول المعاملات
        table_card = ctk.CTkFrame(self, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        table_card.grid(row=2, column=0, sticky="nsew", padx=10, pady=5)
        table_card.grid_rowconfigure(1, weight=1)
        table_card.grid_columnconfigure(0, weight=1)

        ctk.CTkLabel(
            table_card,
            text="دفتر اليومية وجميع الحركات المالية",
            font=ctk.CTkFont(family="Cairo", size=14, weight="bold"),
            text_color="#94a3b8"
        ).grid(row=0, column=0, sticky="e", padx=15, pady=10)

        self.scroll_table = ctk.CTkScrollableFrame(table_card, fg_color="transparent")
        self.scroll_table.grid(row=1, column=0, sticky="nsew", padx=15, pady=(0, 15))
        self.scroll_table.grid_columnconfigure((0, 1, 2, 3, 4), weight=1)

    def add_card_metric(self, parent, col, title, initial_val, color):
        frame = ctk.CTkFrame(parent, fg_color="transparent")
        frame.grid(row=0, column=col, padx=15, pady=12, sticky="nsew")

        ctk.CTkLabel(frame, text=title, font=ctk.CTkFont(family="Cairo", size=11), text_color="#94a3b8").pack(anchor="e")
        val_lbl = ctk.CTkLabel(frame, text=initial_val, font=ctk.CTkFont(family="Cairo", size=16, weight="bold"), text_color=color)
        val_lbl.pack(anchor="e", pady=(2, 0))
        return val_lbl

    def load_transactions(self):
        """تحميل الحركات من قاعدة البيانات وعرضها"""
        for w in self.scroll_table.winfo_children():
            w.destroy()

        headers = ["المعرف", "نوع الحركة", "رقم المرجع / الفاتورة", "البيان / الوصف", "المبلغ الإجمالي"]
        for c, h in enumerate(headers):
            ctk.CTkLabel(
                self.scroll_table,
                text=h,
                font=ctk.CTkFont(family="Cairo", size=12, weight="bold"),
                text_color="#94a3b8"
            ).grid(row=0, column=c, padx=6, pady=6, sticky="ew")

        txs = self.db.get_all_transactions()
        metrics = self.db.get_dashboard_metrics()

        self.total_tx_lbl.configure(text=f"{len(txs)} حركة")
        self.total_vol_lbl.configure(text=f"{metrics['total_sales'] + metrics['total_purchases']:,.2f} ج.م")
        self.total_vat_lbl.configure(text=f"{metrics['total_vat_collected']:,.2f} ج.م")

        if not txs:
            ctk.CTkLabel(
                self.scroll_table,
                text="لا توجد حركات مالية مسجلة بعد",
                font=ctk.CTkFont(family="Cairo", size=12),
                text_color="#64748b"
            ).grid(row=1, column=0, columnspan=5, pady=30)
            return

        for r, tx in enumerate(txs, start=1):
            bg = "#0f172a" if r % 2 == 0 else "transparent"
            type_color = "#10b981" if tx["tx_type"] == "مبيعات" else "#3b82f6"

            row_data = [
                (f"#{tx['id']}", "#64748b"),
                (tx["tx_type"], type_color),
                (tx["reference_id"] or "--", "#cbd5e1"),
                (tx["description"], "#e2e8f0"),
                (f"{tx['amount']:,.2f} ج.م", "#34d399")
            ]

            for c, (val, col) in enumerate(row_data):
                ctk.CTkLabel(
                    self.scroll_table,
                    text=val,
                    font=ctk.CTkFont(family="Cairo", size=11),
                    text_color=col,
                    fg_color=bg,
                    corner_radius=4
                ).grid(row=r, column=c, padx=4, pady=4, sticky="ew")

    def export_to_csv(self):
        """تصدير تقرير المعاملات إلى ملف CSV خارجي"""
        txs = self.db.get_all_transactions()
        if not txs:
            messagebox.showwarning("تنبيه", "لا توجد بيانات لتصديرها")
            return

        file_path = filedialog.asksaveasfilename(
            defaultextension=".csv",
            filetypes=[("ملف CSV", "*.csv")],
            initialfile=f"تقرير_المعاملات_{datetime.now().strftime('%Y%m%d')}.csv"
        )

        if not file_path:
            return

        try:
            with open(file_path, mode="w", newline="", encoding="utf-8-sig") as f:
                writer = csv.writer(f)
                writer.writerow(["المعرف", "نوع المعاملة", "المرجع", "البيان", "المبلغ", "التاريخ"])
                for tx in txs:
                    writer.writerow([tx["id"], tx["tx_type"], tx["reference_id"], tx["description"], tx["amount"], tx["created_at"]])

            messagebox.showinfo("نجاح التصدير", f"تم حفظ التقرير بنجاح في:\n{file_path}")
        except Exception as e:
            messagebox.showerror("خطأ", f"تعذر حفظ الملف: {str(e)}")
