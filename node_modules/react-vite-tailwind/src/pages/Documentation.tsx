import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  Wifi, 
  Server, 
  ChevronRight,
  Layers,
  GitBranch,
  Zap,
  Shield,
  Cloud
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';

const sections = [
  { id: 'overview', label: 'System Overview', icon: Layers },
  { id: 'architecture', label: 'Architecture', icon: GitBranch },
  { id: 'hardware', label: 'Hardware Components', icon: Cpu },
  { id: 'dataflow', label: 'Data Flow', icon: Wifi },
  { id: 'database', label: 'Database Schema', icon: Database },
  { id: 'api', label: 'API Reference', icon: Server },
  { id: 'scalability', label: 'Scalability', icon: Cloud },
  { id: 'future', label: 'Future Enhancements', icon: Zap }
];

export const Documentation: React.FC = () => {
  const { darkMode } = useApp();
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Documentation
          </h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Complete system documentation and technical reference
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-1 p-4 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg h-fit sticky top-24`}
          >
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : darkMode 
                        ? 'text-gray-400 hover:bg-gray-700 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{section.label}</span>
                  <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                    activeSection === section.id ? 'rotate-90' : ''
                  }`} />
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Content Area */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`lg:col-span-3 p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            {activeSection === 'overview' && (
              <div className="prose max-w-none">
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  System Overview
                </h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  The AgriBot Field Monitoring System is a comprehensive IoT-based solution designed to revolutionize 
                  agricultural practices through real-time data collection, analysis, and visualization.
                </p>
                
                <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                  <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Key Features
                  </h3>
                  <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>Real-time sensor data monitoring (Soil Moisture, Temperature, Humidity, Crop Health)</li>
                    <li>Interactive field map with robot tracking</li>
                    <li>Historical data analysis with export capabilities</li>
                    <li>Customizable alert thresholds and notifications</li>
                    <li>Role-based access control (Admin/User)</li>
                    <li>Dark mode support for better visibility</li>
                    <li>Mobile-responsive design</li>
                  </ul>
                </div>

                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Technology Stack
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Frontend', items: ['React 18+', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts'] },
                    { title: 'Backend', items: ['Node.js', 'Express.js', 'WebSocket', 'REST API', 'JWT Auth'] },
                    { title: 'Database', items: ['MongoDB', 'Time-series collections', 'Indexing optimization'] },
                    { title: 'IoT Layer', items: ['MQTT Protocol', 'ESP32/Arduino', 'Sensor modules', 'Wireless comm'] }
                  ].map((stack, index) => (
                    <div key={index} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {stack.title}
                      </h4>
                      <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stack.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'architecture' && (
              <div className="prose max-w-none">
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  System Architecture
                </h2>
                
                {/* Architecture Diagram */}
                <div className={`p-6 rounded-xl mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex flex-col items-center space-y-4">
                    {/* Field Layer */}
                    <div className={`w-full p-4 rounded-xl text-center ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                      <p className="font-semibold text-green-600">Field Layer</p>
                      <div className="flex justify-center gap-4 mt-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>AgriBot Robot</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>Soil Sensors</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>Weather Stations</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>Cameras</span>
                      </div>
                    </div>
                    
                    <div className={`text-2xl ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>↓</div>
                    
                    {/* Communication Layer */}
                    <div className={`w-full p-4 rounded-xl text-center ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                      <p className="font-semibold text-blue-600">Communication Layer</p>
                      <div className="flex justify-center gap-4 mt-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>MQTT Broker</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>REST API Gateway</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>WebSocket Server</span>
                      </div>
                    </div>
                    
                    <div className={`text-2xl ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>↓</div>
                    
                    {/* Backend Layer */}
                    <div className={`w-full p-4 rounded-xl text-center ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                      <p className="font-semibold text-purple-600">Backend Layer</p>
                      <div className="flex justify-center gap-4 mt-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>Node.js Server</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>Data Processing</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>Alert Engine</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>Auth Service</span>
                      </div>
                    </div>
                    
                    <div className={`text-2xl ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>↓</div>
                    
                    {/* Data Layer */}
                    <div className={`w-full p-4 rounded-xl text-center ${darkMode ? 'bg-orange-900/30' : 'bg-orange-100'}`}>
                      <p className="font-semibold text-orange-600">Data Layer</p>
                      <div className="flex justify-center gap-4 mt-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>MongoDB</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>Time-Series DB</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>Cache (Redis)</span>
                      </div>
                    </div>
                    
                    <div className={`text-2xl ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>↓</div>
                    
                    {/* Presentation Layer */}
                    <div className={`w-full p-4 rounded-xl text-center ${darkMode ? 'bg-teal-900/30' : 'bg-teal-100'}`}>
                      <p className="font-semibold text-teal-600">Presentation Layer</p>
                      <div className="flex justify-center gap-4 mt-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>React Dashboard</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>Mobile App</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>Admin Panel</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Design Principles
                </h3>
                <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li><strong>Modularity:</strong> Each component can be developed, tested, and deployed independently</li>
                  <li><strong>Scalability:</strong> Horizontal scaling support for handling multiple fields and robots</li>
                  <li><strong>Reliability:</strong> Built-in error handling and automatic reconnection mechanisms</li>
                  <li><strong>Security:</strong> End-to-end encryption and role-based access control</li>
                </ul>
              </div>
            )}

            {activeSection === 'hardware' && (
              <div className="prose max-w-none">
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Hardware Components
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {[
                    {
                      title: 'Microcontroller',
                      component: 'ESP32-WROOM-32',
                      specs: ['Dual-core 240MHz', 'WiFi + Bluetooth', '520KB SRAM', '4MB Flash'],
                      color: 'blue'
                    },
                    {
                      title: 'Soil Moisture Sensor',
                      component: 'Capacitive Soil Sensor v1.2',
                      specs: ['Corrosion resistant', 'Analog output', '3.3V-5V operating', 'Fast response'],
                      color: 'cyan'
                    },
                    {
                      title: 'Temperature & Humidity',
                      component: 'DHT22 / AM2302',
                      specs: ['±0.5°C accuracy', '0-100% RH range', '2s sampling rate', 'Digital output'],
                      color: 'orange'
                    },
                    {
                      title: 'Crop Health Camera',
                      component: 'OV2640 + NIR Filter',
                      specs: ['2MP resolution', 'NDVI capable', 'I2C/SPI interface', 'Low power'],
                      color: 'green'
                    },
                    {
                      title: 'GPS Module',
                      component: 'NEO-6M',
                      specs: ['5Hz update rate', '-165dBm sensitivity', 'UART interface', 'Low power'],
                      color: 'purple'
                    },
                    {
                      title: 'Motor Driver',
                      component: 'L298N Dual H-Bridge',
                      specs: ['2A per channel', '5V-35V range', 'PWM speed control', 'Direction control'],
                      color: 'red'
                    }
                  ].map((hw, index) => (
                    <div key={index} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-${hw.color}-500/20 flex items-center justify-center`}>
                          <Cpu className={`w-5 h-5 text-${hw.color}-500`} />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {hw.title}
                          </h4>
                          <p className={`text-sm font-mono ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                            {hw.component}
                          </p>
                          <ul className={`text-xs mt-2 space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {hw.specs.map((spec, i) => (
                              <li key={i}>• {spec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Robot Chassis Specifications
                </h3>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <ul className={`grid sm:grid-cols-2 gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li><strong>Dimensions:</strong> 40cm × 30cm × 25cm</li>
                    <li><strong>Weight:</strong> 5kg (with battery)</li>
                    <li><strong>Drive System:</strong> 4WD with differential steering</li>
                    <li><strong>Max Speed:</strong> 0.5 m/s</li>
                    <li><strong>Battery:</strong> 12V 10Ah LiPo</li>
                    <li><strong>Runtime:</strong> 4-6 hours</li>
                    <li><strong>Ground Clearance:</strong> 8cm</li>
                    <li><strong>Wheel Type:</strong> All-terrain rubber</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'dataflow' && (
              <div className="prose max-w-none">
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Data Flow
                </h2>
                
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  The data flow in AgriBot follows a structured pipeline from sensor collection to user visualization.
                </p>

                <div className={`p-6 rounded-xl mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="space-y-6">
                    {[
                      { step: 1, title: 'Data Collection', desc: 'Sensors collect environmental data (soil moisture, temperature, humidity, NDVI)', icon: '📡' },
                      { step: 2, title: 'Local Processing', desc: 'ESP32 processes raw data, applies calibration, and formats JSON payload', icon: '⚙️' },
                      { step: 3, title: 'Transmission', desc: 'Data sent via MQTT (QoS 1) or HTTP POST to server endpoint', icon: '📤' },
                      { step: 4, title: 'Server Processing', desc: 'Node.js validates, enriches, and stores data in MongoDB', icon: '🖥️' },
                      { step: 5, title: 'Alert Evaluation', desc: 'Alert engine checks thresholds and generates notifications', icon: '🚨' },
                      { step: 6, title: 'Real-time Broadcast', desc: 'WebSocket pushes updates to all connected dashboard clients', icon: '📺' },
                      { step: 7, title: 'Visualization', desc: 'React dashboard renders charts, cards, and maps in real-time', icon: '📊' }
                    ].map((flow) => (
                      <div key={flow.step} className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-r from-green-500 to-emerald-600`}>
                          {flow.step}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {flow.icon} {flow.title}
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {flow.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Sample Data Payload
                </h3>
                <pre className={`p-4 rounded-xl overflow-x-auto text-sm ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-900 text-green-400'}`}>
{`{
  "deviceId": "agribot-001",
  "timestamp": "2024-01-15T14:32:15.000Z",
  "location": { "lat": 28.6139, "lng": 77.2090 },
  "sensors": {
    "soilMoisture": { "value": 42.5, "unit": "%" },
    "temperature": { "value": 28.3, "unit": "°C" },
    "humidity": { "value": 65.2, "unit": "%" },
    "cropHealth": { "value": 0.78, "unit": "NDVI" }
  },
  "robot": {
    "battery": 85,
    "mode": "patrolling",
    "speed": 0.3
  }
}`}
                </pre>
              </div>
            )}

            {activeSection === 'database' && (
              <div className="prose max-w-none">
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Database Schema
                </h2>
                
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  MongoDB collections optimized for time-series data and quick lookups.
                </p>

                {[
                  {
                    collection: 'sensor_readings',
                    fields: [
                      { name: '_id', type: 'ObjectId', desc: 'Primary key' },
                      { name: 'deviceId', type: 'String', desc: 'Robot/sensor identifier' },
                      { name: 'timestamp', type: 'Date', desc: 'Reading timestamp (indexed)' },
                      { name: 'soilMoisture', type: 'Number', desc: 'Soil moisture percentage' },
                      { name: 'temperature', type: 'Number', desc: 'Temperature in Celsius' },
                      { name: 'humidity', type: 'Number', desc: 'Humidity percentage' },
                      { name: 'cropHealth', type: 'Number', desc: 'NDVI value (0-1)' },
                      { name: 'location', type: 'GeoJSON', desc: 'GPS coordinates' }
                    ]
                  },
                  {
                    collection: 'users',
                    fields: [
                      { name: '_id', type: 'ObjectId', desc: 'Primary key' },
                      { name: 'email', type: 'String', desc: 'User email (unique, indexed)' },
                      { name: 'passwordHash', type: 'String', desc: 'Bcrypt hashed password' },
                      { name: 'name', type: 'String', desc: 'Display name' },
                      { name: 'role', type: 'String', desc: 'admin | user' },
                      { name: 'createdAt', type: 'Date', desc: 'Account creation date' }
                    ]
                  },
                  {
                    collection: 'alerts',
                    fields: [
                      { name: '_id', type: 'ObjectId', desc: 'Primary key' },
                      { name: 'type', type: 'String', desc: 'critical | warning | info' },
                      { name: 'message', type: 'String', desc: 'Alert message' },
                      { name: 'sensorId', type: 'String', desc: 'Related sensor' },
                      { name: 'timestamp', type: 'Date', desc: 'Alert timestamp' },
                      { name: 'acknowledged', type: 'Boolean', desc: 'Acknowledgment status' }
                    ]
                  }
                ].map((schema, index) => (
                  <div key={index} className={`mb-6 rounded-xl overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className={`px-4 py-3 font-semibold font-mono ${darkMode ? 'bg-gray-600 text-green-400' : 'bg-gray-200 text-green-700'}`}>
                      {schema.collection}
                    </div>
                    <div className="p-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className={`border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                            <th className={`text-left py-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Field</th>
                            <th className={`text-left py-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type</th>
                            <th className={`text-left py-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schema.fields.map((field, i) => (
                            <tr key={i} className={`border-b ${darkMode ? 'border-gray-600' : 'border-gray-100'}`}>
                              <td className={`py-2 font-mono ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{field.name}</td>
                              <td className={`py-2 font-mono ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{field.type}</td>
                              <td className={`py-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{field.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'api' && (
              <div className="prose max-w-none">
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  API Reference
                </h2>
                
                {[
                  { method: 'GET', endpoint: '/api/sensors/current', desc: 'Get current sensor readings', auth: true },
                  { method: 'GET', endpoint: '/api/sensors/history', desc: 'Get historical data with date range', auth: true },
                  { method: 'POST', endpoint: '/api/sensors/data', desc: 'Submit sensor data (IoT devices)', auth: true },
                  { method: 'GET', endpoint: '/api/robot/status', desc: 'Get robot status and position', auth: true },
                  { method: 'POST', endpoint: '/api/auth/login', desc: 'User authentication', auth: false },
                  { method: 'POST', endpoint: '/api/auth/register', desc: 'User registration', auth: false },
                  { method: 'GET', endpoint: '/api/alerts', desc: 'Get all alerts', auth: true },
                  { method: 'PUT', endpoint: '/api/alerts/:id/acknowledge', desc: 'Acknowledge an alert', auth: true },
                  { method: 'GET', endpoint: '/api/admin/sensors', desc: 'List all sensors (admin)', auth: true },
                  { method: 'POST', endpoint: '/api/admin/sensors', desc: 'Add new sensor (admin)', auth: true },
                  { method: 'DELETE', endpoint: '/api/admin/sensors/:id', desc: 'Remove sensor (admin)', auth: true }
                ].map((api, index) => (
                  <div key={index} className={`flex items-center gap-4 p-3 rounded-xl mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      api.method === 'GET' 
                        ? 'bg-blue-500/20 text-blue-500' 
                        : api.method === 'POST' 
                          ? 'bg-green-500/20 text-green-500'
                          : api.method === 'PUT'
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : 'bg-red-500/20 text-red-500'
                    }`}>
                      {api.method}
                    </span>
                    <code className={`font-mono text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {api.endpoint}
                    </code>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {api.desc}
                    </span>
                    {api.auth && (
                      <Shield className="w-4 h-4 text-green-500 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'scalability' && (
              <div className="prose max-w-none">
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Scalability Considerations
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {[
                    {
                      title: 'Horizontal Scaling',
                      desc: 'Add more server instances behind a load balancer to handle increased traffic',
                      icon: '⚖️'
                    },
                    {
                      title: 'Database Sharding',
                      desc: 'Partition data by field/region for distributed storage and faster queries',
                      icon: '📦'
                    },
                    {
                      title: 'Message Queue',
                      desc: 'Use RabbitMQ/Kafka for decoupling sensor data ingestion from processing',
                      icon: '📨'
                    },
                    {
                      title: 'CDN Integration',
                      desc: 'Serve static assets via CDN for global low-latency access',
                      icon: '🌐'
                    },
                    {
                      title: 'Caching Layer',
                      desc: 'Redis caching for frequently accessed data and session storage',
                      icon: '⚡'
                    },
                    {
                      title: 'Microservices',
                      desc: 'Split into independent services for auth, sensors, alerts, analytics',
                      icon: '🧩'
                    }
                  ].map((item, index) => (
                    <div key={index} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Performance Metrics
                </h3>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li><strong>Sensor Data Ingestion:</strong> Up to 10,000 readings/second</li>
                    <li><strong>API Response Time:</strong> &lt; 100ms (p95)</li>
                    <li><strong>WebSocket Latency:</strong> &lt; 50ms</li>
                    <li><strong>Dashboard Load Time:</strong> &lt; 2 seconds</li>
                    <li><strong>Concurrent Users:</strong> 1,000+ per server instance</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'future' && (
              <div className="prose max-w-none">
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Future Enhancements
                </h2>
                
                <div className="space-y-4">
                  {[
                    {
                      title: 'AI-Powered Crop Health Prediction',
                      desc: 'Machine learning models to predict crop diseases and yield based on sensor data patterns',
                      status: 'Planned',
                      priority: 'High'
                    },
                    {
                      title: 'Drone Integration',
                      desc: 'Support for agricultural drones for aerial imaging and large-scale field coverage',
                      status: 'Research',
                      priority: 'Medium'
                    },
                    {
                      title: 'Automated Irrigation Control',
                      desc: 'Direct integration with irrigation systems for automated water management',
                      status: 'In Progress',
                      priority: 'High'
                    },
                    {
                      title: 'Mobile Native App',
                      desc: 'React Native mobile app for iOS and Android with offline support',
                      status: 'Planned',
                      priority: 'High'
                    },
                    {
                      title: 'Voice Assistant Integration',
                      desc: 'Query field data and receive alerts via Alexa/Google Assistant',
                      status: 'Planned',
                      priority: 'Low'
                    },
                    {
                      title: 'Weather API Integration',
                      desc: 'Combine sensor data with weather forecasts for predictive analytics',
                      status: 'Planned',
                      priority: 'Medium'
                    },
                    {
                      title: 'Multi-language Support',
                      desc: 'Internationalization for global deployment',
                      status: 'Planned',
                      priority: 'Medium'
                    },
                    {
                      title: 'PWA Support',
                      desc: 'Progressive Web App for installation and offline access',
                      status: 'In Progress',
                      priority: 'High'
                    }
                  ].map((feature, index) => (
                    <div key={index} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {feature.title}
                          </h4>
                          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {feature.desc}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            feature.status === 'In Progress' 
                              ? 'bg-blue-500/20 text-blue-500' 
                              : feature.status === 'Planned'
                                ? 'bg-yellow-500/20 text-yellow-500'
                                : 'bg-purple-500/20 text-purple-500'
                          }`}>
                            {feature.status}
                          </span>
                          <span className={`text-xs ${
                            feature.priority === 'High' 
                              ? 'text-red-500' 
                              : feature.priority === 'Medium'
                                ? 'text-yellow-500'
                                : 'text-gray-500'
                          }`}>
                            {feature.priority} Priority
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
