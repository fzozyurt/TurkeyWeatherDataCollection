'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from '@/types/device';

interface DeviceBarChartProps {
  data: ChartData[];
  title: string;
  color?: string;
  unit?: string;
}

export default function DeviceBarChart({ data, title, color = '#10B981', unit = '' }: DeviceBarChartProps) {
  return (
    <div className="w-full h-96 p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
          <Bar 
            dataKey="value" 
            fill={color}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}