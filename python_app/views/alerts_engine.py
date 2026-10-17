"""
محرك التنبيهات الذكي المخصص حسب نوع خط الإنتاج - Line-Specific Alerts Engine View
إدارة وتتبع إنذارات الخطوط، التنبيهات الفنية، وخطوات المعالجة المقترحة لكل نوع محصول وتقنية
"""

import customtkinter as ctk
from tkinter import messagebox


class AlertsEngineView(ctk.CTkFrame):
    """إطار استعراض وتتبع التنبيهات المخصصة حسب نوع الخط"""

    def __init__(self, master, db, on_alert_resolved=None):
        super().__init__(master, fg_color="transparent")
        self.db = db
        self.on_alert_resolved = on_alert_resolved

        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(2, weight=1)

        self.setup_ui()
        self.load_alerts()

    def setup_ui(self):
        # 1. شريط العنوان وأدوات التصفية
        top_bar = ctk.CTkFrame(self, fg_color="transparent")
        top_bar.grid(row=0, column=0, sticky="ew", padx=10, pady=(0, 15))

        title_lbl = ctk.CTkLabel(
            top_bar,
            text="⚠️ محرك التنبيهات والإنذارات المخصص حسب نوع الخط (Smart Alerts Engine)",
            font=ctk.CTkFont(family="Cairo", size=20, weight="bold"),
            text_color="#ffffff"
        )
        title_lbl.pack(side="right")

        # أدوات التصفية السريعة
        filter_box = ctk.CTkFrame(top_bar, fg_color="transparent")
        filter_box.pack(side="left")

        ctk.CTkLabel(filter_box, text="تصفية حسب نوع الخط:", font=ctk.CTkFont(family="Cairo", size=11), text_color="#94a3b8").pack(side="right", padx=6)
        self.type_filter = ctk.CTkComboBox(
            filter_box,
            font=ctk.CTkFont(family="Cairo", size=11),
            width=200,
            values=["جميع أنواع الخطوط", "خطوط الموالح (Citrus)", "خطوط التفاحيات (Apple)", "خطوط التمور (Dates)", "خطوط التعبئة (Packaging)"],
            command=lambda v: self.load_alerts()
        )
        self.type_filter.set("جميع أنواع الخطوط")
        self.type_filter.pack(side="left", padx=5)

        # 2. بطاقات إحصائيات التنبيهات
        kpi_frame = ctk.CTkFrame(self, fg_color="transparent")
        kpi_frame.grid(row=1, column=0, sticky="ew", padx=10, pady=(0, 15))
        kpi_frame.grid_columnconfigure((0, 1, 2, 3), weight=1)

        self.crit_card = self.create_alert_kpi(kpi_frame, 0, 3, "إنذارات حرجة (Critical)", "0", "#ef4444", "توقف فوري أو خطر على المنتج")
        self.warn_card = self.create_alert_kpi(kpi_frame, 0, 2, "تحذيرات تشغيلية (Warnings)", "0", "#f59e0b", "انخفاض كفاءة أو انحراف معايير")
        self.info_card = self.create_alert_kpi(kpi_frame, 0, 1, "إشعارات فنية (Info)", "0", "#38bdf8", "معايرة أو دورات نظافة دورية")
        self.total_card = self.create_alert_kpi(kpi_frame, 0, 0, "إجمالي التنبيهات النشطة", "0", "#10b981", "تتطلب متابعة من المشغل")

        # 3. جدول وبطاقات التنبيهات المفصلة
        alerts_card = ctk.CTkFrame(self, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        alerts_card.grid(row=2, column=0, sticky="nsew", padx=10, pady=5)
        alerts_card.grid_rowconfigure(1, weight=1)
        alerts_card.grid_columnconfigure(0, weight=1)

        header_tbl = ctk.CTkFrame(alerts_card, fg_color="transparent")
        header_tbl.grid(row=0, column=0, sticky="ew", padx=15, pady=12)

        ctk.CTkLabel(
            header_tbl,
            text="سجل التنبيهات المخصصة الفعالة والإجراءات العلاجية الفورية",
            font=ctk.CTkFont(family="Cairo", size=14, weight="bold"),
            text_color="#f8fafc"
        ).pack(side="right")

        refresh_btn = ctk.CTkButton(
            header_tbl,
            text="تحديث التنبيهات ⟳",
            font=ctk.CTkFont(family="Cairo", size=12),
            width=110,
            height=30,
            fg_color="#0284c7",
            hover_color="#0369a1",
            command=self.load_alerts
        )
        refresh_btn.pack(side="left")

        self.scroll_alerts = ctk.CTkScrollableFrame(alerts_card, fg_color="transparent")
        self.scroll_alerts.grid(row=1, column=0, sticky="nsew", padx=15, pady=(0, 15))
        self.scroll_alerts.grid_columnconfigure(0, weight=1)

    def create_alert_kpi(self, parent, row, col, title, initial_val, color, desc):
        card = ctk.CTkFrame(parent, fg_color="#1e293b", corner_radius=10, border_width=1, border_color="#334155")
        card.grid(row=row, column=col, padx=4, sticky="nsew")

        ctk.CTkLabel(card, text=title, font=ctk.CTkFont(family="Cairo", size=11, weight="bold"), text_color="#cbd5e1").pack(anchor="e", padx=10, pady=(8, 0))
        val_lbl = ctk.CTkLabel(card, text=initial_val, font=ctk.CTkFont(family="Cairo", size=20, weight="bold"), text_color=color)
        val_lbl.pack(anchor="e", padx=10, pady=(2, 0))
        ctk.CTkLabel(card, text=desc, font=ctk.CTkFont(family="Cairo", size=9), text_color="#64748b").pack(anchor="e", padx=10, pady=(0, 8))
        return val_lbl

    def load_alerts(self):
        """تحميل وتصفية التنبيهات من قاعدة البيانات"""
        for w in self.scroll_alerts.winfo_children():
            w.destroy()

        selected_filter = self.type_filter.get()
        filter_type = None
        if "موالح" in selected_filter:
            filter_type = "citrus"
        elif "تفاح" in selected_filter:
            filter_type = "apple"
        elif "تمور" in selected_filter:
            filter_type = "dates"
        elif "تعبئة" in selected_filter:
            filter_type = "packaging"

        alerts = self.db.get_line_alerts(line_type=filter_type, status="active")

        # تحديث بطاقات الأرقام
        crit_count = sum(1 for a in alerts if a["severity"] == "critical")
        warn_count = sum(1 for a in alerts if a["severity"] == "warning")
        info_count = sum(1 for a in alerts if a["severity"] == "info")

        self.crit_card.configure(text=str(crit_count))
        self.warn_card.configure(text=str(warn_count))
        self.info_card.configure(text=str(info_count))
        self.total_card.configure(text=str(len(alerts)))

        if not alerts:
            no_alert_frame = ctk.CTkFrame(self.scroll_alerts, fg_color="#0f172a", corner_radius=10)
            no_alert_frame.pack(fill="x", padx=10, pady=20)
            ctk.CTkLabel(
                no_alert_frame,
                text="✅ لا توجد تنبيهات نشطة حالياً لنوع الخط المختار. جميع الحساسات والمحركات تعمل ضمن النطاق الطبيعي.",
                font=ctk.CTkFont(family="Cairo", size=13),
                text_color="#10b981"
            ).pack(pady=20)
            return

        severity_colors = {
            "critical": ("#ef4444", "🚨 إنذار حرج"),
            "warning": ("#f59e0b", "⚠️ تحذير تشغيلي"),
            "info": ("#38bdf8", "ℹ️ إشعار فني"),
        }

        type_names = {
            "citrus": "خط فرز وتدريج الموالح (Citrus Line)",
            "apple": "خط تفريغ وتدريج التفاحيات (Apple Line)",
            "dates": "خط فرز التمور بالأشعة (Dates Line)",
            "packaging": "خط التعبئة الروبوتية (Packaging Line)",
            "custom": "خط إنتاج مخصص",
        }

        for alert in alerts:
            sev_color, sev_text = severity_colors.get(alert["severity"], ("#94a3b8", "تنبيه"))

            card = ctk.CTkFrame(self.scroll_alerts, fg_color="#0f172a", corner_radius=10, border_width=1, border_color=sev_color)
            card.pack(fill="x", pady=6, padx=4)

            # رأس التنبيه
            head = ctk.CTkFrame(card, fg_color="transparent")
            head.pack(fill="x", padx=12, pady=(10, 4))

            # كود واسم الخط
            line_lbl = ctk.CTkLabel(
                head,
                text=f"{alert['alert_code']} | {alert['line_name']} ({type_names.get(alert['line_type'], alert['line_type'])})",
                font=ctk.CTkFont(family="Cairo", size=11, weight="bold"),
                text_color="#94a3b8"
            )
            line_lbl.pack(side="right")

            # شارة الخطورة
            badge = ctk.CTkLabel(
                head,
                text=sev_text,
                font=ctk.CTkFont(family="Cairo", size=11, weight="bold"),
                text_color=sev_color,
                fg_color="#1e293b",
                corner_radius=6,
                padx=8,
                pady=2
            )
            badge.pack(side="left")

            # عنوان ورسالة العطل
            ctk.CTkLabel(
                card,
                text=alert["title"],
                font=ctk.CTkFont(family="Cairo", size=14, weight="bold"),
                text_color="#ffffff",
                anchor="e"
            ).pack(fill="x", padx=12, pady=(2, 4))

            ctk.CTkLabel(
                card,
                text=alert["message"],
                font=ctk.CTkFont(family="Cairo", size=12),
                text_color="#cbd5e1",
                anchor="e",
                justify="right"
            ).pack(fill="x", padx=12, pady=(0, 6))

            # صندوق الإجراء التصحيحي الفوري
            action_box = ctk.CTkFrame(card, fg_color="#1e293b", corner_radius=6)
            action_box.pack(fill="x", padx=12, pady=(0, 10))

            ctk.CTkLabel(
                action_box,
                text=f"🔧 الإجراء العلاجي المقترح: {alert['recommended_action']}",
                font=ctk.CTkFont(family="Cairo", size=11, weight="bold"),
                text_color="#38bdf8",
                anchor="e",
                justify="right"
            ).pack(side="right", padx=10, pady=8)

            # زر حل التنبيه
            resolve_btn = ctk.CTkButton(
                action_box,
                text="تم الحل وإعادة التعيين ✔",
                font=ctk.CTkFont(family="Cairo", size=11, weight="bold"),
                width=150,
                height=28,
                fg_color="#10b981",
                hover_color="#059669",
                command=lambda aid=alert["id"]: self.resolve_alert(aid)
            )
            resolve_btn.pack(side="left", padx=8, pady=6)

    def resolve_alert(self, alert_id):
        """حل التنبيه وتحديث الحالة"""
        self.db.resolve_alert(alert_id)
        messagebox.showinfo("تم الحل", "تم تسجيل حل التنبيه بنجاح وإعادة حالة المراقبة الطبيعية للخط.")
        self.load_alerts()
        if self.on_alert_resolved:
            self.on_alert_resolved()
