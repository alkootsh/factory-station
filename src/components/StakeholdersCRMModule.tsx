import React, { useState } from 'react';
import { Users, Building, Truck, Globe, Phone, Mail, Plus, Search, ShieldCheck, DollarSign, MapPin, CheckCircle2 } from 'lucide-react';

interface StakeholdersCRMModuleProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

interface Stakeholder {
  id: string;
  name: string;
  type: 'customer' | 'supplier' | 'exporter' | 'importer';
  categoryAr: string;
  categoryEn: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  creditLimit: number;
  currentBalance: number;
  status: 'active' | 'vip' | 'pending';
}

export const StakeholdersCRMModule: React.FC<StakeholdersCRMModuleProps> = ({ lang }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'customer' | 'supplier' | 'exporter' | 'importer'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [type, setType] = useState<'customer' | 'supplier' | 'exporter' | 'importer'>('customer');
  const [country, setCountry] = useState('مصر / Egypt');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [creditLimit, setCreditLimit] = useState('500000');
  const [successMsg, setSuccessMsg] = useState('');

  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
    {
      id: 'STK-101',
      name: 'شركة البركات للاستيراد والتصدير الأوروبي',
      type: 'importer',
      categoryAr: 'مستور دولي (هولندا - روتردام)',
      categoryEn: 'International Importer (Rotterdam)',
      country: 'هولندا / Netherlands',
      city: 'Rotterdam Port',
      phone: '+31 10 555 4821',
      email: 'import@barakat-eu.nl',
      creditLimit: 5000000,
      currentBalance: 1250000,
      status: 'vip'
    },
    {
      id: 'STK-102',
      name: 'مزارع الوادي الأخضر للاستثمار الزراعي',
      type: 'supplier',
      categoryAr: 'مورد محاصيل وبساتين (برتقال ومانجو)',
      categoryEn: 'Farm Grower & Supplier',
      country: 'مصر / Egypt',
      city: 'البحيرة / Wady El Natroun',
      phone: '+20 100 849 2011',
      email: 'farms@greenvalley-eg.com',
      creditLimit: 2000000,
      currentBalance: 340000,
      status: 'active'
    },
    {
      id: 'STK-103',
      name: 'مؤسسة النيل الدولية لتصدير الحاصلات',
      type: 'exporter',
      categoryAr: 'مصدّر معتمد للأسواق العربية والأسيوية',
      categoryEn: 'Certified Exporter',
      country: 'مصر / Egypt',
      city: 'الإسكندرية / Alexandria',
      phone: '+20 3 487 9120',
      email: 'export@nile-agri.com',
      creditLimit: 10000000,
      currentBalance: 4200000,
      status: 'vip'
    },
    {
      id: 'STK-104',
      name: 'سوق العبور لجملة الخضر والفاكهة (العملاء المحليين)',
      type: 'customer',
      categoryAr: 'عميل تجارة جملة محلي',
      categoryEn: 'Local Wholesale Customer',
      country: 'مصر / Egypt',
      city: 'القاهرة / Cairo',
      phone: '+20 2 2741 8900',
      email: 'obsour-market@egypt-wholesale.gov',
      creditLimit: 1500000,
      currentBalance: 180000,
      status: 'active'
    },
    {
      id: 'STK-105',
      name: 'شركة التغليف الحديث والمواد البلاستيكية',
      type: 'supplier',
      categoryAr: 'مورد كراتين ومواد تعبئة',
      categoryEn: 'Packaging & Carton Supplier',
      country: 'مصر / Egypt',
      city: 'السادس من أكتوبر / 6th October',
      phone: '+20 2 3833 9100',
      email: 'sales@modern-packing.eg',
      creditLimit: 1000000,
      currentBalance: 95000,
      status: 'active'
    }
  ]);

  const isAr = lang === 'ar';

  const handleAddStakeholder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newStk: Stakeholder = {
      id: `STK-${Math.floor(100 + Math.random() * 900)}`,
      name,
      type,
      categoryAr: type === 'customer' ? 'عميل محلي' : type === 'supplier' ? 'مورد مواد وخامات' : type === 'exporter' ? 'شركة تصدير' : 'مستورد دولي',
      categoryEn: type.toUpperCase(),
      country,
      city: 'القاهرة / القاهرة الكبرى',
      phone: phone || '+20 100 000 0000',
      email: email || 'contact@stakeholder.local',
      creditLimit: Number(creditLimit),
      currentBalance: 0,
      status: 'active'
    };

    setStakeholders([newStk, ...stakeholders]);
    setName('');
    setPhone('');
    setEmail('');
    setShowAddModal(false);
    setSuccessMsg(isAr ? 'تم إضافة الجهة بنجاح للسجل!' : 'Stakeholder added successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const filtered = stakeholders.filter((s) => {
    const matchesFilter = activeFilter === 'all' || s.type === activeFilter;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              CRM & Supply Chain Directory Core
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            {isAr ? 'إدارة العملاء، الموردين، المصدرين والمستوردين (CRM)' : 'Customers, Suppliers, Exporters & Importers CRM Directory'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            {isAr ? 'دليل موحد وشامل لإدارة كافة العلاقات التجارية، مزارع التوريد، وكلاء الاستيراد الدوليين، شركات التصدير، والعملاء المحليين مع متابعة الأرصدة والحدود الائتمانية.' : 'Unified directory for managing commercial relationships, farm growers, international import agents, export firms, and local customers.'}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? 'إضافة جهة جديدة' : 'Add New Stakeholder'}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeFilter === 'all' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {isAr ? 'الكل (' + stakeholders.length + ')' : 'All (' + stakeholders.length + ')'}
          </button>
          <button
            onClick={() => setActiveFilter('customer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeFilter === 'customer' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {isAr ? '👥 العملاء المحليين' : '👥 Customers'}
          </button>
          <button
            onClick={() => setActiveFilter('supplier')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeFilter === 'supplier' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {isAr ? '🚜 الموردين والمزارع' : '🚜 Suppliers & Growers'}
          </button>
          <button
            onClick={() => setActiveFilter('exporter')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeFilter === 'exporter' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {isAr ? '🚢 المصدرين' : '🚢 Exporters'}
          </button>
          <button
            onClick={() => setActiveFilter('importer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeFilter === 'importer' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {isAr ? '🌍 المستوردين الدوليين' : '🌍 International Importers'}
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute start-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isAr ? 'بحث بالاسم أو المدينة...' : 'Search by name or city...'}
            className="w-full ps-9 pe-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Stakeholders Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((stk) => (
          <div key={stk.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 flex flex-col justify-between hover:border-emerald-400 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                  {stk.type === 'customer' ? (isAr ? 'عميل محلي' : 'Customer') : stk.type === 'supplier' ? (isAr ? 'مورد / مزرعة' : 'Supplier') : stk.type === 'exporter' ? (isAr ? 'مصدّر' : 'Exporter') : (isAr ? 'مستورد دولي' : 'Importer')}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">{stk.id}</span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base">{stk.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{isAr ? stk.categoryAr : stk.categoryEn}</p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{stk.city}, {stk.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span dir="ltr">{stk.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{stk.email}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">{isAr ? 'الرصيد المالي الحالي:' : 'Current Balance:'}</span>
                <span className="text-sm font-black text-emerald-600">
                  {stk.currentBalance.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">EGP</span>
                </span>
              </div>
              <div className="text-end">
                <span className="text-[10px] text-slate-400 block">{isAr ? 'الحد الائتماني:' : 'Credit Limit:'}</span>
                <span className="text-xs font-bold text-slate-700">
                  {stk.creditLimit.toLocaleString()} EGP
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{isAr ? 'إضافة جهة جديدة (عميل، مورد، مصدر، مستورد)' : 'Add New Stakeholder'}</h3>
            <form onSubmit={handleAddStakeholder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'نوع الجهة' : 'Stakeholder Type'}</label>
                <select value={type} onChange={(e: any) => setType(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50">
                  <option value="customer">{isAr ? 'عميل محلي (Customer)' : 'Customer'}</option>
                  <option value="supplier">{isAr ? 'مورد أو مزرعة (Supplier / Grower)' : 'Supplier / Grower'}</option>
                  <option value="exporter">{isAr ? 'شركة تصدير (Exporter)' : 'Exporter'}</option>
                  <option value="importer">{isAr ? 'مستورد دولي (International Importer)' : 'International Importer'}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'اسم الجهة / الشركة / المزرعة' : 'Name / Company / Farm'}</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: شركة النيل للاستيراد والتصدير" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'الدولة والمدينة' : 'Country & City'}</label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="مصر - القاهرة" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'رقم الهاتف' : 'Phone Number'}</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+20 100 000 0000" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'البريد الإلكتروني' : 'Email'}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contact@company.com" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'الحد الائتماني (EGP)' : 'Credit Limit (EGP)'}</label>
                <input type="number" value={creditLimit} onChange={(e) => setCreditLimit(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-700">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 rounded-lg text-xs font-bold text-white">حفظ الجهة</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
