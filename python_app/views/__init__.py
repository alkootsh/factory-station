"""
حزمة واجهات منظومة إدارة خطوط الإنتاج والفرز والمحاسبة
Falcon Eye Agrobotic ERP & Sorting OS
"""

from .dashboard import DashboardView
from .line_control import LineControlView
from .lines_manager import LinesManagerView
from .alerts_engine import AlertsEngineView
from .setup_wizard import SetupWizardView
from .plc_hardware_bridge import PLCHardwareBridgeView
from .peripherals_hub import PeripheralsHubView
from .inventory import InventoryView
from .sales import SalesView
from .reports import ReportsView

__all__ = [
    "DashboardView",
    "LineControlView",
    "LinesManagerView",
    "AlertsEngineView",
    "SetupWizardView",
    "PLCHardwareBridgeView",
    "PeripheralsHubView",
    "InventoryView",
    "SalesView",
    "ReportsView",
]
