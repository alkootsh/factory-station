import React, { useState } from 'react';
import { Wrench, ShieldCheck, DollarSign, Calendar, Plus, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

interface AssetManagementModuleProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

interface Asset {
  id: string;
  nameAr: string;
  nameEn: string;
  category: string;
  purchaseDate: string;
  purchaseCostEgp: number;
  usefulLifeYears: number;
  annualDepreciationEgp: number;
  currentBookValueEgp: number;
  status: 'operational' | 'maintenance' | 'depreciated';
}

export const AssetManagementModule: React.FC<AssetManagementModuleProps> = ({ lang }) => {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: 'AST-01',
      nameAr: 'ماكينة الفرز البصري الطيفي (GlobalScan 7)',
      nameEn: 'GlobalScan 7 Optical Sorter',
      category: 'ماكينات خطوط الإنتاج',
      purchaseDate: '2024-01-15',
      purchaseCostEgp: 4500000,
      usefulLifeYears: 10,
      annualDepreciationEgp: 450000,
      currentBookValueEgp: 3600000,
      status: 'operational'
    },
    {
      id: 'AST-02',
      nameAr: 'ضواغط التبريد المركزي لغرف التجفيف (Bitzer)',
      nameEn: 'Bitzer Cold Store Compressors (Unit A)',
      category: 'معدات التبريد',
      purchaseDate: '2023-05-10',
      purchaseCostEgp: 1800000,
      usefulLifeYears: 8,
      annualDepreciationEgp: 225000,
      currentBookValueEgp: 1350000,
      status: 'operational'
    },
    {
      id: 'AST-03',
      nameAr: 'مولد طوارئ ديزل (500 KVA)',
      nameEn: 'Emergency Diesel Generator 500 KVA',
      category: 'محطة الطاقة البديلة',
      purchaseDate: '2022-11-20',
      purchaseCostEgp: 1200000,
      usefulLifeYears: 12,
      annualDepreciationEgp: 100000,
      currentBookValueEgp: 900000,
      status: 'operational'
    },
    {
      id: 'AST-04',
      nameAr: 'سير الفرز والتحجيم الأسطواني الرئيسي',
      nameEn: 'Main Roller Grading Conveyor',
      category: 'سيور النقل والتحجيم',
      purchaseDate: '2024-03-01',
      purchaseCostEgp: 850000,
      usefulLifeYears: 7,
      annualDepreciationEgp: 121428,
      currentBookValueEgp: 728572,
      status: 'operational'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [assetName, setAssetName] = useState('');
  const [cost, setCost] = useState('1000000');
  const [life, setLife] = useState('10');
  const [successMsg, setSuccessMsg] = useState('');

  const isAr = lang === 'ar';

  const totalAssetValue = assets.reduce((acc, a) => acc + a.currentBookValueEgp, 0);
  const totalAnnualDepreciation = assets.reduce((acc, a) => acc + a.annualDepreciationEgp, 0);

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName) return;

    const costNum = Number(cost);
    const lifeNum = Number(life);
    const annualDep = Math.round(costNum / lifeNum);

    const newAst: Asset = {
      id: `AST-0${assets.length + 1}`,
      nameAr: assetName,
      nameEn: assetName,
      category: 'أصول ثابتة عامة',
      purchaseDate: new Date().toISOString().split('T')[0],
      purchaseCostEgp: costNum,
      usefulLifeYears: lifeNum,
      annualDepreciationEgp: annualDep,
      currentBookValueEgp: costNum,
      status: 'operational'
    };

    setAssets([newAst, ...assets]);
    setAssetName('');
    setShowAddModal(false);
    setSuccessMsg(isAr ? 'تم تسجيل الأصل الثابت وحساب جدول الإهلاكات السنوية بنجاح!' : 'Fixed asset registered and depreciation schedule calculated!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Fixed Assets & Depreciation Accounting Engine
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            {isAr ? 'إدارة الأصول الثابتة وحساب الإهلاكات (Asset Management)' : 'Fixed Assets & Depreciation Management'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            {isAr ? 'متابعة أصول محطة التعبئة (ماكينات، ضواغط، مولدات)، حساب الإهلاك السنوي بطريقة القسط الثابت، والقيمة الدفترية المتبقية.' : 'Track packhouse fixed assets, compute straight-line annual depreciation, and monitor net book values.'}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? 'تسجيل أصل ثابت جديد' : 'Register New Asset'}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{isAr ? 'إجمالي قيمة الأصول الدفترية' : 'Total Net Book Value'}</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {totalAssetValue.toLocaleString()} <span className="text-xs text-slate-500 font-normal">EGP</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{isAr ? 'إجمالي الإهلاك السنوي (قسط ثابت)' : 'Annual Depreciation (Straight-Line)'}</span>
          <div className="text-2xl font-black text-rose-600 mt-1">
            {totalAnnualDepreciation.toLocaleString()} <span className="text-xs text-slate-500 font-normal">EGP/Year</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{isAr ? 'عدد الأصول المسجلة' : 'Registered Assets Count'}</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {assets.length} {isAr ? 'أصل رئيسي' : 'Assets'}
          </div>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-4">{isAr ? 'جدول سجل الأصول الثابتة وحساب الإهلاك' : 'Fixed Assets & Depreciation Schedule'}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold">
                <th className="p-3 text-start">كود الأصل</th>
                <th className="p-3 text-start">اسم الأصل والتصنيف</th>
                <th className="p-3 text-start">تاريخ الشراء</th>
                <th className="p-3 text-start">تكلفة الشراء</th>
                <th className="p-3 text-start">العمر الإنتاجى</th>
                <th className="p-3 text-start">الإهلاك السنوي</th>
                <th className="p-3 text-start">القيمة الدفترية</th>
                <th className="p-3 text-start">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {assets.map((ast) => (
                <tr key={ast.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-indigo-600">{ast.id}</td>
                  <td className="p-3">
                    <strong className="text-slate-900 block">{isAr ? ast.nameAr : ast.nameEn}</strong>
                    <span className="text-[10px] text-slate-400">{ast.category}</span>
                  </td>
                  <td className="p-3 text-slate-500">{ast.purchaseDate}</td>
                  <td className="p-3 font-bold text-slate-900">{ast.purchaseCostEgp.toLocaleString()} EGP</td>
                  <td className="p-3 text-slate-700">{ast.usefulLifeYears} {isAr ? 'سنوات' : 'Years'}</td>
                  <td className="p-3 font-bold text-rose-600">-{ast.annualDepreciationEgp.toLocaleString()} EGP</td>
                  <td className="p-3 font-black text-emerald-600">{ast.currentBookValueEgp.toLocaleString()} EGP</td>
                  <td className="p-3 text-emerald-600 font-bold">عامل (Operational)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{isAr ? 'تسجيل أصل ثابت جديد' : 'Register New Fixed Asset'}</h3>
            <form onSubmit={handleAddAsset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'اسم الأصل والتصنيف' : 'Asset Name & Category'}</label>
                <input type="text" required value={assetName} onChange={(e) => setAssetName(e.target.value)} placeholder="مثال: جهاز فرز بصري إضافي" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'تكلفة الشراء (EGP)' : 'Purchase Cost (EGP)'}</label>
                <input type="number" required value={cost} onChange={(e) => setCost(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'العمر الإنتاجي المقدر (بالسنوات)' : 'Useful Life (Years)'}</label>
                <input type="number" required value={life} onChange={(e) => setLife(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-700">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 rounded-lg text-xs font-bold text-white">حفظ الأصل وحساب الإهلاك</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
