import React, { useState } from 'react';
import { FileText, Cpu, DollarSign, Layers, CheckCircle2, ArrowRight, RefreshCw, Box, ShieldCheck, Wrench } from 'lucide-react';
import { FRUIT_PROFILES } from '../data/mafData';

interface FeasibilityStudyProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const FeasibilityStudy: React.FC<FeasibilityStudyProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [selectedCrop, setSelectedCrop] = useState<string>('citrus_orange');
  const [lanesCount, setLanesCount] = useState<number>(6);
  const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD');

  // Hardware components catalog
  const hardwareItems = [
    {
      id: 'npu',
      nameAr: 'وحدة معالجة الذكاء الاصطناعي الطرفية (Edge NPU Cluster)',
      nameEn: 'Embedded Edge NPU Node (Per Lane)',
      functionAr: 'تحليل صور الكاميرات في 3 ميلي ثانية واكتشاف العيوب دون انتظار خوادم سحابية.',
      supplier: 'Advantech / Axiomtek (Taiwan / Germany)',
      keepOrReplace: 'new',
      costUsd: 1800
    },
    {
      id: 'camera',
      nameAr: 'كاميرات رقمية متعددة الأطياف (RGB + NIR 4K)',
      nameEn: 'Multispectral RGB-NIR 4K Cameras',
      functionAr: 'التقاط 60 إطاراً لكل حبة لاكتشاف الشقوق، الصدأ، وعفن البنسيليوم.',
      supplier: 'Basler AG / FLIR Machine Vision (Germany / USA)',
      keepOrReplace: 'upgrade_or_new',
      costUsd: 2500
    },
    {
      id: 'strobe',
      nameAr: 'لوحات إضاءة ومضية عالية التردد (LED Strobes)',
      nameEn: 'High-Frequency LED Strobe Arrays',
      functionAr: 'إضاءة متزامنة مع حركة السير لتجميد الحركة وإظهار عيوب القشرة.',
      supplier: 'ProPhotonix / CCS America',
      keepOrReplace: 'new',
      costUsd: 1200
    },
    {
      id: 'plc_gateway',
      nameAr: 'بوابة الاتصال الصناعي ومزامن الإنكودر (PLC Gateway)',
      nameEn: 'Industrial Ethernet PLC Gateway & Encoder Hub',
      functionAr: 'ربط إشارات الطرد بصمامات الهواء والتزامن الدقيق مع حركة جنزير الكؤوس.',
      supplier: 'Siemens S7-1200 / Beckhoff Automation (Germany)',
      keepOrReplace: 'keep_existing',
      costUsd: 650
    },
    {
      id: 'grippers',
      nameAr: 'أعناق روبوتية بضغط هواء تكيفي (Soft Pneumatic Grippers)',
      nameEn: 'Soft Pneumatic Bellows Grippers (for Line Pack)',
      functionAr: 'التقاط الثمار ورصها في الصواني دون أي كدمات أو ضغط زائد.',
      supplier: 'OnRobot / Schmalz (Germany / Denmark)',
      keepOrReplace: 'new',
      costUsd: 3200
    }
  ];

  // Financial calculation
  const totalHardwareCost = hardwareItems.reduce((acc, item) => acc + (item.costUsd * (lanesCount / 2)), 4500); // base + per-lane scaling
  const softwareLicenseCost = 6500; // MAF Supervision & AI OS
  const installationCost = 3500;
  const grandTotal = totalHardwareCost + softwareLicenseCost + installationCost;

  // Estimated annual savings (labor + reduced false rejection)
  const estimatedAnnualSavings = lanesCount * 14500;
  const roiMonths = ((grandTotal / estimatedAnnualSavings) * 12).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'دراسة الجدوى الشاملة والتفصيلية للمشروع' : 'Comprehensive Feasibility & Financial Study'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'دراسة جدوى تطوير وترقية خط الفرز (هاردوير، سوفتوير، الميزانية والموردين)' : 'Packhouse Retrofit Feasibility: Hardware, Software, ROI & Suppliers'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'دراسة متكاملة توضح القطع المطلوبة ووظائفها، أماكن التوريد العالمية، ما يمكن الاحتفاظ به من النظام القديم، وما يمكن تطويره مؤقتاً لتخفيض التكلفة.'
            : 'Complete breakdown of hardware items, functions, global suppliers, what to keep from legacy systems, what to upgrade temporarily, and financial ROI.'}
        </p>
      </div>

      {/* Interactive Parameters Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700">
            {isAr ? 'المحصول المستهدف' : 'Target Produce'}
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900"
          >
            {FRUIT_PROFILES.map((f) => (
              <option key={f.id} value={f.id}>
                {isAr ? f.nameAr : f.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between font-semibold text-slate-700">
            <span>{isAr ? 'عدد حارات الخط (Lanes)' : 'Sizer Lanes Count'}</span>
            <span className="font-mono text-emerald-600 font-bold">{lanesCount} Lanes</span>
          </div>
          <input
            type="range"
            min="2"
            max="12"
            step="2"
            value={lanesCount}
            onChange={(e) => setLanesCount(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700">
            {isAr ? 'العملة المعروضة' : 'Currency'}
          </label>
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setCurrency('USD')}
              className={`flex-1 py-1 rounded font-medium ${currency === 'USD' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'}`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('EUR')}
              className={`flex-1 py-1 rounded font-medium ${currency === 'EUR' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'}`}
            >
              EUR (€)
            </button>
          </div>
        </div>
      </div>

      {/* Part 1: What to Keep vs What to Upgrade (Smart Retrofit Strategy) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Keep Existing Legacy Parts */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>{isAr ? '1. ما سيتم الاحتفاظ به من النظام القديم (لخفض التكلفة)' : '1. Legacy Parts to Keep (Cost Saving)'}</span>
          </div>
          <ul className="space-y-3 text-xs text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">{isAr ? 'هيكل السير ومحركات الجنزير (Conveyor Frame & Drive):' : 'Conveyor Frame & Biconical Rollers:'}</strong>{' '}
                {isAr ? 'الهيكل الميكانيكي وأسطوانات بومون السفلية سليمة تماماً ولا تحتاج لأي تغير.' : 'Mechanical stainless steel frame and roller chains remain untouched.'}
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">{isAr ? 'خلايا الوزن الديناميكية (Load Cell Units):' : 'Dynamic Weighing Load Cells:'}</strong>{' '}
                {isAr ? 'يمكن الاحتفاظ بوحدات الوزن الحالية وربطها برمجياً عبر بوابة الإيثرنت الجديدة.' : 'Existing load cells are retained and bridged via the new Ethernet gateway.'}
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">{isAr ? 'صمامات الطرد الهوائية الرئيسية (Solenoid Banks):' : 'Pneumatic Ejector Valves:'}</strong>{' '}
                {isAr ? 'الاحتفاظ بشبكة الصمامات وخراطيم الهواء، وتحديث كارت التحكم فقط.' : 'Retain pneumatic valve manifolds, upgrading only the trigger controller.'}
              </div>
            </li>
          </ul>
        </div>

        {/* Temporary Upgrades vs Full Replacement */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <RefreshCw className="w-5 h-5" />
            <span>{isAr ? '2. التطوير المؤقت مقابل التغيير الكلي (Smart Retrofit)' : '2. Temporary Upgrade vs Full Replacement'}</span>
          </div>
          <ul className="space-y-3 text-xs text-slate-700">
            <li className="flex items-start gap-2.5">
              <Wrench className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">{isAr ? 'تطوير العدسات مؤقتاً (Camera Lenses):' : 'Temporary Lens Refurbishment:'}</strong>{' '}
                {isAr ? 'بدلاً من تغيير الكاميرات بالكامل، يمكن تنظيف وترقية العدسات الحالية وإضافة إضاءة Strobe LED حديثة كحل اقتصادي مؤقت.' : 'Instead of replacing 100% of cameras, upgrade optical filters and LED strobes first.'}
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Wrench className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">{isAr ? 'تحديث برمجيات السكادا (MAF Supervision OS):' : 'SCADA Software Overlay:'}</strong>{' '}
                {isAr ? 'تثبيت حزمة السكادا الذكية الجديدة فوق الـ PLC القديم مباشرة دون تغيير وحدات التحكم المنطقي.' : 'Install the new AI OS on top of existing PLC drops via API bridge.'}
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Part 2: Hardware Catalog & Suppliers */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900">
            {isAr ? 'جدول قطع الهاردوير، الوظيفة، ومصادر التوريد العالمية' : 'Hardware Catalog, Functions & Global Suppliers'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr ? 'أبرز القطع المطلوبة لتحديث خط الفرز مع الموردين المعتمدين عالمياً.' : 'Key retrofit components with approved international suppliers.'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <th className="p-3 text-start">{isAr ? 'القطعة / المكون' : 'Component'}</th>
                <th className="p-3 text-start">{isAr ? 'وظيفة القطعة في النظام' : 'Function'}</th>
                <th className="p-3 text-start">{isAr ? 'أماكن التوريد والمصادر' : 'Suppliers / Origin'}</th>
                <th className="p-3 text-start">{isAr ? 'حالة التحديث' : 'Retrofit Status'}</th>
                <th className="p-3 text-end">{isAr ? 'التكلفة التقريبية' : 'Estimated Cost'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hardwareItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">
                    {isAr ? item.nameAr : item.nameEn}
                  </td>
                  <td className="p-3 text-slate-600">{item.functionAr}</td>
                  <td className="p-3 text-slate-600 font-mono text-[11px]">{item.supplier}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${item.keepOrReplace === 'new' ? 'bg-emerald-100 text-emerald-800' : item.keepOrReplace === 'upgrade_or_new' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                      {item.keepOrReplace === 'new' ? (isAr ? 'قطعة جديدة' : 'New') : item.keepOrReplace === 'upgrade_or_new' ? (isAr ? 'تطوير أو استبدال' : 'Upgrade/New') : (isAr ? 'احتفاظ بالنظام القديم' : 'Keep Existing')}
                    </span>
                  </td>
                  <td className="p-3 text-end font-mono font-bold text-slate-900">
                    ${(item.costUsd * (lanesCount / 2)).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Part 3: Financial Summary & ROI */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div>
          <div className="text-xs font-mono uppercase text-emerald-400">
            {isAr ? 'العرض المالي ودراسة الاسترداد (Financial Summary & ROI)' : 'Financial Summary & ROI Breakdown'}
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-white mt-1">
            ${grandTotal.toLocaleString()} <span className="text-sm font-normal text-slate-400">{isAr ? 'الإجمالي التقديري للترقية' : 'Estimated Total Retrofit'}</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {isAr
              ? `شامل تكلفة الهاردوير لخط ${lanesCount} حارات، ترخيص نظام التشغيل والسوفتوير (${softwareLicenseCost}$)، والتركيب والتشغيل (${installationCost}$).`
              : `Includes hardware for ${lanesCount} lanes, AI OS software license ($${softwareLicenseCost}), and on-site installation ($${installationCost}).`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div>
            <div className="text-slate-400">{isAr ? 'توفير العمالة والفاقد سنوياً' : 'Est. Annual Savings'}</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
              ${estimatedAnnualSavings.toLocaleString()} / year
            </div>
          </div>

          <div>
            <div className="text-slate-400">{isAr ? 'فترة استرداد رأس المال (ROI)' : 'Payback Period (ROI)'}</div>
            <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">
              {roiMonths} {isAr ? 'أشهر' : 'Months'}
            </div>
          </div>

          <div>
            <div className="text-slate-400">{isAr ? 'زيادة الطاقة الإنتاجية' : 'Throughput Gain'}</div>
            <div className="text-xl font-bold font-mono text-teal-400 mt-0.5">
              +22% Net Speed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
