import React, { useState, useEffect } from 'react';
import { Activity, Thermometer, Gauge, Cpu, RefreshCw, Zap, ShieldAlert, CheckCircle2, Waves } from 'lucide-react';

interface RealtimePLCStreamProps {
  lang: 'ar' | 'en' | 'es' | 'fr' | 'es' | 'fr';
}

export const RealtimePLCStream: React.FC<RealtimePLCStreamProps> = ({ lang }) => {
  const [isStreaming, setIsStreaming] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(1000); // 1s

  // Simulated live sensor states
  const [sensors, setSensors] = useState({
    line1Temp: 4.2,
    line1Humidity: 88.5,
    line1Weight: 1420.5,
    line1Pressure: 2.4,
    plcStatus: 'ONLINE (Modbus TCP/IP)',
    beltSpeed: 1.25,
    nirLaserPower: 99.4,
  });

  const isAr = lang === 'ar';
  const isEs = lang === 'es';
  const isFr = lang === 'fr';

  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setSensors((prev) => ({
        ...prev,
        line1Temp: Number((4.0 + Math.random() * 0.6).toFixed(2)),
        line1Humidity: Number((87.0 + Math.random() * 3.0).toFixed(1)),
        line1Weight: Number((1410 + Math.random() * 35).toFixed(1)),
        line1Pressure: Number((2.3 + Math.random() * 0.3).toFixed(2)),
        beltSpeed: Number((1.20 + Math.random() * 0.1).toFixed(2)),
        nirLaserPower: Number((99.0 + Math.random() * 0.9).toFixed(1)),
      }));
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [isStreaming, refreshInterval]);

  const t = {
    title: {
      ar: 'بث بيانات الحساسات الحية (PLC & IoT Real-Time Streaming)',
      en: 'Real-Time PLC Sensor & IoT Data Streaming Console',
      es: 'Consola de Transmisión de Datos PLC e IoT en Tiempo Real',
      fr: 'Console de Diffusion de Données PLC et IoT en Temps Réel'
    },
    subtitle: {
      ar: 'مراقبة فورية لدرجات الحرارة، ضغط المياه، معدلات الوزن اللحظية، وسرعات السيور لجميع أقسام خطوط الإنتاج عبر بروتوكول Modbus TCP/IP.',
      en: 'Live monitoring of temperatures, water pressure, instantaneous weight rates, and belt speeds across all line sections via Modbus TCP/IP.',
      es: 'Monitoreo en vivo de temperaturas, presión de agua, tasas de peso instantáneas y velocidades de banda.',
      fr: 'Surveillance en direct des températures, de la pression d\'eau, des taux de poids instantanés et des vitesses de bande.'
    },
    pauseStream: {
      ar: isStreaming ? 'إيقاف مؤقت للبث' : 'استئناف البث',
      en: isStreaming ? 'Pause Stream' : 'Resume Stream',
      es: isStreaming ? 'Pausar Transmisión' : 'Reanudar Transmisión',
      fr: isStreaming ? 'Suspendre le Flux' : 'Reprendre le Flux'
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
            <Activity className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono text-emerald-300 uppercase tracking-widest font-bold">
                {sensors.plcStatus}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
              {isAr ? t.title.ar : isEs ? t.title.es : isFr ? t.title.fr : t.title.en}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              {isAr ? t.subtitle.ar : isEs ? t.subtitle.es : isFr ? t.subtitle.fr : t.subtitle.en}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all ${
              isStreaming 
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' 
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isStreaming ? 'animate-spin' : ''}`} />
            <span>{t.pauseStream[lang === 'ar' ? 'ar' : 'en']}</span>
          </button>
        </div>
      </div>

      {/* Sensor Live Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Temperature Probe */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200 flex flex-col justify-between hover:border-emerald-400 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isAr ? 'حساس حرارة التبريد' : 'Cold Room Temp Probe'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Thermometer className="w-5 h-5" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {sensors.line1Temp}
            </span>
            <span className="text-sm font-bold text-blue-600 ms-1.5">°C</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-2 mt-2">
            <span>{isAr ? 'النطاق الآمن: 2° - 6°' : 'Safe Range: 2° - 6°'}</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Stable
            </span>
          </div>
        </div>

        {/* Card 2: Weight Indicator */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200 flex flex-col justify-between hover:border-emerald-400 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isAr ? 'ميزان التدفق اللحظي' : 'In-Line Scale Flow'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Gauge className="w-5 h-5" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {sensors.line1Weight}
            </span>
            <span className="text-sm font-bold text-emerald-600 ms-1.5">kg/h</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-2 mt-2">
            <span>{isAr ? 'السعة القصوى: 2000' : 'Max Capacity: 2000'}</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active
            </span>
          </div>
        </div>

        {/* Card 3: Belt Speed */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200 flex flex-col justify-between hover:border-emerald-400 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isAr ? 'سرعة سير الفرز الرئيسي' : 'Sorting Belt Speed'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Waves className="w-5 h-5" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {sensors.beltSpeed}
            </span>
            <span className="text-sm font-bold text-teal-600 ms-1.5">m/s</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-2 mt-2">
            <span>{isAr ? 'العاكس: ABB VFD-03' : 'Inverter: ABB VFD'}</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Synchronized
            </span>
          </div>
        </div>

        {/* Card 4: NIR Laser Strobe */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200 flex flex-col justify-between hover:border-emerald-400 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isAr ? 'كفاءة طيف الليزر NIR' : 'NIR Laser Emitter'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {sensors.nirLaserPower}
            </span>
            <span className="text-sm font-bold text-amber-600 ms-1.5">%</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-2 mt-2">
            <span>{isAr ? 'الطول الموجي: 980nm' : 'Wavelength: 980nm'}</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Optimal
            </span>
          </div>
        </div>
      </div>

      {/* PLC Register Table & Live Graph Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PLC Registers Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-600" />
              <span>{isAr ? 'سجلات قراءة الـ PLC وحساسات الخطوط' : 'Live PLC Registers & Sensor Map'}</span>
            </h3>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
              Modbus ID: 192.168.1.50:502
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold uppercase">
                  <th className="p-3 text-start">{isAr ? 'رقم السجل (Register)' : 'Register ID'}</th>
                  <th className="p-3 text-start">{isAr ? 'اسم الحساس / الوحدة' : 'Sensor / Component'}</th>
                  <th className="p-3 text-start">{isAr ? 'القيمة الحالية' : 'Current Value'}</th>
                  <th className="p-3 text-start">{isAr ? 'الحالة' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                <tr>
                  <td className="p-3 font-mono text-slate-500">HR-40001</td>
                  <td className="p-3">{isAr ? 'مستشعر درجة حرارة غرفة التبريد 1' : 'Cold Room 1 Temperature Probe'}</td>
                  <td className="p-3 font-bold text-blue-600">{sensors.line1Temp} °C</td>
                  <td className="p-3 text-emerald-600 font-bold">NORMAL</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-slate-500">HR-40003</td>
                  <td className="p-3">{isAr ? 'حساس الرطوبة النسبية للثلاجة' : 'Cold Storage Relative Humidity'}</td>
                  <td className="p-3 font-bold text-teal-600">{sensors.line1Humidity} %</td>
                  <td className="p-3 text-emerald-600 font-bold">NORMAL</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-slate-500">HR-40008</td>
                  <td className="p-3">{isAr ? 'ميزان التدفق اللحظي لسير الفرز' : 'In-Line Dynamic Scale Weight'}</td>
                  <td className="p-3 font-bold text-emerald-600">{sensors.line1Weight} kg/h</td>
                  <td className="p-3 text-emerald-600 font-bold">ACTIVE</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-slate-500">HR-40012</td>
                  <td className="p-3">{isAr ? 'ضغاط مياه غسيل المنتج' : 'Fruit Washing Water Pressure'}</td>
                  <td className="p-3 font-bold text-slate-900">{sensors.line1Pressure} Bar</td>
                  <td className="p-3 text-emerald-600 font-bold">STABLE</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-slate-500">HR-40019</td>
                  <td className="p-3">{isAr ? 'عاكس سرعة سير الفرز (VFD)' : 'Sorting Line VFD Speed'}</td>
                  <td className="p-3 font-bold text-slate-900">{sensors.beltSpeed} m/s</td>
                  <td className="p-3 text-emerald-600 font-bold">RUNNING</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time Oscilloscope / Waveform Visualizer */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Waves className="w-4 h-4" />
                <span>{isAr ? 'رسم بياني لتدفق الحساسات' : 'Oscilloscope Stream'}</span>
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <p className="text-xs text-slate-300 mb-6">
              {isAr ? 'تمثيل بصري تفاعلي للإشارات اللحظية الواردة من وحدات التحكم المنطقي القابلة للبرمجة (PLC).' : 'Interactive live waveform representation of incoming PLC telemetry registers.'}
            </p>

            {/* Visual Waveform simulation bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Temperature Load</span>
                  <span className="text-blue-400">{sensors.line1Temp}°C</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${(sensors.line1Temp / 10) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Weight Flow Rate</span>
                  <span className="text-emerald-400">{sensors.line1Weight} kg/h</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${(sensors.line1Weight / 2000) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Belt Speed VFD</span>
                  <span className="text-teal-400">{sensors.beltSpeed} m/s</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full transition-all duration-500" style={{ width: `${(sensors.beltSpeed / 2.0) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Latency: &lt; 12ms</span>
            <span className="text-emerald-400 font-bold">Modbus TCP Stream Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};
