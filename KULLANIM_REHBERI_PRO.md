# 📦 Market Stok Yönetimi PWA

> **Profesyonel, Offline-First, Touch-Optimized** stok yönetim sistemi

Retail ve market sektörü için özel olarak geliştirilmiş, production-ready Progressive Web Application (PWA) çözümü.

---

## 🌟 Özellikler

### 📱 **Core Features**

- ✅ **Barkod Okuma** - ZXing kütüphanesi ile gerçek zamanlı barkod tarama
- ✅ **Offline Çalışma** - Service Worker ile tam offline destek
- ✅ **Touch-First UI** - 44px minimum dokunma hedefleri
- ✅ **Kategori Yönetimi** - Emoji/ikon destekli özelleştirilebilir kategoriler
- ✅ **SKT Takibi** - Görsel progress göstergeleri ile son kullanma takibi
- ✅ **Excel Export** - SheetJS ile profesyonel raporlama
- ✅ **PWA Özellikleri** - Ana ekrana eklenebilir, native-like deneyim

### 🎨 **UI/UX**

- Modern glassmorphism tasarım
- Tailwind-benzeri utility-first CSS
- Responsive & mobile-first yaklaşım
- Haptik geri bildirim (vibration)
- Toast notification sistemi
- Animasyonlu scan-line
- Renk kodlu durum gösterimi

### 💾 **Teknik**

- LocalStorage tabanlı state management
- Sync queue mekanizması
- Cache-first stratejisi
- Background sync desteği
- Modüler kod yapısı
- TypeScript-ready architecture

---

## 🚀 Kurulum

### **Hızlı Başlangıç**

```bash
# 1. Dosyaları indirin
git clone [repository-url]
cd market-stok-yonetimi

# 2. Web sunucusu başlatın (örnek)
npx serve .

# 3. Tarayıcıda açın
http://localhost:3000
```

### **Dosya Yapısı**

```
market-stok-yonetimi/
├── index.html          # Ana uygulama (tek dosya)
├── sw.js              # Service Worker
├── manifest.json      # PWA Manifest
├── README.md          # Dokümantasyon
└── icons/             # PWA ikonları (oluşturulmalı)
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    └── icon-512.png
```

---

## 📖 Kullanım Kılavuzu

### **1. İlk Kurulum**

#### **Kategorileri Yapılandırın**

1. "Kategori Yönet" butonuna tıklayın
2. Varsayılan kategorileri gözden geçirin
3. İhtiyacınıza göre yeni kategoriler ekleyin
4. Her kategori için:
   - Ad
   - Emoji/İkon
   - Kritik gün sayısı (SKT için)

#### **PWA'yı Yükleyin**

**Android (Chrome):**
- Menü (⋮) → "Ana ekrana ekle"

**iOS (Safari):**
- Paylaş (⎙) → "Ana Ekrana Ekle"

**Desktop (Chrome/Edge):**
- Adres çubuğu → Install (+) simgesi

---

### **2. Ürün Ekleme**

#### **Yöntem 1: Barkod Tarama (Önerilen)**

```plaintext
1. "Hızlı Ekle" → "Barkod Tara"
2. Kamerayı barkoda tutun
3. ✅ Otomatik okuma
4. Ürün bilgilerini tamamlayın
5. "Kaydet"
```

**Özellikler:**
- Gerçek zamanlı tarama
- Haptik feedback (titreşim)
- Otomatik form doldurma
- Focus yönetimi

#### **Yöntem 2: Manuel Giriş**

```plaintext
1. "Hızlı Ekle"
2. Barkod numarasını elle girin
3. Ürün adı
4. Kategori seçin (touch-friendly chips)
5. Miktar
6. Son kullanma tarihi
7. "Kaydet"
```

---

### **3. Stok Yönetimi**

#### **Ürün Kartı Bilgileri**

```
┌─────────────────────────────────────────┐
│ 🥛 Süt 1L                               │
│ ─────────────────────────────────────   │
│ Barkod: 8690123456789                   │
│ Kategori: Süt Ürünleri                  │
│ Miktar: 10                              │
│                                         │
│ ⚠️ 3 gün kaldı    [●●●○○○○] 43%        │
│                           [🗑️]          │
└─────────────────────────────────────────┘
```

#### **SKT Durum Göstergeleri**

| Renk | Durum | Açıklama |
|------|-------|----------|
| 🔴 Kırmızı | Kritik | Kategori kritik günü içinde |
| 🟡 Sarı | Dikkat | Kritik günün 2 katı içinde |
| 🟢 Yeşil | İyi | Yeterli süre var |

#### **Dairesel Progress**

- 100% = Maksimum süre
- 0% = Son kullanma tarihi geçmiş
- Renk otomatik değişir

---

### **4. Kategori Yönetimi**

#### **Yeni Kategori Ekleme**

```javascript
Örnek Ayarlar:
─────────────────
Ad: Şarküteri
İkon: 🧀
Kritik Gün: 5
```

#### **Kritik Gün Mantığı**

```
SKT: 15 Nisan
Bugün: 1 Nisan
Kalan: 14 gün
Kritik Ayar: 7 gün

Durum: 🟡 DİKKAT (14 > 7, ama 14 < 14)
```

#### **Silme Koruması**

- Kategori kullanımdaysa silinemez
- Önce ürünleri silin/taşıyın

---

### **5. Excel Export**

```plaintext
1. "Excel Export" butonuna tıklayın
2. Otomatik indirme başlar
3. Dosya adı: stok-raporu-YYYY-MM-DD.xlsx
```

#### **Export İçeriği**

| Sütun | Açıklama |
|-------|----------|
| Barkod | Ürün barkod numarası |
| Ürün Adı | Ürün ismi |
| Kategori | Kategori adı |
| Miktar | Stok miktarı |
| Son Kullanma | SKT tarihi |
| Kalan Gün | Bugünden itibaren kalan gün |
| Durum | KRİTİK / DİKKAT / İYİ |
| Eklenme | Ürünün eklenme tarihi |

---

## 🛠️ Teknik Detaylar

### **State Management**

```javascript
MarketStore = {
  products: [
    {
      id: 1234567890,
      barcode: "8690123456789",
      name: "Süt 1L",
      categoryId: 1,
      quantity: 10,
      expiry: "2024-04-15",
      createdAt: "2024-04-01T10:30:00.000Z"
    }
  ],
  categories: [
    {
      id: 1,
      name: "Süt Ürünleri",
      icon: "🥛",
      criticalDays: 7
    }
  ],
  syncQueue: [
    {
      action: "add",
      data: {...},
      timestamp: 1234567890
    }
  ]
}
```

### **Cache Strategy**

```
Cache-First with Network Fallback

1. Request gelir
2. Cache'de ara
3. Varsa → Cache'den dön + background update
4. Yoksa → Network'ten al + cache'e ekle
5. Network fail → Offline fallback
```

### **Offline Support**

#### **Ne Çalışır?**

- ✅ Tüm ürün ekleme/silme işlemleri
- ✅ Kategori yönetimi
- ✅ Excel export
- ✅ Barkod tarama
- ✅ Veri görüntüleme

#### **Sync Mekanizması**

```javascript
// Offline iken
→ İşlem yapılır
→ LocalStorage'a kaydedilir
→ syncQueue'ya eklenir

// Online olunca
→ Service Worker tetiklenir
→ syncQueue işlenir
→ API'ye gönderilir (simülasyon)
→ Queue temizlenir
```

---

## 🔒 Güvenlik

### **Veri Depolama**

- **LocalStorage:** Browser'da güvenli saklama
- **HTTPS Gereksinimi:** PWA için zorunlu
- **Scope İzolasyonu:** Her domain kendi verisi

### **Kamera İzinleri**

```javascript
// Kullanıcı onayı gerekli
navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: 'environment' // Arka kamera
  }
})
```

### **CSP Önerileri**

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 
                         https://unpkg.com 
                         https://cdn.jsdelivr.net 
                         https://cdnjs.cloudflare.com;
               style-src 'self' 'unsafe-inline';">
```

---

## 🎯 Best Practices

### **1. Performans**

#### **Önbellek Yönetimi**

```javascript
// Cache limitleri
CACHE_LIMITS = {
  static: 50,
  dynamic: 100,
  images: 50
}

// Otomatik temizleme
limitCacheSize(cacheName, maxItems)
```

#### **Lazy Loading**

- External kütüphaneler CDN'den
- İlk render sonrası yüklenme
- Network waterfall optimizasyonu

### **2. Kullanıcı Deneyimi**

#### **Feedback Mekanizmaları**

```plaintext
Barkod Okuma:
├── Görsel: Scan-line animasyonu
├── Haptik: Vibration (50-30-50ms)
├── Sesli: --
└── UI: Success animation

Kaydetme:
├── Görsel: Modal kapanma
├── Haptik: 100ms vibration
├── Toast: "Başarıyla eklendi"
└── UI: Liste güncelleme
```

#### **Touch Targets**

```css
/* Minimum dokunma hedefi */
--touch-target: 44px;

/* Tüm interactive elementler */
button, input, .chip {
  min-height: var(--touch-target);
}
```

### **3. Erişilebilirlik**

```html
<!-- Semantic HTML -->
<button aria-label="Ürün Sil" 
        role="button">🗑️</button>

<!-- Focus management -->
input:focus {
  outline: 2px solid var(--primary-500);
}

<!-- Screen reader uyumlu -->
<div role="alert" aria-live="polite">
  Toast mesajları
</div>
```

---

## 📊 İstatistikler & Metrikler

### **Dashboard Kartları**

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ 📊          │ │ ⚠️          │ │ 📂          │
│ Toplam Ürün │ │ Kritik SKT  │ │ Kategori    │
│     156     │ │      12     │ │      6      │
└─────────────┘ └─────────────┘ └─────────────┘
```

### **Hesaplama Mantığı**

```javascript
// Toplam ürün
total = products.length

// Kritik SKT
critical = products.filter(p => {
  daysLeft = getDaysUntilExpiry(p.expiry)
  category = getCategoryById(p.categoryId)
  return daysLeft <= category.criticalDays
}).length

// Kategori sayısı
categories = categories.length
```

---

## 🐛 Troubleshooting

### **Sık Karşılaşılan Sorunlar**

#### **1. Barkod Okumuyor**

**Çözüm:**
```plaintext
✓ Kamera iznini kontrol edin
✓ HTTPS kullandığınızdan emin olun
✓ Işığın yeterli olduğundan emin olun
✓ Barkodu tam çerçeve içinde tutun
✓ Console'da hata var mı kontrol edin
```

#### **2. Offline Çalışmıyor**

**Çözüm:**
```plaintext
✓ Service Worker registered mı kontrol edin
  → DevTools → Application → Service Workers
✓ Cache'ler oluşmuş mu kontrol edin
  → DevTools → Application → Cache Storage
✓ HTTPS kullanıldığından emin olun
```

#### **3. PWA Yüklenmiyor**

**Çözüm:**
```plaintext
✓ manifest.json erişilebilir mi kontrol edin
✓ HTTPS kullanıldığından emin olun
✓ İkonlar doğru yolda mı kontrol edin
✓ start_url doğru mu kontrol edin
```

#### **4. Veriler Kayboldu**

**Çözüm:**
```plaintext
✓ LocalStorage temizlendi mi kontrol edin
✓ İncognito modda mı çalışıyorsunuz?
✓ Storage quota doldu mu kontrol edin
✓ Browser verilerini temizlediniz mi?
```

### **Debug Komutları**

```javascript
// Console'da çalıştırın

// Tüm verileri görüntüle
console.log('Products:', store.products);
console.log('Categories:', store.categories);

// Cache durumu
getCacheReport().then(console.log);

// Service Worker durumu
navigator.serviceWorker.getRegistration()
  .then(reg => console.log('SW:', reg));

// Storage boyutu
navigator.storage.estimate()
  .then(est => console.log('Storage:', est));
```

---

## 🔄 Güncelleme & Bakım

### **Versiyon Yönetimi**

```javascript
// sw.js
const CACHE_VERSION = 'market-stok-v1.0.0';

// Yeni versiyon geldiğinde
// 1. CACHE_VERSION'ı artır
// 2. Eski cache'ler otomatik silinir
// 3. Kullanıcılar otomatik güncellenir
```

### **Veri Migrasyonu**

```javascript
// Versiyon upgrade için
function migrateData(oldVersion, newVersion) {
  if (oldVersion < '1.1.0') {
    // v1.0 → v1.1 migration
    products = products.map(p => ({
      ...p,
      newField: defaultValue
    }));
  }
}
```

---

## 🎓 Örnek Senaryolar

### **Senaryo 1: Market Açılışı**

```plaintext
1. Tablet/telefonu açın
2. PWA'yı başlatın
3. "Kritik SKT" sayısını kontrol edin
4. Kritik ürünleri raftan çekin
5. Yeni ürünleri barkod okutarak ekleyin
```

### **Senaryo 2: Ürün Kabul**

```plaintext
1. "Hızlı Ekle" → "Barkod Tara"
2. Her ürünü sırayla okutun
3. Kategori otomatik seçilsin (AI gelecekte)
4. Miktar ve SKT'yi girin
5. "Kaydet"
6. Sonunda "Excel Export" ile rapor alın
```

### **Senaryo 3: Günlük Kontrol**

```plaintext
1. Uygulamayı açın
2. İstatistiklere bakın
3. Kritik ürünleri filtreleyin
4. Gerekli aksiyonları alın
5. Stok sayımı yapın
```

---

## 📱 Tarayıcı Desteği

| Tarayıcı | Versiyon | PWA | Kamera | Offline |
|----------|----------|-----|--------|---------|
| Chrome | 80+ | ✅ | ✅ | ✅ |
| Edge | 80+ | ✅ | ✅ | ✅ |
| Safari | 13+ | ✅ | ✅ | ✅ |
| Firefox | 75+ | ⚠️ | ✅ | ✅ |
| Samsung Internet | 11+ | ✅ | ✅ | ✅ |

**Not:** Firefox'ta PWA desteği sınırlıdır.

---

## 🤝 Katkıda Bulunma

Bu projeye katkıda bulunmak isterseniz:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

---

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

## 🙏 Teşekkürler

- **ZXing** - Barkod okuma kütüphanesi
- **SheetJS** - Excel export
- **Chart.js** - Grafik desteği (opsiyonel)
- **Anthropic Claude** - Geliştirme asistanı

---

## 📞 İletişim & Destek

**Geliştirici:** Senior Frontend Engineer  
**E-posta:** [your-email@example.com]  
**GitHub:** [github.com/yourprofile]  

---

## 🗺️ Yol Haritası

### **v1.1.0 - Planlanan**
- [ ] Multi-language support (EN, TR)
- [ ] Dark mode
- [ ] Grafik dashboard (Chart.js)
- [ ] QR code support
- [ ] Print labels

### **v1.2.0 - Gelecek**
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Multi-user support
- [ ] Role-based access
- [ ] Advanced filtering
- [ ] Bulk operations

### **v2.0.0 - Vizyon**
- [ ] AI-powered categorization
- [ ] Price tracking
- [ ] Supplier management
- [ ] Order automation
- [ ] Analytics dashboard

---

<div align="center">

**⭐ Star'lamayı unutmayın!**

Made with ❤️ for Retail Industry

</div>