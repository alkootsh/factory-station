import React, { useState } from 'react';
import {
  Layers,
  Settings,
  Sliders,
  CheckCircle2,
  Cpu,
  Tv,
  ArrowRight,
  Plus,
  Trash2,
  Download,
  Upload,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Info,
  Scale,
  Eye,
  Wind,
  Box,
  Truck,
  Droplets,
  Thermometer,
  ShieldAlert
} from 'lucide-react';

interface UniversalLineConfiguratorProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

interface LineStage {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'infeed' | 'cleaning' | 'treatment' | 'optical' | 'weighing' | 'ejection' | 'packing' | 'cooling';
  enabled: boolean;
  speedRpm: number;
  plcPins: string;
  sensorType: string;
  notesAr: string;
}

interface LinePreset {
  id: string;
  nameAr: string;
  nameEn: string;
  categoryAr: string;
  cropCategory: string;
  defaultSpeedCpm: number;
  capacityTonPerHour: number;
  suitableCrops: string[];
  stages: LineStage[];
  specialSensors: string[];
  packagingTypes: string[];
}

export const UniversalLineConfigurator: React.FC<UniversalLineConfiguratorProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const PRESETS: LinePreset[] = [
    // 1. العنب المائدي (Table Grapes)
    {
      id: 'grapes_export',
      nameAr: 'خط فرز وتدريج وتعبئة العنب المائدي الفاخر (Table Grapes Export Line)',
      nameEn: 'Premium Table Grapes Grading & Punnet Packaging Line',
      categoryAr: 'العنب والفواكه العنقودية الحساسة',
      cropCategory: 'grapes',
      defaultSpeedCpm: 180,
      capacityTonPerHour: 4.5,
      suitableCrops: ['عنب فليم سيدلس (أحمر)', 'عنب إيرلي سوبيريور (أبيض)', 'عنب كريمسون (أحمر متأخر)', 'عنب أوتوم رويال (أسود)', 'عنب تومسون'],
      specialSensors: ['موازين ديناميكية للبانيتات 500جم (±1g Dynamic Checkweighers)', 'كاميرات فحص لون العنقود واصفرار العنق', 'مطياف سكر محمول للبريكس (Brix 16-20°Bx)', 'حاقن غاز SO2 ومولدات أوزون التطهير'],
      packagingTypes: ['بانيتات بلاستيكية 500 جم (Punnets/Clamshells)', 'كراتين تصدير 4.5 كجم و 5 كجم', 'أكياس كاري باج مثقبة (Carry Bags 1kg)'],
      stages: [
        { id: 'stg-1', nameAr: 'استلام الصناديق الحقلية وقراءة باركود الجامع', nameEn: 'Field Box Intake & Harvester RFID', category: 'infeed', enabled: true, speedRpm: 45, plcPins: 'DI_0.0 - DI_0.3', sensorType: 'RFID / 2D Scanner', notesAr: 'تتبع المزرعة وعامل القطف الحقلي' },
        { id: 'stg-2', nameAr: 'طاولات الفرز والتهذيب الضوئي اليدوي (LED Trimming)', nameEn: 'Ergonomic LED Trimming Stations', category: 'cleaning', enabled: true, speedRpm: 30, plcPins: 'DQ_0.0 (Belt)', sensorType: 'Foot Pedal Switch', notesAr: 'قص الحبات التالفة بدون لمس العنق السليم' },
        { id: 'stg-3', nameAr: 'محطة الفرز البصري للون والفرط (Optical Rachis Vision)', nameEn: 'Cluster Vision Inspection', category: 'optical', enabled: true, speedRpm: 120, plcPins: 'ETH_CAM1 (GigE)', sensorType: '4K Color Line Scan', notesAr: 'كشف نسبة تلوين العنقود وسلامة العنق الأخضر' },
        { id: 'stg-4', nameAr: 'تدقيق أوزان العلب آلياً (Multi-Head Checkweigher)', nameEn: 'High-Precision 500g Checkweigher', category: 'weighing', enabled: true, speedRpm: 180, plcPins: 'COM2 RS485 / Modbus', sensorType: 'Digital Strain Gauge', notesAr: 'ضبط الوزن 500 جم بدقة ± 1.5 جرام لمنع الفاقد' },
        { id: 'stg-5', nameAr: 'وضع وسادات الميتابيسلفيت (SO2 Pad Dispenser)', nameEn: 'SO2 Sheet Placer', category: 'treatment', enabled: true, speedRpm: 60, plcPins: 'DQ_1.0 (Pneumatic)', sensorType: 'Vacuum Sensor', notesAr: 'حماية من عفن البوتريتس أثناء الشحن البحري' },
        { id: 'stg-6', nameAr: 'نفق التبريد السريع بالهواء المدفوع (Forced-Air Cooling)', nameEn: 'Forced-Air Pre-Cooling Tunnel', category: 'cooling', enabled: true, speedRpm: 25, plcPins: 'AI_0.0 (PT100 Temp)', sensorType: 'PT100 Dual Probes', notesAr: 'خفض الحرارة من 28°C إلى 0.5°C خلال 4 ساعات' },
        { id: 'stg-7', nameAr: 'رص الباليتات وطباعة كود التصدير SSCC', nameEn: 'Palletizing & GS1-128 Labeling', category: 'packing', enabled: true, speedRpm: 50, plcPins: 'TCP_9100 Zebra', sensorType: 'Pallet Height Laser', notesAr: 'ربط مباشر مع برنامج ERP المحطة' }
      ]
    },

    // 2. الخضروات المتنوعة (Vegetables Line)
    {
      id: 'vegetables_multi',
      nameAr: 'خط فرز وتدريج الخضروات المتنوعة (طماطم، فلفل ألوان، خيار، كوسة)',
      nameEn: 'Universal Multi-Vegetable Grading & Packaging Line',
      categoryAr: 'الخضروات الطازجة ومحاصيل البيوت المحمية',
      cropCategory: 'vegetables',
      defaultSpeedCpm: 360,
      capacityTonPerHour: 7.0,
      suitableCrops: ['طماطم مستديرة وشيري', 'فلفل ألوان (رومي أحمر، أصفر، برتقالي)', 'خيار صوب وخيار بلدي', 'كوسة وباذنجان رومي وأبيض', 'فاصوليا خضراء'],
      specialSensors: ['حساس كشف الانحناء والاستقامة 3D للخيارات والكوسة', 'حساس قياس الصلابة الصوتي (Acoustic Firmness Sensor)', 'كاميرات فرز نسبة التلوين والنضج للطماطم والفلفل', 'نظام تغليف انكماشي بالحرارة (Shrink Wrapper)'],
      packagingTypes: ['صواني كرتون طبقة واحدة (Single-Layer Trays)', 'عبوات مفرغة Flowpack ثلاثية', 'أقفاص بلاستيكية وصناديق تصدير 5 كجم'],
      stages: [
        { id: 'veg-1', nameAr: 'حوض الاستقبال والتغذية الناعمة بدون سقوط', nameEn: 'Gentle Wet/Dry Infeed Ramp', category: 'infeed', enabled: true, speedRpm: 40, plcPins: 'DI_0.0 - DI_0.2', sensorType: 'Optical Level Sensor', notesAr: 'تغذية بدون كدمات لثمار الطماطم والفلفل' },
        { id: 'veg-2', nameAr: 'أسطوانات التنظيف بفرش شعر ناعمة مع شفط الأتربة', nameEn: 'Soft Bristle Brushing & Dust Vacuum', category: 'cleaning', enabled: true, speedRpm: 55, plcPins: 'DQ_0.1 (Motor)', sensorType: 'Thermal Overload Sensor', notesAr: 'تلميع القشرة دون خدش طبقة الكيوتيكل' },
        { id: 'veg-3', nameAr: 'كابينة الرؤية 3D (القطر، الانحناء، ونسبة التلوين)', nameEn: '3D Optical Vision (Color, Caliber & Curvature)', category: 'optical', enabled: true, speedRpm: 300, plcPins: 'GigE Industrial Vision', sensorType: 'Multi-Angle CMOS 4K', notesAr: 'فرز درجة النضج (أخضر/زهري/أحمر) وانحناء الخيار' },
        { id: 'veg-4', nameAr: 'حساس فحص الصلابة والكدمات الخفية (Firmness Sensor)', nameEn: 'Acoustic Firmness & Bruise Sensor', category: 'treatment', enabled: true, speedRpm: 180, plcPins: 'AI_0.4 - AI_0.7', sensorType: 'Piezoelectric Sensor', notesAr: 'عزل الثمار الطرية وغير القابلة للشحن' },
        { id: 'veg-5', nameAr: 'محطة الوزن الديناميكي الدقيق للحبة', nameEn: 'Single-Fruit Dynamic Load Cell', category: 'weighing', enabled: true, speedRpm: 360, plcPins: 'Modbus TCP (Fast)', sensorType: 'Strain Gauge (High Speed)', notesAr: 'دقة ± 0.5 جرام' },
        { id: 'veg-6', nameAr: 'قاذفات الهواء الناعمة ومسارات الصواني', nameEn: 'Soft Flipper & Air Drop Outlets', category: 'ejection', enabled: true, speedRpm: 360, plcPins: 'DQ_1.0 - DQ_1.15', sensorType: 'Position Encoder', notesAr: '8 مخارج توزيع حسب الكاليبر والجودة' },
        { id: 'veg-7', nameAr: 'التغليف بالانكماش وتعبئة الصواني (Flowpack / Trays)', nameEn: 'Flowpack & Robotic Tray Packing', category: 'packing', enabled: true, speedRpm: 80, plcPins: 'Safety Circuit + Inverter', sensorType: 'Photoelectric Gate', notesAr: 'تجهيز صواني التصدير للسلاسل التجارية' }
      ]
    },

    // 3. الموالح والحمضيات (Citrus)
    {
      id: 'citrus_complete',
      nameAr: 'خط فرز وتدريج وشمع الموالح والحمضيات (Citrus Processing Line)',
      nameEn: 'Full Citrus Washing, Waxing, NIR & Optical Sizing Line',
      categoryAr: 'الموالح والحمضيات',
      cropCategory: 'citrus',
      defaultSpeedCpm: 720,
      capacityTonPerHour: 15.0,
      suitableCrops: ['برتقال فالنسيا وبصرة', 'يوسفي كلمنتينا وموركت', 'ليمون أضاليا وبنزهير', 'جريب فروت'],
      specialSensors: ['مطياف NIR لقياس السكر والحموضة داخلياً', 'كاميرات UV كشف عفن البنسيليوم', 'موازين ديناميكية ثلاثية النقاط'],
      packagingTypes: ['كراتين تلسكوبيك 15 كجم', 'صناديق أوبن توب Open-top', 'أكياس شبكية Net Bags 2-3 كجم'],
      stages: [
        { id: 'cit-1', nameAr: 'مفرغ الحاويات المائي أو الهيدروليكي', nameEn: 'Bin Tipper / Water Unloader', category: 'infeed', enabled: true, speedRpm: 60, plcPins: 'DI_1.0 - DI_1.4', sensorType: 'Ultrasonic Distance', notesAr: 'تفريغ هادئ في تانك ماء مطهر' },
        { id: 'cit-2', nameAr: 'غسيل بفرش دوارة ورشاشات مياه دافئة وصابون غذائي', nameEn: 'Rotary Brush Washer & Food Soap', category: 'cleaning', enabled: true, speedRpm: 90, plcPins: 'DQ_0.2 (Pumps)', sensorType: 'Water Temp & Level', notesAr: 'إزالة أتربة الحقل وأثر الحشرات' },
        { id: 'cit-3', nameAr: 'نفق التجفيف بالهواء الساخن المفلتر', nameEn: 'Forced Hot-Air Drying Tunnel', category: 'cleaning', enabled: true, speedRpm: 80, plcPins: 'PID Burner / Heaters', sensorType: 'Thermocouple Type K', notesAr: 'تجفيف تام قبل تطبيق الشمع' },
        { id: 'cit-4', nameAr: 'تطبيق الشمع الطبيعي (Carnauba Wax) وتلميع بفرش الخيل', nameEn: 'Wax Applicator & Horsehair Polisher', category: 'treatment', enabled: true, speedRpm: 70, plcPins: 'DQ_2.0 (Dosing Pump)', sensorType: 'Flow Meter & Pressure', notesAr: 'حماية القشرة وإعطاء لمعان تصديري' },
        { id: 'cit-5', nameAr: 'كابينة الرؤية البصرية GlobalScan 7 ومطياف NIR', nameEn: 'GlobalScan 7 Vision & NIR Sugar Grading', category: 'optical', enabled: true, speedRpm: 720, plcPins: 'GigE + NIR Fiber Optic', sensorType: '4K CMOS + Halogen NIR', notesAr: 'فرز القطر، اللون، العيوب، والسكر الداخلي' },
        { id: 'cit-6', nameAr: 'الوزن الديناميكي وقواذف الهواء الدقيقة', nameEn: 'High-Speed Load Cells & Ejectors', category: 'weighing', enabled: true, speedRpm: 720, plcPins: 'High Speed Pulses (HSP)', sensorType: 'Optical Encoder Trigger', notesAr: 'توزيع فوري على 16 مخرج' },
        { id: 'cit-7', nameAr: 'طاولات الرص والروبوت وخياطة الكراتين', nameEn: 'Delta Packing Robots & Box Sealers', category: 'packing', enabled: true, speedRpm: 120, plcPins: 'Safety Light Curtains', sensorType: 'Zebra Print Engine', notesAr: 'إصدار باركود الباليتات وتحديث الـ ERP' }
      ]
    },

    // 4. البطاطس والبصل والدرنات (Potatoes & Onions)
    {
      id: 'potatoes_onions',
      nameAr: 'خط استلام وغسيل وفرز وتعبئة البطاطس والبصل (Potato & Onion Line)',
      nameEn: 'Heavy-Duty Potato & Onion Destoning, Washing & Bagging Line',
      categoryAr: 'الدرنات والبصل والمحاصيل الجذرية',
      cropCategory: 'tubers',
      defaultSpeedCpm: 500,
      capacityTonPerHour: 20.0,
      suitableCrops: ['بطاطس تصدير وتصنيع (سبونتا، كارا، هيرميس)', 'بصل أحمر وبصل ذهبي جاف', 'جزر وبطاطا حلوة'],
      specialSensors: ['حساس كشف الاخضرار القشري (Greening Detection)', 'كاشف العفن الداخلي بالأشعة (X-Ray / NIR Tuber Inspector)', 'موازين تعبئة الأجولة الآلية 10-25 كجم'],
      packagingTypes: ['أجولة خيش 25 كجم', 'شباك بولي إيثيلين راشيل (Raschel Bags 5-10kg)', 'صناديق جامبو خشبية (Jumbo Boxes 1 Ton)'],
      stages: [
        { id: 'pot-1', nameAr: 'هوبر الاستلام الثقيل وأسطوانة إزالة التربة (Destoner)', nameEn: 'Heavy Infeed Hopper & Dry Soil Destoner', category: 'infeed', enabled: true, speedRpm: 40, plcPins: 'DI_0.0 - DI_0.3', sensorType: 'Heavy Load Cell', notesAr: 'فصل الطين والحجارة الجافة' },
        { id: 'pot-2', nameAr: 'غسالة برميلية أسطوانية مع إعادة تدوير المياه', nameEn: 'Rotary Drum Washer & Water Clarifier', category: 'cleaning', enabled: true, speedRpm: 35, plcPins: 'DQ_0.3 (Inverter)', sensorType: 'Turbidity Sensor', notesAr: 'غسيل عميق لدرنات البطاطس والجزر' },
        { id: 'pot-3', nameAr: 'طاولة التجفيف بالبكرات الإسفنجية ونفاثات الهواء', nameEn: 'Sponge Roller De-watering & Air Blowers', category: 'cleaning', enabled: true, speedRpm: 50, plcPins: 'DQ_1.0 (Air Knives)', sensorType: 'Moisture Sensor', notesAr: 'إزالة رطوبة الغسيل لمنع تعفن التخزين' },
        { id: 'pot-4', nameAr: 'كابينة الفرز البصري للاخضرار والجروح والعفن الداخلي', nameEn: 'Greening, Cut & Internal Hollow Heart Vision', category: 'optical', enabled: true, speedRpm: 400, plcPins: 'Multi-Spectrum Industrial Cam', sensorType: 'Color + Shortwave Infrared', notesAr: 'استبعاد البطاطس الخضراء أو المجروحة' },
        { id: 'pot-5', nameAr: 'التدريج بالحجم الميكانيكي والبصري (Caliber Grading)', nameEn: 'Mechanical Screen & Optical Caliber Sizer', category: 'weighing', enabled: true, speedRpm: 450, plcPins: 'Modbus Drop 3', sensorType: 'Caliber Diameter Grid', notesAr: 'أحجام 35-45 مم، 45-65 مم، >65 مم' },
        { id: 'pot-6', nameAr: 'محطات تعبئة الأجولة الآلية مع خياطة الحزام', nameEn: 'Automated Bagging, Net Weighers & Sewing', category: 'packing', enabled: true, speedRpm: 30, plcPins: 'Pneumatic Clamp + Sewing Head', sensorType: 'Bulk Net Weight Cell (±10g)', notesAr: 'تعبئة شكاير 10 كجم و 25 كجم بدقة' }
      ]
    },

    // 5. التمور الفاخرة (Dates)
    {
      id: 'dates_premium',
      nameAr: 'خط فرز وتدريج وتعقيم وتعبئة التمور الفاخرة (Dates Processing Line)',
      nameEn: 'Premium Medjool & Sukkari Dates Moisture, Defect & Vacuum Line',
      categoryAr: 'التمور والنخيل',
      cropCategory: 'dates',
      defaultSpeedCpm: 240,
      capacityTonPerHour: 3.5,
      suitableCrops: ['تمر مجدول (جامبو، سوبر، ميديام)', 'تمر سكري مفتل ورطب', 'تمر صعيدي وسيوي', 'تمر برحي'],
      specialSensors: ['حساس الرطوبة الكهرومغناطيسي (Skin Separation & Moisture)', 'كاميرات فرز انتفاخ القشرة ونسبة السواد', 'موازين عبوات الفاكيوم 1 كجم'],
      packagingTypes: ['علب كرتون فاخرة 1 كجم و 2 كجم و 5 كجم', 'عبوات تفريغ هواء فاكيوم (Vacuum Packs)', 'صواني هدايا تمور'],
      stages: [
        { id: 'dat-1', nameAr: 'هوبر التغذية الهوائي وإزالة الرمال (Air De-sander)', nameEn: 'Vibratory Feed & Cyclone De-sander', category: 'infeed', enabled: true, speedRpm: 30, plcPins: 'DI_0.0', sensorType: 'Vibration Controller', notesAr: 'شفط الغبار والرمال بدون ماء' },
        { id: 'dat-2', nameAr: 'نفق التعقيم بالأوزون والأشعة فوق البنفسجية UV', nameEn: 'Ozone Sanitizer & UV Sterilization Tunnel', category: 'treatment', enabled: true, speedRpm: 40, plcPins: 'DQ_0.5 (Ozone Generator)', sensorType: 'UV Intensity Sensor', notesAr: 'القضاء على بيوض الحشرات والفطريات' },
        { id: 'dat-3', nameAr: 'فحص انفصال القشرة والرطوبة بالكاميرات الذكية', nameEn: 'Skin Delamination & Moisture Vision Analyzer', category: 'optical', enabled: true, speedRpm: 240, plcPins: 'GigE Camera + Spec NIR', sensorType: 'Hyperspectral NIR', notesAr: 'تحديد درجة الجودة (Premium, Select, Choice)' },
        { id: 'dat-4', nameAr: 'التدريج حسب الوزن وحجم الحبة (Weight Grading)', nameEn: 'Electronic Single-Date Load Cells', category: 'weighing', enabled: true, speedRpm: 240, plcPins: 'Modbus Load Channel', sensorType: 'High-Precision Micro Cell (±0.1g)', notesAr: 'فرز: Super Jumbo, Jumbo, Large, Medium' },
        { id: 'dat-5', nameAr: 'قاذفات الهواء فائق النعومة للمخارج', nameEn: 'Gentle Air Soft-Touch Ejectors', category: 'ejection', enabled: true, speedRpm: 240, plcPins: 'High Speed Solenoids', sensorType: 'Optical Gate', notesAr: 'حماية التمر من الكدمات' },
        { id: 'dat-6', nameAr: 'التعبئة في علب التصدير والفاكيوم والتغليف', nameEn: 'Tray Packing, Thermoforming & Vacuum Sealing', category: 'packing', enabled: true, speedRpm: 45, plcPins: 'Vacuum Sealer PLC Link', sensorType: 'Barcode Verifier', notesAr: 'طباعة تاريخ الصلاحية وباركود الدفعة' }
      ]
    },

    // 6. خط البامية والبسلة الخضراء وقرون الفاصوليا (Okra & Green Peas Line)
    {
      id: 'okra_peas_line',
      nameAr: 'خط فرز وتدريج وتجهيز البامية والبسلة الخضراء (Okra & Green Peas Line)',
      nameEn: 'Industrial Okra, Green Peas & Podded Veg Sorting, Length Sizing & Precooling Line',
      categoryAr: 'الخضروات القرنية والقرون الخضراء',
      cropCategory: 'vegetables',
      defaultSpeedCpm: 280,
      capacityTonPerHour: 4.0,
      suitableCrops: ['بامية بلدي وإكسترا', 'بسلة سكرية بالقرون (Sugar Snap Peas)', 'حبوب بسلة خضراء مفرطة', 'فاصوليا خضراء خيطية وفلات'],
      specialSensors: ['ماكينة قص الأطراف الأوتوماتيكية (Rotary Pod Snipper)', 'مفرز أطوال البامية الأسطواني التدريجي', 'حوض التبريد المائي السريع Hydro-cooler مع أوزون', 'ميزان متعدد الرؤوس 14 رأس للأطباق 250جم و 500جم'],
      packagingTypes: ['أطباق فوم وبلاستيك مفرغة 250جم و 500جم', 'أكياس بولي إيثيلين مثقبة دقيقة لحفظ التنفس', 'صناديق كرتون تصدير 4 كجم'],
      stages: [
        { id: 'okr-1', nameAr: 'هوبر الاستقبال مع هزاز فصل الأوراق والرمال', nameEn: 'Vibratory Infeed & Leaf Separator', category: 'infeed', enabled: true, speedRpm: 35, plcPins: 'DI_0.0 (VFD)', sensorType: 'Vibration & Air Velocity', notesAr: 'شفط الأوراق الجافة والشوائب الحقلية' },
        { id: 'okr-2', nameAr: 'ماكينة قص الأعناق والأطراف الأسطوانية', nameEn: 'Rotary Pod Snipper & Destemmer', category: 'cleaning', enabled: true, speedRpm: 50, plcPins: 'DQ_0.2 (Blades)', sensorType: 'Safety Interlock', notesAr: 'قص دقيق للأعناق دون فتح تجويف البذور' },
        { id: 'okr-3', nameAr: 'أسطوانات فرز الأطوال (إكسترا / نمرة 1 / نمرة 2)', nameEn: 'Rotary Drum Length Sizer', category: 'optical', enabled: true, speedRpm: 40, plcPins: 'Inverter Speed Control', sensorType: 'Perforated Drum Screen', notesAr: 'تدريج الحبات حسب الطول بالملم' },
        { id: 'okr-4', nameAr: 'كابينة الرؤية البصرية للقرون المصابة والصدأ', nameEn: 'High-Resolution Pod Vision Scanner', category: 'optical', enabled: true, speedRpm: 280, plcPins: 'GigE Industrial Camera', sensorType: 'CMOS 4K Multi-angle', notesAr: 'استبعاد القرون المنحنية والمثقوبة بديدان' },
        { id: 'okr-5', nameAr: 'حوض التبريد المائي السريع Hydro-cooling عند 2°C', nameEn: 'Continuous Water Flume Hydro-Cooler', category: 'cooling', enabled: true, speedRpm: 30, plcPins: 'AI_0.4 (Water Chiller Link)', sensorType: 'Chilled Water Temp Probe', notesAr: 'خفض حرارة اللب لـ 4°C لمنع التليين والتصلب' },
        { id: 'okr-6', nameAr: 'الميزان متعدد الرؤوس وتعبئة الأطباق والأكياس', nameEn: '14-Head Multihead Weigher & Clamshell Packing', category: 'packing', enabled: true, speedRpm: 70, plcPins: 'Modbus / Checkweigher Feedback', sensorType: 'Anti-Stick Dimpled Cell (±0.5g)', notesAr: 'وزن دقيق وتغليف بالأطباق' }
      ]
    },

    // 7. خط فرز وتنقية الحبوب والبقوليات بالألوان والوزن النوعي (Grains & Pulses Color Line)
    {
      id: 'grains_pulses_line',
      nameAr: 'خط فرز وتنقية الحبوب والبقوليات بالألوان والوزن النوعي (Grains & Pulses Color Line)',
      nameEn: 'Industrial High-Precision Optical Color Sorter, Destoner & Bagging Line',
      categoryAr: 'الحبوب والبقوليات والمحاصيل الزيتية',
      cropCategory: 'grains',
      defaultSpeedCpm: 500,
      capacityTonPerHour: 10.0,
      suitableCrops: ['فول بلدي وعريض (Fava Beans)', 'حمص الشام (Chickpeas)', 'عدس أصفر وجبة (Lentils)', 'أرز حبة عريضة ورفيعة وبسمتي', 'سمسم أبيض وأحمر منقى', 'حبوب القمح والذرة والقهوة'],
      specialSensors: ['ماكينة الفرز اللوني 8 مجاري مع كاميرات InGaAs بالأشعة تحت الحمراء', 'طاولة الجاذبية والوزن النوعي لفصل الحصى والحبوب المثقوبة', 'مغناطيس نيوديميوم 12,000 جاوس للبرادة المعدنية', 'ماكينة وزن وتعبئة شكاير 25-50 كجم وخياطة الرأس'],
      packagingTypes: ['شكاير بولي بروبيلين منسوجة 25 كجم و 50 كجم', 'أكياس خيش طبيعية للتصدير', 'أكياس بولي إيثيلين مفرغة 1 كجم و 5 كجم'],
      stages: [
        { id: 'grn-1', nameAr: 'هوبر التغذية الكهرومغناطيسي ومصيدة المعادن', nameEn: 'Electromagnetic Feeder & Magnetic Trap', category: 'infeed', enabled: true, speedRpm: 50, plcPins: 'Analog 0-10V Inverter', sensorType: '12,000 Gauss Neodymium Magnet', notesAr: 'تنظيم التدفق والتقاط برادة الحديد' },
        { id: 'grn-2', nameAr: 'طاولة الجاذبية والوزن النوعي لفصل الحصى والسوس', nameEn: 'Fluidized Specific Gravity Destoner', category: 'cleaning', enabled: true, speedRpm: 45, plcPins: 'DQ_0.3 (Air Deck)', sensorType: 'Stratified Air Pressure', notesAr: 'فصل الحجارة الثقيلة والحبوب الفارغة المسوسة' },
        { id: 'grn-3', nameAr: 'ماكينة الفرز اللوني الكهروضوئي 8 مجاري مع InGaAs', nameEn: 'Falcon 8-Chute Color + InGaAs NIR Sorter', category: 'optical', enabled: true, speedRpm: 500, plcPins: 'High Speed Micro-Ejector Bus', sensorType: 'Tri-chromatic CCD + InGaAs NIR', notesAr: 'قواذف هواء 1ms لعزل الحبوب التالفة' },
        { id: 'grn-4', nameAr: 'وحدة التلميع الجاف ونفض الغبار الكربوني', nameEn: 'Dry Seed & Pulse Friction Polisher', category: 'treatment', enabled: true, speedRpm: 60, plcPins: 'DQ_0.4 (Polisher Motor)', sensorType: 'Thermal Overload Sensor', notesAr: 'إعطاء بريق تصديري وشفط الأتربة' },
        { id: 'grn-5', nameAr: 'ماكينة وزن وتعبئة الشكاير 25-50 كجم وخياطتها', nameEn: 'Automated 25-50kg Bagging & High-Speed Sewing', category: 'packing', enabled: true, speedRpm: 40, plcPins: 'Bag Clamp + Newlong Stitcher Link', sensorType: 'Industrial Load Cell (±10g)', notesAr: 'تعبئة وخياطة 600 شيكارة في الساعة' }
      ]
    }
  ];

  const [activePresetId, setActivePresetId] = useState<string>('grapes_export');
  const [activePreset, setActivePreset] = useState<LinePreset>(PRESETS[0]);
  const [stages, setStages] = useState<LineStage[]>(PRESETS[0].stages);
  const [editingStage, setEditingStage] = useState<LineStage | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSelectPreset = (presetId: string) => {
    const selected = PRESETS.find((p) => p.id === presetId);
    if (selected) {
      setActivePresetId(presetId);
      setActivePreset(selected);
      setStages([...selected.stages]);
      setNotification(
        isAr
          ? `تم تحميل وتهيئة إعدادات: ${selected.nameAr} بنجاح!`
          : `Loaded configuration profile: ${selected.nameEn} successfully!`
      );
      setTimeout(() => setNotification(null), 3500);
    }
  };

  const handleToggleStage = (stageId: string) => {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleSpeedChange = (stageId: string, delta: number) => {
    setStages((prev) =>
      prev.map((s) =>
        s.id === stageId ? { ...s, speedRpm: Math.max(5, Math.min(1000, s.speedRpm + delta)) } : s
      )
    );
  };

  const handleExportConfig = () => {
    const configData = {
      presetId: activePreset.id,
      presetName: activePreset.nameAr,
      capacityTonPerHour: activePreset.capacityTonPerHour,
      speedCpm: activePreset.defaultSpeedCpm,
      stages: stages,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `falcon_eye_line_config_${activePreset.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-6 rounded-2xl border border-teal-900/50 shadow-md text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center shrink-0 text-teal-400">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  {isAr ? 'مهيئ خطوط الإنتاج الشامل (Universal Line Configurator)' : 'Universal Packing Line Builder'}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-500/20 text-teal-300 rounded-full border border-teal-500/30">
                  {isAr ? 'يدعم العنب، الخضروات، الموالح، البطاطس، والتمور' : 'Grapes, Veggies, Citrus, Tubers & Dates'}
                </span>
              </div>
              <h1 className="text-2xl font-black mt-1">
                {isAr ? 'تهيئة وتخصيص المنظومة لأي نوع خط إنتاج وفرز وتعبئة' : 'Universal Production, Sorting & Packaging Line Profiles'}
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl">
                {isAr
                  ? 'اختر نوع المحصول والخط لتطبيق إعدادات المراحل والحساسات وكروت الـ PLC تلقائياً: خطوط العنب الحساسة وموازين البانيتات، خطوط الخضروات المتنوعة، خطوط الموالح، خطوط البطاطس والدرنات، أو تخصيص مراحل جديدة بالكامل.'
                  : 'Instant one-click presets for Table Grapes, Fresh Vegetables, Citrus, Potatoes & Onions, and Dates with full stage-by-stage PLC I/O mapping.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            <button
              onClick={handleExportConfig}
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-sm transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? 'تصدير ملف التكوين (JSON Config)' : 'Export Line Profile'}</span>
            </button>
          </div>
        </div>

        {/* Preset Selector Tabs */}
        <div className="mt-6 pt-4 border-t border-teal-900/50 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">{isAr ? 'اختر خط الإنتاج:' : 'Select Line Preset:'}</span>
          {PRESETS.map((p) => {
            const isSelected = p.id === activePresetId;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-md ring-2 ring-teal-300'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                {p.cropCategory === 'grapes' && '🍇 '}
                {p.cropCategory === 'vegetables' && '🍅 '}
                {p.cropCategory === 'citrus' && '🍊 '}
                {p.cropCategory === 'tubers' && '🥔 '}
                {p.cropCategory === 'dates' && '🌴 '}
                <span>{isAr ? p.nameAr.split('(')[0] : p.nameEn.split('&')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Preset Details Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-teal-600 uppercase tracking-wider">{activePreset.categoryAr}</div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">{isAr ? activePreset.nameAr : activePreset.nameEn}</h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <div className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
              <span className="text-slate-400">{isAr ? 'السرعة القياسية:' : 'Speed:'} </span>
              <span className="font-bold text-slate-900">{activePreset.defaultSpeedCpm} {isAr ? 'وحدة/دقيقة' : 'cpm'}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800">
              <span className="text-teal-600">{isAr ? 'الطاقة الإنتاجية:' : 'Capacity:'} </span>
              <span className="font-bold">{activePreset.capacityTonPerHour} {isAr ? 'طن / ساعة' : 'T/h'}</span>
            </div>
          </div>
        </div>

        {/* Produce & Sensors Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1.5">{isAr ? 'المحاصيل والأصناف المدعومة:' : 'Supported Produce:'}</span>
            <div className="flex flex-wrap gap-1">
              {activePreset.suitableCrops.map((c, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 text-[11px]">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1.5">{isAr ? 'الحساسات وأنظمة الرؤية المخصصة:' : 'Specialized Sensors & Vision:'}</span>
            <div className="space-y-1 text-[11px] text-slate-600">
              {activePreset.specialSensors.map((s, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1.5">{isAr ? 'أنماط التعبئة والتغليف المدعومة:' : 'Supported Packaging Formats:'}</span>
            <div className="space-y-1 text-[11px] text-slate-600">
              {activePreset.packagingTypes.map((p, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Box className="w-3 h-3 text-indigo-600 shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Stages */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-600" />
              <span>{isAr ? 'مخطط مراحل وتدفق خط الإنتاج والربط الصناعي (Configured Stages Pipeline)' : 'Line Stages Pipeline'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAr
                ? 'يمكنك تفعيل أو إيقاف أي مرحلة، تعديل السرعة، ومطالعة كروت ومنافذ الـ PLC المخصصة لكل مرحلة.'
                : 'Enable/disable stages, adjust speed, and inspect hardware PLC I/O mapping.'}
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {stages.filter((s) => s.enabled).length} / {stages.length} {isAr ? 'مراحل نشطة' : 'active stages'}
          </span>
        </div>

        {/* Interactive Stages Cards */}
        <div className="space-y-3">
          {stages.map((stg, index) => (
            <div
              key={stg.id}
              className={`p-4 rounded-xl border transition-all ${
                stg.enabled
                  ? 'bg-slate-50/80 border-slate-200 hover:border-teal-300'
                  : 'bg-slate-100/50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{isAr ? stg.nameAr : stg.nameEn}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200 text-slate-700 uppercase">
                        {stg.category}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-3">
                      <span>{isAr ? 'الحساس/المشغل:' : 'Sensor/Actuator:'} <strong className="text-slate-700">{stg.sensorType}</strong></span>
                      <span>·</span>
                      <span className="font-mono text-teal-700">PLC: {stg.plcPins}</span>
                      <span>·</span>
                      <span className="text-slate-600 italic">{stg.notesAr}</span>
                    </div>
                  </div>
                </div>

                {/* Stage Controls */}
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200 text-xs">
                    <span className="text-slate-400 text-[10px] font-semibold mr-1">{isAr ? 'السرعة:' : 'Speed:'}</span>
                    <button
                      onClick={() => handleSpeedChange(stg.id, -5)}
                      className="w-5 h-5 rounded hover:bg-slate-100 font-bold text-slate-600 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-slate-800 w-10 text-center">{stg.speedRpm}</span>
                    <button
                      onClick={() => handleSpeedChange(stg.id, 5)}
                      className="w-5 h-5 rounded hover:bg-slate-100 font-bold text-slate-600 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleToggleStage(stg.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      stg.enabled
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    {stg.enabled ? (isAr ? 'مفعل ✓' : 'Enabled') : (isAr ? 'معطل ✕' : 'Disabled')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
