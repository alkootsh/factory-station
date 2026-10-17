import React, { useState } from 'react';
import { ShoppingCart, Wrench, CheckCircle2, MapPin, Calculator, ShieldCheck, ArrowRight, Box } from 'lucide-react';
import { FRUIT_PROFILES } from '../data/mafData';

interface PrototypeBOMProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const PrototypeBOM: React.FC<PrototypeBOMProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [workshopOption, setWorkshopOption] = useState<'available' | 'buy_ready'>('available');
  const [selectedCurrency, setSelectedCurrency] = useState<'EGP' | 'USD'>('EGP');

  // BOM Items
  const bomItems = [
    {
      category: isAr ? 'لوحة التحكم والسيطرة' : 'Control Board',
      nameAr: 'متحكم ESP32 / Arduino Mega 2560',
      nameEn: 'ESP32 / Arduino Mega Controller',
      specsAr: 'معالج مزدوج، واي فاي، منافذ رقمية لتشغيل الحساسات والمحركات',
      supplier: 'Makers Electronics (الإسكندرية) / Future Electronics',
      qty: 1,
      costEgp: 450
    },
    {
      category: isAr ? 'الرؤية الحاسوبية' : 'Computer Vision',
      nameAr: 'كاميرا USB عالية الدقة (1080p Autofocus)',
      nameEn: '1080p USB Industrial Webcam',
      specsAr: 'اتصال USB بالكمبيوتر، مع إضاءة LED دائرية لتصحيح الألوان',
      supplier: 'RAM Electronics (القاهرة / باب اللوق)',
      qty: 1,
      costEgp: 850
    },
    {
      category: isAr ? 'الحساسات' : 'Sensors',
      nameAr: 'حساس ضوئي عاكس (Photoelectric E3F-DS30P2)',
      nameEn: 'Diffuse Photoelectric Sensor',
      specsAr: 'جهد 6-30V DC لاكتشاف مرور الثمرة على السير وتفعيل الكاميرا',
      supplier: 'Future Electronics / مصادر محلية',
      qty: 2,
      costEgp: 280
    },
    {
      category: isAr ? 'المحركات والسيور' : 'Motors & Conveyor',
      nameAr: 'موتور تروس DC 12V (GB37-520) مع متحرك سرعة',
      nameEn: '12V DC Gear Motor + Speed Controller',
      specsAr: 'عزم قوي لحركة السير المصغر، سرعة قابلة للضبط',
      supplier: 'Future Electronics / سوق العتبة والجمالية',
      qty: 1,
      costEgp: 450
    },
    {
      category: isAr ? 'مشغلات الفرز' : 'Sorting Actuators',
      nameAr: 'موتور سيرفو ميكانيكي قوي (MG996R) أو بوابات هواء',
      nameEn: 'Servo Actuators / Gate Flaps',
      specsAr: 'لتوجيه الثمرة تلقائياً إلى 3 مخارج فرز رئيسية',
      supplier: 'Makers Electronics',
      qty: 3,
      costEgp: 450
    },
    {
      category: isAr ? 'الهيكل الميكانيكي' : 'Mechanical Frame',
      nameAr: workshopOption === 'available' ? 'خامات ألومنيوم بروفايل أو خشب مخصص للورشة المحلية' : 'سير ناقل مصغر جاهز (مستورد/مفصلي)',
      nameEn: workshopOption === 'available' ? 'Aluminum Profile / Local Workshop Material' : 'Ready Conveyor Belt Unit',
      specsAr: workshopOption === 'available' ? 'تصنيع محلي عبر ورشة ميكانيكية' : 'سير جاهز للاستخدام المباشر',
      supplier: workshopOption === 'available' ? 'ورشة ميكانيكية محلية' : 'مورد معدات تعبئة وتغليف',
      qty: 1,
      costEgp: workshopOption === 'available' ? 3500 : 8500
    },
    {
      category: isAr ? 'مزودات الطاقة' : 'Power & Protection',
      nameAr: 'مزود طاقة صناعي 12V 10A + دوائر حماية ريلاي',
      nameEn: '12V 10A Power Supply & Relay Shield',
      specsAr: 'لتغذية الموتور ولوحة التحكم بأمان وثبات',
      supplier: 'RAM Electronics / باب اللوق',
      qty: 1,
      costEgp: 650
    }
  ];

  const totalCostEgp = bomItems.reduce((acc, item) => acc + (item.costEgp * item.qty), 0);
  const totalCostUsd = Math.round(totalCostEgp / 50); // approximate exchange rate

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'قائمة المشتريات ومصادر التوريد للنموذج المصغر' : 'Prototype BOM & Local Egyptian Suppliers'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'خريطة شراء قطع النموذج المصغر وأماكن تواجدها في مصر' : 'Prototype Bill of Materials & Egyptian Supply Chain'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'بناءً على اختيارك، إليك تفاصيل الهاردوير، أسعارها التقريبية بالجنيه المصري، ومصادر الشراء المعتمدة في القاهرة والإسكندرية للتجربة العملية أمام العملاء.'
            : 'Detailed bill of materials, estimated Egyptian Pound pricing, and verified supplier locations in Cairo and Alexandria for live client demos.'}
        </p>
      </div>

      {/* Workshop Mode Selector */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <label className="font-semibold text-slate-700">
            {isAr ? 'كيف تفضل تجهيز الهيكل والسير الناقل؟' : 'How would you like to build the conveyor frame?'}
          </label>
          <p className="text-slate-500">
            {isAr ? 'هل لديك ورشة ميكانيكية محلية لتصنيع الهيكل أم تفضل شراء سير جاهز؟' : 'Choose between local workshop fabrication or buying a ready-made mini conveyor.'}
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            onClick={() => setWorkshopOption('available')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              workshopOption === 'available' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
            }`}
          >
            {isAr ? 'ورشة محلية (توفير التكلفة)' : 'Local Workshop'}
          </button>
          <button
            onClick={() => setWorkshopOption('buy_ready')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              workshopOption === 'buy_ready' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
            }`}
          >
            {isAr ? 'شراء سير جاهز' : 'Buy Ready Unit'}
          </button>
        </div>
      </div>

      {/* BOM Table */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {isAr ? 'جدول المكونات والهاردوير للنموذج التجريبي' : 'Prototype Hardware BOM'}
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              {isAr ? 'مخصص لمحصولين (برتقال وطماطم) مع 3 مخارج فرز' : 'Configured for 2 crops & 3 sorting outlets'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCurrency('EGP')}
              className={`px-3 py-1 text-xs font-mono rounded ${selectedCurrency === 'EGP' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-700'}`}
            >
              EGP (ج.م)
            </button>
            <button
              onClick={() => setSelectedCurrency('USD')}
              className={`px-3 py-1 text-xs font-mono rounded ${selectedCurrency === 'USD' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-700'}`}
            >
              USD ($)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <th className="p-3 text-start">{isAr ? 'التصنيف' : 'Category'}</th>
                <th className="p-3 text-start">{isAr ? 'المكون / القطعة' : 'Component Name'}</th>
                <th className="p-3 text-start">{isAr ? 'المواصفات الفنية' : 'Specifications'}</th>
                <th className="p-3 text-start">{isAr ? 'مصدر الشراء المقترح في مصر' : 'Egyptian Supplier'}</th>
                <th className="p-3 text-center">{isAr ? 'الكمية' : 'Qty'}</th>
                <th className="p-3 text-end">{isAr ? 'السعر التقديري' : 'Estimated Cost'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bomItems.map((item, idx) => {
                const cost = selectedCurrency === 'EGP' ? item.costEgp : Math.round(item.costEgp / 50);
                return (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-emerald-700">{item.category}</td>
                    <td className="p-3 font-bold text-slate-900">{isAr ? item.nameAr : item.nameEn}</td>
                    <td className="p-3 text-slate-600">{item.specsAr}</td>
                    <td className="p-3 text-slate-700 font-mono text-[11px]">{item.supplier}</td>
                    <td className="p-3 text-center font-mono">{item.qty}</td>
                    <td className="p-3 text-end font-mono font-bold text-slate-900">
                      {selectedCurrency === 'EGP' ? `${cost.toLocaleString()} ج.م` : `$${cost.toLocaleString()}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Total Summary Footer */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl">
          <div className="text-xs text-slate-600">
            {isAr ? '* الأسعار تخضع لتغيرات السوق المحلي في مصر، وتشمل المكونات الأساسية للتشغيل والتجربة.' : '* Prices subject to local market fluctuations in Egypt.'}
          </div>
          <div className="text-end font-mono">
            <span className="text-xs text-slate-500">{isAr ? 'التكلفة الإجمالية التقديرية:' : 'Estimated Total:'}</span>{' '}
            <span className="text-xl font-bold text-emerald-700">
              {selectedCurrency === 'EGP' ? `${totalCostEgp.toLocaleString()} جنيه مصري` : `$${totalCostUsd.toLocaleString()} USD`}
            </span>
          </div>
        </div>
      </div>

      {/* Verified Suppliers Reference Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Supplier 1 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Makers Electronics (الإسكندرية)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isAr
              ? 'العنوان: 158 شارع الحرية، الإبراهيمية. ممتاز لشراء لوحات ESP32، الحساسات، وقطع الإلكترونيات والمتحلمات.'
              : 'Alexandria: 158 Al-Horreya St, Ibrahimia. Great for ESP32, sensors, and microelectronics.'}
          </p>
        </div>

        {/* Supplier 2 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>RAM Electronics (القاهرة)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isAr
              ? 'العنوان: 32 شارع الفلكي، باب اللوق. مرجع أساسي لمقارنة أسعار اللوحات والكاميرات ومزودات الطاقة.'
              : 'Cairo: 32 Al-Falaky St, Bab El-Louk. Primary hub for boards, cameras, and power supplies.'}
          </p>
        </div>

        {/* Supplier 3 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Future Electronics / سوق العتبة</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isAr
              ? 'مناسب لشراء المحركات (DC Motors)، البكرات، ومستلزمات خط السير الناقل بأسعار الجملة.'
              : 'Great for sourcing gear motors, belts, and mechanical conveyor components at wholesale pricing.'}
          </p>
        </div>
      </div>
    </div>
  );
};
