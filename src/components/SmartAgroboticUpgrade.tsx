import React, { useState } from 'react';
import { Cpu, Eye, Zap, ShieldCheck, CheckCircle2, Sliders, ArrowRight, Sparkles, Layers, RefreshCw } from 'lucide-react';
import { FRUIT_PROFILES } from '../data/mafData';

interface SmartAgroboticUpgradeProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const SmartAgroboticUpgrade: React.FC<SmartAgroboticUpgradeProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [activeModule, setActiveModule] = useState<'ai_fusion' | 'edge_ai' | 'robot_grip' | 'predictive'>('ai_fusion');
  const [selectedCrop, setSelectedCrop] = useState<string>('citrus_orange');
  const [aiConfidence, setAiConfidence] = useState<number>(99.4);
  const [edgeModelVersion, setEdgeModelVersion] = useState<string>('v4.8-Transformer-Edge');

  const currentProfile = FRUIT_PROFILES.find((f) => f.id === selectedCrop) || FRUIT_PROFILES[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'منظومة الجيل القادم الذكية (Next-Gen Agrobotic OS)' : 'Next-Gen Agrobotic Architecture'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'بناء وتصميم نظام أذكى وأسرع لخطوط الفرز (Next-Gen Upgrade)' : 'Designing an Advanced Upgrade for Existing Packhouse Lines'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'نعم، يمكننا تصميم وبناء حزمة ترقية ذكية متكاملة (Retrofit Upgrade Kit) تعمل بسلاسة على خطوط الفرز الحالية أو أي خطوط سير، معتمدة على رؤية الحوسبة الطرفية بالذكاء الاصطناعي (Edge AI) ومستشعرات طيفية فائقة.'
            : 'Yes, we can design and build a powerful Retrofit Upgrade Kit that mounts directly onto existing multi-lane sizer lines, supercharging them with Edge AI Vision and Transformer models.'}
        </p>
      </div>

      {/* Upgrade Modules Navigation */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveModule('ai_fusion')}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
            activeModule === 'ai_fusion'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isAr ? '1. دمج الذكاء الاصطناعي (AI Fusion)' : '1. AI Vision Fusion'}
        </button>
        <button
          onClick={() => setActiveModule('edge_ai')}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
            activeModule === 'edge_ai'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isAr ? '2. معالجة الحوسبة الطرفية (Edge AI)' : '2. Ultra-Low Latency Edge'}
        </button>
        <button
          onClick={() => setActiveModule('robot_grip')}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
            activeModule === 'robot_grip'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isAr ? '3. القبضة الذكية للتغليف (Adaptive Gripper)' : '3. Adaptive Robotic Grip'}
        </button>
        <button
          onClick={() => setActiveModule('predictive')}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
            activeModule === 'predictive'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isAr ? '4. الصيانة التنبؤية (Predictive PLC)' : '4. Predictive Maintenance'}
        </button>
      </div>

      {/* Main Content Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Architecture Detail */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          {activeModule === 'ai_fusion' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <Sparkles className="w-5 h-5" />
                <span>{isAr ? 'دمج الطيف المرئي مع الأشعة تحت الحمراء بالتعلم العميق' : 'Multimodal Vision & NIR Transformer Fusion'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? 'بينما تعتمد الأنظمة التقليدية على خوارزميات تقليدية (Threshold filters)، نستخدم نماذج رؤية Transformer حديثة مدربة على ملايين الثمار لرصد أدق العيوب الميكرونية والتشوهات الداخلية في لقطة واحدة.'
                  : 'While legacy sizers use rigid threshold filters, our upgrade kit utilizes lightweight Vision Transformers (ViT) that fuse RGB, NIR, and UV channels simultaneously for zero false-positive defect rejection.'}
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-500">{isAr ? 'دقة كشف العيوب التجميلية' : 'Defect Accuracy'}</div>
                  <div className="font-bold text-slate-900 font-mono mt-0.5">99.8%</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-500">{isAr ? 'معدل الخطأ في تصنيف البريكس' : 'Brix Error Margin'}</div>
                  <div className="font-bold text-emerald-600 font-mono mt-0.5">±0.3 °Bx</div>
                </div>
              </div>
            </div>
          )}

          {activeModule === 'edge_ai' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-teal-600 font-bold text-sm">
                <Zap className="w-5 h-5" />
                <span>{isAr ? 'وحدات معالجة عصبية طرفية فائقة السرعة (Edge NPU)' : 'Dedicated Hardware Edge NPU Cluster'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? 'بدلاً من الاعتماد على خوادم سحابية بطيئة أو حواسيب مركزية ثقيلة، يتم تثبيت وحدات تسريع عصبية (NPU) مباشرة فوق كل حارة فحص (Embedded on each lane)، مما يقلل زمن المعالجة إلى أقل من 4 ميلي ثانية لكل ثمرة.'
                  : 'Instead of centralized PC lag, dedicated Tensor processing modules are embedded directly above each sizer lane, bringing inference latency down to under 4ms per fruit.'}
              </p>
              <div className="p-3 bg-slate-900 text-white rounded-lg font-mono text-xs space-y-1">
                <div className="text-emerald-400"># NPU Cluster Node L1-L12 Active</div>
                <div>Inference Latency: 3.2 ms</div>
                <div>Throughput per Lane: 25,000 fruits/hr</div>
              </div>
            </div>
          )}

          {activeModule === 'robot_grip' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                <Cpu className="w-5 h-5" />
                <span>{isAr ? 'أعناق روبوتية بضغط هواء تكيفي (Adaptive Soft Grippers)' : 'Soft Pneumatic Bio-Mimetic Grippers'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? 'تصميم جديد لقبضة الروبوت تحاكي مرونة الأصابع البشرية، مزودة بحساسات لمس وقوة (Force Feedback Sensors) لتعديل قوة الالتقاط فورياً حسب صلابة الثمرة (أفوكادو ناضج جداً مقابل تفاح متماسك).'
                  : 'Advanced silicone bellows embedded with micro-force feedback sensors that dynamically adjust vacuum suction pressure based on fruit firmness and ripeness.'}
              </p>
            </div>
          )}

          {activeModule === 'predictive' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>{isAr ? 'مراقبة الأعطال والتنبؤ بالاهتزازات (Predictive Health)' : 'Real-Time Vibration & Motor Telemetry'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? 'حساسات اهتزاز لاسلكية (IoT Vibration Sensors) توضع على محركات السير ومحامل الكؤوس (Bearings) للتنبؤ بأعطال المحامل أو تمدد الجنزير قبل وقوعها بأسبوعين، مما يمنع التوقف المفاجئ أثناء ذروة التصدير.'
                  : 'Wireless IoT vibration sensors mounted on sizer drive bearings predicting mechanical wear and chain slack weeks before failure occurs.'}
              </p>
            </div>
          )}

          {/* Crop Selector for Retrofit Suitability */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isAr ? 'اختيار خط الإنتاج والمحصول المراد ترقيته:' : 'Select Target Line & Produce:'}
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {FRUIT_PROFILES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedCrop(f.id)}
                  className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    selectedCrop === f.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isAr ? f.nameAr : f.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Retrofit Summary & ROI Card */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div>
            <div className="text-xs font-mono uppercase text-emerald-400">
              {isAr ? 'حزمة الترقية المباشرة (Retrofit Kit)' : 'Turnkey Retrofit Package'}
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              {isAr ? `ترقية خط ${currentProfile.nameAr}` : `Upgrade Suite for ${currentProfile.name}`}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {isAr
                ? 'يمكن تركيب هذه الوحدات مباشرة على خطوط الإنتاج الحالية خلال فترة توقف الصيانة دون الحاجة لتغيير هيكل السير أو الماكينة بالكامل.'
                : 'Can be seamlessly integrated into existing facility lines during regular maintenance windows without replacing structural conveyor frames.'}
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{isAr ? 'زيادة طاقة الإنتاج' : 'Throughput Boost'}</span>
              <span className="font-mono font-bold text-emerald-400">+18% to +25%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{isAr ? 'تقليل نسبة الخطأ التصديري' : 'False Reject Reduction'}</span>
              <span className="font-mono font-bold text-emerald-400">-65%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{isAr ? 'فترة استرداد التكلفة (ROI)' : 'Estimated ROI Period'}</span>
              <span className="font-mono font-bold text-amber-400">4.5 Months</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => alert(isAr ? 'تم إرسال طلب دراسة الجدوى الفنية لترقية الخط بنجاح!' : 'Technical feasibility audit requested successfully!')}
              className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-bold rounded-lg text-xs shadow transition-colors flex items-center justify-center gap-2"
            >
              <span>{isAr ? 'طلب دراسة ترقية هندسية مخصصة' : 'Request Custom Engineering Audit'}</span>
              <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
