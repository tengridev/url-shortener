# URL Shortener

Next.JS ile hazırlanmış basit ve hızlı URL kısaltma servisi.

## Ekran Görüntüsü

- **[Tüm ekran görüntüleri](https://github.com/regexart/url-shortener-app/tree/main/public/static/screenshot)**

<p align="center">
  <img src="https://github.com/regexart/url-shortener-app/raw/main/public/static/screenshot/index.png" alt="URL Shortener">
</p>

## Düzenleme

- **.env.example** dosyasını **.env** olarak değiştirip ilgili kısımları düzenleyin ya da cross-env kullanın.
- Projede gerek duyulan tüm ayarlar (veritabanı bağlantısı, reklamlar, menü bağlantıları, manifest.json, robots.txt, sitemap.xml ve ayarlar) **src/data** içerisinde yer almaktadır. Lütfen burada yer alan tüm dosyaları kendinize göre düzenleyin.
- Veritabanı işlemleri, regex ve localstorage verileri ile ilgili dosyalar **src/utils** içerisinde yer almaktadır. Gerekmedikçe düzenleme yapmayın.
- Yeni çeviriler eklemek için;
  - **src/locales** klasörüne **tr** klasörünün kopyasını oluşturun, klasör ismini ülke kodu ile değiştirin, çevirileri düzenleyin.
  - **i18n.js** dosyasındaki **locales** dizisine yeni çeviri dosyanızda kullandığınız ülke kodunu dahil edin.
  - **defaultLocale** varsayılan dil olarak ayarlanır, isteğe bağlı olarak değiştirebilirsiniz.
  - Detaylı bilgi için [next-translate](https://github.com/vinissimus/next-translate) sayfasına göz atabilirsiniz.

## Kurulum

```bash
$ npm install
# ya da
$ yarn install
```

## Veritabanı Oluşturma

**Not:** Veritabanı olarak MySQL kullanılmıştır. Başka bir veritabanı kullanmak isterseniz lütfen [prisma.io](https://www.prisma.io/) web sitesinde yer alan, desteklenen veritabanlarından istediğiniz veritabanına göre **src/data/db/schema.prisma** dosyasını düzenleyin.

```bash
$ npx prisma db push
$ npx prisma generate
```

## Çalıştırma

Örnek cross-env:

```bash
yarn cross-env SITE_URL=http://localhost:3000 API_URL=http://localhost:3000/api next dev
```

### Geliştirme Ortamı

```bash
$ npm run dev
# ya da
$ yarn dev
```

### Üretim Ortamı

#### Oluştur

```bash
$ npm run build
# ya da
$ yarn build
```

#### Başlat

```bash
$ npm run start
# ya da
$ yarn start
```

## PM2

### PM2 Kurulumu

```bash
$ npm install pm2@latest -g
# ya da
$ yarn global add pm2
```

### PM2 Çalıştırma

#### Oluştur

```bash
$ npm run build
# ya da
$ yarn build
```

#### Başlat

```bash
$ pm2 start yarn --interpreter bash --name urlshortener -- start
```
