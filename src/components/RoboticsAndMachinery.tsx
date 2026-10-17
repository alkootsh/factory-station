import React, { useState } from 'react';
import { Layers, Eye, Zap, Cpu, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import { MAF_SYSTEMS, SystemInfo } from '../data/mafData';

interface RoboticsAndMachineryProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
  selectedSystemId?: string;
}

export const RoboticsAndMachinery: React.FC<RoboticsAndMachineryProps> = ({
  lang,
  selectedSystemId,
}) => {
  const isAr = lang === 'ar';
  const [activeSystemId, setActiveSystemId] = useState<string>(selectedSystemId || 'pomone');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredSystems = MAF_SYSTEMS.filter(
    (s) => filterCategory === 'all' || s.category === filterCategory
  );

  const activeSystem = MAF_SYSTEMS.find((s) => s.id === activeSystemId) || MAF_SYSTEMS[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'كتالوج الماكينات والروبوتات الصناعية' : 'Machinery & Agrobotic Catalog'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'الترسانة الهندسية لمنظومة فحص وتعبئة المحاصيل' : 'Falcon Eye Engineering Systems Specification'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'مواصفات تفصيلية لماكينات الفرز الأسطوانية، كبائن الرؤية البصرية، مطياف فحص السكر بالأشعة تحت الحمراء، وخلايا روبوت الدلتا.'
            : 'In-depth engineering specifications for electronic sizers, multispectral camera cabins, NIR spectrometers, and delta packaging robots.'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            filterCategory === 'all'
              ? 'bg-white text-slate-900 shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isAr ? 'جميع الأنظمة (الكل)' : 'All Systems'}
        </button>
        <button
          onClick={() => setFilterCategory('sizer')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            filterCategory === 'sizer'
              ? 'bg-white text-slate-900 shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isAr ? 'ماكينات الفرز (Sizers)' : 'Sizers'}
        </button>
        <button
          onClick={() => setFilterCategory('vision')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            filterCategory === 'vision'
              ? 'bg-white text-slate-900 shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isAr ? 'أنظمة الرؤية والـ NIR' : 'Vision & NIR'}
        </button>
        <button
          onClick={() => setFilterCategory('robotics')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            filterCategory === 'robotics'
              ? 'bg-white text-slate-900 shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isAr ? 'الروبوت والتعبئة' : 'Robotics & Packing'}
        </button>
        <button
          onClick={() => setFilterCategory('software')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            filterCategory === 'software'
              ? 'bg-white text-slate-900 shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isAr ? 'البرمجيات والسكادا' : 'SCADA Software'}
        </button>
      </div>

      {/* Two Column Layout: Machine List on Left, Deep Dive Specs on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Systems List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredSystems.map((sys) => {
            const isSelected = sys.id === activeSystemId;

            return (
              <div
                key={sys.id}
                onClick={() => setActiveSystemId(sys.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                    {isAr ? sys.categoryAr : sys.category.toUpperCase()}
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 ${
                      isSelected ? 'text-emerald-400' : 'text-slate-400'
                    } ${isAr ? 'rotate-180' : ''}`}
                  />
                </div>

                <div className="text-base font-bold mt-1">
                  {isAr ? sys.nameAr : sys.name}
                </div>

                <p
                  className={`text-xs mt-1 line-clamp-2 ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {isAr ? sys.taglineAr : sys.tagline}
                </p>
              </div>
            );
          })}
        </div>

        {/* Detailed System Specification Dossier */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          {/* Header */}
          <div className="border-b border-slate-100 pb-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <span>{isAr ? activeSystem.categoryAr : activeSystem.category.toUpperCase()}</span>
              <span aria-hidden="true">·</span>
              <span>Falcon Eye Industrial OS</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {isAr ? activeSystem.nameAr : activeSystem.name}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isAr ? activeSystem.descriptionAr : activeSystem.description}
            </p>
          </div>

          {/* Technical Specifications Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isAr ? 'المواصفات التقنية القياسية' : 'Technical Specifications'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {activeSystem.keySpecs.map((spec, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-500 font-medium">
                    {isAr ? spec.labelAr : spec.label}
                  </div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    {isAr ? spec.valueAr : spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Mechanical & AI Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isAr ? 'الميزات الهندسية وبراءات الاختراع' : 'Key Engineering Innovations'}
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              {activeSystem.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{isAr ? feat.ar : feat.en}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suitable Crops */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              {isAr ? 'المحاصيل المناسبة للتطبيق' : 'Suitable Fresh Produce'}
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {activeSystem.produceSuitable.map((crop, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md border border-slate-200"
                >
                  {crop}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
