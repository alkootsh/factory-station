import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { TrendingUp, Activity, AlertTriangle } from 'lucide-react';

interface ProductionPerformanceDashboardProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const ProductionPerformanceDashboard: React.FC<ProductionPerformanceDashboardProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [viewMode, setViewMode] = useState<'aggregated' | 'detailed'>('aggregated');
  
  const lineData = [
    { line: 'Line 1', crop: 'Valencia Oranges', throughput: 25, efficiency: 94, rejection: 1.5 },
    { line: 'Line 1', crop: 'Pomegranate', throughput: 20, efficiency: 90, rejection: 2.5 },
    { line: 'Line 2', crop: 'Grand Nain Banana', throughput: 38, efficiency: 88, rejection: 3.5 },
    { line: 'Line 3', crop: 'Egyptian Mango', throughput: 22, efficiency: 95, rejection: 1.2 },
  ];

  const aggregatedData = [
    { crop: 'Valencia Oranges', throughput: 45, efficiency: 92, rejection: 2.1 },
    { crop: 'Grand Nain Banana', throughput: 38, efficiency: 88, rejection: 3.5 },
    { crop: 'Egyptian Mango', throughput: 22, efficiency: 95, rejection: 1.2 },
    { crop: 'Pomegranate', throughput: 15, efficiency: 85, rejection: 4.8 },
  ];

  const data = viewMode === 'aggregated' ? aggregatedData : lineData;

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto py-4">
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/60">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black">{isAr ? 'لوحة أداء الإنتاج اللحظية' : 'Real-time Production Performance Dashboard'}</h1>
            <p className="text-xs text-slate-300 mt-1">{isAr ? 'مراقبة الكفاءة، الإنتاجية، ونسب الفرز حسب نوع المحصول أو خط الإنتاج' : 'Monitor throughput, efficiency, and rejection rates by crop variety or production line'}</p>
          </div>
          <div className="bg-slate-800 p-1 rounded-lg flex gap-1">
            <button onClick={() => setViewMode('aggregated')} className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${viewMode === 'aggregated' ? 'bg-emerald-600 text-white' : 'hover:text-white'}`}>{isAr ? 'إجمالي' : 'Aggregated'}</button>
            <button onClick={() => setViewMode('detailed')} className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${viewMode === 'detailed' ? 'bg-emerald-600 text-white' : 'hover:text-white'}`}>{isAr ? 'تفصيلي (خطوط)' : 'Detailed (Lines)'}</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-600" /> {isAr ? 'الإنتاجية (Throughput) بالأطنان' : 'Throughput (Tons)'}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={viewMode === 'aggregated' ? 'crop' : 'line'} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="throughput" fill="#10b981" name={isAr ? 'الإنتاجية' : 'Throughput'} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-blue-600" /> {isAr ? 'نسبة الكفاءة (%)' : 'Efficiency Rate (%)'}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={viewMode === 'aggregated' ? 'crop' : 'line'} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="efficiency" fill="#3b82f6" stroke="#2563eb" name={isAr ? 'الكفاءة' : 'Efficiency'} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
