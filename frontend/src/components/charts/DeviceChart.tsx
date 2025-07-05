'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from '@/types/device';

interface DeviceChartProps {
  data: ChartData[];
  title: string;
  color?: string;
  unit?: string;
}

export default function DeviceChart({ data, title, color = '#3B82F6', unit = '' }: DeviceChartProps) {
  return (
    <div className="w-full h-96 p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
          />
          <YAxis 
            label={{ value: unit, angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            labelFormatter={(value) => `Time: ${new Date(value).toLocaleString()}`}
            formatter={(value) => [`${value}${unit}`, title]}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}