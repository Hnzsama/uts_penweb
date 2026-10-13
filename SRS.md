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
Dokumen Spesifikasi Kebutuhan Perangkat Lunak (*Software Requirements Specification* / SRS) ini disusun untuk merinci kebutuhan fungsional, non-fungsional, arsitektur teknis, serta batasan perancangan dalam pembangunan aplikasi web **InovasiTech Studio**. Dokumen ini menjadi acuan implementasi, verifikasi kode, dan evaluasi Ujian Tengah Semester (UTS) mata kuliah Pemrograman Web.

### 1.2 Ruang Lingkup Produk
**InovasiTech Studio** adalah antarmuka web interaktif berbasis *Client-Side Architecture* yang dirancang menggunakan teknologi inti **HTML5, CSS3 murni (Modular Vanilla CSS), dan JavaScript murni (Vanilla JS)** tanpa menggunakan pustaka atau framework pihak ketiga. Sistem ini mencakup:
1. Penyajian profil agensi digital dan pilar keunggulan pada bagian *Hero* dan *Tentang Kami*.
2. Presentasi portofolio proyek dinamis yang diambil secara *asynchronous* melalui Fetch API (AJAX) dari `data/projects.json` dengan mekanisme data *fallback* offline (`js/data.js`).
3. Fitur filter kategori proyek (*Semua*, *Web*, *Mobile*, *Desain*) dan pencarian kata kunci instan (*real-time search*).
4. Pratinjau detail proyek menggunakan elemen dialog modal native HTML5 (`<dialog>`).
5. Formulir kontak dengan validasi di sisi klien (panjang nama minimal 3 karakter, format email regex, dan pesan minimal 5 karakter) beserta kotak umpan balik (*feedback box*).
6. Pengubah mode tampilan (*Dark & Light Mode Switcher*) dengan penyimpanan status lokal (*LocalStorage*).

### 1.3 Definisi, Akronim, dan Singkatan
- **SRS:** *Software Requirements Specification* (Spesifikasi Kebutuhan Perangkat Lunak).
- **DOM:** *Document Object Model* (Representasi struktur elemen HTML dalam memori peramban).
- **AJAX:** *Asynchronous JavaScript and XML* (Metode pengambilan data di latar belakang tanpa memuat ulang seluruh halaman).
- **Fetch API:** Antarmuka bawaan peramban modern untuk melakukan permintaan HTTP asinkron berbasis *Promise*.
- **LocalStorage:** Mekanisme penyimpanan data *key-value* di sisi klien peramban web.
- **W3C:** *World Wide Web Consortium* (Badan standar web internasional).

---

## 2. DESKRIPSI UMUM SISTEM

### 2.1 Perspektif Produk
Website InovasiTech Studio beroperasi secara independen di sisi klien (*front-end only*) dan di-*host* di server GitHub Pages. Seluruh pemrosesan data (penyaringan kategori, pencarian real-time, manipulasi modal, validasi formulir, serta pengalihan tema) dijalankan secara lokal di peramban pengguna, menghasilkan waktu respons yang instan (*zero server latency*).

### 2.2 Karakteristik Pengguna
1. **Pengunjung / Calon Klien:** Menjelajahi profil agensi, mencari dan memfilter karya portofolio, melihat detail proyek, serta mengirimkan pesan kontak.
2. **Dosen Penguji / Evaluator:** Menilai struktur semantik HTML5, kebersihan dan modularitas CSS, estetika visual modern, serta pemenuhan 5 pilar JavaScript (Event Handling, DOM Manipulation, Style & Animation, Form Validation, AJAX).

### 2.3 Batasan Perancangan (*Constraints*)
1. Pembangunan menggunakan kode murni: HTML5 semantik, CSS3 murni, dan Vanilla JavaScript.
2. Tidak menggunakan pustaka eksternal (Bootstrap, TailwindCSS, jQuery, React, atau framework lainnya).
3. Kode berorientasi *clean code* dan *self-documenting* melalui penamaan fungsi dan variabel yang deskriptif.
4. Repositori dapat diakses publik dan siap di-deploy langsung pada GitHub Pages.

---

## 3. KEBUTUHAN SPESIFIK SISTEM

### 3.1 Kebutuhan Fungsional (*Functional Requirements*)

| Kode Kebutuhan | Nama Kebutuhan | Deskripsi Fungsional | Kriteria Keberhasilan |
| :--- | :--- | :--- | :--- |
| **FR-01** | Navigasi Menu Semantik | Sistem menyediakan bilah navigasi dengan menu Beranda (`#beranda`), Tentang Kami (`#tentang`), Portofolio (`#portofolio`), Kontak (`#kontak`), dan tombol tema (`#themeToggle`). | Pengguna dapat berpindah antar-bagian halaman via *anchor link* serta mengakses tombol pengalih tema. |
| **FR-02** | Pengalih Mode Tampilan (*Theme Switcher*) | Sistem menyediakan tombol toggle untuk beralih antara Mode Gelap (*Dark*) dan Mode Terang (*Light*). | Kelas `light-theme` ditambahkan/dihapus pada elemen `<body>`, ikon tombol berganti dinamis antara ☀️ dan 🌙, dan status tersimpan di `LocalStorage`. |
| **FR-03** | Pemuatan Data Portofolio Asinkron (AJAX) | Sistem memuat daftar proyek dari berkas `data/projects.json` menggunakan Fetch API saat halaman dimuat. | Data berhasil diambil dan dirender ke elemen `#portfolioGrid`. Jika pengambilan gagal atau dibuka secara offline via `file://`, data otomatis diambil dari `FALLBACK_PROJECTS`. |
| **FR-04** | Penyaringan Kategori Proyek | Pengguna dapat memilih tombol filter kategori: Semua (`all`), Web (`web`), Mobile (`mobile`), dan Desain (`desain`). | Kartu proyek disaring secara instan sesuai kategori yang dipilih tanpa *page reload*, dan kelas aktif (`active`) berpindah ke tombol yang dipilih. |
| **FR-05** | Pencarian Proyek Real-Time | Pengguna dapat mengetikkan kata kunci pada kolom input pencarian proyek (`#searchInput`). | Kartu proyek disaring secara instan berdasarkan judul (`title`) atau deskripsi (`description`). Jika tidak ada kecocokan, muncul pesan informasi "Proyek tidak ditemukan." |
| **FR-06** | Pratinjau Modal Detail Proyek | Pengguna dapat mengklik kartu portofolio untuk menampilkan informasi lengkap proyek. | Elemen dialog native `<dialog id="projectModal">` terbuka dengan menampilkan gambar, tag kategori, judul, dan deskripsi proyek. Modal dapat ditutup melalui tombol silang (`#modalClose`) atau dengan mengklik area latar belakang (backdrop). |
| **FR-07** | Validasi Formulir Kontak Sisi Klien | Sistem memvalidasi input formulir saat pengiriman (*submit*): Nama minimal 3 karakter, format email valid (Regex), dan pesan minimal 5 karakter. | Jika input tidak valid, kotak `#formFeedback` menampilkan pesan galat dengan kelas `error`. Jika valid, kotak menampilkan pesan sukses, dan formulir direset. |

### 3.2 Kebutuhan Non-Fungsional (*Non-Functional Requirements*)

| Kategori | Spesifikasi Kebutuhan |
| :--- | :--- |
| **Performa** | Waktu muat awal (*Initial Load Time*) instan (< 1 detik) karena ukuran aset sangat ringkas tanpa pustaka pihak ketiga. |
| **Responsivitas** | Antarmuka beradaptasi responsif pada perangkat seluler (< 600px), tablet, dan desktop melalui kombinasi CSS Grid dan Flexbox. |
| **Aksesibilitas (A11y)** | Memanfaatkan elemen semantik HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dialog>`, `<footer>`) dengan kontras warna WCAG AA di kedua tema. |
| **Portabilitas & Kompatibilitas** | Kompatibel dengan semua peramban modern (Chrome, Firefox, Safari, Edge) dan dapat berjalan secara lokal via protokol `file://` berkat mekanisme *fallback*. |
| **Keterbacaan Kode** | Struktur kode modular (arsitektur terpisah pada `css/` dan `js/`) dengan penamaan fungsi dan variabel yang jelas (*self-documenting*). |

---

## 4. ARSITEKTUR & DESAIN SISTEM

### 4.1 Diagram Alur Logika Sistem (*Flowchart*)

```
[Pengguna Membuka Web]
         │
         ├──► DOMContentLoaded Event Dipicu (script.js)
         │         ├── initTheme()       -> Baca LocalStorage, pasang tema body & icon tombol
         │         ├── initPortfolio()   -> Fetch 'data/projects.json' (Fallback ke FALLBACK_PROJECTS)
         │         │                            └── renderProjects() -> Render kartu ke #portfolioGrid
         │         └── initForm()        -> Pasang event listener 'submit' pada #contactForm
         │
         ├──► Interaksi Pengguna:
         │         ├── Klik Tombol Tema (#themeToggle)
         │         │         └── Toggle 'light-theme' pada <body> & simpan ke LocalStorage
         │         │
         │         ├── Klik Filter Kategori (.filter-btn)
         │         │         └── Filter daftar proyek berdasarkan kategori & render ulang grid
         │         │
         │         ├── Ketik Pencarian (#searchInput)
         │         │         └── Filter proyek real-time berdasarkan judul/deskripsi & render ulang
         │         │
         │         ├── Klik Kartu Proyek (.card)
         │         │         └── openDetail(id) -> Isi konten modal & panggil modal.showModal()
         │         │
         │         ├── Tutup Modal (#modalClose atau klik Backdrop)
         │         │         └── modal.close()
         │         │
         │         └── Kirim Formulir (#contactForm)
         │                   ├── Cek Nama (name.length < 3)        ──► Tampilkan Error di #formFeedback
         │                   ├── Cek Email (!emailRegex.test)      ──► Tampilkan Error di #formFeedback
         │                   ├── Cek Pesan (message.length < 5)    ──► Tampilkan Error di #formFeedback
         │                   └── Valid Semua                       ──► Tampilkan Sukses & form.reset()
```

### 4.2 Desain Sistem Visual & Tipografi
- **Skema Warna:**
  - **Dark Theme (Default):**
    - Latar Belakang: `#0b0f19` dengan radial aura gradient (`rgba(99, 102, 241, 0.22)`)
    - Kartu & Wadah: Glassmorphism `rgba(22, 30, 49, 0.7)` dengan `backdrop-filter: blur(12px)`
    - Teks Utama: `#f8fafc`
    - Teks Sekunder: `#94a3b8`
    - Garis Tepi (*Border*): `rgba(255, 255, 255, 0.08)`
  - **Light Theme:**
    - Latar Belakang: `#f8fafc` dengan radial aura gradient halus
    - Kartu & Wadah: Glassmorphism `rgba(255, 255, 255, 0.88)`
    - Teks Utama: `#0f172a`
    - Teks Sekunder: `#64748b`
    - Garis Tepi (*Border*): `#e2e8f0`
  - **Warna Aksen:** Indigo-Violet Gradient (`linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)`)
- **Tipografi:** Google Fonts *Plus Jakarta Sans* (400, 500, 600, 700, 800) untuk impresi tipografi modern dan elegan.
- **Tata Letak:**
  - **CSS Grid:** Digunakan pada `#portfolioGrid` (`repeat(auto-fill, minmax(300px, 1fr))`) dan `.features-grid` (`repeat(auto-fit, minmax(290px, 1fr))`).
  - **Flexbox:** Digunakan pada navbar, kontrol tombol filter/pencarian, kartu fitur, dan formulir kontak.

---

## 5. PENGUJIAN DAN VALIDASI (*ACCEPTANCE CRITERIA*)

1. **Uji Struktur HTML5:** Menggunakan tag semantik yang tepat tanpa elemen berlebih dan valid sesuai standar W3C.
2. **Uji Tata Letak CSS:** Tidak ada *horizontal scrolling* pada berbagai ukuran layar; transisi pergantian tema berlangsung mulus.
3. **Uji Fungsionalitas JavaScript (5 Pilar Penilaian UTS):**
   - **Event Handling:** Event `click` (tema, filter, modal), `input` (pencarian real-time), dan `submit` (formulir).
   - **DOM Manipulation:** Merender elemen kartu proyek dan menyuntikkan data ke dialog modal.
   - **Style & Animation:** Manipulasi kelas CSS tema dan efek transisi hover kartu.
   - **Form Validation:** Validasi komprehensif pada nama, email, dan pesan dengan pesan responsif.
   - **AJAX / Fetch API:** Pengambilan data JSON asinkron dengan penanganan galat dan *fallback* offline yang andal.
4. **Uji Kemampuan Offline:** Saat halaman dibuka langsung melalui protokol berkas lokal (`file://`), data proyek portofolio tetap tertampil sempurna.
