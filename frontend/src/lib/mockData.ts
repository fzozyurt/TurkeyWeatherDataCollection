import { Device } from '@/types/device';

// Mock data - in real application, this would come from Frappe backend API
export const mockDevices: Device[] = [
  {
    id: 'device-001',
    name: 'İstanbul Meteoroloji İstasyonu',
    type: 'weather_station',
    location: 'İstanbul, Türkiye',
    status: 'online',
    lastSeen: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    batteryLevel: 85,
    coordinates: {
      lat: 41.0082,
      lng: 28.9784
    }
  },
  {
    id: 'device-002',
    name: 'Ankara Sıcaklık Sensörü',
    type: 'temperature_sensor',
    location: 'Ankara, Türkiye',
    status: 'online',
    lastSeen: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    batteryLevel: 92,
    coordinates: {
      lat: 39.9334,
      lng: 32.8597
    }
  },
  {
    id: 'device-003',
    name: 'İzmir Nem Sensörü',
    type: 'humidity_sensor',
    location: 'İzmir, Türkiye',
    status: 'maintenance',
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    batteryLevel: 45,
    coordinates: {
      lat: 38.4192,
      lng: 27.1287
    }
  },
  {
    id: 'device-004',
    name: 'Antalya Basınç Sensörü',
    type: 'pressure_sensor',
    location: 'Antalya, Türkiye',
    status: 'offline',
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    batteryLevel: 12,
    coordinates: {
      lat: 36.8841,
      lng: 30.7056
    }
  },
  {
    id: 'device-005',
    name: 'Trabzon Hava Durumu İstasyonu',
    type: 'weather_station',
    location: 'Trabzon, Türkiye',
    status: 'online',
    lastSeen: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
    batteryLevel: 78,
    coordinates: {
      lat: 41.0015,
      lng: 39.7178
    }
  },
  {
    id: 'device-006',
    name: 'Bursa Sıcaklık Sensörü',
    type: 'temperature_sensor',
    location: 'Bursa, Türkiye',
    status: 'online',
    lastSeen: new Date(Date.now() - 1000 * 60 * 1), // 1 minute ago
    batteryLevel: 88,
    coordinates: {
      lat: 40.1885,
      lng: 29.0610
    }
  }
];

export const getDevices = async (): Promise<Device[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockDevices;
};

export const getDeviceById = async (id: string): Promise<Device | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockDevices.find(device => device.id === id) || null;
};