import React from 'react';
import { Settings, Clock, Gauge, Globe } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalSettingsContext';

interface GlobalDashboardSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const GlobalDashboardSettingsModal: React.FC<GlobalDashboardSettingsModalProps> = ({ isOpen, onClose, lang }) => {
  const { settings, setSettings } = useGlobalContext();
  const isAr = lang === 'ar';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">{isAr ? 'إعدادات لوحة التحكم العامة' : 'Global Dashboard Settings'}</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold">{isAr ? 'معدل التحديث (ms)' : 'Refresh Rate (ms)'}</label>
            <input type="number" value={settings.refreshRate} onChange={(e) => setSettings({...settings, refreshRate: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold">{isAr ? 'وحدات القياس' : 'Measurement Units'}</label>
            <select value={settings.units} onChange={(e) => setSettings({...settings, units: e.target.value as any})} className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50">
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </select>
          </div>
        </div>
        <button onClick={onClose} className="w-full py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm">{isAr ? 'حفظ وإغلاق' : 'Save & Close'}</button>
      </div>
    </div>
  );
};
