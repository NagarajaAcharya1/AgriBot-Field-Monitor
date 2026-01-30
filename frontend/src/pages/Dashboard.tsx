import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Battery, MapPin, Clock, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SensorCard } from '../components/SensorCard';
import { SensorChart } from '../components/Charts';
import { Layout } from '../components/Layout';

export const Dashboard: React.FC = () => {
  const { currentData, historicalData, robotStatus, darkMode, isRobotOnline } = useApp();
  const [chartType, setChartType] = useState<'line' | 'area'>('area');
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');

  const getFilteredData = () => {
    const now = Date.now();
    const ranges = {
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000
    };
    return historicalData.filter(d => now - new Date(d.timestamp).getTime() < ranges[timeRange]).slice(-50);
  };

  const filteredData = getFilteredData();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Live Dashboard
            </h1>
            <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Real-time sensor data from your field
            </p>
          </div>
          
          {/* Robot Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}
          >
            <div className={`flex items-center gap-2 ${isRobotOnline ? 'text-green-500' : 'text-red-500'}`}>
              {isRobotOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
              <span className="font-medium">{isRobotOnline ? 'Online' : 'Offline'}</span>
            </div>
            <div className={`w-px h-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className="flex items-center gap-2">
              <Battery className={`w-5 h-5 ${robotStatus.battery > 50 ? 'text-green-500' : robotStatus.battery > 20 ? 'text-yellow-500' : 'text-red-500'}`} />
              <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {robotStatus.battery.toFixed(0)}%
              </span>
            </div>
          </motion.div>
        </div>

        {/* Sensor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <SensorCard
            type="soilMoisture"
            value={currentData?.soilMoisture ?? 45}
            unit="%"
            trend="stable"
            delay={0}
          />
          <SensorCard
            type="temperature"
            value={currentData?.temperature ?? 28}
            unit="°C"
            trend="up"
            delay={1}
          />
          <SensorCard
            type="humidity"
            value={currentData?.humidity ?? 65}
            unit="%"
            trend="down"
            delay={2}
          />
          <SensorCard
            type="cropHealth"
            value={currentData?.cropHealth ?? 78}
            unit=""
            trend="stable"
            delay={3}
          />
        </div>

        {/* Robot Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Robot Mode</p>
                <p className={`text-xl font-bold capitalize ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {robotStatus.mode}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Position</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  X: {robotStatus.position.x.toFixed(0)}, Y: {robotStatus.position.y.toFixed(0)}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last Update</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {new Date(robotStatus.lastUpdate).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Temperature & Humidity Trends
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Historical data visualization
              </p>
            </div>
            
            <div className="flex gap-2">
              {/* Time Range Selector */}
              <div className={`inline-flex rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-1`}>
                {(['day', 'week', 'month'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                      timeRange === range
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>

              {/* Chart Type Selector */}
              <button
                onClick={() => setChartType(chartType === 'line' ? 'area' : 'line')}
                className={`p-2 rounded-xl transition-colors ${
                  darkMode ? 'bg-gray-700 text-gray-300 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <SensorChart
            data={filteredData}
            type={chartType}
            dataKeys={['temperature', 'humidity']}
            height={350}
          />
        </motion.div>

        {/* Soil Moisture Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
        >
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Soil Moisture Levels
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Moisture percentage over time
            </p>
          </div>

          <SensorChart
            data={filteredData}
            type="bar"
            dataKeys={['soilMoisture']}
            height={300}
          />
        </motion.div>

        {/* Crop Health Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
        >
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Crop Health Index (NDVI)
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Vegetation health assessment
            </p>
          </div>

          <SensorChart
            data={filteredData}
            type="area"
            dataKeys={['cropHealth']}
            height={300}
          />
        </motion.div>
      </div>
    </Layout>
  );
};
