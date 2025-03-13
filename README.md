# Postable - Minimal Post Paylaşım Sitesi

Bu proje, kullanıcıların kayıt olarak içerik paylaşabildiği minimal bir sosyal medya platformudur.

## Özellikler

- Kullanıcı kaydı ve girişi
- Post oluşturma (resim, başlık, açıklama)
- Ana sayfada tüm postları görüntüleme
- Kullanıcı bilgisi ve paylaşım tarihi

## Teknolojiler

- Next.js 15
- React 19
- Tailwind CSS 4
- Drizzle ORM
- SQLite (Better-SQLite3)
- JWT Kimlik Doğrulama
- Bcrypt

## Kurulum

### Gereksinimler
- Node.js (v20 veya üstü)
- npm veya yarn

### Kurulum Adımları

```bash
# Bağımlılıkları yükleme
npm install

# Geliştirme sunucusunu başlatma
npm run dev

# Veritabanı şemasını oluşturma
npm run db:generate

# Veritabanı şemasını uygulama
npm run db:push
```

## Proje Yapısı

```
postable/
├── src/                  # Kaynak kodları
│   ├── app/              # Next.js app router
│   ├── components/       # React bileşenleri
│   ├── db/               # Veritabanı modelleri ve yapılandırması
│   └── lib/              # Yardımcı fonksiyonlar ve servisler
├── public/               # Statik dosyalar
└── .env                  # Ortam değişkenleri
```

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.