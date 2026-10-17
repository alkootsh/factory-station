import React, { useState } from 'react';
import { Eye, Zap, ShieldAlert, Sparkles, Filter, CheckCircle2, XCircle } from 'lucide-react';
import { FRUIT_PROFILES } from '../data/mafData';

interface OpticalVisionLabProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const OpticalVisionLab: React.FC<OpticalVisionLabProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [selectedFruit, setSelectedFruit] = useState<string>('citrus_orange');
  const [visionMode, setVisionMode] = useState<'rgb' | 'globalscan_ai' | 'insight_nir' | 'viotec_uv'>('globalscan_ai');
  const [minBrixCutoff, setMinBrixCutoff] = useState<number>(10.5);
  const [minBlushCutoff, setMinBlushCutoff] = useState<number>(70);
  const [defectTolerance, setDefectTolerance] = useState<number>(5); // max allowable defect % area

  const currentProfile = FRUIT_PROFILES.find((f) => f.id === selectedFruit) || FRUIT_PROFILES[0];

  // Simulated live inspection sample attributes with fallback for all 20+ crops
  const sampleMap: Record<string, any> = {
    citrus_orange: {
      name: isAr ? 'برتقال فالنسيا - عينة فحص #482' : 'Valencia Orange - Sample #482',
      measuredCaliber: 78.4,
      measuredWeight: 188,
      measuredBrix: 11.2,
      measuredBlush: 84,
      measuredDefectArea: 3.8,
      detectedDefects: [
        { nameAr: 'أثر تربس خفيف (Thrips)', nameEn: 'Slight thrips silvering', tech: 'GlobalScan 7', severity: 'minor' },
        { nameAr: 'توزيع سكر ممتاز', nameEn: 'Uniform sugar distribution', tech: 'Insight NIR', severity: 'nominal' },
      ],
      uvFluorescenceDetected: false,
    },
    apple_gala: {
      name: isAr ? 'تفاح جالا - عينة فحص #119' : 'Gala Apple - Sample #119',
      measuredCaliber: 74.2,
      measuredWeight: 172,
      measuredBrix: 13.6,
      measuredBlush: 78,
      measuredDefectArea: 1.2,
      detectedDefects: [
        { nameAr: 'صدأ قشري خفيف حول العنق (Russeting)', nameEn: 'Slight stem russeting', tech: 'GlobalScan 7', severity: 'minor' },
        { nameAr: 'خالٍ من الاسمرار الداخلي', nameEn: 'Zero internal browning', tech: 'Insight NIR', severity: 'nominal' },
      ],
      uvFluorescenceDetected: false,
    },
    dates_medjool: {
      name: isAr ? 'تمر مجهول - عينة فحص #903' : 'Medjool Date - Sample #903',
      measuredCaliber: 35.8,
      measuredWeight: 24.6,
      measuredBrix: 63.8,
      measuredBlush: 95,
      measuredDefectArea: 2.1,
      detectedDefects: [
        { nameAr: 'انفصال قشرة طفيف < 4% (Skin Separation)', nameEn: 'Minimal skin puffiness', tech: 'GlobalScan 7', severity: 'minor' },
        { nameAr: 'رطوبة مثالية 23% مطابقة للمواصفات', nameEn: 'Optimal 23% moisture content', tech: 'Insight NIR', severity: 'nominal' },
      ],
      uvFluorescenceDetected: false,
    },
    avocado_hass: {
      name: isAr ? 'أفوكادو هاس - عينة فحص #651' : 'Hass Avocado - Sample #651',
      measuredCaliber: 69.5,
      measuredWeight: 212,
      measuredBrix: 23.8, // dry matter %
      measuredBlush: 90,
      measuredDefectArea: 6.4,
      detectedDefects: [
        { nameAr: 'خدوش احتكاك ريح طفيفة', nameEn: 'Wind scarring on skin', tech: 'GlobalScan 7', severity: 'minor' },
        { nameAr: 'مادة جافة 23.8% (مكتمل النضج)', nameEn: '23.8% Dry matter', tech: 'Insight NIR', severity: 'nominal' },
      ],
      uvFluorescenceDetected: false,
    },
  };

  const sampleData = sampleMap[selectedFruit] || {
    name: isAr ? `${currentProfile.nameAr} - عينة فحص #312` : `${currentProfile.name} - Sample #312`,
    measuredCaliber: currentProfile.defaultDiameter + 1.2,
    measuredWeight: currentProfile.defaultWeight + 4,
    measuredBrix: currentProfile.defaultBrix,
    measuredBlush: 86,
    measuredDefectArea: 2.2,
    detectedDefects: currentProfile.commonDefects.slice(0, 2).map((d) => ({
      nameAr: d.nameAr,
      nameEn: d.name,
      tech: d.detectionTech,
      severity: d.severity === 'critical' ? 'critical' : 'minor'
    })),
    uvFluorescenceDetected: false,
  };

  // Determine automated decision based on sliders
  const passesBrix = sampleData.measuredBrix >= minBrixCutoff;
  const passesBlush = sampleData.measuredBlush >= minBlushCutoff;
  const passesDefect = sampleData.measuredDefectArea <= defectTolerance;
  const isExportGrade = passesBrix && passesBlush && passesDefect && !sampleData.uvFluorescenceDetected;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'مختبر الفحص البصري والتحليل الطيفي' : 'Multispectral Vision & NIR Lab'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'محاكي رؤية الكاميرات وتحليل العيوب الداخلية' : 'Interactive Optical Vision & Internal Quality Simulator'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'اكتشف كيف تقوم كاميرات GlobalScan 7 ومستشعرات Insight NIR و Viotec بتشريح الثمرة رقمياً في أجزاء من الثانية لاتخاذ قرار التوجيه الفوري.'
            : 'Explore how GlobalScan 7 RGB-NIR cameras, Insight NIR spectrometers, and Viotec UV sensors reconstruct and analyze fruit in milliseconds.'}
        </p>
      </div>

      {/* Fruit & Inspection Mode Selector Toolbar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Fruit Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto no-scrollbar">
          {FRUIT_PROFILES.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFruit(f.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedFruit === f.id
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isAr ? f.nameAr : f.name}
            </button>
          ))}
        </div>

        {/* Vision Sensor Filters */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto no-scrollbar">
          <button
            onClick={() => setVisionMode('rgb')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              visionMode === 'rgb'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-blue-500" />
            <span>{isAr ? 'RGB الطبيعي' : 'Natural RGB'}</span>
          </button>

          <button
            onClick={() => setVisionMode('globalscan_ai')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              visionMode === 'globalscan_ai'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-emerald-500" />
            <span>{isAr ? 'خريطة عيوب GlobalScan 7' : 'GlobalScan AI Mask'}</span>
          </button>

          <button
            onClick={() => setVisionMode('insight_nir')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              visionMode === 'insight_nir'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>{isAr ? 'حرارة السكر Insight NIR' : 'Insight NIR Heatmap'}</span>
          </button>

          <button
            onClick={() => setVisionMode('viotec_uv')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              visionMode === 'viotec_uv'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>{isAr ? 'فلورة العفن Viotec UV' : 'Viotec UV Spores'}</span>
          </button>
        </div>
      </div>

      {/* Main Vision Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Simulated Inspection Screen */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl text-white space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-b border-slate-800 pb-3">
            <span>{sampleData.name}</span>
            <span className="text-emerald-400">FPS: 90 · CMOS 4K</span>
          </div>

          {/* Interactive Screen Display Box */}
          <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center border border-slate-800">
            {/* Background grid */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />

            {/* Simulated 3D Fruit Render */}
            <div className="relative flex items-center justify-center">
              {/* Main Fruit Body */}
              <div
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-full relative transition-all duration-300 shadow-2xl flex items-center justify-center overflow-hidden"
                style={{
                  background:
                    visionMode === 'rgb'
                      ? selectedFruit === 'citrus_orange'
                        ? 'radial-gradient(circle at 35% 35%, #fb923c, #ea580c 70%, #9a3412)'
                        : selectedFruit === 'apple_gala'
                        ? 'radial-gradient(circle at 35% 35%, #f87171, #dc2626 65%, #991b1b)'
                        : selectedFruit === 'dates_medjool'
                        ? 'radial-gradient(circle at 35% 35%, #b45309, #78350f 70%, #451a03)'
                        : 'radial-gradient(circle at 35% 35%, #65a30d, #4d7c0f 65%, #1a2e05)'
                      : visionMode === 'globalscan_ai'
                      ? selectedFruit === 'citrus_orange'
                        ? 'radial-gradient(circle at 35% 35%, #fdba74, #ea580c 70%, #7c2d12)'
                        : 'radial-gradient(circle at 35% 35%, #fca5a5, #b91c1c 70%, #7f1d1d)'
                      : visionMode === 'insight_nir'
                      ? 'radial-gradient(circle at 50% 50%, #facc15 0%, #fb923c 45%, #ef4444 80%, #7f1d1d 100%)'
                      : 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 80%)',
                  boxShadow:
                    visionMode === 'viotec_uv'
                      ? '0 0 40px rgba(168, 85, 247, 0.4)'
                      : visionMode === 'insight_nir'
                      ? '0 0 35px rgba(245, 158, 11, 0.3)'
                      : '0 10px 25px rgba(0,0,0,0.5)',
                }}
              >
                {/* STEM & TEXTURE */}
                <div className="absolute top-2 w-3 h-3 rounded-full bg-slate-900/40 border border-white/20" />

                {/* OVERLAYS FOR GLOBALSCAN AI MODE */}
                {visionMode === 'globalscan_ai' && (
                  <>
                    {/* Simulated Defect Contour Mask 1 */}
                    <div className="absolute top-12 start-10 w-12 h-8 rounded-full border-2 border-amber-400 bg-amber-400/25 flex items-center justify-center animate-pulse">
                      <span className="text-[9px] font-mono font-bold text-amber-200">DEF-1</span>
                    </div>

                    {/* Simulated Defect Contour Mask 2 */}
                    <div className="absolute bottom-12 end-12 w-8 h-8 rounded-full border-2 border-emerald-400 bg-emerald-400/20 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-emerald-200">±0.2mm</span>
                    </div>

                    {/* Caliber measurement ring */}
                    <div className="absolute inset-2 rounded-full border border-dashed border-cyan-400/60 pointer-events-none flex items-center justify-center">
                      <div className="text-[10px] font-mono text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded">
                        Ø {sampleData.measuredCaliber} mm
                      </div>
                    </div>
                  </>
                )}

                {/* OVERLAYS FOR INSIGHT NIR MODE */}
                {visionMode === 'insight_nir' && (
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <div className="text-xl sm:text-2xl font-extrabold text-white font-mono drop-shadow-md">
                      {sampleData.measuredBrix} °Bx
                    </div>
                    <div className="text-[10px] text-yellow-200 font-mono mt-1">
                      {isAr ? 'نفاذية الأشعة: سكر عالي متجانس' : 'Transmittance: Uniform Brix'}
                    </div>
                    <div className="w-16 h-1 bg-yellow-300 rounded mt-2 shadow" />
                  </div>
                )}

                {/* OVERLAYS FOR VIOTEC UV MODE */}
                {visionMode === 'viotec_uv' && (
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    {sampleData.uvFluorescenceDetected ? (
                      <div className="w-10 h-10 rounded-full bg-purple-500/80 border-2 border-purple-300 animate-ping" />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-purple-300">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                        <span className="text-xs font-mono">{isAr ? 'نظيفة: لا توجد جراثيم عفن' : 'Zero Fungal Spores'}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 360 Rotation Guide Circle */}
              <div className="absolute -inset-6 rounded-full border border-slate-700/50 pointer-events-none border-t-emerald-500/80" />
            </div>

            {/* Corner Metadata HUD */}
            <div className="absolute bottom-3 start-3 text-[10px] font-mono text-slate-400 space-y-0.5 bg-slate-950/80 p-2 rounded border border-slate-800">
              <div>MODE: {visionMode.toUpperCase()}</div>
              <div>CALIBER: {sampleData.measuredCaliber} mm</div>
              <div>WEIGHT: {sampleData.measuredWeight} g</div>
            </div>

            <div className="absolute bottom-3 end-3 text-[10px] font-mono text-end space-y-0.5 bg-slate-950/80 p-2 rounded border border-slate-800">
              <div className="text-amber-400">BRIX: {sampleData.measuredBrix} °Bx</div>
              <div className="text-emerald-400">BLUSH: {sampleData.measuredBlush}%</div>
              <div>DEFECT: {sampleData.measuredDefectArea}%</div>
            </div>
          </div>

          {/* Sensor Description Banner */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              {visionMode === 'rgb' &&
                (isAr
                  ? 'نمط الكاميرا المرئية الطبيعية (Natural RGB): فحص اللون الخارجي والشكل والبيضاوية بمعدل 60 لقطة في الدوران.'
                  : 'Natural RGB Mode: Surface color evaluation, ovality, and volume geometry estimation.')}
              {visionMode === 'globalscan_ai' &&
                (isAr
                  ? 'نمط الذكاء الاصطناعي GlobalScan 7: شبكات عصبية تكتشف وتفصل عيوب القشرة السطحية بدقة ملليمترية وتعزل العيوب العميقة.'
                  : 'GlobalScan 7 AI Mode: Deep learning segmenting surface flaws (thrips, russeting, hail) from harmless skin spots.')}
              {visionMode === 'insight_nir' &&
                (isAr
                  ? 'نمط Insight NIR: يحلل الطيف الضوئي في مدى 900-1100 نانومتر لقياس السكر (Brix) والمادة الجافة والتلف اللبي دون شق الثمرة.'
                  : 'Insight NIR Mode: Penetrates fruit flesh measuring sugar brix, core rot, and watercore non-destructively.')}
              {visionMode === 'viotec_uv' &&
                (isAr
                  ? 'نمط Viotec UV: إثارة ضوئية فوق بنفسجية تكشف عفن البنسيليوم (Penicillium) قبل 48 ساعة من ظهوره للعين المجردة.'
                  : 'Viotec UV Mode: Ultraviolet fluorescence identifying fungal spores and skin oil decay before visible symptoms.')}
            </div>
          </div>
        </div>

        {/* Right: Recipe Configuration & Sorting Decision Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900">
              {isAr ? 'معايير وصفة الفرز (Sorting Recipe)' : 'Grading Recipe Thresholds'}
            </h3>

            {/* Slider 1: Min Brix */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{isAr ? 'حد السكر الأدنى (°Brix)' : 'Minimum Brix Cutoff'}</span>
                <span className="font-mono text-amber-600 font-bold">{minBrixCutoff} °Bx</span>
              </div>
              <input
                type="range"
                min="8.0"
                max="14.0"
                step="0.2"
                value={minBrixCutoff}
                onChange={(e) => setMinBrixCutoff(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>{isAr ? 'سوق محلي (8.0)' : 'Domestic (8.0)'}</span>
                <span>{isAr ? 'تصدير سوبر (12.0+)' : 'Premium Export (12.0+)'}</span>
              </div>
            </div>

            {/* Slider 2: Min Blush % */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{isAr ? 'الحد الأدنى لنسبة التلوين (% Blush)' : 'Minimum Color Blush %'}</span>
                <span className="font-mono text-emerald-600 font-bold">{minBlushCutoff}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                step="5"
                value={minBlushCutoff}
                onChange={(e) => setMinBlushCutoff(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Slider 3: Max Allowable Defect Area % */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{isAr ? 'الحد الأقصى لعيوب القشرة المسموحة' : 'Max Defect Surface Area'}</span>
                <span className="font-mono text-rose-600 font-bold">{defectTolerance}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={defectTolerance}
                onChange={(e) => setDefectTolerance(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Decision Outcome Card */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="text-xs font-semibold text-slate-500">
                {isAr ? 'نتيجة الفرز الآلي للعينة المختبرة:' : 'Automated Machine Classification:'}
              </div>

              <div
                className={`p-4 rounded-xl border flex items-center gap-3 ${
                  isExportGrade
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                {isExportGrade ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-amber-600 shrink-0" />
                )}
                <div>
                  <div className="text-sm font-bold">
                    {isExportGrade
                      ? isAr
                        ? 'مقبول: تصدير فاخر درجة أولى (Class 1 Extra)'
                        : 'Accepted: Class 1 Extra Premium Export'
                      : isAr
                      ? 'توجيه لمخرج: صنف ثاني أو عصير (Downgraded)'
                      : 'Downgraded: Class 2 Local or Juice'}
                  </div>
                  <div className="text-xs opacity-80 mt-0.5">
                    {isExportGrade
                      ? isAr
                        ? 'حققت كافة معايير السكر واللون ومساحة القشرة النظيفة.'
                        : 'Passed all sugar Brix, skin purity, and color thresholds.'
                      : !passesBrix
                      ? isAr
                        ? 'السبب: انخفاض نسبة السكر عن حد التصدير المحدد.'
                        : 'Reason: Sugar Brix below configured threshold.'
                      : !passesDefect
                      ? isAr
                        ? 'السبب: نسبة العيوب السطحية تتجاوز الحد المسموح.'
                        : 'Reason: Defect area exceeds tolerance.'
                      : isAr
                      ? 'السبب: نسبة التلوين أقل من المطلوب.'
                      : 'Reason: Insufficient skin blush.'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detected Defects List on Current Sample */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isAr ? 'التقرير التشريحي للحبة المفحوصة' : 'Sample Analysis Breakdown'}
            </h4>
            <div className="space-y-2 text-xs">
              {sampleData.detectedDefects.map((def: { nameAr: string; nameEn: string; tech: string }, i: number) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <span className="font-medium text-slate-800">
                    {isAr ? def.nameAr : def.nameEn}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {def.tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
