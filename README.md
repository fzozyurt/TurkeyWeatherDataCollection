# IoT Gateway - Türkiye Hava Durumu Veri Toplama

Bu proje, Türkiye genelindeki hava durumu verilerini toplayan ve yöneten IoT Gateway sistemidir. Frappe backend ile Next.js frontend kullanarak tam kapsamlı bir cihaz yönetimi ve veri görselleştirme sistemi sunar.

## Proje Yapısı

```
TurkeyWeatherDataCollection/
├── data/                    # Hava durumu verileri (CSV)
├── scripts/                 # Python veri toplama scriptleri
│   ├── MGM_get_data.py     # MGM verilerini çekme
│   ├── dataset_download.py # Kaggle dataset indirme
│   └── dataset_upload.py   # Kaggle dataset yükleme
├── frontend/               # Next.js IoT Gateway Frontend
│   ├── src/
│   │   ├── app/           # Next.js App Router
│   │   ├── components/    # React bileşenleri
│   │   ├── types/         # TypeScript tip tanımları
│   │   └── lib/           # Yardımcı fonksiyonlar
│   └── package.json
└── requirements.txt       # Python bağımlılıkları
```

## Özellikler

### 🌦️ Hava Durumu Veri Toplama
- MGM (Meteoroloji Genel Müdürlüğü) API entegrasyonu
- Türkiye genelindeki il ve ilçe verileri
- Otomatik veri güncelleme (GitHub Actions)
- Kaggle dataset entegrasyonu

### 🔧 IoT Gateway Frontend
- **Device Management**: Cihaz yönetimi ve izleme
- **Device Charts**: Gerçek zamanlı grafik görüntüleme
- **Dashboard**: Sistem durumu ve analitik
- **Responsive Design**: Mobile-first yaklaşım

### 📊 Veri Görselleştirme
- Sıcaklık, nem, basınç, rüzgar hızı grafikleri
- Interaktif zaman serisi analizleri
- Cihaz durumu ve performans metrikleri
- Gerçek zamanlı veri akışı

## Teknoloji Stack

### Backend
- **Python**: Veri toplama ve işleme
- **Pandas**: Veri manipülasyonu
- **Requests**: API iletişimi
- **Kaggle API**: Dataset yönetimi

### Frontend
- **Next.js 15**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Modern styling
- **Recharts**: Grafik kütüphanesi
- **Lucide React**: İkon kütüphanesi

### DevOps
- **GitHub Actions**: Otomatik veri güncelleme
- **Kaggle Integration**: Dataset yayınlama
- **ESLint**: Kod kalitesi
- **Prettier**: Kod formatlama

## Kurulum

### 1. Repository'yi klonlayın
```bash
git clone https://github.com/fzozyurt/TurkeyWeatherDataCollection.git
cd TurkeyWeatherDataCollection
```

### 2. Python bağımlılıklarını yükleyin
```bash
pip install -r requirements.txt
```

### 3. Frontend kurulumu
```bash
cd frontend
npm install
npm run dev
```

### 4. Veri toplama scriptini çalıştırın
```bash
python scripts/MGM_get_data.py
```

## Kullanım

### Frontend Erişim
- **Device Management**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard

### Veri Toplama
- Otomatik: GitHub Actions ile günde 4 kez (00:00, 06:00, 12:00, 18:00)
- Manuel: `python scripts/MGM_get_data.py`

### Kaggle Dataset
- Otomatik yükleme: GitHub Actions ile
- Manuel yükleme: `python scripts/dataset_upload.py`

## Cihaz Tipleri

- **Weather Station**: Tam hava durumu istasyonu
- **Temperature Sensor**: Sıcaklık sensörü
- **Humidity Sensor**: Nem sensörü
- **Pressure Sensor**: Basınç sensörü

## Veri Kaynakları

- **MGM API**: https://servis.mgm.gov.tr/
- **Kaggle Dataset**: Türkiye Hava Durumu Verileri
- **GitHub**: Otomatik veri güncelleme

## Geliştirme

### Yeni Özellik Ekleme
1. Fork edin
2. Feature branch oluşturun
3. Değişikliklerinizi commit edin
4. Pull request gönderin

### Veri Formatı
- **CSV**: Pandas ile işlenen veriler
- **JSON**: API response formatı
- **TypeScript**: Frontend tip tanımları

## İletişim

Bu proje MGM verilerini kullanarak Türkiye genelindeki hava durumu IoT cihazlarını yönetmek için geliştirilmiştir.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.