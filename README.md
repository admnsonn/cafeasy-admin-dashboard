<div align="center">
  <h1>CAFEASY Admin Dashboard</h1>
</div>

Sistem Manajemen Admin Cafeasy dengan fitur Login, Registrasi, Dashboard Data Menu, dan Profil Admin yang responsif.

## Prasyarat

- Node.js 18+ (disarankan)
- npm

## Menjalankan Lokal

1. Install dependensi:
   `npm install`
2. Salin `.env.example` menjadi `.env` atau `.env.local` jika ingin konfigurasi lokal:
   `cp .env.example .env`
3. Isi variabel lingkungan yang diperlukan di file `.env`:
   - `GEMINI_API_KEY` jika aplikasi menggunakan API Gemini
   - `APP_URL` jika diperlukan untuk callback atau URL aplikasi
4. Jalankan aplikasi:
   `npm run dev`

Aplikasi akan tersedia di `http://localhost:3000`.

## Perintah Lain

- `npm run build` — membangun aplikasi untuk produksi
- `npm run preview` — melihat hasil build secara lokal
- `npm run lint` — memeriksa tipe TypeScript tanpa menghasilkan output
