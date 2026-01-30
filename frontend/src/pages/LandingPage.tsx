import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Droplets, 
  Thermometer, 
  BarChart3, 
  Wifi, 
  Shield, 
  Zap, 
  ArrowRight,
  Bot,
  Globe,
  LineChart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const features = [
  {
    icon: Droplets,
    title: 'Soil Moisture Monitoring',
    description: 'Real-time soil moisture tracking to optimize irrigation and prevent water waste.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Thermometer,
    title: 'Temperature Sensing',
    description: 'Continuous temperature monitoring to protect crops from extreme conditions.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Leaf,
    title: 'Crop Health Analysis',
    description: 'NDVI-based crop health assessment using advanced imaging technology.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: BarChart3,
    title: 'Historical Analytics',
    description: 'Comprehensive data analysis with customizable date ranges and exports.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Wifi,
    title: 'Real-time Updates',
    description: 'Instant data transmission via WebSocket for live dashboard updates.',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Shield,
    title: 'Smart Alerts',
    description: 'Automated threshold-based alerts for critical field conditions.',
    color: 'from-red-500 to-orange-500'
  }
];

const stats = [
  { value: '99.9%', label: 'Uptime' },
  { value: '< 1s', label: 'Data Latency' },
  { value: '24/7', label: 'Monitoring' },
  { value: '50+', label: 'Sensor Types' }
];

export const LandingPage: React.FC = () => {
  const { darkMode, isAuthenticated } = useApp();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white text-sm mb-6">
                <Zap className="w-4 h-4" />
                <span>Next-Gen Agricultural Technology</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Smart Field
                <br />
                <span className="text-green-200">Monitoring Robot</span>
              </h1>
              
              <p className="text-lg text-green-100 mb-8 max-w-lg">
                Revolutionary IoT-powered agricultural monitoring system that delivers real-time insights about your field conditions, helping you make data-driven farming decisions.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to={isAuthenticated ? "/dashboard" : "/login"}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors shadow-lg"
                >
                  View Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/docs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* Robot Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Animated Circles */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/20"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-8 rounded-full border-2 border-white/30"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute inset-16 rounded-full border-2 border-white/40"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
                
                {/* Robot Icon */}
                <div className="absolute inset-24 bg-white/10 backdrop-blur-lg rounded-3xl flex items-center justify-center">
                  <Bot className="w-24 h-24 text-white" />
                </div>

                {/* Floating Sensor Icons */}
                <motion.div
                  className="absolute top-12 right-12 p-3 bg-blue-500 rounded-xl shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Droplets className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                  className="absolute bottom-12 left-12 p-3 bg-orange-500 rounded-xl shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Thermometer className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                  className="absolute bottom-24 right-8 p-3 bg-green-400 rounded-xl shadow-lg"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Leaf className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill={darkMode ? '#111827' : '#ffffff'}
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-24 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Powerful Features
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Everything you need to monitor, analyze, and optimize your agricultural operations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              How It Works
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Our seamless data pipeline ensures reliable monitoring from field to dashboard.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Bot, title: 'Robot Collects', desc: 'Sensors gather field data' },
              { icon: Wifi, title: 'Data Transmitted', desc: 'MQTT/REST API sync' },
              { icon: Globe, title: 'Cloud Processing', desc: 'Real-time analysis' },
              { icon: LineChart, title: 'Live Dashboard', desc: 'Instant visualization' }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {index < 3 && (
                  <div className={`hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500" />
                  </div>
                )}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {step.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-lg text-green-100 mb-8">
              Start monitoring your fields with precision and make data-driven decisions today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/docs"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
              >
                View Documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-gray-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AgriBot</span>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} AgriBot Field Monitoring System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
