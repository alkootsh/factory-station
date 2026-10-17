import React, { useState } from 'react';
import { Camera, QrCode, ScanLine, CheckCircle2 } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalSettingsContext';

interface BarcodeScannerModuleProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
  onLogBatch: (batchId: string) => void;
}

export const BarcodeScannerModule: React.FC<BarcodeScannerModuleProps> = ({ lang, onLogBatch }) => {
  const [scannedCode, setScannedCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const isAr = lang === 'ar';

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const mockCode = `BATCH-${Math.floor(Math.random() * 9000)}`;
      setScannedCode(mockCode);
      onLogBatch(mockCode);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
      <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
        <ScanLine className="w-5 h-5 text-indigo-600" />
        {isAr ? 'قارئ الباركود/QR اللحظي للمدخلات' : 'Barcode/QR Inventory Scanner'}
      </h3>
      <button
        onClick={simulateScan}
        className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2"
        disabled={isScanning}
      >
        <Camera className="w-5 h-5" />
        {isScanning ? (isAr ? 'جاري المسح...' : 'Scanning...') : (isAr ? 'بدء مسح دفعة جديدة' : 'Scan New Batch')}
      </button>
      {scannedCode && (
        <div className="mt-4 p-3 bg-emerald-50 rounded-lg text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {isAr ? 'تم تسجيل الدفعة بنجاح:' : 'Batch successfully logged:'} {scannedCode}
        </div>
      )}
    </div>
  );
};
