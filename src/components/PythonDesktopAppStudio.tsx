import React, { useState } from 'react';
import {
  Code,
  Download,
  Copy,
  Terminal,
  FolderCode,
  Layers,
  CheckCircle2,
  Package,
  FileSpreadsheet,
  Plus,
  Trash2,
  RefreshCw,
  Calculator,
  ShieldCheck,
  Monitor,
  Zap,
  Sliders,
  Play,
  Pause,
  AlertTriangle,
  Cpu,
  Radio,
  Sparkles,
  Settings,
  Scale,
  Printer,
  Tag,
  Gauge,
  Activity,
  CheckSquare,
} from 'lucide-react';

interface PythonDesktopAppStudioProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const PythonDesktopAppStudio: React.FC<PythonDesktopAppStudioProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [activeCodeTab, setActiveCodeTab] = useState<string>('main.py');
  const [copied, setCopied] = useState<boolean>(false);

  // Commercial Brand & Identity State
  const [commercialBrandName, setCommercialBrandName] = useState('Falcon Eye Agrobotic OS - منظومة عين الصقر');
  const [brandTagline, setBrandTagline] = useState('المنظومة الذكية لإدارة والتحكم في خطوط الفرز والتعبئة والأتمتة الصناعية');
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [tempBrandName, setTempBrandName] = useState(commercialBrandName);
  const [tempTagline, setTempTagline] = useState(brandTagline);

  // Dynamic Scale & Checkweigher State
  const [liveWeight, setLiveWeight] = useState(214.5);
  const [tareOffset, setTareOffset] = useState(0.0);
  const [weightCaliber, setWeightCaliber] = useState({
    name: 'نخب أول تصدير (Grade A)',
    range: '190 - 240 g',
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
  });

  // Industrial Printer State
  const [printLot, setPrintLot] = useState('LOT-EG-261017-01');
  const [printVariety, setPrintVariety] = useState('برتقال فالنسيا نخب أول تصدير - كاليبر 5');
  const [printJobLogs, setPrintJobLogs] = useState<Array<{ id: number; lot: string; time: string; status: string }>>([
    { id: 1, lot: 'LOT-EG-261017-01', time: '12:04:12', status: 'Printed (Zebra ZT411)' }
  ]);

  // Electronic Cards & Relays State
  const [activeMosfetPulses, setActiveMosfetPulses] = useState<{ [key: number]: boolean }>({});
  const [activeRelays, setActiveRelays] = useState<{ [key: number]: boolean }>({
    1: true,  // سير التغذية
    2: true,  // غسيل بالفرش
    3: true,  // مروحة التجفيف
    4: false, // مضخة التشميع
    5: true,  // إضاءة كابينة الرؤية
    6: true,  // مضخة حوض التفريغ
    7: true,  // شيلر تبريد المياه
    8: true,  // كمبروسر الهواء
  });

  // GUI Emulator State
  const [emulatorTab, setEmulatorTab] = useState<
    'setup_wizard' | 'line_control' | 'alerts_engine' | 'plc_bridge' | 'peripherals_hub' | 'dashboard' | 'inventory' | 'sales' | 'reports'
  >('setup_wizard');

  // Facility Setup State
  const [selectedProdType, setSelectedProdType] = useState<'citrus' | 'apple' | 'dates' | 'packaging'>('citrus');
  const [facilityName, setFacilityName] = useState('محطة الأندلس لتصدير الحاصلات');
  const [operatingMode, setOperatingMode] = useState('integrated');
  const [plcIp, setPlcIp] = useState('192.168.1.50');
  const [hwProtocol, setHwProtocol] = useState('Modbus TCP (Ethernet)');
  const [hwConnected, setHwConnected] = useState(true);

  // Line Control State
  const [lineStatus, setLineStatus] = useState<'running' | 'idle' | 'alert'>('running');
  const [conveyorSpeed, setConveyorSpeed] = useState<number>(14.0);
  const [lineOutputTph, setLineOutputTph] = useState<number>(9.8);
  const [encoderPulses, setEncoderPulses] = useState<number>(1420);

  // Alerts State
  const [alertsList, setAlertsList] = useState([
    {
      id: 1,
      code: 'ALM-PRS-212',
      type: 'citrus',
      severity: 'warning',
      title: 'انخفاض ضغط هواء بوابات الطرد (5.2 Bar)',
      desc: 'ضغط الهواء غير كافٍ لفتح بوابات الطرد الهوائي بالسرعة المطلوبة للأكواب.',
      action: 'مراجعة صمام الضغط الرئيسي وتنظيف الفلتر الهوائي لوحدة الطرد.',
    },
    {
      id: 2,
      code: 'ALM-CAM-104',
      type: 'citrus',
      severity: 'info',
      title: 'ضبابية عدسة الكاميرا الضوئية - غبار الشمع بالحارة 2',
      desc: 'تراكم خفيف للغبار وبقايا التشميع على زجاج حجرة التصوير العلوية للحارات.',
      action: 'تفعيل دورة نفث الهواء المضغوط الذاتي لتنظيف العدسات أو المسح اليدوي.',
    },
  ]);

  // Emulator Data State (Inventory & Sales)
  const [inventoryList, setInventoryList] = useState([
    { id: 1, sku: 'CIT-VAL-01', name: 'برتقال فالنسيا نخب أول تصدير', category: 'موالح', buyPrice: 12.0, sellPrice: 24.0, qty: 1500, unit: 'kg', minAlert: 100 },
    { id: 2, sku: 'CIT-NAV-02', name: 'برتقال أبو سرة صنف قياسي', category: 'موالح', buyPrice: 9.5, sellPrice: 18.0, qty: 2200, unit: 'kg', minAlert: 150 },
    { id: 3, sku: 'APP-GAL-03', name: 'تفاح جالا أحمر فاخر (صندوق 18 كجم)', category: 'تفاحيات', buyPrice: 380.0, sellPrice: 520.0, qty: 120, unit: 'box', minAlert: 20 },
    { id: 4, sku: 'DAT-MED-04', name: 'تمر مجهول سوبر جامبو (كرتونة 5 كجم)', category: 'تمور', buyPrice: 650.0, sellPrice: 920.0, qty: 85, unit: 'box', minAlert: 15 },
    { id: 5, sku: 'PKG-TRY-06', name: 'صواني كرتون مقسمة 48 حبة (Line Pack)', category: 'مواد تعبئة', buyPrice: 3.2, sellPrice: 5.5, qty: 3000, unit: 'unit', minAlert: 500 },
  ]);

  const [invoicesHistory, setInvoicesHistory] = useState([
    { id: 1, invNumber: 'INV-2026-0001', party: 'شركة الأندلس لتصدير الحاصلات', subtotal: 12480.0, vat: 1747.2, grand: 14227.2, date: '2026-10-17' },
  ]);

  const [salesParty, setSalesParty] = useState('شركة دلتا النيل للتصدير');
  const [selectedProductId, setSelectedProductId] = useState<number>(1);
  const [salesQty, setSalesQty] = useState<number>(100);
  const [salesItems, setSalesItems] = useState<{ id: number; name: string; qty: number; price: number; total: number }[]>([
    { id: 1, name: 'برتقال فالنسيا نخب أول تصدير', qty: 100, price: 24.0, total: 2400.0 }
  ]);

  // Accounting Calculation
  const subtotal = salesItems.reduce((acc, itm) => acc + itm.total, 0);
  const vatAmount = subtotal * 0.14;
  const grandTotal = subtotal + vatAmount;

  // Metric Calculation
  const totalSales = invoicesHistory.reduce((acc, inv) => acc + inv.grand, 0);
  const stockValue = inventoryList.reduce((acc, p) => acc + (p.qty * p.buyPrice), 0);

  // Handlers
  const handleAddItemToInvoice = () => {
    const prod = inventoryList.find((p) => p.id === Number(selectedProductId));
    if (!prod) return;
    if (salesQty > prod.qty) {
      alert(isAr ? `تنبيه: الكمية المطلوبة (${salesQty}) تفوق الرصيد المتاح (${prod.qty})` : 'Warning: Quantity exceeds stock');
      return;
    }
    const itemTotal = salesQty * prod.sellPrice;
    setSalesItems([...salesItems, { id: prod.id, name: prod.name, qty: salesQty, price: prod.sellPrice, total: itemTotal }]);
  };

  const handleConfirmInvoice = () => {
    if (salesItems.length === 0) return;
    const invNum = `INV-2026-${String(invoicesHistory.length + 1).padStart(4, '0')}`;
    const newInv = {
      id: invoicesHistory.length + 1,
      invNumber: invNum,
      party: salesParty,
      subtotal,
      vat: vatAmount,
      grand: grandTotal,
      date: new Date().toISOString().split('T')[0]
    };
    setInvoicesHistory([newInv, ...invoicesHistory]);
    setInventoryList((prev) =>
      prev.map((p) => {
        const itemSold = salesItems.find((s) => s.id === p.id);
        if (itemSold) {
          return { ...p, qty: Math.max(0, p.qty - itemSold.qty) };
        }
        return p;
      })
    );
    setSalesItems([]);
    alert(isAr ? `تم إصدار الفاتورة ${invNum} بنجاح وخصم المخزون آلياً!` : 'Invoice confirmed and inventory deducted');
  };

  const handleSpeedChange = (newSpeed: number) => {
    setConveyorSpeed(newSpeed);
    const newOutput = Math.round((newSpeed / 14.0) * 10.5 * 10) / 10;
    setLineOutputTph(newOutput);
    setEncoderPulses(Math.round(newSpeed * 102));
  };

  const handleSimulateAlert = () => {
    const alertsPool = [
      {
        id: Date.now(),
        code: 'ALM-PRS-212',
        type: selectedProdType,
        severity: 'warning',
        title: 'انخفاض ضغط هواء بوابات الطرد (< 5.8 Bar)',
        desc: 'ضغط الهواء المغذي لبوابات الطرد السريعة أقل من الحد الآمن، قد يحدث تأخير في إخراج الثمار.',
        action: 'فحص كمبروسر الهواء وتنظيف فلتر الهواء الرئيسي.',
      },
      {
        id: Date.now(),
        code: 'ALM-VAC-502',
        type: 'packaging',
        severity: 'critical',
        title: 'ضعف تفريغ شفاط الروبوت ذراع 2 (-0.45 Bar)',
        desc: 'فقدان إحكام الشفاط للروبوت دلتا مما قد يسقط الثمار داخل الصواني الكرتونية.',
        action: 'فحص كؤوس السيليكون ومضخة الفاكيوم فوراً.',
      },
      {
        id: Date.now(),
        code: 'ALM-NIR-205',
        type: 'apple',
        severity: 'critical',
        title: 'رصد كدمات داخلية غير مرئية في التفاح بنسبة 7.5%',
        desc: 'مستشعر طيف الأشعة NIR كشف عن اسمرار داخلي باللب.',
        action: 'تحويل مخرج الدفعة الحالية تلقائياً لمسار العصير والتصنيع.',
      },
    ];
    const newAlt = alertsPool[Math.floor(Math.random() * alertsPool.length)];
    setAlertsList([newAlt, ...alertsList]);
    if (newAlt.severity === 'critical') setLineStatus('alert');
  };

  const handleResolveAlert = (id: number) => {
    const updated = alertsList.filter((a) => a.id !== id);
    setAlertsList(updated);
    if (!updated.some((a) => a.severity === 'critical')) {
      setLineStatus('running');
    }
  };

  // Full Python Files Content for Code Viewer
  const pythonFiles: Record<string, { path: string; code: string; desc: string }> = {
    'main.py': {
      path: 'python_app/main.py',
      desc: 'نقطة الدخول الرئيسية وتكوين واجهة CustomTkinter الداكنة وربط موديولات التحكم والمحاسبة',
      code: `"""
برنامج إدارة والتحكم في خطوط الإنتاج والفرز والتعبئة والمحاسبة - Main Desktop Application
بايثون مع واجهة عصرية CustomTkinter، وقاعدة بيانات SQLite3، وتنبيهات ذكية مخصصة حسب نوع الخط
منظومة عين الصقر (Falcon Eye Agrobotic OS)
"""

import customtkinter as ctk
import os
import sys

ctk.set_appearance_mode("Dark")
ctk.set_default_color_theme("green")

from database import DatabaseManager
from views.dashboard import DashboardView
from views.line_control import LineControlView
from views.lines_manager import LinesManagerView
from views.alerts_engine import AlertsEngineView
from views.setup_wizard import SetupWizardView
from views.plc_hardware_bridge import PLCHardwareBridgeView
from views.inventory import InventoryView
from views.sales import SalesView
from views.reports import ReportsView

class AgroboticAccountingApp(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.db = DatabaseManager()
        self.config = self.db.get_system_config()

        self.title(f"منظومة عين الصقر - {self.config.get('facility_name', 'إدارة خطوط الإنتاج والفرز الذكية')}")
        self.geometry("1280x760")
        self.minsize(1040, 660)

        self.grid_columnconfigure(0, weight=1)
        self.grid_columnconfigure(1, weight=0)
        self.grid_rowconfigure(0, weight=1)

        self.setup_sidebar()
        self.setup_views()

        if not self.config.get("setup_completed", False):
            self.select_view("setup_wizard")
        else:
            self.select_view("dashboard")

    def setup_sidebar(self):
        self.sidebar_frame = ctk.CTkFrame(self, width=240, corner_radius=0, fg_color="#0f172a")
        self.sidebar_frame.grid(row=0, column=1, sticky="nsew")

        logo = ctk.CTkLabel(self.sidebar_frame, text="🦅 FALCON EYE OS", font=ctk.CTkFont(family="Cairo", size=18, weight="bold"), text_color="#10b981")
        logo.grid(row=0, column=0, padx=20, pady=(18, 2))

        self.nav_buttons = {}
        nav_items = [
            ("dashboard", "📊 لوحة المؤشرات العامة", 2),
            ("line_control", "🎛️ تشغيل وتحكم الخطوط", 3),
            ("lines_manager", "🏭 إدارة وتكوين الخطوط", 4),
            ("alerts_engine", "⚠️ التنبيهات حسب نوع الخط", 5),
            ("plc_bridge", "🔌 الربط الصناعي ووحدات PLC", 6),
            ("inventory", "📦 إدارة المخزون والأصناف", 7),
            ("sales", "🧾 نقطة البيع والفواتير", 8),
            ("reports", "📑 التقارير وسجل العمليات", 9),
            ("setup_wizard", "⚙️ معالج التهيئة وإعداد الخط", 10),
        ]
        for view_name, label_text, row in nav_items:
            btn = ctk.CTkButton(self.sidebar_frame, text=label_text, font=ctk.CTkFont(family="Cairo", size=12), anchor="e", height=38, fg_color="transparent", text_color="#94a3b8", command=lambda name=view_name: self.select_view(name))
            btn.grid(row=row, column=0, padx=12, pady=3, sticky="ew")
            self.nav_buttons[view_name] = btn

    def setup_views(self):
        self.container = ctk.CTkFrame(self, fg_color="#090d16", corner_radius=0)
        self.container.grid(row=0, column=0, sticky="nsew", padx=15, pady=15)
        self.container.grid_rowconfigure(0, weight=1)
        self.container.grid_columnconfigure(0, weight=1)

        self.views = {
            "dashboard": DashboardView(self.container, self.db, on_navigate=self.select_view),
            "line_control": LineControlView(self.container, self.db),
            "lines_manager": LinesManagerView(self.container, self.db),
            "alerts_engine": AlertsEngineView(self.container, self.db),
            "plc_bridge": PLCHardwareBridgeView(self.container, self.db),
            "setup_wizard": SetupWizardView(self.container, self.db),
            "inventory": InventoryView(self.container, self.db),
            "sales": SalesView(self.container, self.db),
            "reports": ReportsView(self.container, self.db),
        }
        for view in self.views.values():
            view.grid(row=0, column=0, sticky="nsew")

    def select_view(self, view_name):
        target = self.views.get(view_name)
        if target:
            target.tkraise()
            if hasattr(target, "refresh_data"): target.refresh_data()

if __name__ == "__main__":
    app = AgroboticAccountingApp()
    app.mainloop()`,
    },
    'setup_wizard.py': {
      path: 'python_app/views/setup_wizard.py',
      desc: 'معالج التهيئة الأولية والربط السهل بنقرة واحدة وتحديد نمط الإنتاج والحساسات',
      code: `"""
معالج التهيئة الأولية للمنظومة والربط السهل - Initial Setup & Easy Hardware Linking Wizard
يتيح للمستخدم تحديد نوع الإنتاج، نظام التشغيل، والربط السهل والتلقائي مع وحدات التحكم PLC والحساسات والسيور
"""

import customtkinter as ctk
from tkinter import messagebox

class SetupWizardView(ctk.CTkFrame):
    def __init__(self, master, db, on_setup_completed=None):
        super().__init__(master, fg_color="transparent")
        self.db = db
        self.on_setup_completed = on_setup_completed
        self.selected_prod_type = "citrus"
        self.setup_ui()

    def setup_ui(self):
        # الخطوة 1: نوع الإنتاج والمحصول
        # الخطوة 2: نظام ونمط التشغيل
        # الخطوة 3: الربط السهل والتلقائي بوحدات PLC (Modbus TCP, Serial, IP Cam)
        # الخطوة 4: بيانات المنشأة والماليات
        pass

    def auto_detect_hardware(self):
        messagebox.showinfo("تم الربط بنجاح", "تم تأكيد الاتصال بوحدة PLC وزمن الاستجابة 2.8 ms")

    def apply_setup(self):
        self.db.apply_initial_setup(
            facility_name="محطة الأندلس لتصدير الحاصلات",
            production_type=self.selected_prod_type,
            operating_mode="integrated",
            lanes_count=4,
            speed_cps=12.0
        )`,
    },
    'line_control.py': {
      path: 'python_app/views/line_control.py',
      desc: 'لوحة التحكم الحية في السيور وبوابات الطرد والسرعة ومراقبة الحساسات اللحظية',
      code: `"""
شاشة التشغيل والتحكم في خطوط الإنتاج والفرز - Line Control & Telemetry View
التحكم في سرعة السير، البوابات، الحساسات، ومتابعة الإنتاجية اللحظية
"""

import customtkinter as ctk

class LineControlView(ctk.CTkFrame):
    def __init__(self, master, db):
        super().__init__(master, fg_color="transparent")
        self.db = db
        # أزرار التشغيل، الإيقاف الناعم، والتوقف الطارئ E-STOP
        # سلايدر سرعة السير كوب/ثانية
        # قراءات الحساسات المخصصة حسب نوع المحصول المختار
        # مؤشرات توزيع درجات الفرز اللحظية (تصدير 1، محلي 2، تالف)`,
    },
    'plc_hardware_bridge.py': {
      path: 'python_app/views/plc_hardware_bridge.py',
      desc: 'وحدة الربط مع وحدات التحكم الصناعية PLC وبروتوكول Modbus TCP وتزامن الإنكودر',
      code: `"""
وحدة الربط مع وحدات التحكم الصناعية - PLC & Hardware Interfacing Bridge
الربط والتحكم عبر بروتوكولات Modbus TCP، RS-485، وكروت الإشارات الرقمية والحساسات
"""

import customtkinter as ctk

class PLCHardwareBridgeView(ctk.CTkFrame):
    def __init__(self, master, db):
        super().__init__(master, fg_color="transparent")
        self.db = db
        # مراقبة إشارات الدخل الرقمي (Digital Inputs - DI)
        # حساس دخول الثمار، نبضات إنكودر السير، مفتاح الطوارئ، حساس الضغط
        # التحكم في مخارج الفرز والتعبئة (Digital Outputs - DO)
        # بوابات الطرد النيوماتيك، صمام تفريغ الفاكيوم، ريليهات السيور`,
    },
    'alerts_engine.py': {
      path: 'python_app/views/alerts_engine.py',
      desc: 'محرك التنبيهات المخصص حسب نوع الخط وخطوات المعالجة المقترحة وحل الأعطال',
      code: `"""
محرك التنبيهات الذكي المخصص حسب نوع خط الإنتاج - Line-Specific Alerts Engine View
إدارة وتتبع إنذارات الخطوط، التنبيهات الفنية، وخطوات المعالجة المقترحة لكل نوع محصول
"""

import customtkinter as ctk

class AlertsEngineView(ctk.CTkFrame):
    def __init__(self, master, db):
        super().__init__(master, fg_color="transparent")
        self.db = db
        # تصفية التنبيهات حسب الخط والمحصول (موالح، تفاح، تمور، تعبئة)
        # بطاقات تفصيلية للأعطال مع كود الخطأ والإجراء العلاجي الفوري
        # زر حل التنبيه وإعادة تعيين النظام`,
    },
    'lines_manager.py': {
      path: 'python_app/views/lines_manager.py',
      desc: 'إدارة وتكوين خطوط الإنتاج والفرز والتعبئة وإضافة أي خط جديد دون الإضرار بالنواة',
      code: `"""
إدارة وتكوين خطوط الإنتاج والفرز والتعبئة - Lines Manager View
إضافة، تخصيص، وتعديل خطوط الإنتاج بمختلف أنواعها
"""

import customtkinter as ctk

class LinesManagerView(ctk.CTkFrame):
    def __init__(self, master, db):
        super().__init__(master, fg_color="transparent")
        self.db = db
        # إضافة خط جديد: كود، اسم، نوع الخط، الحارات، السرعة، عنوان PLC
        # عرض وتعديل وحذف الخطوط الحالية`,
    },
    'database.py': {
      path: 'python_app/database.py',
      desc: 'قاعدة بيانات SQLite3 الشاملة للخطوط، التنبيهات، سجلات PLC، المخزون، والفواتير',
      code: `"""
نظام إدارة الحسابات والتحكم في خطوط الإنتاج والفرز - Database Manager
يدعم إدارة خطوط الإنتاج المتعددة، التنبيهات المخصصة، المخزون، والفواتير
"""

import sqlite3
import os

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "agrobotic_erp.db")

class DatabaseManager:
    def __init__(self, db_path=DB_FILE):
        self.db_path = db_path
        self.init_db()
        self.seed_initial_data()
    # جداول production_lines, line_alerts, system_settings, products, invoices, transactions`,
    },
    'inventory.py': {
      path: 'python_app/views/inventory.py',
      desc: 'إدارة المخزون والأصناف وتنبيهات نواقص الطلب وتقييم بضاعة المستودع بسعر التكلفة',
      code: `# كود إدارة المخزون والأصناف والأكواد SKU مع البحث الفوري وتنبيه حد الطلب`,
    },
    'sales.py': {
      path: 'python_app/views/sales.py',
      desc: 'إصدار فواتير المبيعات الإلكترونية مع حساب ضريبة القيمة المضافة 14% وخصم المخزون آلياً',
      code: `# كود إصدار الفواتير الضريبية وحساب Subtotal و VAT 14% و Grand Total وخصم الكمية من جدول products`,
    },
    'reports.py': {
      path: 'python_app/views/reports.py',
      desc: 'دفتر الأستاذ وتقارير العمليات وحساب إجمالي الضرائب المحصلة وتصدير ملفات CSV',
      code: `# كود عرض سجل العمليات المالية والتشغيلية وتصديرها بصيغة CSV`,
    },
    'README.md': {
      path: 'python_app/README.md',
      desc: 'دليل التشغيل الشامل والمعادلات الهندسية والمحاسبية وطريقة التثبيت',
      code: `# دليل شامل لتثبيت المكتبات وتشغيل البرنامج مع شرح معادلات الفرز والإنكودر والضريبة`,
    },
  };

  const handleCopyCode = () => {
    const file = pythonFiles[activeCodeTab];
    if (file) {
      navigator.clipboard.writeText(file.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadZip = () => {
    alert(
      isAr
        ? 'تم تجهيز كود البايثون المصدري بالكامل في مجلد /python_app داخل المشروع! يمكنك نسخه وتشغيله مباشرة بأمر python main.py.'
        : 'Python source code is ready in /python_app! Run it with python main.py.'
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-mono font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>FALCON EYE AGROBOTIC OS v1.0 — PYTHON & CUSTOMTKINTER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isAr
                ? 'برنامج إدارة والتحكم في خطوط الإنتاج والفرز والتعبئة والمحاسبة'
                : 'Production Lines, Sorting, Packaging & Accounting Desktop App'}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              {isAr
                ? 'تطبيق ديسكتوب مبني بنواة بايثون وواجهة CustomTkinter الحديثة، يدعم التحكم الكامل في السيور، الفرز، التعبئة، والربط السهل مع وحدات التحكم PLC والحساسات أثناء الإعدادات الأولية للنظام، مع محرك تنبيهات مخصص لكل خط إنتاج وربط محاسبي ومخزني متكامل.'
                : 'Modular Python CustomTkinter desktop app for controlling conveyors, optical sorting, robotic packaging, and PLC interfacing with line-specific alerts and accounting integration.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadZip}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? 'تحميل حزمة الكود المصدري' : 'Download Python App'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Studio Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left/Main Column: Interactive Live App Emulator (8 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden backdrop-blur-md">
            {/* Desktop Window Titlebar (Window Frame Mockup) */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="text-xs font-mono text-slate-400 ms-3">
                  {facilityName} — CustomTkinter Dark GUI
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                  {hwConnected ? 'PLC Connected' : 'Disconnected'}
                </span>
                <span className="text-xs font-mono text-slate-500">1280x760</span>
              </div>
            </div>

            {/* Embedded Desktop App Navigation Tabs */}
            <div className="bg-slate-950/60 px-4 py-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
              {[
                { id: 'setup_wizard', labelAr: '⚙️ إعداد وربط النظام', labelEn: 'Setup Wizard' },
                { id: 'line_control', labelAr: '🎛️ تحكم الخط والسيور', labelEn: 'Line Control' },
                { id: 'alerts_engine', labelAr: `⚠️ التنبيهات (${alertsList.length})`, labelEn: `Alerts (${alertsList.length})` },
                { id: 'plc_bridge', labelAr: '🔌 وحدات PLC والإنكودر', labelEn: 'PLC Bridge' },
                { id: 'dashboard', labelAr: '📊 لوحة المؤشرات', labelEn: 'Dashboard' },
                { id: 'inventory', labelAr: '📦 المخزون', labelEn: 'Inventory' },
                { id: 'sales', labelAr: '🧾 فواتير وبيع', labelEn: 'Sales & POS' },
                { id: 'reports', labelAr: '📑 التقارير', labelEn: 'Reports' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setEmulatorTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    emulatorTab === tab.id
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {isAr ? tab.labelAr : tab.labelEn}
                </button>
              ))}
            </div>

            {/* Emulator Content Viewport */}
            <div className="p-5 min-h-[480px] bg-slate-950/40">
              {/* TAB 1: INITIAL SETUP & EASY HARDWARE LINKING WIZARD */}
              {emulatorTab === 'setup_wizard' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Settings className="w-4 h-4 text-emerald-400" />
                        {isAr ? 'معالج التهيئة الأولية والربط السهل للمنشأة' : 'Initial Setup & Hardware Link Wizard'}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {isAr
                          ? 'يتم تخصيص الحساسات، السيور، مخارج الفرز، والتنبيهات آلياً بنقرة واحدة أثناء الإعداد'
                          : 'Configure sensors, conveyors, ejectors, and alerts with 1-click preset profiles.'}
                      </p>
                    </div>
                    <span className="text-xs font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2 py-1 rounded">
                      Step-by-Step Wizard
                    </span>
                  </div>

                  {/* Step 1: Production Type Cards */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">
                      {isAr ? 'الخطوة 1: حدد نوع الإنتاج والمحصول الرئيسي للمنشأة' : 'Step 1: Production & Crop Type'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'citrus', title: '🍊 محطة موالح', desc: 'برتقال، يوسفي، ليمون\nقطر، لون، تربس، طرد هوائي' },
                        { id: 'apple', title: '🍏 تفاحيات مائي', desc: 'تفاح، كمثرى\nتفريغ مائي، كدمات NIR' },
                        { id: 'dates', title: '🌴 فرز تمور', desc: 'مجهول، برحي\nرطوبة، سكريات، تجاعيد' },
                        { id: 'packaging', title: '🤖 تعبئة وروبوتات', desc: 'أذرع دلتا\nتلقيم صواني، فاكيوم' },
                      ].map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedProdType(item.id as any)}
                          className={`p-3 rounded-xl border text-start cursor-pointer transition-all ${
                            selectedProdType === item.id
                              ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs font-bold text-white mb-1">{item.title}</div>
                          <div className="text-[10px] leading-tight opacity-80 whitespace-pre-line">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Easy Hardware Link */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">
                      {isAr ? 'الخطوة 2: الربط السهل والتلقائي بوحدات التحكم الصناعية' : 'Step 2: Easy Hardware & PLC Link'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {[
                        { id: 'Modbus TCP (Ethernet)', title: '⚡ Modbus TCP', desc: 'PLC Siemens / Delta' },
                        { id: 'RS-485 / Relay Board', title: '🔌 Serial / Relays', desc: 'USB كروت ريليه' },
                        { id: 'GigE / RTSP IP Cam', title: '📷 كاميرات IP', desc: 'بث الرؤية الصناعية' },
                        { id: 'Virtual Simulation', title: '🧪 محاكاة افتراضية', desc: 'تجربة بدون أسلاك' },
                      ].map((hw) => (
                        <div
                          key={hw.id}
                          onClick={() => setHwProtocol(hw.id)}
                          className={`p-2.5 rounded-lg border cursor-pointer text-start ${
                            hwProtocol === hw.id
                              ? 'bg-cyan-950/50 border-cyan-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <div className="font-bold text-xs text-white">{hw.title}</div>
                          <div className="text-[10px] text-slate-400">{hw.desc}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs mt-2">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">PLC IP:</span>
                        <input
                          type="text"
                          value={plcIp}
                          onChange={(e) => setPlcIp(e.target.value)}
                          className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white text-xs font-mono w-32"
                        />
                        <span className="text-slate-400">Port: 502</span>
                      </div>
                      <button
                        onClick={() => {
                          setHwConnected(true);
                          alert(
                            isAr
                              ? `تم الكشف والربط التلقائي بنجاح مع وحدة التحكم (${plcIp}) عبر ${hwProtocol} بزمن استجابة 2.8 ms!`
                              : `Hardware successfully linked to ${plcIp} with 2.8ms latency!`
                          );
                        }}
                        className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{isAr ? 'كشف واختبار الربط التلقائي ⚡' : 'Auto-Detect & Test'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Step 3: Facility Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-slate-400 mb-1 block">{isAr ? 'اسم المنشأة' : 'Facility Name'}</label>
                      <input
                        type="text"
                        value={facilityName}
                        onChange={(e) => setFacilityName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 mb-1 block">{isAr ? 'سرعة السير الافتراضية' : 'Conveyor Speed'}</label>
                      <input
                        type="text"
                        value={`${conveyorSpeed} كوب/ثانية`}
                        readOnly
                        className="w-full bg-slate-900/60 border border-slate-800 rounded px-3 py-2 text-emerald-400 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 mb-1 block">{isAr ? 'ضريبة القيمة المضافة' : 'VAT Rate'}</label>
                      <input
                        type="text"
                        value="14.0 %"
                        readOnly
                        className="w-full bg-slate-900/60 border border-slate-800 rounded px-3 py-2 text-amber-400 font-mono"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setEmulatorTab('line_control');
                      alert(isAr ? 'تم حفظ التهيئة الأولية بنجاح والانتقال لشاشة تحكم الخط والسيور!' : 'Setup saved! Navigating to Line Control.');
                    }}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isAr ? 'حفظ وتطبيق التهيئة والانتقال لتشغيل الخط 🚀' : 'Apply Setup & Start Operations'}</span>
                  </button>
                </div>
              )}

              {/* TAB 2: LINE & CONVEYOR SPEED & EJECTORS CONTROL */}
              {emulatorTab === 'line_control' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-cyan-400" />
                        {isAr ? 'غرفة التحكم والتشغيل المباشر للسيور والفرز (Line SCADA)' : 'Live Conveyor & Sorter Control'}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {isAr ? `الخط النشط: ${facilityName} (${selectedProdType})` : `Active Line: ${selectedProdType}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2.5 py-1 rounded font-bold font-mono ${
                          lineStatus === 'running'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : lineStatus === 'alert'
                            ? 'bg-rose-950 text-rose-400 border border-rose-500/30'
                            : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {lineStatus === 'running' ? 'RUNNING' : lineStatus === 'alert' ? 'ALERT ACTIVE' : 'IDLE'}
                      </span>
                    </div>
                  </div>

                  {/* Mechanical Actions (Run / Pause / ESTOP) */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setLineStatus('running')}
                      className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                        lineStatus === 'running' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      <Play className="w-4 h-4" />
                      <span>{isAr ? 'تشغيل الخط (RUN)' : 'Run'}</span>
                    </button>

                    <button
                      onClick={() => setLineStatus('idle')}
                      className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                        lineStatus === 'idle' ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      <Pause className="w-4 h-4" />
                      <span>{isAr ? 'إيقاف ناعم (PAUSE)' : 'Pause'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setLineStatus('alert');
                        handleSimulateAlert();
                      }}
                      className="p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl border border-rose-400 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-900/30"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>{isAr ? 'توقف طارئ (E-STOP)' : 'Emergency Stop'}</span>
                    </button>
                  </div>

                  {/* VFD Inverter Speed Control */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-bold">
                        {isAr ? 'التحكم في سرعة السير عبر إنفرتر VFD (Cups / Sec):' : 'Conveyor Belt VFD Speed:'}
                      </span>
                      <span className="text-emerald-400 font-mono font-bold text-sm">{conveyorSpeed.toFixed(1)} كوب/ثانية</span>
                    </div>
                    <input
                      type="range"
                      min="4.0"
                      max="24.0"
                      step="0.5"
                      value={conveyorSpeed}
                      onChange={(e) => handleSpeedChange(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>4.0 (بطيء / معايرة)</span>
                      <span>14.0 (السرعة القياسية)</span>
                      <span>24.0 (أقصى سرعة إنتاجية)</span>
                    </div>
                  </div>

                  {/* Live Telemetry & Sorting Distribution */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-start">
                      <div className="text-slate-400 mb-1">{isAr ? 'الإنتاجية اللحظية' : 'Live Output'}</div>
                      <div className="text-lg font-bold text-emerald-400 font-mono">{lineOutputTph} طن/ساعة</div>
                      <div className="text-[10px] text-slate-500">معدل ملء الأكواب: 92%</div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-start">
                      <div className="text-slate-400 mb-1">{isAr ? 'إنكودر السير وتوقيت الطرد' : 'Encoder Sync'}</div>
                      <div className="text-lg font-bold text-cyan-400 font-mono">{encoderPulses} Pulse/s</div>
                      <div className="text-[10px] text-slate-500">زمن نبضة البوابة: 42 ms</div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-start">
                      <div className="text-slate-400 mb-1">{isAr ? 'نسبة الفرز للتصدير' : 'Export Packout'}</div>
                      <div className="text-lg font-bold text-purple-400 font-mono">84.2 %</div>
                      <div className="text-[10px] text-slate-500">محلي: 11.5% | تالف: 4.3%</div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SMART ALERTS ENGINE FILTERED BY LINE TYPE */}
              {emulatorTab === 'alerts_engine' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        {isAr ? 'محرك التنبيهات المخصص حسب نوع الخط' : 'Line-Specific Smart Alerts Engine'}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {isAr ? 'تنبيهات فورية وإجراءات علاجية تتناسب مع طبيعة المحصول وتقنيات السير' : 'Active alerts with actionable fixes'}
                      </p>
                    </div>

                    <button
                      onClick={handleSimulateAlert}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      {isAr ? 'محاكاة تنبيه عطل مفاجئ +' : 'Simulate Fault +'}
                    </button>
                  </div>

                  {alertsList.length === 0 ? (
                    <div className="p-8 text-center bg-slate-900 rounded-xl border border-slate-800 text-emerald-400 text-xs">
                      ✅ {isAr ? 'لا توجد تنبيهات نشطة حالياً. الخط يعمل بكفاءة وأمان كامل.' : 'No active alerts.'}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {alertsList.map((alt) => (
                        <div
                          key={alt.id}
                          className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                            alt.severity === 'critical'
                              ? 'bg-rose-950/40 border-rose-500/40'
                              : 'bg-amber-950/40 border-amber-500/40'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-white">
                              {alt.code} | {alt.title}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                alt.severity === 'critical' ? 'bg-rose-900 text-rose-200' : 'bg-amber-900 text-amber-200'
                              }`}
                            >
                              {alt.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-slate-300">{alt.desc}</p>
                          <div className="p-2 bg-slate-950/80 rounded border border-slate-800 flex items-center justify-between gap-3">
                            <span className="text-cyan-400 text-[11px]">🔧 {isAr ? `الإجراء العلاجي: ${alt.action}` : alt.action}</span>
                            <button
                              onClick={() => handleResolveAlert(alt.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold shrink-0"
                            >
                              {isAr ? 'تم الحل وإعادة التعيين ✔' : 'Resolve'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: PLC & HARDWARE BRIDGE (DI/DO & ENCODERS) */}
              {emulatorTab === 'plc_bridge' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-emerald-400" />
                        {isAr ? 'مراقبة إشارات PLC والإنكودر وبوابات الطرد' : 'PLC Digital I/O & Encoders Bridge'}
                      </h3>
                      <p className="text-xs text-slate-400">Modbus TCP / IP: 192.168.1.50:502 | Protocol: Industrial Ethernet</p>
                    </div>
                    <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                      SYNC: 3.2 ms
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {/* Digital Inputs */}
                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
                      <div className="font-bold text-slate-300 mb-2">{isAr ? 'إشارات الدخل الرقمي (Digital Inputs - DI)' : 'Digital Inputs (DI)'}</div>
                      {[
                        { code: 'DI_00', name: 'حساس دخول الثمار لكابينة الرؤية', on: true },
                        { code: 'DI_01', name: 'نبضات إنكودر السير السريع', on: true },
                        { code: 'DI_02', name: 'مفتاح الأمان وتوقف الطوارئ E-STOP', on: true },
                        { code: 'DI_03', name: 'حساس ضغط شبكة الهواء (> 6 Bar)', on: true },
                      ].map((di, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-slate-950 rounded border border-slate-800/80">
                          <span className="text-slate-300 font-mono">{di.code}: {di.name}</span>
                          <span className={`w-2.5 h-2.5 rounded-full ${di.on ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-slate-600'}`}></span>
                        </div>
                      ))}
                    </div>

                    {/* Digital Outputs */}
                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
                      <div className="font-bold text-slate-300 mb-2">{isAr ? 'مخارج التحكم والفرز والتعبئة (Digital Outputs - DO)' : 'Digital Outputs (DO)'}</div>
                      {[
                        { code: 'DO_00', name: 'بوابة الطرد 1 (تصدير سوبر)' },
                        { code: 'DO_01', name: 'بوابة الطرد 2 (محلي قياسي)' },
                        { code: 'DO_02', name: 'بوابة الطرد 3 (تالف صناعي)' },
                        { code: 'DO_03', name: 'صمام فاكيوم شفاط الروبوت' },
                      ].map((doItem, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-slate-950 rounded border border-slate-800/80">
                          <span className="text-slate-300 font-mono">{doItem.code}: {doItem.name}</span>
                          <button
                            onClick={() => alert(isAr ? `تم إرسال نبضة اختبار كهربائية للمخرج ${doItem.code} بنجاح!` : `Pulse sent to ${doItem.code}`)}
                            className="px-2 py-0.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-[10px] font-bold"
                          >
                            {isAr ? 'نبضة ⚡' : 'Pulse'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: UNIFIED DASHBOARD */}
              {emulatorTab === 'dashboard' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-emerald-400" />
                      {isAr ? 'لوحة التحكم والرقابة الصناعية والمحاسبية' : 'Unified Master Dashboard'}
                    </h3>
                    <button
                      onClick={() => alert(isAr ? 'تم تحديث كافة المؤشرات وقراءات الحساسات بنجاح!' : 'Refreshed')}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تحديث ⟳' : 'Refresh'}</span>
                    </button>
                  </div>

                  {/* Top Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-slate-400 mb-1">{isAr ? 'الخطوط العاملة' : 'Running Lines'}</div>
                      <div className="text-base font-bold text-emerald-400 font-mono">1 / 1 خط نشط</div>
                      <div className="text-[10px] text-slate-500">{conveyorSpeed} كوب/ث</div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-slate-400 mb-1">{isAr ? 'الإنتاجية اللحظية' : 'Output TPH'}</div>
                      <div className="text-base font-bold text-cyan-400 font-mono">{lineOutputTph} طن/ساعة</div>
                      <div className="text-[10px] text-slate-500">حارات الفرز: 4</div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-slate-400 mb-1">{isAr ? 'إجمالي المبيعات' : 'Total Sales'}</div>
                      <div className="text-base font-bold text-emerald-400 font-mono">{totalSales.toLocaleString()} ج.م</div>
                      <div className="text-[10px] text-slate-500">شامل ضريبة 14%</div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-slate-400 mb-1">{isAr ? 'قيمة بضاعة المخزن' : 'Stock Value'}</div>
                      <div className="text-base font-bold text-amber-400 font-mono">{stockValue.toLocaleString()} ج.م</div>
                      <div className="text-[10px] text-slate-500">بسعر التكلفة</div>
                    </div>
                  </div>

                  {/* Recent Invoices Table */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="font-bold text-slate-300">{isAr ? 'أحدث الفواتير المسجلة بالمنظومة' : 'Recent Invoices'}</div>
                    <div className="divide-y divide-slate-800">
                      {invoicesHistory.map((inv) => (
                        <div key={inv.id} className="py-2 flex items-center justify-between font-mono">
                          <span className="text-cyan-400 font-bold">{inv.invNumber}</span>
                          <span className="text-white">{inv.party}</span>
                          <span className="text-emerald-400 font-bold">{inv.grand.toLocaleString()} ج.م</span>
                          <span className="text-slate-500">{inv.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: INVENTORY */}
              {emulatorTab === 'inventory' && (
                <div className="space-y-4 animate-fadeIn text-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{isAr ? 'إدارة المخزون والأصناف (Inventory)' : 'Inventory Management'}</h3>
                    <span className="text-slate-400 font-mono">{inventoryList.length} أصناف مسجلة</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-start">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-mono">
                          <th className="p-2 text-start">SKU</th>
                          <th className="p-2 text-start">{isAr ? 'اسم الصنف' : 'Item'}</th>
                          <th className="p-2 text-start">{isAr ? 'التصنيف' : 'Category'}</th>
                          <th className="p-2 text-end">{isAr ? 'سعر البيع' : 'Sell Price'}</th>
                          <th className="p-2 text-end">{isAr ? 'الرصيد' : 'Quantity'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {inventoryList.map((p) => (
                          <tr key={p.id}>
                            <td className="p-2 text-cyan-400 font-bold">{p.sku}</td>
                            <td className="p-2 text-white">{p.name}</td>
                            <td className="p-2 text-slate-400">{p.category}</td>
                            <td className="p-2 text-end text-emerald-400 font-bold">{p.sellPrice.toFixed(2)} ج.م</td>
                            <td className="p-2 text-end text-white">{p.qty.toLocaleString()} {p.unit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 7: SALES & POS */}
              {emulatorTab === 'sales' && (
                <div className="space-y-4 animate-fadeIn text-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{isAr ? 'إصدار الفواتير الإلكترونية (Sales & POS)' : 'Sales & Invoicing'}</h3>
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">VAT: 14%</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="sm:col-span-2">
                      <label className="text-slate-400 block mb-1">{isAr ? 'العميل' : 'Customer'}</label>
                      <input
                        type="text"
                        value={salesParty}
                        onChange={(e) => setSalesParty(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">{isAr ? 'الصنف' : 'Product'}</label>
                      <select
                        value={selectedProductId}
                        onChange={(e) => setSelectedProductId(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                      >
                        {inventoryList.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.qty} {p.unit})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">{isAr ? 'الكمية:' : 'Qty:'}</span>
                    <input
                      type="number"
                      min="1"
                      value={salesQty}
                      onChange={(e) => setSalesQty(Number(e.target.value))}
                      className="w-24 bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white font-mono"
                    />
                    <button
                      onClick={handleAddItemToInvoice}
                      className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold"
                    >
                      {isAr ? 'إدراج بند +' : 'Add Item'}
                    </button>
                  </div>

                  {/* Summary */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between font-mono">
                    <div>المجموع: {subtotal.toFixed(2)} ج.م</div>
                    <div className="text-amber-400">ضريبة (14%): {vatAmount.toFixed(2)} ج.م</div>
                    <div className="text-emerald-400 font-bold text-sm">الإجمالي: {grandTotal.toFixed(2)} ج.م</div>
                    <button
                      onClick={handleConfirmInvoice}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold"
                    >
                      {isAr ? 'تأكيد وحفظ الفاتورة 💾' : 'Confirm Invoice'}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 8: REPORTS */}
              {emulatorTab === 'reports' && (
                <div className="space-y-4 animate-fadeIn text-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{isAr ? 'التقارير المحاسبية وسجل المعاملات' : 'Financial Reports & Ledger'}</h3>
                    <button
                      onClick={() => alert(isAr ? 'تم تصدير المعاملات كـ ملف CSV بنجاح!' : 'Exported to CSV')}
                      className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold"
                    >
                      {isAr ? 'تصدير CSV 📥' : 'Export CSV'}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center font-mono">
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-slate-400">عدد الحركات</div>
                      <div className="text-white font-bold">{invoicesHistory.length + 1} حركة</div>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-slate-400">حجم التداول</div>
                      <div className="text-emerald-400 font-bold">{totalSales.toLocaleString()} ج.م</div>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-slate-400">ضريبة VAT (14%)</div>
                      <div className="text-amber-400 font-bold">{(totalSales * 0.14).toFixed(2)} ج.م</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Code Viewer & File Explorer (4-5 Cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[560px]">
            {/* Header with Copy & File Info */}
            <div className="bg-slate-950 p-3.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <FolderCode className="w-4 h-4" />
                <span>{pythonFiles[activeCodeTab]?.path || activeCodeTab}</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : isAr ? 'نسخ الكود' : 'Copy'}</span>
              </button>
            </div>

            {/* File Switcher Tabs */}
            <div className="bg-slate-950/40 p-2 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto">
              {Object.keys(pythonFiles).map((fileName) => (
                <button
                  key={fileName}
                  onClick={() => setActiveCodeTab(fileName)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors whitespace-nowrap ${
                    activeCodeTab === fileName
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {fileName}
                </button>
              ))}
            </div>

            {/* Code Content */}
            <div className="flex-1 p-3.5 overflow-auto font-mono text-xs text-slate-300 bg-slate-950/90 leading-relaxed selection:bg-emerald-500/30">
              <pre className="whitespace-pre">{pythonFiles[activeCodeTab]?.code}</pre>
            </div>

            {/* File Description Bar */}
            <div className="p-2.5 bg-slate-950 border-t border-slate-800/80 text-[11px] text-slate-400 text-end">
              {pythonFiles[activeCodeTab]?.desc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
