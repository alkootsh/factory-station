import React, { useState } from 'react';
import {
  Cog,
  Wrench,
  Zap,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  Filter,
  DollarSign,
  Layers,
  ArrowRight,
  Info,
  ShieldCheck,
  Cpu,
  Droplets,
  Wind,
  Box,
  Truck,
  Eye,
  Sliders,
  Camera,
  Maximize2,
  ThermometerSnowflake,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface LineMachineryEquipmentsProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

interface EquipmentItem {
  id: string;
  nameAr: string;
  nameEn: string;
  stageNameAr: string;
  stageNameEn: string;
  modelCode: string;
  functionAr: string;
  functionEn: string;
  specs: {
    powerKw: number;
    voltage: string;
    airConsumptionBar?: string;
    waterConsumptionLph?: string;
    material: string;
    dimensions: string;
  };
  plcRequirements: string;
  estimatedCostUsd: number;
  criticality: 'essential' | 'recommended' | 'optional';
  oemReference: string;
  imageUrl?: string;
  imageCaptionAr?: string;
}

interface LineEquipmentSet {
  lineId: string;
  lineNameAr: string;
  lineNameEn: string;
  categoryAr: string;
  iconEmoji: string;
  totalEstimatedCapexUsd: number;
  totalPowerKw: number;
  recommendedFootprint: string;
  equipments: EquipmentItem[];
}

export const LineMachineryEquipments: React.FC<LineMachineryEquipmentsProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  // Real Generated Machinery Photos
  const MACHINERY_PHOTOS = [
    {
      id: 'opt_sorter',
      titleAr: 'ماكينة الفرز والتدريج البصري 4K مع كابينة الفحص المضيئة',
      titleEn: 'Optical Fruit & Veg Sorter with 4K Inspection Tunnel',
      url: '/src/assets/images/optical_sorter_machine_1792265626106.jpg',
      categoryAr: 'الفرز البصري والرؤية الصناعية',
      specsAr: 'فحص 360° · 15 حبة/ثانية · كاميرات GigE CMOS · ستروب LED عالي الشدة'
    },
    {
      id: 'cold_plant',
      titleAr: 'عنابر التخزين المبرد ورص الطبالي وشيلرات التبريد المركزية',
      titleEn: 'Cold Storage High-Bay Warehouse & Central Chillers',
      url: '/src/assets/images/cold_storage_plant_1792265627057.jpg',
      categoryAr: 'قسم الثلاجات وحفظ المحاصيل',
      specsAr: 'عزل PIR 150mm · حرارة 0°C إلى 8°C · شيلر أمونيا مركزي R717 · كفاءة COP 3.82'
    },
    {
      id: 'grain_sorter',
      titleAr: 'ماكينة الفرز اللوني الكهروضوئي للحبوب والبقوليات والأرز والسمسم',
      titleEn: 'High-Precision Color Sorter for Grains, Peas & Pulses',
      url: '/src/assets/images/grain_pulse_sorter_1792265628404.jpg',
      categoryAr: 'خطوط الحبوب والبقوليات',
      specsAr: '8 مسارات هوائية · قواذف ميكرو ثانية · دقة 99.9% · كشف السوس والشوائب'
    },
    {
      id: 'precool_tunnel',
      titleAr: 'نفق التبريد السريع بالهواء المدفوع للبامية والبسلة والعنب',
      titleEn: 'Forced-Air Pre-Cooling Tunnel for Okra, Peas & Grapes',
      url: '/src/assets/images/precool_tunnel_line_1792265628238.jpg',
      categoryAr: 'التبريد السريع وسلسلة الإمداد',
      specsAr: 'مراوح ضغط استاتيكي عالي · خفض حرارة اللب لـ 4°C في 4 ساعات · منع التليين'
    },
    {
      id: 'packing_line',
      titleAr: 'خط التعبئة التلقائي والميزان متعدد الرؤوس وروبوت الرص',
      titleEn: 'Automated Multihead Weigher & Robotic Case Packing',
      url: '/src/assets/images/packing_weighing_line_1792265629297.jpg',
      categoryAr: 'التعبئة والتغليف والروبوتات',
      specsAr: 'ميزان 14 رأس · دقة ±0.5 جم · تغليف Flowpack و Clamshell · ذراع روبوتية للباليت'
    }
  ];

  const LINE_EQUIPMENT_DATABASE: LineEquipmentSet[] = [
    // 1. العنب المائدي الفاخر (Table Grapes)
    {
      lineId: 'grapes',
      lineNameAr: 'خط فرز وتدريج وتعبئة العنب المائدي للتصدير (Table Grapes)',
      lineNameEn: 'Export Table Grapes Grading & Punnet Packaging Line',
      categoryAr: 'العنب والفواكه العنقودية الحساسة',
      iconEmoji: '🍇',
      totalEstimatedCapexUsd: 145000,
      totalPowerKw: 38,
      recommendedFootprint: '35m × 12m (420 m²)',
      equipments: [
        {
          id: 'grp-01',
          nameAr: 'طاولات الاستقبال الحقلي وقراءة باركود القاطف (RFID Field Intake)',
          nameEn: 'Field Lug Receiving Roller & RFID Harvester Logger',
          stageNameAr: 'الاستقبال وتتبع المزرعة',
          stageNameEn: 'Intake & Traceability',
          modelCode: 'FE-GRP-REC100',
          functionAr: 'استقبال أقفاص العنب الحقلية وقراءة هوية عامل القطف وتتبع رقم حوشة المزرعة آلياً.',
          functionEn: 'Receives field harvest lugs with barcode/RFID scanner linking picker ID to orchard block.',
          specs: { powerKw: 1.5, voltage: '380V 3Ph 50Hz', material: 'Stainless Steel 304 & Food-Grade POM', dimensions: '6.0m × 1.2m' },
          plcRequirements: 'DI_0.0 - DI_0.3 (Sensor & Scanners)',
          estimatedCostUsd: 9500,
          criticality: 'essential',
          oemReference: 'Falcon Eye Agrobotic Systems',
          imageUrl: '/src/assets/images/packing_weighing_line_1792265629297.jpg',
          imageCaptionAr: 'طاولة الاستقبال والتغذية مع بكرات سير ناعمة'
        },
        {
          id: 'grp-02',
          nameAr: 'طاولات الفرز والتهذيب المريحة بإضاءة LED الطيفية (Ergonomic Trimming)',
          nameEn: 'Dual-Lane Trimming & Sanitation Inspection Bench',
          stageNameAr: 'الفرز اليدوي والتنظيف',
          stageNameEn: 'Manual Trimming',
          modelCode: 'FE-TRIM-LED8',
          functionAr: 'طاولات فرز مريحة لـ 8 عمال مزودة بفتحات إلقاء الفاقد ومقصات تهذيب وسير علوي للعلب الجاهزة.',
          functionEn: 'Ergonomic 8-worker trimming table with color-rendering Ra>95 LED lights and scrap chutes.',
          specs: { powerKw: 2.2, voltage: '380V 3Ph', material: 'Full Stainless Steel 304 Electro-polished', dimensions: '10.0m × 1.6m' },
          plcRequirements: 'DQ_0.1 (Conveyor Belt Interlock)',
          estimatedCostUsd: 14000,
          criticality: 'essential',
          oemReference: 'Grapetek / Falcon Eye Standard',
          imageUrl: '/src/assets/images/packing_weighing_line_1792265629297.jpg',
          imageCaptionAr: 'محطة الفرز والتهذيب اليدوي بإضاءة LED متخصصة'
        },
        {
          id: 'grp-03',
          nameAr: 'كابينة الرؤية البصرية للأعناق واللون (Falcon Cluster Vision)',
          nameEn: 'Multispectral Rachis Greenness & Berry Color Vision',
          stageNameAr: 'الفحص البصري التلقائي',
          stageNameEn: 'Optical Inspection',
          modelCode: 'FALCON-CAM-GRAPES',
          functionAr: 'فحص جفاف العنق (Rachis Browning) ونسبة تلوين حبات العنب وتجانس الحجم بدون لمس العنقود.',
          functionEn: 'High-speed camera detects stem browning and berry color uniformity without berry contact.',
          specs: { powerKw: 1.8, voltage: '220V 1Ph UPS', material: 'Anodized Aluminum & Industrial Polycarbonate', dimensions: '1.8m × 1.0m' },
          plcRequirements: 'GigE Industrial Camera + Ethernet Modbus TCP',
          estimatedCostUsd: 38000,
          criticality: 'essential',
          oemReference: 'Falcon Eye AI Optics',
          imageUrl: '/src/assets/images/optical_sorter_machine_1792265626106.jpg',
          imageCaptionAr: 'كابينة الفحص البصري الرقمي بالذكاء الاصطناعي'
        },
        {
          id: 'grp-04',
          nameAr: 'ميزان تدقيق البانيتات الديناميكي فائق الدقة (500g Dynamic Checkweigher)',
          nameEn: 'High-Speed 500g Punnet Dynamic Checkweigher & Rejector',
          stageNameAr: 'تدقيق الأوزان ومنع الهدر',
          stageNameEn: 'Checkweighing',
          modelCode: 'FE-CHK-500',
          functionAr: 'وزن 180 علبة في الدقيقة بدقة ± 1.0 جرام، واستبعاد العلب الناقصة أو الزائدة تلقائياً بذراع هوائي ناعم.',
          functionEn: 'Weights 180 punnets/min at ±1g accuracy, softly diverting out-of-spec packages.',
          specs: { powerKw: 1.2, voltage: '220V 1Ph', airConsumptionBar: '6.0 Bar Clean Air', material: 'Stainless Steel IP66 Washdown', dimensions: '1.5m × 0.8m' },
          plcRequirements: 'Fast Pulse Input + RS485 / Modbus Load Cell',
          estimatedCostUsd: 22500,
          criticality: 'essential',
          oemReference: 'Ishida / Falcon Eye',
          imageUrl: '/src/assets/images/packing_weighing_line_1792265629297.jpg',
          imageCaptionAr: 'ميزان فحص ديناميكي مع قواذف استبعاد هوائية'
        },
        {
          id: 'grp-05',
          nameAr: 'ماكينة وضع وسائد ثاني أكسيد الكبريت (SO2 Sheet Dispenser & Sealer)',
          nameEn: 'Automated Dual-Release SO2 Pad Applicator & Box Sealer',
          stageNameAr: 'الحفظ والتجهيز للشحن البحري',
          stageNameEn: 'Preservation & Sealing',
          modelCode: 'FE-SO2-DISP',
          functionAr: 'تغذية ووضع شيتات الميتابيسلفيت داخل كل كرتونة تلقائياً لحماية العنب من عفن البوتريتس (Botrytis).',
          functionEn: 'Automatically places SO2 anti-fungal sheets on top of grape cartons before palletizing.',
          specs: { powerKw: 3.0, voltage: '380V 3Ph', airConsumptionBar: '6.0 Bar', material: 'Stainless Steel 304', dimensions: '2.5m × 1.2m' },
          plcRequirements: 'DQ_0.4 (Pneumatic Suction Arm)',
          estimatedCostUsd: 18000,
          criticality: 'essential',
          oemReference: 'Grapetek / Falcon Eye',
          imageUrl: '/src/assets/images/packing_weighing_line_1792265629297.jpg',
          imageCaptionAr: 'وحدة التغليف وتثبيت شيتات الحفظ'
        },
        {
          id: 'grp-06',
          nameAr: 'نفق التبريد السريع بالهواء المدفوع (Forced-Air Pre-Cooling Tunnel)',
          nameEn: 'Forced-Air Pre-Cooling Tunnel & Blower Bank',
          stageNameAr: 'التبريد السريع',
          stageNameEn: 'Pre-Cooling',
          modelCode: 'FE-COLD-TUNNEL',
          functionAr: 'سحب حرارة الحقل من العنب من +28°C إلى 0.5°C خلال 4 ساعات مع الحفاظ التام على رطوبة العنق.',
          functionEn: 'Rapidly lowers grape temperature to 0.5°C in 4 hours using high-static pressure fans.',
          specs: { powerKw: 28.0, voltage: '380V 3Ph 50Hz', material: 'Insulated Polyurethane Panels 120mm', dimensions: '12.0m × 4.5m' },
          plcRequirements: 'AI_0.0 - AI_0.7 (PT100 Temperature Sensors)',
          estimatedCostUsd: 51000,
          criticality: 'essential',
          oemReference: 'Bitzer / Falcon Eye Refrigeration',
          imageUrl: '/src/assets/images/precool_tunnel_line_1792265628238.jpg',
          imageCaptionAr: 'نفق التبريد السريع بالهواء المدفوع مع مشمعات العزل'
        }
      ]
    },

    // 2. خط البامية والبسلة الخضراء وقرون الفاصوليا (Okra, Green Peas & Podded Veg Line)
    {
      lineId: 'okra_peas',
      lineNameAr: 'خط فرز وتدريج وتجهيز البامية والبسلة الخضراء (Okra & Green Peas Line)',
      lineNameEn: 'Industrial Okra, Green Peas & Snap Bean Sorting, Sizing & Pre-cooling Line',
      categoryAr: 'الخضروات القرنية والقرون الخضراء',
      iconEmoji: '🥬',
      totalEstimatedCapexUsd: 198000,
      totalPowerKw: 58,
      recommendedFootprint: '42m × 10m (420 m²)',
      equipments: [
        {
          id: 'okr-01',
          nameAr: 'هوبر الاستقبال اللطيف مع هزاز فصل الأوراق والشوائب (Vibratory Leaf Separator)',
          nameEn: 'Vibratory Infeed Hopper & De-leafing Screen',
          stageNameAr: 'التغذية وفصل الشوائب الحقلية',
          stageNameEn: 'Infeed & Trash Removal',
          modelCode: 'FE-OKR-VIB10',
          functionAr: 'استقبال محصول البامية والبسلة الطازج، وهز الشوائب والأوراق الجافة وشفطها بتيار هواء عكسي.',
          functionEn: 'Receives fresh-picked pods and separates leaves, field debris, and dust using vibration & air exhaust.',
          specs: { powerKw: 3.5, voltage: '380V 3Ph', material: 'Stainless Steel 304 Food Grade', dimensions: '4.2m × 1.4m' },
          plcRequirements: 'DI_0.0 (VFD Speed Adjustment)',
          estimatedCostUsd: 14500,
          criticality: 'essential',
          oemReference: 'Falcon Eye Fresh Tech',
          imageUrl: '/src/assets/images/precool_tunnel_line_1792265628238.jpg',
          imageCaptionAr: 'هوبر الاستقبال مع شاشات الاهتزاز وفصل الأوراق'
        },
        {
          id: 'okr-02',
          nameAr: 'ماكينة قص الأطراف والأعناق (Okra Snipper & Pea Destemmer)',
          nameEn: 'Automated Rotary Drum Pod Snipper & Destemmer',
          stageNameAr: 'قص الأعناق والأطراف',
          stageNameEn: 'Snipping & Slicing',
          modelCode: 'FE-SNIP-800',
          functionAr: 'قص دقيق لأعناق البامية والقرون الزائدة دون فتح تجويف البذور للحفاظ على قوام الثمرة من الإفرازات.',
          functionEn: 'Rotary slotted drum with precision knives snips pod stems without exposing seed cavities.',
          specs: { powerKw: 5.5, voltage: '380V 3Ph', material: 'Hardened Stainless Steel Blades', dimensions: '3.6m × 1.5m' },
          plcRequirements: 'Safety Interlocks + Variable Drum RPM',
          estimatedCostUsd: 28000,
          criticality: 'essential',
          oemReference: 'Cabinplant / Falcon Eye',
          imageUrl: '/src/assets/images/optical_sorter_machine_1792265626106.jpg',
          imageCaptionAr: 'ماكينة أسطوانية لقص الأعناق وفرز الأطوال'
        },
        {
          id: 'okr-03',
          nameAr: 'فرّاز الأطوال الأسطواني التدريجي (Rotary Drum Length & Diameter Grader)',
          nameEn: 'Multi-Stage Perforated Drum Length & Caliber Grader',
          stageNameAr: 'التدريج بالحجم والطول',
          stageNameEn: 'Length Grading',
          modelCode: 'FE-LEN-DRUM4',
          functionAr: 'تدريج البامية إلى درجات التصدير: إكسترا (أقل من 3.5 سم)، نمرة 1 (3.5 - 5 سم)، نمرة 2 (أكبر من 5 سم).',
          functionEn: 'Sorts okra into export grades: Extra (<3.5cm), Grade 1 (3.5-5cm), and Grade 2 (>5cm).',
          specs: { powerKw: 4.0, voltage: '380V 3Ph', material: 'Interchangeable SS304 Screens', dimensions: '6.0m × 1.6m' },
          plcRequirements: 'Motor Inverter DQ_0.3',
          estimatedCostUsd: 22000,
          criticality: 'essential',
          oemReference: 'Falcon Eye Agrobotic',
          imageUrl: '/src/assets/images/grain_pulse_sorter_1792265628404.jpg',
          imageCaptionAr: 'أسطوانات تدريج أطوال وأقطار القرون'
        },
        {
          id: 'okr-04',
          nameAr: 'كابينة الرؤية البصرية للقرون المصابة والتنقيط (Optical Defect & Rust Sorter)',
          nameEn: 'High-Resolution Pod Vision Scanner for Color, Rust & Borer Holes',
          stageNameAr: 'الفرز البصري للعيوب',
          stageNameEn: 'Defect Vision Inspection',
          modelCode: 'FALCON-VISION-POD',
          functionAr: 'رصد الصدأ الأسود، ثقوب الديدان، القرون المنحنية بشدة، والاصفرار بدقة فائقة عبر كاميرات الألوان.',
          functionEn: 'Detects anthracnose spots, borer worm holes, misshapen curved pods, and yellowing.',
          specs: { powerKw: 2.8, voltage: '220V UPS', material: 'Stainless Steel Enclosure IP67', dimensions: '2.2m × 1.2m' },
          plcRequirements: 'GigE Industrial Cameras + Fast Rejection Trigger',
          estimatedCostUsd: 44000,
          criticality: 'essential',
          oemReference: 'Falcon Eye AI Core',
          imageUrl: '/src/assets/images/optical_sorter_machine_1792265626106.jpg',
          imageCaptionAr: 'كابينة الرؤية البصرية والذكاء الاصطناعي لفحص القرون'
        },
        {
          id: 'okr-05',
          nameAr: 'حوض التبريد المائي السريع مع معقم الأوزون (Hydro-Cooler & Ozonator)',
          nameEn: 'Continuous Water Flume Hydro-Cooler with Dissolved Ozone',
          stageNameAr: 'التبريد المائي والتعقيم',
          stageNameEn: 'Hydro-Cooling',
          modelCode: 'FE-HYDRO-COOL',
          functionAr: 'غمر البامية والبسلة في مياه مثلجة عند 2°C مع أوزون نشط لوقف التنفس فوراً وحماية النضارة ومنع التصلب الليفي.',
          functionEn: 'Rapidly lowers core pulp temp to 3°C using chilled ozone water preventing pod lignification.',
          specs: { powerKw: 24.0, voltage: '380V 3Ph', waterConsumptionLph: 'Chilled Recycled Loop', material: 'Double Insulated Stainless Steel 316', dimensions: '7.5m × 1.8m' },
          plcRequirements: 'PID Water Chiller Link + Ozone ppm Sensor',
          estimatedCostUsd: 48500,
          criticality: 'essential',
          oemReference: 'Bitzer / Falcon Eye HydroCool',
          imageUrl: '/src/assets/images/precool_tunnel_line_1792265628238.jpg',
          imageCaptionAr: 'حوض التبريد المائي السريع مع وحدات التحكم'
        },
        {
          id: 'okr-06',
          nameAr: 'ميزان متعدد الرؤوس وتعبئة الصواني والأكياس المثقبة (Multihead Weigher & Flowpack)',
          nameEn: '14-Head Dimpled Multihead Weigher & Clamshell/Bag Packing',
          stageNameAr: 'الوزن الدقيق والتعبئة',
          stageNameEn: 'Weighing & Packaging',
          modelCode: 'FE-WEIGH-14D',
          functionAr: 'وزن بكرات البامية أو حبوب البسلة في أطباق 250جم أو 500جم بدقة ± 0.5 جم مع طبع كود الصلاحية.',
          functionEn: 'Weighs fresh pods into 250g/500g punnets or micro-perforated bags at 80 packs/min.',
          specs: { powerKw: 6.5, voltage: '220V 1Ph', airConsumptionBar: '6.0 Bar', material: 'Dimpled SS304 Anti-Stick', dimensions: '2.8m × 2.4m' },
          plcRequirements: 'Ethernet IP + Checkweigher Feedback',
          estimatedCostUsd: 41000,
          criticality: 'essential',
          oemReference: 'Ishida / Falcon Eye Pack',
          imageUrl: '/src/assets/images/packing_weighing_line_1792265629297.jpg',
          imageCaptionAr: 'ميزان متعدد الرؤوس مقاوم للالتصاق ومحطة التعبئة'
        }
      ]
    },

    // 3. خط الحبوب والبقوليات والأرز والسمسم (Grains, Pulses, Seeds & Legumes Color Sorter Line)
    {
      lineId: 'grains_pulses',
      lineNameAr: 'خط فرز وتنقية الحبوب والبقوليات بالألوان والوزن النوعي (Grains & Pulses Line)',
      lineNameEn: 'Industrial High-Precision Optical Color Sorter, Destoner & Bagging Line',
      categoryAr: 'الحبوب والبقوليات والمحاصيل الزيتية',
      iconEmoji: '🌾',
      totalEstimatedCapexUsd: 225000,
      totalPowerKw: 52,
      recommendedFootprint: '30m × 8m (240 m²)',
      equipments: [
        {
          id: 'grn-01',
          nameAr: 'هوبر التغذية الكهرومغناطيسي ومصيدة الشوائب المعدنية (Magnetic Infeed Feeder)',
          nameEn: 'Electromagnetic Feeder with Rare-Earth Neodymium Magnetic Trap',
          stageNameAr: 'التغذية الأولية والفصل المعدني',
          stageNameEn: 'Infeed & Magnetic Separation',
          modelCode: 'FE-GRN-FEED12',
          functionAr: 'تنظيم تدفق حبوب الفول، العدس، الحمص، السمسم، والأرز مع التقاط أي برادة أو شوائب حديدية بمغناطيس 12,000 جاوس.',
          functionEn: 'Smoothly regulates grain flow and captures ferrous tramp metal with 12,000 Gauss magnetic bars.',
          specs: { powerKw: 2.2, voltage: '220V 1Ph', material: 'Stainless Steel 304 Polished', dimensions: '2.5m × 1.2m' },
          plcRequirements: 'Analog Speed Output 0-10V',
          estimatedCostUsd: 11000,
          criticality: 'essential',
          oemReference: 'Falcon Eye Grain Tech',
          imageUrl: '/src/assets/images/grain_pulse_sorter_1792265628404.jpg',
          imageCaptionAr: 'هوبر التغذية بمغناطيس نيوديميوم عالي القوة'
        },
        {
          id: 'grn-02',
          nameAr: 'طاولة الجاذبية والوزن النوعي لفصل الحصى والحبوب المثقوبة (Specific Gravity Destoner)',
          nameEn: 'Fluidized Air-Bed Specific Gravity Destoner & Separator',
          stageNameAr: 'فصل الحصى والوزن النوعي',
          stageNameEn: 'Specific Gravity Destoning',
          modelCode: 'FE-GRAV-TONE',
          functionAr: 'فصل الحجارة وقطع الزجاج الثقيلة من جهة، واستبعاد الحبوب الفارغة والمثقوبة بحشرة السوس من جهة أخرى عبر تيار هواء طبقي.',
          functionEn: 'Separates heavy stones and rejects insect-bored or shriveled grains via stratified fluidization.',
          specs: { powerKw: 11.0, voltage: '380V 3Ph', material: 'Wear-resistant Perforated Deck', dimensions: '3.8m × 1.8m' },
          plcRequirements: 'DQ_0.2 (Fan & Deck Inverter)',
          estimatedCostUsd: 29000,
          criticality: 'essential',
          oemReference: 'Bühler / Falcon Eye',
          imageUrl: '/src/assets/images/grain_pulse_sorter_1792265628404.jpg',
          imageCaptionAr: 'طاولة الجاذبية والفرز بالوزن النوعي'
        },
        {
          id: 'grn-03',
          nameAr: 'ماكينة الفرز اللوني الكهروضوئي 8 مجاري مع كاميرات InGaAs (8-Chute Optical Color Sorter)',
          nameEn: 'Falcon 8-Chute High-Resolution Full-Color + InGaAs NIR Sorter',
          stageNameAr: 'الفرز اللوني والأشعة تحت الحمراء',
          stageNameEn: 'Color & InGaAs Sorting',
          modelCode: 'FALCON-SORT-8C',
          functionAr: 'فصل الحبوب متغيرة اللون، الحبوب المكسورة، بذور الحشائش، والشوائب الدقيقة بقواذف هواء تفتح وتقفل في 1 ميلي ثانية.',
          functionEn: '8-chute optical sorter with 2048-pixel tri-chromatic CCD & InGaAs NIR cameras rejecting foreign seeds at 12 tons/hr.',
          specs: { powerKw: 6.5, voltage: '220V UPS', airConsumptionBar: '6.5 - 8.0 Bar Clean Dry Air', material: 'Full Stainless Steel Chutes', dimensions: '3.2m × 1.6m' },
          plcRequirements: 'Industrial Windows/Linux Touch HMI + High Speed Ejector Bus',
          estimatedCostUsd: 88000,
          criticality: 'essential',
          oemReference: 'Falcon Eye OptoSort / Meyer Class',
          imageUrl: '/src/assets/images/grain_pulse_sorter_1792265628404.jpg',
          imageCaptionAr: 'ماكينة الفرز اللوني 8 مجاري مع كاميرات InGaAs'
        },
        {
          id: 'grn-04',
          nameAr: 'ماكينة التلميع الجاف ونفض الغبار (Seed Polisher & Dust Cyclone)',
          nameEn: 'Dry Seed & Bean Friction Polisher with HEPA Cyclone',
          stageNameAr: 'التلميع وإزالة الغبار',
          stageNameEn: 'Polishing & Dust Extraction',
          modelCode: 'FE-POLISH-DRY',
          functionAr: 'تلميع قشور حبوب الفول والعدس والأرز بفرك ناعم بالفرش لإعطاء مظهر براق جذاب للتصدير وشفط الأتربة المجهرية.',
          functionEn: 'Imparts a brilliant sheen to pulses, beans, and sesame seeds while removing chalky flour residues.',
          specs: { powerKw: 7.5, voltage: '380V 3Ph', material: 'Abrasion-Resistant Steel', dimensions: '2.8m × 1.3m' },
          plcRequirements: 'Overload Thermal Sensor DQ_0.4',
          estimatedCostUsd: 19500,
          criticality: 'recommended',
          oemReference: 'Bühler Design / Falcon Eye',
          imageUrl: '/src/assets/images/grain_pulse_sorter_1792265628404.jpg',
          imageCaptionAr: 'وحدة تلميع الحبوب الجافة مع فلتر الأتربة'
        },
        {
          id: 'grn-05',
          nameAr: 'ماكينة وزن وتعبئة شكاير الحبوب 25-50 كجم وخياطتها آلياً (Bulk Bagging & Sewing)',
          nameEn: 'Automated 25-50kg Grain Bagging Weigher & High-Speed Stitcher',
          stageNameAr: 'التعبئة الوزنية والخياطة',
          stageNameEn: 'Bagging & Stitching',
          modelCode: 'FE-BAG-50KG',
          functionAr: 'تعبئة أكياس البولي بروبيلين والخيش بوزن 25 كجم أو 50 كجم بدقة ± 10 جرام، مع سير ناقل وماكينة خياطة رأس أوتوماتيكية.',
          functionEn: 'Rapidly fills 25kg/50kg woven sacks, automatically clamps, weighs, and stitches top seam at 600 bags/hr.',
          specs: { powerKw: 5.5, voltage: '380V 3Ph', airConsumptionBar: '6.0 Bar', material: 'Stainless Steel Contact Parts', dimensions: '5.0m × 1.8m' },
          plcRequirements: 'Load Cell Indicator + Pneumatic Bag Clamp + Newlong Sewing Head',
          estimatedCostUsd: 38000,
          criticality: 'essential',
          oemReference: 'Newlong / Falcon Eye Bagging',
          imageUrl: '/src/assets/images/packing_weighing_line_1792265629297.jpg',
          imageCaptionAr: 'ماكينة تعبئة شكاير الحبوب وخياطتها تلقائياً'
        }
      ]
    },

    // 4. قسم معدات الثلاجات والشيلرات المركزية (Cold Storage & Central Ammonia Chillers)
    {
      lineId: 'cold_storage_plant',
      lineNameAr: 'معدات قسم الثلاجات والشيلرات المركزية والتبريد السريع (Cold Storage Plant)',
      lineNameEn: 'Packhouse Central Ammonia/Freon Refrigeration & Pre-cooling Equipment',
      categoryAr: 'قسم الثلاجات والتبريد وسلسلة الإمداد',
      iconEmoji: '❄️',
      totalEstimatedCapexUsd: 340000,
      totalPowerKw: 185,
      recommendedFootprint: '45m × 20m (900 m²)',
      equipments: [
        {
          id: 'cld-01',
          nameAr: 'شيلر الأمونيا المركزي اللولبي مع إنفرتر (Inverter Screw Ammonia Chiller Package)',
          nameEn: 'Bitzer/Mycom Dual Screw Chiller Package with VFD & ECO',
          stageNameAr: 'توليد وسيط التبريد المركزي',
          stageNameEn: 'Central Chiller Plant',
          modelCode: 'FE-CHILL-R717',
          functionAr: 'توفير التبريد المركزي لكافة عنابر المحطة وأنفاق Pre-cooling بقدرة 450 kW تبريد ومعامل أداء COP = 3.82.',
          functionEn: 'Central ammonia package delivering 450 kW refrigeration with variable frequency drives and economizer.',
          specs: { powerKw: 95.0, voltage: '380V 3Ph 50Hz', material: 'Industrial Carbon Steel / Bitzer Compressor', dimensions: '6.5m × 2.2m' },
          plcRequirements: 'Modbus RTU Compressor Gateway + Ammonia Gas Safety Interlock',
          estimatedCostUsd: 125000,
          criticality: 'essential',
          oemReference: 'Bitzer / Sabroe / Falcon Eye',
          imageUrl: '/src/assets/images/cold_storage_plant_1792265627057.jpg',
          imageCaptionAr: 'شيلر التبريد المركزي مع كبائن التحكم الآلي'
        },
        {
          id: 'cld-02',
          nameAr: 'مكثف تبخيري مائي عالي التوفير (Evaporative Water Condenser)',
          nameEn: 'Induced Draft Evaporative Ammonia Condenser Tower',
          stageNameAr: 'تكثيف وطرد الحرارة',
          stageNameEn: 'Heat Rejection',
          modelCode: 'FE-COND-EVAP',
          functionAr: 'تكثيف وسيط التبريد بكفاءة حرارية عالية وخفض ضغط التكثيف صيفاً لتوفير 28% من فاتورة الكهرباء.',
          functionEn: 'Lowers condensing pressure during peak summer heat reducing electrical power draw by 28%.',
          specs: { powerKw: 15.0, voltage: '380V 3Ph', waterConsumptionLph: 'Make-up loop 400 L/h', material: 'Heavy Galvanized Steel & PVC Drift Eliminators', dimensions: '4.8m × 2.4m' },
          plcRequirements: 'DQ_0.5 (Water Pump & Fan Inverter)',
          estimatedCostUsd: 42000,
          criticality: 'essential',
          oemReference: 'Baltimore Aircoil / Evapco',
          imageUrl: '/src/assets/images/cold_storage_plant_1792265627057.jpg',
          imageCaptionAr: 'المكثف التبخيري المائي لغرف تبريد المحطة'
        },
        {
          id: 'cld-03',
          nameAr: 'مبخرات العنابر السقفية مع إذابة جليد بالغاز الساخن (Ceiling Evaporators & Hot Gas Defrost)',
          nameEn: 'Heavy-Duty Cubic Ceiling Evaporator Coolers with Defrost Valves',
          stageNameAr: 'توزيع التبريد داخل العنابر',
          stageNameEn: 'Room Evaporators',
          modelCode: 'FE-EVAP-CUBIC',
          functionAr: 'مبخرات بأنابيب نحاسية وأجنحة ألومنيوم مع مراوح دفع هواء 8 أمتار وصمامات عكس الغاز الساخن لإذابة الجليد في 12 دقيقة.',
          functionEn: 'Ceiling mounted evaporators with 8-meter throw fans and automated hot gas reverse defrost.',
          specs: { powerKw: 6.0, voltage: '380V 3Ph', material: 'Aluminum Fin / Copper Tubes / SS Casing', dimensions: '3.5m × 1.2m' },
          plcRequirements: 'Pulse Defrost Valve + Room Temp Probe PT100',
          estimatedCostUsd: 36000,
          criticality: 'essential',
          oemReference: 'Guntner / Lu-Ve',
          imageUrl: '/src/assets/images/cold_storage_plant_1792265627057.jpg',
          imageCaptionAr: 'مبخرات سقفية عملاقة داخل عنبر التخزين المبرد'
        },
        {
          id: 'cld-04',
          nameAr: 'نظام التحكم في الغلاف الجوي ULO ومولد النيتروجين (PSA Nitrogen & O2 Scrubber)',
          nameEn: 'Ultra-Low Oxygen (ULO) PSA Nitrogen Generator & Carbon CO2 Scrubber',
          stageNameAr: 'التحكم في الغلاف الجوي والتنفس',
          stageNameEn: 'Controlled Atmosphere',
          modelCode: 'FE-CA-ULO100',
          functionAr: 'خفض نسبة الأكسجين لـ 1.5% وسحب غاز ثاني أكسيد الكربون والإيثيلين لإيقاف تنفس التفاح والكمثرى 9 أشهر.',
          functionEn: 'Reduces oxygen to 1.5% and scrubs CO2/ethylene extending fruit shelf life up to 9 months.',
          specs: { powerKw: 18.0, voltage: '380V 3Ph', airConsumptionBar: '7.5 Bar', material: 'Stainless Steel Pressure Vessels & Carbon Beds', dimensions: '4.2m × 2.0m' },
          plcRequirements: 'O2/CO2 Gas Analyzer Modbus Link',
          estimatedCostUsd: 68000,
          criticality: 'recommended',
          oemReference: 'Van Amerongen / Besseling CA',
          imageUrl: '/src/assets/images/precool_tunnel_line_1792265628238.jpg',
          imageCaptionAr: 'وحدة التحكم في الغلاف الجوي ومولد النيتروجين'
        },
        {
          id: 'cld-05',
          nameAr: 'منظومة مراقبة الحجر الصحي واعتماد درجات الحرارة (USDA Cold Treatment Logger & Safety)',
          nameEn: 'Certified USDA APHIS 4-Probe Cold Quarantine Telemetry Rack',
          stageNameAr: 'الحجر الصحي والأمان',
          stageNameEn: 'Phytosanitary Safety',
          modelCode: 'FE-USDA-QUAR',
          functionAr: 'تسجيل حرارة 3 مجسات لب ثمار ومجس هواء راجع كل 10 دقائق وتوقيع التقرير رقمياً لمنح تصريح تصدير الموالح والعنب.',
          functionEn: 'Logs 3 pulp probes + 1 air return sensor continuously for 14-day USDA fruit fly quarantine compliance.',
          specs: { powerKw: 0.8, voltage: '220V UPS Backup', material: 'NEMA 4X Stainless Steel Wall Mount', dimensions: '0.8m × 0.6m' },
          plcRequirements: 'High-Precision 24-bit ADC Probes Calibrated at 0.00°C',
          estimatedCostUsd: 18500,
          criticality: 'essential',
          oemReference: 'Falcon Eye AgriSafe / USDA Standard',
          imageUrl: '/src/assets/images/cold_storage_plant_1792265627057.jpg',
          imageCaptionAr: 'راك مراقبة الحجر الزراعي الأمريكي USDA'
        }
      ]
    },

    // 5. الموالح والحمضيات (Citrus)
    {
      lineId: 'citrus',
      lineNameAr: 'خط فرز وتدريج وغسيل وشمع الموالح والحمضيات (Citrus Line)',
      lineNameEn: 'Complete Industrial Citrus Washing, Waxing & Electronic Sizing Line',
      categoryAr: 'الموالح والحمضيات',
      iconEmoji: '🍊',
      totalEstimatedCapexUsd: 380000,
      totalPowerKw: 110,
      recommendedFootprint: '65m × 15m (975 m²)',
      equipments: [
        {
          id: 'cit-01',
          nameAr: 'مفرغ الحاويات المائي الغاطس (Submerged Hydro-Dumper & Chlorinator)',
          nameEn: 'Water Unloader Tank with Automated Chemical Dosing',
          stageNameAr: 'التفريغ المائي والتعقيم',
          stageNameEn: 'Hydro Unloading',
          modelCode: 'FE-DUMP-HYDRO',
          functionAr: 'تفريغ بينات البرتقال واليوسفي في حوض مياه معقمة بالكلور لحماية الثمار من أي خدوش أو كدمات.',
          functionEn: 'Gently unloads fruit bins into sanitized water flume preventing peel bruising.',
          specs: { powerKw: 15.0, voltage: '380V 3Ph', waterConsumptionLph: '1200 L/h recycle', material: 'Stainless Steel 316 Acid Proof', dimensions: '8.0m × 2.5m' },
          plcRequirements: 'DI_1.0 - DI_1.4 + Chlorine PID Pump',
          estimatedCostUsd: 48000,
          criticality: 'essential',
          oemReference: 'Falcon Eye Submerged Dumper',
          imageUrl: '/src/assets/images/optical_sorter_machine_1792265626106.jpg',
          imageCaptionAr: 'حوض التفريغ المائي للبرتقال والموالح'
        },
        {
          id: 'cit-02',
          nameAr: 'غسالة الأسطوانات بفرش النايلون وصابون الفطريات (Roller Washer & Fungicide Dosing)',
          nameEn: 'Rotary Brush Washer with Fungicide Shower',
          stageNameAr: 'الغسيل والتطهير',
          stageNameEn: 'Washing & Sanitation',
          modelCode: 'FE-WASH-16R',
          functionAr: 'فرك قشرة البرتقال بفرش دوارة ورش صابون غذائي ومبيد فطريات معتمد (Imazalil / Pyrimethanil).',
          functionEn: '16 rotary brush rows wash fruit with food-grade soap and fungicide solution.',
          specs: { powerKw: 7.5, voltage: '380V 3Ph', waterConsumptionLph: '800 L/h', material: 'Stainless Steel 304', dimensions: '6.0m × 1.8m' },
          plcRequirements: 'DQ_0.4 (Water Pump & Dosing)',
          estimatedCostUsd: 32000,
          criticality: 'essential',
          oemReference: 'Falcon Eye / Fomesa',
          imageUrl: '/src/assets/images/optical_sorter_machine_1792265626106.jpg',
          imageCaptionAr: 'غسالة فرش البرتقال والتطهير بالمبيدات المصرحة'
        },
        {
          id: 'cit-03',
          nameAr: 'نفق التجفيف الحراري بالهواء المضغوط المعكوس (Forced-Air Hot Dryer Tunnel)',
          nameEn: 'High-Velocity Gas/Electric Heated Drying Tunnel',
          stageNameAr: 'التجفيف الحراري',
          stageNameEn: 'Hot Air Drying',
          modelCode: 'FE-DRY-HOT',
          functionAr: 'تجفيف سطح الحبة بنسبة 100% بالهواء الدافئ (45°C) قبل وصولها لماكينة الشمع.',
          functionEn: 'Dries peel completely at 45°C preparing fruit for wax adhesion.',
          specs: { powerKw: 22.0, voltage: '380V 3Ph (or Natural Gas Burner)', material: 'Insulated Double-Skin Panels', dimensions: '8.5m × 1.8m' },
          plcRequirements: 'PID Temperature Loop + Flame Safeguard',
          estimatedCostUsd: 45000,
          criticality: 'essential',
          oemReference: 'Falcon Eye Tunnel',
          imageUrl: '/src/assets/images/precool_tunnel_line_1792265628238.jpg',
          imageCaptionAr: 'نفق التجفيف الحراري قبل مرحلة الشمع'
        },
        {
          id: 'cit-04',
          nameAr: 'ماكينة رش وتلميع الشمع الطبيعي (Wax Spray Applicator & Horsehair Polish)',
          nameEn: 'Automated Wax Atomizer & Horsehair Polishing Bed',
          stageNameAr: 'الشمع والتلميع',
          stageNameEn: 'Waxing & Polishing',
          modelCode: 'FE-WAX-APPL',
          functionAr: 'رش رذاذ الشمع الكارنوبا الطبيعي وتلميعه بفرش شعر الخيل لإغلاق المسام وإعطاء بريق تصديري.',
          functionEn: 'Atomizes food-grade wax and polishes fruit with rotating horsehair rollers.',
          specs: { powerKw: 5.5, voltage: '380V 3Ph', airConsumptionBar: '6.0 Bar', material: 'Stainless Steel 304 & Horsehair', dimensions: '4.5m × 1.6m' },
          plcRequirements: 'DQ_1.0 (Atomizer Nozzle Pressure)',
          estimatedCostUsd: 38000,
          criticality: 'essential',
          oemReference: 'Citrosol / Falcon Eye',
          imageUrl: '/src/assets/images/optical_sorter_machine_1792265626106.jpg',
          imageCaptionAr: 'وحدة رش الشمع الكارنوبا والتلميع'
        },
        {
          id: 'cit-05',
          nameAr: 'ماكينة الفرز الإلكتروني Pomone IV مع كابينة GlobalScan 7 ومطياف NIR',
          nameEn: 'Pomone IV Dual-Cone Roller Sizer with GlobalScan 7 & NIR',
          stageNameAr: 'الفرز والتدريج الإلكتروني',
          stageNameEn: 'Optical & NIR Grading',
          modelCode: 'POMONE-IV-GS7',
          functionAr: 'تدوير الحبة 360 درجة، فحص القطر واللون والعيوب الخارجية بالسكانر، وقياس السكر واللب بـ NIR.',
          functionEn: 'Rotates fruit 360° under 4K cameras and measures Brix and acidity via NIR.',
          specs: { powerKw: 18.0, voltage: '380V 3Ph + UPS', material: 'Stainless Steel Frame & Acetal Rollers', dimensions: '24.0m × 2.2m' },
          plcRequirements: 'Industrial Real-time Bus + Falcon Eye Core Workstation',
          estimatedCostUsd: 165000,
          criticality: 'essential',
          oemReference: 'Falcon Eye Agrobotic',
          imageUrl: '/src/assets/images/optical_sorter_machine_1792265626106.jpg',
          imageCaptionAr: 'ماكينة الفرز الإلكتروني Pomone IV مع كابينة الرؤية'
        },
        {
          id: 'cit-06',
          nameAr: 'خلايا التعبئة الروبوتية بالدلتا (Delta Robotic Carton Packing Cell)',
          nameEn: 'High-Speed Delta Robotic Tray & Carton Packer',
          stageNameAr: 'الروبوت والتعبئة',
          stageNameEn: 'Robotic Packing',
          modelCode: 'FE-DELTA-ROBOT',
          functionAr: 'التقاط البرتقال من السير ورصه بنسق هندسي داخل الكراتين مع توجيه اللون الممتاز للأعلى.',
          functionEn: 'Delta robot places 280 fruits/min into export boxes blush-side up.',
          specs: { powerKw: 9.0, voltage: '380V 3Ph', airConsumptionBar: '6.5 Bar', material: 'Carbon Fiber Arms & Silicone Suction', dimensions: '3.0m × 2.2m' },
          plcRequirements: 'Safety Light Curtains + Profinet Robot Link',
          estimatedCostUsd: 52000,
          criticality: 'recommended',
          oemReference: 'Falcon Eye Agrobotic Delta',
          imageUrl: '/src/assets/images/packing_weighing_line_1792265629297.jpg',
          imageCaptionAr: 'ذراع الروبوت الدلتا لتعبئة كراتين البرتقال'
        }
      ]
    },

    // 6. البطاطس والبصل والدرنات (Potatoes & Onions)
    {
      lineId: 'potatoes',
      lineNameAr: 'خط استلام وغسيل وفرز وتعبئة البطاطس والبصل (Potatoes & Onions)',
      lineNameEn: 'Industrial Potato & Onion Destoning, Washing, Grading & Bagging Line',
      categoryAr: 'الدرنات والمحاصيل الجذرية',
      iconEmoji: '🥔',
      totalEstimatedCapexUsd: 260000,
      totalPowerKw: 85,
      recommendedFootprint: '55m × 12m (660 m²)',
      equipments: [
        {
          id: 'pot-01',
          nameAr: 'هوبر الاستلام الثقيل المبطن بالمطاط (Heavy Infeed Hopper & Destoner)',
          nameEn: 'Heavy-Duty 10-Ton Infeed Hopper & Cyclone Soil Destoner',
          stageNameAr: 'الاستقبال وإزالة الطين',
          stageNameEn: 'Destoning & Hopper',
          modelCode: 'FE-POT-HOPP',
          functionAr: 'استقبال المقطورات الزراعية وفصل التربة الجافة والحجارة قبل الدخول لغسالة المياه.',
          functionEn: 'Receives 10-ton bulk loads and separates dry stones and earth clods.',
          specs: { powerKw: 11.0, voltage: '380V 3Ph', material: 'Reinforced Carbon Steel & Heavy Rubber', dimensions: '7.5m × 2.8m' },
          plcRequirements: 'Heavy Load Cell + VFD Drive',
          estimatedCostUsd: 36000,
          criticality: 'essential',
          oemReference: 'Bijlsma Hercules / Tong Engineering',
          imageUrl: '/src/assets/images/grain_pulse_sorter_1792265628404.jpg',
          imageCaptionAr: 'هوبر استلام البطاطس وفصل الطين والحجارة'
        },
        {
          id: 'pot-02',
          nameAr: 'غسالة البراميل الأسطوانية العملاقة مع فلتر المياه (Rotary Drum Washer)',
          nameEn: 'Rotary Drum Submerged Washer with Mud Clarifier',
          stageNameAr: 'الغسيل المائي العميق',
          stageNameEn: 'Drum Washing',
          modelCode: 'FE-DRUM-WASH',
          functionAr: 'غسيل عميق لدرنات البطاطس مع تدوير مستمر يمنع تراكم الطين في القيعان.',
          functionEn: 'Submerged perforated drum tumbles tubers removing adhering clay.',
          specs: { powerKw: 18.5, voltage: '380V 3Ph', waterConsumptionLph: '2500 L/h recycle', material: 'Stainless Steel 304 Drum', dimensions: '6.5m × 2.2m' },
          plcRequirements: 'Turbidity Sensor + Pump Interlock',
          estimatedCostUsd: 49000,
          criticality: 'essential',
          oemReference: 'Tong / Allround',
          imageUrl: '/src/assets/images/optical_sorter_machine_1792265626106.jpg',
          imageCaptionAr: 'غسالة البراميل الغاطسة للبطاطس والدرنات'
        },
        {
          id: 'pot-03',
          nameAr: 'طاولة التجفيف بالبكرات الإسفنجية وسكاكين الهواء (Sponge Roller De-Waterer)',
          nameEn: 'Felt Sponge De-Watering Bed & Dual Air Knives',
          stageNameAr: 'التجفيف الميكانيكي',
          stageNameEn: 'Mechanical Drying',
          modelCode: 'FE-SPONGE-DRY',
          functionAr: 'عصر وتجفيف مياه الغسيل بواسطة بكرات إسفنجية طبيعية لضمان عدم تعفن البطاطس بالأجولة.',
          functionEn: 'Dries washed potatoes with natural sponge rollers and high-pressure air knives.',
          specs: { powerKw: 8.5, voltage: '380V 3Ph', material: 'Seamless Sponge Rolls & SS304', dimensions: '4.2m × 1.6m' },
          plcRequirements: 'DQ_0.3 (Motor Drive)',
          estimatedCostUsd: 24000,
          criticality: 'essential',
          oemReference: 'Falcon Eye Agrobotic',
          imageUrl: '/src/assets/images/precool_tunnel_line_1792265628238.jpg',
          imageCaptionAr: 'طاولة التجفيف بالبكرات الإسفنجية وسكاكين الهواء'
        },
        {
          id: 'pot-04',
          nameAr: 'كابينة الفحص البصري للاخضرار والعفن الداخلي (Greening & Hollow Heart Vision)',
          nameEn: 'Hyperspectral Vision for Greening, Cuts & Internal Hollow Heart',
          stageNameAr: 'الفرز البصري الذكي',
          stageNameEn: 'Optical Defect Vision',
          modelCode: 'FALCON-TUBER-VISION',
          functionAr: 'فحص الاخضرار السام، الجروح الميكانيكية، والعفن القلبي الأسود عبر الذكاء الاصطناعي.',
          functionEn: 'Detects solanine greening, mechanical cuts, and black heart defects.',
          specs: { powerKw: 4.0, voltage: '220V UPS', material: 'Industrial IP65 Enclosure', dimensions: '2.8m × 1.5m' },
          plcRequirements: 'GigE Industrial Cameras + Reject Trigger',
          estimatedCostUsd: 58000,
          criticality: 'essential',
          oemReference: 'Falcon Eye AI Core',
          imageUrl: '/src/assets/images/optical_sorter_machine_1792265626106.jpg',
          imageCaptionAr: 'كابينة الرؤية الطيفية لكشف اخضرار وعيوب البطاطس'
        },
        {
          id: 'pot-05',
          nameAr: 'ماكينة وزن وتعبئة الشكاير الآلية 10-25 كجم وخياطتها (Automated Bagging & Sewing)',
          nameEn: 'Automated 10-25kg Sack Weighing & High-Speed Sewing Line',
          stageNameAr: 'تعبئة الأجولة وخياطتها',
          stageNameEn: 'Bagging & Stitching',
          modelCode: 'FE-BAG-25KG',
          functionAr: 'تعبئة الأجولة الخيش والشباك بوزن دقيق (25 كجم ± 20 جم) مع خياطة الرأس آلياً وطباعة الليبل.',
          functionEn: 'Fills 25kg mesh bags with auto-clamp, weighing hopper, and high-speed sewing head.',
          specs: { powerKw: 6.5, voltage: '380V 3Ph', airConsumptionBar: '6.5 Bar', material: 'Heavy Duty Structural Steel', dimensions: '4.5m × 1.8m' },
          plcRequirements: 'Newlong Sewing Head Sync + Net Weight Controller',
          estimatedCostUsd: 45000,
          criticality: 'essential',
          oemReference: 'Newlong / JEM Bagging',
          imageUrl: '/src/assets/images/packing_weighing_line_1792265629297.jpg',
          imageCaptionAr: 'محطة تعبئة وتخييط شكاير البطاطس والبصل'
        }
      ]
    },

    // 7. التمور الفاخرة (Dates)
    {
      lineId: 'dates',
      lineNameAr: 'خط فرز وتدريج وتعقيم وتعبئة التمور الفاخرة (Dates Packaging Line)',
      lineNameEn: 'Premium Medjool & Sukkari Dates Moisture, Defect & Vacuum Line',
      categoryAr: 'التمور الفاخرة',
      iconEmoji: '🌴',
      totalEstimatedCapexUsd: 210000,
      totalPowerKw: 42,
      recommendedFootprint: '38m × 10m (380 m²)',
      equipments: [
        {
          id: 'dat-01',
          nameAr: 'هوبر التغذية الاهتزازي ومصيدة الرمال الجافة (Air Cyclone De-sander)',
          nameEn: 'Vibratory Feed Hopper & High-Velocity Cyclone De-sander',
          stageNameAr: 'تنظيف الرمال الجاف',
          stageNameEn: 'Dry De-sanding',
          modelCode: 'FE-DATE-DESAND',
          functionAr: 'شفط الرمال والأتربة الصحراوية العالقة بقشرة التمر بدون استخدام قطرة ماء واحدة.',
          functionEn: 'Extracts desert sand and micro-dust via negative air pressure cyclone.',
          specs: { powerKw: 5.5, voltage: '380V 3Ph', airConsumptionBar: 'Vacuum Exhaust', material: 'Stainless Steel 304 Food Grade', dimensions: '3.8m × 1.4m' },
          plcRequirements: 'DI_0.0 (Vibration Frequency Control)',
          estimatedCostUsd: 24000,
          criticality: 'essential',
          oemReference: 'Falcon Eye Agrobotic',
          imageUrl: '/src/assets/images/grain_pulse_sorter_1792265628404.jpg',
          imageCaptionAr: 'هوبر تنظيف الرمال الجاف بالشفط الهوائي'
        },
        {
          id: 'dat-02',
          nameAr: 'نفق التعقيم بغاز الأوزون والأشعة فوق البنفسجية UV (Ozone Sterilization)',
          nameEn: 'Ozone Gas & UV-C Disinfection Tunnel',
          stageNameAr: 'التعقيم والقضاء على الآفات',
          stageNameEn: 'Sterilization',
          modelCode: 'FE-DATE-OZONE',
          functionAr: 'القضاء على بيوض حشرات المستودعات وفطريات التخمر بالأوزون النقي مع الحفاظ على نكهة التمر.',
          functionEn: 'Neutralizes storage pests and mold spores via controlled Ozone gas and UV-C.',
          specs: { powerKw: 4.2, voltage: '220V 1Ph', material: 'Airtight Stainless Steel 316', dimensions: '4.5m × 1.2m' },
          plcRequirements: 'Ozone Concentration PID + Gas Interlock',
          estimatedCostUsd: 32000,
          criticality: 'essential',
          oemReference: 'Falcon Eye PureTech',
          imageUrl: '/src/assets/images/precool_tunnel_line_1792265628238.jpg',
          imageCaptionAr: 'نفق التعقيم بالأوزون والأشعة فوق البنفسجية'
        },
        {
          id: 'dat-03',
          nameAr: 'مطياف فحص الرطوبة وانفصال القشرة (NIR Skin Separation & Moisture Vision)',
          nameEn: 'Hyperspectral NIR Moisture & Skin Loose Defect Analyzer',
          stageNameAr: 'الفرز البصري والرطوبة',
          stageNameEn: 'NIR Moisture Sorting',
          modelCode: 'FALCON-DATE-NIR',
          functionAr: 'فرز التمر المجدول حسب نسبة رطوبة اللب (% Moisture) وانفصال القشرة (Loose Skin) لفرز درجات Premium وChoice.',
          functionEn: 'Grades dates into export categories based on flesh moisture and loose skin ratio.',
          specs: { powerKw: 2.5, voltage: '220V UPS', material: 'Anodized Aluminum & Optic Glass', dimensions: '2.4m × 1.2m' },
          plcRequirements: 'Industrial AI Processor + Modbus Pulse',
          estimatedCostUsd: 59000,
          criticality: 'essential',
          oemReference: 'Falcon Eye AI Core',
          imageUrl: '/src/assets/images/optical_sorter_machine_1792265626106.jpg',
          imageCaptionAr: 'مطياف فحص الرطوبة وانفصال قشرة التمور'
        },
        {
          id: 'dat-04',
          nameAr: 'ماكينة التعبئة بتفريغ الهواء الفاكيوم (Thermoforming Vacuum Sealer)',
          nameEn: 'Automatic Rollstock Thermoforming Vacuum Packaging Machine',
          stageNameAr: 'التعبئة الفاكيوم',
          stageNameEn: 'Vacuum Packing',
          modelCode: 'FE-VAC-THERMO',
          functionAr: 'تشكيل وتعبئة التمور في عبوات فاكيوم مسحوبة الهواء بنسبة 99.8% لإطالة العمر التخزيني إلى عامين.',
          functionEn: 'Thermoforms rigid or flexible plastic film and seals dates under 99.8% vacuum.',
          specs: { powerKw: 14.5, voltage: '380V 3Ph', airConsumptionBar: '7.0 Bar', waterConsumptionLph: 'Chilled Cooling Water', material: 'Heavy Duty SS304 IP65', dimensions: '6.2m × 1.3m' },
          plcRequirements: 'Multi-Axis Servo Sync + Vacuum Transducer',
          estimatedCostUsd: 65000,
          criticality: 'essential',
          oemReference: 'Multivac / Falcon Eye',
          imageUrl: '/src/assets/images/packing_weighing_line_1792265629297.jpg',
          imageCaptionAr: 'ماكينة تشكيل وتعبئة الفاكيوم الحراري'
        }
      ]
    }
  ];

  const [selectedLineId, setSelectedLineId] = useState<string>('grapes');
  const [filterCriticality, setFilterCriticality] = useState<string>('all');
  const [activePhotoModal, setActivePhotoModal] = useState<any | null>(null);

  const activeLine = LINE_EQUIPMENT_DATABASE.find((l) => l.lineId === selectedLineId) || LINE_EQUIPMENT_DATABASE[0];

  const filteredEquipments = activeLine.equipments.filter((eq) => {
    if (filterCriticality === 'all') return true;
    return eq.criticality === filterCriticality;
  });

  const handleExportMachineryBOM = () => {
    const bomData = {
      lineName: activeLine.lineNameAr,
      lineCode: activeLine.lineId,
      totalCapexUsd: activeLine.totalEstimatedCapexUsd,
      totalPowerKw: activeLine.totalPowerKw,
      recommendedFootprint: activeLine.recommendedFootprint,
      machineryList: activeLine.equipments.map((eq) => ({
        name: eq.nameAr,
        model: eq.modelCode,
        stage: eq.stageNameAr,
        specs: eq.specs,
        costUsd: eq.estimatedCostUsd,
        oem: eq.oemReference
      })),
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(bomData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `machinery_bom_${activeLine.lineId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-6 rounded-2xl border border-amber-900/50 shadow-md text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400">
              <Cog className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  {isAr ? 'دليل ومواصفات وصور الآلات والمعدات لكل خط إنتاج' : 'Machinery & Equipment BOM with Visual Gallery'}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                  {isAr ? 'صور واقعية + مواصفات ميكانيكية وكهربائية' : 'Realistic Industrial Photography + Specs'}
                </span>
              </div>
              <h1 className="text-2xl font-black mt-1">
                {isAr ? 'الآلات والمعدات اللازمة لكل خط إنتاج مع الصور والمواصفات الكاملة' : 'Machinery, Sizers, Washers & Robots Required per Line Preset'}
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl">
                {isAr
                  ? 'قائمة مصورة ومفصلة بجميع الآلات والمعدات المطلوبة لكل نوع خط (العنب، البامية والبسلة، الحبوب والبقوليات، الموالح، البطاطس، التمور، ومحطة الثلاجات والشيلرات): القدرة الكهربائية kW، ضغط الهواء، استهلاك المياه، متطلبات الـ PLC، والتكلفة التقديرية.'
                  : 'Illustrated machinery catalog for Grapes, Okra/Peas, Grains/Pulses, Citrus, Potatoes, Dates, and Cold Storage Chillers.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            <button
              onClick={handleExportMachineryBOM}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? 'تصدير جدول المعدات (JSON BOM)' : 'Export Equipment BOM'}</span>
            </button>
          </div>
        </div>

        {/* Line Type Selector Tabs */}
        <div className="mt-6 pt-4 border-t border-amber-900/40 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">{isAr ? 'اختر خط الإنتاج لعرض معداته وصوره:' : 'Select Line Profile:'}</span>
          {LINE_EQUIPMENT_DATABASE.map((line) => {
            const isSelected = line.lineId === selectedLineId;
            return (
              <button
                key={line.lineId}
                onClick={() => setSelectedLineId(line.lineId)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md ring-2 ring-amber-300'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                <span>{line.iconEmoji}</span>
                <span>{isAr ? line.lineNameAr.split('(')[0] : line.lineNameEn.split('Line')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Real Machinery Photo Showcase Gallery */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">
              {isAr ? 'معرض صور الآلات والمعدات الحية في المنظومة (Industrial Machinery Photography)' : 'Live Industrial Machinery Photo Showcase'}
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            {isAr ? 'انقر على أي صورة لتكبيرها وفحص تفاصيل الماكينة' : 'Click any photo to zoom & inspect'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {MACHINERY_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoModal(photo)}
              className="group bg-slate-950 border border-slate-800 hover:border-amber-400/80 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={photo.url}
                  alt={photo.titleAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute top-2 end-2 p-1.5 rounded-full bg-slate-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
                <div className="absolute bottom-2 start-2 end-2">
                  <span className="text-[10px] font-bold text-amber-400 block truncate">
                    {photo.categoryAr}
                  </span>
                </div>
              </div>

              <div className="p-3 space-y-1">
                <h4 className="text-xs font-bold text-slate-200 line-clamp-2 group-hover:text-amber-300 transition-colors">
                  {isAr ? photo.titleAr : photo.titleEn}
                </h4>
                <p className="text-[10px] text-slate-400 line-clamp-1 font-mono">
                  {photo.specsAr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Line Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>{isAr ? 'إجمالي عدد الآلات الرئيسية' : 'Total Main Machines'}</span>
            <Cog className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {activeLine.equipments.length} <span className="text-xs font-normal text-slate-500">{isAr ? 'ماكينة ومحطة' : 'units'}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>{isAr ? 'تغطي كامل مراحل التشغيل من التفريغ للتعبئة' : 'End-to-end station coverage'}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>{isAr ? 'إجمالي الحمل الكهربائي (Total Power)' : 'Total Connected Load'}</span>
            <Zap className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-600 mt-2">
            {activeLine.totalPowerKw} <span className="text-xs font-normal text-slate-500">kW (كيلوواط)</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>{isAr ? 'يتطلب محول كهربائي 380V 3Ph مناسب' : 'Requires 380V 3Ph main feed'}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>{isAr ? 'المساحة الصافية المقترحة للصالة' : 'Factory Footprint'}</span>
            <Box className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-700 mt-2">
            {activeLine.recommendedFootprint.split('(')[0]}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>{activeLine.recommendedFootprint.split('(')[1]?.replace(')', '') || (isAr ? 'مساحة مناسبة لخط الحركة' : 'Optimal layout')}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>{isAr ? 'التكلفة الاستثمارية التقديرية' : 'Estimated Capex'}</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-2">
            ${activeLine.totalEstimatedCapexUsd.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>≈ {(activeLine.totalEstimatedCapexUsd * 50).toLocaleString()} {isAr ? 'جنيه مصري' : 'EGP'}</span>
          </div>
        </div>
      </div>

      {/* Equipment Table and Details */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filter Bar */}
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">{isAr ? 'تصفية حسب الأهمية:' : 'Filter by Criticality:'}</span>
            <select
              value={filterCriticality}
              onChange={(e) => setFilterCriticality(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium"
            >
              <option value="all">{isAr ? 'جميع المعدات والآلات' : 'All Equipments'}</option>
              <option value="essential">{isAr ? 'أساسية لا غنى عنها (Essential)' : 'Essential'}</option>
              <option value="recommended">{isAr ? 'موصى بها لزيادة الإنتاجية (Recommended)' : 'Recommended'}</option>
            </select>
          </div>

          <span className="text-slate-500 font-semibold">
            {filteredEquipments.length} {isAr ? 'آلات معروضة' : 'machines shown'}
          </span>
        </div>

        {/* Machinery Cards Grid with Embedded Photography */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredEquipments.map((eq, index) => (
            <div
              key={eq.id}
              className="p-5 rounded-2xl border border-slate-200 hover:border-amber-300 bg-white hover:bg-amber-50/10 transition-all flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Photo Preview inside Machine Card */}
                {eq.imageUrl && (
                  <div
                    onClick={() =>
                      setActivePhotoModal({
                        titleAr: eq.nameAr,
                        titleEn: eq.nameEn,
                        url: eq.imageUrl,
                        specsAr: `${eq.stageNameAr} · ${eq.specs.powerKw} kW · ${eq.modelCode}`,
                        categoryAr: eq.oemReference
                      })
                    }
                    className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-100 cursor-pointer group/img"
                  >
                    <img
                      src={eq.imageUrl}
                      alt={eq.nameAr}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    <div className="absolute top-2 end-2 p-1.5 rounded bg-black/60 text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute bottom-2 start-2 end-2 text-white">
                      <span className="text-[11px] font-semibold text-amber-300 block truncate">
                        {eq.imageCaptionAr || eq.nameAr}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{isAr ? eq.nameAr : eq.nameEn}</h4>
                      <span className="text-[11px] text-slate-400 font-mono">{eq.modelCode}</span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      eq.criticality === 'essential'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {eq.criticality === 'essential' ? (isAr ? 'أساسية' : 'Essential') : (isAr ? 'موصى بها' : 'Recommended')}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {isAr ? eq.functionAr : eq.functionEn}
                </p>

                {/* Technical Specifications Matrix */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isAr ? 'المرحلة:' : 'Stage:'}</span>
                    <span className="font-semibold text-slate-800">{isAr ? eq.stageNameAr : eq.stageNameEn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isAr ? 'القدرة والكهرباء:' : 'Power & Voltage:'}</span>
                    <span className="font-bold text-amber-700 font-mono">{eq.specs.powerKw} kW ({eq.specs.voltage})</span>
                  </div>
                  {eq.specs.airConsumptionBar && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">{isAr ? 'ضغط الهواء المضغوط:' : 'Pneumatics:'}</span>
                      <span className="font-semibold text-slate-700 font-mono">{eq.specs.airConsumptionBar}</span>
                    </div>
                  )}
                  {eq.specs.waterConsumptionLph && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">{isAr ? 'استهلاك المياه:' : 'Water:'}</span>
                      <span className="font-semibold text-sky-700 font-mono">{eq.specs.waterConsumptionLph}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isAr ? 'الأبعاد وخامة الصنع:' : 'Specs & Material:'}</span>
                    <span className="font-semibold text-slate-700">{eq.specs.dimensions} · {eq.specs.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isAr ? 'كروت وتوصيل الـ PLC:' : 'PLC I/O:'}</span>
                    <span className="font-mono text-indigo-700">{eq.plcRequirements}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">{isAr ? 'المصنع المرجعي:' : 'OEM Ref:'}</span>
                  <span className="font-semibold text-slate-700">{eq.oemReference}</span>
                </div>
                <div className="text-end">
                  <span className="text-[10px] text-slate-400 block">{isAr ? 'السعر التقديري:' : 'Est. Price:'}</span>
                  <span className="font-extrabold text-emerald-700 font-mono text-sm">
                    ${eq.estimatedCostUsd.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Zoom for Machinery Photos */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="relative aspect-video bg-black">
              <img
                src={activePhotoModal.url}
                alt={activePhotoModal.titleAr}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActivePhotoModal(null)}
                className="absolute top-4 end-4 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center font-bold text-lg shadow-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 bg-slate-900 text-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                  {activePhotoModal.categoryAr}
                </span>
                <span className="text-xs text-slate-400 font-mono">{activePhotoModal.specsAr}</span>
              </div>
              <h3 className="text-lg font-bold">
                {isAr ? activePhotoModal.titleAr : activePhotoModal.titleEn}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
