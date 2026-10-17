export interface SystemInfo {
  id: string;
  name: string;
  nameAr: string;
  category: 'sizer' | 'vision' | 'robotics' | 'software';
  categoryAr: string;
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  keySpecs: { label: string; labelAr: string; value: string; valueAr: string }[];
  features: { en: string; ar: string }[];
  produceSuitable: string[];
}

export interface FruitProfile {
  id: string;
  name: string;
  nameAr: string;
  defaultWeight: number; // in grams
  defaultDiameter: number; // in mm
  defaultBrix: number;
  minExportBrix: number;
  commonDefects: {
    name: string;
    nameAr: string;
    detectionTech: 'GlobalScan' | 'Insight NIR' | 'Viotec UV' | 'Load Cell';
    severity: 'minor' | 'major' | 'critical';
    descriptionAr: string;
  }[];
  outlets: {
    name: string;
    nameAr: string;
    criteriaAr: string;
    percentageTarget: number;
  }[];
}

export interface FaultCode {
  code: string;
  title: string;
  titleAr: string;
  subsystem: string;
  subsystemAr: string;
  severity: 'warning' | 'error' | 'critical';
  causeAr: string;
  solutionAr: string;
  solutionEn: string;
}

export const MAF_SYSTEMS: SystemInfo[] = [
  {
    id: 'pomone',
    name: 'POMONE IV',
    nameAr: 'بومون 4 (POMONE IV)',
    category: 'sizer',
    categoryAr: 'ماكينات الفرز الإلكتروني',
    tagline: 'High-speed biconical roller sizer for spherical & oval produce',
    taglineAr: 'ماكينة الفرز الأسطوانية ثنائية المخروط للموالح والتفاح والطماطم',
    description: 'The global benchmark in electronic grading for citrus, apples, stone fruits, and tomatoes. Engineered with bi-conical rotating rollers that guarantee 360-degree fruit rotation under camera cabins while achieving gentle handling at up to 15 fruits/sec per lane.',
    descriptionAr: 'المعيار العالمي الأول في الفرز والتدريج الإلكتروني للموالح، التفاح، الفواكه ذات النواة، والطماطم. تعتمد على أسطوانات دوارة ثنائية المخروط تضمن دوران الحبة 360 درجة كاملة تحت الكاميرات بسرعة تصل إلى 15 حبة/ثانية لكل حارة مع حماية قصوى من الكدمات.',
    keySpecs: [
      { label: 'Speed per lane', labelAr: 'السرعة لكل حارة', value: 'Up to 15 fruits/sec (900 cpm)', valueAr: 'تصل إلى 15 حبة/ثانية (900 دورة/دقيقة)' },
      { label: 'Lanes configuration', labelAr: 'عدد الحارات', value: '2, 4, 6, 8, 10 or 12 lanes', valueAr: 'من 2 إلى 12 حارة متوازية' },
      { label: 'Weighing accuracy', labelAr: 'دقة الوزن الإلكتروني', value: '± 1 gram (dynamic 3-point load cell)', valueAr: '± 1 جرام بحساسات تحميل ديناميكية' },
      { label: 'Caliber range', labelAr: 'نطاق الأقطار', value: '35 mm to 125 mm', valueAr: 'من 35 ملم إلى 125 ملم' },
    ],
    features: [
      { en: 'Patented bi-conical cup design prevents fruit pinch and friction', ar: 'تصميم أسطوانات ثنائية المخروط حاصل على براءة اختراع لمنع احتكاك وتلف الثمار' },
      { en: 'Ultra-low drop transfer to packaging conveyors using soft air ejection', ar: 'تفريغ فائق النعومة للمخارج بواسطة دفعات هواء دقيقة أو قلابات مبطنة' },
      { en: 'Direct synchronization with GlobalScan 7 optical sorting cabin', ar: 'تزامن رقمي كامل مع حجرة الرؤية والفرز البصري GlobalScan 7' },
      { en: 'Heavy-duty food-grade stainless steel construction', ar: 'هيكل متين من الستانلس ستيل المقاوم للصدأ ومطابق للمواصفات الغذائية' }
    ],
    produceSuitable: ['Citrus (Orange, Lemon, Mandarin)', 'Apples', 'Peaches & Nectarines', 'Tomatoes', 'Kiwi']
  },
  {
    id: 'globalscan7',
    name: 'GLOBALSCAN 7',
    nameAr: 'جلوبال سكان 7 (GLOBALSCAN 7)',
    category: 'vision',
    categoryAr: 'أنظمة الفرز البصري والذكاء الاصطناعي',
    tagline: 'High-definition multispectral external quality & defect vision system',
    taglineAr: 'منظومة الرؤية البصرية متعددة الأطياف بالذكاء الاصطناعي لفحص العيوب الخارجية',
    description: 'The pinnacle of optical sorting technology. GlobalScan 7 utilizes multi-angle ultra-high-resolution RGB and Near-Infrared (NIR) digital cameras combined with patented LED matrix lighting and deep learning AI algorithms to detect micro-punctures, thrips, hail scars, russeting, and precise caliber down to tenths of a millimeter.',
    descriptionAr: 'قمة تكنولوجيا الفرز البصري الذكي. يعتمد GlobalScan 7 على كاميرات رقمية فائقة الدقة RGB مع أطياف الأشعة تحت الحمراء القريبة (NIR) وزوايا تصوير متعددة مع إضاءة ستروب LED حصرية، مدعومة بخوارزميات الذكاء الاصطناعي والتعلم العميق لرصد أدق العيوب (الخدوش، أثر التربس، الصدأ، كدمات البرد، التشوهات، ولون القشرة بنسبة 100%).',
    keySpecs: [
      { label: 'Camera Technology', labelAr: 'تقنية الكاميرات', value: 'High-speed CMOS color + NIR multispectral', valueAr: 'حساسات CMOS فائقة السرعة ملونة + تحت حمراء' },
      { label: 'Images per fruit', labelAr: 'عدد الصور لكل حبة', value: '40 to 60 views during 360° rotation', valueAr: 'من 40 إلى 60 لقطة أثناء دوران الحبة 360 درجة' },
      { label: 'Defect detection', labelAr: 'اكتشاف العيوب', value: 'External blemishes, sunburn, thrips, rot, scars', valueAr: 'الخدوش السطحية، لفحة الشمس، التربس، العفن، النمش' },
      { label: 'Caliber precision', labelAr: 'دقة قياس القطر', value: '± 0.5 mm optical diameter', valueAr: 'دقة ± 0.5 ملم في قياس القطر والبيضاوية' },
    ],
    features: [
      { en: 'AI Deep Learning defect classification separating cosmetic from structural flaws', ar: 'تصنيف بالذكاء الاصطناعي يفرق بدقة بين العيوب السطحية التجميلية والعيوب الإتلافية' },
      { en: 'Real-time color grade scoring (% blush, green peel, color uniformity)', ar: 'تحليل فوري لتدرج اللون ونسبة التلوين (Blush/Color Index) بدقة بالغة' },
      { en: 'Intuitive touch interface for recipe adjustment and grade limits', ar: 'واجهة رسومية للمشغل لضبط وصفات الفرز وتحديد درجات التصدير بنقرة واحدة' },
      { en: 'Zero blind spots with 3D reconstructed fruit profile', ar: 'انعدام النقاط العمياء بفضل إعادة البناء ثلاثي الأبعاد للحبة في الهواء' }
    ],
    produceSuitable: ['Citrus', 'Apples', 'Pears', 'Avocados', 'Stone fruit', 'Dates', 'Mangoes']
  },
  {
    id: 'insight',
    name: 'INSIGHT 2 (NIR)',
    nameAr: 'إنسايت 2 (INSIGHT NIR)',
    category: 'vision',
    categoryAr: 'الفحص الطيفي الداخلي (السكر والعفن)',
    tagline: 'Non-destructive internal quality & sugar Brix spectrometer',
    taglineAr: 'نظام التحليل الطيفي غير الإتلافي لقياس السكر (Brix) والتلف الداخلي',
    description: 'An advanced near-infrared spectroscopy system that penetrates fruit flesh without damaging the skin. Measures sugar content (°Brix), dry matter, internal browning, watercore in apples, and granulation/dryness in citrus, ensuring only prime-eating-quality fruit reaches premium export markets.',
    descriptionAr: 'منظومة طيفية متطورة تخترق لُب الثمرة بأشعة NIR الآمنة دون إتلاف القشرة نهائياً. تقيس بدقة نسبة السكر (°Brix)، المادة الجافة، العفن والاسمرار الداخلي (Internal Browning)، التخمر، وجفاف أكياس العصير في الموالح (Granulation) لضمان أعلى جودة تصديرية.',
    keySpecs: [
      { label: 'Measurement type', labelAr: 'نوع القياس', value: 'Transmission / Reflectance NIR Spectroscopy', valueAr: 'مطيافية نفاذ وانعكاس الأشعة تحت الحمراء' },
      { label: 'Brix Accuracy', labelAr: 'دقة قياس السكر', value: '± 0.5 to 0.8 °Brix', valueAr: '± 0.5 إلى 0.8 درجة بريكس (°Bx)' },
      { label: 'Internal rot detection', labelAr: 'كشف العفن والقلب الأسود', value: 'Real-time detection of internal decay & core browning', valueAr: 'كشف فوري لعفن القلب الأسود وتخشب اللب' },
      { label: 'Speed', labelAr: 'سرعة التحليل', value: 'Full speed matching sizer conveyor (up to 15 fruits/s)', valueAr: 'متزامنة بالكامل مع سرعة الخط القصوى' },
    ],
    features: [
      { en: 'Eliminates destructive manual refractometer sampling', ar: 'يغني تماماً عن إتلاف الثمار يدوياً لقياس البريكس بالريفراكتوميتر' },
      { en: 'Detects frost-damaged citrus with dried juice vesicles', ar: 'يكتشف الموالح المصابة بالصقيع والجفاف الداخلي بدقة متناهية' },
      { en: 'Integrates directly into sorting recipes for automatic lane routing', ar: 'يرتبط تلقائياً بوصفة الفرز لتوجيه الثمار الحلوة لكراتين التصدير الفاخر' }
    ],
    produceSuitable: ['Citrus', 'Apples', 'Avocados (Dry matter)', 'Mangoes', 'Melons', 'Peaches']
  },
  {
    id: 'viotec',
    name: 'VIOTEC (UV Inspection)',
    nameAr: 'فيوتك (VIOTEC UV)',
    category: 'vision',
    categoryAr: 'كشف العفن بالأشعة فوق البنفسجية',
    tagline: 'Ultraviolet fluorescence detection of early fungal decay in citrus',
    taglineAr: 'الكشف بالأشعة فوق البنفسجية عن الفطريات وعفن الموالح المبكر',
    description: 'Specialized optical detection system utilizing UV fluorescence. Illuminates citrus with specific UV wavelengths causing the essential oil ruptures and Penicillium digitatum (green/blue mold) spore colonies to fluoresce vividly before the human eye can spot any decay.',
    descriptionAr: 'نظام كشف بصري فائق التخصص يعمل بظاهرة الفلورة فوق البنفسجية (UV). يسلط ضوءاً مدروساً على قشرة الموالح مما يجعل مستعمرات فطريات العفن الأزرق والأخضر (Penicillium) وزيوت القشرة المتهتكة تضيء بوضوح قبل أن يراها مفتش الجودة بأيام.',
    keySpecs: [
      { label: 'Lighting spectrum', labelAr: 'طيف الإضاءة', value: 'Narrowband UV-A specialized strobes', valueAr: 'إضاءة ومضية UV-A متخصصة معقمة' },
      { label: 'Decay detection speed', labelAr: 'سرعة الاستجابة', value: 'Detects decay up to 48-72h before visible rotting', valueAr: 'كشف العفن قبل ظهوره للعين بـ 48 إلى 72 ساعة' },
      { label: 'Fruit loss reduction', labelAr: 'تقليل التلف في الشحن', value: 'Prevents "nesting" rot in refrigerated shipping containers', valueAr: 'يمنع تفشي العفن بين الكراتين أثناء الشحن البحري' },
      { label: 'Inspection', labelAr: 'نطاق الفحص', value: '100% full-surface rotation inspection', valueAr: 'فحص شامل 100% لسطح الحبة الدائر' }
    ],
    features: [
      { en: 'Automated rejection of spore-infected fruit to cull bins', ar: 'عزل فوري وآلي للحبات المصابة بجراثيم العفن نحو خطوط العصير أو الفرز الصناعي' },
      { en: 'Reduces claim costs and container rejections at export ports', ar: 'يخفض بنسبة هائلة مشاكل رفض الحاويات في موانئ التصدير العالمية' }
    ],
    produceSuitable: ['Oranges', 'Mandarins & Clementines', 'Lemons', 'Grapefruit']
  },
  {
    id: 'linepack',
    name: 'LINE PACK & FAST PACK',
    nameAr: 'لاين باك وفاست باك (LINE PACK & FAST PACK)',
    category: 'robotics',
    categoryAr: 'الروبوتات والتعبئة الآلية (Agrobotic)',
    tagline: 'High-speed robotic delta packaging cells for patterned carton filling',
    taglineAr: 'خلايا روبوتية سريعة بنظام دلتا لتعبئة الصواني ورص الكراتين بنسق هندسي',
    description: 'Robotic packaging units featuring high-acceleration Delta robots equipped with soft pneumatic suction cups. Detects fruit orientation, picks fruit directly from sizing belts, and gently places them into pre-formed trays or carton boxes with stems facing the exact same direction and blush side prominently displayed.',
    descriptionAr: 'خلايا تعبئة روبوتية ذكية تعتمد على روبوتات دلتا فائقة السرعة ورؤوس شفط مرنة تعمل بتفريغ الهواء. تتعرف الكاميرات على اتجاه الحبة وتلتقطها بسرعة فائقة وترصها في صواني الكرتون (Trays) مع توجيه العنق أو الجهة الأكثر احمراراً نحو الأعلى بنسق هندسي بديع.',
    keySpecs: [
      { label: 'Placement rate', labelAr: 'سرعة الرص', value: 'Up to 240 to 300 fruits/min per robot cell', valueAr: '240 إلى 300 حبة/دقيقة لكل خلية روبوت' },
      { label: 'Orientation control', labelAr: 'التحكم في التوجيه', value: 'Stem orientation & blush-up positioning', valueAr: 'توجيه العنق وتوجيه اللون الممتاز للأعلى' },
      { label: 'Packaging formats', labelAr: 'أنماط التعبئة', value: 'Plastic trays, cardboard cartons, euro-boxes', valueAr: 'صواني الكرتون، الصناديق الخشبية، العبوات البلاستيكية' },
      { label: 'Gentleness', labelAr: 'الحفاظ على الثمار', value: 'Zero drop height placement with soft bellows', valueAr: 'وضع الثمرة بدون أي سقوط حر عبر كؤوس السيليكون' }
    ],
    features: [
      { en: 'Replaces 4 to 6 manual packers per cell while increasing tray visual presentation', ar: 'توفر عمل 4 إلى 6 عمال تعبئة لكل خلية وترفع القيمة التسويقية للمنتج النهائي' },
      { en: 'Quick changeover between different tray counts and fruit calibers', ar: 'تغيير فوري لوصفة الرص بين عدد الحبات (Caliber 48, 56, 64, 72, إلخ)' }
    ],
    produceSuitable: ['Apples', 'Peaches', 'Citrus', 'Pears', 'Avocados', 'Tomatoes']
  },
  {
    id: 'cherryway',
    name: 'CHERRYWAY IV',
    nameAr: 'تشيري واي 4 (CHERRYWAY IV)',
    category: 'sizer',
    categoryAr: 'ماكينات فرز الكرز والتوت',
    tagline: 'World reference in ultra-gentle, high-speed cherry grading & 4-view rotation',
    taglineAr: 'المرجع العالمي الأول لفرز وتدريج الكرز بالدوران الرباعي الكامل',
    description: 'Designed specifically for cherries. Its patented 4-finger cup mechanism exposes 100% of the cherry surface, including the stem cavity and apical zone, inspecting for nose cracks, bruising, firmness, color index, and size without losing stems.',
    descriptionAr: 'الماكينة الأكثر شهرة عالمياً لفرز الكرز. تمتاز بكؤوس رباعية الأصابع حاصلة على براءة اختراع، تتيح فحص كامل سطح حبة الكرز بنسبة 100% بما في ذلك تجويف العنق والقمة، وكشف التشققات ونعومة اللب مع حماية العنق الأخضر من الانفصال.',
    keySpecs: [
      { label: 'Conveyor Speed', labelAr: 'سرعة السير', value: 'Up to 30 cherries/sec per lane', valueAr: 'حتى 30 حبة كرز في الثانية لكل حارة' },
      { label: 'Defect inspection', labelAr: 'فحص العيوب', value: 'Pitting, cracks, bird pecks, softness, decay', valueAr: 'التشقق النصفي، ضربات الطيور، الليونة، العفن' },
      { label: 'Water cushioning', labelAr: 'النقل المائي', value: 'Integral water flume feed & hydro-sorting', valueAr: 'تغذية وتفريغ في قنوات مائية هيدروليكية مبردة' }
    ],
    features: [
      { en: 'Stem preservation guarantee with smooth synthetic carrier guides', ar: 'حفاظ تام على الأعناق الخضراء بدون تقطيع' },
      { en: 'Integrated with Cherryscan HD optical analysis', ar: 'تكامل تام مع نظام كاميرات Cherryscan عالي الدقة' }
    ],
    produceSuitable: ['Sweet Cherries', 'Sour Cherries', 'Small Plums']
  },
  {
    id: 'supervision',
    name: 'MAF SUPERVISION (SCADA & TRACE)',
    nameAr: 'نظام الإشراف والتتبع (MAF SUPERVISION & TRACE)',
    category: 'software',
    categoryAr: 'برمجيات التحكم الصناعي والتتبع',
    tagline: 'Enterprise SCADA software for plant management, bin allocation & traceability',
    taglineAr: 'نظام سكادا المركزي لإدارة المحطة، توزيع المخارج، والتتبع الكامل للشحنات',
    description: 'Centralized plant intelligence suite. Allows production managers to configure sorting recipes, balance throughput across packing tables, analyze batch yield in real time, and trace every exported carton back to the orchard block and bin arrival.',
    descriptionAr: 'البرنامج المركزي للتحكم في صالة التعبئة. يمكّن مدراء الإنتاج من ضبط وصفات الفرز، وتوزيع الحبات على المخارج تلقائياً لموازنة طاولات التعبئة، وحساب نسب الفرز (Pack-out %) وتتبع المنتج من المزرعة وحتى باركود الباليتة.',
    keySpecs: [
      { label: 'Architecture', labelAr: 'الهيكلية البرمجية', value: 'Industrial real-time Ethernet SCADA & Cloud reporting', valueAr: 'إيثرنت صناعي في الزمن الحقيقي وربط سحابي' },
      { label: 'Traceability standard', labelAr: 'معايير التتبع', value: 'GS1-128, SSCC-18, GlobalG.A.P. compliant', valueAr: 'مطابق لمعايير GlobalGAP و GS1-128 العالمية' },
      { label: 'Telemetry latency', labelAr: 'زمن استجابة البيانات', value: '< 50 ms loop time across all PLC drops', valueAr: 'أقل من 50 ميلي ثانية بين وحدات الـ PLC والواجهة' }
    ],
    features: [
      { en: 'Dynamic bin allocation optimizing line balance and packing staff workload', ar: 'تخصيص ديناميكي للمخارج يمنع اختناق السير ويوفر التوازن لطواقم التعبئة' },
      { en: 'Detailed batch yield analytics exported automatically to enterprise ERP', ar: 'تقارير أداء فورية لكل دفعة وإمكانية الربط مع أنظمة SAP و Odoo و ERP' }
    ],
    produceSuitable: ['All packhouse operations']
  }
];

export const FRUIT_PROFILES: FruitProfile[] = [
  // 1. الموالح والحمضيات (Citrus)
  {
    id: 'citrus_orange',
    name: 'Valencia Orange',
    nameAr: 'برتقال فالنسيا (موالح)',
    defaultWeight: 185,
    defaultDiameter: 76,
    defaultBrix: 11.8,
    minExportBrix: 10.0,
    commonDefects: [
      { name: 'Thrips Scars (Peel silvering)', nameAr: 'أثر حشرة التربس (فضي/رمادي)', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'تشوه جلدي فضي ناتج عن تغذية حشرات التربس في مرحلة الإزهار.' },
      { name: 'Penicillium Spores (Green/Blue Mold)', nameAr: 'عفن البنسيليوم (أخضر/أزرق)', detectionTech: 'Viotec UV', severity: 'critical', descriptionAr: 'أخطر أعفان الموالح، يتوهج بالأشعة فوق البنفسجية قبل ظهور الغزل الفطري.' },
      { name: 'Low Brix / Dry Juice Vesicles', nameAr: 'انخفاض السكر / جفاف الفصوص', detectionTech: 'Insight NIR', severity: 'major', descriptionAr: 'جفاف الحبة الداخلي نتيجة الصقيع أو الجفاف.' },
      { name: 'Oleocellosis (Oil Spotting)', nameAr: 'تبقع الزيت (أوليوسيلوزيس)', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'انفجار الغدد الزيتية في القشرة أثناء الجمع المبكر.' },
      { name: 'Split / Puncture', nameAr: 'شق قشري أو ثقب', detectionTech: 'GlobalScan', severity: 'critical', descriptionAr: 'تمزق في القشرة يسمح بدخول البكتيريا.' }
    ],
    outlets: [
      { name: 'Cat 1 Extra (Air-Freight/Premium Export)', nameAr: 'صنف ممتاز أول (تصدير فاخر)', criteriaAr: 'خالٍ من العيوب، لون متجانس > 90%، سكر > 11.5°Bx، قطر 72-84 مم', percentageTarget: 42 },
      { name: 'Cat 1 Standard (Maritime Export)', nameAr: 'صنف أول (تصدير بحري قياسي)', criteriaAr: 'عيوب طفيفة < 5% مساحة، سكر > 10.0°Bx، قطر 68-88 مم', percentageTarget: 33 },
      { name: 'Cat 2 Local Market', nameAr: 'صنف ثاني (سوق محلي)', criteriaAr: 'عيوب قشرية طفيفة لا تؤثر على اللب، سكر > 9.0°Bx', percentageTarget: 15 },
      { name: 'Industrial Processing / Juice', nameAr: 'صناعي / مصانع العصير', criteriaAr: 'تشوهات شكلية، انخفاض السكر، بقع قشرية واضحة، سليم داخلياً', percentageTarget: 7 },
      { name: 'Cull / Waste (Viotec UV Mold Rejection)', nameAr: 'تالف ومرفوض (أعفان وشقوق)', criteriaAr: 'عفن فطري، شقوق مفتوحة، ثمار فاسدة معزولة بنظام Viotec', percentageTarget: 3 }
    ]
  },
  {
    id: 'citrus_mandarin',
    name: 'Clementine / Mandarin',
    nameAr: 'يوسفي / كلمنتينا / مندرين',
    defaultWeight: 95,
    defaultDiameter: 58,
    defaultBrix: 12.4,
    minExportBrix: 10.5,
    commonDefects: [
      { name: 'Puffiness / Creasing', nameAr: 'انتفاخ القشرة وفراغ الفصوص', detectionTech: 'Insight NIR', severity: 'major', descriptionAr: 'انفصال القشرة عن اللب وفراغ هوائي يقلل الكثافة.' },
      { name: 'Green Peel Ratio', nameAr: 'نسبة الاخضرار المتبقي', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'عدم اكتمال التلوين البرتقالي بالقشرة.' },
      { name: 'Stem Puncture', nameAr: 'وخز العنق الخشبي', detectionTech: 'GlobalScan', severity: 'critical', descriptionAr: 'ثقب ناتج عن قص غير سليم لعنق الحبة.' }
    ],
    outlets: [
      { name: 'Premium Easy-Peel Export', nameAr: 'تصدير ممتاز سهل التقشير', criteriaAr: 'تلوين كامل 100%، قطر 54-64 مم، سكر > 12°Bx', percentageTarget: 50 },
      { name: 'Standard Export', nameAr: 'تصدير قياسي', criteriaAr: 'تلوين > 85%، قشرة متماسكة', percentageTarget: 30 },
      { name: 'Local Domestic', nameAr: 'سوق محلي', criteriaAr: 'أحجام صغيرة أو اخضرار طفيف عند العنق', percentageTarget: 15 },
      { name: 'Juice / Cull', nameAr: 'عصير وعادم', criteriaAr: 'ثمار منتفخة أو بها وخز', percentageTarget: 5 }
    ]
  },
  {
    id: 'citrus_lemon',
    name: 'Eureka / Eureka Lemon',
    nameAr: 'ليمون أضاليا / يوريكا',
    defaultWeight: 120,
    defaultDiameter: 55,
    defaultBrix: 8.5,
    minExportBrix: 7.0,
    commonDefects: [
      { name: 'Silver Mite Damage', nameAr: 'صدأ الحلم الفضي (Silver Mite)', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'بهتان القشرة وتحولها للون رمادي فضي خشن.' },
      { name: 'Internal Endoxerosis', nameAr: 'جفاف وتبقع الطرف الداخلي', detectionTech: 'Insight NIR', severity: 'major', descriptionAr: 'جفاف عصارة الطرف الحلمي بسبب الإجهاد المائي.' }
    ],
    outlets: [
      { name: 'Class 1 Yellow Export', nameAr: 'ليمون أصفر تصدير نخب أول', criteriaAr: 'لون أصفر لامع متجانس، خلو تام من الندبات', percentageTarget: 45 },
      { name: 'Class 1 Green-Yellow', nameAr: 'أخضر/أصفر تصدير بحري طويل', criteriaAr: 'عمر شحن طويل للمسافات البعيدة', percentageTarget: 35 },
      { name: 'Class 2 Domestic', nameAr: 'محلي ومعالجة زيوت', criteriaAr: 'ندبات فضية طفيفة', percentageTarget: 15 },
      { name: 'Juice Concentrate / Reject', nameAr: 'عصير وتالف', criteriaAr: 'أطراف جافة أو ثمار طرية', percentageTarget: 5 }
    ]
  },
  {
    id: 'citrus_grapefruit',
    name: 'Ruby Red Grapefruit',
    nameAr: 'جريب فروت روبي أحمر',
    defaultWeight: 310,
    defaultDiameter: 92,
    defaultBrix: 10.2,
    minExportBrix: 9.0,
    commonDefects: [
      { name: 'Sun Scald', nameAr: 'لسعة الشمس القشرية', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'اصفرار شاحب أو بقعة بنية على الجانب المعرض للشمس.' },
      { name: 'Chilling Injury Pitting', nameAr: 'ندبات أضرار البرودة والتبريد', detectionTech: 'GlobalScan', severity: 'major', descriptionAr: 'انخسافات نقطية بنية على القشرة.' }
    ],
    outlets: [
      { name: 'Ruby Extra Premium', nameAr: 'تصدير سوبر ممتاز محمر', criteriaAr: 'احمرار قشري وداخلي واضح، قطر > 88 مم', percentageTarget: 52 },
      { name: 'Standard Export', nameAr: 'تصدير قياسي', criteriaAr: 'لون متجانس، نسبة عصير عالية', percentageTarget: 32 },
      { name: 'Processing / Juice', nameAr: 'عصير وصناعي', criteriaAr: 'لسعات شمس أو أحجام غير قياسية', percentageTarget: 16 }
    ]
  },

  // 2. التفاحيات والكمثرى (Pome Fruits)
  {
    id: 'apple_gala',
    name: 'Gala Apple',
    nameAr: 'تفاح جالا (فواكه بذرية)',
    defaultWeight: 165,
    defaultDiameter: 72,
    defaultBrix: 13.2,
    minExportBrix: 12.0,
    commonDefects: [
      { name: 'Internal Browning / Watercore', nameAr: 'الاسمرار الداخلي / تورد القلب', detectionTech: 'Insight NIR', severity: 'critical', descriptionAr: 'تحلل الأنسجة الداخلية للتفاحة بسبب التخزين أو تشبع القلب.' },
      { name: 'Russeting (Skin Roughness)', nameAr: 'الصدأ القشري (Russeting)', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'خشونة بنية على القشرة حول العنق.' },
      { name: 'Hail Damage / Indentations', nameAr: 'كدمات حبات البرد (البَرَد)', detectionTech: 'GlobalScan', severity: 'major', descriptionAr: 'انبعاجات ناتجة عن تساقط حبات البرد.' },
      { name: 'Bruising from picking', nameAr: 'كدمات الجمع والنقل', detectionTech: 'Insight NIR', severity: 'major', descriptionAr: 'تلف الأنسجة الرقيقة تحت القشرة يكشفها مطياف NIR.' }
    ],
    outlets: [
      { name: 'Export Grade Extra (Blush > 75%)', nameAr: 'تصدير سوبر ممتاز (تلوين > 75%)', criteriaAr: 'لون أحمر ناصع، خالية من الصدأ والاسمرار الداخلي، بريكس > 13°Bx', percentageTarget: 48 },
      { name: 'Export Standard (Blush 50-75%)', nameAr: 'تصدير قياسي (تلوين 50-75%)', criteriaAr: 'لون أحمر متوسط، قطر 65-80 مم، متماسكة جداً', percentageTarget: 28 },
      { name: 'Domestic Class 2', nameAr: 'سوق محلي درجة ثانية', criteriaAr: 'نسبة احمرار أقل أو صدأ قشري خفيف حول العنق', percentageTarget: 14 },
      { name: 'Cider & Puree Juice Processing', nameAr: 'تصنيع معجون وعصير تفاح', criteriaAr: 'كدمات بستانية أو عيوب حجم، سليمة من الأعفان', percentageTarget: 8 },
      { name: 'Reject / Core Rot', nameAr: 'عادم وتالف (عفن القلب)', criteriaAr: 'اكتشاف عفن داخلي عبر مستشعر Insight NIR', percentageTarget: 2 }
    ]
  },
  {
    id: 'apple_golden',
    name: 'Golden Delicious Apple',
    nameAr: 'تفاح جولدن ديليشس (أصفر)',
    defaultWeight: 175,
    defaultDiameter: 75,
    defaultBrix: 13.8,
    minExportBrix: 12.5,
    commonDefects: [
      { name: 'Lenticel Russeting', nameAr: 'صدأ العديسات النقطي', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'نقاط صدئية دقيقة على القشرة الصفراء الحساسة.' },
      { name: 'Flesh Softness', nameAr: 'فقدان الصلابة والقرمشة', detectionTech: 'Insight NIR', severity: 'major', descriptionAr: 'هبوط صلابة التفاحة دون 5.5 كجم/سم².' }
    ],
    outlets: [
      { name: 'Golden Extra (Clear Yellow/Green)', nameAr: 'جولدن ممتاز تصدير ناصع', criteriaAr: 'لون ذهبي ناصع خالي من الخدوش، صلابة ممتازة', percentageTarget: 46 },
      { name: 'Class 1 Standard', nameAr: 'صنف أول قياسي', criteriaAr: 'تلوين متجانس، قطر 70-80 مم', percentageTarget: 34 },
      { name: 'Domestic / Compote', nameAr: 'محلي ومربيات وكمبوت', criteriaAr: 'صدأ خفيف أو أحجام متباينة', percentageTarget: 20 }
    ]
  },
  {
    id: 'pear',
    name: 'Williams / Conference Pear',
    nameAr: 'كمثرى (كونفرنس / وليامز)',
    defaultWeight: 190,
    defaultDiameter: 68,
    defaultBrix: 12.8,
    minExportBrix: 11.5,
    commonDefects: [
      { name: 'Internal Breakdown', nameAr: 'التلف والتحلل اللحمي الداخلي', detectionTech: 'Insight NIR', severity: 'critical', descriptionAr: 'اسمرار وذوبان اللب حول البذور أثناء التخزين.' },
      { name: 'Friction Bruises', nameAr: 'سواد الاحتكاك بين الثمار', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'بقع سوداء ناتجة عن احتكاك قشرة الكمثرى الحساسة.' }
    ],
    outlets: [
      { name: 'Class 1 Export Long Stem', nameAr: 'تصدير نخب أول بالعنق الأخضر', criteriaAr: 'شكل كمثري نموذجي، عنق سليم، صلبة', percentageTarget: 44 },
      { name: 'Class 1 Standard', nameAr: 'تصدير قياسي', criteriaAr: 'لون أخضر/أصفر متناسق', percentageTarget: 36 },
      { name: 'Juice / Puree / Reject', nameAr: 'بيوريه وتصنيع وعادم', criteriaAr: 'تحلل داخلي أو ثمار شديدة النضج', percentageTarget: 20 }
    ]
  },

  // 3. التمور الفاخرة (Dates)
  {
    id: 'dates_medjool',
    name: 'Medjool Dates',
    nameAr: 'تمر مجهول (تمور فاخرة)',
    defaultWeight: 24,
    defaultDiameter: 34,
    defaultBrix: 64.0,
    minExportBrix: 58.0,
    commonDefects: [
      { name: 'Skin Separation (Puffiness)', nameAr: 'انفصال القشرة (الانتفاخ/البفنج)', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'انفصال القشرة الخارجية عن اللحم، معيار حاسم في تصنيف المجهول.' },
      { name: 'Moisture Discrepancy', nameAr: 'اختلاف نسبة الرطوبة', detectionTech: 'Insight NIR', severity: 'major', descriptionAr: 'تحديد درجة الرطوبة (Moist, Semi-dry, Hard).' },
      { name: 'Bird pecks & insect frass', nameAr: 'إصابات حشرية ونقر طيور', detectionTech: 'GlobalScan', severity: 'critical', descriptionAr: 'فحص تجاويف التمرة بحثاً عن أي ثقوب حشرية.' }
    ],
    outlets: [
      { name: 'Super Jumbo Export (< 5% skin separation)', nameAr: 'سوبر جامبو تصدير (انفصال قشرة < 5%)', criteriaAr: 'وزن > 23 جم، قشرة ملتصقة تماماً، رطوبة مثالية 22-24%', percentageTarget: 38 },
      { name: 'Jumbo Class 1 (5-10% skin separation)', nameAr: 'جامبو نخب أول (انفصال 5-10%)', criteriaAr: 'وزن 20-23 جم، مظهر لامع متجانس', percentageTarget: 32 },
      { name: 'Large Standard', nameAr: 'لارج قياسي', criteriaAr: 'وزن 17-20 جم، نسبة انفصال متوسطة', percentageTarget: 18 },
      { name: 'Industrial / Date Paste Processing', nameAr: 'عجينة تمور وصناعي', criteriaAr: 'تمور جافة جداً أو بها تمزق قشري زائد', percentageTarget: 10 },
      { name: 'Cull / Insect damage', nameAr: 'عادم (إصابات حشرية وعفن)', criteriaAr: 'تمور مخمورة أو مصابة بحشرات', percentageTarget: 2 }
    ]
  },
  {
    id: 'dates_barhi',
    name: 'Barhi Fresh Dates (Yellow)',
    nameAr: 'بلح برحي طازج (خلال أصفر)',
    defaultWeight: 18,
    defaultDiameter: 28,
    defaultBrix: 32.0,
    minExportBrix: 28.0,
    commonDefects: [
      { name: 'Tannin Astringency / Under-ripe', nameAr: 'نسبة القباظة والتانينات العالية', detectionTech: 'Insight NIR', severity: 'major', descriptionAr: 'عدم اكتمال حلاوة البلح وطعم قابض.' },
      { name: 'Rutab softening tip', nameAr: 'ترطيب القمة (تحول إلى رطب)', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'بداية تحول حبة البرحي المقرمشة للرطب.' }
    ],
    outlets: [
      { name: 'Extra Golden Crunchy Export', nameAr: 'تصدير ذهبي مقرمش فاخر', criteriaAr: 'لون أصفر ذهبي ناصع، قرمشة كاملة، صفر رطب', percentageTarget: 60 },
      { name: 'Fresh Domestic Market', nameAr: 'سوق محلي طازج', criteriaAr: 'بداية ترطيب طفيف بنسبة < 5%', percentageTarget: 25 },
      { name: 'Rutab / Processing', nameAr: 'رطب وتصنيع محلي', criteriaAr: 'حبات نصف مرطبة أو لينة', percentageTarget: 15 }
    ]
  },

  // 4. الفواكه الاستوائية وشبه الاستوائية (Tropical & Subtropical)
  {
    id: 'mango',
    name: 'Keitt / Tommy Mango',
    nameAr: 'مانجو (كيت / تومي / عويس)',
    defaultWeight: 480,
    defaultDiameter: 98,
    defaultBrix: 14.5,
    minExportBrix: 12.0,
    commonDefects: [
      { name: 'Internal Jelly Seed / Cavity', nameAr: 'التحلل الهلامي للبذرة (Jelly Seed)', detectionTech: 'Insight NIR', severity: 'critical', descriptionAr: 'تحلل لب المانجو حول النواة وتحوله لهلام فاسد دون ظهور خارجي.' },
      { name: 'Anthracnose Black Spots', nameAr: 'الأنثراكنوز والتبقع الأسود', detectionTech: 'GlobalScan', severity: 'critical', descriptionAr: 'فطر يسبب بقع سوداء منغرسة بالقشرة تتسع سريعاً أثناء الشحن.' },
      { name: 'Latex / Sap Burn', nameAr: 'حروق المادة اللبنية (عصارة العنق)', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'خطوط سوداء ناتجة عن سيلان لبن العنق على القشرة.' }
    ],
    outlets: [
      { name: 'Air-Freight Premium Export', nameAr: 'تصدير طيران سوبر فاخر', criteriaAr: 'خالية من اللبن والأنثراكنوز، وزن 400-600 جم، نضج متجانس', percentageTarget: 42 },
      { name: 'Sea-Freight Export Class 1', nameAr: 'تصدير بحري قياسي (شحن مبرد)', criteriaAr: 'صلابة عالية، خلو من التحلل الداخلي', percentageTarget: 38 },
      { name: 'Domestic Market', nameAr: 'سوق محلي ممتاز', criteriaAr: 'تلوين ناضج جداً لا يتحمل الشحن الطويل', percentageTarget: 12 },
      { name: 'Mango Pulp / Processing', nameAr: 'مصانع اللب والعصائر', criteriaAr: 'أحجام عملاقة > 800 جم أو خدوش قشرية', percentageTarget: 8 }
    ]
  },
  {
    id: 'pomegranate',
    name: 'Wonderful Pomegranate',
    nameAr: 'رمان وندرفول / منفلوطي',
    defaultWeight: 360,
    defaultDiameter: 88,
    defaultBrix: 16.2,
    minExportBrix: 14.5,
    commonDefects: [
      { name: 'Heart Rot (Black Aril Decay)', nameAr: 'العفن الأسود الداخلي (عفن القلب)', detectionTech: 'Insight NIR', severity: 'critical', descriptionAr: 'تعفن الحبوب الحمراء الداخلية وتحولها للسواد مع قشرة خارجية سليمة تماماً.' },
      { name: 'Cracking / Splits', nameAr: 'تشقق الثمار وانفجار القشرة', detectionTech: 'GlobalScan', severity: 'critical', descriptionAr: 'انفتاح قشرة الرمان وظهور الحبوب.' },
      { name: 'Crown / Calyx Mites', nameAr: 'عفن التاج الزهري والحلم', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'أوساخ أو أعفان داخل تاج الثمرة.' }
    ],
    outlets: [
      { name: 'Deep Red Extra Export', nameAr: 'تصدير سوبر ممتاز قرمزي', criteriaAr: 'لون أحمر قرمزي ناصع > 85%، تاج سليم، وزن > 350 جم', percentageTarget: 48 },
      { name: 'Class 1 Export', nameAr: 'تصدير صنف أول', criteriaAr: 'تلوين جيد، خالي من العفن الداخلي', percentageTarget: 32 },
      { name: 'Aril Extraction (Fresh Cups)', nameAr: 'فرط وتعبئة حبوب الرمان الطازجة', criteriaAr: 'تشققات قشرية مع حبوب حمراء ممتازة وسليمة', percentageTarget: 14 },
      { name: 'Pomegranate Molasses & Juice', nameAr: 'دبس رمان وعصير مركز', criteriaAr: 'أحجام صغيرة أو تشوهات شكلية', percentageTarget: 6 }
    ]
  },
  {
    id: 'avocado_hass',
    name: 'Hass Avocado',
    nameAr: 'أفوكادو هاس (فواكه استوائية)',
    defaultWeight: 210,
    defaultDiameter: 70,
    defaultBrix: 24.5,
    minExportBrix: 21.0,
    commonDefects: [
      { name: 'Dry Matter % / Oil Content', nameAr: 'المادة الجافة ونسبة الزيوت', detectionTech: 'Insight NIR', severity: 'critical', descriptionAr: 'المعيار القانوني لنضج الأفوكادو، يجب ألا تقل المادة الجافة عن 21% للشحن التجاري.' },
      { name: 'Body Rots (Colletotrichum)', nameAr: 'عفن الثمرة الداخلي (الأنثراكنوز)', detectionTech: 'Insight NIR', severity: 'critical', descriptionAr: 'عفن داخل اللب الأخضر لا يظهر على القشرة الداكنة.' },
      { name: 'Lenticel Damage / Wind Scarring', nameAr: 'خدوش الرياح وتشوهات العديسات', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'خشونة قشرية داكنة نتيجة احتكاك الفروع.' }
    ],
    outlets: [
      { name: 'Ready-to-Eat Premium Export', nameAr: 'تصدير فاخر ناضج للأكل (Premium)', criteriaAr: 'مادة جافة > 23%، خالية من العفن الداخلي، حجم متناسق', percentageTarget: 50 },
      { name: 'Standard Export Air/Sea', nameAr: 'تصدير بحري قياسي', criteriaAr: 'مادة جافة 21-23%، قشرة سليمة خالية من الخدوش العميقة', percentageTarget: 30 },
      { name: 'Local Market Fresh', nameAr: 'سوق محلي طازج', criteriaAr: 'ندوب قشرية طفيفة من الرياح', percentageTarget: 12 },
      { name: 'Guacamole / Food Service Pulping', nameAr: 'تصنيع الجواكامولي والمعلبات', criteriaAr: 'أحجام غير قياسية أو تشوهات شكلية مع لب سليم', percentageTarget: 7 },
      { name: 'Rejection (Internal rot/Under-ripe)', nameAr: 'مرفوض (عفن داخلي أو غير ناضج)', criteriaAr: 'مادة جافة غير كافية أو تعفن لبي', percentageTarget: 1 }
    ]
  },

  // 5. الفواكه ذات النواة الحجرية (Stone Fruits)
  {
    id: 'peach',
    name: 'Peaches & Nectarines',
    nameAr: 'خوخ ونكتارين سكري',
    defaultWeight: 145,
    defaultDiameter: 66,
    defaultBrix: 12.2,
    minExportBrix: 10.5,
    commonDefects: [
      { name: 'Split Pit (Seed Cavity Crack)', nameAr: 'انقسام النواة الداخلي (Split Pit)', detectionTech: 'Insight NIR', severity: 'major', descriptionAr: 'انشطار النواة الخشبية داخل الخوخة مما يسمح بدخول حشرات أو عفن.' },
      { name: 'Velvet Bruising', nameAr: 'كدمات الزغب اللحمي', detectionTech: 'Insight NIR', severity: 'minor', descriptionAr: 'انضغاط الأنسجة اللحمية اللينة.' }
    ],
    outlets: [
      { name: 'Class 1 Air-Freight Export', nameAr: 'تصدير طيران نخب أول فائق الجودة', criteriaAr: 'تلوين قرمزي متوهج > 80%، خالي من انقسام النواة، صلب ومتماسك', percentageTarget: 52 },
      { name: 'Class 1 Standard Maritime', nameAr: 'تصدير شحن مبرد قياسي', criteriaAr: 'صلابة 4-5 كجم، حجم متجانس', percentageTarget: 30 },
      { name: 'Domestic / Compote Canning', nameAr: 'سوق محلي وكمبوت معلب', criteriaAr: 'أحجام متباينة أو ثمار شديدة الحلاوة سريعة الاستهلاك', percentageTarget: 18 }
    ]
  },
  {
    id: 'apricot',
    name: 'Canino Apricot',
    nameAr: 'مشمش (كانينو / حموي)',
    defaultWeight: 52,
    defaultDiameter: 44,
    defaultBrix: 14.0,
    minExportBrix: 11.5,
    commonDefects: [
      { name: 'Pit Burn (Over-maturity)', nameAr: 'احتراق النواة والتخمر الداخلي', detectionTech: 'Insight NIR', severity: 'critical', descriptionAr: 'سواد حول بذرة المشمش بسبب درجات الحرارة المرتفعة قبل الجمع.' },
      { name: 'Shothole Scabs', nameAr: 'ثقوب وتبقعات القشرة الفطرية', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'ندبات بنية خشنة على سطح حبة المشمش.' }
    ],
    outlets: [
      { name: 'Export Grade 1 Extra', nameAr: 'تصدير نخب أول ممتاز', criteriaAr: 'لون برتقالي ناصع مع خد قرمزي، خالي من حروق النواة', percentageTarget: 50 },
      { name: 'Domestic Fresh Market', nameAr: 'سوق محلي طازج', criteriaAr: 'ثمار تامة النضج للأكل الفوري', percentageTarget: 28 },
      { name: 'Jam & Puree / Dried Apricot', nameAr: 'مربى وتجفيف مشمشية وقمر الدين', criteriaAr: 'ثمار لينة أو عيوب حجم', percentageTarget: 22 }
    ]
  },
  {
    id: 'plum',
    name: 'Black Amber / Red Plum',
    nameAr: 'برقوق (أحمر / أسود)',
    defaultWeight: 75,
    defaultDiameter: 52,
    defaultBrix: 13.5,
    minExportBrix: 11.5,
    commonDefects: [
      { name: 'Bloom Loss (Wax wipe-off)', nameAr: 'مسح الطبقة الشمعية الطبيعية (Bloom)', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'زوال البودرة البيضاء الشمعية الحامية للبرقوق.' },
      { name: 'Gumming / Gel Breakdown', nameAr: 'التصمغ والتحلل الجيلاتيني', detectionTech: 'Insight NIR', severity: 'major', descriptionAr: 'تكون إفرازات صمغية لزجة داخل اللب.' }
    ],
    outlets: [
      { name: 'Class 1 Export Extra', nameAr: 'تصدير نخب أول ممتاز', criteriaAr: 'شمعية طبيعية كاملة، تلوين غامق متجانس، صلابة ممتازة', percentageTarget: 55 },
      { name: 'Class 2 Domestic', nameAr: 'سوق محلي طازج', criteriaAr: 'شمعية ممسوحة جزئياً، أحجام قياسية', percentageTarget: 30 },
      { name: 'Prune Drying / Processing', nameAr: 'تجفيف قراصيا وعصائر', criteriaAr: 'حبات لينة جداً غنية بالسكر', percentageTarget: 15 }
    ]
  },
  {
    id: 'cherry',
    name: 'Sweet Cherries',
    nameAr: 'كرز / حب الملوك (توتيات)',
    defaultWeight: 11,
    defaultDiameter: 28,
    defaultBrix: 18.2,
    minExportBrix: 16.0,
    commonDefects: [
      { name: 'Nose Cracking / Rain Splitting', nameAr: 'تشقق القمة بسبب مياه الأمطار', detectionTech: 'GlobalScan', severity: 'critical', descriptionAr: 'انفلاق قاع الكرز نتيجة امتصاص الماء الزائد قبل الحصاد.' },
      { name: 'Stem Desiccation / Loss', nameAr: 'جفاف أو سقوط العنق الأخضر', detectionTech: 'GlobalScan', severity: 'major', descriptionAr: 'تحول عنق حبة الكرز إلى اللون البني الجاف.' }
    ],
    outlets: [
      { name: 'Jumbo Premium Air Export (30mm+)', nameAr: 'جامبو تصدير طيران سوبر (قطر > 30 مم)', criteriaAr: 'عنق أخضر نضر، لون عنابي غامق، صلابة قوية، سكر > 18°Bx', percentageTarget: 46 },
      { name: 'Standard Export (26-29mm)', nameAr: 'تصدير قياسي (26-29 مم)', criteriaAr: 'خالي من التشققات، متماسك جداً', percentageTarget: 34 },
      { name: 'Local Market / Canning', nameAr: 'سوق محلي ومعلبات مربى', criteriaAr: 'أحجام أصغر من 24 مم أو حبات بدون عنق', percentageTarget: 20 }
    ]
  },

  // 6. الخضروات الثمرية والدرنات (Vegetables & Roots)
  {
    id: 'tomato',
    name: 'Beef & Cluster Tomatoes',
    nameAr: 'طماطم مائدة وعناقيد (طماطم)',
    defaultWeight: 140,
    defaultDiameter: 68,
    defaultBrix: 5.2,
    minExportBrix: 4.5,
    commonDefects: [
      { name: 'Blossom End Rot (BER)', nameAr: 'عفن الطرف الزهري (نقص كالسيوم)', detectionTech: 'GlobalScan', severity: 'critical', descriptionAr: 'بقعة سوداء جلدية منخفضة في قاع الطماطم.' },
      { name: 'Radial / Concentric Cracking', nameAr: 'التشقق الدائري والشعاعي للعنق', detectionTech: 'GlobalScan', severity: 'major', descriptionAr: 'شقوق قشرية حول منطقة اتصال العنق.' },
      { name: 'Catfacing (Shape Deformity)', nameAr: 'تشوه وجه القطة الندبي', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'تشوهات هيكلية وندبات بنية قبيحة في الثمرة.' }
    ],
    outlets: [
      { name: 'Greenhouse Truss Export Grade 1', nameAr: 'تصدير صوب زراعية نخب أول (عناقيد)', criteriaAr: 'تلوين متجانس (درجة 4-5)، لمعان قشري، صلابة عالية، قطر 65-75 مم', percentageTarget: 50 },
      { name: 'Open Field Table Standard', nameAr: 'طماطم مائدة قياسية', criteriaAr: 'حمراء صلبة خالية من الشقوق', percentageTarget: 32 },
      { name: 'Domestic Market', nameAr: 'سوق محلي', criteriaAr: 'تشوهات شكلية خفيفة', percentageTarget: 12 },
      { name: 'Tomato Paste / Processing', nameAr: 'معجون وصلصة طماطم', criteriaAr: 'ثمار ناضجة جداً أو تشققات غير متعفنة', percentageTarget: 6 }
    ]
  },
  {
    id: 'bell_pepper',
    name: 'Bell Peppers (Blocky)',
    nameAr: 'فلفل حلو ألوان (رومي)',
    defaultWeight: 195,
    defaultDiameter: 82,
    defaultBrix: 6.8,
    minExportBrix: 5.5,
    commonDefects: [
      { name: 'Sunscald Silvery Patch', nameAr: 'لفحة الشمس البيضاء الفضية', detectionTech: 'GlobalScan', severity: 'major', descriptionAr: 'ترقق القشرة وتبيضها وجفاف الجدار اللحمي.' },
      { name: 'Internal Mold (Alternaria)', nameAr: 'العفن الأسود الداخلي للبذور', detectionTech: 'Insight NIR', severity: 'critical', descriptionAr: 'نمو عفن أسود داخل تجويف الفلفل دون أن يظهر خارجياً.' }
    ],
    outlets: [
      { name: 'Export 4-Lobe Jumbo (Red/Yellow/Orange)', nameAr: 'تصدير جامبو رباعي الفصوص نخب أول', criteriaAr: 'أربعة فصوص متناسقة، جدار سميك مقرمش، قطر > 80 مم', percentageTarget: 54 },
      { name: 'Standard Export 3-Lobe', nameAr: 'تصدير ثلاثي الفصوص قياسي', criteriaAr: 'تلوين كامل خالي من الخدوش', percentageTarget: 30 },
      { name: 'Domestic Fresh Market', nameAr: 'سوق محلي طازج', criteriaAr: 'أحجام متباينة أو تلوين مختلط (أخضر/أحمر)', percentageTarget: 16 }
    ]
  },
  {
    id: 'strawberry',
    name: 'Festival / Fortuna Strawberry',
    nameAr: 'فراولة طازجة (تصدير مبرد)',
    defaultWeight: 26,
    defaultDiameter: 34,
    defaultBrix: 9.8,
    minExportBrix: 8.5,
    commonDefects: [
      { name: 'Botrytis Cinerea (Grey Mold)', nameAr: 'عفن البوتريتس الرمادي', detectionTech: 'Viotec UV', severity: 'critical', descriptionAr: 'عفن فطري وبقع طرية رمادية تنتشر بسرعة فائقة.' },
      { name: 'Green Tip / White Shoulders', nameAr: 'القمة الخضراء أو الأكتاف البيضاء', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'عدم اكتمال التلوين الأحمر الناصع في قمة الحبة.' },
      { name: 'Albinism (Pale Watery Flesh)', nameAr: 'المهق واللب المائي الشاحب', detectionTech: 'Insight NIR', severity: 'major', descriptionAr: 'حبات فراولة بيضاء طرية عديمة الطعم.' }
    ],
    outlets: [
      { name: 'Air-Freight Extra Premium (Punnets)', nameAr: 'تصدير طيران سوبر فاخر (علب بانت)', criteriaAr: 'تلوين أحمر ياقوتي > 95%، كأس أخضر نضر، وزن 24-32 جم، صلابة عالية', percentageTarget: 48 },
      { name: 'Class 1 Export Supermarkets', nameAr: 'تصدير سلاسل تجارية قياسي', criteriaAr: 'حجم متناسق، خالية تماماً من الرضوض', percentageTarget: 32 },
      { name: 'Domestic Fresh Punnets', nameAr: 'سوق محلي علب طازجة', criteriaAr: 'أكتاف بيضاء خفيفة أو أحجام متباينة', percentageTarget: 14 },
      { name: 'IQF Freezing / Puree Processing', nameAr: 'تجميد سريع IQF ومربى وتصنيع', criteriaAr: 'ثمار ناضجة جداً أو أحجام غير قياسية', percentageTarget: 6 }
    ]
  },
  {
    id: 'kiwi',
    name: 'Hayward Green Kiwi',
    nameAr: 'كيوي هايوارد أخضر',
    defaultWeight: 98,
    defaultDiameter: 54,
    defaultBrix: 14.2,
    minExportBrix: 12.5,
    commonDefects: [
      { name: 'Flesh Firmness Loss (< 6.2 kgf)', nameAr: 'انخفاض الصلابة اللحمية', detectionTech: 'Insight NIR', severity: 'major', descriptionAr: 'ليونة الحبة وفقدانها قوام التخزين الطويل.' },
      { name: 'Hayward Marks (Furrow Scars)', nameAr: 'أخاديد وتشوهات القشرة الوبرية', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'ندبات طولية غائرة في الجلد البني الوبري.' }
    ],
    outlets: [
      { name: 'Class 1 Export Extra (Caliber 27-33)', nameAr: 'تصدير نخب أول (كاليبر 27-33)', criteriaAr: 'صلابة > 6.5 كجم، شكل بيضاوي منتظم، وبر متجانس', percentageTarget: 52 },
      { name: 'Class 1 Standard Maritime', nameAr: 'تصدير شحن بحري طويل', criteriaAr: 'شكل قياسي، سكر متناسق', percentageTarget: 34 },
      { name: 'Domestic Market / Smoothie Pulp', nameAr: 'سوق محلي وعصير وسموذي', criteriaAr: 'حبات مسطحة Fan-shaped أو لينة', percentageTarget: 14 }
    ]
  },
  {
    id: 'onion',
    name: 'Golden Yellow / Red Onion',
    nameAr: 'بصل ذهبي وأحمر للتصدير',
    defaultWeight: 170,
    defaultDiameter: 74,
    defaultBrix: 11.0,
    minExportBrix: 9.0,
    commonDefects: [
      { name: 'Black Mold (Aspergillus niger)', nameAr: 'العفن الأسود بين الحراشف', detectionTech: 'Insight NIR', severity: 'critical', descriptionAr: 'سواد فطري مدفون تحت القشور الخارجية الجافة.' },
      { name: 'Double / Split Bulbs', nameAr: 'البصل المزدوج والمنقسم', detectionTech: 'GlobalScan', severity: 'major', descriptionAr: 'رأسان مندمجان في بصلة واحدة غير منتظمة الشكل.' },
      { name: 'Neck Rot / Sprouting', nameAr: 'عفن العنق وبدء التزريع الأخضر', detectionTech: 'GlobalScan', severity: 'critical', descriptionAr: 'ليونة عنق البصلة أو خروج نبتة خضراء.' }
    ],
    outlets: [
      { name: 'Grade 1 Export (Golden Dry Skin 70-90mm)', nameAr: 'تصدير نخب أول (قشرة ذهبية جافة 70-90 مم)', criteriaAr: 'قشور جافة محكمة، عنق مغلق تماماً، خالي من الازدواج', percentageTarget: 55 },
      { name: 'Grade 1 Medium Export (50-70mm)', nameAr: 'تصدير متوسط قياسي (50-70 مم)', criteriaAr: 'صلابة قوية، قشور متماسكة', percentageTarget: 28 },
      { name: 'Domestic Market Bags', nameAr: 'سوق محلي شوالات', criteriaAr: 'قشور متساقطة جزئياً أو أحجام كبيرة', percentageTarget: 14 },
      { name: 'Dehydration / Onion Powder Cull', nameAr: 'تجفيف وبودرة بصل وصناعي', criteriaAr: 'ازدواج أو عيوب شكلية', percentageTarget: 3 }
    ]
  },
  {
    id: 'potato',
    name: 'Spunta / Hermes Table Potato',
    nameAr: 'بطاطس مائدة وشيبسي (سبونتا/هيرمس)',
    defaultWeight: 210,
    defaultDiameter: 68,
    defaultBrix: 21.0, // Specific gravity / Dry matter
    minExportBrix: 19.0,
    commonDefects: [
      { name: 'Greening (Solanine Formation)', nameAr: 'الاخضرار وتكون مادة السولانين السامة', detectionTech: 'GlobalScan', severity: 'critical', descriptionAr: 'تحول جلد البطاطس للون الأخضر بفعل التعرض للضوء.' },
      { name: 'Hollow Heart (Internal Cavity)', nameAr: 'القلب الأجوف الداخلي (Hollow Heart)', detectionTech: 'Insight NIR', severity: 'major', descriptionAr: 'فراغ بني غير منتظم في قلب درنة البطاطس.' },
      { name: 'Common Scab & Mechanical Cuts', nameAr: 'الجرب الشائع وجروح الحصاد الآلي', detectionTech: 'GlobalScan', severity: 'minor', descriptionAr: 'ندبات جربية سطحية أو كدمات آلات التقليع.' }
    ],
    outlets: [
      { name: 'Grade A Washing Export (Washed & Polished)', nameAr: 'تصدير غسيل وتلميع نخب أول (أوروبا والخليج)', criteriaAr: 'مغسولة ومجففة، خالية تماماً من الاخضرار والقلب الأجوف، قطر 45-75 مم', percentageTarget: 52 },
      { name: 'Crisp / French Fry Processing (Hermes)', nameAr: 'تصنيع شيبسي وبطاطس نصف مقلية', criteriaAr: 'مادة جافة > 20.5%، سكريات مختزلة منخفضة لمنع الاحتراق', percentageTarget: 32 },
      { name: 'Domestic Market Table', nameAr: 'سوق محلي طازج', criteriaAr: 'ندبات جربية طفيفة أو أحجام غير متماثلة', percentageTarget: 14 },
      { name: 'Starch / Rejection', nameAr: 'نشا وعادم تالف', criteriaAr: 'درنات خضراء أو متعفنة', percentageTarget: 2 }
    ]
  }
];

export const FAULT_CODES: FaultCode[] = [
  {
    code: 'ALM-104',
    title: 'Chain Pulse Synchronization Drift',
    titleAr: 'انحراف تزامن نبضات سير النواقل (Chain Pulse Sync)',
    subsystem: 'Drive & Encoder',
    subsystemAr: 'المحرك الرئيسي والإنكودر الحركي',
    severity: 'error',
    causeAr: 'تأخر أو تسارع نبضات الإنكودر البصري بالنسبة للحساس الضوئي المرجعي للكؤوس بسبب تمدد جنزير السير أو تراكم أوساخ على قرص الإنكودر.',
    solutionAr: '1. إيقاف السير وتنظيف قرص ومتحسس الإنكودر من الأتربة والشحوم.\n2. التحقق من شداد جنزير ناقل الكؤوس (Biconical Chain Tension).\n3. إعادة معايرة الصفر المرجعي في شاشة MAF Supervision.',
    solutionEn: 'Check chain tensioner, clean optical encoder wheel, and perform zero-pulse homing in MAF Supervision.'
  },
  {
    code: 'ALM-212',
    title: 'Ejector Solenoid Bank Air Pressure Low',
    titleAr: 'انخفاض ضغط الهواء في مجمع صمامات الطرد الهوائية',
    subsystem: 'Pneumatics & Outlets',
    subsystemAr: 'النظام الهوائي وصمامات الطرد',
    severity: 'critical',
    causeAr: 'هبوط ضغط الهواء المضغوط المغذي لصمامات الطرد السريعة إلى ما دون 5.5 بار، مما يتسبب في تفويت طرد الثمار إلى مساراتها المحددة.',
    solutionAr: '1. فحص ضاغط الهواء المركزي للمحطة ومستوى الفلاتر ومجفف الهواء (Air Dryer).\n2. تفقد تسريبات خراطيم الفركشن السريعة 8mm المتصلة بمسدس الطرد.\n3. التأكد من ضبط منظم الضغط على 6.0 - 6.5 بار مستقر.',
    solutionEn: 'Inspect main packhouse compressor, check 8mm quick-fit tubing leaks, and verify regulator reads 6.2 bar stable.'
  },
  {
    code: 'ALM-305',
    title: 'GlobalScan Lighting Strobe Driver Desync',
    titleAr: 'عدم تزامن وميض إضاءة كاميرات GlobalScan 7',
    subsystem: 'Vision Cabin',
    subsystemAr: 'حجرة الرؤية البصرية GlobalScan',
    severity: 'error',
    causeAr: 'تداخل في إشارة القدح (Trigger signal) الخاصة بلوحة LED Strobes مع سرعة دوران كاميرات الـ CMOS.',
    solutionAr: '1. فتح حجرة الكاميرات والتحقق من كابل إشارة الفلاش LVDS المربوط بكارت الرؤية.\n2. تنظيف زجاج الحماية الواقي للكاميرات من رذاذ الشمع والماء.\n3. إجراء اختبار White Balance Calibration (معايرة التوازن الأبيض) عبر لوح المعايرة القياسي.',
    solutionEn: 'Clean camera optical protection windows, check strobe trigger LVDS harness, and run White Balance calibration.'
  },
  {
    code: 'ALM-418',
    title: 'Insight NIR Halogen Reference Lamp Degradation',
    titleAr: 'تراجع شدة لمبة الهالوجين المرجعية في حساس السكر Insight NIR',
    subsystem: 'Insight Spectrometer',
    subsystemAr: 'مطياف فحص السكر بالأشعة تحت الحمراء',
    severity: 'warning',
    causeAr: 'تجاوز لمبة الهالوجين الطيفية عمرها الافتراضي (أكثر من 3000 ساعة عمل) مما أدى لهبوط شدة طيف 900-1100 نانومتر.',
    solutionAr: '1. استبدال لمبة الهالوجين الخاصة بـ Falcon Eye بلمبة أصلية جديدة.\n2. تشغيل الماكينة لمدة 15 دقيقة للتسخين والاستقرار الحراري.\n3. إجراء معايرة المرجع المظلم والأبيض (Dark & White Reference Calibration).',
    solutionEn: 'Replace halogen emitter bulb, allow 15-minute thermal stabilization, and run Dark/White reference scan.'
  },
  {
    code: 'ALM-522',
    title: 'Line Pack Delta Robot Gripper Vacuum Loss',
    titleAr: 'فقدان تفريغ الهواء في رأس التقاط روبوت التعبئة Line Pack',
    subsystem: 'Line Pack Delta Cell',
    subsystemAr: 'خلية روبوت الدلتا لتعبئة الكراتين',
    severity: 'warning',
    causeAr: 'انسداد أو تمزق في كؤوس السيليكون الشفاطة (Suction Cups) أو انخفاض أداء مولد الفاكيوم الفنتوري (Venturi generator).',
    solutionAr: '1. فحص كؤوس السيليكون واستبدال المتآكل منها فوراً لتفادي إسقاط الثمار.\n2. تنظيف فتحات الهواء وفلتر الفاكيوم المدمج في ذراع الروبوت من الألياف والغبار.\n3. التأكد من كفاءة حساس الفاكيوم الرقمي (Digital Vacuum Switch).',
    solutionEn: 'Inspect silicone bellows for tears, clean in-line vacuum filter, and test digital vacuum switch threshold.'
  }
];
