import React, { useState } from 'react';
import { Terminal, CheckCircle2, Code, ArrowRight, Play, FileCode } from 'lucide-react';

interface CitrusSortHubProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const CitrusSortHub: React.FC<CitrusSortHubProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [activeFile, setActiveFile] = useState<'run.py' | 'routes.py' | 'crop_json' | 'bat'>('run.py');

  const fileContents = {
    'run.py': `from app import create_app

app = create_app()

if __name__ == '__main__':
    print("Starting CitrusSort v0.3 AI Sizing Simulator...")
    app.run(host='0.0.0.0', port=5000, debug=True)`,

    'routes.py': `from flask import Blueprint, render_template, request, jsonify
import json
import os

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return render_template('index.html')

@main_bp.route('/api/simulate', methods=['POST'])
def simulate_sort():
    data = request.get_json()
    crop = data.get('crop', 'citrus_orange')
    condition = data.get('condition', 'clean')
    
    # Rule-based simulation logic for v0.3
    outlet = 1
    grade = "Class 1 Extra"
    
    if condition == 'mold_detected':
        outlet = 4
        grade = "Reject / Cull (Viotec UV)"
    elif condition == 'low_brix':
        outlet = 3
        grade = "Juice Processing"
    elif condition == 'surface_scar':
        outlet = 2
        grade = "Class 2 Standard"
        
    return jsonify({
        "status": "success",
        "crop": crop,
        "grade": grade,
        "assigned_outlet": outlet,
        "message": f"Successfully sorted {crop} to Outlet {outlet}"
    })`,

    'crop_json': `{
  "crops": [
    {
      "id": "citrus_orange",
      "name_ar": "برتقال فالنسيا",
      "min_brix": 10.0,
      "outlets": 4
    },
    {
      "id": "apple_gala",
      "name_ar": "تفاح جالا",
      "min_brix": 12.0,
      "outlets": 4
    },
    {
      "id": "dates_medjool",
      "name_ar": "تمر مجهول",
      "min_brix": 58.0,
      "outlets": 4
    }
  ]
}`,

    'bat': `@echo off
TITLE CitrusSort v0.3 Simulator
echo Starting Python Virtual Environment...
python -m venv venv
call venv\\Scripts\\activate
echo Installing dependencies from requirements.txt...
pip install -r requirements.txt
echo Launching CitrusSort v0.3 Server...
python run.py
pause`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'محاكي CitrusSort v0.3 — قاعدة المشروع المحلي' : 'CitrusSort v0.3 Local Source Code Hub'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'استعراض ومراجعة ملفات إصدار CitrusSort v0.3' : 'Reviewing CitrusSort v0.3 Package Files'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'لقد قمنا باستلام فحص حزمة المشروع السابقة v0.3. إليك استعراض لأهم الملفات والمكونات البرمجية التي ستعمل على جهازك المحلي.'
            : 'Reviewing the core files of CitrusSort v0.3 package ready for local Windows deployment.'}
        </p>
      </div>

      {/* File Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveFile('run.py')}
          className={`px-4 py-2 text-xs font-mono rounded-md transition-colors whitespace-nowrap ${
            activeFile === 'run.py' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
          }`}
        >
          run.py
        </button>
        <button
          onClick={() => setActiveFile('routes.py')}
          className={`px-4 py-2 text-xs font-mono rounded-md transition-colors whitespace-nowrap ${
            activeFile === 'routes.py' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
          }`}
        >
          app/routes.py
        </button>
        <button
          onClick={() => setActiveFile('crop_json')}
          className={`px-4 py-2 text-xs font-mono rounded-md transition-colors whitespace-nowrap ${
            activeFile === 'crop_json' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
          }`}
        >
          crop_profiles.json
        </button>
        <button
          onClick={() => setActiveFile('bat')}
          className={`px-4 py-2 text-xs font-mono rounded-md transition-colors whitespace-nowrap ${
            activeFile === 'bat' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
          }`}
        >
          START_WINDOWS.bat
        </button>
      </div>

      {/* Code Viewer Box */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-emerald-400">
          <span className="flex items-center gap-2">
            <FileCode className="w-4 h-4" />
            <span>{activeFile}</span>
          </span>
          <span className="text-[10px] text-slate-400">CitrusSort v0.3-simulator</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto text-[11px] leading-relaxed text-slate-300">
          <pre>{fileContents[activeFile]}</pre>
        </div>

        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-sans">
          {isAr
            ? 'للتشغيل على جهازك الشخصي: فك ضغط ملف ZIP، ثم انقر نقراً مزدوجاً على ملف START_WINDOWS.bat ليقوم بتثبيت الحزم وتشغيل السيرفر تلقائياً.'
            : 'To run on your local PC: Extract the ZIP archive and double click START_WINDOWS.bat to automatically install dependencies and launch the server.'}
        </div>
      </div>
    </div>
  );
};
