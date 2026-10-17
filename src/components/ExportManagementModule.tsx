import React, { useState } from 'react';
import { Ship, Globe, FileText, CheckCircle2, Package, ShieldCheck, Plus, Truck, ArrowRight, Printer } from 'lucide-react';

interface ExportManagementModuleProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

interface ExportShipment {
  id: string;
  contractNumber: string;
  importerName: string;
  destinationPort: string;
  shippingLine: string;
  containerNumber: string;
  cropVariety: string;
  totalCartons: number;
  netWeightTons: number;
  phytosanitaryStatus: 'certified' | 'pending_inspection' | 'rejected';
  customsStatus: 'cleared' | 'in_progress' | 'customs_hold';
  etdDate: string;
  etaDate: string;
}

export const ExportManagementModule: React.FC<ExportManagementModuleProps> = ({ lang }) => {
  const [shipments, setShipments] = useState<ExportShipment[]>([
    {
      id: 'EXP-SHP-801',
      contractNumber: 'CTR-2026-EU9',
      importerName: 'Barakat Import BV (Rotterdam)',
      destinationPort: 'Rotterdam Port, Netherlands',
      shippingLine: 'Maersk Line (Vessel: Maersk Mc-Kinney)',
      containerNumber: 'MSKU-8492011-4',
      cropVariety: 'Valencia Oranges (Cal. 64-72)',
      totalCartons: 3200,
      netWeightTons: 48.5,
      phytosanitaryStatus: 'certified',
      customsStatus: 'cleared',
      etdDate: '2026-10-18',
      etaDate: '2026-10-28'
    },
    {
      id: 'EXP-SHP-802',
      contractNumber: 'CTR-2026-ME4',
      importerName: 'Al-Madina Fresh Fruits (Dubai)',
      destinationPort: 'Jebel Ali Port, UAE',
      shippingLine: 'CMA CGM (Vessel: Christophe Colomb)',
      containerNumber: 'CMAU-2094182-9',
      cropVariety: 'Grand Nain Bananas (Grade A)',
      totalCartons: 2400,
      netWeightTons: 36.0,
      phytosanitaryStatus: 'certified',
      customsStatus: 'cleared',
      etdDate: '2026-10-19',
      etaDate: '2026-10-24'
    },
    {
      id: 'EXP-SHP-803',
      contractNumber: 'CTR-2026-UK2',
      importerName: 'London Heathrow Fresh Airfreight',
      destinationPort: 'London Heathrow Airport (LHR)',
      shippingLine: 'EgyptAir Cargo (Flight MS-777)',
      containerNumber: 'ULD-AIR-9921',
      cropVariety: 'Egyptian Mangoes (Keitt / Zibda)',
      totalCartons: 850,
      netWeightTons: 12.5,
      phytosanitaryStatus: 'certified',
      customsStatus: 'cleared',
      etdDate: '2026-10-17',
      etaDate: '2026-10-17'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [importer, setImporter] = useState('');
  const [destination, setDestination] = useState('');
  const [crop, setCrop] = useState('برتقال فالنسيا (Valencia Oranges)');
  const [cartons, setCartons] = useState('3000');
  const [successMsg, setSuccessMsg] = useState('');

  const isAr = lang === 'ar';

  const handleAddShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importer || !destination) return;

    const newShp: ExportShipment = {
      id: `EXP-SHP-${Math.floor(100 + Math.random() * 900)}`,
      contractNumber: `CTR-2026-${Math.floor(10 + Math.random() * 90)}`,
      importerName: importer,
      destinationPort: destination,
      shippingLine: 'MSC Mediterranean Shipping',
      containerNumber: `MSCU-${Math.floor(1000000 + Math.random() * 9000000)}-1`,
      cropVariety: crop,
      totalCartons: Number(cartons),
      netWeightTons: Number((Number(cartons) * 0.015).toFixed(1)),
      phytosanitaryStatus: 'certified',
      customsStatus: 'cleared',
      etdDate: '2026-10-20',
      etaDate: '2026-11-02'
    };

    setShipments([newShp, ...shipments]);
    setImporter('');
    setDestination('');
    setShowAddModal(false);
    setSuccessMsg(isAr ? 'تم إضافة شحنة التصدير بنجاح واستخراج المستندات الجمركية!' : 'Export shipment added & customs docs generated!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Export Company & Logistics Management Hub
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            {isAr ? 'نظام إدارة شركات التصدير والشحن الدولي' : 'Export Companies & International Shipping Management'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            {isAr ? 'إدارة عقود التصدير العالمية، الحجوزات الملاحية، شهادات الحجر الزراعي (Phytosanitary)، التخليص الجمركي، وحاويات التبريد عبر خطوط الشحن العالمية.' : 'Manage global export contracts, shipping bookings, phytosanitary certificates, customs clearance, and refrigerated containers.'}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? 'إنشاء شحنة تصدير جديدة' : 'New Export Shipment'}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Shipments Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {shipments.map((shp) => (
          <div key={shp.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 flex flex-col justify-between hover:border-blue-400 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                  {shp.id}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">{shp.contractNumber}</span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base">{shp.importerName}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{shp.destinationPort}</p>
              </div>

              <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500">{isAr ? 'خط الشحن:' : 'Shipping Line:'}</span>
                  <span className="font-bold">{shp.shippingLine}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isAr ? 'رقم الحاوية:' : 'Container:'}</span>
                  <span className="font-mono text-blue-600 font-bold">{shp.containerNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isAr ? 'الصنف الكمية:' : 'Crop / Weight:'}</span>
                  <span className="font-bold">{shp.cropVariety} ({shp.netWeightTons} Tons)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {isAr ? 'حجر زراعي معتمد' : 'Phytosanitary Certified'}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {isAr ? 'تم التخليص الجمركي' : 'Customs Cleared'}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">ETD: <strong className="text-slate-900">{shp.etdDate}</strong></span>
              <button onClick={() => alert(isAr ? 'جاري طباعة الفاتورة التجارية وشهادة المنشأ وحال الحجر الزراعي...' : 'Printing Commercial Invoice & Phytosanitary Certificate...')} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5" /> {isAr ? 'مستندات الشحن' : 'Shipping Docs'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{isAr ? 'إصدار شحنة وعقد تصدير جديد' : 'Create New Export Shipment'}</h3>
            <form onSubmit={handleAddShipment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'اسم المستورد الدولي والبلد' : 'Importer Name & Country'}</label>
                <input type="text" required value={importer} onChange={(e) => setImporter(e.target.value)} placeholder="مثال: London Fresh Importers (UK)" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'ميناء الوصول النهائي' : 'Destination Port'}</label>
                <input type="text" required value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="مثال: London Heathrow Airport (LHR)" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'صنف المحصول' : 'Crop Variety'}</label>
                <input type="text" value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'عدد الكراتين' : 'Total Cartons'}</label>
                <input type="number" value={cartons} onChange={(e) => setCartons(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-700">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 rounded-lg text-xs font-bold text-white">حفظ وإصدار المستندات</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
