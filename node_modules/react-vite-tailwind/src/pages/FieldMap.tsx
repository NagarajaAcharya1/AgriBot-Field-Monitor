import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Droplets, Thermometer, CloudRain, Leaf, Battery, Gauge, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';
import { fieldZones } from '../utils/mockData';

export const FieldMap: React.FC = () => {
  const { robotStatus, sensors, currentData, darkMode } = useApp();

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'bg-green-500';
    if (health >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'soil_moisture': return Droplets;
      case 'temperature': return Thermometer;
      case 'humidity': return CloudRain;
      case 'crop_health': return Leaf;
      default: return MapPin;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Field Map & Robot Status
          </h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Real-time field visualization and robot tracking
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Field Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`lg:col-span-2 p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Field Overview
            </h2>
            
            {/* Map Container */}
            <div 
              className={`relative aspect-[4/3] rounded-xl overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}
              style={{
                backgroundImage: `
                  linear-gradient(90deg, ${darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px),
                  linear-gradient(${darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            >
              {/* Field Zones */}
              {fieldZones.map((zone) => (
                <div
                  key={zone.id}
                  className={`absolute rounded-lg border-2 ${
                    darkMode 
                      ? 'border-gray-600 bg-gray-700/50' 
                      : 'border-green-300 bg-green-100/50'
                  } transition-all hover:scale-[1.02] cursor-pointer`}
                  style={{
                    left: `${zone.x}%`,
                    top: `${zone.y}%`,
                    width: `${zone.width}%`,
                    height: `${zone.height}%`
                  }}
                >
                  <div className="absolute inset-2 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
                        darkMode ? 'bg-gray-600 text-gray-300' : 'bg-white/80 text-gray-700'
                      }`}>
                        {zone.name}
                      </span>
                      <div className={`w-3 h-3 rounded-full ${getHealthColor(zone.health)}`} />
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Health: {zone.health}%
                    </div>
                  </div>
                </div>
              ))}

              {/* Sensors */}
              {sensors.map((sensor) => {
                const Icon = getSensorIcon(sensor.type);
                return (
                  <motion.div
                    key={sensor.id}
                    className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center shadow-lg cursor-pointer ${
                      sensor.status === 'active' 
                        ? 'bg-green-500' 
                        : sensor.status === 'maintenance' 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                    }`}
                    style={{
                      left: `${sensor.location.x}%`,
                      top: `${sensor.location.y}%`
                    }}
                    whileHover={{ scale: 1.2 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </motion.div>
                );
              })}

              {/* Robot Position */}
              <motion.div
                className="absolute w-12 h-12 -ml-6 -mt-6"
                style={{
                  left: `${robotStatus.position.x}%`,
                  top: `${robotStatus.position.y}%`
                }}
                animate={{
                  left: `${robotStatus.position.x}%`,
                  top: `${robotStatus.position.y}%`
                }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <div className="relative">
                  {/* Pulse Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-500/30"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {/* Robot Icon */}
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Legend */}
              <div className={`absolute bottom-4 left-4 p-3 rounded-xl ${
                darkMode ? 'bg-gray-800/90' : 'bg-white/90'
              } backdrop-blur-lg shadow-lg`}>
                <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Legend</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Sensor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Maintenance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Robot</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Robot Status Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Robot Card */}
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AgriBot-01</h3>
                  <div className={`flex items-center gap-2 ${robotStatus.isOnline ? 'text-green-500' : 'text-red-500'}`}>
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    <span className="text-sm font-medium">{robotStatus.isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Battery className={`w-5 h-5 ${
                      robotStatus.battery > 50 ? 'text-green-500' : robotStatus.battery > 20 ? 'text-yellow-500' : 'text-red-500'
                    }`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Battery</span>
                  </div>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {robotStatus.battery.toFixed(0)}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      robotStatus.battery > 50 ? 'bg-green-500' : robotStatus.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${robotStatus.battery}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-blue-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Speed</span>
                  </div>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {robotStatus.speed.toFixed(1)} m/s
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Position</span>
                  </div>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    ({robotStatus.position.x.toFixed(0)}, {robotStatus.position.y.toFixed(0)})
                  </span>
                </div>

                <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Current Mode</p>
                  <p className={`text-lg font-bold capitalize ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {robotStatus.mode}
                  </p>
                </div>
              </div>
            </div>

            {/* Current Readings */}
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Current Readings
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Droplets, label: 'Soil Moisture', value: currentData?.soilMoisture ?? 45, unit: '%', color: 'text-blue-500' },
                  { icon: Thermometer, label: 'Temperature', value: currentData?.temperature ?? 28, unit: '°C', color: 'text-orange-500' },
                  { icon: CloudRain, label: 'Humidity', value: currentData?.humidity ?? 65, unit: '%', color: 'text-purple-500' },
                  { icon: Leaf, label: 'Crop Health', value: currentData?.cropHealth ?? 78, unit: '', color: 'text-green-500' }
                ].map((reading, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <reading.icon className={`w-5 h-5 ${reading.color}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {reading.label}
                      </span>
                    </div>
                    <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {reading.value.toFixed(1)}{reading.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sensor List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
        >
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Active Sensors
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sensors.map((sensor) => {
              const Icon = getSensorIcon(sensor.type);
              return (
                <div
                  key={sensor.id}
                  className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      sensor.status === 'active' 
                        ? 'bg-green-500/20 text-green-500' 
                        : sensor.status === 'maintenance' 
                          ? 'bg-yellow-500/20 text-yellow-500' 
                          : 'bg-red-500/20 text-red-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {sensor.name}
                      </p>
                      <p className={`text-xs capitalize ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {sensor.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Last Reading
                    </span>
                    <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {sensor.lastReading.toFixed(1)} {sensor.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
