# DOKUMEN SPESIFIKASI KEBUTUHAN PERANGKAT LUNAK (SRS)
## *Software Requirements Specification*

---

### **Judul Proyek: InovasiTech Studio — Website Portofolio & Agensi Digital Kreatif**
- **Mata Kuliah:** Pemrograman Web (UTS)
- **Program Studi:** Sarjana Terapan (D4) Manajemen Informatika
- **Semester:** 3 (Tiga)
- **Penyusun (Mahasiswa):**
  - **Nama:** **Luqman Bil As'har**
  - **NIM:** **25091397086**
  - **Kelas:** **2025I**
- **Dosen Pengampu:**
  1. Ari Kurniawan, S.Kom., M.T.
  2. Faris Abdi El Hakim, S.Kom., M.Tr.Kom.
- **Standar Format:** IEEE Std 830-1998 (Adapted)

---

## 1. PENDAHULUAN

### 1.1 Tujuan Dokumen
Dokumen Spesifikasi Kebutuhan Perangkat Lunak (*Software Requirements Specification* / SRS) ini disusun untuk merinci kebutuhan fungsional, non-fungsional, arsitektur teknis, serta batasan perancangan dalam pembangunan aplikasi web **InovasiTech Studio**. Dokumen ini ditujukan sebagai acuan pengujian, implementasi kode, dan evaluasi Ujian Tengah Semester (UTS) mata kuliah Pemrograman Web.

### 1.2 Ruang Lingkup Produk
**InovasiTech Studio** adalah antarmuka web interaktif berbasis *Client-Side Architecture* yang dirancang menggunakan teknologi inti **HTML5, CSS3 murni (Vanilla CSS), dan JavaScript murni (Vanilla JS)** tanpa dependensi pustaka pihak ketiga. Sistem ini mencakup:
1. Penyajian identitas agensi, profil tim, dan pilar keunggulan.
2. Presentasi portofolio proyek dinamis yang diambil secara *asynchronous* melalui Fetch API (AJAX).
3. Fitur filter kategori dan pencarian instan (*real-time search*).
4. Pratinjau detail proyek menggunakan dialog modal interaktif.
5. Formulir konsultasi interaktif dengan validasi komprehensif di sisi klien.
6. Personalisasi tampilan pengguna melalui pengubah mode tema (*Dark/Light Mode Switcher*) dengan penyimpanan status lokal (*LocalStorage*).

### 1.3 Definisi, Akronim, dan Singkatan
- **SRS:** *Software Requirements Specification* (Spesifikasi Kebutuhan Perangkat Lunak).
- **DOM:** *Document Object Model* (Representasi pohon hierarki elemen HTML dalam memori peramban).
- **AJAX:** *Asynchronous JavaScript and XML* (Metode pertukaran data latar belakang tanpa memuat ulang seluruh halaman).
- **Fetch API:** Antarmuka bawaan peramban modern untuk melakukan permintaan HTTP asinkron berbasis *Promise*.
- **WCAG:** *Web Content Accessibility Guidelines* (Standar aksesibilitas konten web).
- **GitHub Pages:** Layanan *hosting* situs web statis dari repositori GitHub.

---

## 2. DESKRIPSI UMUM SISTEM

### 2.1 Perspektif Produk
Website InovasiTech Studio beroperasi secara independen di sisi klien (*front-end only*) dan di-*host* di server GitHub Pages. Semua pemrosesan data (penyaringan kategori, pencarian, validasi formulir, dan pertukaran tema) dilakukan secara langsung di peramban pengguna, sehingga menghasilkan performa yang sangat cepat (*zero latency server overhead*).

### 2.2 Karakteristik Pengguna
1. **Calon Klien / Publik:** Menjelajahi profil agensi, melihat portofolio proyek, dan mengajukan pesan melalui formulir kontak.
2. **Dosen Penguji / Evaluator:** Memeriksa kerapian struktur semantik HTML, efektivitas styling CSS, serta penerapan lima pilar interaksi JavaScript (Event Handling, DOM Manipulation, Style & Animation, Form Validation, AJAX).

### 2.3 Batasan Perancangan (*Constraints*)
1. Pembangunan wajib mematuhi standar validasi W3C (HTML5 & CSS3).
2. Tidak diperkenankan menggunakan pustaka/framework eksternal seperti Bootstrap, TailwindCSS, jQuery, React, atau Vue untuk memastikan pengujian kemampuan murni (*vanilla code*).
3. Repositori wajib dapat diakses publik dan siap di-deploy langsung pada GitHub Pages.

---

## 3. KEBUTUHAN SPESIFIK SISTEM

### 3.1 Kebutuhan Fungsional (Functional Requirements)

| Kode Kebutuhan | Nama Kebutuhan | Deskripsi Fungsional | Kriteria Keberhasilan |
| :--- | :--- | :--- | :--- |
| **FR-01** | Navigasi Menu Semantik | Sistem menyediakan bilah navigasi dengan menu Beranda, Tentang Kami, Layanan, Portofolio, dan Kontak. | Pengguna dapat berpindah ke bagian tertentu secara *smooth scroll* dan menu mobile dapat dibuka/ditutup secara responsif. |
| **FR-02** | Pengalih Mode Tampilan (*Theme Switcher*) | Sistem menyediakan tombol toggle untuk beralih antara Mode Gelap (*Dark*) dan Mode Terang (*Light*). | Perubahan warna berlangsung seketika dengan animasi halus dan preferensi tersimpan di *LocalStorage*. |
| **FR-03** | Pemuatan Data Portofolio Asinkron (AJAX) | Sistem memuat data daftar proyek dari berkas `data/projects.json` menggunakan Fetch API saat inisialisasi halaman. | Daftar portofolio berhasil dirender ke DOM dengan status pemuatan (*loading spinner*) dan sistem *fallback* yang andal. |
| **FR-04** | Penyaringan Kategori Proyek | Pengguna dapat memfilter portofolio berdasarkan kategori: Semua, Web Application, Mobile UI/UX, dan Brand Identity. | Tampilan grid proyek diperbarui secara instan sesuai kategori yang dipilih tanpa *page reload*. |
| **FR-05** | Pencarian Proyek Real-Time | Pengguna dapat mengetikkan kata kunci pada kolom pencarian proyek. | Kartu proyek disaring secara instan berdasarkan judul, deskripsi, dan teknologi. Jika tidak ditemukan, *empty state* muncul. |
| **FR-06** | Pratinjau Modal Detail Proyek | Pengguna dapat mengklik kartu proyek untuk melihat detail lengkap (klien, tahun, deskripsi, teknologi, dampak). | Dialog modal terbuka dengan animasi pop-up dan dapat ditutup via tombol silang, tombol keyboard Escape, atau klik luar. |
| **FR-07** | Kutipan Dinamis (Dynamic Quote) | Sistem menyediakan tombol untuk memuat kutipan inspirasi teknologi baru secara acak/berurutan. | Konten teks kutipan dan pengarang berubah secara dinamis dengan efek transisi opacity. |
| **FR-08** | Validasi Formulir Kontak Real-Time | Sistem memeriksa validitas nama (min 3 huruf), format email (regex RFC), pilihan layanan, pesan (min 10 karakter), dan kotak persetujuan. | Menampilkan tanda visual kesalahan/keberhasilan secara real-time dan mencegah pengiriman formulir jika belum valid. |
| **FR-09** | Penghitung Karakter Pesan | Sistem menghitung jumlah karakter pesan yang dimasukkan pengguna secara live. | Angka karakter bertambah saat mengetik dan berubah status menjadi hijau saat batas minimum terpenuhi. |
| **FR-10** | Sistem Notifikasi Toast | Sistem menampilkan pemberitahuan mengambang (*toast*) saat aksi penting berhasil/gagal (pengiriman form, ganti tema). | Toast muncul dengan animasi slide-in dan menghilang otomatis setelah 4 detik. |

### 3.2 Kebutuhan Non-Fungsional (Non-Functional Requirements)

| Kategori | Spesifikasi Kebutuhan |
| :--- | :--- |
| **Performa** | Waktu muat awal (*Initial Load Time*) < 1.5 detik pada koneksi standar 4G. Peramban merender transisi dengan target 60 FPS. |
| **Responsivitas** | Antarmuka beradaptasi mulus pada berbagai resolusi: Desktop (>1024px), Tablet (768px - 1024px), dan Ponsel Cerdas (<768px). |
| **Aksesibilitas (A11y)** | Penggunaan atribut ARIA (`aria-label`, `aria-expanded`, `aria-hidden`, `aria-live`), kontras warna mematuhi standar WCAG AA, serta navigasi keyboard yang bersahabat (*Tab*, *Enter*, *Esc*). |
| **Portabilitas & Kompatibilitas** | Kompatibel dengan semua peramban modern (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari) tanpa *vendor-specific polyfills*. |
| **Keamanan Klien** | Input disanitasi dan formulir menggunakan penanganan atribut HTML5 `novalidate` untuk memastikan validasi logika JavaScript berjalan ketat. |

---

## 4. ARSITEKTUR & DESAIN SISTEM

### 4.1 Diagram Alur Data Interaksi Pengguna (Flowchart Logika)

```
[Pengguna Membuka Web]
         │
         ├──► DOMContentLoaded Event Dipicu
         │         ├── Inisialisasi Tema (Baca LocalStorage)
         │         ├── Animasi Counter Angka Metrik Hero
         │         └── Request Fetch API ke `data/projects.json` (AJAX)
         │                   │
         │                   ├── Berhasil: Render Kartu ke #portfolioGrid
         │                   └── Gagal/Offline: Pakai Fallback Data
         │
         ├──► Interaksi Pengguna:
         │         ├── Filter/Search ──► DOM Manipulation Re-render
         │         ├── Klik Proyek    ──► Buka Modal Dialog
         │         ├── Scroll Window  ──► Sticky Nav Blur + Scroll Spy + Back-To-Top
         │         └── Input Formulir ──► Validasi Regex Real-time + Live Counter
         │                                       │
         │                                       ├── Form Valid   ──► Toast Sukses
         │                                       └── Form Invalid ──► Shake Animasi
```

### 4.2 Desain Sistem Visual & Tipografi
- **Skema Warna Dasar:** Dark Mode (`#0a0d14` background, `#141b2d` card glass) & Light Mode (`#f8fafc` background, `#ffffff` card).
- **Aksen Utama:** Indigo (`#6366f1`), Cyan (`#06b6d4`), dan Magenta (`#ec4899`).
- **Gaya Desain:** *Modern Glassmorphism* dengan `backdrop-filter: blur(14px)` dan garis tepi halus (*subtle 1px border*).
- **Tipografi:** Google Fonts *Plus Jakarta Sans* dengan ketebalan 400 (Regular), 600 (Semi-Bold), dan 800 (Extra-Bold).

---

## 5. PENGUJIAN DAN VALIDASI (*ACCEPTANCE CRITERIA*)

1. **Uji HTML:** Lulus uji *W3C Markup Validation Service* tanpa *error* struktur fatal.
2. **Uji CSS:** Tidak ada *overflow horizontal* pada semua *viewport*, warna teks tetap kontras pada mode gelap maupun terang.
3. **Uji JavaScript:**
   - 0 pesan *error* pada konsol pengembang (*DevTools Console*).
   - Pengujian fungsi offline (jika `fetch` gagal/diblokir oleh peramban lokal, data *fallback* tetap tertampil sempurna).
   - Seluruh 5 kategori instruksi tugas UTS (Event Handling, DOM Manipulation, Style & Animation, Form Validation, AJAX) berfungsi secara terintegrasi.
