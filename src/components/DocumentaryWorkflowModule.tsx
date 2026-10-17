import React, { useState } from 'react';
import { FileText, ArrowRight, CheckCircle2, ShieldCheck, Printer, Plus, Clock, FileCheck, Layers } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface DocumentaryWorkflowModuleProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

interface DocumentItem {
  id: string;
  docTypeCode: string;
  titleAr: string;
  titleEn: string;
  department: string;
  issuer: string;
  recipient: string;
  date: string;
  status: 'draft' | 'approved' | 'posted_to_gl' | 'archived';
  amount?: string;
}

export const DocumentaryWorkflowModule: React.FC<DocumentaryWorkflowModuleProps> = ({ lang }) => {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 'DOC-2026-001',
      docTypeCode: 'PR-PURCHASE',
      titleAr: 'أمر توريد محصول بساتين البرتقال',
      titleEn: 'Orange Crop Purchase Order',
      department: 'إدارة التوريدات والمشتريات',
      issuer: 'أحمد المصري (مدير المشتريات)',
      recipient: 'مزارع الوادي الأخضر',
      date: '2026-10-15',
      status: 'posted_to_gl',
      amount: '340,000 EGP'
    },
    {
      id: 'DOC-2026-002',
      docTypeCode: 'GR-RECEIPT',
      titleAr: 'إذن استلام مخزني بضاعة مرجعية',
      titleEn: 'Gate Pass & Good Receipt Note',
      department: 'المخازن والميزان البسكول',
      issuer: 'محمود حسن (أمين المخزن)',
      recipient: 'خط الفرز رقم 1',
      date: '2026-10-16',
      status: 'approved',
      amount: '48.5 Tons'
    },
    {
      id: 'DOC-2026-003',
      docTypeCode: 'QC-INSPECTION',
      titleAr: 'شهادة فحص جودة المحصول (NIR / Brix)',
      titleEn: 'Quality Control Inspection Certificate',
      department: 'قسم مراقبة الجودة (USDA)',
      issuer: 'د. سامي خضر (مسؤول الجودة)',
      recipient: 'قسم التعبئة والتغليف',
      date: '2026-10-16',
      status: 'approved',
      amount: 'نسبة سكر 12.4% Brix'
    },
    {
      id: 'DOC-2026-004',
      docTypeCode: 'INV-EXPORT',
      titleAr: 'فاتورة تجارية لتصدير شحنة روتردام',
      titleEn: 'Commercial Export Invoice',
      department: 'الإدارة المالية والتصدير',
      issuer: 'سارة عبد الله (المحاسبة الرئيسية)',
      recipient: 'شركة البركات للاستيراد (هولندا)',
      date: '2026-10-17',
      status: 'posted_to_gl',
      amount: '1,250,000 EGP'
    },
    {
      id: 'DOC-2026-005',
      docTypeCode: 'PV-PAYMENT',
      titleAr: 'سند صرف مرتبات عمال التعبئة',
      titleEn: 'Payroll Cash Payment Voucher',
      department: 'الحسابات والخزينة',
      issuer: 'مدحت حسن (أمين الخزينة)',
      recipient: 'عمال خطوط الفرز',
      date: '2026-10-17',
      status: 'draft',
      amount: '145,000 EGP'
    }
  ]);

  const [selectedDoc, setSelectedDoc] = useState<DocumentItem>(documents[3]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docDept, setDocDept] = useState('الإدارة المالية');
  const [docAmount, setDocAmount] = useState('50,000 EGP');
  const [successMsg, setSuccessMsg] = useState('');

  const isAr = lang === 'ar';

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle) return;

    const newDoc: DocumentItem = {
      id: `DOC-2026-00${documents.length + 1}`,
      docTypeCode: 'DOC-GEN',
      titleAr: docTitle,
      titleEn: docTitle,
      department: docDept,
      issuer: 'مستخدم النظام الحالي',
      recipient: 'الإدارة العامة',
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
      amount: docAmount
    };

    setDocuments([newDoc, ...documents]);
    setSelectedDoc(newDoc);
    setDocTitle('');
    setShowNewModal(false);
    setSuccessMsg(isAr ? 'تم إنشاء المستند الجديد بنجاح وإدراجه في دورة العمل المستندية!' : 'New document created in workflow!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const printDocumentPDF = (doc: DocumentItem) => {
    const pdf = new jsPDF();
    pdf.setFillColor(15, 23, 42);
    pdf.rect(0, 0, 210, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.text('FALCON EYE ERP - OFFICIAL DOCUMENTARY WORKFLOW', 14, 18);
    pdf.setFontSize(10);
    pdf.setTextColor(52, 211, 153);
    pdf.text(`Document ID: ${doc.id} | Type: ${doc.docTypeCode} | Date: ${doc.date}`, 14, 28);

    pdf.setTextColor(30, 41, 59);
    pdf.setFontSize(14);
    pdf.text(doc.titleAr, 14, 55);

    pdf.setFontSize(11);
    pdf.text(`Department: ${doc.department}`, 14, 68);
    pdf.text(`Issuer: ${doc.issuer}`, 14, 76);
    pdf.text(`Recipient: ${doc.recipient}`, 14, 84);
    pdf.text(`Financial Value / Metric: ${doc.amount || 'N/A'}`, 14, 92);
    pdf.text(`Document Status: ${doc.status.toUpperCase()}`, 14, 100);

    pdf.setLineWidth(0.5);
    pdf.line(14, 115, 196, 115);

    pdf.setFontSize(10);
    pdf.setTextColor(100, 116, 139);
    pdf.text('Authorized Digital Signature / Falcon Eye Secure Audit Trail', 14, 130);
    pdf.rect(14, 135, 70, 25);
    pdf.setTextColor(16, 185, 129);
    pdf.text('APPROVED & POSTED TO GL', 18, 150);

    pdf.save(`${doc.id}_workflow_document.pdf`);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              End-to-End Documentary Workflow Engine
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            {isAr ? 'دورة العمل المستندية والمحاسبية المتكاملة' : 'Integrated Documentary Workflow & Audit Trail'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            {isAr ? 'تتبع دورة المستندات المالية والتشغيلية من أمر الشراء، إذن الاستلام، فحص الجودة، وحتى الفاتورة وقيد الأستاذ العام والتصدير.' : 'Track operational and financial documents from purchase orders to invoices and General Ledger posting.'}
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? 'إصدار مستند جديد' : 'Create New Document'}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Grid: Document List & Selected Doc Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document List */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            <span>{isAr ? 'سجل المستندات والتدفقات' : 'Document Archive & Registry'}</span>
          </h3>
          <div className="space-y-2.5">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${selectedDoc.id === doc.id ? 'border-teal-500 bg-teal-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-slate-50'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-slate-500">{doc.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${doc.status === 'posted_to_gl' ? 'bg-emerald-100 text-emerald-800' : doc.status === 'approved' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                    {doc.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs">{doc.titleAr}</h4>
                <div className="flex justify-between items-center mt-2 text-[11px] text-slate-500">
                  <span>{doc.department}</span>
                  <span className="font-bold text-slate-900">{doc.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Document Detailed Preview */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-teal-600 uppercase tracking-widest">{selectedDoc.docTypeCode}</span>
                <h2 className="text-xl font-black text-slate-900 mt-1">{selectedDoc.titleAr}</h2>
                <span className="text-xs text-slate-500 font-mono">ID: {selectedDoc.id} | Date: {selectedDoc.date}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedDoc.status === 'posted_to_gl' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {selectedDoc.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 block">{isAr ? 'القسم المسؤول:' : 'Department:'}</span>
                <strong className="text-slate-900 text-sm">{selectedDoc.department}</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 block">{isAr ? 'المُصدر والمسؤول:' : 'Issuer:'}</span>
                <strong className="text-slate-900 text-sm">{selectedDoc.issuer}</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 block">{isAr ? 'الجهة المستلمة:' : 'Recipient:'}</span>
                <strong className="text-slate-900 text-sm">{selectedDoc.recipient}</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 block">{isAr ? 'القيمة المالية / الكمية:' : 'Value / Metric:'}</span>
                <strong className="text-teal-600 text-sm font-black">{selectedDoc.amount}</strong>
              </div>
            </div>

            {/* Workflow Audit Trail Steps */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">{isAr ? 'مسار دورة المستند والموافقات (Audit Trail)' : 'Document Lifecycle & Approvals'}</h4>
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>1. {isAr ? 'إنشاء المسودة' : 'Draft Created'}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>2. {isAr ? 'مراجعة واعتماد القسم' : 'Dept Approved'}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>3. {isAr ? 'الترحيل للأستاذ العام (GL)' : 'Posted to GL'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t mt-6 flex justify-end gap-3">
            <button
              onClick={() => printDocumentPDF(selectedDoc)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{isAr ? 'طباعة المستند الرسمي PDF' : 'Print Official PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* New Document Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{isAr ? 'إصدار مستند جديد في دورة العمل' : 'Create New Workflow Document'}</h3>
            <form onSubmit={handleAddDocument} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'عنوان المستند والبيان' : 'Document Title'}</label>
                <input type="text" required value={docTitle} onChange={(e) => setDocTitle(e.target.value)} placeholder="مثال: إذن صرف خامات تعبئة" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'القسم المختص' : 'Department'}</label>
                <select value={docDept} onChange={(e) => setDocDept(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50">
                  <option value="الإدارة المالية">{isAr ? 'الإدارة المالية (Finance)' : 'Finance'}</option>
                  <option value="المخازن والميزان">{isAr ? 'المخازن والميزان (Warehouses)' : 'Warehouses'}</option>
                  <option value="قسم مراقبة الجودة">{isAr ? 'قسم مراقبة الجودة (Quality Control)' : 'Quality Control'}</option>
                  <option value="إدارة التصدير">{isAr ? 'إدارة التصدير (Export)' : 'Export'}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'القيمة المالية أو الكمية' : 'Amount / Quantity'}</label>
                <input type="text" required value={docAmount} onChange={(e) => setDocAmount(e.target.value)} placeholder="50,000 EGP" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowNewModal(false)} className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-700">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-teal-600 rounded-lg text-xs font-bold text-white">إصدار المستند</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
