import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, Cpu, Server, CheckCircle2, AlertOctagon } from 'lucide-react';

interface CommercialSecurityLicensingProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const CommercialSecurityLicensing: React.FC<CommercialSecurityLicensingProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [licenseKey, setLicenseKey] = useState('FALCON-ERP-2026-X98Q-PROD-VALID');
  const [hardwareId, setHardwareId] = useState('HW-CPU-8F92-MACB-9912');
  const [activated, setActivated] = useState(true);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'حماية النظام، ترخيص التجارة، ومنع النسخ غير القانوني' : 'System Security, Licensing & Anti-Piracy'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'الأمن التجاري وحماية الملكية الفكرية' : 'Commercial Security & Hardware Binding'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'منظومة حماية متقدمة تربط ترخيص النظام ببصمة العتاد (Hardware Fingerprint) وخوادم التشفير المركزية لمنع أي نسخ أو استخدام غير قانوني.'
            : 'Advanced hardware-locked licensing and anti-piracy encryption safeguarding your proprietary industrial ERP deployment.'}
        </p>
      </div>

      {/* Security Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">{isAr ? 'حالة الترخيص التجاري' : 'Commercial License'}</div>
            <div className="text-xl font-bold text-emerald-600 mt-1">{isAr ? 'مرخص رسمياً (Enterprise)' : 'Active (Enterprise)'}</div>
            <div className="text-[11px] text-slate-400 mt-1">{isAr ? 'صالح حتى أكتوبر 2030' : 'Valid until Oct 2030'}</div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">{isAr ? 'بصمة السيرفر المركزي' : 'Central Server Binding'}</div>
            <div className="text-xl font-bold text-slate-900 mt-1 font-mono text-xs truncate max-w-[160px]">SRV-CLOUD-01</div>
            <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {isAr ? 'متصل ومحمي' : 'Secure & Connected'}
            </div>
          </div>
          <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600">
            <Server className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">{isAr ? 'مقاومة الهندسة العكسية' : 'Anti-Tamper & Obfuscation'}</div>
            <div className="text-xl font-bold text-slate-900 mt-1">AES-256 + VM</div>
            <div className="text-[11px] text-slate-500 mt-1">{isAr ? 'مفعل بالكامل' : 'Fully Protected'}</div>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
            <Lock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">{isAr ? 'محاولات الاختراق المصدودة' : 'Blocked Breach Attempts'}</div>
            <div className="text-xl font-bold text-emerald-600 mt-1 font-mono">0 تهديد</div>
            <div className="text-[11px] text-slate-400 mt-1">{isAr ? 'النظام آمن تماماً' : 'System 100% Secure'}</div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <Key className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* License Activation & Hardware Fingerprint Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900">
            {isAr ? 'إدارة مفتاح الترخيص وبصمة الجهاز' : 'License Key & Hardware ID Management'}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'مفتاح الترخيص التجاري (Commercial License Key)' : 'Active Commercial License Key'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={() => alert(isAr ? 'تم التحقق من صحة الترخيص بنجاح عبر السيرفر المركزي!' : 'License successfully verified with central server!')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm"
                >
                  {isAr ? 'تحقق وتنشيط' : 'Verify & Activate'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'بصمة العتاد المربوطة (Hardware Fingerprint ID)' : 'Bound Hardware Fingerprint ID'}
              </label>
              <input
                type="text"
                readOnly
                value={hardwareId}
                className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl font-mono text-xs text-slate-600 cursor-not-allowed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                {isAr ? 'هذا المفتاح مرتبط حصرياً باللوحة الأم وسيرفر التحكم المركزي للعميل.' : 'Bound exclusively to the primary industrial server motherboard.'}
              </p>
            </div>
          </div>
        </div>

        {/* Central Server Architecture explanation */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Server className="w-4 h-4" />
            <span>{isAr ? 'هندسة السيرفر المركزي والتحكم' : 'Centralized Control Architecture'}</span>
          </div>

          <h3 className="text-xl font-bold">
            {isAr ? 'لماذا السيرفر المركزي هو الأفضل للمحطات الكبرى؟' : 'Why Centralized Server is Optimal for Packing Houses'}
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            {isAr
              ? 'يتم ربط جميع خطوط الفرز، الموازين، وكاميرات الرؤية بسيرفر تحكم مركزي واحد (Main Control Server)، مع توزيع الأجهزة الفرعية (Terminals/Clients) في غرف التعبئة ومحطات الإدارة. هذا يضمن مزامنة مالية ومحاسبية فورية وعدم فقدان أي بيانات إنتاجية.'
              : 'Unifying sizer lines, weighers, and cameras into a master control server ensures instant transactional consistency, zero data drift, and bulletproof security across all plant terminals.'}
          </p>

          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'نسخ احتياطي تلقائي مشفر لكل المعاملات' : 'Encrypted automated backups'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'تحديثات مركزية فورية لكافة الخطوط' : 'Instant central firmware updates'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
