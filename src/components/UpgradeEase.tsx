import React, { useState } from 'react';
import { Wrench, CheckCircle2, ShieldCheck, Users, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

interface UpgradeEaseProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const UpgradeEase: React.FC<UpgradeEaseProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      titleAr: 'التقييم الهندسي والمسح (Audit)',
      titleEn: 'Engineering Audit & Scan',
      descAr: 'فحص مقاسات السير، نوع وحدة الـ PLC الحالية (مثل Siemens أو Allen-Bradley)، ومساحة تركيب كاميرات الـ Edge AI دون أي تعديل ميكانيكي معقد.',
      descEn: 'Inspecting existing sizer frames, PLC architecture, and camera mounting clearances without mechanical teardown.'
    },
    {
      step: 2,
      titleAr: 'تركيب وحدات الحوسبة (Plug & Play NPU)',
      titleEn: 'Plug & Play NPU Installation',
      descAr: 'تثبيت وحدات المعالجة الذكية فوق خطوط الفرز وتوصيلها بكابلات إيثرنت صناعية قياسية (Industrial Ethernet)، مما يلغي الحاجة لتعقيدات البرمجة.',
      descEn: 'Mounting compact NPU inference units directly above lanes via standard industrial Ethernet harnesses.'
    },
    {
      step: 3,
      titleAr: 'التثبيت السحابي والتشغيل (Zero-Code Setup)',
      titleEn: 'Cloud Provisioning & Calibration',
      descAr: 'يقوم مهندس الصيانة باختيار المحصول واللغة (العربية) من شاشة تابلت بسيطة، ويقوم النظام تلقائياً بمعايرة الكاميرات وأوزان خلايا الحمل.',
      descEn: 'Packhouse supervisors configure crop recipes and Arabic voice commands via an intuitive tablet interface.'
    },
    {
      step: 4,
      titleAr: 'الدعم الفني عن بعد (Remote AI Assistant)',
      titleEn: 'Remote AI Diagnostic Support',
      descAr: 'نظام تشخيص ذاتي يتيح لمهندسينا في فرنسا وإسبانيا أو الدعم الفني المحلي فحص وتشخيص أي تحديث برمجي أو ضبط للذكاء الاصطناعي عن بعد عبر الإنترنت.',
      descEn: 'Built-in remote diagnostic tunnel allowing instant software updates and AI recipe tuning from our engineering hubs.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'سهولة وبساطة الترقية والتركيب' : 'Simplicity of Retrofit & Deployment'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'هل تتطلب عملية الترقية خبرة هندسية معقدة؟ (بساطة التركيب)' : 'Does Upgrading Require High Technical Expertise?'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'الإجابة المختصرة: لا! تم تصميم حزمة الترقية الذكية بنظام (Plug & Play) بحيث يمكن تركيبها وبرمجتها بسهولة خلال فترة التوقف الصباحية للصيانة، ودون الحاجة لخبرة برمجية معقدة.'
            : 'Short answer: No! The retrofit upgrade kit is engineered as a "Plug & Play" modular system that can be installed during routine maintenance hours without complex coding.'}
        </p>
      </div>

      {/* 4 Steps Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div
            key={s.step}
            onClick={() => setActiveStep(s.step)}
            className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
              activeStep === s.step
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg ring-2 ring-emerald-500/20'
                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded ${activeStep === s.step ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 text-slate-700'}`}>
                  Step 0{s.step}
                </span>
                <CheckCircle2 className={`w-4 h-4 ${activeStep === s.step ? 'text-emerald-400' : 'text-slate-400'}`} />
              </div>

              <h3 className="text-base font-bold">
                {isAr ? s.titleAr : s.titleEn}
              </h3>

              <p className={`text-xs leading-relaxed ${activeStep === s.step ? 'text-slate-300' : 'text-slate-600'}`}>
                {isAr ? s.descAr : s.descEn}
              </p>
            </div>

            <div className={`pt-4 mt-4 border-t text-[11px] font-mono ${activeStep === s.step ? 'border-slate-800 text-emerald-400' : 'border-slate-100 text-slate-500'}`}>
              {isAr ? 'بدون تعقيد برمجي' : 'Zero-Complexity Setup'}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Highlight Box */}
      <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-emerald-900">
            {isAr ? 'واجهة مستخدم عربية بالكامل مصممة خصيصاً للمشغلين' : 'Designed for Packhouse Operators & Supervisors'}
          </h4>
          <p className="text-xs text-emerald-800 leading-relaxed">
            {isAr
              ? 'تتطلب تشغيل النظام معرفة أساسية لا تتعدى استخدام الهواتف الذكية أو الأجهزة اللوحية (Tablets)، مع توفير تدريب كامل لفريق العمل من مهندسينا.'
              : 'Operating the system requires no more technical skill than using a modern smartphone or tablet. Full hands-on operator training is included.'}
          </p>
        </div>

        <button
          onClick={() => alert(isAr ? 'تم استلام استفسارك! سيتواصل معك مهندس الدعم الفني لشرح خطة التركيب.' : 'Inquiry received! Technical support engineer will contact you.')}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>{isAr ? 'استشر مهندس دعم فني' : 'Talk to an Engineer'}</span>
          <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};
