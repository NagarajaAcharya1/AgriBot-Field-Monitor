import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Thermometer, CloudRain, Leaf, TrendingUp, TrendingDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SensorCardProps {
  type: 'soilMoisture' | 'temperature' | 'humidity' | 'cropHealth';
  value: number;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
  delay?: number;
}

const sensorConfig = {
  soilMoisture: {
    label: 'Soil Moisture',
    icon: Droplets,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
    getStatus: (v: number) => v < 30 ? 'critical' : v < 50 ? 'warning' : 'normal'
  },
  temperature: {
    label: 'Temperature',
    icon: Thermometer,
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-500/10 to-red-500/10',
    getStatus: (v: number) => v > 35 ? 'critical' : v > 30 ? 'warning' : 'normal'
  },
  humidity: {
    label: 'Humidity',
    icon: CloudRain,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
    getStatus: (v: number) => v > 85 ? 'warning' : v < 40 ? 'warning' : 'normal'
  },
  cropHealth: {
    label: 'Crop Health (NDVI)',
    icon: Leaf,
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
    getStatus: (v: number) => v < 50 ? 'critical' : v < 70 ? 'warning' : 'normal'
  }
};

export const SensorCard: React.FC<SensorCardProps> = ({ type, value, unit, trend = 'stable', delay = 0 }) => {
  const { darkMode } = useApp();
  const config = sensorConfig[type];
  const status = config.getStatus(value);
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl p-6 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg hover:shadow-xl transition-shadow duration-300`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-50`} />
      
      {/* Status Indicator */}
      <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
        status === 'critical' ? 'bg-red-500 animate-pulse' :
        status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
      }`} />

      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-4 shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Label */}
        <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {config.label}
        </p>

        {/* Value */}
        <div className="flex items-end gap-2">
          <motion.span
            key={value}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {value.toFixed(1)}
          </motion.span>
          <span className={`text-lg mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {unit}
          </span>
        </div>

        {/* Trend */}
        <div className="flex items-center gap-1 mt-2">
          {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
          {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {trend === 'up' ? 'Increasing' : trend === 'down' ? 'Decreasing' : 'Stable'}
          </span>
        </div>
      </div>

      {/* Animated Border */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay * 0.1 + 0.3, duration: 0.5 }}
      />
    </motion.div>
  );
};
