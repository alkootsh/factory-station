import React, { useState } from 'react';
import { Cpu, Code, ShieldCheck, CheckCircle2, Sparkles, Terminal, Layers, ArrowRight } from 'lucide-react';

interface CustomSoftwareArchitectureProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const CustomSoftwareArchitecture: React.FC<CustomSoftwareArchitectureProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [activeStack, setActiveStack] = useState<'vision' | 'plc' | 'scada' | 'mobile'>('vision');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'تصميم وبناء السوفت وير بالكامل برمجياً (Custom In-House Architecture)' : 'Full Custom In-House Software Architecture'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'نعم! سنقوم بتصميم وبرمجة المنظومة والبرمجيات بالكامل بأنفسنا' : 'Yes! We Design and Build 100% Custom Software In-House'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'ملاحظة ممتازة! بما أننا نقوم ببناء وتطوير النظام هندسياً، فلن نضطر لشراء أي تراخيص برمجية جاهزة باهظة الثمن من الشركات الكبرى. سنقوم ببناء السوفت وير كاملاً (رؤية حاسوبية، سكادا، وتطبيق الموبايل) مع ملكية كاملة للكود (Full Source Code Ownership).'
            : 'Spot on! Since we are engineering the system ourselves, we build 100% of the software stack in-house—giving you complete source code ownership with zero licensing fees.'}
        </p>
      </div>

      {/* Software Stack Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveStack('vision')}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
            activeStack === 'vision' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
          }`}
        >
          {isAr ? '1. سوفتوير الرؤية والذكاء الاصطناعي (Python & OpenCV)' : '1. AI Vision (Python / OpenCV / PyTorch)'}
        </button>
        <button
          onClick={() => setActiveStack('plc')}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
            activeStack === 'plc' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
          }`}
        >
          {isAr ? '2. برمجيات الاتصال بالـ PLC (Modbus / OPC UA)' : '2. PLC Communication (Modbus / OPC UA)'}
        </button>
        <button
          onClick={() => setActiveStack('scada')}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
            activeStack === 'scada' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
          }`}
        >
          {isAr ? '3. لوحة تحكم السكادا المركزية (React & Node.js)' : '3. SCADA Dashboard (React & Node.js)'}
        </button>
        <button
          onClick={() => setActiveStack('mobile')}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
            activeStack === 'mobile' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
          }`}
        >
          {isAr ? '4. تطبيق الموبايل والأوامر الصوتية (PWA & WebSpeech)' : '4. Mobile PWA & Voice AI'}
        </button>
      </div>

      {/* Stack Details Box */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        {activeStack === 'vision' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Code className="w-5 h-5" />
              <span>{isAr ? 'نموذج الرؤية الحاسوبية والذكاء الاصطناعي (Python + PyTorch)' : 'Custom AI Vision Core'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isAr
                ? 'سنقوم ببرمجة خوارزميات اكتشاف العيوب والقياس باستخدام Python ومكتبات PyTorch/OpenCV، وتدريب نماذج خفيفة (MobileNet/YOLO) تعمل بسرعة فائقة على معالجات NPU الطرفية لرصد التربس والصدأ والبريكس.'
                : 'We code custom defect detection and caliper measurement models using Python, OpenCV, and PyTorch, deploying lightweight YOLO/MobileNet models onto edge NPUs.'}
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300 space-y-1">
              <div>import cv2</div>
              <div>import torch</div>
              <div>model = torch.hub.load('ultralytics/yolov5', 'custom', path='maf_defect_model.pt')</div>
              <div>results = model(fruit_frame) # Inference in 3.2ms</div>
            </div>
          </div>
        )}

        {activeStack === 'plc' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
              <Terminal className="w-5 h-5" />
              <span>{isAr ? 'محرك الاتصال الصناعي ومزامن الطرد (Modbus TCP / OPC UA)' : 'Industrial Communication Engine'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isAr
                ? 'برمجة خادم وسيط (Node.js/C++) يتصل مباشرة بوحدات الـ PLC ومزامن الإنكودر عبر بروتوكولات Modbus TCP و OPC UA، لحساب مسافة الحبة بدقة وإرسال أمر الطرد لصمام الهواء.'
                : 'Custom Node.js/C++ daemon communicating directly with PLCs and master encoders via Modbus TCP and OPC UA for precise pneumatic ejection timing.'}
            </p>
          </div>
        )}

        {activeStack === 'scada' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Layers className="w-5 h-5" />
              <span>{isAr ? 'لوحة تحكم السكادا المركزية (React.js + Tailwind + WebSockets)' : 'Central SCADA Dashboard'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isAr
                ? 'تطوير لوحة تحكم تفاعلية بالكامل تعمل عبر المتصفح (React + Vite)، تتلقى البيانات لحظياً عبر WebSockets وتعرض رسوم بيانية حية لحركة الخط ومخارج التعبئة.'
                : 'Developing a fully interactive browser-based SCADA dashboard using React and WebSockets for real-time packhouse telemetry and bin distribution.'}
            </p>
          </div>
        )}

        {activeStack === 'mobile' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Sparkles className="w-5 h-5" />
              <span>{isAr ? 'تطبيق الموبايل والأوامر الصوتية باللغة العربية (PWA + WebSpeech API)' : 'Mobile PWA & Arabic Voice AI'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isAr
                ? 'بناء تطبيق موبايل (Progressive Web App) يعمل على أي هاتف بدون متجر تطبيقات، ويدعم الأوامر الصوتية باللغة العربية الفصحى (تحويل الصوت لنص وتنفيذ الأوامر).'
                : 'Building a responsive mobile PWA supporting Arabic voice commands via WebSpeech API and instant push telemetry notifications.'}
            </p>
          </div>
        )}

        {/* Benefits Strip */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <div className="text-slate-400">{isAr ? 'ملكية الكود البرمجي' : 'Source Code Ownership'}</div>
            <div className="font-bold text-emerald-400 mt-0.5">100% ملكيتك الخاصة</div>
          </div>
          <div>
            <div className="text-slate-400">{isAr ? 'رسوم التراخيص الشهرية' : 'Monthly Licensing Fees'}</div>
            <div className="font-bold text-emerald-400 mt-0.5">صفر (بدون اشتراكات)</div>
          </div>
          <div>
            <div className="text-slate-400">{isAr ? 'إمكانية التعديل والتطوير' : 'Customizability'}</div>
            <div className="font-bold text-emerald-400 mt-0.5">مرونة كاملة بلا قيود</div>
          </div>
        </div>
      </div>
    </div>
  );
};
