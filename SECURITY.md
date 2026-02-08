# Güvenlik Politikası

## Desteklenen Sürümler

| Sürüm | Destekleniyor | Güvenlik Güncellemeleri |
|-------|--------------|-------------------------|
| 1.0.x | ✅ Evet | Tüm güvenlik yamaları |

## Güvenlik Açığını Raporlama

**Lütfen güvenlik açıklarını herkese açık olarak bildirmeyin!**

Bir güvenlik açığı bulursanız, lütfen aşağıdaki adımları izleyin:

1. **Doğrudan bildirin** - GitHub Security Advisory kullanın veya [marketstokyonetimi@example.com] adresine e-posta gönderin
2. **Ayrıntılar sağlayın:**
   - Açığın açıklaması
   - Tehdit seviyesi (Kritik/Yüksek/Orta/Düşük)
   - Olası etkiler
   - Düzeltme önerileri (varsa)

3. **Cevap süresi:**
   - Kritik: 24-48 saat içinde
   - Yüksek: 3-7 gün içinde
   - Orta: 1-2 hafta içinde
   - Düşük: 1 ay içinde

## Güvenlik Kılavuzları

### Veri Gizliliği

- ✅ Tüm veriler LocalStorage'da saklanır
- ✅ Hiçbir veri sunucuya gönderilmez
- ✅ Kişisel bilgi toplanmaz

### Browser Güvenliği

- ✅ HTTPS gerektiriyor (PWA için)
- ✅ Content Security Policy (CSP) desteklenir
- ✅ XSS koruması sağlanmış

### Bağımlılıklar

- ZXing.js - Barkod okuma
- SheetJS - Excel dışa aktarma
- Chart.js - Veri görselleştirmesi

Tüm bağımlılıklar CDN üzerinden sağlanmactır. Güvenlikli versiyonlar kullanılır.

### Önerilen Uygulamalar

1. **Kurulum:**
   - HTTPS üzerinde sunun
   - Content-Security-Policy header'ını ayarlayın
   - X-Content-Type-Options: nosniff

2. **Bakım:**
   - Düzenli olarak güvenliği kontrol edin
   - Bağımlılıkları güncel tutun
   - Kullanıcı geri bildirimine dikkat edin

3. **Dağıtım:**
   - Service Worker'ı imzalı sunun
   - Manifest dosyasını doğrulayın
   - Sürüm kontrolü yapın

## İlgili Kaynaklar

- [OWASP Web Security Guidelines](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [PWA Security](https://web.dev/secure/)

## Lisans

Bu güvenlik politikası [MIT License](LICENSE) altında sunulmuştur.

---

**Güvenliğimiz için çalışan tüm araştırmacılara teşekkürler!** 🛡️
