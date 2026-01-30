import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Filter, Table, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';
import { useApp } from '../context/AppContext';
import { SensorChart } from '../components/Charts';
import { Layout } from '../components/Layout';

export const HistoricalData: React.FC = () => {
  const { historicalData, darkMode, dateRange, setDateRange } = useApp();
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('chart');
  const [selectedSensor, setSelectedSensor] = useState<'all' | 'soilMoisture' | 'temperature' | 'humidity' | 'cropHealth'>('all');

  const filteredData = useMemo(() => {
    return historicalData.filter(d => {
      const timestamp = new Date(d.timestamp).getTime();
      return timestamp >= dateRange.start.getTime() && timestamp <= dateRange.end.getTime();
    });
  }, [historicalData, dateRange]);

  const downloadCSV = () => {
    const headers = ['Timestamp', 'Soil Moisture (%)', 'Temperature (°C)', 'Humidity (%)', 'Crop Health (NDVI)', 'Sensor ID'];
    const rows = filteredData.map(d => [
      format(new Date(d.timestamp), 'yyyy-MM-dd HH:mm:ss'),
      d.soilMoisture.toFixed(2),
      d.temperature.toFixed(2),
      d.humidity.toFixed(2),
      d.cropHealth.toFixed(2),
      d.sensorId
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agribot-data-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getChartDataKeys = () => {
    if (selectedSensor === 'all') {
      return ['soilMoisture', 'temperature', 'humidity', 'cropHealth'];
    }
    return [selectedSensor];
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Historical Data
            </h1>
            <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Analyze and export your field data
            </p>
          </div>

          <button
            onClick={downloadCSV}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Date Range */}
            <div className="flex-1">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Calendar className="w-4 h-4 inline mr-2" />
                Date Range
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="date"
                    value={format(dateRange.start, 'yyyy-MM-dd')}
                    onChange={(e) => setDateRange({ ...dateRange, start: new Date(e.target.value) })}
                    className={`w-full px-4 py-2 rounded-xl border transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-200 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500`}
                  />
                </div>
                <span className={`self-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>to</span>
                <div className="flex-1">
                  <input
                    type="date"
                    value={format(dateRange.end, 'yyyy-MM-dd')}
                    onChange={(e) => setDateRange({ ...dateRange, end: new Date(e.target.value) })}
                    className={`w-full px-4 py-2 rounded-xl border transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-200 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500`}
                  />
                </div>
              </div>
            </div>

            {/* Sensor Filter */}
            <div className="w-full lg:w-64">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Filter className="w-4 h-4 inline mr-2" />
                Sensor Type
              </label>
              <select
                value={selectedSensor}
                onChange={(e) => setSelectedSensor(e.target.value as typeof selectedSensor)}
                className={`w-full px-4 py-2 rounded-xl border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500`}
              >
                <option value="all">All Sensors</option>
                <option value="soilMoisture">Soil Moisture</option>
                <option value="temperature">Temperature</option>
                <option value="humidity">Humidity</option>
                <option value="cropHealth">Crop Health</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="w-full lg:w-auto">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                View Mode
              </label>
              <div className={`inline-flex rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-1`}>
                <button
                  onClick={() => setViewMode('chart')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'chart'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Chart
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'table'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Table className="w-4 h-4" />
                  Table
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {viewMode === 'chart' ? 'Sensor Data Visualization' : 'Sensor Data Table'}
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {filteredData.length} records found
              </p>
            </div>
          </div>

          {viewMode === 'chart' ? (
            <SensorChart
              data={filteredData.slice(-100)}
              type="area"
              dataKeys={getChartDataKeys()}
              height={400}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Timestamp
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Soil Moisture
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Temperature
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Humidity
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Crop Health
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Sensor ID
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(0, 50).map((row) => (
                    <tr
                      key={row.id}
                      className={`border-b transition-colors ${
                        darkMode 
                          ? 'border-gray-700 hover:bg-gray-700/50' 
                          : 'border-gray-100 hover:bg-gray-50'
                      }`}
                    >
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {format(new Date(row.timestamp), 'MMM dd, HH:mm')}
                      </td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className={`px-2 py-1 rounded-lg text-sm ${
                          row.soilMoisture < 30 
                            ? 'bg-red-100 text-red-700' 
                            : row.soilMoisture < 50 
                              ? 'bg-yellow-100 text-yellow-700' 
                              : 'bg-green-100 text-green-700'
                        }`}>
                          {row.soilMoisture.toFixed(1)}%
                        </span>
                      </td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {row.temperature.toFixed(1)}°C
                      </td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {row.humidity.toFixed(1)}%
                      </td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {row.cropHealth.toFixed(1)}
                      </td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {row.sensorId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredData.length > 50 && (
                <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Showing 50 of {filteredData.length} records. Export to CSV for complete data.
                </p>
              )}
            </div>
          )}
        </motion.div>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Avg Soil Moisture', value: filteredData.reduce((a, b) => a + b.soilMoisture, 0) / filteredData.length || 0, unit: '%', color: 'from-blue-500 to-cyan-500' },
            { label: 'Avg Temperature', value: filteredData.reduce((a, b) => a + b.temperature, 0) / filteredData.length || 0, unit: '°C', color: 'from-orange-500 to-red-500' },
            { label: 'Avg Humidity', value: filteredData.reduce((a, b) => a + b.humidity, 0) / filteredData.length || 0, unit: '%', color: 'from-purple-500 to-pink-500' },
            { label: 'Avg Crop Health', value: filteredData.reduce((a, b) => a + b.cropHealth, 0) / filteredData.length || 0, unit: '', color: 'from-green-500 to-emerald-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
            >
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value.toFixed(1)}{stat.unit}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
