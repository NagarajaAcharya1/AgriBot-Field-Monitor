import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, AlertCircle, Info, Check, Filter, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';

export const Alerts: React.FC = () => {
  const { alerts, acknowledgeAlert, darkMode } = useApp();
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [showAcknowledged, setShowAcknowledged] = useState(true);

  const filteredAlerts = alerts.filter(alert => {
    if (filter !== 'all' && alert.type !== filter) return false;
    if (!showAcknowledged && alert.acknowledged) return false;
    return true;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertCircle;
      default: return Info;
    }
  };

  const getAlertStyles = (type: string, acknowledged: boolean) => {
    const opacity = acknowledged ? 'opacity-60' : '';
    switch (type) {
      case 'critical':
        return `${opacity} border-red-500 bg-red-50 dark:bg-red-900/20`;
      case 'warning':
        return `${opacity} border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20`;
      default:
        return `${opacity} border-blue-500 bg-blue-50 dark:bg-blue-900/20`;
    }
  };

  const criticalCount = alerts.filter(a => a.type === 'critical' && !a.acknowledged).length;
  const warningCount = alerts.filter(a => a.type === 'warning' && !a.acknowledged).length;
  const infoCount = alerts.filter(a => a.type === 'info' && !a.acknowledged).length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Alerts & Notifications
            </h1>
            <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Monitor critical events and system warnings
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border-l-4 border-red-500 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Critical Alerts</p>
                <p className="text-3xl font-bold text-red-500">{criticalCount}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-2xl border-l-4 border-yellow-500 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Warnings</p>
                <p className="text-3xl font-bold text-yellow-500">{warningCount}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-yellow-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 rounded-2xl border-l-4 border-blue-500 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Info Notifications</p>
                <p className="text-3xl font-bold text-blue-500">{infoCount}</p>
              </div>
              <Info className="w-10 h-10 text-blue-500" />
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Filter:</span>
              <div className={`inline-flex rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-1`}>
                {(['all', 'critical', 'warning', 'info'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                      filter === type
                        ? type === 'critical' 
                          ? 'bg-red-500 text-white'
                          : type === 'warning'
                            ? 'bg-yellow-500 text-white'
                            : type === 'info'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showAcknowledged}
                onChange={(e) => setShowAcknowledged(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Show acknowledged
              </span>
            </label>
          </div>
        </motion.div>

        {/* Alerts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <AnimatePresence>
            {filteredAlerts.length === 0 ? (
              <div className={`p-12 rounded-2xl text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <Bell className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No alerts found
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  All systems are operating normally
                </p>
              </div>
            ) : (
              filteredAlerts.map((alert, index) => {
                const Icon = getAlertIcon(alert.type);
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-2xl border-l-4 ${getAlertStyles(alert.type, alert.acknowledged)} ${
                      darkMode ? '' : ''
                    } shadow-lg`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-xl ${
                        alert.type === 'critical' 
                          ? 'bg-red-100 dark:bg-red-800/30 text-red-600' 
                          : alert.type === 'warning' 
                            ? 'bg-yellow-100 dark:bg-yellow-800/30 text-yellow-600' 
                            : 'bg-blue-100 dark:bg-blue-800/30 text-blue-600'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-semibold uppercase px-2 py-0.5 rounded ${
                            alert.type === 'critical' 
                              ? 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200' 
                              : alert.type === 'warning' 
                                ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' 
                                : 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200'
                          }`}>
                            {alert.type}
                          </span>
                          {alert.acknowledged && (
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                            }`}>
                              Acknowledged
                            </span>
                          )}
                        </div>

                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {alert.message}
                        </p>

                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {format(new Date(alert.timestamp), 'MMM dd, yyyy HH:mm')}
                            </span>
                          </div>
                          <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            Sensor: {alert.sensorId}
                          </span>
                        </div>
                      </div>

                      {!alert.acknowledged && (
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className={`p-2 rounded-xl transition-colors ${
                            darkMode 
                              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                              : 'bg-white hover:bg-gray-100 text-gray-600'
                          } shadow`}
                          title="Acknowledge"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>

        {/* Alert Thresholds Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
        >
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Alert Thresholds
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Soil Moisture', warning: '< 40%', critical: '< 25%', color: 'blue' },
              { label: 'Temperature', warning: '> 32°C', critical: '> 38°C', color: 'orange' },
              { label: 'Humidity', warning: '> 85%', critical: '> 95%', color: 'purple' },
              { label: 'Crop Health', warning: '< 60', critical: '< 40', color: 'green' }
            ].map((threshold, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              >
                <p className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {threshold.label}
                </p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Warning</span>
                    <span className="text-sm font-medium text-yellow-600">{threshold.warning}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Critical</span>
                    <span className="text-sm font-medium text-red-600">{threshold.critical}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
