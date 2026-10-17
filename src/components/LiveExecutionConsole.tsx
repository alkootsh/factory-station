import React, { useState } from 'react';
import { Terminal, CheckCircle2, Play, Download, Code, Sparkles, RefreshCw, Cpu, Database, Layers } from 'lucide-react';

interface LiveExecutionConsoleProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const LiveExecutionConsole: React.FC<LiveExecutionConsoleProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    '[INIT] CitrusSort AI Core v0.3 initialized successfully.',
    '[INFO] Loading crop profile: Citrus (Orange & Mandarine).',
    '[READY] Waiting to start live sorting session...'
  ]);

  const handleStartSimulationServer = () => {
    setIsRunning(true);
    setLogs((prev) => [
      ...prev,
      '[SERVER] Starting Flask server on http://0.0.0.0:5000...',
      '[CAMERA] Connecting to RTSP IP Camera stream (192.168.1.108)...',
      '[NPU] Edge AI Tensor acceleration model loaded (MobileNet-ViT v4.8).',
      '[SUCCESS] Live sorting session active! Processing 60 FPS.'
    ]);
  };

  const handleStopSimulationServer = () => {
    setIsRunning(false);
    setLogs((prev) => [...prev, '[STOP] Sorting session halted by user.']);
  };

  const handleSimulateFruitPass = () => {
    const outlets = [1, 2, 3, 4];
    const grades = ['Class 1 Extra', 'Class 2 Standard', 'Juice Processing', 'Cull / Reject'];
    const randomIdx = Math.floor(Math.random() * outlets.length);
    const outlet = outlets[randomIdx];
    const grade = grades[randomIdx];

    setLogs((prev) => [
      ...prev,
      `[VISION] Fruit detected at optical cabin (Ø 76.4mm, Brix: 11.8 °Bx).`,
      `[AI] Classification result: ${grade} -> Routed to Outlet ${outlet}.`,
      `[PLC] Actuated pneumatic ejector valve for Outlet ${outlet}.`
    ]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'لوحة التحكم والتشغيل الحية (Live Execution Console)' : 'Live Execution & Console Hub'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'بدء التنفيذ والتشغيل الفعلي للنظام البرمجي' : 'Live Execution Console & Server Monitor'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'هذه هي لوحة التشغيل الحية التي تتحكم في السيرفر المحلي، مراقبة الكاميرا، وتشغيل خوارزميات الفرز والذكاء الاصطناعي.'
            : 'Live server command center for running the local Python AI server, monitoring IP camera streams, and testing actuator triggers.'}
        </p>
      </div>

      {/* Control Actions Toolbar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
          <span className="text-xs font-bold font-mono text-slate-800">
            {isRunning ? (isAr ? 'السيرفر يعمل (Server Running)' : 'Server Online') : (isAr ? 'السيرفر متوقف (Server Stopped)' : 'Server Offline')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isRunning ? (
            <button
              onClick={handleStartSimulationServer}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow transition-colors flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isAr ? 'تشغيل سيرفر السوفت وير (Start Server)' : 'Start Python Server'}</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleSimulateFruitPass}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs shadow transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'محاكاة مرور ثمرة على الكاميرا' : 'Simulate Fruit Passing'}</span>
              </button>
              <button
                onClick={handleStopSimulationServer}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs shadow transition-colors"
              >
                {isAr ? 'إيقاف السيرفر' : 'Stop Server'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Terminal Log Output Window */}
      <div className="bg-slate-950 text-emerald-400 p-6 rounded-2xl border border-slate-800 shadow-2xl font-mono text-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-400 text-[11px]">
          <span className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>CitrusSort AI Terminal Logs (stdout)</span>
          </span>
          <button
            onClick={() => setLogs(['[RESET] Terminal cleared.'])}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            {isAr ? 'مسح السجل' : 'Clear Log'}
          </button>
        </div>

        <div className="h-64 overflow-y-auto space-y-1.5 text-[11px] leading-relaxed no-scrollbar">
          {logs.map((log, idx) => (
            <div key={idx} className={log.includes('SUCCESS') ? 'text-emerald-300 font-bold' : log.includes('WARN') ? 'text-amber-400' : 'text-slate-300'}>
              {log}
            </div>
          ))}
          {isRunning && (
            <div className="text-emerald-500 animate-pulse">_</div>
          )}
        </div>
      </div>
    </div>
  );
};
