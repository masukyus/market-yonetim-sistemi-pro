# Contributing to Market Stok Yönetimi

Öncelikle, bu projeye katkı sağlamaya ilgi gösterdiğiniz için teşekkürler! 🎉

Bu belge projeye katkı sağlarken izlemeniz gereken yönergeleri açıklamaktadır.

## Davranış Kuralları

Bu proje ve katılımcıları, herkes için açık ve hoşgörülü bir ortam sağlamaya kararlıdır.

### Beklenen Davranış

- Diğer kullanıcılara karşı saygılı ve nazik davranın
- Yapıcı eleştiriyi kabul edin
- Cemaatin iyiliğine odaklanın
- Çeşitliliği görmüş olmayı ve hata yapmaktan kaçın

### Kabul Edilemez Davranış

- Hazırlama, taciz veya ayrımcı dil/görüntülerin kullanılması
- Kişisel veya profesyonel saldırılar
- Halkın veya özel iletilerin istenmesi
- Diğer kişisel bilgilerin isteği veya paylaşılması
- Makul olmayan diğer davranışlar

## Katkı Süreci

### 1. Issue Açma

Hata bildirmek veya özellik ister olmadan önce:

- Mevcut issue'ları kontrol edin (aynı sorun zaten biliniyor olabilir)
- Açık ve ayrıntılı bir başlık yazın
- Sorunu adım adım açıklayın
- İlgili kod örnekleri ekleyin (varsa)

### 2. Fork & Branch

```bash
# Repository'yi fork edin
git clone https://github.com/yourusername/market-stok-yonetimi
cd market-stok-yonetimi

# Feature branch oluşturun
git checkout -b feature/AmazingFeature

# Bugfix branch oluşturun
git checkout -b bugfix/BugDescription
```

### 3. Geliştirme

- **Kodlama Standardları:**
  - 2 boşluk girinti kullanın (tabs değil)
  - Kurtuluş satırında satırları bitirin (`\n`)
  - Açık ve açıklayıcı değişken adları kullanın
  - Uzun satırlardan kaçının (>80 karakter)

- **JavaScript:**
  ```javascript
  // ✅ İyi
  const getProductStatus = (product) => {
    if (!product) return null;
    return product.status || 'active';
  };

  // ❌ Kötü
  const getStatus = (product) => {
    return product
      ? product.status || 'active'
      : null;
  };
  ```

- **Yorum Yazın:**
  ```javascript
  /**
   * Ürün durumunu belirle
   * @param {Object} product - Ürün nesnesi
   * @returns {String} Ürün durumu
   */
  const getProductStatus = (product) => {
    // ...
  };
  ```

### 4. Test & Validate

Değişiklikleri göndermeden önce:

```bash
# Manifest.json'u kontrol edin
node -e "JSON.parse(require('fs').readFileSync('manifest.json', 'utf8'))"

# Service Worker'ı kontrol edin
# Tarayıcıda açın ve DevTools'da kontrol edin

# Responsive tasarımı test edin
# Farklı cihazlarda ve tarayıcılarda test edin
```

### 5. Commit Etme

Açık ve anlamlı commit mesajları yazın:

```bash
# ✅ İyi
git commit -m "feat: Barkod scanner'ına hata ayıklama ekle"

# ✅ İyi
git commit -m "fix: SKT gösterimi mobilde düzeltildi"

# ✅ İyi
git commit -m "docs: README.md'de kurulum rehberi güncellendi"

# ❌ Kötü
git commit -m "fixed stuff"

# ❌ Kötü
git commit -m "asdf"
```

**Commit Türleri:**
- `feat:` - Yeni özellik
- `fix:` - Bug düzeltmesi
- `docs:` - Dokümantasyon
- `style:` - CSS/tasarım değişiklikleri
- `refactor:` - Kod yeniden yapılandırması
- `perf:` - Performans iyileştirmeleri
- `test:` - Test ekleme/düzeltme
- `chore:` - Bağımlılık veya build yapısı değişiklikleri

### 6. Push & Pull Request

```bash
# Değişiklikleri push edin
git push origin feature/AmazingFeature

# GitHub'da Pull Request oluşturun
```

**PR Şablonu:**

```markdown
## Açıklama
Bu PR'de yapılan değişikliği kısaca açıklayın.

## Tür
- [ ] Bug düzeltmesi
- [ ] Yeni özellik
- [ ] Breaking change
- [ ] Dokümantasyon

## İlgili Issue
Closes #issue_number

## Yapılan Değişiklikler
- Değişiklik 1
- Değişiklik 2
- Değişiklik 3

## Test Edilmiş
- [ ] Desktop (Chrome)
- [ ] Desktop (Firefox)
- [ ] Desktop (Safari)
- [ ] Mobile (iOS)
- [ ] Mobile (Android)

## Ek Notlar
Herhangi bir kaygı veya not varsa buraya yazın.
```

## Stil Rehberi

### HTML
```html
<!-- ✅ İyi -->
<div class="product-card">
  <h2 class="product-name">Ürün Adı</h2>
  <p class="product-description">Açıklama</p>
</div>

<!-- ❌ Kötü -->
<div>
  <h2>Ürün Adı</h2>
  <p>Açıklama</p>
</div>
```

### CSS
```css
/* ✅ İyi */
.button-primary {
  padding: var(--space-4);
  background: var(--primary-500);
  border-radius: 12px;
}

/* ❌ Kötü */
.bp {
  padding: 1rem;
  background: #6366f1;
  border-radius: 12px;
}
```

### JavaScript
```javascript
// ✅ İyi - Açık ve modüler
const store = {
  products: [],
  addProduct(product) {
    this.products.push(product);
  }
};

// ❌ Kötü - Karışık ve belirsiz
const s = [];
const add = (p) => s.push(p);
```

## Dokümantasyon

Yeni özelliker için dokümantasyon eklemek şarttır:

- Yeni fonksiyonlar için JSDoc yorumları
- README.md'de ilgili bölümü güncelleyin
- KULLANIM_REHBERI_PRO.md'ye rehber ekleyin
- İngilizce ve Türkçe versiyonları güncelleyin

## Sürüm Numaralandırması

[Semantic Versioning](https://semver.org/lang/tr/) kullanırız:

- MAJOR (v1.0.0): API değişiklikleri, breaking changes
- MINOR (v0.1.0): Yeni özellikler (backward compatible)
- PATCH (v0.0.1): Bug düzeltmeleri

## Lisans

Bu projeye katkı sağlayarak, [MIT License](LICENSE) altında kodunuzun yayınlanmasını kabul etmiş olursunuz.

## Sorular?

- [Discussions](https://github.com/yourusername/market-stok-yonetimi/discussions) başlığını kontrol edin
- [Issues](https://github.com/yourusername/market-stok-yonetimi/issues) sayfasında soru açın

---

**Tekrar teşekkürler! 🚀**
