# SIATO — Company Profile

Website company profile SIATO (Sistem Informasi Akademik Terpadu Online), layanan sewa aplikasi untuk perguruan tinggi dari penerimaan mahasiswa baru hingga wisuda.

Website menggunakan HTML, CSS, dan JavaScript tanpa framework, database, atau proses build.

## Fitur halaman

- Pengenalan layanan SIATO dan ilustrasi dashboard kampus.
- Mitra kampus dengan logo yang disimpan lokal.
- Fitur unggulan PMB, akademik, dan pembayaran SPC dengan preview dashboard yang dapat diperbesar.
- Tab alur layanan: PMB, akademik, pembayaran, serta kelulusan dan wisuda.
- Informasi perusahaan, keunggulan layanan, dan FAQ.
- Formulir permintaan demo melalui WhatsApp, dengan pilihan modul otomatis dari kartu fitur.
- Navigasi dan tampilan responsif untuk desktop maupun ponsel.

## Menjalankan secara lokal

### Dengan XAMPP

1. Simpan proyek dalam folder `htdocs/siatoid` pada instalasi XAMPP.
2. Jalankan Apache melalui XAMPP Control Panel.
3. Buka [http://localhost/siatoid/](http://localhost/siatoid/).

MySQL tidak diperlukan. Jika nama folder atau port Apache berbeda, sesuaikan URL.

### Dengan server PHP bawaan

Jalankan perintah berikut dari direktori proyek jika PHP tersedia di terminal:

```sh
php -S localhost:8000
```

Buka [http://localhost:8000](http://localhost:8000). PHP hanya digunakan sebagai server lokal; halaman tidak membutuhkan pemrosesan PHP.

## Struktur proyek

```text
siatoid/
├── index.html                 # Struktur dan konten halaman
├── style.css                  # Desain, layout responsif, dan dialog dashboard
├── script.js                  # Navigasi, tab, dialog, dan formulir demo
├── assets/
│   └── partners/
│       ├── README.md          # Referensi sumber logo kampus
│       ├── sources.json       # Metadata unduhan logo
│       └── ...                # File logo kampus
├── .gitignore
└── README.md
```

## Mengubah konten

### Teks dan fitur unggulan

Edit `index.html` untuk mengubah teks utama, mitra kampus, kartu fitur, FAQ, dan informasi kontak. Bagian fitur unggulan menggunakan ID `fitur-unggulan`, tepat setelah bagian mitra dengan ID `mitra`.

Konten tab layanan berada pada objek `solutions` di `script.js`. Nama modul preview dan pemetaan pilihan demo berada pada objek `previewModules`.

Preview dashboard menggunakan HTML/CSS dengan **data ilustrasi**, bukan screenshot aplikasi produksi atau data kampus nyata. Jika menggantinya dengan screenshot aplikasi, perbarui keterangan dan teks alternatif yang sesuai.

### Warna dan tampilan

Edit `style.css`. Variabel warna utama, seperti `--blue`, `--dark`, dan `--muted`, berada di bagian `:root`. Style fitur unggulan dan dialog berada di bagian komentar `Product highlights and accessible dashboard previews`.

### Logo mitra

Simpan logo di `assets/partners/`, kemudian perbarui atribut `src` dan `alt` pada kartu kampus di `index.html`. Gunakan gambar dengan proporsi asli; CSS menggunakan `object-fit: contain`.

Catat sumber logo pada [daftar sumber logo](assets/partners/README.md) dan [metadata logo](assets/partners/sources.json). Logo dan merek tetap milik institusi masing-masing.

### WhatsApp dan formulir demo

Nomor tujuan saat ini adalah `6285977258471`. Untuk menggantinya:

1. Perbarui tautan `wa.me` dan nomor yang ditampilkan di `index.html`.
2. Perbarui URL tujuan pada handler `demo-form` di `script.js`.

Gunakan format internasional tanpa tanda `+`, spasi, atau tanda hubung pada URL WhatsApp.

Formulir menyiapkan pesan berisi nama, perguruan tinggi, dan solusi yang diminati, lalu membuka WhatsApp. Pengunjung tetap harus mengirim pesannya sendiri. Website tidak menyimpan data formulir ke database dan tidak mengirim email.

Jika mengubah pilihan modul, selaraskan opsi `#interest` di `index.html`, atribut `data-demo-interest` pada tombol demo, dan objek `previewModules` di `script.js`.

## Aset eksternal

- Font dimuat dari Google Fonts, dengan fallback `sans-serif`.
- Avatar pada bagian pembuka dimuat dari layanan `i.pravatar.cc`.
- Tautan konsultasi dan demo membuka WhatsApp.

Logo mitra disajikan dari file lokal. Untuk penggunaan tanpa akses internet, sediakan font dan avatar lokal serta sesuaikan referensinya.

## Pemeriksaan sebelum publikasi

- Periksa tampilan desktop dan ponsel, termasuk menu navigasi.
- Pastikan semua logo tampil dan tautan menuju bagian yang benar.
- Coba tab layanan, FAQ, serta tiga preview dashboard.
- Pastikan dialog dapat ditutup dengan tombol tutup dan tombol Escape.
- Coba tombol demo dari setiap modul dan pastikan pilihan formulir sesuai.
- Periksa nomor WhatsApp dan isi pesan yang disiapkan, tanpa perlu mengirim pesan uji.
- Pastikan klaim fitur, nama mitra, dan kontak sesuai layanan perusahaan.

Jika Node.js tersedia, sintaks JavaScript dapat diperiksa dengan:

```sh
node --check script.js
```

Tidak ada paket npm atau test runner yang wajib dipasang untuk menjalankan website.

## Publikasi

Unggah `index.html`, `style.css`, `script.js`, dan direktori `assets/` ke direktori publik hosting atau layanan hosting statis. Pertahankan struktur folder agar referensi aset tetap berfungsi. Tidak diperlukan konfigurasi database maupun build.
