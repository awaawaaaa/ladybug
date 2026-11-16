# 🐞 LadyBug

LadyBug adalah aplikasi pembelajaran coding interaktif untuk pemula. Pengguna dapat mempelajari materi dasar Python dan Web, mengerjakan quiz, mencoba latihan, serta bermain tantangan Tebak Cepat.

## Fitur
- Splash screen dan pengenalan pengguna.
- Pilihan kelas Python Dasar dan Web Dasar.
- Dashboard dengan ringkasan XP dan progress.
- Materi pembelajaran dasar.
- Mini quiz dengan feedback jawaban dan perolehan XP.
- Practice untuk mencoba menulis jawaban kode.
- Tebak Cepat dengan timer 30 detik.
- Leaderboard (data contoh/demo).
- Profil, statistik, achievements, dan reset progress.
- Progress pengguna disimpan di `localStorage` browser.

## Teknologi
- HTML5
- CSS3
- JavaScript (Vanilla)
- Google Fonts (Nunito, membutuhkan koneksi internet untuk memuat font; fallback sans-serif tersedia)

## Struktur Folder
```text
LadyBug/
├── assets/
│   ├── icons/
│   └── images/
├── src/
│   ├── css/style.css
│   └── js/
│       ├── app.js
│       └── data.js
├── index.html
├── README.md
├── CREDITS.md
└── .gitignore
```

## Cara Menjalankan

### Opsi 1 — VS Code Live Server
1. Ekstrak folder project.
2. Buka folder `LadyBug` di Visual Studio Code.
3. Pastikan extension **Live Server** sudah terpasang.
4. Klik kanan `index.html`.
5. Pilih **Open with Live Server**.

### Opsi 2 — Python local server
Pastikan Python sudah terpasang, lalu buka terminal di folder `LadyBug` dan jalankan:
```bash
python -m http.server 5500
```
Buka `http://localhost:5500` di browser.

Project ini merupakan aplikasi statis, sehingga tidak memerlukan `npm install`.

## Cara Menggunakan
1. Tekan **Mulai Sekarang**.
2. Masukkan nama panggilan.
3. Pilih Python Dasar atau Web Dasar.
4. Selesaikan materi untuk mendapatkan XP.
5. Buka Quiz, Practice, atau Tebak Cepat untuk berlatih.
6. Lihat XP, level, dan statistik di halaman Profile.

## Catatan
- Leaderboard berisi data dummy untuk kebutuhan demonstrasi, bukan ranking online.
- Login hanya berupa input nama dan tidak menggunakan autentikasi server.
- Data progress tersimpan secara lokal pada browser/perangkat yang digunakan.
- Tombol reset progress menghapus statistik demo dari penyimpanan lokal.
