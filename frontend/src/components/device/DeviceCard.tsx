'use client';

import { Device } from '@/types/device';
import { Activity, Battery, MapPin, Clock } from 'lucide-react';

interface DeviceCardProps {
  device: Device;
  onSelect: (device: Device) => void;
}

export default function DeviceCard({ device, onSelect }: DeviceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return '🟢';
      case 'offline': return '🔴';
      case 'maintenance': return '🟡';
      default: return '⚪';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      onClick={() => onSelect(device)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{device.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
          {getStatusIcon(device.status)} {device.status}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Activity className="h-4 w-4 mr-2" />
          <span className="capitalize">{device.type.replace('_', ' ')}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{device.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span>Last seen: {new Date(device.lastSeen).toLocaleString()}</span>
        </div>
        
        {device.batteryLevel && (
          <div className="flex items-center text-sm text-gray-600">
            <Battery className="h-4 w-4 mr-2" />
            <span>Battery: {device.batteryLevel}%</span>
          </div>
        )}
      </div>
    </div>
  );
}