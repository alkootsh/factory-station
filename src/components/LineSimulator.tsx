import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Sparkles,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Radio,
  Zap,
} from 'lucide-react';
import { FRUIT_PROFILES, FruitProfile } from '../data/mafData';

interface SimulatedFruit {
  id: number;
  lane: number;
  progress: number; // 0 to 100% along the line
  fruitType: string;
  weight: number; // in g
  diameter: number; // in mm
  brix: number; // sugar level
  defects: {
    type: 'none' | 'thrips' | 'russeting' | 'hail' | 'uv_mold' | 'low_brix';
    nameAr: string;
    nameEn: string;
  };
  assignedOutlet: number; // 1 to 5
  status: 'conveying' | 'scanning' | 'ejecting' | 'packed';
}

interface LineSimulatorProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const LineSimulator: React.FC<LineSimulatorProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  // Controls state
  const [selectedFruitId, setSelectedFruitId] = useState<string>('citrus_orange');
  const [lanes, setLanes] = useState<number>(4);
  const [speedPerLane, setSpeedPerLane] = useState<number>(12); // cups per sec
  const [minBrixThreshold, setMinBrixThreshold] = useState<number>(10.5);
  const [defectSensitivity, setDefectSensitivity] = useState<'tolerant' | 'standard' | 'strict'>('standard');
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Live telemetry counters
  const [totalFruitsProcessed, setTotalFruitsProcessed] = useState<number>(1420);
  const [outletCounts, setOutletCounts] = useState<number[]>([620, 480, 210, 80, 30]);
  const [lastScannedFruit, setLastScannedFruit] = useState<SimulatedFruit | null>(null);

  // Active simulated fruits on screen
  const [fruitsOnLine, setFruitsOnLine] = useState<SimulatedFruit[]>([]);
  const fruitIdCounter = useRef<number>(2000);
  const animationFrameRef = useRef<number | null>(null);

  const currentFruitProfile: FruitProfile =
    FRUIT_PROFILES.find((f) => f.id === selectedFruitId) || FRUIT_PROFILES[0];

  // Calculated Real-Time Metrics
  const fruitsPerSec = lanes * speedPerLane;
  const avgWeightKg = currentFruitProfile.defaultWeight / 1000;
  const tonsPerHour = (fruitsPerSec * 3600 * avgWeightKg * 0.88) / 1000; // 88% cup filling efficiency
  const totalFruitsSum = outletCounts.reduce((a, b) => a + b, 0);
  const packoutPercentage =
    totalFruitsSum > 0
      ? (((outletCounts[0] + outletCounts[1]) / totalFruitsSum) * 100).toFixed(1)
      : '0.0';
  const rejectPercentage =
    totalFruitsSum > 0 ? ((outletCounts[4] / totalFruitsSum) * 100).toFixed(1) : '0.0';

  // Spawn and update simulated fruits
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // Spawn new fruit
      const randomLane = Math.floor(Math.random() * lanes);
      const isDefectiveRoll = Math.random();
      let defectType: 'none' | 'thrips' | 'russeting' | 'hail' | 'uv_mold' | 'low_brix' = 'none';
      let nameAr = 'خالٍ من العيوب';
      let nameEn = 'Clean Fruit';
      let assignedOutlet = 1;

      // Assign realistic simulated defects
      if (isDefectiveRoll < 0.04) {
        defectType = 'uv_mold';
        nameAr = 'عفن فطري (Viotec UV)';
        nameEn = 'UV Mold Spores';
        assignedOutlet = 5; // Rejection cull
      } else if (isDefectiveRoll < 0.12) {
        defectType = 'low_brix';
        nameAr = 'انخفاض نسبة السكر';
        nameEn = 'Low Sugar / Brix';
        assignedOutlet = 4; // Juice processing
      } else if (isDefectiveRoll < 0.25) {
        defectType = 'thrips';
        nameAr = 'أثر تربس / نمش سطحي';
        nameEn = 'Thrips scarring';
        assignedOutlet = defectSensitivity === 'strict' ? 3 : 2;
      } else if (isDefectiveRoll < 0.55) {
        assignedOutlet = 2; // Cat 1 Standard
      } else {
        assignedOutlet = 1; // Cat 1 Extra Premium
      }

      // Check Brix threshold override
      const simulatedBrix =
        defectType === 'low_brix'
          ? currentFruitProfile.defaultBrix - 3.2
          : currentFruitProfile.defaultBrix + (Math.random() * 2.4 - 1.2);

      if (simulatedBrix < minBrixThreshold && assignedOutlet <= 2) {
        assignedOutlet = 4; // Routed to juice if fails Brix
      }

      const newFruit: SimulatedFruit = {
        id: fruitIdCounter.current++,
        lane: randomLane,
        progress: 0,
        fruitType: currentFruitProfile.name,
        weight: Math.round(currentFruitProfile.defaultWeight + (Math.random() * 30 - 15)),
        diameter: Math.round(currentFruitProfile.defaultDiameter + (Math.random() * 10 - 5)),
        brix: Number(simulatedBrix.toFixed(1)),
        defects: { type: defectType, nameAr, nameEn },
        assignedOutlet,
        status: 'conveying',
      };

      setFruitsOnLine((prev) => [...prev.slice(-25), newFruit]);
    }, 450);

    return () => clearInterval(interval);
  }, [isRunning, lanes, speedPerLane, currentFruitProfile, minBrixThreshold, defectSensitivity]);

  // Animation progress loop
  useEffect(() => {
    if (!isRunning) return;

    const step = () => {
      setFruitsOnLine((prev) => {
        const nextList: SimulatedFruit[] = [];

        prev.forEach((fruit) => {
          const nextProgress = fruit.progress + 1.2;

          // When passing through vision chamber at progress ~50%
          if (fruit.progress < 50 && nextProgress >= 50) {
            setLastScannedFruit(fruit);
          }

          // When reaching ejection zone
          if (nextProgress >= 95) {
            // increment counter
            setTotalFruitsProcessed((c) => c + 1);
            setOutletCounts((counts) => {
              const updated = [...counts];
              updated[fruit.assignedOutlet - 1] += 1;
              return updated;
            });
          } else {
            nextList.push({ ...fruit, progress: nextProgress });
          }
        });

        return nextList;
      });

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRunning]);

  const handleReset = () => {
    setTotalFruitsProcessed(0);
    setOutletCounts([0, 0, 0, 0, 0]);
    setFruitsOnLine([]);
    setLastScannedFruit(null);
  };

  return (
    <div className="space-y-8">
      {/* Header and Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider">
            <span>{isAr ? 'محاكي خط الفرز الإلكتروني' : 'Interactive Sizing Line Simulator'}</span>
            <span aria-hidden="true">·</span>
            <span>POMONE IV & GLOBALSCAN 7</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {isAr ? 'المحاكي الحي لحركة وثمار خط الفرز' : 'Live Agrobotic Sizing Line Simulator'}
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>{isAr ? 'إيقاف مؤقت' : 'Pause Line'}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isAr ? 'تشغيل الخط' : 'Resume Line'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors border border-slate-200"
            title={isAr ? 'تصفير العدادات' : 'Reset Counters'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Control Configuration Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 text-xs">
        {/* Fruit Selection */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700">
            {isAr ? 'نوع المحصول / الثمرة' : 'Produce Type'}
          </label>
          <select
            value={selectedFruitId}
            onChange={(e) => setSelectedFruitId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500"
          >
            {FRUIT_PROFILES.map((f) => (
              <option key={f.id} value={f.id}>
                {isAr ? f.nameAr : f.name}
              </option>
            ))}
          </select>
        </div>

        {/* Lanes Count */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-semibold text-slate-700">
            <span>{isAr ? 'عدد الحارات (Lanes)' : 'Sizer Lanes'}</span>
            <span className="font-mono text-emerald-600 font-bold">{lanes} Lanes</span>
          </div>
          <input
            type="range"
            min="2"
            max="10"
            step="2"
            value={lanes}
            onChange={(e) => setLanes(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        {/* Speed in cups/sec */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-semibold text-slate-700">
            <span>{isAr ? 'سرعة السير (كوب/ث/حارة)' : 'Speed (cups/s/lane)'}</span>
            <span className="font-mono text-emerald-600 font-bold">{speedPerLane} cups/s</span>
          </div>
          <input
            type="range"
            min="6"
            max="15"
            step="1"
            value={speedPerLane}
            onChange={(e) => setSpeedPerLane(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        {/* Brix Threshold */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-semibold text-slate-700">
            <span>{isAr ? 'حد السكر الأدنى للتصدير' : 'Min Brix Threshold'}</span>
            <span className="font-mono text-amber-600 font-bold">{minBrixThreshold} °Bx</span>
          </div>
          <input
            type="range"
            min="8.0"
            max="14.0"
            step="0.5"
            value={minBrixThreshold}
            onChange={(e) => setMinBrixThreshold(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Defect Sensitivity */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700">
            {isAr ? 'حساسية فرز العيوب (AI Strictness)' : 'Defect Strictness'}
          </label>
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {(['tolerant', 'standard', 'strict'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDefectSensitivity(level)}
                className={`flex-1 py-1 text-center font-medium rounded transition-colors ${
                  defectSensitivity === level
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {level === 'tolerant'
                  ? isAr
                    ? 'مرن'
                    : 'Tolerant'
                  : level === 'standard'
                  ? isAr
                    ? 'قياسي'
                    : 'Standard'
                  : isAr
                  ? 'تصدير صارم'
                  : 'Strict'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500">{isAr ? 'الطاقة الإنتاجية اللحظية' : 'Line Flow Rate'}</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {tonsPerHour.toFixed(1)} <span className="text-xs font-normal text-slate-500">{isAr ? 'طن/ساعة' : 'T/hr'}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {fruitsPerSec} {isAr ? 'حبة/ثانية مارة' : 'fruits/second'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500">{isAr ? 'إجمالي الثمار المفروزة' : 'Total Fruits Processed'}</div>
          <div className="text-2xl font-bold text-emerald-600 font-mono tabular-nums mt-1">
            {totalFruitsProcessed.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {isAr ? 'تحديث فوري بالـ PLC' : 'Real-time PLC drop count'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500">{isAr ? 'نسبة الصالح للتصدير (Pack-out)' : 'Export Pack-out'}</div>
          <div className="text-2xl font-bold text-teal-600 font-mono tabular-nums mt-1">
            {packoutPercentage}%
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {isAr ? 'صنف ممتاز أول وثاني' : 'Class 1 Extra & Standard'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500">{isAr ? 'نسبة العادم والمرفوض (Cull)' : 'Rejection / Cull Rate'}</div>
          <div className="text-2xl font-bold text-rose-600 font-mono tabular-nums mt-1">
            {rejectPercentage}%
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {isAr ? 'كشف العفن والتشققات' : 'Viotec & structural rot'}
          </div>
        </div>
      </div>

      {/* Main Interactive Machine Diagram & Conveyor Simulation */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-6">
        {/* Conveyor Station Stages Breadcrumbs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400 overflow-x-auto gap-4 no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0 text-slate-300">
            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-emerald-400 font-bold">1</span>
            <span>{isAr ? 'حوض التفريغ المائي' : 'Water Infeed Flume'}</span>
          </div>
          <span className="text-slate-600">→</span>
          <div className="flex items-center gap-1.5 shrink-0 text-slate-300">
            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-emerald-400 font-bold">2</span>
            <span>{isAr ? 'التجفيف والفرش' : 'Drying & Brushing'}</span>
          </div>
          <span className="text-slate-600">→</span>
          <div className="flex items-center gap-1.5 shrink-0 text-emerald-400 font-semibold">
            <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-[10px]">3</span>
            <span>{isAr ? 'كؤوس بومون والوزن' : 'Pomone Roller Cups'}</span>
          </div>
          <span className="text-slate-600">→</span>
          <div className="flex items-center gap-1.5 shrink-0 text-teal-400 font-semibold">
            <span className="w-5 h-5 rounded-full bg-teal-950 border border-teal-500/40 flex items-center justify-center text-[10px]">4</span>
            <span>{isAr ? 'كاميرات GlobalScan 7' : 'GlobalScan 7 Vision'}</span>
          </div>
          <span className="text-slate-600">→</span>
          <div className="flex items-center gap-1.5 shrink-0 text-amber-400 font-semibold">
            <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-500/40 flex items-center justify-center text-[10px]">5</span>
            <span>{isAr ? 'فحص السكر Insight NIR' : 'Insight NIR Brix'}</span>
          </div>
          <span className="text-slate-600">→</span>
          <div className="flex items-center gap-1.5 shrink-0 text-indigo-400 font-semibold">
            <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-[10px]">6</span>
            <span>{isAr ? 'الطرد وصواني الروبوت' : 'Pneumatic Drop & Robot'}</span>
          </div>
        </div>

        {/* Visual Simulated Conveyor Floor */}
        <div className="relative h-64 sm:h-72 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          {/* Conveyor Belt Background Grid Lines */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'linear-gradient(90deg, #38bdf8 1px, transparent 1px), linear-gradient(#38bdf8 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Machine Section Bounding Overlays */}
          {/* Infeed Flume zone: 0% to 20% */}
          <div className="absolute top-0 bottom-0 start-0 w-[20%] border-e border-slate-800 bg-sky-950/20 flex flex-col justify-between p-2 pointer-events-none">
            <span className="text-[10px] font-mono text-sky-400/80 uppercase">Infeed Flume</span>
            <span className="text-[9px] text-slate-500">{isAr ? 'تغذية مائية' : 'Hydro feed'}</span>
          </div>

          {/* Pomone Cup Sizer zone: 20% to 42% */}
          <div className="absolute top-0 bottom-0 start-[20%] w-[22%] border-e border-slate-800 bg-emerald-950/15 flex flex-col justify-between p-2 pointer-events-none">
            <span className="text-[10px] font-mono text-emerald-400/80 uppercase">POMONE Cups</span>
            <span className="text-[9px] text-slate-500">{isAr ? 'دوران 360°' : '360° Rotation'}</span>
          </div>

          {/* Optical Vision Cabin: 42% to 65% (Active Strobe Zone) */}
          <div className="absolute top-0 bottom-0 start-[42%] w-[23%] border-e border-slate-800 bg-slate-900/90 flex flex-col justify-between p-2 pointer-events-none z-10 border-s-2 border-e-2 border-emerald-500/30">
            <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
              <span className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>GlobalScan 7</span>
              </span>
              <span className="text-amber-400 font-mono">NIR+UV</span>
            </div>
            {/* Visual Strobe flash simulation indicator */}
            <div className="w-full h-8 bg-gradient-to-b from-white/10 via-emerald-400/10 to-transparent rounded border-t border-emerald-400/30 flex items-center justify-center">
              <span className="text-[9px] font-mono text-emerald-300">40-60 Views/Fruit</span>
            </div>
            <span className="text-[9px] text-slate-400 text-center">
              {isAr ? 'حجرة الكاميرات المتعددة' : 'Multispectral Camera Box'}
            </span>
          </div>

          {/* Solenoid Ejector & Outlets Zone: 65% to 100% */}
          <div className="absolute top-0 bottom-0 start-[65%] end-0 bg-slate-900/40 flex flex-col justify-between p-2 pointer-events-none">
            <span className="text-[10px] font-mono text-indigo-400/80 uppercase">Solenoid Drops & Line Pack</span>
            <div className="grid grid-cols-5 gap-1 text-[8px] text-slate-400 text-center font-mono pt-4">
              <div className="border border-emerald-500/30 bg-emerald-950/40 rounded p-0.5 text-emerald-300">Out 1: Extra</div>
              <div className="border border-teal-500/30 bg-teal-950/40 rounded p-0.5 text-teal-300">Out 2: Std</div>
              <div className="border border-blue-500/30 bg-blue-950/40 rounded p-0.5 text-blue-300">Out 3: Local</div>
              <div className="border border-amber-500/30 bg-amber-950/40 rounded p-0.5 text-amber-300">Out 4: Juice</div>
              <div className="border border-rose-500/30 bg-rose-950/40 rounded p-0.5 text-rose-300">Out 5: Cull</div>
            </div>
            <span className="text-[9px] text-slate-500">{isAr ? 'مخارج الفرز والتعبئة' : 'Packaging Outlets'}</span>
          </div>

          {/* Conveyor Belts (Render lanes horizontally) */}
          <div className="absolute inset-y-10 inset-x-0 flex flex-col justify-around py-2">
            {Array.from({ length: lanes }).map((_, laneIdx) => (
              <div
                key={laneIdx}
                className="relative h-7 bg-slate-800/80 border-y border-slate-700/60 flex items-center"
              >
                <div className="absolute start-2 text-[9px] font-mono text-slate-400">
                  L{laneIdx + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Active Animated Fruit Items Moving on Belt */}
          {fruitsOnLine.map((fruit) => {
            const laneTopPercent = 16 + (fruit.lane / lanes) * 64;
            const getFruitColor = (fId: string) => {
              const colorMap: Record<string, string> = {
                citrus_orange: '#f97316',
                citrus_mandarin: '#ea580c',
                citrus_lemon: '#eab308',
                citrus_grapefruit: '#f43f5e',
                apple_gala: '#ef4444',
                apple_golden: '#facc15',
                pear: '#a3e635',
                dates_medjool: '#78350f',
                dates_barhi: '#ca8a04',
                mango: '#f59e0b',
                pomegranate: '#be123c',
                avocado_hass: '#365314',
                peach: '#fb923c',
                apricot: '#f97316',
                plum: '#701a75',
                cherry: '#881337',
                tomato: '#dc2626',
                bell_pepper: '#16a34a',
                strawberry: '#e11d48',
                kiwi: '#65a30d',
                onion: '#b45309',
                potato: '#a16207',
              };
              return colorMap[fId] || '#f97316';
            };

            const fruitColor = getFruitColor(selectedFruitId);
            const isInsideVision = fruit.progress >= 42 && fruit.progress <= 65;

            return (
              <div
                key={fruit.id}
                className="absolute transition-all duration-75 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  top: `${laneTopPercent}%`,
                  left: `${fruit.progress}%`,
                  zIndex: isInsideVision ? 25 : 5,
                }}
              >
                {/* Fruit circle representation */}
                <div
                  className="w-5 h-5 rounded-full shadow-md flex items-center justify-center text-[8px] font-bold text-white relative transition-transform"
                  style={{
                    backgroundColor: fruitColor,
                    boxShadow: isInsideVision ? '0 0 10px #34d399' : 'none',
                    border: fruit.defects.type === 'uv_mold' ? '2px solid #a855f7' : '1px solid rgba(255,255,255,0.4)',
                  }}
                >
                  {/* Subtle shine / blush spot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40 absolute top-0.5 start-0.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Scanned Fruit Telemetry HUD (What GlobalScan & Insight just analyzed) */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="space-y-0.5">
            <div className="text-[10px] text-slate-400 uppercase font-mono">
              {isAr ? 'آخر فحص ليزري/بصري' : 'Last Scanned Unit'}
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>{lastScannedFruit ? `${currentFruitProfile.name} #${lastScannedFruit.id}` : 'Scanning...'}</span>
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-[10px] text-slate-400 uppercase font-mono">
              {isAr ? 'القطر والوزن المقاس' : 'Weight & Caliber'}
            </div>
            <div className="text-sm font-semibold text-emerald-400 font-mono tabular-nums">
              {lastScannedFruit ? `${lastScannedFruit.diameter} mm · ${lastScannedFruit.weight} g` : '-- mm · -- g'}
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-[10px] text-slate-400 uppercase font-mono">
              {isAr ? 'مقياس السكر Insight NIR' : 'Insight NIR Brix'}
            </div>
            <div className="text-sm font-semibold text-amber-400 font-mono tabular-nums">
              {lastScannedFruit ? `${lastScannedFruit.brix} °Bx` : '--.- °Bx'}
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-[10px] text-slate-400 uppercase font-mono">
              {isAr ? 'توجيه المخرج (PLC Routing)' : 'Assigned Outlet Drop'}
            </div>
            <div className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-200 inline-block border border-slate-700">
              {lastScannedFruit
                ? isAr
                  ? currentFruitProfile.outlets[lastScannedFruit.assignedOutlet - 1]?.nameAr
                  : currentFruitProfile.outlets[lastScannedFruit.assignedOutlet - 1]?.name
                : 'Evaluating...'}
            </div>
          </div>
        </div>
      </div>

      {/* Outlet Breakdown Cards */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900">
          {isAr ? 'توزيع مخارج الفرز والتعبئة (Packhouse Outlets)' : 'Sorting Channel Distribution'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {currentFruitProfile.outlets.map((outlet, idx) => {
            const count = outletCounts[idx];
            const pct = totalFruitsSum > 0 ? ((count / totalFruitsSum) * 100).toFixed(1) : '0';

            return (
              <div
                key={outlet.name}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-slate-500 font-mono text-[11px]">
                    <span>Outlet {idx + 1}</span>
                    <span className="font-bold text-slate-900">{pct}%</span>
                  </div>
                  <div className="font-bold text-slate-900 mt-1">
                    {isAr ? outlet.nameAr : outlet.name}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {isAr ? outlet.criteriaAr : outlet.name}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{isAr ? 'الكمية المفروزة:' : 'Count:'}</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">{count.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comprehensive Line Lifecycle: What happens to the product at every stage */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-xs font-bold mb-2">
            {isAr ? '🏭 دورة حياة المنتج المتكاملة في المنظومة' : 'End-to-End Packhouse Industrial Workflow'}
          </div>
          <h3 className="text-xl font-bold text-white">
            {isAr ? 'ماذا يحدث للمنتج بالضبط في كل مرحلة على الشاشة؟' : 'What Happens to the Product at Each Stage?'}
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            {isAr
              ? 'البرنامج يتحكم بصرياً ورقمياً في جميع مراحل خط الإنتاج من لحظة وصول الصناديق وحتى التحزيم والبالتات.'
              : 'Complete SCADA & PLC supervision from bin receiving to final pallet dispatch.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-xs">
          {/* Stage 1: Receiving */}
          <div className="bg-slate-950 p-4 rounded-xl border border-sky-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-xs">1</span>
              <span className="text-[10px] font-mono text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/20">0% - 15%</span>
            </div>
            <h4 className="font-bold text-sm text-white">{isAr ? '1. الاستلام والتفريغ (Receiving)' : '1. Bin Tipping & Infeed'}</h4>
            <p className="text-slate-400 leading-relaxed">
              {isAr
                ? 'تفريغ هيدروليكي ناعم للصناديق في تيار مائي مبرد (Hydro-Flume) أو سيور مبطنة، لمنع الصدمات وتكسير خلايا الثمار.'
                : 'Gentle hydraulic tipping into chilled water flumes to eliminate mechanical shock.'}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-sky-300 font-mono">
              {isAr ? 'التحكم: ميزان الدفعة + حساس منسوب المياه' : 'Sensors: Load cell + Flume level'}
            </div>
          </div>

          {/* Stage 2: Washing */}
          <div className="bg-slate-950 p-4 rounded-xl border border-teal-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-xs">2</span>
              <span className="text-[10px] font-mono text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/20">15% - 30%</span>
            </div>
            <h4 className="font-bold text-sm text-white">{isAr ? '2. الغسيل والتعقيم (Washing)' : '2. Wash & Sanitation'}</h4>
            <p className="text-slate-400 leading-relaxed">
              {isAr
                ? 'مرور الثمار تحت رشاشات مياه معالجة بالأوزون أو الكلور وفلاتر دوارة لإزالة الأتربة ورواسب البساتين وتطهير القشرة.'
                : 'High-pressure ozonated spray bars and filtration beds disinfect the fruit skin.'}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-teal-300 font-mono">
              {isAr ? 'التحكم: مضخات التدوير + حساس حرارة PT100' : 'Sensors: Pump relays + PT100 RTD'}
            </div>
          </div>

          {/* Stage 3: Brushing & Waxing */}
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">3</span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/20">30% - 42%</span>
            </div>
            <h4 className="font-bold text-sm text-white">{isAr ? '3. التجفيف والتلميع والتشميع' : '3. Brushing & Waxing'}</h4>
            <p className="text-slate-400 leading-relaxed">
              {isAr
                ? 'فرش ناعمة دوارة لتلميع القشرة، نفق هواء دافئ لتجفيف الرطوبة، وحقن شمع غذائي واقٍ لحبس العصارة وإطالة العمر التصديري.'
                : 'Soft revolving brushes, warm air drying tunnel, and controlled food-grade wax application.'}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-300 font-mono">
              {isAr ? 'التحكم: سرعة الفرش + منظم حرارة المجفف' : 'Sensors: VFD inverters + Wax dosing'}
            </div>
          </div>

          {/* Stage 4: Singulation & Dynamic Weight */}
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">4</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">42% - 50%</span>
            </div>
            <h4 className="font-bold text-sm text-white">{isAr ? '4. التفريد والوزن الديناميكي اللحظي' : '4. Dynamic Weighing'}</h4>
            <p className="text-slate-400 leading-relaxed">
              {isAr
                ? 'فصل الحبات لتستقر كل ثمرة منفردة على كأس دوار (Roller Cup)، ووزن الحبة أثناء الحركة بدقة ±0.5 جم وبمعدل 200 هرتز.'
                : 'Singulation onto biconical cups with 3-point in-motion load cells measuring weight (±0.5g).'}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-300 font-mono">
              {isAr ? 'التحكم: كارت خلايا الوزن 24-bit ADC' : 'Sensors: Load cells + Tare offset'}
            </div>
          </div>

          {/* Stage 5: Vision & Internal Quality */}
          <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-xs">5</span>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/20">50% - 65%</span>
            </div>
            <h4 className="font-bold text-sm text-white">{isAr ? '5. الفحص البصري والذكاء الاصطناعي' : '5. AI Vision & NIR'}</h4>
            <p className="text-slate-400 leading-relaxed">
              {isAr
                ? 'دوران 360° تحت كاميرات GlobalScan 7 لالتقاط 60 صورة ملونة وNIR، كشف أثر التربس والعفن بالأشعة UV، وقياس السكرية Brix.'
                : '360° rotation with 60 HD RGB+NIR views. AI detects thrips, hail scars, UV mold, and internal browning.'}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-purple-300 font-mono">
              {isAr ? 'التحكم: كاميرات GigE + مطياف NIR + إنكودر' : 'Sensors: 4K GigE + Specim NIR'}
            </div>
          </div>

          {/* Stage 6: Pneumatic Ejection */}
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs">6</span>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">65% - 85%</span>
            </div>
            <h4 className="font-bold text-sm text-white">{isAr ? '6. الطرد وتوزيع الدرجات (Sorting)' : '6. Pneumatic Ejection'}</h4>
            <p className="text-slate-400 leading-relaxed">
              {isAr
                ? 'حساب موضع الحبة عبر إنكودر السرعة، وفتح بوابات الهواء فائقة السرعة (Solenoid 6.5 بار) لإنزال الثمرة برفق في مسارها المحدد.'
                : 'High-speed air puffs trigger at millisecond precision to route produce to designated outlets.'}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-indigo-300 font-mono">
              {isAr ? 'التحكم: كارت MOSFET فائق السرعة 200µs' : 'Sensors: High-speed encoder sync'}
            </div>
          </div>

          {/* Stage 7: Packaging & Labeling */}
          <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-xs">7</span>
              <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/20">85% - 100%</span>
            </div>
            <h4 className="font-bold text-sm text-white">{isAr ? '7. التعبئة والروبوتات والباركود' : '7. Packaging & Labeling'}</h4>
            <p className="text-slate-400 leading-relaxed">
              {isAr
                ? 'التقاط آلي بأذرع روبوت دلتا في صواني كرتون، طباعة ملصق كود التتبع GS1-128، وتاريخ الصلاحية بنفث الحبر TIJ، وميزان الكرتونة النهائي.'
                : 'Delta robots pack fruit into carton trays, Zebra prints GS1 labels, TIJ codes batch & expiry.'}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-rose-300 font-mono">
              {isAr ? 'التحكم: طابعات ZPL + روبوت Delta + ميزان كرتون' : 'Sensors: Zebra ZT411 + End Checkweigher'}
            </div>
          </div>

          {/* Stage 8: Financial ERP Integration */}
          <div className="bg-slate-950 p-4 rounded-xl border border-yellow-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 font-bold flex items-center justify-center text-xs">8</span>
              <span className="text-[10px] font-mono text-yellow-400 bg-yellow-950/60 px-2 py-0.5 rounded border border-yellow-500/20">ERP & Tax</span>
            </div>
            <h4 className="font-bold text-sm text-white">{isAr ? '8. المحاسبة وخصم المخزون والضريبة' : '8. Accounting & Stock ERP'}</h4>
            <p className="text-slate-400 leading-relaxed">
              {isAr
                ? 'توليد تلقائي لقيود اليومية وفواتير التصدير والبيع، احتساب ضريبة القيمة المضافة 14%، وتحديث رصيد المخزون لحظياً مثل Dexef.'
                : 'Automated invoices, 14% VAT calculation, stock ledger deduction, and cost-of-goods tracking.'}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-yellow-300 font-mono">
              {isAr ? 'النظام: قاعدة بيانات SQLite + قيود مالية' : 'Engine: Invoices + Stock Ledger'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
