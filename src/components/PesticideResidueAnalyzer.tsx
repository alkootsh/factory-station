import React, { useState } from 'react';
import {
  FlaskConical,
  ShieldCheck,
  AlertOctagon,
  CheckCircle2,
  Cpu,
  Activity,
  Search,
  FileText,
  Printer,
  Download,
  RefreshCw,
  Sliders,
  Layers,
  Sparkles,
  Info,
  Zap,
  Globe,
  Radio,
  BarChart3
} from 'lucide-react';

interface PesticideResidueAnalyzerProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

interface PesticideRecord {
  id: string;
  chemicalNameAr: string;
  chemicalNameEn: string;
  category: 'insecticide' | 'fungicide' | 'acaricide';
  detectedPpm: number;
  euMrlPpm: number;
  ukMrlPpm: number;
  codexMrlPpm: number;
  status: 'compliant' | 'warning' | 'exceeded';
  detectionTechnology: 'SERS Laser Raman' | 'Hyperspectral NIR' | 'AChE Bio-Sensor' | 'Auto-Flume Sampling';
  testedProduce: string;
  batchId: string;
  testTimestamp: string;
}

export const PesticideResidueAnalyzer: React.FC<PesticideResidueAnalyzerProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'live_scan' | 'mrl_database' | 'batch_coa' | 'plc_lock'>('live_scan');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState('REC-2026-084');
  const [targetMarket, setTargetMarket] = useState<'EU' | 'UK' | 'Codex'>('EU');
  const [quarantineActive, setQuarantineActive] = useState(false);

  // Live Sample Residue Database
  const [residueResults, setResidueResults] = useState<PesticideRecord[]>([
    {
      id: 'PEST-01',
      chemicalNameAr: 'أزوكستيروبين (مبيد فطري)',
      chemicalNameEn: 'Azoxystrobin (Fungicide)',
      category: 'fungicide',
      detectedPpm: 0.12,
      euMrlPpm: 15.0,
      ukMrlPpm: 15.0,
      codexMrlPpm: 15.0,
      status: 'compliant',
      detectionTechnology: 'SERS Laser Raman',
      testedProduce: 'عنب فليم سيدلس (Table Grapes)',
      batchId: 'REC-2026-084',
      testTimestamp: '2026-10-17 11:20'
    },
    {
      id: 'PEST-02',
      chemicalNameAr: 'إيميداكلوبريد (مبيد حشري جهازي)',
      chemicalNameEn: 'Imidacloprid (Neonicotinoid)',
      category: 'insecticide',
      detectedPpm: 0.008,
      euMrlPpm: 0.01,
      ukMrlPpm: 0.05,
      codexMrlPpm: 1.0,
      status: 'warning',
      detectionTechnology: 'AChE Bio-Sensor',
      testedProduce: 'برتقال فالنسيا صيفي (Valencia)',
      batchId: 'REC-2026-084',
      testTimestamp: '2026-10-17 11:22'
    },
    {
      id: 'PEST-03',
      chemicalNameAr: 'بوسكاليد (مبيد فطري لعفن البوتريتس)',
      chemicalNameEn: 'Boscalid (Carboxamide)',
      category: 'fungicide',
      detectedPpm: 0.45,
      euMrlPpm: 5.0,
      ukMrlPpm: 5.0,
      codexMrlPpm: 5.0,
      status: 'compliant',
      detectionTechnology: 'Hyperspectral NIR',
      testedProduce: 'طماطم شيري (Cherry Tomatoes)',
      batchId: 'REC-2026-084',
      testTimestamp: '2026-10-17 11:23'
    },
    {
      id: 'PEST-04',
      chemicalNameAr: 'كلوربيريفوس (مركب فسفوري محظور دولياً)',
      chemicalNameEn: 'Chlorpyrifos (Organophosphate)',
      category: 'insecticide',
      detectedPpm: 0.000,
      euMrlPpm: 0.01,
      ukMrlPpm: 0.01,
      codexMrlPpm: 0.01,
      status: 'compliant',
      detectionTechnology: 'SERS Laser Raman',
      testedProduce: 'بطاطس تصدير سبونتا (Potatoes)',
      batchId: 'REC-2026-084',
      testTimestamp: '2026-10-17 11:25'
    },
    {
      id: 'PEST-05',
      chemicalNameAr: 'ديفينوكونازول (مبيد للبياض الدقيقي)',
      chemicalNameEn: 'Difenoconazole (Triazole)',
      category: 'fungicide',
      detectedPpm: 0.06,
      euMrlPpm: 0.6,
      ukMrlPpm: 0.6,
      codexMrlPpm: 0.5,
      status: 'compliant',
      detectionTechnology: 'Hyperspectral NIR',
      testedProduce: 'عنب إيرلي سوبيريور (Grapes)',
      batchId: 'REC-2026-084',
      testTimestamp: '2026-10-17 11:26'
    }
  ]);

  const handleRunResidueScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Simulate live optical & sensor reading
      setResidueResults((prev) =>
        prev.map((item) => ({
          ...item,
          testTimestamp: new Date().toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
        }))
      );
    }, 2000);
  };

  const handleSimulateContamination = () => {
    // Add an alert record that breaches EU MRL to show the automatic PLC Quarantine Lock feature!
    const contaminatedRecord: PesticideRecord = {
      id: `PEST-ALERT-${Date.now()}`,
      chemicalNameAr: 'دايميثويت (مبيد حشري غير مطابق)',
      chemicalNameEn: 'Dimethoate (Exceeded Limit)',
      category: 'insecticide',
      detectedPpm: 0.085,
      euMrlPpm: 0.01, // Limit is 0.01
      ukMrlPpm: 0.01,
      codexMrlPpm: 0.02,
      status: 'exceeded',
      detectionTechnology: 'SERS Laser Raman',
      testedProduce: 'عينة شحنة تجريبية (Batch Test)',
      batchId: selectedBatchId,
      testTimestamp: new Date().toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setResidueResults([contaminatedRecord, ...residueResults]);
    setQuarantineActive(true);
  };

  const handleDismissQuarantine = () => {
    setQuarantineActive(false);
    setResidueResults((prev) => prev.filter((r) => r.status !== 'exceeded'));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 rounded-2xl border border-emerald-900/50 shadow-md text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-400">
              <FlaskConical className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  {isAr ? 'وحدة القياس الآلي لمتبقيات المبيدات (Automated Pesticide Residues & MRL Analyzer)' : 'Automated Pesticide Residues Analyzer'}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                  {isAr ? 'متوافق مع معايير الاتحاد الأوروبي EU MRL و GlobalG.A.P.' : 'EU MRL & GlobalGAP Compliant'}
                </span>
              </div>
              <h1 className="text-2xl font-black mt-1">
                {isAr ? 'فحص وتحليل متبقيات المبيدات آلياً على الخط والربط بنظام الحظر والتصدير' : 'In-Line Automated Pesticide Residues & MRL Quality Gate'}
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl">
                {isAr
                  ? 'قياس فوري للمركبات الكيميائية وبقايا المبيدات باستخدام مطياف رامان الليزري (SERS)، التصوير الطيفي NIR، والمجسات الإنزيمية الحيوية لمقارنة النتيجة بحدود الـ MRL لكل سوق تصديري وإيقاف تفريغ الدفعة آلياً عبر الـ PLC عند تجاوز الحدود.'
                  : 'Automated rapid pesticide detection using Laser SERS Raman spectroscopy, NIR hyperspectral imaging, and bio-sensors with automated PLC quarantine interlocks.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            <button
              onClick={handleRunResidueScan}
              disabled={isScanning}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? (isAr ? 'جاري التحليل الطيفي...' : 'Scanning Spectrum...') : (isAr ? 'بدء فحص العينة آلياً' : 'Run In-Line Test')}</span>
            </button>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="mt-6 pt-4 border-t border-emerald-900/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'live_scan', ar: '📡 نتائج الفحص الطيفي الحي', en: 'Live Residue Scan' },
              { id: 'mrl_database', ar: '🌐 قاعدة بيانات حدود MRL العالمية', en: 'Global MRL Limits' },
              { id: 'batch_coa', ar: '📑 شهادة التحليل الفورية (COA)', en: 'Certificate of Analysis' },
              { id: 'plc_lock', ar: '🔒 قفل الأمان والربط بـ PLC', en: 'PLC Quarantine Link' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-400 text-slate-950 font-black shadow-md'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  {isAr ? tab.ar : tab.en}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">{isAr ? 'السوق المستهدف:' : 'Market Standard:'}</span>
            <select
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-emerald-400 font-bold text-xs"
            >
              <option value="EU">الاتحاد الأوروبي (EU MRL Regulations)</option>
              <option value="UK">المملكة المتحدة (UK CRD Regulations)</option>
              <option value="Codex">الكودكس العالمي (Codex Alimentarius)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Emergency Quarantine Alert Banner (Triggered when any chemical exceeds MRL) */}
      {quarantineActive && (
        <div className="p-5 rounded-2xl bg-rose-600 text-white shadow-xl border-2 border-rose-400 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse">
          <div className="flex items-start gap-3">
            <AlertOctagon className="w-8 h-8 text-yellow-300 shrink-0" />
            <div>
              <div className="font-black text-base flex items-center gap-2">
                <span>{isAr ? '⚠️ إنذار حظر تصدير وتوقف آلي: تم رصد متبقيات مبيد تتجاوز الحد الأقصى المسموح (MRL Breach)!' : 'CRITICAL MRL BREACH DETECTED - AUTOMATIC LINE QUARANTINE!'}</span>
              </div>
              <p className="text-xs text-rose-100 mt-1">
                {isAr
                  ? 'أرسل النظام إشارة طارئة لكارت الـ PLC (Coil 00018 = HIGH) لإيقاف تفريغ دفعة المزرعة فوراً وتحويل مسار السير إلى خط العزل، ومنع إصدار شهادة الشحن للتصدير.'
                  : 'Automated PLC safety trip executed (Coil 00018 = HIGH). Fruit infeed halted and diverted to quarantine flume.'}
              </p>
            </div>
          </div>
          <button
            onClick={handleDismissQuarantine}
            className="px-4 py-2 rounded-xl bg-white text-rose-800 font-extrabold text-xs shadow-md hover:bg-rose-50 shrink-0"
          >
            {isAr ? 'معالجة العينة وإعادة الفحص' : 'Acknowledge & Re-test'}
          </button>
        </div>
      )}

      {/* Tab 1: Live Residue Scan */}
      {activeTab === 'live_scan' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'نتائج القياس اللاتدميري للبقايا الكيميائية على الثمار' : 'Live Chemical Fingerprint Analysis'}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'يتم الفحص خلال 45 ثانية باستخدام تقنية SERS Raman المطيافية ومجسات مياه الغسيل'
                  : 'Rapid 45-second screening per batch comparing ppm to maximum residue limits'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulateContamination}
                className="px-3 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1.5"
                title={isAr ? 'محاكاة عينة مخالفة لتجربة قفل الـ PLC والحظر التلقائي' : 'Simulate contamination alert'}
              >
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>{isAr ? 'محاكاة عينة متجاوزة للحد (Test Alert)' : 'Simulate Breach'}</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3 px-4 text-start">{isAr ? 'اسم المركب والمبيد' : 'Pesticide Active Compound'}</th>
                    <th className="py-3 px-4 text-start">{isAr ? 'نوع المبيد' : 'Class'}</th>
                    <th className="py-3 px-4 text-start">{isAr ? 'المحصول ورقم الدفعة' : 'Produce & Batch'}</th>
                    <th className="py-3 px-4 text-end font-bold text-slate-900">{isAr ? 'التركيز المرصود (ppm)' : 'Detected (ppm)'}</th>
                    <th className="py-3 px-4 text-end font-bold text-indigo-700">
                      {isAr ? `حد الـ MRL المسموح (${targetMarket})` : `${targetMarket} MRL (ppm)`}
                    </th>
                    <th className="py-3 px-4 text-center">{isAr ? 'تقنية القياس' : 'Sensor / Tech'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'قرار الصلاحية للتصدير' : 'Export Verdict'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {residueResults.map((r) => {
                    const limit = targetMarket === 'EU' ? r.euMrlPpm : targetMarket === 'UK' ? r.ukMrlPpm : r.codexMrlPpm;
                    const isExceeded = r.detectedPpm > limit;
                    const isWarning = !isExceeded && r.detectedPpm >= limit * 0.7;

                    return (
                      <tr key={r.id} className={`hover:bg-slate-50/80 transition-colors ${isExceeded ? 'bg-rose-50/60' : ''}`}>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{isAr ? r.chemicalNameAr : r.chemicalNameEn}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{r.id} · {r.testTimestamp}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 uppercase">
                            {r.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-slate-800 font-medium">{r.testedProduce}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{r.batchId}</div>
                        </td>
                        <td className="py-3 px-4 text-end font-mono font-black text-sm">
                          <span className={isExceeded ? 'text-rose-700' : isWarning ? 'text-amber-600' : 'text-emerald-700'}>
                            {r.detectedPpm.toFixed(3)} ppm
                          </span>
                        </td>
                        <td className="py-3 px-4 text-end font-mono font-bold text-indigo-700">
                          {limit.toFixed(2)} ppm
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                            {r.detectionTechnology}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                              isExceeded
                                ? 'bg-rose-100 text-rose-800'
                                : isWarning
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {isExceeded ? (
                              <>
                                <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                                <span>{isAr ? 'مرفوض ومحظور (Reject)' : 'Rejected'}</span>
                              </>
                            ) : isWarning ? (
                              <>
                                <Info className="w-3.5 h-3.5 text-amber-600" />
                                <span>{isAr ? 'تحذير اقتراب من الحد' : 'Close to Limit'}</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{isAr ? 'مطابق ومجاز للتصدير ✓' : 'Compliant'}</span>
                              </>
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Batch Certificate of Analysis (COA) Preview */}
      {activeTab === 'batch_coa' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{isAr ? 'شهادة تحليل جودة وتصدير رسمية' : 'Official Laboratory Certificate'}</div>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">{isAr ? 'شهادة مطابقة متبقيات المبيدات للشحنة (Certificate of Analysis - COA)' : 'Pesticide MRL Compliance Certificate'}</h3>
            </div>
            <button className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 self-start">
              <Printer className="w-4 h-4" />
              <span>{isAr ? 'طباعة شهادة الـ COA المعتمدة' : 'Print Certificate'}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <span className="text-slate-400 block">{isAr ? 'رقم الشحنة والباتش:' : 'Batch / Lot No:'}</span>
                <span className="font-bold text-slate-900 font-mono">REC-2026-084</span>
              </div>
              <div>
                <span className="text-slate-400 block">{isAr ? 'المزرعة وكود التتبع:' : 'Farm GlobalGAP GGN:'}</span>
                <span className="font-bold text-slate-900 font-mono">GGN: 4059883921004</span>
              </div>
              <div>
                <span className="text-slate-400 block">{isAr ? 'المحصول والصنف:' : 'Produce Variety:'}</span>
                <span className="font-bold text-slate-900">عنب فليم سيدلس أحمر ممتاز</span>
              </div>
              <div>
                <span className="text-slate-400 block">{isAr ? 'تاريخ وساعة الفحص:' : 'Inspection Time:'}</span>
                <span className="font-bold text-slate-900 font-mono">2026-10-17 11:30</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-semibold">{isAr ? 'نتيجة الفحص الشامل لـ 5 مركب كيميائي:' : 'Overall Multiresidue Result:'}</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAr ? 'مطابق تماماً لمواصفات المفوضية الأوروبية (EC No 396/2005)' : 'Fully Compliant with EU EC 396/2005'}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: PLC Quarantine Architecture Guide */}
      {activeTab === 'plc_lock' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <span>{isAr ? 'آلية الربط الصناعي بين وحدة قياس المبيدات ومتحكم الـ PLC (Automated Interlock)' : 'PLC Hardware Interlock Protocol'}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-800">{isAr ? '1. الرصد والتحليل اللحظي:' : '1. Real-time Analysis:'}</div>
              <p className="text-slate-600 leading-relaxed">
                يقوم مطياف SERS Raman بقراءة قشرة الثمرة أو أخذ عينة من مياه الغسيل كل 5 دقائق، وترسل البرمجية النتيجة عبر بروتوكول Modbus TCP إلى السجل <strong>Holding Register 40050</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-800">{isAr ? '2. المقارنة الآلية مع الـ MRL:' : '2. Threshold Evaluation:'}</div>
              <p className="text-slate-600 leading-relaxed">
                إذا كانت القيمة أعلى من الحد المسموح (مثال: Dimethoate &gt; 0.01 ppm)، يُفعّل النظام بت الأمان الداخلي فوراً في أقل من 20 ميلي ثانية.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-800">{isAr ? '3. أمر الإيقاف وتحويل المسار:' : '3. Hardware Interlock:'}</div>
              <p className="text-slate-600 leading-relaxed">
                يطلق كارت الـ PLC خرجاً رقمياً <strong>Digital Output DQ_0.7</strong> لإغلاق بوابات التغذية، ويفتح محول مسار عادم العزل لمنع خلط المحصول بالكراتين السليمة.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
