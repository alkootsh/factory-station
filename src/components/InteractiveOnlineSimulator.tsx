import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Sparkles, Terminal, Camera, Sliders, Box, Layers } from 'lucide-react';
import { FRUIT_PROFILES } from '../data/mafData';

interface InteractiveOnlineSimulatorProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

interface SlicedFruitItem {
  id: number;
  cropId: string;
  cropName: string;
  diameter: number;
  brix: number;
  defectScore: number;
  grade: string;
  outlet: number;
  status: 'inspecting' | 'sorted';
}

export const InteractiveOnlineSimulator: React.FC<InteractiveOnlineSimulatorProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [selectedCrop, setSelectedCrop] = useState<string>('citrus_orange');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [conveyorSpeed, setConveyorSpeed] = useState<number>(5); // items per sec speed
  const [minBrix, setMinBrix] = useState<number>(10.5);

  const [simulatedFruits, setSimulatedFruits] = useState<SlicedFruitItem[]>([]);
  const [recentSorted, setRecentSorted] = useState<SlicedFruitItem[]>([]);
  const [totalSortedCount, setTotalSortedCount] = useState<number>(128);
  const [outletStats, setOutletStats] = useState<{ [key: number]: number }>({ 1: 72, 2: 36, 3: 14, 4: 6 });

  const activeProfile = FRUIT_PROFILES.find((f) => f.id === selectedCrop) || FRUIT_PROFILES[0];

  // Live simulation loop running right here in the browser window
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const brixVal = Number((activeProfile.defaultBrix + (Math.random() * 2 - 1)).toFixed(1));
      const diameterVal = Math.round(activeProfile.defaultDiameter + (Math.random() * 8 - 4));
      const defectVal = Number((Math.random() * 10).toFixed(1));

      // Sorting logic
      let assignedOutlet = 1;
      let assignedGrade = isAr ? 'صنف 1 ممتاز (Extra)' : 'Class 1 Extra';

      if (defectVal > 6.0) {
        assignedOutlet = 4;
        assignedGrade = isAr ? 'مرفوض / عفن (Cull/Reject)' : 'Reject / Cull';
      } else if (brixVal < minBrix) {
        assignedOutlet = 3;
        assignedGrade = isAr ? 'تصنيع عصير (Juice)' : 'Juice Processing';
      } else if (defectVal > 3.0) {
        assignedOutlet = 2;
        assignedGrade = isAr ? 'صنف 2 قياسي (Standard)' : 'Class 2 Standard';
      }

      const newItem: SlicedFruitItem = {
        id: Date.now(),
        cropId: activeProfile.id,
        cropName: isAr ? activeProfile.nameAr : activeProfile.name,
        diameter: diameterVal,
        brix: brixVal,
        defectScore: defectVal,
        grade: assignedGrade,
        outlet: assignedOutlet,
        status: 'sorted'
      };

      setTotalSortedCount((c) => c + 1);
      setOutletStats((prev) => ({ ...prev, [assignedOutlet]: (prev[assignedOutlet] || 0) + 1 }));
      setRecentSorted((prev) => [newItem, ...prev.slice(0, 5)]);
    }, 1200);

    return () => clearInterval(interval);
  }, [isRunning, activeProfile, minBrix, isAr]);

  const handleResetSimulator = () => {
    setTotalSortedCount(0);
    setOutletStats({ 1: 0, 2: 0, 3: 0, 4: 0 });
    setRecentSorted([]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'تشغيل واختبار البرنامج أمامك مباشرة (Live Web Simulator)' : 'Live Online Program Execution & Simulation'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'تجربة برنامج الفرز الذكي وتصنيف الثمار حياً على الشاشة' : 'Live Interactive Sorting Program Running in Browser'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'من عيونك! هذا البرنامج يعمل الآن أمامك مباشرة في المتصفح بكل تفاصيله: محاكاة الكاميرا، فحص السكر، قياس الأقطار، وتوجيه الثمار إلى المخارج لحظياً.'
            : 'Here is the running program right in front of you! Watch live camera inspection, brix measurement, and automatic outlet sorting.'}
        </p>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-xs">
        <div className="space-y-1">
          <label className="font-semibold text-slate-700">{isAr ? 'اختر المحصول للتجربة الحية' : 'Select Crop for Live Test'}</label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900"
          >
            {FRUIT_PROFILES.map((f) => (
              <option key={f.id} value={f.id}>
                {isAr ? f.nameAr : f.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between font-semibold text-slate-700">
            <span>{isAr ? 'حد البريكس الأدنى' : 'Min Brix Threshold'}</span>
            <span className="font-mono text-amber-600 font-bold">{minBrix} °Bx</span>
          </div>
          <input
            type="range"
            min="8.0"
            max="14.0"
            step="0.5"
            value={minBrix}
            onChange={(e) => setMinBrix(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="font-semibold text-slate-700">{isAr ? 'حالة السيرفر والبرنامج' : 'Program Status'}</div>
          <div className="flex items-center gap-2 pt-1">
            <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <span className="font-mono font-bold text-slate-800">{isRunning ? (isAr ? 'يعمل بثبات (Running 60 FPS)' : 'Active (60 FPS)') : (isAr ? 'متوقف' : 'Paused')}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-4 md:pt-0">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5 ${
              isRunning ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? (isAr ? 'إيقاف مؤقت' : 'Pause') : (isAr ? 'تشغيل' : 'Start')}</span>
          </button>
          <button
            onClick={handleResetSimulator}
            className="p-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-100"
            title={isAr ? 'تصفير العدادات' : 'Reset'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Live Visualizing Screen & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Live Camera Viewport Simulation */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl text-white space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-b border-slate-800 pb-3">
            <span className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>IP Camera RTSP Stream (Active)</span>
            </span>
            <span className="text-emerald-400">Total Sorted: {totalSortedCount}</span>
          </div>

          <div className="relative w-full h-80 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
            {/* Background Conveyor animation lines */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(90deg, #38bdf8 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Live Inspection Display */}
            {recentSorted.length > 0 && (
              <div className="relative z-10 flex flex-col items-center space-y-3 animate-fade-in">
                <div
                  className="w-32 h-32 rounded-full shadow-2xl flex items-center justify-center border-4 border-emerald-400/80 relative"
                  style={{
                    background: selectedCrop === 'citrus_orange'
                      ? 'radial-gradient(circle at 35% 35%, #fb923c, #ea580c 70%, #9a3412)'
                      : selectedCrop === 'apple_gala'
                      ? 'radial-gradient(circle at 35% 35%, #f87171, #dc2626 65%, #991b1b)'
                      : 'radial-gradient(circle at 35% 35%, #65a30d, #4d7c0f 65%, #1a2e05)'
                  }}
                >
                  <div className="absolute inset-2 rounded-full border border-dashed border-white/60 flex items-center justify-center">
                    <span className="bg-slate-950/80 px-2 py-0.5 rounded text-[11px] font-mono text-cyan-300">
                      Ø {recentSorted[0].diameter} mm
                    </span>
                  </div>
                </div>

                <div className="text-center space-y-0.5 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800 backdrop-blur-sm">
                  <div className="text-xs font-bold text-white">{recentSorted[0].cropName}</div>
                  <div className="text-xs text-amber-400 font-mono font-bold">{recentSorted[0].brix} °Bx · Defect: {recentSorted[0].defectScore}%</div>
                  <div className="text-xs text-emerald-400 font-bold">{recentSorted[0].grade} → Outlet #{recentSorted[0].outlet}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Outlet Distribution & Live Log Stream */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {isAr ? 'إحصائيات مخارج الفرز لحظياً (Outlet Distribution)' : 'Live Outlet Distribution'}
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-900">{isAr ? 'مخرج 1: صنف ممتاز أول (Extra)' : 'Outlet 1: Class 1 Extra'}</div>
                  <div className="text-[11px] text-emerald-700">{isAr ? 'تصدير جوي وبحري فاخر' : 'Premium export'}</div>
                </div>
                <div className="text-lg font-bold font-mono text-emerald-800">{outletStats[1] || 0}</div>
              </div>

              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-teal-900">{isAr ? 'مخرج 2: صنف ثاني (Standard)' : 'Outlet 2: Class 2 Standard'}</div>
                  <div className="text-[11px] text-teal-700">{isAr ? 'سوق محلي وتصدير قياسي' : 'Domestic market'}</div>
                </div>
                <div className="text-lg font-bold font-mono text-teal-800">{outletStats[2] || 0}</div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-amber-900">{isAr ? 'مخرج 3: تصنيع عصير (Juice)' : 'Outlet 3: Juice Processing'}</div>
                  <div className="text-[11px] text-amber-700">{isAr ? 'ثمار منخفضة السكر' : 'Low brix fruits'}</div>
                </div>
                <div className="text-lg font-bold font-mono text-amber-800">{outletStats[3] || 0}</div>
              </div>

              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-rose-900">{isAr ? 'مخرج 4: مرفوض / عفن (Cull)' : 'Outlet 4: Cull / Reject'}</div>
                  <div className="text-[11px] text-rose-700">{isAr ? 'عزل العفن والتشققات' : 'Defect / Mold cull'}</div>
                </div>
                <div className="text-lg font-bold font-mono text-rose-800">{outletStats[4] || 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
