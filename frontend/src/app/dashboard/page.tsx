'use client';

import { useState, useEffect } from 'react';
import { Device, ChartData } from '@/types/device';
import { getDevices } from '@/lib/mockData';
import DeviceChart from '@/components/charts/DeviceChart';
import DeviceBarChart from '@/components/charts/DeviceBarChart';
import { TrendingUp, Activity, Database, Zap } from 'lucide-react';

export default function Dashboard() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const fetchedDevices = await getDevices();
        setDevices(fetchedDevices);
      } catch (error) {
        console.error('Error fetching devices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  // Generate aggregated chart data
  const generateAggregatedData = (metric: string): ChartData[] => {
    const now = new Date();
    const data: ChartData[] = [];
    
    for (let i = 0; i < 24; i++) {
      const timestamp = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
      let value = 0;
      
      switch (metric) {
        case 'temperature':
          value = 18 + Math.sin(i * 0.5) * 12 + Math.random() * 4;
          break;
        case 'humidity':
          value = 65 + Math.sin(i * 0.3) * 20 + Math.random() * 8;
          break;
        case 'pressure':
          value = 1015 + Math.sin(i * 0.2) * 10 + Math.random() * 3;
          break;
        case 'devices':
          value = devices.filter(d => d.status === 'online').length + Math.floor(Math.random() * 2);
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

  const temperatureData = generateAggregatedData('temperature');
  const humidityData = generateAggregatedData('humidity');
  const pressureData = generateAggregatedData('pressure');
  const deviceData = generateAggregatedData('devices');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Activity className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Devices</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {devices.filter(d => d.status === 'online').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Database className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Data Points</p>
                <p className="text-2xl font-semibold text-gray-900">1,247</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Battery</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Math.round(devices.reduce((sum, d) => sum + (d.batteryLevel || 0), 0) / devices.length)}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-red-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Alerts</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DeviceChart
            data={temperatureData}
            title="Average Temperature (24h)"
            color="#EF4444"
            unit="°C"
          />
          
          <DeviceChart
            data={humidityData}
            title="Average Humidity (24h)"
            color="#3B82F6"
            unit="%"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DeviceBarChart
            data={pressureData}
            title="Atmospheric Pressure (24h)"
            color="#8B5CF6"
            unit=" hPa"
          />
          
          <DeviceBarChart
            data={deviceData}
            title="Online Devices (24h)"
            color="#10B981"
            unit=" devices"
          />
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">İstanbul Weather Station came online</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">İzmir Humidity Sensor battery low (45%)</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Data sync completed for 6 devices</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Antalya Pressure Sensor went offline</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}