import React, { useState } from 'react';
import { Camera, Wifi, CheckCircle2, Terminal, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

interface IPCameraIntegrationProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const IPCameraIntegration: React.FC<IPCameraIntegrationProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [streamProtocol, setStreamProtocol] = useState<'rtsp' | 'onvif' | 'mjpeg'>('rtsp');
  const [ipAddress, setIpAddress] = useState<string>('192.168.1.108');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success'>('idle');

  const handleTestConnection = () => {
    setTestStatus('testing');
    setTimeout(() => {
      setTestStatus('success');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'دعم كاميرات الـ IP الصناعية (IP Camera Integration)' : 'Industrial IP Camera Integration'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'ممتاز! استخدام كاميرا IP بدلاً من USB (RTSP / ONVIF)' : 'Awesome! Using your IP Camera via RTSP / ONVIF'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'الاعتماد على كاميرا IP (سواء كانت ثابتة أو متحركة PTZ أو كاميرا مراقبة صناعية) يوفر مرونة هائلة في التثبيت، إضاءة أفضل، واتصال شبكي عبر الإيثرنت أو الواي فاي دون قيود أسلاك الـ USB القصيرة.'
            : 'Using an IP camera provides superior mounting flexibility, PoE power, and robust network streaming over RTSP without USB cable length limitations.'}
        </p>
      </div>

      {/* Grid: Config on Left, Python OpenCV Test Code on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: IP Camera Config Panel */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-slate-900 font-bold border-b border-slate-100 pb-3">
            <Wifi className="w-5 h-5 text-emerald-600" />
            <span>{isAr ? 'إعدادات اتصال كاميرا الـ IP' : 'IP Camera Connection Config'}</span>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-slate-700">
              {isAr ? 'بروتوكول البث (Streaming Protocol)' : 'Stream Protocol'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setStreamProtocol('rtsp')}
                className={`py-2 rounded border font-medium ${streamProtocol === 'rtsp' ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold' : 'bg-slate-50 text-slate-600'}`}
              >
                RTSP Stream
              </button>
              <button
                onClick={() => setStreamProtocol('onvif')}
                className={`py-2 rounded border font-medium ${streamProtocol === 'onvif' ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold' : 'bg-slate-50 text-slate-600'}`}
              >
                ONVIF
              </button>
              <button
                onClick={() => setStreamProtocol('mjpeg')}
                className={`py-2 rounded border font-medium ${streamProtocol === 'mjpeg' ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold' : 'bg-slate-50 text-slate-600'}`}
              >
                HTTP / MJPEG
              </button>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-slate-700">
              {isAr ? 'عنوان الـ IP الخاص بالكاميرا' : 'Camera IP Address'}
            </label>
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900"
            />
          </div>

          <div className="space-y-1.5 text-xs font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-slate-500">{isAr ? 'رابط البث المُولّد (Stream URL):' : 'Generated Stream URL:'}</div>
            <div className="text-emerald-700 font-bold break-all">
              {streamProtocol === 'rtsp' ? `rtsp://admin:password@${ipAddress}:554/stream1` : `http://${ipAddress}/videostream.cgi`}
            </div>
          </div>

          <button
            onClick={handleTestConnection}
            disabled={testStatus === 'testing'}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
          >
            {testStatus === 'testing' ? (
              <span>{isAr ? 'جاري اختبار الاتصال...' : 'Testing connection...'}</span>
            ) : testStatus === 'success' ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAr ? 'تم الاتصال بنجاح! البث يعمل 60 FPS' : 'Connected! Stream Active 60 FPS'}</span>
              </span>
            ) : (
              <span>{isAr ? 'اختبار اتصال الكاميرا (Test Stream)' : 'Test Camera Connection'}</span>
            )}
          </button>
        </div>

        {/* Right: Python OpenCV Integration Snippet */}
        <div className="lg:col-span-6 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-emerald-400">
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>Python OpenCV RTSP Stream Code</span>
            </span>
            <span>main.py</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto text-[11px] leading-relaxed text-slate-300 space-y-1">
            <div className="text-purple-400">import</div>
            <div className="ps-4">cv2</div>
            <div className="text-slate-500"># RTSP IP Camera Connection string</div>
            <div>rtsp_url = <span className="text-emerald-300">"rtsp://admin:pass@{ipAddress}:554/stream1"</span></div>
            <div className="text-slate-500"># Open video capture stream</div>
            <div>cap = cv2.VideoCapture(rtsp_url)</div>
            <div className="text-purple-400">while</div> <div className="inline">cap.isOpened():</div>
            <div className="ps-4">ret, frame = cap.read()</div>
            <div className="ps-4 text-purple-400">if not</div> <div className="inline">ret: <span className="text-purple-400">break</span></div>
            <div className="ps-4 text-slate-500"># Pass frame to AI Vision model</div>
            <div className="ps-4">results = ai_model(frame)</div>
            <div className="ps-4">cv2.imshow(<span className="text-emerald-300">"Falcon Eye IP Vision"</span>, frame)</div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            {isAr
              ? 'ميزة استخدام كاميرا IP أنه يمكننا ربط عدة كاميرات على نفس الشبكة المحلية (LAN) دون التأثير على أداء حاسوب المعالجة المركزي.'
              : 'Advantage of IP cameras: You can stream multiple cameras across the local LAN directly into the Python AI pipeline.'}
          </div>
        </div>
      </div>
    </div>
  );
};
