import React, { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalSettingsContext';

export const PLCAlertSystem: React.FC = () => {
  const { plcData } = useGlobalContext();
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    // Thresholds: Temp > 6.0, Pressure > 3.0
    if (plcData.line1Temp > 6.0) {
      setAlert('CRITICAL: High Temperature Detected!');
    } else if (plcData.line1Pressure > 3.0) {
      setAlert('WARNING: High Pressure Overload!');
    } else {
      setAlert(null);
    }
  }, [plcData]);

  if (!alert) return null;

  return (
    <div className="fixed top-20 right-6 z-50 bg-rose-600 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
      <AlertTriangle className="w-6 h-6" />
      <span className="font-bold text-sm">{alert}</span>
      <button onClick={() => setAlert(null)}><X className="w-4 h-4" /></button>
    </div>
  );
};
