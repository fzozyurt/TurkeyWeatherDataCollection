'use client';

import { useState } from 'react';
import { Device, ChartData } from '@/types/device';
import DeviceChart from '@/components/charts/DeviceChart';
import { X, TrendingUp, Thermometer, Droplets, Wind } from 'lucide-react';

interface DeviceDetailsProps {
  device: Device;
  onClose: () => void;
}

export default function DeviceDetails({ device, onClose }: DeviceDetailsProps) {
  const [selectedMetric, setSelectedMetric] = useState<'temperature' | 'humidity' | 'pressure' | 'windSpeed'>('temperature');
  
  // Mock data for demonstration - in real app, this would come from API
  const generateMockData = (metric: string): ChartData[] => {
    const now = new Date();
    const data: ChartData[] = [];
    
    for (let i = 0; i < 24; i++) {
      const timestamp = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
      let value = 0;
      
      switch (metric) {
        case 'temperature':
          value = 20 + Math.sin(i * 0.5) * 10 + Math.random() * 5;
          break;
        case 'humidity':
          value = 60 + Math.sin(i * 0.3) * 20 + Math.random() * 10;
          break;
        case 'pressure':
          value = 1013 + Math.sin(i * 0.2) * 15 + Math.random() * 5;
          break;
        case 'windSpeed':
          value = 5 + Math.sin(i * 0.4) * 8 + Math.random() * 3;
          break;
      }
      
      data.push({
        timestamp: timestamp.toISOString(),
        value: Math.round(value * 10) / 10,
        label: metric
      });
    }
    
    return data;
  };

  const chartData = generateMockData(selectedMetric);
  
  const getChartConfig = (metric: string) => {
    switch (metric) {
      case 'temperature':
        return { title: 'Temperature', color: '#EF4444', unit: '°C' };
      case 'humidity':
        return { title: 'Humidity', color: '#3B82F6', unit: '%' };
      case 'pressure':
        return { title: 'Pressure', color: '#8B5CF6', unit: ' hPa' };
      case 'windSpeed':
        return { title: 'Wind Speed', color: '#10B981', unit: ' m/s' };
      default:
        return { title: 'Temperature', color: '#EF4444', unit: '°C' };
    }
  };

  const config = getChartConfig(selectedMetric);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{device.name}</h2>
              <p className="text-gray-600">{device.location}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <button
              onClick={() => setSelectedMetric('temperature')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedMetric === 'temperature' 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Thermometer className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Temperature</span>
            </button>
            
            <button
              onClick={() => setSelectedMetric('humidity')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedMetric === 'humidity' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Droplets className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Humidity</span>
            </button>
            
            <button
              onClick={() => setSelectedMetric('pressure')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedMetric === 'pressure' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <TrendingUp className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Pressure</span>
            </button>
            
            <button
              onClick={() => setSelectedMetric('windSpeed')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedMetric === 'windSpeed' 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Wind className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Wind Speed</span>
            </button>
          </div>

          <div className="mb-6">
            <DeviceChart
              data={chartData}
              title={config.title}
              color={config.color}
              unit={config.unit}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Device Information</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Type:</strong> {device.type.replace('_', ' ')}</div>
                <div><strong>Status:</strong> {device.status}</div>
                <div><strong>Last Seen:</strong> {new Date(device.lastSeen).toLocaleString()}</div>
                {device.batteryLevel && <div><strong>Battery:</strong> {device.batteryLevel}%</div>}
              </div>
            </div>

            {device.coordinates && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
                <div className="text-sm">
                  <div><strong>Latitude:</strong> {device.coordinates.lat}</div>
                  <div><strong>Longitude:</strong> {device.coordinates.lng}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}