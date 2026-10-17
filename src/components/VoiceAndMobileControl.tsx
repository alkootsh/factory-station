import React, { useState } from 'react';
import { Mic, Volume2, Smartphone, Globe, Sparkles, CheckCircle2, Play, VolumeX, Radio, Send, Cpu } from 'lucide-react';
import { FRUIT_PROFILES, FAULT_CODES } from '../data/mafData';

interface VoiceAndMobileControlProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const VoiceAndMobileControl: React.FC<VoiceAndMobileControlProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>(
    isAr ? 'اضغط على زر الميكروفون وأعطِ أمراً صوتياً (مثال: ما هي إنتاجية الخط الحالية؟)' : 'Click mic and speak a voice command (e.g., "What is current line throughput?")'
  );
  const [aiResponse, setAiResponse] = useState<string>(
    isAr ? 'المساعد الذكي جاهز لتلقي الأوامر الصوتية والتنبيهات بالعربية...' : 'Voice AI assistant ready for commands and telemetry alerts...'
  );
  const [simulatedMobileView, setSimulatedMobileView] = useState<'dashboard' | 'alerts' | 'recipe'>('dashboard');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);

  // Simulated Voice Command handler
  const handleSimulateVoiceCommand = (commandType: string) => {
    setIsListening(true);
    setTranscript(isAr ? 'جاري الاستماع للأمر الصوتي...' : 'Listening to voice command...');

    setTimeout(() => {
      setIsListening(false);
      if (commandType === 'throughput') {
        setTranscript(isAr ? '"ما هي الطاقة الإنتاجية للخط حالياً؟"' : '"What is the current line throughput?"');
        setAiResponse(
          isAr
            ? 'الطاقة الإنتاجية الحالية هي 14.2 طن في الساعة. نسبة الصالح للتصدير 84.5%، ولا توجد أعطال مسجلة.'
            : 'Current line throughput is 14.2 tons per hour. Export pack-out is 84.5% with zero active alarms.'
        );
      } else if (commandType === 'brix') {
        setTranscript(isAr ? '"ارفع حد السكر الأدنى للتصدير إلى 11.5 بريكس"' : '"Set minimum export Brix threshold to 11.5"' );
        setAiResponse(
          isAr
            ? 'تم تحديث وصفة الفرز بنجاح. تم تعديل حد السكر الأدنى إلى 11.5 °Bx وتوجيه الحبات الأقل مباشرة لمخرج العصير.'
            : 'Sorting recipe updated successfully. Minimum Brix threshold set to 11.5 °Bx. Diverting lower sugar fruit to juice outlet.'
        );
      } else if (commandType === 'alert') {
        setTranscript(isAr ? '"هل توجد تنبيهات عاجلة في صالة الفرز؟"' : '"Are there any urgent packhouse alerts?"');
        setAiResponse(
          isAr
            ? 'تنبيه صوتي: انخفاض طفيف في ضغط الهواء بمجمع الصمامات رقم 3 (5.8 بار). تم إرسال تنبيه عاجل لفني الصيانة.'
            : 'Voice Alert: Minor pneumatic pressure drop detected on valve bank 3 (5.8 bar). Technician dispatched.'
        );
      }
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'التحكم الصوتي الذكي وتطبيق الهاتف المحمول' : 'Voice AI Assistant & Mobile PWA Telemetry'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'دعم كامل للغة العربية، الأوامر الصوتية، والتنبيهات الفورية' : 'Full Arabic Voice Commands, AI Alerts & Mobile Control'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'نعم، النظام يدعم بالكامل اللغة العربية الفصحى، ويسمح بالتحكم الكامل عبر الأوامر الصوتية، وإرسال التنبيهات الذكية لساعات وزرات الفنيين، وتطبيق ويب متوافق مع الهواتف الذكية (iOS & Android).'
            : 'Yes, the system fully supports Arabic language voice control, automated voice alerts, predictive diagnostics, and responsive mobile control for packhouse managers.'}
        </p>
      </div>

      {/* Grid: Voice AI Simulator on Left, Mobile PWA Simulator on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Voice Assistant & NLP Command Center */}
        <div className="lg:col-span-6 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Mic className={`w-5 h-5 ${isListening ? 'text-rose-400 animate-bounce' : 'text-emerald-400'}`} />
              <span className="font-bold text-sm">
                {isAr ? 'المساعد الصوتي الذكي (Voice AI OS)' : 'Falcon Eye Voice AI Assistant'}
              </span>
            </div>
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 flex items-center gap-1"
            >
              {voiceEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
              <span>{voiceEnabled ? (isAr ? 'التنبيهات الصوتية: مفعلة' : 'Voice: On') : (isAr ? 'صامت' : 'Muted')}</span>
            </button>
          </div>

          {/* Transcript & Response Display Box */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                {isAr ? 'الأمر الصوتي المُستقبل (Speech-to-Text)' : 'Detected Voice Input'}
              </div>
              <div className="text-sm font-medium text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-800/80 font-mono">
                {transcript}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                {isAr ? 'رد المساعد الذكي وتنفيذ الإجراء (AI Agent Action)' : 'AI Agent Response & Execution'}
              </div>
              <div className="text-sm text-slate-200 bg-slate-900 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                {aiResponse}
              </div>
            </div>
          </div>

          {/* Quick Voice Command Buttons */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400">
              {isAr ? 'جرب الضغط على أحد الاقتراحات الصوتية:' : 'Test Simulated Voice Commands:'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => handleSimulateVoiceCommand('throughput')}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-start transition-colors border border-slate-700"
              >
                {isAr ? '🗣️ "ما هي إنتاجية الخط؟"' : '🗣️ "Line throughput?"'}
              </button>
              <button
                onClick={() => handleSimulateVoiceCommand('brix')}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-start transition-colors border border-slate-700"
              >
                {isAr ? '🗣️ "تعديل بريكس التصدير"' : '🗣️ "Set min Brix 11.5"'}
              </button>
              <button
                onClick={() => handleSimulateVoiceCommand('alert')}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-start transition-colors border border-slate-700"
              >
                {isAr ? '🗣️ "هل توجد تنبيهات عاجلة؟"' : '🗣️ "Urgent alerts?"'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Mobile Phone PWA Simulator Container */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm bg-slate-950 rounded-[40px] p-4 border-4 border-slate-800 shadow-2xl space-y-4">
            {/* Phone Notch & Header */}
            <div className="flex items-center justify-between px-4 pt-2 text-xs text-slate-400 border-b border-slate-800 pb-3">
              <span className="font-mono text-[10px]">16:55 · MAF Mobile OS</span>
              <div className="w-20 h-3 bg-slate-800 rounded-full" />
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            </div>

            {/* Mobile App Navigation */}
            <div className="flex items-center justify-around text-xs bg-slate-900 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setSimulatedMobileView('dashboard')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  simulatedMobileView === 'dashboard' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                {isAr ? 'الرئيسية' : 'Dashboard'}
              </button>
              <button
                onClick={() => setSimulatedMobileView('alerts')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  simulatedMobileView === 'alerts' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                {isAr ? 'التنبيهات' : 'Alerts'}
              </button>
              <button
                onClick={() => setSimulatedMobileView('recipe')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  simulatedMobileView === 'recipe' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                {isAr ? 'الوصفة' : 'Recipe'}
              </button>
            </div>

            {/* Mobile App Screen Content */}
            <div className="bg-slate-900 rounded-2xl p-4 text-white min-h-[320px] space-y-4 border border-slate-800">
              {simulatedMobileView === 'dashboard' && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-emerald-400 uppercase">
                    {isAr ? 'مراقبة المحطة من الموبايل' : 'Live Mobile Telemetry'}
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-[11px] text-slate-400">{isAr ? 'الإنتاجية الحالية' : 'Current Rate'}</div>
                    <div className="text-2xl font-bold font-mono text-white">14.2 <span className="text-xs font-normal text-slate-400">T/h</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <div className="text-slate-400 text-[10px]">{isAr ? 'التصدير' : 'Pack-out'}</div>
                      <div className="font-bold text-emerald-400 font-mono text-base">84.5%</div>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <div className="text-slate-400 text-[10px]">{isAr ? 'ضغط الهواء' : 'Air Pressure'}</div>
                      <div className="font-bold text-teal-400 font-mono text-base">6.2 bar</div>
                    </div>
                  </div>
                </div>
              )}

              {simulatedMobileView === 'alerts' && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-amber-400 uppercase">
                    {isAr ? 'سجل التنبيهات الفورية (Push Alerts)' : 'Push Alarm Notifications'}
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/40 text-amber-200">
                      <div className="font-bold">ALM-212 · {isAr ? 'ضغط الهواء منخفض' : 'Low Air Pressure'}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">16:42 · {isAr ? 'تم إرسال إشعار لصيانة الكاميرات' : 'Technician notified'}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-200">
                      <div className="font-bold">{isAr ? 'اكتملت شحنة البالتة #902' : 'Batch #902 Export Ready'}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">16:15 · {isAr ? 'جاهزة للشحن البحري' : 'Loading dock 3'}</div>
                    </div>
                  </div>
                </div>
              )}

              {simulatedMobileView === 'recipe' && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-emerald-400 uppercase">
                    {isAr ? 'تعديل وصفة الفرز لاسلكياً' : 'Wireless Recipe Control'}
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                      <span>{isAr ? 'حد السكر الأدنى' : 'Min Brix'}</span>
                      <span className="font-mono font-bold text-amber-400">11.5 °Bx</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                      <span>{isAr ? 'حساسية العيوب' : 'Defect Tolerance'}</span>
                      <span className="font-mono font-bold text-emerald-400">Strict (3%)</span>
                    </div>
                    <button
                      onClick={() => alert(isAr ? 'تم مزامنة الوصفة لاسلكياً مع لوحات PLC الخط بنجاح!' : 'Recipe synced wirelessly with line PLCs!')}
                      className="w-full py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs"
                    >
                      {isAr ? 'إرسال التحديث للخط فوراً' : 'Sync Recipe to Line'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Phone Home Bar */}
            <div className="w-32 h-1 bg-slate-800 rounded-full mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};
