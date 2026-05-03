# Blog EJS

## Requirement

Project ini membutuhkan:

- Node.js
- MongoDB dengan tool Mongosh atau Compass atau Atlas untuk penyimpanan data dummy

## Setup

1. Clone repository ini ke mesin lokal kamu.
2. Buka folder project di terminal.
3. Install dependency yang terdaftar di `package.json`:

```bash
npm install
```

4. Buat file `.env` di root project dan isi variabel lingkungan seperti contoh berikut:

```env
PORT=3000
MONGODB_URI="mongodb://localhost:27017"
DB_NAME="blogejs"
```

> Ubah `PORT` dan `MONGODB_URI` jika diperlukan sesuai lingkungan pengembangan kamu.

## Menjalankan Server

- Untuk menjalankan server biasa:

```bash
npm run dev
```

- Jika kamu punya `nodemon`, jalankan dengan mode development agar server restart otomatis saat ada perubahan:

```bash
npm run devmon
```

Setelah server berjalan, buka browser dan akses `http://localhost:3000`.
