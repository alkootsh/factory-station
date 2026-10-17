import React, { createContext, useContext, useState } from 'react';

type GlobalSettings = {
  refreshRate: number;
  units: 'metric' | 'imperial';
  timezone: string;
};

type PLCData = {
  line1Temp: number;
  line1Humidity: number;
  line1Weight: number;
  line1Pressure: number;
};

interface GlobalContextType {
  settings: GlobalSettings;
  setSettings: React.Dispatch<React.SetStateAction<GlobalSettings>>;
  plcData: PLCData;
  setPlcData: React.Dispatch<React.SetStateAction<PLCData>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<GlobalSettings>({
    refreshRate: 1000,
    units: 'metric',
    timezone: 'UTC',
  });
  const [plcData, setPlcData] = useState<PLCData>({
    line1Temp: 4.0,
    line1Humidity: 85.0,
    line1Weight: 1000.0,
    line1Pressure: 2.0,
  });

  return (
    <GlobalContext.Provider value={{ settings, setSettings, plcData, setPlcData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useGlobalContext must be used within GlobalProvider');
  return context;
};
