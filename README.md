# Travel App API

Bu API, seyahat planlama ve yönetimi için bir backend sunar. Kategoriler, ürünler (destinasyonlar) ve kullanıcı kimlik doğrulama gibi işlevsellikler sağlar.

## Gereksinimler

Bu API'yi çalıştırmadan önce aşağıdaki araçların sisteminizde kurulu olduğundan emin olun:

- Node.js v14+
- MongoDB

## Kullanılan Paketler

- **axios**: API çağrılarını yönetmek için.
- **bcryptjs**: Şifreleme ve şifre çözme için.
- **body-parser**: Gelen isteklerin gövde verilerini ayrıştırmak için.
- **cors**: Çapraz kaynak isteklerini yönetmek için.
- **dotenv**: Ortam değişkenlerini yönetmek için.
- **express**: Sunucu ve routing işlemleri için.
- **jsonwebtoken**: JWT ile kimlik doğrulama için.
- **mongoose**: MongoDB ile etkileşim kurmak için.
- **multer**: Dosya yükleme işlemleri için.
- **nodemon**: Geliştirme sırasında sunucuyu otomatik yeniden başlatmak için.
- **yup**: Veri doğrulama için.

## Kurulum


Bu projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/uzeyirdemiral/Travel-App-API.git

2. Proje dizinine gidin:
   ```bash
   cd Travel-App-API

3. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   
4. Uygulamayı başlatın:
   ```bash
   npm start
   

## API Endpoint'leri

### Kategoriler

| Yöntem | Endpoint                  | Açıklama                          |
|--------|---------------------------|-----------------------------------|
| POST   | /api/categories            | Yeni bir kategori ekler           |
| GET    | /api/categories            | Tüm kategorileri listeler         |
| GET    | /api/categories/:id        | Belirli bir kategoriyi getirir    |
| PUT    | /api/categories/:id        | Kategoriyi günceller              |
| DELETE | /api/categories/:id        | Kategoriyi siler                  |

### Ürünler (Destinasyonlar)

| Yöntem | Endpoint                  | Açıklama                          |
|--------|---------------------------|-----------------------------------|
| POST   | /products                  | Yeni bir ürün (destinasyon) ekler |
| GET    | /products                  | Tüm ürünleri (destinasyonları) listeler |
| GET    | /products/:id              | Belirli bir ürünü getirir         |
| PUT    | /products/:id              | Ürünü günceller                   |
| DELETE | /products/:id              | Ürünü siler                       |

### Kimlik Doğrulama

| Yöntem | Endpoint                  | Açıklama                          |
|--------|---------------------------|-----------------------------------|
| POST   | /auths/register            | Yeni bir kullanıcı kaydeder       |
| POST   | /auths/login               | Kullanıcı girişi yapar            |
| GET    | /auths/profile             | Kullanıcı profilini getirir       |
| PUT    | /auths/update/:id          | Kullanıcı profilini günceller     |


## Çevresel Değişkenler

  `.env` dosyanızda aşağıdaki değişkenlerin tanımlı olduğundan emin olun:
  
  ```bash
  PORT=5001
  MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
  SECRET_KEY=your-secret-key
  API_KEY=your-api-key
  HOST=localhost
