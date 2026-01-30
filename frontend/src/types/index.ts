export interface SensorData {
  id: string;
  timestamp: Date;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  cropHealth: number;
  sensorId: string;
}

export interface RobotStatus {
  isOnline: boolean;
  battery: number;
  position: { x: number; y: number };
  speed: number;
  lastUpdate: Date;
  mode: 'idle' | 'patrolling' | 'charging' | 'maintenance';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  sensorId: string;
  timestamp: Date;
  acknowledged: boolean;
}

export interface Sensor {
  id: string;
  name: string;
  type: 'soil_moisture' | 'temperature' | 'humidity' | 'crop_health';
  location: { x: number; y: number };
  status: 'active' | 'inactive' | 'maintenance';
  lastReading: number;
  unit: string;
}

export interface AlertThreshold {
  id: string;
  sensorType: string;
  minValue: number;
  maxValue: number;
  alertLevel: 'warning' | 'critical';
}
