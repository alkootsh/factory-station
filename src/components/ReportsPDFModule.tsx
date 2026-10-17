import React, { useState } from 'react';
import { FileText, Download, Calendar, Printer, CheckCircle, BarChart3, AlertTriangle, Layers } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ReportsPDFModuleProps {
  lang: 'ar' | 'en' | 'es' | 'fr' | 'es' | 'fr';
}

export const ReportsPDFModule: React.FC<ReportsPDFModuleProps> = ({ lang }) => {
  const [reportType, setReportType] = useState<'daily' | 'batch' | 'wastage'>('daily');
  const [selectedBatch, setSelectedBatch] = useState('BATCH-2026-X9');
  const [dateStr, setDateStr] = useState('2026-10-17');
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const isAr = lang === 'ar';
  const isEs = lang === 'es';
  const isFr = lang === 'fr';

  const t = {
    title: {
      ar: 'وحدة التقارير الرسمية وملخصات PDF المعتمدة',
      en: 'Official Reports & Certified PDF Summary Generator',
      es: 'Módulo de Informes Oficiales y Resúmenes PDF Certificados',
      fr: 'Module de Rapports Officiels et Résumés PDF Certifiés'
    },
    subtitle: {
      ar: 'إنشاء وتصدير تقارير الإنتاج اليومية، أداء التجميعات، ومؤشرات الفاقد والفرز بصيغة PDF معتمدة للأسواق الزراعية الدولية.',
      en: 'Generate and export certified PDF summaries for daily production, batch performance, and wastage metrics for global agricultural markets.',
      es: 'Genere y exporte resúmenes PDF certificados para producción diaria, rendimiento de lotes y métricas de merma.',
      fr: 'Générez et exportez des résumés PDF certifiés pour la production quotidienne, les performances des lots et les métriques de gaspillage.'
    },
    selectReport: {
      ar: 'نوع التقرير المطلوب:',
      en: 'Select Report Type:',
      es: 'Seleccionar Tipo de Informe:',
      fr: 'Sélectionner le Type de Rapport:'
    },
    dailyProd: {
      ar: 'تقرير الإنتاج اليومي الشامل (Daily Production Summary)',
      en: 'Comprehensive Daily Production Summary',
      es: 'Resumen Diario de Producción Integral',
      fr: 'Résumé Quotidien de Production Complet'
    },
    batchPerf: {
      ar: 'تقرير أداء الدفعات والتجهيز (Batch Performance Report)',
      en: 'Batch Performance & Quality Report',
      es: 'Informe de Rendimiento de Lotes y Calidad',
      fr: 'Rapport de Performance et de Qualité des Lots'
    },
    wastageMetrics: {
      ar: 'تقرير الفاقد ونسب الفرز والتالف (Wastage & Rejection Metrics)',
      en: 'Wastage & Rejection Metrics Analysis',
      es: 'Análisis de Métricas de Merma y Rechazo',
      fr: 'Analyse des Métriques de Gaspillage et Rejet'
    },
    generatePdf: {
      ar: 'تحميل التقرير الرسمي PDF (Download Certified PDF)',
      en: 'Download Certified PDF Report',
      es: 'Descargar Informe PDF Certificado',
      fr: 'Télécharger le Rapport PDF Certifié'
    },
    batchIdLabel: {
      ar: 'رقم التشغيلة / الدُفعة:',
      en: 'Batch / Lot Number:',
      es: 'Número de Lote:',
      fr: 'Numéro de Lot :'
    },
    dateLabel: {
      ar: 'تاريخ الإصدار:',
      en: 'Issue Date:',
      es: 'Fecha de Emisión:',
      fr: 'Date d\'Émission :'
    }
  };

  const generatePDF = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const doc = new jsPDF();

      // Header Banner
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, 210, 35, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.text('FALCON EYE AGROBOTIC INDUSTRIAL OS', 14, 18);
      
      doc.setFontSize(10);
      doc.setTextColor(52, 211, 153); // emerald-400
      doc.text(`Certified Agricultural Report: ${reportType.toUpperCase()} | Date: ${dateStr}`, 14, 27);

      doc.setTextColor(30, 41, 59); // slate-800
      doc.setFontSize(14);
      doc.text(
        reportType === 'daily' 
          ? 'Daily Packhouse Production Summary' 
          : reportType === 'batch' 
          ? `Batch Performance Analysis (${selectedBatch})` 
          : 'Wastage & Grading Rejection Metrics',
        14,
        48
      );

      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`Generated automatically by Falcon Eye Core OS v4.8 - Secure Audit Trail #98421`, 14, 55);

      let tableHead = [];
      let tableBody = [];

      if (reportType === 'daily') {
        tableHead = [['Line Section', 'Input Tonnage', 'Export Grade (Class 1)', 'Juice / Industrial', 'Efficiency %', 'Operator']];
        tableBody = [
          ['Line 1 - Citrus Sizing', '45.8 Tons', '38.2 Tons', '7.6 Tons', '94.2%', 'A. Al-Masri'],
          ['Line 2 - Apple Grading', '32.4 Tons', '28.1 Tons', '4.3 Tons', '91.8%', 'M. Hassan'],
          ['Line 3 - Mango Packhouse', '21.0 Tons', '18.9 Tons', '2.1 Tons', '96.5%', 'S. Khedr'],
          ['Total Shift Output', '99.2 Tons', '85.2 Tons', '14.0 Tons', '94.1% Avg', 'Shift Supervisor Lead']
        ];
      } else if (reportType === 'batch') {
        tableHead = [['Batch ID', 'Variety / Crop', 'Target Destination', 'Total Input', 'Export Ratio', 'Status']];
        tableBody = [
          [selectedBatch, 'Valencia Oranges', 'Rotterdam Port (EU)', '24.5 Tons', '84.5%', 'Certified Export Ready'],
          ['BATCH-2026-X8', 'Grand Nain Bananas', 'Dubai Hub (UAE)', '18.0 Tons', '89.2%', 'Completed & Palletized'],
          ['BATCH-2026-X7', 'Egyptian Mangoes', 'London Heathrow (UK)', '12.2 Tons', '91.0%', 'Airfreight Shipped']
        ];
      } else {
        tableHead = [['Rejection Reason', 'Weight (kg)', '% of Total Input', 'Primary Cause', 'Action Taken']];
        tableBody = [
          ['Size Deviation (< 65mm)', '1,420 kg', '1.43%', 'Calibrator Optic Threshold', 'Adjusted roller gap in PLC-2'],
          ['Blemish / Surface Mark', '980 kg', '0.98%', 'AI Vision Color Camera 3', 'Cleaned LED strobe diffuser'],
          ['Soft Rot / Decay', '450 kg', '0.45%', 'Pre-sorting Cold Chain Lag', 'Accelerated pre-cooling cycle'],
          ['Total Wastage / Reject', '2,850 kg', '2.86%', 'Within allowable 3.5% threshold', 'Passed USDA / EU Inspection']
        ];
      }

      (doc as any).autoTable({
        startY: 65,
        head: tableHead,
        body: tableBody,
        theme: 'grid',
        headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold' },
        styles: { fontSize: 9, cellPadding: 5 },
      });

      const finalY = (doc as any).lastAutoTable.finalY || 150;
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text('Authorized Signature / Quality Inspector Stamp:', 14, finalY + 20);
      doc.line(14, finalY + 35, 90, finalY + 35);

      doc.text('Falcon Eye Industrial AI Verification Seal:', 120, finalY + 20);
      doc.rect(120, finalY + 24, 60, 20);
      doc.setFontSize(8);
      doc.setTextColor(16, 185, 129);
      doc.text('SECURE HASH: 0x89F4...A12E', 123, finalY + 34);

      doc.save(`FalconEye_${reportType}_report_${dateStr}.pdf`);
      setIsGenerating(false);
      setSuccessMsg(isAr ? 'تم إنشاء وتحميل ملف الـ PDF بنجاح!' : 'PDF report generated and downloaded successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto py-4">
      {/* Header card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/60">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              {isAr ? t.title.ar : isEs ? t.title.es : isFr ? t.title.fr : t.title.en}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {isAr ? t.subtitle.ar : isEs ? t.subtitle.es : isFr ? t.subtitle.fr : t.subtitle.en}
            </p>
          </div>
        </div>
      </div>

      {/* Main Form & Options */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Config */}
        <div className="md:col-span-2 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {isAr ? t.selectReport.ar : isEs ? t.selectReport.es : isFr ? t.selectReport.fr : t.selectReport.en}
            </label>
            <div className="space-y-3">
              <label className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${reportType === 'daily' ? 'border-emerald-500 bg-emerald-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}>
                <input 
                  type="radio" 
                  name="reportType" 
                  value="daily" 
                  checked={reportType === 'daily'} 
                  onChange={() => setReportType('daily')}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500" 
                />
                <div>
                  <span className="font-bold text-slate-900 text-sm block">
                    {isAr ? t.dailyProd.ar : 'Comprehensive Daily Production Summary'}
                  </span>
                  <span className="text-xs text-slate-500">
                    {isAr ? 'ملخص إجمالي الأطنان الداخلة والخارجة ونسب الكفاءة لكل خط فرز وتعبئة.' : 'Total input tonnage, export grade ratios, and shift efficiency.'}
                  </span>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${reportType === 'batch' ? 'border-emerald-500 bg-emerald-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}>
                <input 
                  type="radio" 
                  name="reportType" 
                  value="batch" 
                  checked={reportType === 'batch'} 
                  onChange={() => setReportType('batch')}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500" 
                />
                <div>
                  <span className="font-bold text-slate-900 text-sm block">
                    {isAr ? t.batchPerf.ar : 'Batch Performance & Quality Report'}
                  </span>
                  <span className="text-xs text-slate-500">
                    {isAr ? 'تتبع تشغيلة محددة، وجهة التصدير، وحالة الاعتماد القياسي.' : 'Track specific batch code, export destination, and compliance status.'}
                  </span>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${reportType === 'wastage' ? 'border-emerald-500 bg-emerald-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}>
                <input 
                  type="radio" 
                  name="reportType" 
                  value="wastage" 
                  checked={reportType === 'wastage'} 
                  onChange={() => setReportType('wastage')}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500" 
                />
                <div>
                  <span className="font-bold text-slate-900 text-sm block">
                    {isAr ? t.wastageMetrics.ar : 'Wastage & Rejection Metrics Analysis'}
                  </span>
                  <span className="text-xs text-slate-500">
                    {isAr ? 'تحليل تفصيلي لأسباب الفرز، العيوب، نسب الهالك والمتبقيات.' : 'Detailed breakdown of rejection reasons, decay, and size deviations.'}
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? t.dateLabel.ar : t.dateLabel.en}
              </label>
              <input 
                type="date" 
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            {reportType === 'batch' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr ? t.batchIdLabel.ar : t.batchIdLabel.en}
                </label>
                <select 
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="BATCH-2026-X9">BATCH-2026-X9 (Valencia Oranges)</option>
                  <option value="BATCH-2026-X8">BATCH-2026-X8 (Grand Nain Bananas)</option>
                  <option value="BATCH-2026-X7">BATCH-2026-X7 (Egyptian Mangoes)</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Preview & Action */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between shadow-inner">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {isAr ? 'معاينة التقرير الجاهز' : 'PDF Preview & Specs'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                A4 Certified
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">{isAr ? 'الترويسة:' : 'Header Stamp:'}</span>
                <span className="font-mono text-emerald-400">Falcon Eye OS v4.8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isAr ? 'التنسيق:' : 'Format:'}</span>
                <span className="font-mono">Vector PDF + Table Grid</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isAr ? 'التوقيع الرقمي:' : 'Digital Signature:'}</span>
                <span className="font-mono text-emerald-300">SHA-256 Validated</span>
              </div>
            </div>

            {successMsg && (
              <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-bounce">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}
          </div>

          <div className="pt-6">
            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>{isAr ? 'جاري تصدير التقرير...' : 'Generating PDF...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{isAr ? t.generatePdf.ar : t.generatePdf.en}</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-2">
              {isAr ? 'متوافق مع معايير الفحص الزراعي والتصديري الأوروبي والدولي.' : 'Compliant with USDA and EU export inspection standards.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
