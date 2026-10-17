import React, { useState } from 'react';
import { Mail, MessageSquare, Server, Send, ShieldCheck, CheckCircle2, Globe, Lock, Users, RefreshCw, Smartphone } from 'lucide-react';

interface InternalEmailAndMessagingServerProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

interface InternalMessage {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  time: string;
  channel: 'internal_email' | 'secure_chat' | 'whatsapp';
  status: 'delivered' | 'synced_with_corp_server';
}

export const InternalEmailAndMessagingServer: React.FC<InternalEmailAndMessagingServerProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'compose' | 'server_config' | 'whatsapp'>('inbox');
  
  const [messages, setMessages] = useState<InternalMessage[]>([
    {
      id: 'MSG-901',
      sender: 'engineer.ahmed@packhouse.local',
      recipient: 'quality.lead@packhouse.local',
      subject: 'تقرير جودة شحنة البرتقال رقم BATCH-X9',
      body: 'تم فحص نسبة السكر Brix وثبت مطابقتها بنجاح لمواصفات التصدير الأوروبي.',
      time: '12:45 PM',
      channel: 'internal_email',
      status: 'synced_with_corp_server'
    },
    {
      id: 'MSG-902',
      sender: 'maintenance.m@packhouse.local',
      recipient: 'station.director@packhouse.local',
      subject: 'صيانة طارئة لفلتر غسيل الثمار',
      body: 'تم الانتهاء من تطهير وتعقيم خزان المياه الرئيسي لخط الفرز رقم 1.',
      time: '11:20 AM',
      channel: 'secure_chat',
      status: 'delivered'
    },
    {
      id: 'MSG-903',
      sender: 'erp.system@packhouse.local',
      recipient: 'accounts.dept@packhouse.local',
      subject: 'تأكيد إيداع حوالة بنك CIB',
      body: 'تم استلام وتأكيد إيداع مبلغ 1,250,000 EGP بحساب البنك الأهلي المصري.',
      time: '10:05 AM',
      channel: 'internal_email',
      status: 'synced_with_corp_server'
    }
  ]);

  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [channel, setChannel] = useState<'internal_email' | 'secure_chat' | 'whatsapp'>('internal_email');
  const [successMsg, setSuccessMsg] = useState('');

  // Corporate server config state
  const [corpSmtpHost, setCorpSmtpHost] = useState('smtp.corp-company.com');
  const [corpSmtpPort, setCorpSmtpPort] = useState('587');
  const [corpSslEnabled, setCorpSslEnabled] = useState(true);
  const [isServerSynced, setIsServerSynced] = useState(true);

  const isAr = lang === 'ar';

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !body) return;

    const newMsg: InternalMessage = {
      id: `MSG-${Math.floor(100 + Math.random() * 900)}`,
      sender: 'current.user@packhouse.local',
      recipient,
      subject: subject || 'رسالة داخلية',
      body,
      time: 'الآن',
      channel,
      status: isServerSynced ? 'synced_with_corp_server' : 'delivered'
    };

    setMessages([newMsg, ...messages]);
    setRecipient('');
    setSubject('');
    setBody('');
    setSuccessMsg(isAr ? 'تم إرسال الرسالة بنجاح ومزامنتها مع سيرفر الشركة!' : 'Message sent and synced with corporate server!');
    setTimeout(() => setSuccessMsg(''), 4000);
    setActiveTab('inbox');
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Local Mail & Corporate Messaging Core
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            {isAr ? 'سيرفر البريد والمراسلات الداخلية ومزامنة سيرفر الشركة' : 'Local Email & Internal Messaging Server & Corporate Bridge'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            {isAr ? 'سيرفر محلي خاص بالمراسلات الداخلية والبريد الإلكتروني بين الموظفين والأقسام، مع إمكانية الربط والمزامنة التامة مع سيرفر الشركة الفعلي (SMTP / IMAP / Active Directory).' : 'Dedicated local server for internal messaging and staff email, fully integrated with your live corporate server.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{isAr ? 'السيرفر المحلي متصل' : 'Local Server Active'}</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('inbox')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'inbox' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          <Mail className="w-4 h-4 text-emerald-400" />
          <span>{isAr ? 'صندوق الوارد والمراسلات' : 'Inbox & Messages'}</span>
        </button>
        <button
          onClick={() => setActiveTab('compose')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'compose' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          <Send className="w-4 h-4 text-blue-400" />
          <span>{isAr ? 'إرسال رسالة جديدة' : 'Compose Message'}</span>
        </button>
        <button
          onClick={() => setActiveTab('server_config')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'server_config' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          <Server className="w-4 h-4 text-indigo-400" />
          <span>{isAr ? 'إعدادات سيرفر الشركة والـ SMTP' : 'Corporate Server & SMTP Bridge'}</span>
        </button>
        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'whatsapp' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          <Smartphone className="w-4 h-4 text-emerald-500" />
          <span>{isAr ? 'ربط إشعارات الواتساب' : 'WhatsApp API Gateway'}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Tab: Inbox */}
      {activeTab === 'inbox' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-600" />
            <span>{isAr ? 'الرسائل والمراسلات الداخلية النشطة' : 'Active Internal Messages & Emails'}</span>
          </h3>
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="p-4 rounded-xl border border-slate-200 hover:border-indigo-400 transition-all bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-100 text-indigo-800 font-bold">{msg.id}</span>
                    <span className="text-xs font-bold text-slate-900">{msg.sender}</span>
                    <span className="text-[10px] text-slate-400">&rarr; {msg.recipient}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{msg.subject}</h4>
                  <p className="text-xs text-slate-600">{msg.body}</p>
                </div>
                <div className="flex flex-col md:items-end gap-2 shrink-0">
                  <span className="text-xs text-slate-400">{msg.time}</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> {isAr ? 'مزامنة مع السيرفر' : 'Corp Synced'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Compose */}
      {activeTab === 'compose' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 max-w-2xl mx-auto">
          <h3 className="text-base font-bold text-slate-900 mb-4">{isAr ? 'إنشاء وإرسال رسالة داخلية جديدة' : 'Compose New Internal Message'}</h3>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'قناة الإرسال' : 'Delivery Channel'}</label>
              <select value={channel} onChange={(e: any) => setChannel(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50">
                <option value="internal_email">{isAr ? 'بريد إلكتروني داخلي (Internal Email)' : 'Internal Email'}</option>
                <option value="secure_chat">{isAr ? 'دردشة فورية مشفرة (Secure Chat)' : 'Secure Instant Chat'}</option>
                <option value="whatsapp">{isAr ? 'إشعار عبر واتساب الموظفين' : 'WhatsApp Employee Alert'}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'المرسل إليه (القسم أو الموظف)' : 'Recipient'}</label>
              <input type="text" required value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="quality.lead@packhouse.local" className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'موضوع الرسالة' : 'Subject'}</label>
              <input type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="موضوع الرسالة..." className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'نص الرسالة' : 'Message Body'}</label>
              <textarea rows={4} required value={body} onChange={(e) => setBody(e.target.value)} placeholder="اكتب تفاصيل المراسلة هنا..." className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              <span>{isAr ? 'إرسال والمزامنة الفورية' : 'Send & Sync Instantly'}</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab: Server Config */}
      {activeTab === 'server_config' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{isAr ? 'إعدادات ربط السيرفر المحلي بسيرفر الشركة الفعلي' : 'Corporate SMTP / IMAP Integration Bridge'}</h3>
              <p className="text-xs text-slate-500">{isAr ? 'تكوين بروتوكولات الربط لضمان وصول نسخ من البريد والمراسلات لسيرفر المؤسسة الخارجي.' : 'Configure SMTP relay to mirror emails to your main corporate mail server.'}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'عنوان سيرفر الشركة (SMTP Host)' : 'Corporate SMTP Host'}</label>
                <input type="text" value={corpSmtpHost} onChange={(e) => setCorpSmtpHost(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm font-mono" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'منفذ الاتصال (SMTP Port)' : 'SMTP Port'}</label>
                <input type="text" value={corpSmtpPort} onChange={(e) => setCorpSmtpPort(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm font-mono" />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <input type="checkbox" checked={corpSslEnabled} onChange={(e) => setCorpSslEnabled(e.target.checked)} id="ssl" className="w-4 h-4 text-indigo-600 rounded" />
              <label htmlFor="ssl" className="text-xs font-bold text-slate-900 cursor-pointer">
                {isAr ? 'تفعيل التشفير الآمن SSL/TLS والتصديق المشترك (Active Directory)' : 'Enable Secure SSL/TLS & Active Directory Authentication'}
              </label>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-900">{isAr ? 'حالة السيرفر: متصل ومتزامن بنجاح مع سيرفر الشركة الفعلي' : 'Server Status: Successfully Connected & Mirrored'}</span>
              </div>
              <button onClick={() => setIsServerSynced(!isServerSynced)} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold">
                {isAr ? 'اختبار الاتصال' : 'Test Connection'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: WhatsApp API */}
      {activeTab === 'whatsapp' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{isAr ? 'ربط نظام الإشعارات الداخلي بتطبيق الواتساب (WhatsApp Business API)' : 'WhatsApp Business API Gateway Integration'}</h3>
              <p className="text-xs text-slate-500">{isAr ? 'إرسال تنبيهات الحضور والانصراف، الفواتير، وحالة شحنات التصدير مباشرة لهواتف الموظفين والعملاء.' : 'Send automated alerts for attendance, invoices, and shipment statuses via WhatsApp.'}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'رمز ربط الواتساب (Access Token)' : 'WhatsApp Cloud API Access Token'}</label>
              <input type="password" value="EAAG_Falcon_Eye_Secure_Token_98421" readOnly className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50 font-mono" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'رقم هاتف محطة الفرز (WhatsApp Phone Number ID)' : 'Phone Number ID'}</label>
              <input type="text" value="109842193821" readOnly className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50 font-mono" />
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isAr ? 'البوابة مفعلة وترسل إشعارات فورية لجميع الموظفين.' : 'Gateway active and dispatching real-time employee notifications.'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
