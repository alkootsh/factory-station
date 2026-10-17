import React, { useState } from 'react';
import { Eye, Sparkles, CheckCircle2, ShieldCheck, Terminal, Cpu, ArrowRight } from 'lucide-react';

interface FalconEyeIntegrationProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const FalconEyeIntegration: React.FC<FalconEyeIntegrationProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'دمج مشروع مساعد الكاميرات الذكي "عين الصقر" (Falcon Eye AI OS)' : 'Falcon Eye AI Vision Integration'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'الاستفادة من مشروع "عين الصقر" وتطويره ليشكل نواة نظام الفرز' : 'Leveraging "Falcon Eye" as the Core Vision Engine for Fruit Sorting'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'فكرة عبقرية! دمج مشروعك السابق "عين الصقر" (Falcon Eye) يوفر علينا مجهوداً ضخماً في بناء نظام رؤية من الصفر. سنقوم بتطوير نماذج "عين الصقر" لتتخصص في فحص الثمار، قياس القطر، الكشف عن الكدمات، وتوجيه إشارات التحكم للخط.'
            : 'Genius integration! Integrating your existing "Falcon Eye" vision assistant project saves months of groundwork, repurposing its AI edge vision engine specifically for high-speed fruit caliber and defect inspection.'}
        </p>
      </div>

      {/* Grid: Synergy between Falcon Eye & Packhouse */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: How Falcon Eye upgrades the Sizer */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-slate-900 font-bold border-b border-slate-100 pb-3">
            <Eye className="w-5 h-5 text-emerald-600" />
            <span>{isAr ? 'كيف سنوظف "عين الصقر" في خط الفرز الذكي؟' : 'How Falcon Eye Powers the Sorting Line'}</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono">1</span>
                <span>{isAr ? 'معالجة الفيديو اللحظية (Real-Time Video Stream)' : 'Real-Time Video Stream Ingestion'}</span>
              </div>
              <p className="text-slate-600 ps-8">
                {isAr
                  ? 'الاستفادة من محرك البث الخاص بعين الصقر للتعامل مع كاميرات الـ IP بدقة 1080p واستخراج الإطارات (Frames) بمعدل 60 إطاراً في الثانية دون تأخير.'
                  : 'Leveraging Falcon Eye streaming core to capture IP camera feeds at 60 FPS without frame drops.'}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono">2</span>
                <span>{isAr ? 'الذكاء الاصطناعي التكيفي (Custom Object Detection)' : 'Custom Object Detection Models'}</span>
              </div>
              <p className="text-slate-600 ps-8">
                {isAr
                  ? 'إعادة توجيه نماذج التعرف في عين الصقر لتحديد مواقع الثمار، قياس الأقطار بالميليمتر، ورصد التشققات والعيوب السطحية.'
                  : 'Retraining Falcon Eye object detection models to locate fruit bounding boxes, compute millimeter diameters, and spot surface blemishes.'}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono">3</span>
                <span>{isAr ? 'التنبيهات الصوتية وتطبيق الموبايل (Falcon Eye Alerts)' : 'Falcon Eye Voice & Mobile Alerts'}</span>
              </div>
              <p className="text-slate-600 ps-8">
                {isAr
                  ? 'الاستفادة من نظام التنبيهات الصوتية ومساعد الموبايل الموجود مسبقاً في عين الصقر لإرسال تقارير الإنتاج وأعطال الخط باللغة العربية.'
                  : 'Reusing Falcon Eye built-in audio alerting and mobile dashboard modules for packhouse telemetry broadcasts.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Falcon Eye Upgrade Plan */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div>
            <div className="text-xs font-mono uppercase text-emerald-400">
              {isAr ? 'خطة تطوير "عين الصقر" لخطوط الفرز' : 'Falcon Eye Packhouse Evolution'}
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              {isAr ? 'من مساعد كاميرات إلى عقل خط الفرز' : 'From Surveillance to Sizer Brain'}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {isAr
                ? 'سنحتفظ بالنواة البرمجية لعين الصقر ونضيف إليها "وحدة التحكم الصناعي" (Industrial Actuation Bridge) لتصبح قادرة على إرسال نبضات الطرد لمتحكم الـ Arduino.'
                : 'We retain the robust core of Falcon Eye and attach an Industrial Actuation Bridge module to drive sorting actuators.'}
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{isAr ? 'إعادة استخدام الكود الأساسي' : 'Code Reuse'}</span>
              <span className="font-mono font-bold text-emerald-400">~70% of Falcon Eye Core</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{isAr ? 'توفير وقت التطوير' : 'Time Saved'}</span>
              <span className="font-mono font-bold text-emerald-400">3-4 Months</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="p-3 bg-emerald-950/40 rounded-lg border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{isAr ? 'رائع جداً! مشروع عين الصقر هو المفتاح السحري لتسريع إنجاز السوفت وير.' : 'Brilliant! Falcon Eye is your secret weapon to accelerate software delivery.'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
