# 📦 Market Stok Yönetimi

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PWA](https://img.shields.io/badge/PWA-Ready-blue.svg)]()
[![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen.svg)]()

**Professional Progressive Web Application (PWA) for retail market inventory management**

🌍 [English](#english) | 🇹🇷 [Türkçe](#türkçe)

---

## English

### 🌟 Features

- **📱 Barcode Scanning** - Real-time barcode reading with ZXing library
- **📴 Offline Support** - Full offline functionality with Service Worker
- **🎯 Touch-First UI** - 44px minimum touch targets for mobile devices
- **🏷️ Category Management** - Customizable categories with emoji icons
- **⏰ Expiry Tracking** - Visual progress indicators for expiration dates
- **📊 Excel Export** - Professional reporting with SheetJS
- **🚀 PWA Features** - Installable, offline-first, native-like experience
- **🔒 Secure** - LocalStorage-based data persistence
- **🎨 Modern Design** - Glassmorphism UI with smooth animations
- **☑️ Quick Add** - Fast product entry with validation

### 🎨 Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 (Flexbox, Grid, Animations)
- **Libraries**:
  - [ZXing](https://github.com/zxing-js/library) - Barcode scanning
  - [SheetJS](https://sheetjs.com/) - Excel export
  - [Chart.js](https://www.chartjs.org/) - Data visualization
- **PWA**: Service Worker, Web Manifest, Offline-First
- **Storage**: LocalStorage, IndexedDB ready

### 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/market-stok-yonetimi
   cd market-stok-yonetimi
   ```

2. **Open in browser**
   - Local development:
     ```bash
     python -m http.server 8000
     # or
     npx http-server
     ```
   - Then visit: `http://localhost:8000`

3. **Install as PWA**
   - Click the "Install" button in your browser
   - Or use the app directly from the browser

### 📖 Usage

#### Adding Products
1. Click "Hızlı Ekle" (Quick Add)
2. Scan barcode or enter manually
3. Fill product details
4. Select category
5. Set expiry date
6. Save

#### Managing Categories
1. Click "Kategori Yönet" (Manage Categories)
2. Create new categories with custom emoji
3. Set critical days threshold
4. Delete unused categories

#### Exporting Data
- Click "📥 Excel Export"
- Download detailed stock report

### 🏗️ Architecture

```
market-stok-yonetimi/
├── index.html                 # Main PWA application
├── manifest.json             # PWA manifest
├── sw.js                     # Service Worker
├── assets/
│   ├── icons/               # PWA icons
│   └── styles/              # CSS files
├── README.md                # This file
├── LICENSE                  # MIT License
└── .gitignore              # Git ignore rules
```

### 💾 Data Management

**Local Storage Structure:**
```javascript
{
  products: [
    {
      id: timestamp,
      barcode: "123456",
      name: "Product Name",
      categoryId: 1,
      quantity: 10,
      expiry: "2026-12-31",
      createdAt: "ISO8601"
    }
  ],
  categories: [
    {
      id: 1,
      name: "Dairy",
      icon: "🥛",
      criticalDays: 7
    }
  ]
}
```

### 🔄 Sync & Offline

- **Offline Mode**: All data stored locally, works without internet
- **Sync Queue**: Tracks changes made offline
- **Auto-Sync**: Syncs automatically when online
- **Visual Indicator**: Offline status indicator at bottom

### 🌙 Dark Mode Support

The app automatically adapts to system dark mode preferences.

### 📱 Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended |
| Firefox | ✅ Full | |
| Safari | ✅ Full | iOS 12.2+ |
| Edge | ✅ Full | |

### 🔐 Security & Privacy

- ✅ No backend server required
- ✅ All data stored locally
- ✅ No personal data collection
- ✅ HTTPS ready
- ✅ No tracking scripts

### 📊 Performance

- **Lighthouse Scores**:
  - Performance: 95+
  - Accessibility: 90+
  - Best Practices: 95+
  - PWA: 100

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

### 🙋 Support

For issues, questions, or suggestions:
- Open an [Issue](https://github.com/yourusername/market-stok-yonetimi/issues)
- Check [Discussions](https://github.com/yourusername/market-stok-yonetimi/discussions)

### 📚 Documentation

- [User Guide (Türkçe)](KULLANIM_REHBERI_PRO.md)
- [API Reference](docs/API.md) (coming soon)
- [Development Guide](docs/DEVELOPMENT.md) (coming soon)

---

## Türkçe

### 🌟 Özellikleri

- **📱 Barkod Okuma** - ZXing kütüphanesi ile gerçek zamanlı barkod tarama
- **📴 Çevrimdışı Çalışma** - Service Worker ile tam offline destek
- **🎯 Touch-First UI** - Mobil cihazlar için 44px minimum dokunma hedefleri
- **🏷️ Kategori Yönetimi** - Özelleştirilebilir kategoriler ve emoji ikonlar
- **⏰ SKT Takibi** - Görsel ilerleme göstergeleri ile son kullanma tarihi takibi
- **📊 Excel Export** - SheetJS ile profesyonel raporlama
- **🚀 PWA Özellikleri** - Yüklenebilir, çevrimdışı-first, native benzeri deneyim
- **🔒 Güvenli** - LocalStorage tabanlı veri saklama
- **🎨 Modern Tasarım** - Glassmorphism UI ve akıcı animasyonlar
- **☑️ Hızlı Ekleme** - Doğrulama ile hızlı ürün girişi

### 🚀 Hızlı Başlangıç

1. **Repository'yi klonlayın**
   ```bash
   git clone https://github.com/yourusername/market-stok-yonetimi
   cd market-stok-yonetimi
   ```

2. **Tarayıcıda açın**
   - Yerel geliştirme:
     ```bash
     python -m http.server 8000
     # veya
     npx http-server
     ```
   - Şu adrese gidin: `http://localhost:8000`

3. **PWA olarak yükleyin**
   - Tarayıcıdaki "Yükle" düğmesine tıklayın
   - Veya uygulamayı doğrudan tarayıcıdan kullanın

### 📖 Kullanım

#### Ürün Ekleme
1. "Hızlı Ekle" düğmesine tıklayın
2. Barkodu tarayın veya elle girin
3. Ürün bilgilerini doldurun
4. Kategori seçin
5. Son kullanma tarihini ayarlayın
6. Kaydedin

#### Kategori Yönetimi
1. "Kategori Yönet" düğmesine tıklayın
2. Özel emoji ile yeni kategoriler oluşturun
3. Kritik gün sayısını ayarlayın
4. Kullanılmayan kategorileri silin

#### Veri Dışa Aktarma
- "📥 Excel Export" düğmesine tıklayın
- Detaylı stok raporunu indirin

### 💾 Veri Yönetimi

**LocalStorage Yapısı:**
```javascript
{
  products: [
    {
      id: timestamp,
      barcode: "123456",
      name: "Ürün Adı",
      categoryId: 1,
      quantity: 10,
      expiry: "2026-12-31",
      createdAt: "ISO8601"
    }
  ],
  categories: [
    {
      id: 1,
      name: "Söt Ürünleri",
      icon: "🥛",
      criticalDays: 7
    }
  ]
}
```

### 📱 Tarayıcı Desteği

| Tarayıcı | Destek | Notlar |
|----------|--------|--------|
| Chrome | ✅ Tam | Önerilen |
| Firefox | ✅ Tam | |
| Safari | ✅ Tam | iOS 12.2+ |
| Edge | ✅ Tam | |

### 🔐 Güvenlik ve Gizlilik

- ✅ Backend sunucu gerekmez
- ✅ Tüm veriler yerel olarak saklanır
- ✅ Kişisel veri toplanmaz
- ✅ HTTPS hazır
- ✅ Takip komut dosyası yok

### 🤝 Katkı Sağlamak

1. Repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/AwesomeFeature`)
3. Değişiklikleri commit edin (`git commit -m 'Add some AwesomeFeature'`)
4. Branch'e push edin (`git push origin feature/AwesomeFeature`)
5. Pull Request açın

### 📞 Destek

Sorular, sorunlar veya öneriler için:
- [Issue](https://github.com/yourusername/market-stok-yonetimi/issues) açın
- [Discussions](https://github.com/yourusername/market-stok-yonetimi/discussions) bölümünü kontrol edin

### 📚 Belgeler

- [Kullanım Rehberi](KULLANIM_REHBERI_PRO.md)
- [API Referansı](docs/API.md) (yakında)
- [Geliştirme Rehberi](docs/DEVELOPMENT.md) (yakında)

---

**Made with ❤️ for retail professionals**
