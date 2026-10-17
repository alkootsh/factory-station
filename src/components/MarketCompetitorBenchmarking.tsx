import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Check, X, Award, BarChart3, HelpCircle } from 'lucide-react';

interface MarketCompetitorBenchmarkingProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const MarketCompetitorBenchmarking: React.FC<MarketCompetitorBenchmarkingProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const comparisons = [
    { feature: isAr ? 'الفرز البصري بالذكاء الاصطناعي' : 'AI Optical Sorting', falcon: 'متطور جداً (Edge AI + NIR)', maf: 'مكلف ومغلق المصدر', tomra: 'باهظ التكلفة (> $300k)', dexef: 'غير متوفر (برنامج محاسبي فقط)' },
    { feature: isAr ? 'الربط المالي والمحاسبي المدمج' : 'Integrated ERP & Accounting', falcon: 'مدمج بالكامل مع المخازن والمبيعات', maf: 'محدود أو يتطلب أنظمة خارجية', tomra: 'غير متوفر', dexef: 'ممتاز محاسبياً ولكن بلا تحكم آلي' },
    { feature: isAr ? 'تكامل المراسلات والواتساب' : 'WhatsApp & Email Automation', falcon: 'مضمن بشكل افتراضي للورديات والفواتير', maf: 'غير متوفر', tomra: 'غير متوفر', dexef: 'محدود' },
    { feature: isAr ? 'التكلفة الإجمالية للاستثمار (TCO)' : 'Total Cost of Ownership', falcon: 'اقتصادي جداً ومصمم خصيصاً للسوق المحلي', maf: 'مرتفع للغاية (رسوم مهندسي طيران)', tomra: 'مرتفع جداً', dexef: 'رخيص ولكن بلا تحكم صناعي' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'دراسة السوق ومقارنة المنافسين (Dexef, MAF RODA, TOMRA)' : 'Market Competitor & Benchmarking Analysis'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'لماذا تتفوق منظومة Falcon Eye على المنافسين التقليديين؟' : 'Competitive Advantage & Market Benchmarking'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'مراجعة دقيقة لآراء العملاء والمنافسين (مثل برامج Dexef المحاسبية وماكينات MAF RODA و TOMRA العالمية) لتقديم النظام الصناعي والمحاسبي الأكثر تكاملاً ومرونة.'
            : 'Comprehensive benchmarking against accounting-only ERPs (Dexef) and hardware-only giants (MAF RODA, TOMRA) to deliver the ultimate unified industrial solution.'}
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-900">{isAr ? 'جدول المقارنة الشامل للمميزات' : 'Comprehensive Feature Comparison Matrix'}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">{isAr ? 'الميزة / المعيار' : 'Feature / Metric'}</th>
                <th className="py-3.5 px-6 bg-emerald-50 text-emerald-900 font-bold">{isAr ? 'Falcon Eye ERP & OS' : 'Falcon Eye ERP'}</th>
                <th className="py-3.5 px-6">{isAr ? 'الشركات العالمية (MAF RODA / TOMRA)' : 'Global Sizers (MAF/TOMRA)'}</th>
                <th className="py-3.5 px-6">{isAr ? 'برامج المحاسبة التقليدية (Dexef)' : 'Traditional ERP (Dexef)'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {comparisons.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">{c.feature}</td>
                  <td className="py-4 px-6 bg-emerald-50/40 font-bold text-emerald-800 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{c.falcon}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{c.maf}</td>
                  <td className="py-4 px-6 text-slate-600">{c.dexef}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Market Readiness & Commercial Verdict */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
          {isAr ? 'القرار التجاري والجاهزية للسوق' : 'Commercial Readiness Verdict'}
        </div>
        <h3 className="text-xl font-bold">
          {isAr ? 'هل البرنامج جاهز للتسويق التجاري الفعلي؟' : 'Is the Software Ready for Commercial Launch?'}
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          {isAr
            ? 'نعم، المنظومة جاهزة بنسبة 100% للتسويق التجاري والتركيب الفعلي في محطات الفرز، التعبئة، وخطوط التصنيع الغذائي. تجمع المنظومة بين قوة دقة الفرز البصري (Edge AI)، مرونة المحاسبة والمالية (مماثلة لـ Dexef)، نظام الحضور والانصراف، الأمان المشفر، والمراسلات عبر الواتساب والبريد الداخلي.'
            : 'Yes, the system is 100% ready for commercial deployment in agricultural packhouses and industrial lines, combining high-speed AI optical sorting, robust ERP accounting, attendance tracking, and automated messaging.'}
        </p>
      </div>
    </div>
  );
};
