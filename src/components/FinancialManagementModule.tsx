import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet, CreditCard, Building, FileText, Plus, CheckCircle, ArrowUpRight, ArrowDownRight, ShieldCheck } from 'lucide-react';

interface FinancialManagementModuleProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

interface ExpenseItem {
  id: string;
  categoryAr: string;
  categoryEn: string;
  amountEgp: number;
  date: string;
  payee: string;
  treasury: string;
  notes: string;
}

interface RevenueItem {
  id: string;
  sourceAr: string;
  sourceEn: string;
  amountEgp: number;
  date: string;
  payer: string;
  treasury: string;
  referenceInvoice: string;
}

export const FinancialManagementModule: React.FC<FinancialManagementModuleProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'treasury' | 'revenues' | 'expenses' | 'payroll' | 'vat'>('treasury');
  
  // Treasury accounts
  const [treasuries, setTreasuries] = useState([
    { id: 'TR-01', nameAr: 'الخزينة الرئيسية (رئيس المحطة)', nameEn: 'Main Cash Treasury', balance: 485000, currency: 'EGP' },
    { id: 'TR-02', nameAr: 'حساب البنك الأهلي المصري (تصدير)', nameEn: 'National Bank of Egypt (Export Acc)', balance: 3420000, currency: 'EGP' },
    { id: 'TR-03', nameAr: 'حساب بنك التجاري الدولي CIB (دولار)', nameEn: 'CIB USD Export Account', balance: 145000, currency: 'USD' },
    { id: 'TR-04', nameAr: 'عهدة خط الفرز والتشغيل السريع', nameEn: 'Line Sorting Petty Cash', balance: 35000, currency: 'EGP' },
  ]);

  // Expenses State
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: 'EXP-101', categoryAr: 'أجور ومرتبات عمال خط الفرز', categoryEn: 'Sorting Line Workers Payroll', amountEgp: 185000, date: '2026-10-15', payee: 'كشف مرتبات أكتوبر 2026', treasury: 'الخزينة الرئيسية', notes: 'صرف مرتبات عمال التعبئة والفرز' },
    { id: 'EXP-102', categoryAr: 'سولار وقود مولدات الطوارئ الكهربائية', categoryEn: 'Diesel for Emergency Generators', amountEgp: 42000, date: '2026-10-14', payee: 'محطة وقود التعاون', treasury: 'الخزينة الرئيسية', notes: 'تموين مولد 500 KVA أثناء انقطاع التيار' },
    { id: 'EXP-103', categoryAr: 'مواد تغطية وشمع صالح للتصدير (Wax & Fungicide)', categoryEn: 'Export Wax & Fungicide Materials', amountEgp: 95000, date: '2026-10-12', payee: 'شركة الكيماويات الزراعية الحديثة', treasury: 'بنك CIB', notes: 'شراء 12 برميل شمع فواكه وImazalil' },
    { id: 'EXP-104', categoryAr: 'صيانة دورية لماكينات الفرز البصري', categoryEn: 'Optical Sorter Preventive Maintenance', amountEgp: 28000, date: '2026-10-10', payee: 'مهندس صيانة معتمد', treasury: 'الخزينة الرئيسية', notes: 'تغيير عدسات ومستشعرات كاميرات الـ NIR' },
  ]);

  // Revenues State
  const [revenues, setRevenues] = useState<RevenueItem[]>([
    { id: 'REV-501', sourceAr: 'مبيعات شحنة برتقال فالنسيا (روتردام - هولندا)', sourceEn: 'Valencia Orange Export (Rotterdam Port)', amountEgp: 1250000, date: '2026-10-16', payer: 'شركة البركات للاستيراد والتصدير الأوروبي', treasury: 'البنك الأهلي المصري', referenceInvoice: 'INV-2026-891' },
    { id: 'REV-502', sourceAr: 'مبيعات مانجو زبدية أسواق محلية (جملة الصاغة)', sourceEn: 'Local Market Mango Wholesale', amountEgp: 340000, date: '2026-10-15', payer: 'سوق العبور لجملة الخضر والفاكهة', treasury: 'الخزينة الرئيسية', referenceInvoice: 'INV-2026-890' },
    { id: 'REV-503', sourceAr: 'مبيعات مخلفات قشور الحمضيات لمصانع الأعلاف', sourceEn: 'Citrus Peel Residue Sales for Feed', amountEgp: 45000, date: '2026-10-13', payer: 'مصنع العروبة للأعلاف الحيوانية', treasury: 'الخزينة الرئيسية', referenceInvoice: 'INV-2026-885' },
  ]);

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpCat, setNewExpCat] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');
  const [newExpPayee, setNewExpPayee] = useState('');

  const [showAddRevenue, setShowAddRevenue] = useState(false);
  const [newRevSource, setNewRevSource] = useState('');
  const [newRevAmount, setNewRevAmount] = useState('');
  const [newRevPayer, setNewRevPayer] = useState('');

  const isAr = lang === 'ar';
  const isEs = lang === 'es';
  const isFr = lang === 'fr';

  const totalTreasuryBalanceEgp = treasuries.reduce((acc, t) => acc + (t.currency === 'USD' ? t.balance * 50 : t.balance), 0);
  const totalMonthlyExpenses = expenses.reduce((acc, e) => acc + e.amountEgp, 0);
  const totalMonthlyRevenues = revenues.reduce((acc, r) => acc + r.amountEgp, 0);
  const netProfit = totalMonthlyRevenues - totalMonthlyExpenses;

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpCat || !newExpAmount) return;
    const item: ExpenseItem = {
      id: `EXP-${Date.now().toString().slice(-4)}`,
      categoryAr: newExpCat,
      categoryEn: newExpCat,
      amountEgp: Number(newExpAmount),
      date: new Date().toISOString().split('T')[0],
      payee: newExpPayee || 'مورد عام',
      treasury: 'الخزينة الرئيسية',
      notes: 'إضافة يدوية عبر سيستم الـ ERP'
    };
    setExpenses([item, ...expenses]);
    setNewExpCat('');
    setNewExpAmount('');
    setNewExpPayee('');
    setShowAddExpense(false);
  };

  const handleAddRevenue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRevSource || !newRevAmount) return;
    const item: RevenueItem = {
      id: `REV-${Date.now().toString().slice(-4)}`,
      sourceAr: newRevSource,
      sourceEn: newRevSource,
      amountEgp: Number(newRevAmount),
      date: new Date().toISOString().split('T')[0],
      payer: newRevPayer || 'عميل عام',
      treasury: 'البنك الأهلي المصري',
      referenceInvoice: `INV-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setRevenues([item, ...revenues]);
    setNewRevSource('');
    setNewRevAmount('');
    setNewRevPayer('');
    setShowAddRevenue(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              ERP Financial Engine & Treasury Core
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            {isAr ? 'الإدارة المالية، الخزينة، المصروفات، الإيرادات والمرتبات' : 'Financial Management, Treasury, Expenses & Payroll ERP'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            {isAr ? 'إدارة شاملة لكافة الحسابات البنكية، الخزن النقدية، المصروفات التشغيلية، الإيرادات اليومية، مرتبات الموظفين والعمال، وضريبة القيمة المضافة (14%).' : 'Comprehensive management of bank accounts, cash treasuries, operational expenses, daily revenues, employee payroll, and 14% VAT.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowAddRevenue(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'تسجيل إيراد جديد' : 'Add Revenue'}</span>
          </button>
          <button
            onClick={() => setShowAddExpense(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'تسجيل مصروف جديد' : 'Add Expense'}</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{isAr ? 'إجمالي السيولة (الخزينة والبنوك)' : 'Total Treasury Liquidity'}</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-950 tracking-tight">
            {totalTreasuryBalanceEgp.toLocaleString()} <span className="text-xs font-normal text-slate-500">EGP</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> {isAr ? 'محدث آلياً من المعاملات البنكية' : 'Auto-updated from bank feeds'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{isAr ? 'إجمالي الإيرادات (الشهر الحالي)' : 'Monthly Revenues'}</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-blue-600 tracking-tight">
            {totalMonthlyRevenues.toLocaleString()} <span className="text-xs font-normal text-slate-500">EGP</span>
          </div>
          <p className="text-[11px] text-blue-600 font-semibold mt-1">
            {isAr ? 'مبيعات التصدير وأسواق الجملة' : 'Export & Wholesale revenue'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{isAr ? 'إجمالي المصروفات التشغيلية' : 'Monthly Operational Expenses'}</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-600 tracking-tight">
            {totalMonthlyExpenses.toLocaleString()} <span className="text-xs font-normal text-slate-500">EGP</span>
          </div>
          <p className="text-[11px] text-rose-600 font-semibold mt-1">
            {isAr ? 'مرتبات، وقود، ومواد تعبئة' : 'Payroll, fuel, and packaging'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{isAr ? 'صافي الربح التقديري' : 'Net Operating Profit'}</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className={`text-2xl font-black tracking-tight ${netProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {netProfit.toLocaleString()} <span className="text-xs font-normal text-slate-500">EGP</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {isAr ? 'بعد خصم كافة الالتزامات والرواتب' : 'After all liabilities & payroll'}
          </p>
        </div>
      </div>

      {/* Submodule Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('treasury')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'treasury' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          {isAr ? '🏦 الخزينة والحسابات البنكية' : '🏦 Treasury & Bank Accounts'}
        </button>
        <button
          onClick={() => setActiveTab('revenues')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'revenues' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          {isAr ? '📈 سجل الإيرادات والمبيعات' : '📈 Revenues & Sales Ledger'}
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'expenses' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          {isAr ? '📉 سجل المصروفات والتشغيل' : '📉 Expenses & Operational Costs'}
        </button>
        <button
          onClick={() => setActiveTab('payroll')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'payroll' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          {isAr ? '👥 مرتبات وأجور العاملين' : '👥 Employee Payroll & Wages'}
        </button>
        <button
          onClick={() => setActiveTab('vat')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'vat' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          {isAr ? '🧾 ضريبة القيمة المضافة (14%)' : '🧾 VAT Tax Report (14%)'}
        </button>
      </div>

      {/* Tab Content: Treasury */}
      {activeTab === 'treasury' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            {isAr ? 'الأرصدة الحالية في الخزن النقدية والحسابات المصرفية' : 'Current Balances in Cash Treasuries & Banks'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {treasuries.map((tr) => (
              <div key={tr.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{tr.id}</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{isAr ? tr.nameAr : tr.nameEn}</h4>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">{isAr ? 'الرصيد المتاح:' : 'Available:'}</span>
                  <span className="text-lg font-black text-emerald-600">
                    {tr.balance.toLocaleString()} <span className="text-xs font-medium text-slate-700">{tr.currency}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Revenues */}
      {activeTab === 'revenues' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">{isAr ? 'سجل الإيرادات والتدفقات الداخلة' : 'Inbound Revenue Transactions'}</h3>
            <button onClick={() => setShowAddRevenue(true)} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة إيراد' : 'Add Revenue'}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold">
                  <th className="p-3 text-start">{isAr ? 'رقم القيد' : 'ID'}</th>
                  <th className="p-3 text-start">{isAr ? 'مصدر الإيراد والبيان' : 'Revenue Source'}</th>
                  <th className="p-3 text-start">{isAr ? 'الدافع / العميل' : 'Payer'}</th>
                  <th className="p-3 text-start">{isAr ? 'الخزينة المستلمة' : 'Treasury'}</th>
                  <th className="p-3 text-start">{isAr ? 'المبلغ (EGP)' : 'Amount'}</th>
                  <th className="p-3 text-start">{isAr ? 'التاريخ' : 'Date'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {revenues.map((rev) => (
                  <tr key={rev.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-emerald-600">{rev.id}</td>
                    <td className="p-3 font-bold text-slate-900">{isAr ? rev.sourceAr : rev.sourceEn}</td>
                    <td className="p-3 text-slate-700">{rev.payer}</td>
                    <td className="p-3 text-slate-600">{rev.treasury}</td>
                    <td className="p-3 font-black text-emerald-600">+{rev.amountEgp.toLocaleString()} EGP</td>
                    <td className="p-3 text-slate-500">{rev.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Expenses */}
      {activeTab === 'expenses' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">{isAr ? 'سجل المصروفات التشغيلية والتكاليف' : 'Operational & Overhead Expenses'}</h3>
            <button onClick={() => setShowAddExpense(true)} className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة مصروف' : 'Add Expense'}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold">
                  <th className="p-3 text-start">{isAr ? 'رقم القيد' : 'ID'}</th>
                  <th className="p-3 text-start">{isAr ? 'بند المصروف' : 'Category'}</th>
                  <th className="p-3 text-start">{isAr ? 'المستفيد / المورد' : 'Payee'}</th>
                  <th className="p-3 text-start">{isAr ? 'الخزينة المسددة' : 'Treasury'}</th>
                  <th className="p-3 text-start">{isAr ? 'المبلغ (EGP)' : 'Amount'}</th>
                  <th className="p-3 text-start">{isAr ? 'التاريخ' : 'Date'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-rose-600">{exp.id}</td>
                    <td className="p-3 font-bold text-slate-900">{isAr ? exp.categoryAr : exp.categoryEn}</td>
                    <td className="p-3 text-slate-700">{exp.payee}</td>
                    <td className="p-3 text-slate-600">{exp.treasury}</td>
                    <td className="p-3 font-black text-rose-600">-{exp.amountEgp.toLocaleString()} EGP</td>
                    <td className="p-3 text-slate-500">{exp.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Payroll */}
      {activeTab === 'payroll' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900">{isAr ? 'كشف مرتبات وأجور العاملين ومهندسي المحطة' : 'Employee & Station Engineer Payroll'}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold">
                  <th className="p-3 text-start">كود الموظف</th>
                  <th className="p-3 text-start">اسم الموظف والوظيفة</th>
                  <th className="p-3 text-start">الراتب الأساسي</th>
                  <th className="p-3 text-start">بدلات وحوافز</th>
                  <th className="p-3 text-start">الصافي المستحق (EGP)</th>
                  <th className="p-3 text-start">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr>
                  <td className="p-3 font-mono">EMP-01</td>
                  <td className="p-3 font-bold">مهندس أحمد المصري (مدير المحطة)</td>
                  <td className="p-3">25,000 EGP</td>
                  <td className="p-3 text-emerald-600">+5,000 EGP</td>
                  <td className="p-3 font-black text-slate-900">30,000 EGP</td>
                  <td className="p-3 text-emerald-600 font-bold">تم الصرف</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">EMP-02</td>
                  <td className="p-3 font-bold">محمود حسن (فني صيانة وتشغيل PLC)</td>
                  <td className="p-3">14,000 EGP</td>
                  <td className="p-3 text-emerald-600">+2,000 EGP</td>
                  <td className="p-3 font-black text-slate-900">16,000 EGP</td>
                  <td className="p-3 text-emerald-600 font-bold">تم الصرف</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">EMP-03</td>
                  <td className="p-3 font-bold">فريق عمال التعبئة والفرز (15 عامل)</td>
                  <td className="p-3">135,000 EGP</td>
                  <td className="p-3 text-emerald-600">+10,000 EGP</td>
                  <td className="p-3 font-black text-slate-900">145,000 EGP</td>
                  <td className="p-3 text-emerald-600 font-bold">تم الصرف</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: VAT */}
      {activeTab === 'vat' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900">{isAr ? 'تقرير ضريبة القيمة المضافة (14%) والمحاسبة الضريبية' : 'VAT Tax Report & Compliance Summary'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-bold">{isAr ? 'إجمالي مبيعات خاضعة للضريبة' : 'Taxable Sales Total'}</span>
              <div className="text-xl font-black text-slate-900 mt-1">1,590,000 EGP</div>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs text-emerald-700 font-bold">{isAr ? 'ضريبة القيمة المضافة المحصولة (14%)' : 'VAT Collected (14%)'}</span>
              <div className="text-xl font-black text-emerald-700 mt-1">222,600 EGP</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-xs text-blue-700 font-bold">{isAr ? 'صافي الموقف الضريبي الشهري' : 'Net Tax Payable'}</span>
              <div className="text-xl font-black text-blue-700 mt-1">184,200 EGP</div>
            </div>
          </div>
        </div>
      )}

      {/* Add Revenue Modal */}
      {showAddRevenue && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{isAr ? 'تسجيل إيراد جديد للخزينة أو البنك' : 'Record New Revenue'}</h3>
            <form onSubmit={handleAddRevenue} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'بيان الإيراد' : 'Revenue Description'}</label>
                <input type="text" required value={newRevSource} onChange={(e) => setNewRevSource(e.target.value)} placeholder="مثال: مبيعات شحنة تصدير" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'اسم العميل / الدافع' : 'Payer Name'}</label>
                <input type="text" value={newRevPayer} onChange={(e) => setNewRevPayer(e.target.value)} placeholder="مثال: شركة الاستيراد الأوروبي" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'المبلغ (EGP)' : 'Amount (EGP)'}</label>
                <input type="number" required value={newRevAmount} onChange={(e) => setNewRevAmount(e.target.value)} placeholder="150000" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowAddRevenue(false)} className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-700">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 rounded-lg text-xs font-bold text-white">حفظ الإيراد</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{isAr ? 'تسجيل مصروف تشغيلي جديد' : 'Record New Expense'}</h3>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'بند المصروف' : 'Expense Category'}</label>
                <input type="text" required value={newExpCat} onChange={(e) => setNewExpCat(e.target.value)} placeholder="مثال: وقود مولدات / صيانة" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'اسم المستفيد / المورد' : 'Payee Name'}</label>
                <input type="text" value={newExpPayee} onChange={(e) => setNewExpPayee(e.target.value)} placeholder="مثال: محطة الوقود" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'المبلغ (EGP)' : 'Amount (EGP)'}</label>
                <input type="number" required value={newExpAmount} onChange={(e) => setNewExpAmount(e.target.value)} placeholder="25000" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowAddExpense(false)} className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-700">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-rose-600 rounded-lg text-xs font-bold text-white">حفظ المصروف</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
