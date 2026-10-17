import React, { useState } from 'react';
import {
  Building2,
  Truck,
  Package,
  Layers,
  FileText,
  DollarSign,
  TrendingUp,
  Barcode,
  ThermometerSnowflake,
  CheckCircle2,
  Clock,
  ArrowRightLeft,
  Users,
  Warehouse,
  ShieldCheck,
  Plus,
  Printer,
  Search,
  Filter,
  Download,
  AlertCircle,
  Mail,
  Send,
  MessageSquare,
  BookOpen,
  Calendar,
  Check,
  UserCheck,
  Zap,
  PhoneCall,
  Share2
} from 'lucide-react';
import { AssetManagementModule } from './AssetManagementModule';
import { DocumentaryWorkflowModule } from './DocumentaryWorkflowModule';

interface PackhouseERPProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

interface IntakeBatch {
  id: string;
  growerName: string;
  farmLocation: string;
  cropType: string;
  binsCount: number;
  grossWeightKg: number;
  tareWeightKg: number;
  netWeightKg: number;
  qcSugarBrix: number;
  qcDefectRate: number;
  status: 'received' | 'in_grading' | 'completed';
  receivedAt: string;
}

interface PalletStock {
  id: string;
  ssccBarcode: string;
  batchId: string;
  cropGrade: string;
  cartonCount: number;
  netWeightKg: number;
  coldStoreChamber: string;
  targetMarket: string;
  status: 'in_cold_store' | 'loaded_for_export' | 'reserved';
  temperature: string;
}

interface ExportInvoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  destinationCountry: string;
  currency: 'USD' | 'EUR' | 'EGP';
  totalCartons: number;
  totalNetWeightKg: number;
  subtotal: number;
  taxVat14: number;
  grandTotal: number;
  containerNumber: string;
  shippingLine: string;
  status: 'draft' | 'confirmed' | 'dispatched';
  date: string;
  customerPhone?: string;
}

interface JournalEntry {
  id: string;
  entryNumber: string;
  date: string;
  descriptionAr: string;
  descriptionEn: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  currency: string;
  refDocument: string;
  postedBy: string;
}

interface EmployeeRecord {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  departmentAr: string;
  departmentEn: string;
  jobTitleAr: string;
  basicSalaryEgp: number;
  overtimeHours: number;
  bonusesEgp: number;
  deductionsEgp: number;
  netSalaryEgp: number;
  phone: string;
  nationalId: string;
  status: 'active' | 'on_leave';
  attendanceDays: number;
}

interface AttendanceLog {
  id: string;
  empCode: string;
  empNameAr: string;
  date: string;
  checkIn: string;
  checkOut: string;
  shift: string;
  status: 'present' | 'late' | 'absent' | 'overtime';
  workHours: number;
}

interface InternalMessage {
  id: string;
  senderName: string;
  senderDept: string;
  recipientDept: string;
  subject: string;
  body: string;
  timestamp: string;
  priority: 'normal' | 'urgent';
  read: boolean;
}

export const PackhouseERPIntegrated: React.FC<PackhouseERPProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [activeModule, setActiveModule] = useState<
    'overview' | 'accounting' | 'hr_payroll' | 'attendance' | 'messaging' | 'intake' | 'traceability' | 'coldstore' | 'invoicing' | 'costing' | 'asset_mgmt' | 'doc_workflow'
  >('overview');

  // Intake Batches State
  const [intakeBatches, setIntakeBatches] = useState<IntakeBatch[]>([
    {
      id: 'REC-2026-084',
      growerName: 'مزرعة الهدى والنور - وادي النطرون',
      farmLocation: 'قطاع ب - حوشة 14',
      cropType: 'برتقال فالنسيا صيفي (Valencia)',
      binsCount: 48,
      grossWeightKg: 19450,
      tareWeightKg: 2160,
      netWeightKg: 17290,
      qcSugarBrix: 12.3,
      qcDefectRate: 4.8,
      status: 'in_grading',
      receivedAt: '2026-10-17 08:30'
    },
    {
      id: 'REC-2026-083',
      growerName: 'شركة النماء الزراعية - النوبارية',
      farmLocation: 'المزرعة المركزية - مدخل 2',
      cropType: 'يوسفي كلمنتينا ممتاز',
      binsCount: 32,
      grossWeightKg: 12800,
      tareWeightKg: 1440,
      netWeightKg: 11360,
      qcSugarBrix: 13.1,
      qcDefectRate: 3.2,
      status: 'completed',
      receivedAt: '2026-10-17 06:15'
    },
    {
      id: 'REC-2026-082',
      growerName: 'مزارع الواحة للتمور - الوادي الجديد',
      farmLocation: 'واحة الداخلة - حوض النخيل',
      cropType: 'تمر مجدول جامبو (Medjool Jumbo)',
      binsCount: 20,
      grossWeightKg: 6200,
      tareWeightKg: 900,
      netWeightKg: 5300,
      qcSugarBrix: 24.5,
      qcDefectRate: 2.1,
      status: 'received',
      receivedAt: '2026-10-17 09:45'
    }
  ]);

  // Pallets Stock
  const [pallets, setPallets] = useState<PalletStock[]>([
    {
      id: 'PLT-9812',
      ssccBarcode: '062210009812001452',
      batchId: 'REC-2026-083',
      cropGrade: 'صنف ممتاز أول (Cat 1 Extra) - كاليبر 56',
      cartonCount: 80,
      netWeightKg: 1200,
      coldStoreChamber: 'ثلاجة تبريد سريع 3 (+4°C)',
      targetMarket: 'المملكة المتحدة (UK - Tesco Spec)',
      status: 'in_cold_store',
      temperature: '+3.8°C'
    },
    {
      id: 'PLT-9813',
      ssccBarcode: '062210009813001469',
      batchId: 'REC-2026-083',
      cropGrade: 'صنف أول تصدير قياسي - كاليبر 64',
      cartonCount: 80,
      netWeightKg: 1200,
      coldStoreChamber: 'ثلاجة تبريد سريع 3 (+4°C)',
      targetMarket: 'الاتحاد الأوروبي (Rotterdam)',
      status: 'in_cold_store',
      temperature: '+4.1°C'
    }
  ]);

  // Export Invoices with 14% VAT
  const [invoices, setInvoices] = useState<ExportInvoice[]>([
    {
      id: 'INV-2026-001',
      invoiceNumber: 'EXP-EG-2026-0941',
      customerName: 'EuroFresh Logistics B.V. (Rotterdam, Netherlands)',
      destinationCountry: 'هولندا (Netherlands)',
      currency: 'USD',
      totalCartons: 1600,
      totalNetWeightKg: 24000,
      subtotal: 21600,
      taxVat14: 3024,
      grandTotal: 24624,
      containerNumber: 'MSCU-902144-8',
      shippingLine: 'MSC Mediterranean Shipping',
      status: 'confirmed',
      date: '2026-10-17',
      customerPhone: '+31612345678'
    },
    {
      id: 'INV-2026-002',
      invoiceNumber: 'DOM-EG-2026-0412',
      customerName: 'سلسلة هايبر ماركت كارفور مصر (مشتريات المركز الرئيسي)',
      destinationCountry: 'جمهورية مصر العربية (محلي)',
      currency: 'EGP',
      totalCartons: 400,
      totalNetWeightKg: 6000,
      subtotal: 180000,
      taxVat14: 25200,
      grandTotal: 205200,
      containerNumber: 'TRK-CAIRO-778',
      shippingLine: 'أسطول شاحنات مبردة محلي',
      status: 'dispatched',
      date: '2026-10-17',
      customerPhone: '+201001112233'
    }
  ]);

  // Double-Entry Accounting Journal
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: 'JE-001',
      entryNumber: 'JV-2026-0182',
      date: '2026-10-17',
      descriptionAr: 'إثبات مبيعات تصدير برتقال فالنسيا فاتورة EXP-0941 مع 14% VAT',
      descriptionEn: 'Export Valencia sales invoice EXP-0941 with 14% VAT',
      debitAccount: '1102 - العملاء الخارجيون (EuroFresh BV)',
      creditAccount: '4101 - إيرادات مبيعات التصدير + 2105 - أمانات ضريبة القيمة المضافة 14%',
      amount: 24624,
      currency: 'USD',
      refDocument: 'EXP-EG-2026-0941',
      postedBy: 'acc.tarek'
    },
    {
      id: 'JE-002',
      entryNumber: 'JV-2026-0181',
      date: '2026-10-17',
      descriptionAr: 'إثبات توريد محصول خام من مزرعة الهدى والنور (17.29 طن)',
      descriptionEn: 'Raw intake produce accrual - El Hoda Farm (17.29 tons)',
      debitAccount: '1201 - مخزون المحصول الخام قبل الفرز',
      creditAccount: '2101 - الموردون والمزارعون (مستحقات مزرعة الهدى)',
      amount: 198835,
      currency: 'EGP',
      refDocument: 'REC-2026-084',
      postedBy: 'acc.tarek'
    },
    {
      id: 'JE-003',
      entryNumber: 'JV-2026-0180',
      date: '2026-10-17',
      descriptionAr: 'صرف نثريات وقود ديزل للشاحنات وصيانة ثلاجات التبريد',
      descriptionEn: 'Diesel fuel and chiller maintenance cash voucher',
      debitAccount: '5104 - مصروفات تشغيل وصيانة الثلاجات والوقود',
      creditAccount: '1101 - الخزينة الرئيسية بالمحطة (Cash Box)',
      amount: 14500,
      currency: 'EGP',
      refDocument: 'PV-2026-091',
      postedBy: 'acc.tarek'
    }
  ]);

  // HR & Employees Directory
  const [employees, setEmployees] = useState<EmployeeRecord[]>([
    {
      id: 'EMP-01',
      code: 'EMP-101',
      nameAr: 'م. أحمد مصطفى عبد الغفار',
      nameEn: 'Eng. Ahmed Mostafa',
      departmentAr: 'إدارة تشغيل وكنترول الخطوط',
      departmentEn: 'Line Operations & Control',
      jobTitleAr: 'مهندس أول تشغيل خطوط الفرز',
      basicSalaryEgp: 18000,
      overtimeHours: 14,
      bonusesEgp: 2500,
      deductionsEgp: 0,
      netSalaryEgp: 22100,
      phone: '+201091234567',
      nationalId: '28910140102931',
      status: 'active',
      attendanceDays: 24
    },
    {
      id: 'EMP-02',
      code: 'EMP-102',
      nameAr: 'كيميائي / نهى محمود رضوان',
      nameEn: 'Noha Mahmoud',
      departmentAr: 'مختبر الجودة ومتبقيات المبيدات',
      departmentEn: 'Quality & MRL Lab',
      jobTitleAr: 'رئيس قسم فحص الجودة ومتبقيات المبيدات',
      basicSalaryEgp: 16500,
      overtimeHours: 8,
      bonusesEgp: 2000,
      deductionsEgp: 0,
      netSalaryEgp: 19400,
      phone: '+201019876543',
      nationalId: '29205180103422',
      status: 'active',
      attendanceDays: 25
    },
    {
      id: 'EMP-03',
      code: 'EMP-103',
      nameAr: 'م. إبراهيم كمال الدين',
      nameEn: 'Eng. Ibrahim Kamal',
      departmentAr: 'قسم الثلاجات والتبريد المركزي',
      departmentEn: 'Refrigeration & Cold Stores',
      jobTitleAr: 'مهندس تبريد وشيلرات الأمونيا',
      basicSalaryEgp: 17000,
      overtimeHours: 18,
      bonusesEgp: 3000,
      deductionsEgp: 0,
      netSalaryEgp: 22250,
      phone: '+201124455667',
      nationalId: '28607220101984',
      status: 'active',
      attendanceDays: 26
    },
    {
      id: 'EMP-04',
      code: 'EMP-104',
      nameAr: 'رمضان فتحي الشحات',
      nameEn: 'Ramadan Fathi',
      departmentAr: 'مشرف عمالة فرز وتعبئة الصواني',
      departmentEn: 'Sorting & Packing Floor',
      jobTitleAr: 'مشرف وردية التعبئة والتغذية',
      basicSalaryEgp: 11000,
      overtimeHours: 22,
      bonusesEgp: 1800,
      deductionsEgp: 0,
      netSalaryEgp: 14750,
      phone: '+201289988776',
      nationalId: '29003110104567',
      status: 'active',
      attendanceDays: 26
    }
  ]);

  // Attendance Records
  const [attendanceList] = useState<AttendanceLog[]>([
    { id: 'ATT-01', empCode: 'EMP-101', empNameAr: 'م. أحمد مصطفى', date: '2026-10-17', checkIn: '06:55', checkOut: '15:30', shift: 'الصباحية A', status: 'present', workHours: 8.5 },
    { id: 'ATT-02', empCode: 'EMP-102', empNameAr: 'كيميائي / نهى محمود', date: '2026-10-17', checkIn: '07:10', checkOut: '16:00', shift: 'الصباحية A', status: 'overtime', workHours: 8.8 },
    { id: 'ATT-03', empCode: 'EMP-103', empNameAr: 'م. إبراهيم كمال', date: '2026-10-17', checkIn: '06:50', checkOut: '17:00', shift: 'الصباحية A', status: 'overtime', workHours: 10.1 },
    { id: 'ATT-04', empCode: 'EMP-104', empNameAr: 'رمضان فتحي', date: '2026-10-17', checkIn: '06:45', checkOut: '15:30', shift: 'الصباحية A', status: 'present', workHours: 8.7 }
  ]);

  // Internal Messages
  const [messages, setMessages] = useState<InternalMessage[]>([
    {
      id: 'MSG-01',
      senderName: 'كيميائي / نهى محمود (الجودة)',
      senderDept: 'مختبر الجودة وMRL',
      recipientDept: 'إدارة الثلاجات والمهندس إبراهيم',
      subject: 'اعتماد شهادة فحص شحنة البرتقال LOT-084 وخلوها من متبقيات المبيدات',
      body: 'نحيطكم علماً بأن عينة البرتقال الواردة من مزرعة الهدى اجتازت فحص جهاز الـ SERS Raman، وكافة المواد الفعالة أقل من 0.01 ppm. يرجى نقل الطبالي إلى عنبر التبريد رقم 3 للشحن للتصدير.',
      timestamp: '2026-10-17 11:20',
      priority: 'urgent',
      read: true
    },
    {
      id: 'MSG-02',
      senderName: 'م. إبراهيم كمال (التبريد)',
      senderDept: 'إدارة الثلاجات',
      recipientDept: 'إدارة الحسابات والمبيعات',
      subject: 'جاهزية نفق Pre-Cooling 1 ورصيف الشحن للحاوية رقم MSCU-902144',
      body: 'تم خفض درجة حرارة لب الثمار إلى 3.8°C بنجاح، وشهادة الـ USDA جاهزة، ورصيف التحميل جاهز لدخول الشاحنة.',
      timestamp: '2026-10-17 11:45',
      priority: 'normal',
      read: false
    }
  ]);

  // New Internal Message Form
  const [msgRecipient, setMsgRecipient] = useState('إدارة تشغيل الخطوط');
  const [msgSubject, setMsgSubject] = useState('');
  const [msgBody, setMsgBody] = useState('');

  // WhatsApp Trigger Handler
  const handleSendWhatsAppNotification = (phone: string, text: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(text);
    const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;
    window.open(url, '_blank');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgSubject || !msgBody) return;

    const newMsg: InternalMessage = {
      id: `MSG-${String(messages.length + 1).padStart(2, '0')}`,
      senderName: 'مدير المحطة العام',
      senderDept: 'الإدارة العامة والتحكم',
      recipientDept: msgRecipient,
      subject: msgSubject,
      body: msgBody,
      timestamp: 'الآن (اليوم)',
      priority: 'urgent',
      read: false
    };

    setMessages([newMsg, ...messages]);
    setMsgSubject('');
    setMsgBody('');
    alert(isAr ? 'تم إرسال المراسلة الداخلية بنجاح إلى الإدارة المختصة!' : 'Internal message dispatched successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/60 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-400/40 text-indigo-300 text-xs font-semibold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              {isAr ? 'سيستم ERP الشامل لإدارة محطات التعبئة والمحاسبة والـ HR' : 'Integrated Enterprise Packhouse ERP & HR'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              {isAr ? 'إدارة المعاملات المحاسبية والموظفين والحضور والمراسلات' : 'Complete Packhouse ERP & Business Suite'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              {isAr
                ? 'نظام ERP متكامل يشمل: القيود المحاسبية، فواتير التصدير والمحلي وضريبة 14% VAT، شؤون الموظفين والرواتب، الحضور والانصراف بالبصمة، والمراسلات الداخلية وإشعارات الواتساب المباشرة للعملاء والمزارعين.'
                : 'Comprehensive packhouse ERP: double-entry journals, 14% VAT invoicing, payroll, biometric attendance, internal email, and direct WhatsApp messaging.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveModule('messaging')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isAr ? 'المراسلات والواتساب' : 'WhatsApp & Mail'}</span>
            </button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-indigo-900/40 text-xs">
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[10px] block">{isAr ? 'إجمالي المبيعات' : 'Total Revenue'}</span>
            <span className="text-base font-bold text-emerald-400 mt-1 block">$24,624 + 205k EGP</span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[10px] block">{isAr ? 'ضريبة 14% المحصلة' : '14% VAT Collected'}</span>
            <span className="text-base font-bold text-amber-300 mt-1 block">28,224 EGP</span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[10px] block">{isAr ? 'إجمالي الموظفين' : 'Headcount'}</span>
            <span className="text-base font-bold text-white mt-1 block">{employees.length} {isAr ? 'موظف وعامل' : 'Employees'}</span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[10px] block">{isAr ? 'نسبة حضور اليوم' : 'Attendance Rate'}</span>
            <span className="text-base font-bold text-cyan-400 mt-1 block">100% {isAr ? 'بالبصمة' : 'Biometric'}</span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[10px] block">{isAr ? 'إجمالي القيود اليومية' : 'Journal Entries'}</span>
            <span className="text-base font-bold text-purple-300 mt-1 block">{journalEntries.length} {isAr ? 'قيد مرحل' : 'Entries'}</span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[10px] block">{isAr ? 'رسائل الواتساب' : 'WhatsApp Ready'}</span>
            <span className="text-base font-bold text-emerald-400 mt-1 block">100% {isAr ? 'مفعل ومربوط' : 'Active'}</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveModule('overview')}
          className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
            activeModule === 'overview' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          {isAr ? 'لوحة التحكم العامة' : 'Overview'}
        </button>

        <button
          onClick={() => setActiveModule('accounting')}
          className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
            activeModule === 'accounting' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          {isAr ? 'المعاملات المحاسبية ودفتر اليومية' : 'Accounting & Ledger'}
        </button>

        <button
          onClick={() => setActiveModule('hr_payroll')}
          className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
            activeModule === 'hr_payroll' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-cyan-300" />
          {isAr ? 'شؤون الموظفين والرواتب' : 'HR & Payroll'}
        </button>

        <button
          onClick={() => setActiveModule('attendance')}
          className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
            activeModule === 'attendance' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-emerald-300" />
          {isAr ? 'الحضور والانصراف والورديات' : 'Attendance & Shifts'}
        </button>

        <button
          onClick={() => setActiveModule('messaging')}
          className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
            activeModule === 'messaging' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          {isAr ? 'المراسلات الداخلية والواتساب' : 'Internal Mail & WhatsApp'}
        </button>

        <button
          onClick={() => setActiveModule('invoicing')}
          className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
            activeModule === 'invoicing' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          {isAr ? 'فواتير التصدير و14% VAT' : 'Invoices & 14% VAT'}
        </button>

        <button
          onClick={() => setActiveModule('intake')}
          className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
            activeModule === 'intake' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          {isAr ? 'استلام المحصول والبسكول' : 'Produce Intake'}
        </button>

        <button
          onClick={() => setActiveModule('coldstore')}
          className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
            activeModule === 'coldstore' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <ThermometerSnowflake className="w-3.5 h-3.5" />
          {isAr ? 'المخزون المبرد والطبالي' : 'Cold Store Stock'}
        </button>

        <button
          onClick={() => setActiveModule('asset_mgmt')}
          className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
            activeModule === 'asset_mgmt' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          {isAr ? 'الأصول الثابتة والإهلاكات' : 'Assets & Depreciation'}
        </button>

        <button
          onClick={() => setActiveModule('doc_workflow')}
          className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
            activeModule === 'doc_workflow' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          {isAr ? 'دورة العمل المستندية' : 'Documentary Workflow'}
        </button>
      </div>

      {/* MODULE 1: ACCOUNTING & JOURNAL ENTRIES */}
      {activeModule === 'accounting' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  {isAr ? 'دفتر اليومية العامة والقيود المزدوجة (General Journal & Ledger)' : 'General Journal & Accounting Ledger'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isAr
                    ? 'تسجيل وترحيل قيود المبيعات، مشتريات المحصول الخام، إثبات ضريبة 14%، والمصروفات التشغيلية وفق المعايير المحاسبية الدولية.'
                    : 'Double-entry journal posting for sales, raw intake, 14% VAT liability, and operating expenses.'}
                </p>
              </div>

              <button
                onClick={() => alert(isAr ? 'تم فتح نافذة قيد يومية جديد (Journal Entry)' : 'New Journal Entry form opened')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                {isAr ? 'إضافة قيد يومية يدوي' : 'Add Journal Entry'}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-start">{isAr ? 'رقم القيد' : 'Entry #'}</th>
                    <th className="p-3 text-start">{isAr ? 'التاريخ' : 'Date'}</th>
                    <th className="p-3 text-start">{isAr ? 'البيان والشرح' : 'Description'}</th>
                    <th className="p-3 text-start">{isAr ? 'حساب المدين (Debit)' : 'Debit Account'}</th>
                    <th className="p-3 text-start">{isAr ? 'حساب الدائن (Credit)' : 'Credit Account'}</th>
                    <th className="p-3 text-end">{isAr ? 'المبلغ' : 'Amount'}</th>
                    <th className="p-3 text-center">{isAr ? 'المستند المرجعي' : 'Ref Doc'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {journalEntries.map((je) => (
                    <tr key={je.id} className="hover:bg-slate-850/60">
                      <td className="p-3 font-mono font-bold text-amber-300">{je.entryNumber}</td>
                      <td className="p-3 text-slate-400 font-mono">{je.date}</td>
                      <td className="p-3 text-white font-medium max-w-xs">{isAr ? je.descriptionAr : je.descriptionEn}</td>
                      <td className="p-3 text-emerald-400 font-mono text-[11px]">{je.debitAccount}</td>
                      <td className="p-3 text-rose-400 font-mono text-[11px]">{je.creditAccount}</td>
                      <td className="p-3 text-end font-bold font-mono text-cyan-300">
                        {je.amount.toLocaleString()} {je.currency}
                      </td>
                      <td className="p-3 text-center font-mono text-slate-400">{je.refDocument}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: HR & PAYROLL */}
      {activeModule === 'hr_payroll' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  {isAr ? 'شؤون الموظفين وكشوف الرواتب والبدلات (HR & Monthly Payroll)' : 'HR & Payroll Management'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isAr
                    ? 'إدارة عقود العاملين بالمحطة، ساعات العمل الإضافي، البدلات، وإرسال قسائم الرواتب عبر الواتساب بنقرة واحدة.'
                    : 'Manage employees, salaries, overtime bonuses, and dispatch payslips via WhatsApp.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(isAr ? 'تم تصدير كشف الرواتب إلى ملف Excel / PDF بنجاح' : 'Payroll exported')}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  {isAr ? 'تصدير كشف الرواتب' : 'Export Payroll'}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-start">{isAr ? 'كود الموظف' : 'Emp ID'}</th>
                    <th className="p-3 text-start">{isAr ? 'الاسم والوظيفة' : 'Name & Title'}</th>
                    <th className="p-3 text-start">{isAr ? 'القسم' : 'Department'}</th>
                    <th className="p-3 text-end">{isAr ? 'الراتب الأساسي' : 'Basic (EGP)'}</th>
                    <th className="p-3 text-center">{isAr ? 'ساعات إضافي' : 'Overtime'}</th>
                    <th className="p-3 text-end">{isAr ? 'صافي الراتب المستحق' : 'Net Salary'}</th>
                    <th className="p-3 text-center">{isAr ? 'إشعار واتساب' : 'WhatsApp Slip'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-850/60">
                      <td className="p-3 font-mono font-bold text-slate-400">{emp.code}</td>
                      <td className="p-3">
                        <span className="font-bold text-white block">{isAr ? emp.nameAr : emp.nameEn}</span>
                        <span className="text-[10px] text-slate-400">{isAr ? emp.jobTitleAr : ''}</span>
                      </td>
                      <td className="p-3 text-slate-300">{isAr ? emp.departmentAr : emp.departmentEn}</td>
                      <td className="p-3 text-end font-mono">{emp.basicSalaryEgp.toLocaleString()} EGP</td>
                      <td className="p-3 text-center font-mono text-amber-300">+{emp.overtimeHours} hrs</td>
                      <td className="p-3 text-end font-bold font-mono text-emerald-400">
                        {emp.netSalaryEgp.toLocaleString()} EGP
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => {
                            const text = `السلام عليكم يا ${emp.nameAr}،\nتم تحويل راتب شهر أكتوبر 2026 بقيمة صافية: ${emp.netSalaryEgp.toLocaleString()} جنيه مصري.\nعدد ساعات الإضافي: ${emp.overtimeHours} ساعة.\nشكراً لجهودكم في محطة عين الصقر.`;
                            handleSendWhatsAppNotification(emp.phone, text);
                          }}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-semibold flex items-center justify-center gap-1 mx-auto cursor-pointer"
                        >
                          <Share2 className="w-3 h-3" />
                          <span>{isAr ? 'إرسال بالواتس' : 'Send WhatsApp'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: ATTENDANCE & BIOMETRIC SHIFTS */}
      {activeModule === 'attendance' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  {isAr ? 'سجل الحضور والانصراف بالبصمة البيومترية وساعات العمل' : 'Biometric Attendance & Time Tracking'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isAr
                    ? 'تسجيل لحظي لحركات دخول وخروج موظفي وعمال الورديات عبر جهاز البصمة وربط الساعات الإضافية آلياً بالأجور.'
                    : 'Real-time biometric punch logs with automated overtime calculation.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-bold">
                  {isAr ? 'جهاز البصمة: متصل ومزامن لحظياً (ZK-Teco)' : 'Biometric Device Online'}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-start">{isAr ? 'الموظف' : 'Employee'}</th>
                    <th className="p-3 text-start">{isAr ? 'التاريخ' : 'Date'}</th>
                    <th className="p-3 text-center">{isAr ? 'وقت الحضور' : 'Check-In'}</th>
                    <th className="p-3 text-center">{isAr ? 'وقت الانصراف' : 'Check-Out'}</th>
                    <th className="p-3 text-start">{isAr ? 'الوردية' : 'Shift'}</th>
                    <th className="p-3 text-center">{isAr ? 'ساعات العمل' : 'Hours'}</th>
                    <th className="p-3 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {attendanceList.map((att) => (
                    <tr key={att.id} className="hover:bg-slate-850/60">
                      <td className="p-3">
                        <span className="font-bold text-white block">{att.empNameAr}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{att.empCode}</span>
                      </td>
                      <td className="p-3 font-mono text-slate-400">{att.date}</td>
                      <td className="p-3 text-center font-mono font-bold text-emerald-400">{att.checkIn}</td>
                      <td className="p-3 text-center font-mono font-bold text-cyan-300">{att.checkOut}</td>
                      <td className="p-3">{att.shift}</td>
                      <td className="p-3 text-center font-mono font-bold">{att.workHours} h</td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            att.status === 'overtime'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          {att.status === 'overtime' ? (isAr ? 'وقت إضافي' : 'Overtime') : isAr ? 'حاضر' : 'Present'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: INTERNAL MESSAGING & WHATSAPP DISPATCH */}
      {activeModule === 'messaging' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Internal Mailbox */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-base font-bold text-white">
                    {isAr ? 'صندوق المراسلات والبريد الداخلي بين إدارات المحطة' : 'Internal Departmental Mailbox'}
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {messages.length} {isAr ? 'مراسلات رسمية' : 'messages'}
                </span>
              </div>

              {/* Compose New Message */}
              <form onSubmit={handleSendMessage} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <span className="font-bold text-white block">{isAr ? 'إرسال مذكرة أو إخطار داخلي جديد:' : 'Dispatch Internal Memo:'}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">{isAr ? 'الجهة المستلمة:' : 'Recipient Department:'}</label>
                    <select
                      value={msgRecipient}
                      onChange={(e) => setMsgRecipient(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                    >
                      <option value="إدارة تشغيل الخطوط">{isAr ? 'إدارة تشغيل الخطوط (Operations)' : 'Operations'}</option>
                      <option value="إدارة الثلاجات والتبريد">{isAr ? 'إدارة الثلاجات والتبريد (Cold Stores)' : 'Cold Stores'}</option>
                      <option value="مختبر الجودة ومتبقيات المبيدات">{isAr ? 'مختبر الجودة و MRL' : 'Quality Lab'}</option>
                      <option value="إدارة الحسابات والمالية">{isAr ? 'إدارة الحسابات والمالية' : 'Finance'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">{isAr ? 'الموضوع:' : 'Subject:'}</label>
                    <input
                      type="text"
                      required
                      placeholder={isAr ? 'عنوان الإخطار أو المذكرة...' : 'Memo Subject...'}
                      value={msgSubject}
                      onChange={(e) => setMsgSubject(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">{isAr ? 'نص المذكرة الداخلية:' : 'Message Content:'}</label>
                  <textarea
                    rows={2}
                    required
                    placeholder={isAr ? 'اكتب تفاصيل التوجيه أو الإخطار الفني هنا...' : 'Write message details...'}
                    value={msgBody}
                    onChange={(e) => setMsgBody(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إرسال المذكرة الآن' : 'Dispatch Memo'}</span>
                </button>
              </form>

              {/* Message Feed */}
              <div className="space-y-3 pt-2">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-indigo-300">{msg.senderName}</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-cyan-300 font-semibold">{msg.recipientDept}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                    </div>

                    <h4 className="text-xs font-bold text-white">{msg.subject}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{msg.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Direct WhatsApp Dispatch Gateway */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-700/60 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {isAr ? 'بوابة إشعارات الواتساب المباشرة' : 'WhatsApp Notification Gateway'}
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-mono">WhatsApp Cloud Web Link</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {isAr
                  ? 'إرسال إشعارات فورية عبر الواتساب للعملاء والمزارعين بنقرة زر واحدة دون الحاجة لإدخال أرقام يدوياً:'
                  : 'Send instant WhatsApp alerts to growers and export buyers with pre-formatted documents:'}
              </p>

              {/* Quick WhatsApp Action Cards */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="font-bold text-white block">1. إرسال تذكرة بسكول للمزارع</span>
                  <p className="text-[11px] text-slate-400">إشعار المزارع بالوزن القائم والصافي ودرجة سكر البريكس للدفعة.</p>
                  <button
                    onClick={() => {
                      const text = `السلام عليكم من محطة عين الصقر،\nتم استلام دفعتكم رقم REC-2026-084 بنجاح.\nالوزن الصافي: 17,290 كجم\nدرجة السكر: 12.3 Brix\nنسبة الفرز: 4.8%\nشكراً لتعاملكم معنا.`;
                      handleSendWhatsAppNotification('+201001234567', text);
                    }}
                    className="w-full py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded font-semibold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{isAr ? 'إرسال تذكرة الوزن بالواتساب' : 'Send Intake Ticket via WA'}</span>
                  </button>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="font-bold text-white block">2. إرسال فاتورة تصدير للعميل الخارجي</span>
                  <p className="text-[11px] text-slate-400">إشعار المشتري برقم الحاوية وقيمة الفاتورة $24,624 وضريبة 14%.</p>
                  <button
                    onClick={() => {
                      const text = `Dear EuroFresh Logistics,\nYour export invoice EXP-EG-2026-0941 has been confirmed.\nTotal: $24,624 USD (including 14% VAT).\nContainer: MSCU-902144-8.\nThank you for your business.`;
                      handleSendWhatsAppNotification('+31612345678', text);
                    }}
                    className="w-full py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded font-semibold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{isAr ? 'إرسال الفاتورة للعميل بالواتساب' : 'Send Invoice via WA'}</span>
                  </button>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="font-bold text-white block">3. إنذار طوارئ لدرجات حرارة الثلاجات</span>
                  <p className="text-[11px] text-slate-400">إشعار مهندس التبريد ومدير المحطة في حالة ارتفاع الحرارة عن 4.5°C.</p>
                  <button
                    onClick={() => {
                      const text = `⚠️ إنذار فوري من محطة التعبئة:\nتم رصد ارتفاع حرارة في عنبر التخزين المبرد 3 إلى 4.8°C.\nيرجى فحص شيلر التبريد فوراً.`;
                      handleSendWhatsAppNotification('+201023345566', text);
                    }}
                    className="w-full py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded font-semibold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{isAr ? 'إرسال إنذار التبريد بالواتساب' : 'Send Alarm via WA'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 5: INVOICING & 14% VAT */}
      {activeModule === 'invoicing' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              {isAr ? 'فواتير التصدير والمبيعات مع ضريبة القيمة المضافة 14% VAT' : 'Sales Invoices & 14% VAT'}
            </h3>
            <span className="text-xs text-slate-400 font-mono">{invoices.length} {isAr ? 'فواتير مصدرة' : 'Invoices'}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3 text-start">{isAr ? 'رقم الفاتورة' : 'Invoice #'}</th>
                  <th className="p-3 text-start">{isAr ? 'العميل' : 'Customer'}</th>
                  <th className="p-3 text-end">{isAr ? 'المجموع قبل الضريبة' : 'Subtotal'}</th>
                  <th className="p-3 text-end">{isAr ? 'ضريبة 14% VAT' : '14% VAT'}</th>
                  <th className="p-3 text-end">{isAr ? 'الإجمالي النهائي' : 'Grand Total'}</th>
                  <th className="p-3 text-center">{isAr ? 'رقم الحاوية' : 'Container'}</th>
                  <th className="p-3 text-center">{isAr ? 'إرسال واتساب' : 'WhatsApp'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-850/60">
                    <td className="p-3 font-mono font-bold text-amber-300">{inv.invoiceNumber}</td>
                    <td className="p-3 font-medium text-white">{inv.customerName}</td>
                    <td className="p-3 text-end font-mono">{inv.subtotal.toLocaleString()} {inv.currency}</td>
                    <td className="p-3 text-end font-mono text-amber-400">+{inv.taxVat14.toLocaleString()} {inv.currency}</td>
                    <td className="p-3 text-end font-bold font-mono text-emerald-400">
                      {inv.grandTotal.toLocaleString()} {inv.currency}
                    </td>
                    <td className="p-3 text-center font-mono text-cyan-300">{inv.containerNumber}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          const msg = `فاتورة رقم ${inv.invoiceNumber} بمبلغ إجمالي ${inv.grandTotal.toLocaleString()} ${inv.currency} شاملة ضريبة 14% VAT على حاوية رقم ${inv.containerNumber}`;
                          handleSendWhatsAppNotification(inv.customerPhone || '+20100000000', msg);
                        }}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-semibold flex items-center justify-center gap-1 mx-auto"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>{isAr ? 'إرسال' : 'Send'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 6: PRODUCE INTAKE */}
      {activeModule === 'intake' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Truck className="w-4 h-4 text-cyan-400" />
            {isAr ? 'تذاكر استلام المحصول الخام وميزان البسكول' : 'Raw Produce Intake & Weighbridge'}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3 text-start">{isAr ? 'كود الدفعة' : 'Batch ID'}</th>
                  <th className="p-3 text-start">{isAr ? 'المزرعة والمورد' : 'Grower / Farm'}</th>
                  <th className="p-3 text-start">{isAr ? 'المحصول' : 'Crop'}</th>
                  <th className="p-3 text-center">{isAr ? 'عدد البينات' : 'Bins'}</th>
                  <th className="p-3 text-end">{isAr ? 'الوزن الصافي' : 'Net Weight'}</th>
                  <th className="p-3 text-center">{isAr ? 'السكر Brix' : 'Brix'}</th>
                  <th className="p-3 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                  <th className="p-3 text-center">{isAr ? 'إشعار واتساب' : 'WhatsApp'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {intakeBatches.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-850/60">
                    <td className="p-3 font-mono font-bold text-amber-300">{b.id}</td>
                    <td className="p-3 font-medium text-white">{b.growerName}</td>
                    <td className="p-3 text-slate-300">{b.cropType}</td>
                    <td className="p-3 text-center font-mono">{b.binsCount}</td>
                    <td className="p-3 text-end font-bold font-mono text-cyan-300">{b.netWeightKg.toLocaleString()} kg</td>
                    <td className="p-3 text-center font-mono text-emerald-400">{b.qcSugarBrix}°Bx</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        {b.status === 'completed' ? (isAr ? 'اكتمل' : 'Done') : isAr ? 'قيد الفرز' : 'In Grading'}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          const msg = `إشعار استلام دفعة ${b.id} من مزرعة ${b.growerName} بوزن صافي ${b.netWeightKg} كجم ودرجة سكر ${b.qcSugarBrix} Brix.`;
                          handleSendWhatsAppNotification('+201001234567', msg);
                        }}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-semibold flex items-center justify-center gap-1 mx-auto"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>{isAr ? 'إرسال' : 'Send'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 7: COLD STORE STOCK */}
      {activeModule === 'coldstore' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <ThermometerSnowflake className="w-4 h-4 text-cyan-400" />
            {isAr ? 'مخزون الطبالي في العنابر المبردة' : 'Cold Store Pallet Inventory'}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3 text-start">{isAr ? 'باركود الطبلية' : 'Pallet SSCC'}</th>
                  <th className="p-3 text-start">{isAr ? 'الصنف والدرجة' : 'Grade'}</th>
                  <th className="p-3 text-center">{isAr ? 'الكراتين' : 'Cartons'}</th>
                  <th className="p-3 text-end">{isAr ? 'الوزن' : 'Weight'}</th>
                  <th className="p-3 text-start">{isAr ? 'عنبر التخزين' : 'Cold Room'}</th>
                  <th className="p-3 text-center">{isAr ? 'الحرارة' : 'Temp'}</th>
                  <th className="p-3 text-start">{isAr ? 'السوق المستهدف' : 'Target Market'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {pallets.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-850/60">
                    <td className="p-3 font-mono font-bold text-cyan-300">{p.id} ({p.ssccBarcode.slice(-6)})</td>
                    <td className="p-3 text-white">{p.cropGrade}</td>
                    <td className="p-3 text-center font-mono">{p.cartonCount}</td>
                    <td className="p-3 text-end font-mono text-emerald-400 font-bold">{p.netWeightKg} kg</td>
                    <td className="p-3 text-slate-300">{p.coldStoreChamber}</td>
                    <td className="p-3 text-center font-mono text-cyan-300">{p.temperature}</td>
                    <td className="p-3 text-slate-300">{p.targetMarket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 8: OVERVIEW */}
      {activeModule === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'الملخص المحاسبي' : 'Accounting Summary'}</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>{isAr ? 'مبيعات التصدير:' : 'Export Sales:'}</span>
                <span className="font-bold text-white">$24,624</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{isAr ? 'مبيعات السوق المحلي:' : 'Domestic Sales:'}</span>
                <span className="font-bold text-white">205,200 EGP</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{isAr ? 'ضريبة 14% المستحقة:' : 'VAT 14%:'}</span>
                <span className="font-bold text-amber-400">28,224 EGP</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>{isAr ? 'ملخص شؤون العاملين (HR)' : 'HR & Staff'}</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>{isAr ? 'إجمالي الموظفين:' : 'Headcount:'}</span>
                <span className="font-bold text-white">{employees.length} {isAr ? 'عامل وموظف' : 'Staff'}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{isAr ? 'إجمالي مسير الرواتب:' : 'Total Payroll:'}</span>
                <span className="font-bold text-emerald-400">78,500 EGP</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{isAr ? 'ساعات الإضافي هذا الأسبوع:' : 'Weekly Overtime:'}</span>
                <span className="font-bold text-amber-300">62 hrs</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'المراسلات والواتساب' : 'Communications'}</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>{isAr ? 'المذكرات الداخلية:' : 'Internal Memos:'}</span>
                <span className="font-bold text-white">{messages.length}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{isAr ? 'حالة ربط الواتساب:' : 'WhatsApp Status:'}</span>
                <span className="font-bold text-emerald-400">{isAr ? 'جاهز ومفعل' : 'Ready'}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{isAr ? 'الإشعارات الآلية:' : 'Auto Alerts:'}</span>
                <span className="font-bold text-cyan-300">{isAr ? 'تذاكر + فواتير + رواتب' : 'All Triggers'}</span>
              </div>
            </div>
          </div>
        {activeModule === 'doc_workflow' && (
          <div className="p-6 bg-white rounded-xl shadow-inner border">
             <DocumentaryWorkflowModule lang={lang} />
          </div>
        )}
      </div>
    );
};
