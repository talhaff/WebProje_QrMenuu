# ÖzCan Geleneksel Lezzet Durağı - QR Menü Yönetim Sistemi

[cite_start]Bu proje, eğitim programı çerçevesinde modern web dünyasına giriş ve kavramların bütüncül kullanımı amacıyla geliştirilmiş [cite: 3][cite_start], interaktif bir restoran QR Menü uygulamasıdır[cite: 2]. Müşteriler için sade bir arayüz sunarken, yöneticiler için gizli bir yönetim paneli barındırır.

[cite_start]🔗 **Canlı Proje Linki (Netlify):** [https://ozcanqrmenu.netlify.app](https://ozcanqrmenu.netlify.app) [cite: 25]

## 📸 Ekran Görüntüleri
[cite_start]*(Proje Müşteri ve Yönetici Paneli Görünümü)* 

![ÖzCan QR Menü Ekran Görüntüsü](./proje_ekrani.jpg) 

## 🚀 Proje Özellikleri ve İstenen Görevler

[cite_start]Yönergede belirtilen modern Javascript çerçevesi ile proje geliştirme adımları [cite: 17] eksiksiz uygulanmıştır:

* [cite_start]**Listeleme İşlemi:** Müşteriler menüdeki ürünleri kategorilere (Ana Yemek, Tatlı vb.) göre filtreleyerek listeleyebilir[cite: 19].
* **Gizli Admin Paneli:** Yalnızca yetkililerin erişebileceği (Şifre korumalı) yönetim modülü.
* [cite_start]**Ekleme İşlemi:** Yönetici modunda menüye yeni ürün, görsel, fiyat ve kategori eklenebilir[cite: 18].
* [cite_start]**Güncelleme İşlemi:** Mevcut ürünlerin fiyatı, ismi veya kategorisi güncellenebilir[cite: 20].
* [cite_start]**Silme İşlemi:** Menüden kaldırılmak istenen ürünler tek tıkla silinebilir[cite: 21].
* **Veri Kalıcılığı:** Veritabanı simülasyonu için tarayıcının `localStorage` API'si kullanılmıştır.

## 🛠 Kullanılan Teknolojiler

* [cite_start]**Frontend Framework:** ReactJS [cite: 6] [cite_start](Vite ile oluşturulmuştur [cite: 12])
* [cite_start]**Stil/Tasarım:** Bootstrap 5 [cite: 15] & Özel CSS
* [cite_start]**Yayınlama (Deployment):** Netlify [cite: 25]
* [cite_start]**Sürüm Kontrolü:** Git & GitHub [cite: 23]

## 📁 Proje Klasör Yapısı

[cite_start]Yönergeye uygun olarak proje dosyaları modüler bir yapıda organize edilmiştir[cite: 14]:

* [cite_start]`/src/Components` : Tekrar kullanılabilir UI bileşenleri (örn: AddMenuItem.jsx)[cite: 14].
* [cite_start]`/src/Pages` : Ana sayfa ve görünümler (örn: App.jsx)[cite: 14].
* [cite_start]`/src/Interfaces` : Varsayılan veri modelleri ve başlangıç verileri (örn: MenuData.js)[cite: 14].

## ⚙️ Kurulum (Geliştirici Ortamı)

Projeyi kendi bilgisayarınızda çalıştırmak için:

1. Repoyu bilgisayarınıza klonlayın.
2. Terminali açıp klasör dizinine gidin.
3. Gerekli paketleri kurmak için `npm install` komutunu çalıştırın.
4. Projeyi başlatmak için `npm run dev` komutunu kullanın.