import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  ShieldAlert,
  Wrench,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Activity,
  Flame,
  Gauge,
  Wind,
  Eye,
  RotateCw,
  Terminal,
  Clock,
  ArrowRight,
  Sliders,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AIPredictiveMaintenanceProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

interface PredictedFault {
  id: string;
  subsystem: string;
  subsystemAr: string;
  titleAr: string;
  titleEn: string;
  severity: 'critical' | 'warning' | 'advisory';
  failureProbability: number;
  timeToFailureHours: number;
  rootCauseAr: string;
  rootCauseEn: string;
  requiredPartsAr: string[];
  toolsNeededAr: string[];
  repairStepsAr: string[];
  resolved: boolean;
}

export const AIPredictiveMaintenance: React.FC<AIPredictiveMaintenanceProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(true);
  const [expandedFaultId, setExpandedFaultId] = useState<string | null>('flt-1');
  const [overallHealthScore, setOverallHealthScore] = useState<number>(92);

  const [predictedFaults, setPredictedFaults] = useState<PredictedFault[]>([
    {
      id: 'flt-1',
      subsystem: 'Pneumatics & Solenoids',
      subsystemAr: 'بنك صمامات الهواء وقواذف الفرز (Solenoids)',
      titleAr: 'تباطؤ زمن استجابة قاذف الهواء للمخرج رقم 4 (Air Ejector Latency)',
      titleEn: 'Delayed response latency on pneumatic ejection valve Bank 4',
      severity: 'critical',
      failureProbability: 88,
      timeToFailureHours: 14,
      rootCauseAr: 'تراكم رطوبة متكثفة وشوائب زيتية داخل قلب الصمام الكهرومغناطيسي، مما رفع زمن الفتح من 11ms إلى 24ms، ما يتسبب في تفويت طرد حبات الدرجة الثانية إلى السير الصحيح.',
      rootCauseEn: 'Moisture and oil mist buildup in pilot valve core increased response from 11ms to 24ms, causing missed ejections.',
      requiredPartsAr: ['صمام ملف لولبي عالي السرعة Festo MHJ10-S (24V DC)', 'طقم جوان وسيلات O-ring سيليكون غذائي', 'فلتر هواء مضغوط ومصيدة رطوبة 5 ميكرون'],
      toolsNeededAr: ['مفتاح سداسي ألن كيه 4 مم', 'منظف بخاخ إلكتروني خالي من الزيت', 'مقياس تدفق ضغط الهواء'],
      repairStepsAr: [
        '1. افصل الخط مؤقتاً وأغلق محبس الهواء الرئيسي الموصل للمخرج 4 وفرغ الضغط من الصمام اليدوي.',
        '2. فك كابل الإشارة الكهربائية (M8 connector) المتصل بكارت الـ PLC.',
        '3. أزل الصمام Festo MHJ10 ونظف الفوهة بضغط هواء جاف وافحص حلقة الإحكام.',
        '4. ركب الصمام البديل أو المنظف وتأكد من عزم الربط (1.8 Nm) لمنع تسريب الهواء.',
        '5. أعد فتح محبس الهواء تدريجياً حتى 6.5 بار واضغط على زر "اختبار نبضة القاذف" في البرنامج للتحقق من رجوع زمن الاستجابة إلى 11ms.'
      ],
      resolved: false
    },
    {
      id: 'flt-2',
      subsystem: 'Conveyor Drive & Bearings',
      subsystemAr: 'محرك وسير بكرات الفرز الرئيسي (Motor & Bearing M2)',
      titleAr: 'ارتفاع في اهتزاز محمل البلي لمحرك السير الأسطواني (Vibration Anomaly)',
      titleEn: 'High-frequency vibration harmonic detected on conveyor drive bearing M2',
      severity: 'warning',
      failureProbability: 72,
      timeToFailureHours: 48,
      rootCauseAr: 'تحليل طيف الاهتزاز (FFT) سجل ذروة تردد عند 1.45 kHz في المحمل الأمامي، متزامنة مع زيادة طفيفة في حرارة غطاء المحرك (+8°C فوق المعدل)، مما ينبئ ببداية جفاف الشحم وتآكل المسار الداخلي للمحمل.',
      rootCauseEn: 'FFT vibration spectrum peak at 1.45 kHz with +8°C temperature delta indicates bearing inner raceway degradation.',
      requiredPartsAr: ['رولمان بلي فئة غذائية SKF 6205-2RSH/VP311 (Stainless Steel)', 'شحم غذائي مقاوم للغسيل والماء Mobil FM 222'],
      toolsNeededAr: ['زرجينة فك محامل ثلاثية الأذرع', 'مسدس حراري للتركيب', 'مسدس تشحيم يدوي'],
      repairStepsAr: [
        '1. استغل فترة التوقف المجدولة (نهاية الوردية أو استراحة الغداء).',
        '2. افصل مفتاح العزل الكهربائي (Isolator Switch) للمحرك M2 وضع قفل الأمان LOTO.',
        '3. فك سير الكاتينة أو الكوبلنج المرن، واستخدم الزرجينة لسحب المحمل القديم بسلاسة دون خدش العمود.',
        '4. سخن المحمل الجديد حتى 90°C باستخدام سخان الحث ثم ركبه على العمود حتى يستقر تماماً.',
        '5. أضف الشحم الغذائي المقاوم للماء وأعد معايرة شد السير.'
      ],
      resolved: false
    },
    {
      id: 'flt-3',
      subsystem: 'Dynamic Load Cells',
      subsystemAr: 'خلايا الوزن الديناميكية السريعة (Load Cell Channel 2)',
      titleAr: 'انحراف نقطة الصفر الديناميكي (Zero-Drift) بمقدار +3.8 جرام',
      titleEn: 'Dynamic zero-drift deviation (+3.8g) detected on weighing cup lane 2',
      severity: 'warning',
      failureProbability: 64,
      timeToFailureHours: 28,
      rootCauseAr: 'تراكم رذاذ شمع الفواكه والأتربة على قاعدة الذراع الحامل للكوب رقم 14 في الحارة 2، مما تسبب في وزن كاذب وثابت قدره 3.8 جم يؤثر على دقة التعبئة.',
      rootCauseEn: 'Wax mist residue on load cell tray bracket causes static offset.',
      requiredPartsAr: ['وزن معايرة قياسي مصفح Class F1 (100g & 200g)', 'مناديل تنظيف دقيقة مع إيثانول 70%'],
      toolsNeededAr: ['مفك توركس T15', 'شاشة المعايرة اليدوية'],
      repairStepsAr: [
        '1. أوقف حركة السير وتأكد من ثبات درجات حرارة الحساس.',
        '2. امسح ذراع خلية الحمل بلطف بقطعة قماش ناعمة مبللة بكحول إيثيلي لإزالة طبقة الشمع المتراكمة.',
        '3. اضغط على خيار "تصفير الحارة 2 (Tare Lane 2)" في شاشة المعايرة.',
        '4. ضع وزن المعايرة المعتمد (100 جرام) للتأكد من قراءة الشاشة 100.0 ± 0.2 جرام.'
      ],
      resolved: false
    },
    {
      id: 'flt-4',
      subsystem: 'Optical Vision & Strobes',
      subsystemAr: 'كابينة الرؤية البصرية ولمبات الستروب (Vision Strobe LED)',
      titleAr: 'انخفاض في كفاءة إضاءة مصفوفة الستروب بنسبة 14% (Lumen Decay)',
      titleEn: 'Strobe LED matrix illuminance decay (-14%) on camera cabin 1',
      severity: 'advisory',
      failureProbability: 45,
      timeToFailureHours: 96,
      rootCauseAr: 'ترسيب طبقة أتربة دقيقة على زجاج الحماية الخارجي لمصفوفة LED الستروب، مما خفض تباين صور الكاميرا لعيوب القشرة.',
      rootCauseEn: 'Fine dust settling on optic diffuser reduces image contrast.',
      requiredPartsAr: ['سائل تنظيف بصريات الكاميرات (Optic Lens Cleaner)', 'ورق تنظيف عدسات مضاد للاستاتيكية'],
      toolsNeededAr: ['منفاخ هواء يدوي مطاطي', 'قفازات قطنية نظيفة'],
      repairStepsAr: [
        '1. أطفئ إضاءة الكابينة من البرنامج لتجنب الحرارة.',
        '2. استخدم منفاخ الهواء لإزالة ذرات الغبار الحرة أولاً لمنع خدش الزجاج.',
        '3. رش سائل البصريات على ورقة التنظيف وامسح الزجاج بحركة دائرية هادئة.',
        '4. شغل الإضاءة وقم بعمل "White Balance Calibration" للتأكد من عودة شدة الإضاءة إلى 100%.'
      ],
      resolved: false
    }
  ]);

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanCompleted(true);
      setOverallHealthScore(89);
    }, 1800);
  };

  const handleResolveFault = (faultId: string) => {
    setPredictedFaults((prev) =>
      prev.map((f) => (f.id === faultId ? { ...f, resolved: true } : f))
    );
    setOverallHealthScore((s) => Math.min(99, s + 3));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 p-6 rounded-2xl border border-rose-900/50 shadow-md text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 text-rose-400">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                  {isAr ? 'منظومة الصيانة التنبؤية بالذكاء الاصطناعي (AI Predictive Diagnostics)' : 'AI Predictive Maintenance Engine'}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-500/20 text-rose-300 rounded-full border border-rose-500/30">
                  {isAr ? 'رصد فوري للاهتزاز والحرارة والضغط' : 'Real-time Telemetry Anomaly Detection'}
                </span>
              </div>
              <h1 className="text-2xl font-black mt-1">
                {isAr ? 'التنبؤ الآلي بالأعطال وطرق إصلاحها خطوة بخطوة' : 'Automated Fault Prediction, Root-Cause Analysis & Step-by-Step Fixes'}
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl">
                {isAr
                  ? 'يقوم الذكاء الاصطناعي بتحليل إشارات تيليمتري الحساسات (ترددات اهتزاز المحركات، أزمنة استجابة صمامات الهواء، انحراف خلايا الوزن، وضعف إضاءة الكاميرات) للتنبؤ بالأعطال قبل توقف الخط بـ 12 إلى 72 ساعة مع تزويدك بدليل الصيانة الميدانية الشامل.'
                  : 'AI analyzes high-frequency vibration, valve latency, load cell zero-drift, and optical decay to predict failures 12-72 hours prior to breakdown with actionable field repair guides.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? (isAr ? 'جاري الفحص المتقدم...' : 'Running AI Scan...') : (isAr ? 'تشغيل فحص الذكاء الاصطناعي الآن' : 'Run AI Health Scan')}</span>
            </button>
          </div>
        </div>

        {/* Live Subsystems Telemetry Gauges */}
        <div className="mt-6 pt-5 border-t border-rose-900/40 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {[
            { labelAr: 'صحة محركات السيور', labelEn: 'Motors & VFD', val: '86%', status: 'warning', icon: Activity },
            { labelAr: 'ضغط صمامات الهواء', labelEn: 'Air Pressure', val: '6.4 Bar', status: 'normal', icon: Wind },
            { labelAr: 'حرارة المحامل (M2)', labelEn: 'Bearing Temp', val: '58.2°C', status: 'warning', icon: Flame },
            { labelAr: 'دقة خلايا الوزن', labelEn: 'Weighing Cells', val: '± 0.8g', status: 'normal', icon: Gauge },
            { labelAr: 'إضاءة كابينة الرؤية', labelEn: 'Vision Lighting', val: '88%', status: 'warning', icon: Eye },
            { labelAr: 'شبكة PLC الصناعية', labelEn: 'PLC Modbus Jitter', val: '12 ms', status: 'normal', icon: Cpu }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[11px] font-medium">{isAr ? item.labelAr : item.labelEn}</span>
                  <Icon className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-base font-extrabold text-white font-mono">{item.val}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      item.status === 'normal'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {item.status === 'normal' ? (isAr ? 'طبيعي' : 'Normal') : (isAr ? 'انحراف' : 'Drift')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Fault Prediction Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>{isAr ? 'الأعطال المتوقعة والتنبؤات النشطة (Predicted Anomalies & Action Plans)' : 'Active Predicted Anomalies'}</span>
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {predictedFaults.filter((f) => !f.resolved).length} {isAr ? 'تنبيهات تحتاج تدخل وقائي' : 'active predictions'}
          </span>
        </div>

        <div className="space-y-3">
          {predictedFaults.map((fault) => {
            const isExpanded = expandedFaultId === fault.id;
            return (
              <div
                key={fault.id}
                className={`bg-white rounded-2xl border transition-all overflow-hidden shadow-sm ${
                  fault.resolved
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : fault.severity === 'critical'
                    ? 'border-rose-300 ring-1 ring-rose-200'
                    : 'border-amber-200'
                }`}
              >
                {/* Card Header Bar */}
                <div
                  onClick={() => setExpandedFaultId(isExpanded ? null : fault.id)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        fault.resolved
                          ? 'bg-emerald-100 text-emerald-700'
                          : fault.severity === 'critical'
                          ? 'bg-rose-100 text-rose-700 animate-pulse'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {fault.resolved ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">{fault.subsystemAr}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            fault.resolved
                              ? 'bg-emerald-100 text-emerald-800'
                              : fault.severity === 'critical'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {fault.resolved
                            ? (isAr ? 'تمت المعالجة والإصلاح ✓' : 'Resolved')
                            : fault.severity === 'critical'
                            ? (isAr ? 'عطل حرج وشيك' : 'Critical')
                            : (isAr ? 'تحذير تشغيلي' : 'Warning')}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mt-1">
                        {isAr ? fault.titleAr : fault.titleEn}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 text-xs">
                    {!fault.resolved && (
                      <>
                        <div className="text-end">
                          <span className="text-slate-400 block text-[10px]">{isAr ? 'احتمالية التوقف:' : 'Failure Prob:'}</span>
                          <span className="font-bold text-rose-600 font-mono text-sm">{fault.failureProbability}%</span>
                        </div>
                        <div className="text-end">
                          <span className="text-slate-400 block text-[10px]">{isAr ? 'الوقت المتبقي قبل العطل:' : 'Time Left:'}</span>
                          <span className="font-bold text-amber-600 font-mono text-sm flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {fault.timeToFailureHours} {isAr ? 'ساعة' : 'hrs'}
                          </span>
                        </div>
                      </>
                    )}
                    <button className="text-slate-400 hover:text-slate-600 p-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Remediation Guide */}
                {isExpanded && (
                  <div className="p-6 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-5 text-xs">
                    {/* Root Cause Analysis */}
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-800 block mb-1 text-sm flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-indigo-600" />
                        {isAr ? 'السبب الجذري المستنتج من الذكاء الاصطناعي (Root Cause):' : 'AI Root Cause Analysis:'}
                      </span>
                      <p className="text-slate-600 leading-relaxed font-sans">{fault.rootCauseAr}</p>
                    </div>

                    {/* Spare Parts & Tools Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-xl border border-slate-200">
                        <span className="font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
                          <Wrench className="w-4 h-4 text-emerald-600" />
                          {isAr ? 'قطع الغيار المطلوبة بدقة (Spare Parts):' : 'Required Spare Parts:'}
                        </span>
                        <ul className="space-y-1.5 text-slate-600">
                          {fault.requiredPartsAr.map((part, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                              <span className="font-semibold">{part}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-slate-200">
                        <span className="font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
                          <Sliders className="w-4 h-4 text-sky-600" />
                          {isAr ? 'الأدوات ومعدات السلامة اللازمة:' : 'Required Tools & PPE:'}
                        </span>
                        <ul className="space-y-1.5 text-slate-600">
                          {fault.toolsNeededAr.map((tool, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                              <span>{tool}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Step-by-Step Remediation Procedure */}
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-800 block mb-3 text-sm flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        {isAr ? 'دليل خطوات الإصلاح الميدانية خطوة بخطوة (Step-by-Step Action Plan):' : 'Step-by-Step Repair Action Plan:'}
                      </span>
                      <div className="space-y-2">
                        {fault.repairStepsAr.map((step, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed font-sans">
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[11px] text-slate-400">
                        {isAr ? 'بعد الانتهاء من الصيانة الميدانية، اضغط لتأكيد الإصلاح ومعايرة الحساس آلياً' : 'Confirm after mechanical replacement'}
                      </span>
                      {!fault.resolved && (
                        <button
                          onClick={() => handleResolveFault(fault.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>{isAr ? 'تأكيد الإصلاح وتصفير الإنذار' : 'Mark Resolved & Reset'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
