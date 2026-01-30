import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { SensorData, RobotStatus, User, Alert, Sensor, AlertThreshold } from '../types';
import { generateMockSensorData, generateMockHistoricalData, generateMockAlerts, mockSensors, mockThresholds } from '../utils/mockData';

interface AppContextType {
  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  
  // Sensor Data
  currentData: SensorData | null;
  historicalData: SensorData[];
  isRobotOnline: boolean;
  robotStatus: RobotStatus;
  
  // Alerts
  alerts: Alert[];
  acknowledgeAlert: (id: string) => void;
  
  // Sensors Management
  sensors: Sensor[];
  addSensor: (sensor: Omit<Sensor, 'id'>) => void;
  removeSensor: (id: string) => void;
  
  // Thresholds
  thresholds: AlertThreshold[];
  updateThreshold: (id: string, threshold: Partial<AlertThreshold>) => void;
  
  // Data Filters
  dateRange: { start: Date; end: Date };
  setDateRange: (range: { start: Date; end: Date }) => void;
  
  // Notifications
  notifications: Alert[];
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>(mockSensors);
  const [thresholds, setThresholds] = useState<AlertThreshold[]>(mockThresholds);
  const [notifications, setNotifications] = useState<Alert[]>([]);
  
  const [robotStatus, setRobotStatus] = useState<RobotStatus>({
    isOnline: true,
    battery: 87,
    position: { x: 50, y: 50 },
    speed: 2.5,
    lastUpdate: new Date(),
    mode: 'patrolling'
  });
  
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date()
  });

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev: boolean) => {
      const newValue = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newValue));
      return newValue;
    });
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockSensorData();
      setCurrentData(newData);
      
      // Update robot status
      setRobotStatus(prev => ({
        ...prev,
        battery: Math.max(20, prev.battery - Math.random() * 0.1),
        position: {
          x: Math.min(100, Math.max(0, prev.position.x + (Math.random() - 0.5) * 5)),
          y: Math.min(100, Math.max(0, prev.position.y + (Math.random() - 0.5) * 5))
        },
        lastUpdate: new Date()
      }));

      // Check for alerts
      if (newData.soilMoisture < 30) {
        const alert: Alert = {
          id: Date.now().toString(),
          type: 'critical',
          message: `Low soil moisture detected: ${newData.soilMoisture.toFixed(1)}%`,
          sensorId: 'soil-1',
          timestamp: new Date(),
          acknowledged: false
        };
        setAlerts(prev => [alert, ...prev].slice(0, 50));
        setNotifications(prev => [alert, ...prev].slice(0, 10));
      }
      
      if (newData.temperature > 35) {
        const alert: Alert = {
          id: Date.now().toString(),
          type: 'warning',
          message: `High temperature detected: ${newData.temperature.toFixed(1)}°C`,
          sensorId: 'temp-1',
          timestamp: new Date(),
          acknowledged: false
        };
        setAlerts(prev => [alert, ...prev].slice(0, 50));
        setNotifications(prev => [alert, ...prev].slice(0, 10));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Load initial historical data
  useEffect(() => {
    setHistoricalData(generateMockHistoricalData(7));
    setAlerts(generateMockAlerts(10));
  }, []);

  // Auth functions
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password.length >= 6) {
      const newUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'user'
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password.length >= 6 && name) {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: 'user'
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const addSensor = (sensor: Omit<Sensor, 'id'>) => {
    setSensors(prev => [...prev, { ...sensor, id: Date.now().toString() }]);
  };

  const removeSensor = (id: string) => {
    setSensors(prev => prev.filter(s => s.id !== id));
  };

  const updateThreshold = (id: string, threshold: Partial<AlertThreshold>) => {
    setThresholds(prev => prev.map(t => 
      t.id === id ? { ...t, ...threshold } : t
    ));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppContext.Provider value={{
      darkMode,
      toggleDarkMode,
      user,
      isAuthenticated: !!user,
      login,
      logout,
      register,
      currentData,
      historicalData,
      isRobotOnline: robotStatus.isOnline,
      robotStatus,
      alerts,
      acknowledgeAlert,
      sensors,
      addSensor,
      removeSensor,
      thresholds,
      updateThreshold,
      dateRange,
      setDateRange,
      notifications,
      clearNotifications
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
