# 🚀 GitHub'a Yayınlama Rehberi

Bu kılavuz, **Market Stok Yönetimi** uygulamasını GitHub'a yayınlamak için adım adım talimatlar verir.

## ✅ GitHub'a Hazırlama Kontrolü

Aşağıdaki kontrol listesini işaretleyin:

```
✅ README.md - Hazır
✅ LICENSE - MIT License
✅ .gitignore - Yapılandırılmış
✅ package.json - Oluşturulmuş
✅ manifest.json - PWA manifest
✅ sw.js - Service Worker
✅ CONTRIBUTING.md - Katkı rehberi
✅ CODE_OF_CONDUCT.md - Davranış kuralları
✅ SECURITY.md - Güvenlik politikası
✅ .github/workflows - CI/CD
```

## 🔧 Kurulum (Git)

### 1. Git Yükleyin (Henüz yapılmadıysa)

**Windows:**
```bash
# Chocolatey kullanarak
choco install git

# veya https://git-scm.com/ adresinden indir
```

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

### 2. Yerel Repository Hazırlığı

```bash
cd "c:\Users\User\Downloads\market yönetim pro"

# Git'i başlat (eğer henüz yapılmadıysa)
git init

# Tüm dosyaları staging area'ya ekle
git add .

# İlk commit'i oluştur
git commit -m "Initial commit: Market Stok Yönetimi PWA v1.0.0"
```

## 📤 GitHub'a Push Etme

### 1. GitHub Hesabını Hazırla

1. [GitHub.com](https://github.com) adresine git
2. Hesap oluştur veya oturum aç
3. Sağ üst köşedeki **+** > **New repository**

### 2. Repository Oluştur

```
Repository name: market-stok-yonetimi
Description: Professional PWA for retail inventory management
Visibility: Public
Initialize with: None (boş bırak, kodumuz hazır)
```

### 3. Repository'yi Bağla ve Push Et

```bash
# Remote repository ekle
git remote add origin https://github.com/yourusername/market-stok-yonetimi.git

# Branch'i yeniden adlandır (opsiyonel - main olsun)
git branch -M main

# Push et
git push -u origin main
```

## 🌐 Web Sunucusu Kurma (GitHub Pages)

### 1. Repository Settings

1. GitHub'da repository açın
2. **Settings** → **Pages** bölümüne git
3. **Source** → **Deploy from a branch** seç
4. Branch: `main` / Folder: `/ (root)`
5. **Save** düğmesine tıkla

### 2. Custom Domain (Opsiyonel)

```
1. Settings → Pages
2. "Custom domain" alanına etki alanınızı girin
3. DNS ayarlarını güncelleyin
```

**Örnek DNS Kaydı (CNAME):**
```
Name: www
Type: CNAME
Value: yourusername.github.io
```

## 📋 Kontrol Liste

Push etmeden önce kontrol edin:

- [ ] `README.md` güncellenmiş mi?
- [ ] Tüm dosyalar .gitignore'da mı?
- [ ] Hassas veriler (API keys) exposed değil mi?
- [ ] manifest.json geçerli mi?
- [ ] sw.js Service Worker'ı çalışıyor mu?
- [ ] Links relativePath mi (/)?
- [ ] Mobile responsive mi?

## 🧪 Test Öncesi Deploy

### Yerel Test

```bash
# Python ile http server başlat
python -m http.server 8000

# veya Node.js ile
npx http-server -p 8000
```

Şu adrese gidin: `http://localhost:8000`

Kontroller:
- [ ] Sayfa yükleniyor mu?
- [ ] PWA install prompt'u çıkıyor mu?
- [ ] Barkod scanner çalışıyor mu?
- [ ] Offline çalışıyor mu?
- [ ] Service Worker kaydediliyor mu?

## 🌍 Deployment Başarısı

Push ettikten sonra:

```
✅ GitHub repository'de canlı yayında
✅ GitHub Pages üzerinde çalışır durumda
✅ HTTPS otomatik etkinleştirildi
✅ PWA kurulabilir
```

## 🔗 Erişim Bağlantıları

Deploy edildikten sonra:

- **GitHub Repository:** `https://github.com/yourusername/market-stok-yonetimi`
- **Live Site:** `https://yourusername.github.io/market-stok-yonetimi/`
- **PWA Install:** Tarayıcı install prompt'u kullanın

## 📱 PWA Kurulumu

### Desktop (Chrome)
1. URL bar'daki **Install** icon'unu tıklayın
2. **Install** düğmesine tıklayın
3. Uygulamalar menüsünde "Market Stok Yönetimi" göreceksiniz

### Mobile (iOS)
1. Safari'de sayfayı açın
2. **Share** → **Add to Home Screen**
3. Adı onaylayın ve **Add** tıklayın

### Mobile (Android)
1. Chrome'da sayfayı açın
2. 3-nokta menü → **Install app**
3. Kurulumu onaylayın

## 🛠️ Sorun Giderme

### PWA Kurulması Gereken Şartlar

```
✓ HTTPS (GitHub Pages otomatik sağlar)
✓ manifest.json erişilebilir
✓ Service Worker kaydedilmiş
✓ Favicon/icons geçerli
✓ Valid HTML
```

### Service Worker Sorunu

DevTools'da kontrol et:
```
F12 → Application → Service Workers
```

- Durumu: "activated"
- Scope: "/"
- Çalışma durumu: "Çalışıyor"

### Manifest Sorunu

DevTools'da kontrol et:
```
F12 → Application → Manifest
```

Geçerli alanlar kontrol et:
- name ✓
- short_name ✓
- start_url ✓
- icons ✓
- display ✓

## 📚 Ek Kaynaklar

- [GitHub Pages Belgeleri](https://pages.github.com/)
- [PWA Kurma Rehberi](https://web.dev/progressively-enhance-your-pwa/)
- [Service Worker Rehberi](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web.dev - PWA](https://web.dev/pwa/)

## ✨ Sonrakı Adımlar

Deploy ettikten sonra:

1. **CI/CD Aktivasyonu** (.github/workflows)
2. **Analytics Ekle** (isteğe bağlı)
3. **Issue Template** oluştur
4. **Pull Request Template** oluştur
5. **Releases** sayfasını düzenle

---

**💡 İpucu:** GitHub Discussions'ı açarak, kullanıcılarınızdan geri bildirim alabilirsiniz.

**🎉 Başarılı yayınlamalar dilerim!**
