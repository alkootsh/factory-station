import React, { useState } from 'react';
import { Snowflake, Thermometer, ShieldCheck, AlertTriangle, Activity, RefreshCw } from 'lucide-react';

interface ColdStorageManagementProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const ColdStorageManagement: React.FC<ColdStorageManagementProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [rooms, setRooms] = useState([
    { id: 'CS-01', nameAr: 'غرفة التبريد السريع (Pre-Cooling 1)', nameEn: 'Pre-Cooling Room 1', temp: 2.4, targetTemp: 2.0, humidity: 92, status: 'Optimal', capacityTons: 60, currentTons: 48, product: 'Citrus / Oranges' },
    { id: 'CS-02', nameAr: 'غرفة حفظ التفاح (Apples Cold Room 2)', nameEn: 'Apple Storage Room 2', temp: -0.5, targetTemp: -1.0, humidity: 90, status: 'Optimal', capacityTons: 120, currentTons: 110, product: 'Royal Gala Apples' },
    { id: 'CS-03', nameAr: 'غرفة المعالجة الحرارية / التجفيف', nameEn: 'Curing & De-greening Chamber', temp: 18.5, targetTemp: 18.0, humidity: 85, status: 'Warning - High Humidity', capacityTons: 40, currentTons: 35, product: 'Green Lemons' },
    { id: 'CS-04', nameAr: 'غرفة شحن التصدير المبردة', nameEn: 'Loading Dock Cold Buffer', temp: 6.2, targetTemp: 5.0, humidity: 80, status: 'Cooling Active', capacityTons: 80, currentTons: 62, product: 'Mixed Pallets' },
  ]);

  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'إدارة غرف التبريد والتحكم في درجات الحرارة' : 'Cold Storage & Thermal Control Chain'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'مراقبة غرف التبريد وسلسلة الإمداد المبردة' : 'Cold Chain & Refrigeration Telemetry'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'متابعة لحظية لدرجات الحرارة، الرطوبة النسبية، وضواغط التبريد لضمان جودة المحاصيل الطازجة قبل وبعد الفرز.'
            : 'Real-time telemetry of temperatures, humidity, and compressor statuses ensuring optimal post-harvest cold chain integrity.'}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">{isAr ? 'متوسط حرارة التبريد' : 'Avg Cold Temp'}</div>
            <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">1.6 °C</div>
            <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> {isAr ? 'ضمن المعدل الآمن' : 'Within Safe Range'}
            </div>
          </div>
          <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600">
            <Snowflake className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">{isAr ? 'متوسط الرطوبة النسبية' : 'Avg Relative Humidity'}</div>
            <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">86.7 %</div>
            <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> {isAr ? 'مثالي لمنع الجفاف' : 'Optimal Anti-Dehydration'}
            </div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <Thermometer className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">{isAr ? 'إجمالي السعة المخزنة' : 'Total Stored Tonnage'}</div>
            <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">255 طن</div>
            <div className="text-[11px] text-slate-500 mt-1">
              {isAr ? 'من إجمالي 300 طن سعة قصوى' : 'of 300T max capacity'}
            </div>
          </div>
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">{isAr ? 'حالة الإنذارات الحرارية' : 'Thermal Alarms'}</div>
            <div className="text-2xl font-bold text-amber-600 mt-1 font-mono">1 تحذير</div>
            <div className="text-[11px] text-amber-600 mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> {isAr ? 'رطوبة مرتفعة في الغرفة 3' : 'High Humidity in Room 3'}
            </div>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            {isAr ? 'قائمة غرف التبريد ووحدات التخزين' : 'Cold Storage Chambers & Dock Status'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white ${
                  selectedRoom.id === room.id
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">{room.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    room.status.includes('Optimal') ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {room.status}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 mt-2">{isAr ? room.nameAr : room.nameEn}</h4>
                <div className="text-xs text-slate-500 mt-1">{isAr ? 'المنتج:' : 'Product:'} {room.product}</div>

                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <div className="text-[10px] text-slate-400">{isAr ? 'الحرارة الحالية' : 'Current Temp'}</div>
                    <div className="font-mono font-bold text-slate-800 text-sm">{room.temp}°C</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <div className="text-[10px] text-slate-400">{isAr ? 'المستهدف' : 'Target'}</div>
                    <div className="font-mono font-bold text-slate-600 text-sm">{room.targetTemp}°C</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <div className="text-[10px] text-slate-400">{isAr ? 'الرطوبة' : 'Humidity'}</div>
                    <div className="font-mono font-bold text-slate-800 text-sm">{room.humidity}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Room Deep Dive */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-mono text-emerald-400">{selectedRoom.id}</div>
              <h3 className="text-xl font-bold mt-1">{isAr ? selectedRoom.nameAr : selectedRoom.nameEn}</h3>
            </div>
            <Snowflake className="w-8 h-8 text-sky-400 animate-pulse" />
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-800/80 rounded-xl">
              <span className="text-slate-400">{isAr ? 'المنتج المخزن' : 'Stored Product'}</span>
              <span className="font-bold text-white">{selectedRoom.product}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/80 rounded-xl">
              <span className="text-slate-400">{isAr ? 'الحمولة الفعلية / السعة' : 'Current / Capacity'}</span>
              <span className="font-mono font-bold text-emerald-400">{selectedRoom.currentTons}T / {selectedRoom.capacityTons}T</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/80 rounded-xl">
              <span className="text-slate-400">{isAr ? 'حالة الضاغط (Compressor)' : 'Compressor Status'}</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                {isAr ? 'يعمل بكفاءة 85%' : 'Running @ 85%'}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => alert(isAr ? 'تم إرسال أمر إعادة ضبط دورة التبريد للغرفة.' : 'Refrigeration cycle recalibration command sent.')}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{isAr ? 'إعادة ضبط ومعايرة دورة التبريد' : 'Recalibrate Cold Loop'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
