import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewHero } from './components/OverviewHero';
import { LineSimulator } from './components/LineSimulator';
import { OpticalVisionLab } from './components/OpticalVisionLab';
import { RoboticsAndMachinery } from './components/RoboticsAndMachinery';
import { CapacityCalculator } from './components/CapacityCalculator';
import { MaintenanceDiagnostics } from './components/MaintenanceDiagnostics';
import { SmartAgroboticUpgrade } from './components/SmartAgroboticUpgrade';
import { VoiceAndMobileControl } from './components/VoiceAndMobileControl';
import { UpgradeEase } from './components/UpgradeEase';
import { FeasibilityStudy } from './components/FeasibilityStudy';
import { CustomSoftwareArchitecture } from './components/CustomSoftwareArchitecture';
import { PrototypeBOM } from './components/PrototypeBOM';
import { IPCameraIntegration } from './components/IPCameraIntegration';
import { SoftwareExecutionHub } from './components/SoftwareExecutionHub';
import { FalconEyeIntegration } from './components/FalconEyeIntegration';
import { CitrusSortHub } from './components/CitrusSortHub';
import { FullSoftwareDelivery } from './components/FullSoftwareDelivery';
import { LiveExecutionConsole } from './components/LiveExecutionConsole';
import { RealSourceDownloader } from './components/RealSourceDownloader';
import { InteractiveOnlineSimulator } from './components/InteractiveOnlineSimulator';
import { PythonDesktopAppStudio } from './components/PythonDesktopAppStudio';
import { InteractiveAICopilot } from './components/InteractiveAICopilot';
import { PackhouseERPIntegrated } from './components/PackhouseERPIntegrated';
import { UniversalLineConfigurator } from './components/UniversalLineConfigurator';
import { LineMachineryEquipments } from './components/LineMachineryEquipments';
import { PesticideResidueAnalyzer } from './components/PesticideResidueAnalyzer';
import { AIPredictiveMaintenance } from './components/AIPredictiveMaintenance';
import { ColdStorageManagement } from './components/ColdStorageManagement';
import { CommercialSecurityLicensing } from './components/CommercialSecurityLicensing';
import { UserRolesManagement } from './components/UserRolesManagement';
import { MarketCompetitorBenchmarking } from './components/MarketCompetitorBenchmarking';
import { ReportsPDFModule } from './components/ReportsPDFModule';
import { RealtimePLCStream } from './components/RealtimePLCStream';
import { FinancialManagementModule } from './components/FinancialManagementModule';
import { InternalEmailAndMessagingServer } from './components/InternalEmailAndMessagingServer';
import { StakeholdersCRMModule } from './components/StakeholdersCRMModule';
import { ExportManagementModule } from './components/ExportManagementModule';
import { AICustomReportsHub } from './components/AICustomReportsHub';
import { AssetManagementModule } from './components/AssetManagementModule';
import { WorkflowTrackingAndAdminModule } from './components/WorkflowTrackingAndAdminModule';
import { DocumentaryWorkflowModule } from './components/DocumentaryWorkflowModule';
import { ProductionPerformanceDashboard } from './components/ProductionPerformanceDashboard';
import { Bot } from 'lucide-react';

import { GlobalProvider } from './context/GlobalSettingsContext';
import { PLCAlertSystem } from './components/PLCAlertSystem';
import { GlobalDashboardSettingsModal } from './components/GlobalDashboardSettingsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [lang, setLang] = useState<'ar' | 'en' | 'es' | 'fr'>('ar');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedSystemForModal, setSelectedSystemForModal] = useState<string>('pomone');

  const isAr = lang === 'ar';

  const handleExploreSystem = (systemId: string) => {
    setSelectedSystemForModal(systemId);
    setActiveTab('machinery');
  };

  const handleQuickSimulate = () => {
    setActiveTab('simulator');
  };

  return (
    <GlobalProvider>
      <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans transition-all">
        <PLCAlertSystem />
        <GlobalDashboardSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} lang={lang} />
        
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
          setLang={setLang}
          onQuickSimulate={handleQuickSimulate}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'python-desktop' && <PythonDesktopAppStudio lang={lang} />}
          {activeTab === 'online-sim' && <InteractiveOnlineSimulator lang={lang} />}
          {activeTab === 'download-source' && <RealSourceDownloader lang={lang} />}
          {activeTab === 'live-console' && <LiveExecutionConsole lang={lang} />}
          {activeTab === 'turnkey-delivery' && <FullSoftwareDelivery lang={lang} />}
          {activeTab === 'overview' && <OverviewHero lang={lang} onExploreSystem={handleExploreSystem} onOpenSimulator={handleQuickSimulate} />}
          {activeTab === 'citrus-sort-v3' && <CitrusSortHub lang={lang} />}
          {activeTab === 'simulator' && <LineSimulator lang={lang} />}
          {activeTab === 'vision-lab' && <OpticalVisionLab lang={lang} />}
          {activeTab === 'machinery' && <RoboticsAndMachinery lang={lang} selectedSystemId={selectedSystemForModal} />}
          {activeTab === 'upgrade' && <SmartAgroboticUpgrade lang={lang} />}
          {activeTab === 'ip-camera' && <IPCameraIntegration lang={lang} />}
          {activeTab === 'software-hub' && <SoftwareExecutionHub lang={lang} />}
          {activeTab === 'falcon-eye' && <FalconEyeIntegration lang={lang} />}
          {activeTab === 'custom-software' && <CustomSoftwareArchitecture lang={lang} />}
          {activeTab === 'prototype-bom' && <PrototypeBOM lang={lang} />}
          {activeTab === 'feasibility' && <FeasibilityStudy lang={lang} />}
          {activeTab === 'ease' && <UpgradeEase lang={lang} />}
          {activeTab === 'voice-mobile' && <VoiceAndMobileControl lang={lang} />}
          {activeTab === 'calculator' && <CapacityCalculator lang={lang} />}
          {activeTab === 'ai-assistant' && <InteractiveAICopilot lang={lang} />}
          {activeTab === 'cold-storage' && <ColdStorageManagement lang={lang} />}
          {activeTab === 'packhouse-erp' && <PackhouseERPIntegrated lang={lang} />}
          {activeTab === 'user-roles' && <UserRolesManagement lang={lang} />}
          {activeTab === 'commercial-security' && <CommercialSecurityLicensing lang={lang} />}
          {activeTab === 'market-benchmark' && <MarketCompetitorBenchmarking lang={lang} />}
          {activeTab === 'universal-lines' && <UniversalLineConfigurator lang={lang} />}
          {activeTab === 'line-machinery' && <LineMachineryEquipments lang={lang} />}
          {activeTab === 'pesticide-analyzer' && <PesticideResidueAnalyzer lang={lang} />}
          {activeTab === 'predictive-maintenance' && <AIPredictiveMaintenance lang={lang} />}
          {activeTab === 'production-dashboard' && <ProductionPerformanceDashboard lang={lang} />}
          {activeTab === 'doc-workflow' && <DocumentaryWorkflowModule lang={lang} />}
          {activeTab === 'asset-mgmt' && <AssetManagementModule lang={lang} />}
          {activeTab === 'workflow-admin' && <WorkflowTrackingAndAdminModule lang={lang} />}
          {activeTab === 'ai-reports' && <AICustomReportsHub lang={lang} />}
          {activeTab === 'export-mgmt' && <ExportManagementModule lang={lang} />}
          {activeTab === 'stakeholders-crm' && <StakeholdersCRMModule lang={lang} />}
          {activeTab === 'financial-mgmt' && <FinancialManagementModule lang={lang} />}
          {activeTab === 'internal-mail' && <InternalEmailAndMessagingServer lang={lang} />}
          {activeTab === 'reports-pdf' && <ReportsPDFModule lang={lang} />}
          {activeTab === 'realtime-plc' && <RealtimePLCStream lang={lang} />}
          {activeTab === 'maintenance' && <MaintenanceDiagnostics lang={lang} />}
        </main>

        <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            {isAr ? 'فرنسا (Montauban) · إسبانيا (Alzira) · جميع الحقوق محفوظة' : 'France (Montauban) · Spain (Alzira) · All rights reserved'}
          </div>
        </footer>
      </div>
    </GlobalProvider>
  );
}
