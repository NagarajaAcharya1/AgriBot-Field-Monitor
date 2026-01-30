import { SensorData, Alert, Sensor, AlertThreshold } from '../types';

export const generateMockSensorData = (): SensorData => {
  return {
    id: Date.now().toString(),
    timestamp: new Date(),
    soilMoisture: 25 + Math.random() * 50,
    temperature: 18 + Math.random() * 20,
    humidity: 40 + Math.random() * 40,
    cropHealth: 60 + Math.random() * 35,
    sensorId: 'sensor-' + Math.floor(Math.random() * 4 + 1)
  };
};

export const generateMockHistoricalData = (days: number): SensorData[] => {
  const data: SensorData[] = [];
  const now = Date.now();
  
  for (let i = 0; i < days * 24; i++) {
    const timestamp = new Date(now - (days * 24 - i) * 60 * 60 * 1000);
    const hourOfDay = timestamp.getHours();
    
    // Simulate realistic patterns
    const tempBase = 22 + Math.sin((hourOfDay - 6) * Math.PI / 12) * 8;
    const humidityBase = 60 - Math.sin((hourOfDay - 6) * Math.PI / 12) * 15;
    
    data.push({
      id: `hist-${i}`,
      timestamp,
      soilMoisture: 35 + Math.random() * 30 + Math.sin(i * 0.1) * 10,
      temperature: tempBase + (Math.random() - 0.5) * 4,
      humidity: humidityBase + (Math.random() - 0.5) * 10,
      cropHealth: 70 + Math.random() * 20 + Math.sin(i * 0.05) * 5,
      sensorId: 'sensor-' + ((i % 4) + 1)
    });
  }
  
  return data;
};

export const generateMockAlerts = (count: number): Alert[] => {
  const alertTypes: Array<{ type: 'warning' | 'critical' | 'info'; messages: string[] }> = [
    {
      type: 'critical',
      messages: [
        'Low soil moisture detected in Zone A',
        'Critical temperature spike in greenhouse',
        'Crop health index below threshold'
      ]
    },
    {
      type: 'warning',
      messages: [
        'Humidity levels rising above normal',
        'Battery level low on robot unit',
        'Sensor calibration recommended'
      ]
    },
    {
      type: 'info',
      messages: [
        'Daily report generated',
        'System maintenance scheduled',
        'New sensor data available'
      ]
    }
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    return {
      id: `alert-${i}`,
      type: alertType.type,
      message: alertType.messages[Math.floor(Math.random() * alertType.messages.length)],
      sensorId: `sensor-${Math.floor(Math.random() * 4) + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
      acknowledged: Math.random() > 0.7
    };
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const mockSensors: Sensor[] = [
  {
    id: 'sensor-1',
    name: 'Soil Moisture Sensor A',
    type: 'soil_moisture',
    location: { x: 20, y: 30 },
    status: 'active',
    lastReading: 45.2,
    unit: '%'
  },
  {
    id: 'sensor-2',
    name: 'Temperature Sensor B',
    type: 'temperature',
    location: { x: 60, y: 40 },
    status: 'active',
    lastReading: 28.5,
    unit: '°C'
  },
  {
    id: 'sensor-3',
    name: 'Humidity Sensor C',
    type: 'humidity',
    location: { x: 40, y: 70 },
    status: 'active',
    lastReading: 65.8,
    unit: '%'
  },
  {
    id: 'sensor-4',
    name: 'Crop Health Sensor D',
    type: 'crop_health',
    location: { x: 80, y: 60 },
    status: 'maintenance',
    lastReading: 78.3,
    unit: 'NDVI'
  }
];

export const mockThresholds: AlertThreshold[] = [
  { id: 'th-1', sensorType: 'soil_moisture', minValue: 30, maxValue: 80, alertLevel: 'warning' },
  { id: 'th-2', sensorType: 'soil_moisture', minValue: 20, maxValue: 90, alertLevel: 'critical' },
  { id: 'th-3', sensorType: 'temperature', minValue: 10, maxValue: 35, alertLevel: 'warning' },
  { id: 'th-4', sensorType: 'temperature', minValue: 5, maxValue: 40, alertLevel: 'critical' },
  { id: 'th-5', sensorType: 'humidity', minValue: 40, maxValue: 80, alertLevel: 'warning' },
  { id: 'th-6', sensorType: 'crop_health', minValue: 50, maxValue: 100, alertLevel: 'warning' }
];

export const fieldZones = [
  { id: 'zone-a', name: 'Zone A - Wheat', x: 10, y: 10, width: 40, height: 35, crop: 'Wheat', health: 85 },
  { id: 'zone-b', name: 'Zone B - Corn', x: 55, y: 10, width: 35, height: 35, crop: 'Corn', health: 72 },
  { id: 'zone-c', name: 'Zone C - Soybeans', x: 10, y: 50, width: 35, height: 40, crop: 'Soybeans', health: 91 },
  { id: 'zone-d', name: 'Zone D - Rice', x: 50, y: 50, width: 40, height: 40, crop: 'Rice', health: 68 }
];
