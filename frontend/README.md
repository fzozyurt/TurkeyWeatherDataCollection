# IoT Gateway - Device Management System

Bu proje, Türkiye hava durumu verilerini toplayan IoT Gateway sistemidir. Frappe backend ile Next.js frontend kullanarak cihaz yönetimi ve grafik görüntüleme özelliklerini sunar.

## Özellikler

### 🔧 Device Management (Cihaz Yönetimi)
- **Cihaz Listesi**: Tüm IoT cihazlarını görüntüleme
- **Cihaz Durumu**: Online, Offline, Bakım modları
- **Cihaz Filtreleme**: Durum ve arama ile filtreleme
- **Cihaz Detayları**: Her cihaz için ayrıntılı bilgi görüntüleme

### 📊 Device Charts (Cihaz Grafikleri)
- **Gerçek Zamanlı Grafikler**: Sıcaklık, nem, basınç, rüzgar hızı
- **Interaktif Grafikler**: Recharts kullanarak modern grafik deneyimi
- **Çoklu Metrik Görüntüleme**: Farklı sensör verileri için ayrı grafikler
- **Zaman Serisi Analizi**: 24 saatlik veri görüntüleme

### 📱 Dashboard (Kontrol Paneli)
- **Genel Bakış**: Sistem durumu ve istatistikler
- **Toplam Grafikler**: Tüm cihazlardan gelen verilerin ortalaması
- **Durum Kartları**: Aktif cihaz sayısı, veri noktaları, ortalama batarya
- **Son Aktiviteler**: Cihaz durumu değişiklikleri

## Teknoloji Stack

### Frontend
- **Next.js 15**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Recharts**: Chart library
- **Lucide React**: Icons

### Backend (Planlanan)
- **Frappe**: Backend framework
- **PostgreSQL/MySQL**: Database
- **Redis**: Caching
- **API Integration**: MGM weather data

## Kurulum

### Frontend Kurulumu

```bash
cd frontend
npm install
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

### Build

```bash
npm run build
npm start
```

## Kullanım

### 1. Device Management
- Ana sayfada tüm cihazları görüntüleyebilirsiniz
- Cihaz kartlarına tıklayarak detayları açabilirsiniz
- Arama kutusunu kullanarak cihazları filtreleyebilirsiniz
- Durum filtresi ile belirli durumlu cihazları görüntüleyebilirsiniz

### 2. Device Charts
- Cihaz detaylarında farklı metrikleri seçebilirsiniz
- Sıcaklık, nem, basınç, rüzgar hızı grafiklerini görüntüleyebilirsiniz
- Grafikler 24 saatlik veri gösterir
- Grafikler üzerinde hover yaparak detayları görebilirsiniz

### 3. Dashboard
- Tüm sistem metrikleri özetlenmiştir
- Ortalama değerler ve trendler gösterilir
- Son aktiviteler takip edilebilir

## Cihaz Tipleri

- **Weather Station**: Tam hava durumu istasyonu
- **Temperature Sensor**: Sıcaklık sensörü
- **Humidity Sensor**: Nem sensörü
- **Pressure Sensor**: Basınç sensörü

## Cihaz Durumları

- **Online**: Aktif ve veri gönderiyor
- **Offline**: Bağlantısı kesilmiş
- **Maintenance**: Bakım modunda

## Veri Yapısı

### Device
```typescript
interface Device {
  id: string;
  name: string;
  type: 'weather_station' | 'temperature_sensor' | 'humidity_sensor' | 'pressure_sensor';
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  lastSeen: Date;
  batteryLevel?: number;
  coordinates?: { lat: number; lng: number; };
}
```

### Chart Data
```typescript
interface ChartData {
  timestamp: string;
  value: number;
  label: string;
}
```

## Geliştirme

### Yeni Cihaz Tipi Ekleme
1. `src/types/device.ts` dosyasındaki `Device` interface'ini güncelleyin
2. `src/lib/mockData.ts` dosyasına örnek veri ekleyin
3. Gerekli ikon ve stillemeleri ekleyin

### Yeni Grafik Tipi Ekleme
1. `src/components/charts/` altında yeni grafik bileşeni oluşturun
2. `DeviceDetails` bileşeninde yeni metrik seçeneği ekleyin
3. Veri oluşturma fonksiyonunu güncelleyin

### Yeni Sayfa Ekleme
1. `src/app/` altında yeni klasör oluşturun
2. `page.tsx` dosyasını ekleyin
3. Navigation bileşenini güncelleyin

## İletişim

Bu proje MGM (Meteoroloji Genel Müdürlüğü) verilerini kullanarak Türkiye genelindeki hava durumu IoT cihazlarını yönetmek için geliştirilmiştir.
