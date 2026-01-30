import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';

interface ChartProps {
  data: Array<{
    timestamp: Date;
    soilMoisture: number;
    temperature: number;
    humidity: number;
    cropHealth: number;
  }>;
  type?: 'line' | 'area' | 'bar';
  dataKeys?: string[];
  height?: number;
}

const chartColors = {
  soilMoisture: '#3B82F6',
  temperature: '#F97316',
  humidity: '#A855F7',
  cropHealth: '#10B981'
};

const chartLabels: Record<string, string> = {
  soilMoisture: 'Soil Moisture (%)',
  temperature: 'Temperature (°C)',
  humidity: 'Humidity (%)',
  cropHealth: 'Crop Health (NDVI)'
};

export const SensorChart: React.FC<ChartProps> = ({ 
  data, 
  type = 'line', 
  dataKeys = ['temperature', 'humidity'],
  height = 300
}) => {
  const { darkMode } = useApp();
  
  const formattedData = data.map(d => ({
    ...d,
    time: format(new Date(d.timestamp), 'HH:mm'),
    date: format(new Date(d.timestamp), 'MMM dd')
  }));

  const gridColor = darkMode ? '#374151' : '#E5E7EB';
  const textColor = darkMode ? '#9CA3AF' : '#6B7280';

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <p className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {chartLabels[entry.name] || entry.name}: {entry.value.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (type === 'area') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            {dataKeys.map((key) => (
              <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors[key as keyof typeof chartColors]} stopOpacity={0.3} />
                <stop offset="95%" stopColor={chartColors[key as keyof typeof chartColors]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="time" stroke={textColor} fontSize={12} />
          <YAxis stroke={textColor} fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {dataKeys.map((key) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              name={key}
              stroke={chartColors[key as keyof typeof chartColors]}
              fill={`url(#gradient-${key})`}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="time" stroke={textColor} fontSize={12} />
          <YAxis stroke={textColor} fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {dataKeys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              name={key}
              fill={chartColors[key as keyof typeof chartColors]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="time" stroke={textColor} fontSize={12} />
        <YAxis stroke={textColor} fontSize={12} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {dataKeys.map((key) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            name={key}
            stroke={chartColors[key as keyof typeof chartColors]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
