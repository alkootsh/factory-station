"""
برنامج إدارة والتحكم في خطوط الإنتاج والفرز والتعبئة والمحاسبة - Main Desktop Application
بايثون مع واجهة عصرية CustomTkinter، وقاعدة بيانات SQLite3، وتنبيهات ذكية مخصصة حسب نوع الخط
منظومة عين الصقر (Falcon Eye Agrobotic OS)
"""

import customtkinter as ctk
import os
import sys

# ضبط وضع المظهر الداكن والتنسيق اللوني
ctk.set_appearance_mode("Dark")
ctk.set_default_color_theme("green")

# استيراد الوحدات الداخلية للنظام
from database import DatabaseManager
from views.dashboard import DashboardView
from views.line_control import LineControlView
from views.lines_manager import LinesManagerView
from views.alerts_engine import AlertsEngineView
from views.setup_wizard import SetupWizardView
from views.plc_hardware_bridge import PLCHardwareBridgeView
from views.peripherals_hub import PeripheralsHubView
from views.inventory import InventoryView
from views.sales import SalesView
from views.reports import ReportsView
from views.ai_assistant import AIAssistantView


class AgroboticAccountingApp(ctk.CTk):
    """النافذة الرئيسية لتطبيق إدارة والتحكم في خطوط الإنتاج والفرز والتعبئة"""

    def __init__(self):
        super().__init__()

        # تهيئة قاعدة البيانات SQLite3
        self.db = DatabaseManager()

        # قراءة إعدادات وتهيئة المنشأة
        self.config = self.db.get_system_config()

        # إعدادات النافذة الرئيسية
        self.title(f"منظومة عين الصقر - {self.config.get('facility_name', 'إدارة خطوط الإنتاج والفرز الذكية')}")
        self.geometry("1280x760")
        self.minsize(1040, 660)

        # ضبط تقسيم الشبكة
        self.grid_columnconfigure(0, weight=1)   # مساحة المحتوى
        self.grid_columnconfigure(1, weight=0)   # الشريط الجانبي الأيمن
        self.grid_rowconfigure(0, weight=1)

        self.setup_sidebar()
        self.setup_views()

        # إذا لم يتم الإعداد الأولي، افتح معالج التهيئة أولاً
        if not self.config.get("setup_completed", False):
            self.select_view("setup_wizard")
        else:
            self.select_view("dashboard")

    def setup_sidebar(self):
        """إنشاء الشريط الجانبي للتنقل بين موديولات التحكم والخطوط والحسابات"""
        self.sidebar_frame = ctk.CTkFrame(self, width=240, corner_radius=0, fg_color="#0f172a")
        self.sidebar_frame.grid(row=0, column=1, sticky="nsew")
        self.sidebar_frame.grid_rowconfigure(10, weight=1)

        # شعار وعنوان المنظومة
        logo_label = ctk.CTkLabel(
            self.sidebar_frame,
            text="🦅 FALCON EYE OS",
            font=ctk.CTkFont(family="Cairo", size=18, weight="bold"),
            text_color="#10b981"
        )
        logo_label.grid(row=0, column=0, padx=20, pady=(18, 2))

        self.fac_badge = ctk.CTkLabel(
            self.sidebar_frame,
            text=self.get_facility_badge_text(),
            font=ctk.CTkFont(family="Cairo", size=11),
            text_color="#38bdf8"
        )
        self.fac_badge.grid(row=1, column=0, padx=20, pady=(0, 15))

        # أزرار التنقل الرئيسية
        self.nav_buttons = {}
        nav_items = [
            ("dashboard", "📊 لوحة المؤشرات العامة", 2),
            ("ai_assistant", "🤖 المساعد الذكي وشرح النظام", 3),
            ("line_control", "🎛️ تشغيل وتحكم الخطوط", 4),
            ("lines_manager", "🏭 إدارة وتكوين الخطوط", 5),
            ("alerts_engine", "⚠️ التنبيهات والأعطال", 6),
            ("plc_bridge", "🔌 الربط الصناعي ووحدات PLC", 7),
            ("peripherals_hub", "⚖️ الموازين والطابعات والحساسات", 8),
            ("inventory", "📦 إدارة المخزون والأصناف", 9),
            ("sales", "🧾 نقطة البيع والفواتير", 10),
            ("reports", "📑 التقارير وسجل العمليات", 11),
            ("setup_wizard", "⚙️ معالج التهيئة وإعداد الخط", 12),
        ]

        for view_name, label_text, row in nav_items:
            btn = ctk.CTkButton(
                self.sidebar_frame,
                text=label_text,
                font=ctk.CTkFont(family="Cairo", size=12),
                anchor="e",
                height=36,
                corner_radius=8,
                fg_color="transparent",
                text_color="#94a3b8",
                hover_color="#1e293b",
                command=lambda name=view_name: self.select_view(name)
            )
            btn.grid(row=row, column=0, padx=12, pady=2, sticky="ew")
            self.nav_buttons[view_name] = btn

        # بطاقة حالة خط الإنتاج في أسفل الشريط الجانبي
        self.status_card = ctk.CTkFrame(self.sidebar_frame, fg_color="#1e293b", corner_radius=10)
        self.status_card.grid(row=13, column=0, padx=12, pady=12, sticky="ew")

        self.line_status_lbl = ctk.CTkLabel(
            self.status_card,
            text="الخطوط العاملة: جاري الفحص...",
            font=ctk.CTkFont(family="Cairo", size=11, weight="bold"),
            text_color="#34d399"
        )
        self.line_status_lbl.pack(anchor="e", padx=10, pady=(8, 2))

        self.alert_badge_lbl = ctk.CTkLabel(
            self.status_card,
            text="التنبيهات النشطة: --",
            font=ctk.CTkFont(family="Cairo", size=10),
            text_color="#f59e0b"
        )
        self.alert_badge_lbl.pack(anchor="e", padx=10, pady=(0, 8))
        self.update_sidebar_status()

    def get_facility_badge_text(self):
        """تحديد نص الشارة ونوع الإنتاج النشط"""
        type_names = {
            "citrus": "🍊 محطة فرز الموالح",
            "apple": "🍏 محطة تفاحيات مائي",
            "dates": "🌴 محطة فرز التمور",
            "packaging": "🤖 خطوط تعبئة وروبوتات",
            "enterprise": "🌐 محطة شاملة متعددة",
        }
        p_type = self.config.get("production_type", "citrus")
        return type_names.get(p_type, "محطة فرز وتعبئة ذكية")

    def update_sidebar_status(self):
        """تحديث بطاقة حالة الخطوط والتنبيهات في الشريط الجانبي"""
        metrics = self.db.get_dashboard_metrics()
        self.line_status_lbl.configure(text=f"الخطوط العاملة: {metrics['running_lines']} من {metrics['total_lines']} خط")
        if metrics["critical_alerts_count"] > 0:
            self.alert_badge_lbl.configure(text=f"🚨 {metrics['critical_alerts_count']} إنذار حرج يتطلب تدخلاً", text_color="#ef4444")
        elif metrics["active_alerts_count"] > 0:
            self.alert_badge_lbl.configure(text=f"⚠️ {metrics['active_alerts_count']} تنبيه تشغيلي", text_color="#f59e0b")
        else:
            self.alert_badge_lbl.configure(text="✅ الحساسات والسيور تعمل بأمان", text_color="#10b981")

    def setup_views(self):
        """تهيئة إطارات الواجهات المختلفة وربط الأحداث"""
        self.container = ctk.CTkFrame(self, fg_color="#090d16", corner_radius=0)
        self.container.grid(row=0, column=0, sticky="nsew", padx=15, pady=15)
        self.container.grid_rowconfigure(0, weight=1)
        self.container.grid_columnconfigure(0, weight=1)

        self.views = {
            "dashboard": DashboardView(self.container, self.db, on_navigate=self.select_view),
            "ai_assistant": AIAssistantView(self.container, self.db),
            "line_control": LineControlView(self.container, self.db, on_alert_triggered=self.on_system_data_updated),
            "lines_manager": LinesManagerView(self.container, self.db, on_lines_updated=self.on_system_data_updated),
            "alerts_engine": AlertsEngineView(self.container, self.db, on_alert_resolved=self.on_system_data_updated),
            "plc_bridge": PLCHardwareBridgeView(self.container, self.db),
            "peripherals_hub": PeripheralsHubView(self.container, self.db),
            "setup_wizard": SetupWizardView(self.container, self.db, on_setup_completed=self.on_setup_completed),
            "inventory": InventoryView(self.container, self.db),
            "sales": SalesView(self.container, self.db, on_invoice_created=self.on_system_data_updated),
            "reports": ReportsView(self.container, self.db),
        }

        for view in self.views.values():
            view.grid(row=0, column=0, sticky="nsew")

    def select_view(self, view_name):
        """التبديل بين الواجهات وتحديث تمييز الزر النشط"""
        for name, btn in self.nav_buttons.items():
            if name == view_name:
                btn.configure(fg_color="#1e293b", text_color="#10b981", font=ctk.CTkFont(family="Cairo", size=12, weight="bold"))
            else:
                btn.configure(fg_color="transparent", text_color="#94a3b8", font=ctk.CTkFont(family="Cairo", size=12))

        target_view = self.views.get(view_name)
        if target_view:
            target_view.tkraise()
            if hasattr(target_view, "refresh_data"):
                target_view.refresh_data()
            elif hasattr(target_view, "load_lines_list"):
                target_view.load_lines_list()
            elif hasattr(target_view, "load_lines"):
                target_view.load_lines()
            elif hasattr(target_view, "load_alerts"):
                target_view.load_alerts()
            elif hasattr(target_view, "load_products"):
                target_view.load_products()
            elif hasattr(target_view, "refresh_products_list"):
                target_view.refresh_products_list()
            elif hasattr(target_view, "load_transactions"):
                target_view.load_transactions()
            elif hasattr(target_view, "load_current_settings"):
                target_view.load_current_settings()

        self.update_sidebar_status()

    def on_system_data_updated(self):
        """تحديث بيانات لوحة التحكم والحالة عند أي تغيير بالخطوط أو التنبيهات أو الفواتير"""
        self.update_sidebar_status()
        if "dashboard" in self.views:
            self.views["dashboard"].refresh_data()
        if "reports" in self.views:
            self.views["reports"].load_transactions()

    def on_setup_completed(self):
        """عند استكمال أو تعديل الإعداد الأولي"""
        self.config = self.db.get_system_config()
        self.title(f"منظومة عين الصقر - {self.config.get('facility_name', 'إدارة خطوط الإنتاج والفرز الذكية')}")
        self.fac_badge.configure(text=self.get_facility_badge_text())
        self.on_system_data_updated()
        # الانتقال إلى لوحة المؤشرات
        self.select_view("dashboard")


if __name__ == "__main__":
    app = AgroboticAccountingApp()
    app.mainloop()
