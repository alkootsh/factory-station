import React, { useState } from 'react';
import { AlertTriangle, Wrench, ShieldAlert, CheckCircle2, Search, Sliders, ChevronDown } from 'lucide-react';
import { FAULT_CODES, FaultCode } from '../data/mafData';

interface MaintenanceDiagnosticsProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const MaintenanceDiagnostics: React.FC<MaintenanceDiagnosticsProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubsystem, setSelectedSubsystem] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'alarms' | 'calibration' | 'preventive'>('alarms');

  // Filter alarms
  const filteredAlarms = FAULT_CODES.filter((alarm) => {
    const matchesSearch =
      alarm.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alarm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alarm.titleAr.includes(searchQuery);

    const matchesSubsystem =
      selectedSubsystem === 'all' || alarm.subsystem === selectedSubsystem;

    return matchesSearch && matchesSubsystem;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'مركز الصيانة والأعطال والمعايرة' : 'Diagnostics, Maintenance & Calibration'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'دليل الصيانة وحل أعطال خطوط الفرز' : 'Falcon Eye Troubleshooting & Calibration Protocols'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'دليل مهندسي وفنيي محطات التعبئة لمعايرة حساسات الوزن الديناميكية، كاميرات الرؤية، وتتبع أكواد الإنذار وحلها في الزمن الحقيقي.'
            : 'Engineering field guide for load cell calibration, optical white balance alignment, and SCADA alarm code resolution.'}
        </p>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('alarms')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'alarms'
              ? 'bg-white text-slate-900 shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isAr ? 'أكواد الأعطال والإنذارات (Alarms)' : 'Alarm Codes'}
        </button>
        <button
          onClick={() => setActiveTab('calibration')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'calibration'
              ? 'bg-white text-slate-900 shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isAr ? 'إجراءات المعايرة الدورية' : 'Calibration Protocols'}
        </button>
        <button
          onClick={() => setActiveTab('preventive')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'preventive'
              ? 'bg-white text-slate-900 shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isAr ? 'جدول الصيانة الوقائية' : 'Preventive Schedule'}
        </button>
      </div>

      {/* Tab 1: Alarms Explorer */}
      {activeTab === 'alarms' && (
        <div className="space-y-6">
          {/* Search and Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isAr ? 'ابحث بكود العطل (مثال: ALM-104)...' : 'Search fault code (e.g., ALM-104)...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg ps-9 pe-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 w-full sm:w-auto">
              <span>{isAr ? 'النتائج:' : 'Found:'}</span>
              <span className="font-mono font-bold text-slate-900">{filteredAlarms.length}</span>
              <span>{isAr ? 'كود إنذار مسجل' : 'registered alarms'}</span>
            </div>
          </div>

          {/* Alarm Cards Grid */}
          <div className="space-y-4">
            {filteredAlarms.map((alarm) => (
              <div
                key={alarm.code}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 bg-slate-900 text-emerald-400 font-mono text-xs font-bold rounded">
                      {alarm.code}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {isAr ? alarm.titleAr : alarm.title}
                    </h3>
                  </div>

                  <div className="text-xs text-slate-500 font-mono">
                    {isAr ? alarm.subsystemAr : alarm.subsystem}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Root Cause */}
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      <span>{isAr ? 'السبب الفني المحتمل:' : 'Root Cause:'}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{alarm.causeAr}</p>
                  </div>

                  {/* Resolution Protocol */}
                  <div className="p-3.5 bg-emerald-50/60 rounded-lg border border-emerald-200/80 space-y-1">
                    <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isAr ? 'إجراء الإصلاح المعتمد:' : 'Repair Procedure:'}</span>
                    </div>
                    <p className="text-emerald-950 whitespace-pre-line leading-relaxed">
                      {isAr ? alarm.solutionAr : alarm.solutionEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Calibration Protocols */}
      {activeTab === 'calibration' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Protocol 1: Dynamic Weighing */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono text-emerald-600 uppercase font-semibold">
                Protocol 01 · Calibration
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isAr ? 'معايرة خلايا الوزن الديناميكية (Load Cells)' : 'Dynamic Load Cell Calibration'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? 'تجري المعايرة الديناميكية للكؤوس أثناء دوران السير بسرعة التشغيل الكاملة عبر مرحلتين: تصفير الكؤوس الفارغة (Dynamic Tare)، ثم تمرير ثقل مرجعي قياسي 200 جرام.'
                  : 'Calibrates cup carrier load cells at full operating speed in two steps: empty cup dynamic tare, followed by passing a 200g certified reference weight.'}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs font-mono text-slate-500">
              {isAr ? 'الدقة المستهدفة: ± 1 جرام' : 'Target Precision: ± 1.0g'}
            </div>
          </div>

          {/* Protocol 2: White Balance & Strobe Alignment */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono text-teal-600 uppercase font-semibold">
                Protocol 02 · Vision Cabin
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isAr ? 'توازن البياض ونظافة GlobalScan 7' : 'GlobalScan White Balance & Cleaning'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? 'تنظيف عدسات الكاميرات وألواح الزجاج الواقية من رذاذ الشمع والماء باستخدام كحول الآيزوبروبيل، ثم إدخال مسطرة المعايرة البيضاء المعتمدة وضبط الـ Gain في برنامج الرؤية.'
                  : 'Clean optical glass enclosures with isopropyl alcohol, insert certified white balance tile, and calibrate camera gain and exposure.'}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs font-mono text-slate-500">
              {isAr ? 'التكرار الموصى به: أسبوعياً' : 'Interval: Weekly during season'}
            </div>
          </div>

          {/* Protocol 3: Ejector Solenoid Delay Timing */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono text-indigo-600 uppercase font-semibold">
                Protocol 03 · Pneumatics
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isAr ? 'تزامن نبضات صمامات الطرد (Drop Timing)' : 'Solenoid Ejection Pulse Timing'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? 'حساب وتعديل زمن نبضة الطرد (Pulse Delay) بناءً على عدد نبضات الإنكودر بين حجرة الكاميرات ومخرج الإسقاط لضمان سقوط الحبة في مركز مجرى الخروج تماماً.'
                  : 'Compute drop pulse delay based on master encoder pulse delta between vision cabin and targeted outlet drop to guarantee center landing.'}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs font-mono text-slate-500">
              {isAr ? 'الضغط المقاس: 6.2 بار مستمر' : 'Nominal Air: 6.2 bar continuous'}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Preventive Schedule */}
      {activeTab === 'preventive' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900">
            {isAr ? 'جدول الصيانة الوقائية لخطوط ماف رودا' : 'Recommended Preventive Maintenance Plan'}
          </h3>

          <div className="space-y-4 text-xs">
            {/* Daily */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-emerald-800 flex items-center justify-between">
                <span>{isAr ? 'الفحص اليومي (قبل بدء الوردية):' : 'Daily Pre-Shift Inspection:'}</span>
                <span className="font-mono text-slate-500">Daily</span>
              </div>
              <ul className="list-disc ps-5 space-y-1 text-slate-600">
                <li>{isAr ? 'تفقد ضغط الهواء في المنظم الرئيسي (يجب ألا يقل عن 6.0 بار).' : 'Verify main pneumatic regulator reads ≥ 6.0 bar.'}</li>
                <li>{isAr ? 'مسح زجاج كابينة الكاميرات GlobalScan 7 بقطعة قماش ناعمة خالية من الوبر.' : 'Wipe camera glass enclosures with dry microfiber cloth.'}</li>
                <li>{isAr ? 'التأكد من عدم وجود كؤوس مكسورة أو عالقة في جنزير الناقل POMONE.' : 'Inspect biconical cups for mechanical jams or physical debris.'}</li>
              </ul>
            </div>

            {/* Weekly */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-teal-800 flex items-center justify-between">
                <span>{isAr ? 'الفحص الأسبوعي:' : 'Weekly Maintenance:'}</span>
                <span className="font-mono text-slate-500">Weekly</span>
              </div>
              <ul className="list-disc ps-5 space-y-1 text-slate-600">
                <li>{isAr ? 'إجراء معايرة التوازن الأبيض White Balance لكاميرات الرؤية.' : 'Execute optical White Balance calibration.'}</li>
                <li>{isAr ? 'تشحيم وتزييت جنزير الناقل بالزيت الغذائي المعتمد NSF H1.' : 'Lubricate sizer drive chains with NSF H1 food-grade lubricant.'}</li>
                <li>{isAr ? 'تنظيف واستبدال كؤوس الشفط السيليكونية التالفة في روبوت Line Pack.' : 'Inspect and replace worn silicone suction bellows on Line Pack.'}</li>
              </ul>
            </div>

            {/* Pre-Season */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>{isAr ? 'العمرة الشاملة (قبل بدء الموسم التصديري):' : 'Pre-Season Overhaul:'}</span>
                <span className="font-mono text-slate-500">Annual</span>
              </div>
              <ul className="list-disc ps-5 space-y-1 text-slate-600">
                <li>{isAr ? 'استبدال لمبات الهالوجين الطيفية الخاصة بنظام الاستشعار الطيفي.' : 'Replace Insight NIR reference halogen emitter lamps.'}</li>
                <li>{isAr ? 'معايرة ديناميكية شاملة لكافة خلايا الوزن بحضور مهندس الصيانة المعتمد.' : 'Full dynamic load cell calibration across all lanes.'}</li>
                <li>{isAr ? 'تحديث برمجيات الإشراف والتحكم SCADA وعمل نسخة احتياطية من وصفات الفرز.' : 'Backup and upgrade plant SCADA recipes and firmware.'}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
