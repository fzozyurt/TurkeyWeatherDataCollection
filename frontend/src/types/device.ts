export interface Device {
  id: string;
  name: string;
  type: 'weather_station' | 'temperature_sensor' | 'humidity_sensor' | 'pressure_sensor';
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  lastSeen: Date;
  batteryLevel?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface DeviceData {
  deviceId: string;
  timestamp: Date;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  windSpeed?: number;
  windDirection?: string;
  precipitation?: number;
}

export interface ChartData {
  timestamp: string;
  value: number;
  label: string;
}