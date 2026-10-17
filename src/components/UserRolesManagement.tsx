import React, { useState } from 'react';
import { Users, Shield, UserPlus, Check, KeyRound, Mail, MessageSquare } from 'lucide-react';

interface UserRolesManagementProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const UserRolesManagement: React.FC<UserRolesManagementProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [users, setUsers] = useState([
    { id: 1, name: 'م. أحمد الشيمي', email: 'ahmed@falcon-erp.com', role: 'مدير عام النظام (Super Admin)', phone: '+20 100 123 4567', active: true },
    { id: 2, name: 'محمود عبد الرازق', email: 'mahmoud@falcon-erp.com', role: 'مدير الحسابات والخزينة (Chief Accountant)', phone: '+20 109 876 5432', active: true },
    { id: 3, name: 'سارة إبراهيم', email: 'sara@falcon-erp.com', role: 'مشرفة الجودة والفرز (QA Supervisor)', phone: '+20 111 222 3344', active: true },
    { id: 4, name: 'كابتن خالد ممدوح', email: 'khaled@falcon-erp.com', role: 'مشرف خط الإنتاج والتعبئة (Line Supervisor)', phone: '+20 122 555 6677', active: true },
  ]);

  const [notificationsEnabled, setNotificationsEnabled] = useState({
    email: true,
    whatsapp: true,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'إدارة المستخدمين، الصلاحيات، الحضور، والمراسلات' : 'User Roles, Permissions, Attendance & Messaging'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'صلاحيات المستخدمين والأدوار المتقدمة (RBAC)' : 'Advanced User Roles & System Permissions'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'إدارة حسابات الموظفين، تحديد صلاحيات كل قسم (مالية، مخازن، جودة، إنتاج)، مع نظام مراسلات داخلية وتنبيهات عبر الواتساب والإيميل.'
            : 'Granular role-based access control (RBAC), employee attendance tracking, and internal messaging via Email & WhatsApp.'}
        </p>
      </div>

      {/* Messaging & Integration Toggles */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {isAr ? 'قنوات المراسلة والتنبيهات التلقائية' : 'Automated Messaging Channels'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr ? 'إرسال تقارير الورديات وفواتير المبيعات عبر الواتساب والبريد الداخلي فوراً.' : 'Dispatch shift reports & sales invoices via WhatsApp and internal email.'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={notificationsEnabled.email}
              onChange={() => setNotificationsEnabled({...notificationsEnabled, email: !notificationsEnabled.email})}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <Mail className="w-4 h-4 text-slate-600" />
            <span>{isAr ? 'الإيميل الداخلي' : 'Internal Email'}</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={notificationsEnabled.whatsapp}
              onChange={() => setNotificationsEnabled({...notificationsEnabled, whatsapp: !notificationsEnabled.whatsapp})}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>{isAr ? 'تنبيهات واتساب' : 'WhatsApp Alerts'}</span>
          </label>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900">{isAr ? 'قائمة مستخدمي النظام والصلاحيات' : 'System Users & Roles Directory'}</h3>
          </div>
          <button
            onClick={() => alert(isAr ? 'إضافة مستخدم جديد نافذة منبثقة.' : 'Add new user modal triggered.')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>{isAr ? 'إضافة مستخدم جديد' : 'Add New User'}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">{isAr ? 'اسم الموظف' : 'Employee Name'}</th>
                <th className="py-3.5 px-6">{isAr ? 'البريد الإلكتروني' : 'Email'}</th>
                <th className="py-3.5 px-6">{isAr ? 'الدور الوظيفي وصلاحيات النظام' : 'Role & Permissions'}</th>
                <th className="py-3.5 px-6">{isAr ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'}</th>
                <th className="py-3.5 px-6 text-center">{isAr ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">{u.name}</td>
                  <td className="py-4 px-6 font-mono text-slate-500">{u.email}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono">{u.phone}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                      <Check className="w-3 h-3" /> {isAr ? 'نشط' : 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
