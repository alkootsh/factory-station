import React from 'react';
import { ShieldCheck, Eye, Cpu, Zap, Activity, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { MAF_SYSTEMS } from '../data/mafData';

// Generated image assets
const facilityImg = '/src/assets/images/maf_packing_facility_1792193618770.jpg';
const visionCabinImg = '/src/assets/images/optical_vision_chamber_1792193618934.jpg';
const roboticsImg = '/src/assets/images/robotic_linepack_cell_1792193619423.jpg';

interface OverviewHeroProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
  onExploreSystem: (systemId: string) => void;
  onOpenSimulator: () => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({
  lang,
  onExploreSystem,
  onOpenSimulator,
}) => {
  const isAr = lang === 'ar';

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch p-6 sm:p-10">
          {/* Main Hero Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span className="uppercase tracking-wider">
                {isAr ? 'المنظومة الصناعية الشاملة لمحطات الفرز والتعبئة والـ ERP' : 'Universal Packhouse Sizing, Processing & ERP Platform'}
              </span>
              <span aria-hidden="true">·</span>
              <span>Falcon Industrial Engineering</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              {isAr ? (
                <>
                  منظومة <span className="text-emerald-400">Falcon Eye Agrobotic OS</span> لإدارة خطوط الفرز والإنتاج والتصنيع الذكية.
                </>
              ) : (
                <>
                  Next-Gen Industrial Platform for Sorting, Packing &{' '}
                  <span className="text-emerald-400">Agrobotic Automation</span>.
                </>
              )}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {isAr ? (
                <>
                  تم تصميم وتطوير منظومة <strong>Falcon Eye Agrobotic & ERP</strong> كحل صناعي هندسي متكامل للمحطات ومصانع التعبئة، لتزويد كبرى المحطات بخطوط الفرز الإلكتروني عالي السرعة (الموالح، الخضار، التمور، العنب، الحبوب والبقوليات)، مدعومة برؤية الذكاء الاصطناعي <strong>Falcon Vision AI</strong>، والفحص الطيفي <strong>Insight NIR</strong>، وروبوتات التعبئة، مع ربط مالي ومحاسبي كامل عبر نظام الـ ERP وغرف التبريد والتخزين.
                </>
              ) : (
                <>
                  Engineered from the ground up, Falcon Eye Agrobotic OS provides an all-in-one industrial platform for packhouses and food processing plants worldwide—from automated water flumes and electronic sizers to optical AI defect inspection, delta robotics, and complete integrated ERP financial control.
                </>
              )}
            </p>

            {/* Quick Proof Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 py-3 border-y border-slate-800/80 text-start">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">15/s</div>
                <div className="text-xs text-slate-400">
                  {isAr ? 'حبة/ثانية لكل حارة (Pomone)' : 'Fruits/sec/lane max capacity'}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">±0.5°</div>
                <div className="text-xs text-slate-400">
                  {isAr ? 'دقة فحص السكر (Brix NIR)' : 'Brix sugar reading precision'}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">60+</div>
                <div className="text-xs text-slate-400">
                  {isAr ? 'لقطة كاميرا 360° لكل ثمرة' : 'High-res views per fruit'}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenSimulator}
                className="px-6 py-3 text-sm font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>{isAr ? 'جرّب محاكي خط الفرز التفاعلي' : 'Launch Sorting Line Simulator'}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => onExploreSystem('globalscan7')}
                className="px-5 py-3 text-sm font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 hover:text-white rounded-lg border border-slate-700 transition-colors whitespace-nowrap"
              >
                {isAr ? 'فحص تقنية GlobalScan 7' : 'Explore GlobalScan 7 AI'}
              </button>
            </div>
          </div>

          {/* Hero Facility Showcase Image */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-xl overflow-hidden border border-slate-700/60 shadow-2xl group">
              <img
                src={facilityImg}
                alt="Modern industrial packing house installation"
                className="w-full h-72 sm:h-88 lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 start-4 end-4 text-xs text-slate-200 flex items-center justify-between">
                <span>{isAr ? 'محطة فرز وتعبئة موالح متعددة الحارات' : 'Multi-Lane Citrus & Apple Optical Grading Plant'}</span>
                <span className="font-mono text-emerald-400">POMONE IV + SCADA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of the Falcon Agrobotic Ecosystem */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              {isAr ? 'الأركان الأربعة للتكنولوجيا' : 'Four Core Technology Pillars'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {isAr ? 'المنظومة المتكاملة لمحطات التصدير الحديثة' : 'Turnkey Agrobotic Ecosystem'}
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            {isAr
              ? 'تغطي منظومة عين الصقر السلسلة الكاملة من تفريغ الثمار في الأحواض المائية وصولاً لتغليف البالتات الآلي للشحن.'
              : 'Seamless integration covering wet/dry infeed, optical caliber, internal quality, delta robotics, and automatic palletizing.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isAr ? '1. ماكينات الفرز (Sizers)' : '1. Electronic Sizers'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? 'خطوط POMONE IV و CHERRYWAY لنقل وتدوير الثمار 360° على كؤوس مخروطية دون أي احتكاك، مع وزن ديناميكي بالغ الدقة.'
                  : 'Biconical roller cup carriers providing 360-degree rotation under cameras without friction or fruit bruising.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>{isAr ? 'الطاقة: حتى 15 حبة/ث' : 'Speed: Up to 15 fruits/s'}</span>
              <button
                onClick={() => onExploreSystem('pomone')}
                className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
              >
                <span>{isAr ? 'التفاصيل' : 'Specs'}</span>
                <ArrowRight className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isAr ? '2. الفرز البصري (GlobalScan)' : '2. Optical Vision (AI)'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? 'منظومة GlobalScan 7 متعددة الأطياف RGB + NIR لكشف العيوب الميكرونية: التربس، الصدأ، كدمات البرد، والتشوهات.'
                  : 'Multispectral 4K cameras with strobe illumination and deep learning AI separating cosmetic blemishes from structural defects.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>{isAr ? 'الدقة: ±0.5 ملم' : 'Precision: ±0.5mm'}</span>
              <button
                onClick={() => onExploreSystem('globalscan7')}
                className="text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1"
              >
                <span>{isAr ? 'التفاصيل' : 'Specs'}</span>
                <ArrowRight className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isAr ? '3. الفحص الطيفي (Insight NIR)' : '3. Internal NIR Spectroscopy'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? 'قياس غير إتلافي لنسبة السكر (°Brix)، والمادة الجافة، والعفن الداخلي وتخشب اللب عبر اختراق الأشعة تحت الحمراء.'
                  : 'Non-destructive infrared light penetration measuring sugar Brix, internal rot, browning, and frost dry cells in real-time.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>{isAr ? 'دقة السكر: ±0.5 °Bx' : 'Accuracy: ±0.5 °Bx'}</span>
              <button
                onClick={() => onExploreSystem('insight')}
                className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
              >
                <span>{isAr ? 'التفاصيل' : 'Specs'}</span>
                <ArrowRight className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isAr ? '4. الروبوت والتعبئة (Agrobotic)' : '4. Delta Robotics & Packing'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? 'خلايا Line Pack وروبوتات الدلتا لتوجيه العنق واللون ورص الثمار في صواني الكرتون بسرعة 300 حبة/دقيقة للخلية.'
                  : 'High-speed delta robots with gentle suction cups orienting stems, blush, and patterned placement into cartons and trays.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>{isAr ? 'حتى 300 حبة/د' : 'Speed: 300 fruits/min'}</span>
              <button
                onClick={() => onExploreSystem('linepack')}
                className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
              >
                <span>{isAr ? 'التفاصيل' : 'Specs'}</span>
                <ArrowRight className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Subsystems Showcase Grid */}
      <section className="bg-slate-100/70 p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {isAr ? 'المكونات الميدانية في صالة التعبئة' : 'Field Equipment in Industrial Packhouses'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {isAr
              ? 'نظرة مقربة على وحدات الرؤية البصرية وخلايا الروبوت والفرز الذكي التي تعمل في كبرى محطات الموالح والتفاح والخضار.'
              : 'Close-up look into vision camera cabins and robotics engineered for industrial packhouses.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Vision Chamber */}
          <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col">
            <div className="relative h-56 overflow-hidden">
              <img
                src={visionCabinImg}
                alt="GlobalScan 7 Camera Vision Cabin"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 end-3 bg-slate-900/80 text-white text-xs px-2.5 py-1 rounded backdrop-blur-sm font-mono">
                GlobalScan 7 + Viotec
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {isAr ? 'حجرة الكاميرات متوازية الأطياف (Optical Cabin)' : 'Multispectral Camera Cabin'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isAr
                    ? 'تحتوي على كاميرات ملونة عالية التردد ومصفوفات إضاءة LED متزامنة، تفحص كل ثمرة أثناء دورانها فوق الأسطوانات وتلتقط حتى 60 إطاراً في أجزاء من الثانية لتوليد مجسم رقمي ثلاثي الأبعاد.'
                    : 'Equipped with synchronized strobe arrays and ultra-high-speed CMOS sensors capturing 60 full views per fruit to construct a 3D digital defect profile.'}
                </p>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{isAr ? 'كشف الصدمات وعلامات تساقط البرد' : 'Bruise & hail scar segmentation'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{isAr ? 'تحليل مساحة تلوين القشرة بنسبة مئوية دقيقة' : 'Precise color blush percentage analysis'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{isAr ? 'كاميرا الأشعة فوق البنفسجية Viotec لعزل أعفان الموالح' : 'Viotec UV sensor for early mold detection'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Robotics Cell */}
          <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col">
            <div className="relative h-56 overflow-hidden">
              <img
                src={roboticsImg}
                alt="Line Pack Delta Robot Tray Packing"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 end-3 bg-slate-900/80 text-white text-xs px-2.5 py-1 rounded backdrop-blur-sm font-mono">
                Line Pack Delta Cell
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {isAr ? 'خلايا روبوت الدلتا لتعبئة الصواني (Line Pack)' : 'Delta Robotic Tray Packing Cells'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isAr
                    ? 'أذرع روبوتية خفيفة الوزن من ألياف الكربون مزودة برؤوس شفط سيليكون هوائية تلتقط الفاكهة في حركتها المستمرة، وتقوم بتوجيه الأعناق للأعلى أو توجيه الخد الأحمر نحو المستهلك في كرتونة التصدير.'
                    : 'Carbon-fiber delta arms with soft vacuum bellows tracking moving fruit on the conveyor, orienting stems and blush before placing them into retail trays.'}
                </p>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{isAr ? 'إنتاجية تصل إلى 300 حبة في الدقيقة لكل خلية' : 'Up to 300 fruits per minute per cell'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{isAr ? 'توفير تكاليف العمالة وتوحيد الجودة البصرية' : 'Reduces manual packing labor by 65%'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{isAr ? 'صفر سقوط حر لمنع الكدمات تماماً' : 'Zero drop height prevents delicate bruising'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* New Visual Gallery Showcase Section */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
            {isAr ? 'معرض الصور والمحاكاة الحية' : 'Live Facility & Warehouse Gallery'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {isAr ? 'مشاهد حية من خطوط الفرز الذكية وغرف التبريد' : 'Visual Live Capture from Packhouse & Cold Chain'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {isAr ? 'معاينة بصرية واقعية لتجهيزات خطوط الفرز الآلي وسلسلة الإمداد المبردة المندمجة بالكامل داخل نظام الـ ERP.' : 'Photorealistic previews of automated sorting lines and integrated cold chain warehouse.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl group">
            <img
              src="/src/assets/images/industrial_packhouse_sorting_1792268379404.jpg"
              alt="Industrial Packhouse Sorting Line"
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Automated Sorting Line</span>
              <h3 className="text-lg font-bold text-white mt-1">
                {isAr ? 'خط الفرز والتحجيم البصري بالذكاء الاصطناعي' : 'AI Optical Sizing & Sorting Facility'}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {isAr ? 'كاميرات طيفية وسير تفريغ آلي يصنف المحاصيل حسب الحجم، اللون، والعيوب بدقة 99.8%.' : 'High-speed optical sorters classifying crops by size, color, and defect rate.'}
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl group">
            <img
              src="/src/assets/images/cold_storage_warehouse_1792268394843.jpg"
              alt="Cold Storage Warehouse"
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6">
              <span className="text-xs font-mono text-teal-400 font-bold uppercase">Refrigerated Cold Chain</span>
              <h3 className="text-lg font-bold text-white mt-1">
                {isAr ? 'مستودع التبريد ومعالجة الصدمة الباردة' : 'Refrigerated Cold Storage Warehouse'}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {isAr ? 'غرف تبريد مطابقة لمعايير وزارة الزراعة الأمريكية USDA والاتحاد الأوروبي.' : 'USDA and EU compliant cold storage chambers with real-time IoT temperature probes.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

