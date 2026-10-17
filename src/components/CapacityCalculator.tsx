import React, { useState } from 'react';
import { Calculator, TrendingUp, Users, Box, Droplets, Zap } from 'lucide-react';

interface CapacityCalculatorProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const CapacityCalculator: React.FC<CapacityCalculatorProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [machineType, setMachineType] = useState<'pomone' | 'cherryway' | 'speedway'>('pomone');
  const [lanes, setLanes] = useState<number>(6);
  const [speedPerLane, setSpeedPerLane] = useState<number>(12); // cups/s
  const [cupFillRate, setCupFillRate] = useState<number>(85); // %
  const [avgFruitWeight, setAvgFruitWeight] = useState<number>(180); // grams
  const [shiftHours, setShiftHours] = useState<number>(8); // hours
  const [packoutRate, setPackoutRate] = useState<number>(75); // % export grade

  // Formulas
  // Total cups per second = lanes * speedPerLane
  const totalCupsPerSec = lanes * speedPerLane;
  // Effective fruits per second = totalCupsPerSec * (cupFillRate / 100)
  const fruitsPerSec = totalCupsPerSec * (cupFillRate / 100);
  const fruitsPerHour = fruitsPerSec * 3600;
  // Tons per hour = (fruitsPerHour * avgFruitWeight in kg) / 1000
  const tonsPerHour = (fruitsPerHour * (avgFruitWeight / 1000)) / 1000;
  const tonsPerShift = tonsPerHour * shiftHours;
  // 380 kg wooden field bins needed per hour
  const binsPerHour = (tonsPerHour * 1000) / 380;
  // Standard 15kg cartons export output per shift
  const exportCartonsPerShift = ((tonsPerShift * 1000 * (packoutRate / 100)) / 15);

  // Manual labor savings estimate:
  // Typically manual grading requires 1 sorter per 0.4 tons/hour
  const manualWorkersNeeded = Math.round(tonsPerHour / 0.4);
  const automatedQcNeeded = Math.ceil(lanes * 0.8) + 1; // QA spot checkers only
  const laborSavedCount = Math.max(0, manualWorkersNeeded - automatedQcNeeded);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'حاسبة القدرة الهندسية ودراسة الجدوى' : 'Packhouse Engineering & Sizing Calculator'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'حاسبة إنتاجية خطوط الفرز والتعبئة الصناعية' : 'Industrial Line Throughput & Labor ROI Calculator'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'احسب بدقة عدد الأطنان في الساعة، واستهلاك الصناديق الحقلية، ومعدل الكراتين في الوردية، وتوفير العمالة اليدوية مقارنة بالفرز التقليدي.'
            : 'Accurately compute tons/hour, field bin replenishment rates, export box counts per shift, and FTE labor reallocation.'}
        </p>
      </div>

      {/* Main Grid: Parameters on Left, Outputs on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Parameters */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-slate-900 font-bold border-b border-slate-100 pb-3">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>{isAr ? 'معايير المحطة وخط الفرز' : 'Line Configuration Parameters'}</span>
          </div>

          {/* Machine Sizer Type */}
          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-slate-700">
              {isAr ? 'طراز ماكينة الفرز (Sizer Platform)' : 'Sizer Machine Type'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setMachineType('pomone');
                  setSpeedPerLane(12);
                  setAvgFruitWeight(180);
                }}
                className={`py-2 px-2 text-center rounded border font-medium ${
                  machineType === 'pomone'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                POMONE IV
              </button>
              <button
                onClick={() => {
                  setMachineType('cherryway');
                  setSpeedPerLane(25);
                  setAvgFruitWeight(11);
                }}
                className={`py-2 px-2 text-center rounded border font-medium ${
                  machineType === 'cherryway'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                CHERRYWAY
              </button>
              <button
                onClick={() => {
                  setMachineType('speedway');
                  setSpeedPerLane(10);
                  setAvgFruitWeight(220);
                }}
                className={`py-2 px-2 text-center rounded border font-medium ${
                  machineType === 'speedway'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                SPEEDWAY
              </button>
            </div>
          </div>

          {/* Lanes Slider */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>{isAr ? 'عدد الحارات (Lanes)' : 'Sizer Lanes'}</span>
              <span className="font-mono text-emerald-600 font-bold">{lanes} Lanes</span>
            </div>
            <input
              type="range"
              min="2"
              max="12"
              step="2"
              value={lanes}
              onChange={(e) => setLanes(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Cups / Second Speed */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>{isAr ? 'سرعة السير (كوب/ثانية/حارة)' : 'Conveyor Speed (cups/s/lane)'}</span>
              <span className="font-mono text-emerald-600 font-bold">{speedPerLane} c/s</span>
            </div>
            <input
              type="range"
              min="6"
              max={machineType === 'cherryway' ? 30 : 15}
              step="1"
              value={speedPerLane}
              onChange={(e) => setSpeedPerLane(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Average Fruit Weight */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>{isAr ? 'متوسط وزن الحبة (جرام)' : 'Avg Fruit Weight (g)'}</span>
              <span className="font-mono text-slate-900 font-bold">{avgFruitWeight} g</span>
            </div>
            <input
              type="range"
              min="5"
              max="350"
              step="5"
              value={avgFruitWeight}
              onChange={(e) => setAvgFruitWeight(Number(e.target.value))}
              className="w-full accent-slate-700 cursor-pointer"
            />
          </div>

          {/* Cup Fill Efficiency % */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>{isAr ? 'كفاءة امتلاء الكؤوس (Filling Rate)' : 'Cup Singulation Efficiency %'}</span>
              <span className="font-mono text-emerald-600 font-bold">{cupFillRate}%</span>
            </div>
            <input
              type="range"
              min="60"
              max="95"
              step="1"
              value={cupFillRate}
              onChange={(e) => setCupFillRate(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Shift Hours */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>{isAr ? 'ساعات الوردية اليومية' : 'Shift Duration (Hours)'}</span>
              <span className="font-mono text-slate-900 font-bold">{shiftHours} h</span>
            </div>
            <input
              type="range"
              min="6"
              max="16"
              step="1"
              value={shiftHours}
              onChange={(e) => setShiftHours(Number(e.target.value))}
              className="w-full accent-slate-700 cursor-pointer"
            />
          </div>
        </div>

        {/* Right: Calculated Yield Dashboard */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Throughput Banner */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div>
              <div className="text-xs font-mono uppercase text-emerald-400">
                {isAr ? 'الطاقة الإنتاجية الصافية' : 'Net Calculated Throughput'}
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums text-white mt-1">
                {tonsPerHour.toFixed(1)}{' '}
                <span className="text-lg font-normal text-slate-400">{isAr ? 'طن / ساعة' : 'Tons / Hour'}</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {isAr
                  ? `بمعدل ${Math.round(fruitsPerHour).toLocaleString()} حبة في الساعة الواحدة`
                  : `Equivalent to ${Math.round(fruitsPerHour).toLocaleString()} fruits per hour`}
              </div>
            </div>

            {/* Key Output Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div>
                <div className="text-slate-400">{isAr ? 'إنتاجية الوردية' : 'Per Shift Output'}</div>
                <div className="text-xl font-bold font-mono text-white mt-0.5">
                  {tonsPerShift.toFixed(1)} <span className="text-xs text-slate-400">{isAr ? 'طن' : 'Tons'}</span>
                </div>
              </div>

              <div>
                <div className="text-slate-400">{isAr ? 'صناديق حقلية/ساعة' : '380kg Bins/Hour'}</div>
                <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
                  {Math.round(binsPerHour)} <span className="text-xs text-slate-400">{isAr ? 'بندول' : 'bins'}</span>
                </div>
              </div>

              <div>
                <div className="text-slate-400">{isAr ? 'كرتونة 15كجم/وردية' : '15kg Export Boxes'}</div>
                <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">
                  {Math.round(exportCartonsPerShift).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Operational Savings & Resource Estimator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Labor Optimization */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <Users className="w-4 h-4" />
                <span>{isAr ? 'توفير العمالة اليدوية' : 'Labor Reallocation'}</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                -{laborSavedCount}{' '}
                <span className="text-xs font-normal text-slate-500">{isAr ? 'عامل فرز يدوي' : 'manual sorters saved'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? `بفضل GlobalScan 7 و Line Pack، يتطلب الخط فقط ${automatedQcNeeded} مراقبي جودة بدلاً من ${manualWorkersNeeded} عاملاً يدوياً.`
                  : `Automated grading reduces active sorting staff from ${manualWorkersNeeded} down to just ${automatedQcNeeded} QC supervisors.`}
              </p>
            </div>

            {/* Utility Requirements */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                <Droplets className="w-4 h-4" />
                <span>{isAr ? 'المتطلبات الهيدروليكية والطاقة' : 'Utilities & Pneumatics'}</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                {(lanes * 4.5).toFixed(0)}{' '}
                <span className="text-xs font-normal text-slate-500">kW electrical load</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? `ضغط هواء موصى به 6.2 بار مستمر، وتدفق مائي في قنوات التفريغ بمعدل ${(lanes * 25).toFixed(0)} م³/ساعة.`
                  : `Requires 6.2 bar stable compressed air and ${(lanes * 25).toFixed(0)} m³/h hydro-flume recirculation flow.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
