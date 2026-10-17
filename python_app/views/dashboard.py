"""
لوحة التحكم الشاملة - Unified Industrial & Accounting Dashboard View
تجمع بين مؤشرات تشغيل خطوط الإنتاج والفرز والتعبئة، والتنبيهات، والرقابة المالية والمخزنية
"""

import customtkinter as ctk


class DashboardView(ctk.CTkFrame):
    """إطار لوحة التحكم والمؤشرات الإجمالية للمحطة"""

    def __init__(self, master, db, on_navigate=None):
        super().__init__(master, fg_color="transparent")
        self.db = db
        self.on_navigate = on_navigate

        self.grid_columnconfigure((0, 1, 2), weight=1)
        self.grid_rowconfigure(3, weight=1)

        self.setup_ui()
        self.refresh_data()

    def setup_ui(self):
        # 1. شريط العنوان
        header_frame = ctk.CTkFrame(self, fg_color="transparent")
        header_frame.grid(row=0, column=0, columnspan=3, sticky="ew", padx=10, pady=(0, 15))

        title_lbl = ctk.CTkLabel(
            header_frame,
            text="📊 لوحة التحكم والمراقبة الصناعية والمحاسبية (Master Dashboard)",
            font=ctk.CTkFont(family="Cairo", size=20, weight="bold"),
            text_color="#ffffff"
        )
        title_lbl.pack(side="right", padx=5)

        refresh_btn = ctk.CTkButton(
            header_frame,
            text="تحديث البيانات ⟳",
            font=ctk.CTkFont(family="Cairo", size=13),
            width=110,
            height=32,
            fg_color="#10b981",
            hover_color="#059669",
            command=self.refresh_data
        )
        refresh_btn.pack(side="left", padx=5)

        # 2. مؤشرات خطوط الإنتاج والفرز والتنبيهات (Industrial Line KPIs)
        ind_frame = ctk.CTkFrame(self, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        ind_frame.grid(row=1, column=0, columnspan=3, sticky="ew", padx=10, pady=(0, 15))
        ind_frame.grid_columnconfigure((0, 1, 2, 3), weight=1)

        ctk.CTkLabel(
            ind_frame,
            text="حالة خطوط الإنتاج والفرز والتعبئة الحالية (Real-time Line Telemetry)",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            text_color="#38bdf8"
        ).grid(row=0, column=0, columnspan=4, sticky="e", padx=15, pady=(10, 4))

        self.lines_active_card = self.create_ind_stat(ind_frame, 1, 3, "الخطوط في الخدمة", "0 / 0 خط", "#10b981")
        self.output_tph_card = self.create_ind_stat(ind_frame, 1, 2, "الطاقة الإنتاجية الإجمالية", "0.0 طن/ساعة", "#38bdf8")
        self.alerts_active_card = self.create_ind_stat(ind_frame, 1, 1, "تنبيهات خطوط الإنتاج النشطة", "0 تنبيه", "#f59e0b")
        self.crit_alerts_card = self.create_ind_stat(ind_frame, 1, 0, "إنذارات حرجة تتطلب تدخلاً", "0 عطل", "#ef4444")

        # 3. بطاقات المؤشرات المالية والمخزنية (Financial & ERP KPIs)
        cards_frame = ctk.CTkFrame(self, fg_color="transparent")
        cards_frame.grid(row=2, column=0, columnspan=3, sticky="ew", padx=10, pady=(0, 15))
        cards_frame.grid_columnconfigure((0, 1, 2, 3), weight=1)

        self.sales_card = self.create_metric_card(
            cards_frame, 3, "إجمالي المبيعات", "0.00 ج.م", "#10b981", "📈 مبيعات شاملة الضريبة"
        )
        self.purchases_card = self.create_metric_card(
            cards_frame, 2, "إجمالي المشتريات", "0.00 ج.م", "#3b82f6", "🛒 فواتير التوريد والخامات"
        )
        self.stock_card = self.create_metric_card(
            cards_frame, 1, "قيمة المخزون بسعر التكلفة", "0.00 ج.م", "#f59e0b", "📦 بضاعة حاضرة بالمستودع"
        )
        self.low_stock_card = self.create_metric_card(
            cards_frame, 0, "أصناف قاربت النفاد", "0 صنف", "#ef4444", "⚠️ بحاجة لإعادة الطلب"
        )

        # 4. جدول حالة الخطوط وقائمة أحدث المعاملات
        tables_frame = ctk.CTkFrame(self, fg_color="transparent")
        tables_frame.grid(row=3, column=0, columnspan=3, sticky="nsew", padx=10, pady=5)
        tables_frame.grid_rowconfigure(0, weight=1)
        tables_frame.grid_columnconfigure((0, 1), weight=1)

        # جدول خطوط الإنتاج والفرز (يسار/يمين حسب RTL)
        lines_container = ctk.CTkFrame(tables_frame, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        lines_container.grid(row=0, column=1, sticky="nsew", padx=(5, 0))
        lines_container.grid_rowconfigure(1, weight=1)
        lines_container.grid_columnconfigure(0, weight=1)

        ctk.CTkLabel(
            lines_container,
            text="نظرة عامة على خطوط المحطة",
            font=ctk.CTkFont(family="Cairo", size=14, weight="bold"),
            text_color="#f8fafc"
        ).grid(row=0, column=0, sticky="e", padx=15, pady=10)

        self.scroll_lines = ctk.CTkScrollableFrame(lines_container, fg_color="transparent")
        self.scroll_lines.grid(row=1, column=0, sticky="nsew", padx=10, pady=(0, 10))
        self.scroll_lines.grid_columnconfigure((0, 1, 2, 3), weight=1)

        # جدول أحدث الفواتير والمعاملات
        tx_container = ctk.CTkFrame(tables_frame, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        tx_container.grid(row=0, column=0, sticky="nsew", padx=(0, 5))
        tx_container.grid_rowconfigure(1, weight=1)
        tx_container.grid_columnconfigure(0, weight=1)

        ctk.CTkLabel(
            tx_container,
            text="أحدث الفواتير والعمليات المحاسبية",
            font=ctk.CTkFont(family="Cairo", size=14, weight="bold"),
            text_color="#f8fafc"
        ).grid(row=0, column=0, sticky="e", padx=15, pady=10)

        self.scroll_tx = ctk.CTkScrollableFrame(tx_container, fg_color="transparent")
        self.scroll_tx.grid(row=1, column=0, sticky="nsew", padx=10, pady=(0, 10))
        self.scroll_tx.grid_columnconfigure((0, 1, 2, 3), weight=1)

    def create_ind_stat(self, parent, row, col, title, initial_val, color):
        frame = ctk.CTkFrame(parent, fg_color="#0f172a", corner_radius=8)
        frame.grid(row=row, column=col, padx=8, pady=(0, 12), sticky="nsew")

        ctk.CTkLabel(frame, text=title, font=ctk.CTkFont(family="Cairo", size=11), text_color="#94a3b8").pack(anchor="e", padx=12, pady=(8, 2))
        val_lbl = ctk.CTkLabel(frame, text=initial_val, font=ctk.CTkFont(family="Cairo", size=17, weight="bold"), text_color=color)
        val_lbl.pack(anchor="e", padx=12, pady=(0, 8))
        return val_lbl

    def create_metric_card(self, parent, col, title, initial_val, accent_color, subtitle):
        card = ctk.CTkFrame(parent, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        card.grid(row=0, column=col, padx=4, sticky="nsew")

        ctk.CTkLabel(card, text=title, font=ctk.CTkFont(family="Cairo", size=12), text_color="#94a3b8").pack(anchor="e", padx=15, pady=(12, 4))
        val_lbl = ctk.CTkLabel(card, text=initial_val, font=ctk.CTkFont(family="Cairo", size=18, weight="bold"), text_color=accent_color)
        val_lbl.pack(anchor="e", padx=15, pady=(0, 4))
        ctk.CTkLabel(card, text=subtitle, font=ctk.CTkFont(family="Cairo", size=10), text_color="#64748b").pack(anchor="e", padx=15, pady=(0, 12))
        return val_lbl

    def refresh_data(self):
        """تحديث كافة المؤشرات وقوائم الخطوط والفواتير"""
        metrics = self.db.get_dashboard_metrics()

        # تحديث أرقام الخطوط
        total_l = metrics.get("total_lines", 0)
        running_l = metrics.get("running_lines", 0)
        self.lines_active_card.configure(text=f"{running_l} / {total_l} خط")
        self.output_tph_card.configure(text=f"{metrics.get('total_output_tph', 0.0):.1f} طن/ساعة")
        self.alerts_active_card.configure(text=f"{metrics.get('active_alerts_count', 0)} تنبيه")
        self.crit_alerts_card.configure(text=f"{metrics.get('critical_alerts_count', 0)} عطل")

        # تحديث الأرقام المالية
        self.sales_card.configure(text=f"{metrics['total_sales']:,.2f} ج.م")
        self.purchases_card.configure(text=f"{metrics['total_purchases']:,.2f} ج.م")
        self.stock_card.configure(text=f"{metrics['inventory_val']:,.2f} ج.م")
        self.low_stock_card.configure(text=f"{metrics['low_stock_count']} صنف")

        # تحديث جدول الخطوط المصغرة
        for w in self.scroll_lines.winfo_children():
            w.destroy()

        lines = self.db.get_all_lines()
        for idx, line in enumerate(lines):
            row_bg = "#0f172a" if idx % 2 == 0 else "transparent"
            rf = ctk.CTkFrame(self.scroll_lines, fg_color=row_bg, corner_radius=6)
            rf.pack(fill="x", pady=2)
            rf.grid_columnconfigure((0, 1, 2), weight=1)

            st_colors = {"running": "#10b981", "idle": "#f59e0b", "alert": "#ef4444", "maintenance": "#8b5cf6"}
            st_text = {"running": "يعمل", "idle": "متوقف", "alert": "تنبيه", "maintenance": "صيانة"}

            ctk.CTkLabel(rf, text=line["name"], font=ctk.CTkFont(family="Cairo", size=11, weight="bold"), text_color="#f8fafc", anchor="e").grid(row=0, column=2, padx=8, pady=6, sticky="e")
            ctk.CTkLabel(rf, text=f"{line['current_output_tph']} طن/س", font=ctk.CTkFont(family="Cairo", size=11), text_color="#38bdf8").grid(row=0, column=1, padx=6, pady=6)
            ctk.CTkLabel(rf, text=st_text.get(line["status"], line["status"]), font=ctk.CTkFont(family="Cairo", size=10, weight="bold"), text_color=st_colors.get(line["status"], "#94a3b8")).grid(row=0, column=0, padx=6, pady=6)

        # تحديث جدول الفواتير
        for w in self.scroll_tx.winfo_children():
            w.destroy()

        invoices = self.db.get_recent_invoices(limit=6)
        for idx, inv in enumerate(invoices):
            row_bg = "#0f172a" if idx % 2 == 0 else "transparent"
            rf = ctk.CTkFrame(self.scroll_tx, fg_color=row_bg, corner_radius=6)
            rf.pack(fill="x", pady=2)
            rf.grid_columnconfigure((0, 1, 2), weight=1)

            ctk.CTkLabel(rf, text=inv["party_name"], font=ctk.CTkFont(family="Cairo", size=11), text_color="#cbd5e1", anchor="e").grid(row=0, column=2, padx=8, pady=6, sticky="e")
            ctk.CTkLabel(rf, text=f"{inv['grand_total']:,.2f} ج.م", font=ctk.CTkFont(family="Cairo", size=11, weight="bold"), text_color="#10b981").grid(row=0, column=1, padx=6, pady=6)
            ctk.CTkLabel(rf, text=inv["invoice_number"], font=ctk.CTkFont(family="Cairo", size=10), text_color="#64748b").grid(row=0, column=0, padx=6, pady=6)
