import React, { useState } from 'react';
import { Layers, GitCommit, Bell, Users, Shield, CheckCircle2, AlertTriangle, ArrowRight, Server } from 'lucide-react';

interface WorkflowTrackingAndAdminModuleProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const WorkflowTrackingAndAdminModule: React.FC<WorkflowTrackingAndAdminModuleProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'workflow' | 'admin_structure' | 'notifications'>('workflow');

  const isAr = lang === 'ar';

  const workflowSteps = [
    { step: 1, title: 'استلام المحصول وبساتين التوريد', desc: 'تسجيل أوزان البينز، فحص نسبة السكر Brix، وفحص الحبة الأولي.', status: 'completed' },
    { step: 2, title: 'الفرز والتحجيم البصري (GlobalScan)', desc: 'فحص العيوب اللونية والأبعاد عبر الكاميرات الطيفية NIR.', status: 'completed' },
    { step: 3, title: 'الغسيل، التعقيم ومعاملة الشمع', desc: 'إزالة الأتربة، التطهير بمبيدات فطرية آمنة، وتغطية الشمع.', status: 'in_progress' },
    { step: 4, title: 'التعبئة والتخزين المبرد (Cold Storage)', desc: 'رص الكراتين بمنصات SSCC وتخزينها بغرف التبريد بدرجة حرارة 4°C.', status: 'pending' },
    { step: 5, title: 'الشحن الدولي وإصدار المستندات الجمركية', desc: 'إصدار شهادات الحجر الزراعي والفواتير وشحنها لموانئ الاستيراد.', status: 'pending' },
  ];

  const notifications = [
    { id: 'NOTIF-01', title: 'تنبيه صيانة دورية', desc: 'متبقي 3 أيام على موعد تغيير لمبات هالوجين الكاميرات الطيفية.', time: 'منذ ساعة', type: 'warning' },
    { id: 'NOTIF-02', title: 'تأكيد إيداع مالي', desc: 'تم إيداع مبلغ 1,250,000 EGP من شركة البركات بنجاح.', time: 'منذ ساعتين', type: 'success' },
    { id: 'NOTIF-03', title: 'اكتمال تشغيلة تبريد', desc: 'غرفة التبريد رقم 3 وصلت لدرجة الحرارة المثالية 4.1°C.', time: 'منذ 4 ساعات', type: 'info' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Administrative Structure, Workflow & Smart Alerts
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            {isAr ? 'الهيكل الإداري، تتبع دورة العمل ونظام التنبيهات الذكي' : 'Admin Structure, Workflow Tracking & Smart Alerts'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            {isAr ? 'متابعة دورة العمل الكاملة من الاستلام للتصدير، هيكل الإدارات والصلاحيات، ونظام التنبيهات الفورية الفعالة.' : 'Track the full operational workflow from intake to export, administrative hierarchies, and real-time alerts.'}
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('workflow')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'workflow' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          <GitCommit className="w-4 h-4 text-teal-400" />
          <span>{isAr ? 'تتبع دورة العمل بالمحطة (Workflow)' : 'Operational Workflow Tracking'}</span>
        </button>
        <button
          onClick={() => setActiveTab('admin_structure')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'admin_structure' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          <Users className="w-4 h-4 text-emerald-400" />
          <span>{isAr ? 'الهيكل الإداري والصلاحيات (Admin Hierarchy)' : 'Administrative Structure'}</span>
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'notifications' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          <Bell className="w-4 h-4 text-amber-400" />
          <span>{isAr ? 'نظام التنبيهات والإشعارات الذكية' : 'Smart Notifications Center'}</span>
        </button>
      </div>

      {/* Tab: Workflow */}
      {activeTab === 'workflow' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-6">
          <h3 className="text-base font-bold text-slate-900">{isAr ? 'مراحل تتبع دورة العمل داخل محطة الفرز والتعبئة' : 'Packhouse Operational Workflow Steps'}</h3>
          <div className="space-y-4">
            {workflowSteps.map((s) => (
              <div key={s.step} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${s.status === 'completed' ? 'bg-emerald-500 text-white' : s.status === 'in_progress' ? 'bg-amber-500 text-white animate-pulse' : 'bg-slate-200 text-slate-600'}`}>
                    {s.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{s.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                  </div>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${s.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : s.status === 'in_progress' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'}`}>
                    {s.status === 'completed' ? (isAr ? 'مكتمل' : 'Completed') : s.status === 'in_progress' ? (isAr ? 'قيد التنفيذ الآن' : 'In Progress') : (isAr ? 'في الانتظار' : 'Pending')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Admin Structure */}
      {activeTab === 'admin_structure' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-6">
          <h3 className="text-base font-bold text-slate-900">{isAr ? 'الهيكل التنظيمي والإداري لمحطة التعبئة والتصدير' : 'Packhouse Organizational Hierarchy'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
              <span className="text-xs font-mono text-emerald-400 font-bold">EXECUTIVE LEVEL</span>
              <h4 className="font-black text-base mt-1">{isAr ? 'إدارة مجلس الإدارة والمدير العام' : 'Executive Director'}</h4>
              <p className="text-xs text-slate-300 mt-2">الصلاحيات الكاملة لاعتماد الموازنات، عقود التصدير، وإدارة السيولة.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
              <span className="text-xs font-mono text-teal-400 font-bold">OPERATIONS LEVEL</span>
              <h4 className="font-black text-base mt-1">{isAr ? 'إدارة محطة الفرز والصيانة والإنتاج' : 'Packhouse Operations Manager'}</h4>
              <p className="text-xs text-slate-300 mt-2">متابعة خطوط الفرز، جداول التشغيل، الصيانة الدورية وحساسات الـ PLC.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
              <span className="text-xs font-mono text-blue-400 font-bold">FINANCE & QA LEVEL</span>
              <h4 className="font-black text-base mt-1">{isAr ? 'الإدارة المالية وضمان الجودة USDA' : 'Finance & QA Management'}</h4>
              <p className="text-xs text-slate-300 mt-2">إدارة الخزينة، المصروفات، المرتبات، ومطابقة معايير الحجر الزراعي والتصدير.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900">{isAr ? 'مركز التنبيهات والإشعارات الفورية' : 'Real-Time Smart Notifications Center'}</h3>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.type === 'warning' ? 'bg-amber-100 text-amber-700' : n.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{n.desc}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-mono shrink-0">{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
