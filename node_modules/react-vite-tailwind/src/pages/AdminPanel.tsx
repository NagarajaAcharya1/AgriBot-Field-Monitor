import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Users, 
  Radio, 
  Sliders, 
  Database,
  Save,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';
import { Sensor } from '../types';

export const AdminPanel: React.FC = () => {
  const { sensors, addSensor, removeSensor, thresholds, updateThreshold, darkMode, user } = useApp();
  const [activeTab, setActiveTab] = useState<'sensors' | 'thresholds' | 'users' | 'logs'>('sensors');
  const [showAddSensor, setShowAddSensor] = useState(false);
  const [newSensor, setNewSensor] = useState({
    name: '',
    type: 'soil_moisture' as Sensor['type'],
    location: { x: 50, y: 50 },
    status: 'active' as Sensor['status'],
    lastReading: 0,
    unit: '%'
  });

  const handleAddSensor = () => {
    addSensor(newSensor);
    setShowAddSensor(false);
    setNewSensor({
      name: '',
      type: 'soil_moisture',
      location: { x: 50, y: 50 },
      status: 'active',
      lastReading: 0,
      unit: '%'
    });
  };

  if (user?.role !== 'admin') {
    return (
      <Layout>
        <div className={`min-h-[60vh] flex items-center justify-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <div className="text-center">
            <Settings className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p>You need admin privileges to access this page.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Admin Panel
          </h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage sensors, thresholds, and system settings
          </p>
        </div>

        {/* Tabs */}
        <div className={`p-1 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg inline-flex`}>
          {[
            { id: 'sensors', label: 'Sensors', icon: Radio },
            { id: 'thresholds', label: 'Thresholds', icon: Sliders },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'logs', label: 'System Logs', icon: Database }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                  : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Sensors Tab */}
        {activeTab === 'sensors' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Add Sensor Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddSensor(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Sensor
              </button>
            </div>

            {/* Add Sensor Modal */}
            {showAddSensor && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`w-full max-w-md p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Add New Sensor
                    </h3>
                    <button
                      onClick={() => setShowAddSensor(false)}
                      className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Sensor Name
                      </label>
                      <input
                        type="text"
                        value={newSensor.name}
                        onChange={(e) => setNewSensor({ ...newSensor, name: e.target.value })}
                        className={`w-full px-4 py-2 rounded-xl border ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-gray-50 border-gray-200 text-gray-900'
                        }`}
                        placeholder="e.g., Soil Sensor Zone A"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Sensor Type
                      </label>
                      <select
                        value={newSensor.type}
                        onChange={(e) => setNewSensor({ ...newSensor, type: e.target.value as Sensor['type'] })}
                        className={`w-full px-4 py-2 rounded-xl border ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-gray-50 border-gray-200 text-gray-900'
                        }`}
                      >
                        <option value="soil_moisture">Soil Moisture</option>
                        <option value="temperature">Temperature</option>
                        <option value="humidity">Humidity</option>
                        <option value="crop_health">Crop Health</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Position X (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={newSensor.location.x}
                          onChange={(e) => setNewSensor({ ...newSensor, location: { ...newSensor.location, x: Number(e.target.value) } })}
                          className={`w-full px-4 py-2 rounded-xl border ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-gray-50 border-gray-200 text-gray-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Position Y (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={newSensor.location.y}
                          onChange={(e) => setNewSensor({ ...newSensor, location: { ...newSensor.location, y: Number(e.target.value) } })}
                          className={`w-full px-4 py-2 rounded-xl border ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-gray-50 border-gray-200 text-gray-900'
                          }`}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleAddSensor}
                      disabled={!newSensor.name}
                      className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Add Sensor
                    </button>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Sensors List */}
            <div className={`rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                    <tr>
                      <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Sensor Name
                      </th>
                      <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Type
                      </th>
                      <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Status
                      </th>
                      <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Location
                      </th>
                      <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Last Reading
                      </th>
                      <th className={`text-right py-4 px-6 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensors.map((sensor) => (
                      <tr
                        key={sensor.id}
                        className={`border-t ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}
                      >
                        <td className={`py-4 px-6 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                          {sensor.name}
                        </td>
                        <td className={`py-4 px-6 capitalize ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {sensor.type.replace('_', ' ')}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            sensor.status === 'active' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-400' 
                              : sensor.status === 'maintenance' 
                                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800/30 dark:text-yellow-400' 
                                : 'bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-400'
                          }`}>
                            {sensor.status}
                          </span>
                        </td>
                        <td className={`py-4 px-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          ({sensor.location.x}, {sensor.location.y})
                        </td>
                        <td className={`py-4 px-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {sensor.lastReading.toFixed(1)} {sensor.unit}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}>
                              <Edit className="w-4 h-4 text-blue-500" />
                            </button>
                            <button
                              onClick={() => removeSensor(sensor.id)}
                              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Thresholds Tab */}
        {activeTab === 'thresholds' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Alert Thresholds Configuration
            </h2>
            <div className="space-y-6">
              {thresholds.map((threshold) => (
                <div
                  key={threshold.id}
                  className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <p className={`font-medium capitalize ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {threshold.sensorType.replace('_', ' ')}
                      </p>
                      <p className={`text-sm ${
                        threshold.alertLevel === 'critical' ? 'text-red-500' : 'text-yellow-500'
                      }`}>
                        {threshold.alertLevel.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <label className={`block text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Min Value
                        </label>
                        <input
                          type="number"
                          value={threshold.minValue}
                          onChange={(e) => updateThreshold(threshold.id, { minValue: Number(e.target.value) })}
                          className={`w-24 px-3 py-2 rounded-lg border ${
                            darkMode 
                              ? 'bg-gray-600 border-gray-500 text-white' 
                              : 'bg-white border-gray-200 text-gray-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Max Value
                        </label>
                        <input
                          type="number"
                          value={threshold.maxValue}
                          onChange={(e) => updateThreshold(threshold.id, { maxValue: Number(e.target.value) })}
                          className={`w-24 px-3 py-2 rounded-lg border ${
                            darkMode 
                              ? 'bg-gray-600 border-gray-500 text-white' 
                              : 'bg-white border-gray-200 text-gray-900'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              User Management
            </h2>
            <div className="space-y-4">
              {[
                { id: '1', name: 'Admin User', email: 'admin@agribot.com', role: 'admin', status: 'active' },
                { id: '2', name: 'Farm Manager', email: 'manager@agribot.com', role: 'user', status: 'active' },
                { id: '3', name: 'Field Operator', email: 'operator@agribot.com', role: 'user', status: 'inactive' }
              ].map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-800/30 dark:text-purple-400' 
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-400'
                    }`}>
                      {user.role}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-400'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              System Logs
            </h2>
            <div className={`font-mono text-sm space-y-2 p-4 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} max-h-96 overflow-y-auto`}>
              {[
                { time: '2024-01-15 14:32:15', level: 'INFO', message: 'Robot position updated: (45, 62)' },
                { time: '2024-01-15 14:32:10', level: 'INFO', message: 'Sensor data received from sensor-1' },
                { time: '2024-01-15 14:32:05', level: 'WARN', message: 'Soil moisture below threshold in Zone A' },
                { time: '2024-01-15 14:32:00', level: 'INFO', message: 'WebSocket connection established' },
                { time: '2024-01-15 14:31:55', level: 'INFO', message: 'Database sync completed' },
                { time: '2024-01-15 14:31:50', level: 'ERROR', message: 'Failed to connect to sensor-4' },
                { time: '2024-01-15 14:31:45', level: 'INFO', message: 'System health check passed' },
                { time: '2024-01-15 14:31:40', level: 'INFO', message: 'Robot mode changed to patrolling' }
              ].map((log, index) => (
                <div key={index} className="flex gap-4">
                  <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>{log.time}</span>
                  <span className={`font-medium ${
                    log.level === 'ERROR' ? 'text-red-500' : log.level === 'WARN' ? 'text-yellow-500' : 'text-green-500'
                  }`}>
                    [{log.level}]
                  </span>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{log.message}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};
