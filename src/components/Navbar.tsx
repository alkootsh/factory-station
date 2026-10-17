import React from 'react';
import { Play, Globe, Cpu } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: 'ar' | 'en' | 'es' | 'fr' | 'es' | 'fr';
  setLang: (lang: 'ar' | 'en' | 'es' | 'fr' | 'es' | 'fr') => void;
  onQuickSimulate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  onQuickSimulate,
}) => {
  const isAr = lang === 'ar';
  const isEs = lang === 'es';
  const isFr = lang === 'fr';

  const getLabel = (link: { en: string; ar: string; es?: string; fr?: string }) => {
    if (isAr) return link.ar;
    if (isEs && link.es) return link.es;
    if (isFr && link.fr) return link.fr;
    return link.en;
  };

  const navLinks = [
    { id: 'overview', en: 'Overview', ar: 'التعريف والأنظمة', es: 'Resumen', fr: 'Aperçu' },
    { id: 'production-dashboard', en: '📊 Production Dashboard', ar: '📊 لوحة أداء الإنتاج', es: '📊 Panel de Producción', fr: '📊 Tableau de Bord' },
    { id: 'doc-workflow', en: '📋 Documentary Workflow', ar: '📋 دورة العمل المستندية وتتبعها', es: '📋 Flujo Documental', fr: '📋 Flux Documentaire' },
    { id: 'asset-mgmt', en: '🏢 Asset Management & Depreciation', ar: '🏢 إدارة الأصول الثابتة والإهلاكات', es: '🏢 Gestión de Activos', fr: '🏢 Gestion des Actifs' },
    { id: 'workflow-admin', en: '⚙️ Workflow & Admin Structure', ar: '⚙️ الهيكل الإداري وتتبع دورة العمل', es: '⚙️ Estructura y Flujo', fr: '⚙️ Structure & Flux' },
    { id: 'ai-reports', en: '✨ AI Custom Reports', ar: '✨ تقارير الذكاء الاصطناعي المخصصة', es: '✨ Informes de IA', fr: '✨ Rapports IA' },
    { id: 'export-mgmt', en: '🚢 Export Companies & Shipping', ar: '🚢 إدارة شركات التصدير والشحن', es: '🚢 Gestión de Exportación', fr: '🚢 Gestion des Exportations' },
    { id: 'stakeholders-crm', en: '🤝 Customers, Suppliers & Importers', ar: '🤝 العملاء، الموردين، المصدرين والمستوردين', es: '🤝 Clientes y Proveedores', fr: '🤝 Clients et Fournisseurs' },
    { id: 'financial-mgmt', en: '💰 Financials & Payroll', ar: '💰 المالية، المصروفات والمرتبات', es: '💰 Finanzas y Nómina', fr: '💰 Finances & Paie' },
    { id: 'internal-mail', en: '📧 Local Mail & Server', ar: '📧 سيرفر البريد والرسائل الداخلية', es: '📧 Servidor de Correo', fr: '📧 Messagerie Locale' },
    { id: 'reports-pdf', en: '📄 Certified PDF Reports', ar: '📄 التقارير وملخصات PDF', es: '📄 Informes PDF', fr: '📄 Rapports PDF' },
    { id: 'realtime-plc', en: '⚡ Live PLC Stream', ar: '⚡ بث حساسات PLC المباشر', es: '⚡ Flujo PLC en Vivo', fr: '⚡ Flux PLC en Direct' },
    { id: 'ai-assistant', en: '🤖 AI Copilot', ar: '🤖 المساعد الذكي وشرح البرنامج', es: '🤖 Copiloto IA', fr: '🤖 Copilote IA' },
    { id: 'cold-storage', en: '❄️ Cold Storage & USDA', ar: '❄️ قسم الثلاجات والمعاملة الباردة', es: '❄️ Almacén Frío', fr: '❄️ Chambre Froide' },
    { id: 'packhouse-erp', en: '🏢 Packhouse ERP', ar: '🏢 سيستم ERP لإدارة المحطات', es: '🏢 ERP de Planta', fr: '🏢 ERP de Station' },
    { id: 'user-roles', en: '👥 Users & Roles (RBAC)', ar: '👥 المستخدمين والصلاحيات والأدوار', es: '👥 Usuarios y Roles', fr: '👥 Utilisateurs & Rôles' },
    { id: 'commercial-security', en: '🛡️ License & Anti-Piracy', ar: '🛡️ تأمين النظام والترخيص التجاري', es: '🛡️ Licencia y Seguridad', fr: '🛡️ Licence et Sécurité' },
    { id: 'market-benchmark', en: '📊 Market & Competitors', ar: '📊 دراسة السوق ومقارنة المنافسين', es: '📊 Análisis de Mercado', fr: '📊 Étude de Marché' },
    { id: 'universal-lines', en: '🏭 Universal Lines', ar: '🏭 مهيئ كافة خطوط الإنتاج', es: '🏭 Líneas Universales', fr: '🏭 Lignes Universelles' },
    { id: 'line-machinery', en: '⚙️ Line Machinery BOM', ar: '⚙️ معدات وآلات كل خط', es: '⚙️ Maquinaria de Línea', fr: '⚙️ Machines de Ligne' },
    { id: 'pesticide-analyzer', en: '🧪 Pesticide Residues MRL', ar: '🧪 قياس متبقيات المبيدات', es: '🧪 Residuos de Plaguicidas', fr: '🧪 Résidus de Pesticides' },
    { id: 'predictive-maintenance', en: '🔮 Predictive Maintenance', ar: '🔮 التنبؤ بالأعطال وطرق إصلاحها', es: '🔮 Mantenimiento Predictivo', fr: '🔮 Maintenance Prédictive' },
    { id: 'python-desktop', en: 'Python Desktop App', ar: 'برنامج بايثون المستقل (Desktop App)', es: 'App de Escritorio', fr: 'App Bureau' },
    { id: 'online-sim', en: 'Live Program Run', ar: 'تشغيل البرنامج حياً أمامك', es: 'Ejecución en Vivo', fr: 'Exécution en Direct' },
    { id: 'download-source', en: 'Download Source', ar: 'تحميل الكود المصدر الفعلي', es: 'Descargar Código', fr: 'Télécharger le Code' },
    { id: 'live-console', en: 'Live Console', ar: 'لوحة التشغيل الحية', es: 'Consola en Vivo', fr: 'Console en Direct' },
    { id: 'turnkey-delivery', en: 'Turnkey Delivery', ar: 'تسليم السوفت وير النهائي', es: 'Entrega Llave en Mano', fr: 'Livraison Clé en Main' },
    { id: 'citrus-sort-v3', en: 'CitrusSort v0.3 Hub', ar: 'محاكي CitrusSort v0.3', es: 'Hub CitrusSort v0.3', fr: 'Hub CitrusSort v0.3' },
    { id: 'simulator', en: 'Line Simulator', ar: 'محاكي الخط الحي', es: 'Simulador de Línea', fr: 'Simulateur de Ligne' },
    { id: 'vision-lab', en: 'Vision & NIR Lab', ar: 'مختبر الرؤية وNIR', es: 'Laboratorio de Visión', fr: 'Laboratoire de Vision' },
    { id: 'machinery', en: 'Machinery & Robotics', ar: 'الماكينات والروبوت', es: 'Maquinaria y Robótica', fr: 'Machines & Robotique' },
    { id: 'upgrade', en: 'Next-Gen Upgrade', ar: 'ترقية وتطوير الخط', es: 'Actualización', fr: 'Mise à Niveau' },
    { id: 'falcon-eye', en: 'Falcon Eye AI', ar: 'مشروع عين الصقر (Falcon Eye)', es: 'Falcon Eye IA', fr: 'Falcon Eye IA' },
    { id: 'software-hub', en: 'Software Execution Hub', ar: 'أكواد السوفت وير والتشغيل', es: 'Hub de Software', fr: 'Hub Logiciel' },
    { id: 'ip-camera', en: 'IP Camera Setup', ar: 'إعداد كاميرا الـ IP', es: 'Cámara IP', fr: 'Caméra IP' },
    { id: 'custom-software', en: 'Custom Software', ar: 'تصميم السوفت وير ذاتياً', es: 'Software Personalizado', fr: 'Logiciel Personnalisé' },
    { id: 'feasibility', en: 'Feasibility Study', ar: 'دراسة الجدوى الشاملة', es: 'Estudio de Viabilidad', fr: 'Étude de Faisabilité' },
    { id: 'prototype-bom', en: 'Prototype BOM (Egypt)', ar: 'قائمة مشتريات النموذج (مصر)', es: 'BOM de Prototipo', fr: 'BOM Prototype' },
    { id: 'ease', en: 'Ease of Upgrade', ar: 'هل الترقية معقدة؟', es: 'Facilidad de Actualización', fr: 'Facilité de Mise à Niveau' },
    { id: 'voice-mobile', en: 'Voice & Mobile AI', ar: 'التحكم الصوتي والموبايل', es: 'Voz y Móvil IA', fr: 'Voix & Mobile IA' },
    { id: 'calculator', en: 'Capacity Calculator', ar: 'حاسبة الإنتاجية', es: 'Calculadora de Capacidad', fr: 'Calculateur de Capacité' },
    { id: 'maintenance', en: 'Diagnostics & Alarms', ar: 'الصيانة والأعطال', es: 'Diagnóstico y Alarma', fr: 'Diagnostic & Alarmes' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Commercial Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm shadow-inner">
            <Cpu className="w-5 h-5" />
          </div>
          <button
            onClick={() => setActiveTab('python-desktop')}
            className="text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 text-start"
            title={isAr ? 'منظومة عين الصقر - انقر لتشغيل البرنامج وتعديل الهوية' : 'Falcon Eye OS - Click to run desktop app'}
          >
            <span>FALCON EYE</span>{' '}
            <span className="font-light text-emerald-400">Agrobotic OS</span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`hover:text-white transition-colors pb-0.5 whitespace-nowrap shrink-0 ${
                activeTab === link.id
                  ? 'text-white border-b-2 border-emerald-400 font-semibold'
                  : 'text-slate-300 hover:text-slate-100'
              }`}
            >
              {getLabel(link)}
            </button>
          ))}
        </nav>

        {/* Zone 3: Language Toggle & Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              if (lang === 'ar') setLang('en');
              else if (lang === 'en') setLang('es');
              else if (lang === 'es') setLang('fr');
              else setLang('ar');
            }}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded border border-slate-700 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            title="تبديل اللغة / Switch Language / Cambiar Idioma / Changer de Langue"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="uppercase">{lang}</span>
          </button>

          <button
            onClick={onQuickSimulate}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isAr ? 'تشغيل المحاكي' : isEs ? 'Simulación' : isFr ? 'Simulation' : 'Live Line Demo'}</span>
          </button>
        </div>
      </div>

      {/* Mobile nav strip for smaller viewports */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 bg-slate-950 border-t border-slate-800 text-xs gap-4 no-scrollbar">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className={`whitespace-nowrap px-2 py-1 rounded ${
              activeTab === link.id
                ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {getLabel(link)}
          </button>
        ))}
      </div>
    </header>
  );
};
