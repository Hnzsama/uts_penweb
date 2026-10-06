# 🚀 Proyek UTS Pemrograman Web — InovasiTech Studio

> **Website Portofolio & Agensi Digital Interaktif berbasis HTML5 Semantik, Desain CSS Modern (Glassmorphism & Multi-Theme), dan JavaScript Murni (Vanilla JS).**

---

## 📌 Identitas Proyek & Akademik

- **Mata Kuliah:** Pemrograman Web (UTS)
- **Program Studi / Semester:** Sarjana Terapan (D4) Manajemen Informatika / Semester 3
- **Bobot SKS:** 4 SKS
- **Dosen Pengampu:**
- **Pengembang (Mahasiswa):**
  - **Nama:** **Luqman Bil As'har**
  - **NIM:** **25091397086**
  - **Kelas:** **2025I**
  - **Program Studi:** Sarjana Terapan (D4) Manajemen Informatika
- **Dokumen Terkait:** [Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SRS.md)](SRS.md)

---

## 🌐 Tautan Live Demo & Akses Halaman Web

Website ini telah disiapkan dan di-deploy pada **GitHub Pages**:

- **Alamat Domain / URL GitHub Pages:**  
  [https://hnzsama.github.io/uts_penweb/](https://hnzsama.github.io/uts_penweb/)
- **URL Repositori GitHub:**  
  [https://github.com/Hnzsama/uts_penweb](https://github.com/Hnzsama/uts_penweb)

### ⚙️ Panduan Menghidupkan GitHub Pages di Repositori:
1. *Push* seluruh berkas proyek ke repositori GitHub Anda di cabang `main`.
2. Buka menu **Settings** pada repositori GitHub Anda.
3. Pilih menu tab **Pages** pada bilah sisi kiri (*sidebar*).
4. Di bagian **Build and deployment > Source**, pilih opsi **Deploy from a branch**.
5. Pilih *Branch*: `main` dan folder: `/ (root)`, lalu klik tombol **Save**.
6. Tunggu sekitar 1–2 menit, tautan publik website Anda akan aktif dan dapat langsung diakses oleh dosen pengampu.

---

## 🗂️ Struktur Direktori Proyek

```text
uts/
├── index.html              # Berkas dokumen utama antarmuka HTML5 semantik
├── css/
│   └── style.css           # Lembar gaya CSS3 modular, Design Tokens, & Dark/Light mode
├── js/
│   ├── app.js              # Logika JavaScript murni (Events, DOM, Form, AJAX, Animasi)
│   └── data.js             # Dataset fallback (offline protection) & kumpulan kutipan
├── data/
│   └── projects.json       # Berkas data JSON portofolio untuk konsumsi Fetch API
├── assets/
│   └── images/             # Direktori aset ikon dan media pendukung
├── SRS.md                  # Dokumen formal Software Requirements Specification (30 Poin)
├── README.md               # Dokumentasi lengkap arsitektur dan instruksi proyek
└── UTS Pemweb.pdf          # Berkas panduan & lembar soal tugas UTS
```

---

## 📑 Penjelasan Kriteria Penilaian

### 1. Struktur HTML (Bobot: 20 Poin)
Struktur dokumen dirancang mengikuti standar **HTML5 Semantik (W3C)** untuk memastikan aksesibilitas tinggi (*A11y*), keramahan mesin pencari (*SEO*), serta kemudahan perawatan kode:
- **Elemen Semantik Modern:** Menggunakan `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dialog>`, dan `<footer>` secara hierarkis tanpa penumpukan tag `<div>` yang tidak bermakna (*div-soup avoidance*).
- **Header Informatif:** Elemen `<header>` memuat identitas merek (*Brand Logo*), navigasi utama, tombol pengalih tema visual, serta aksi cepat konsultasi.
- **Navigasi Menu:** Terdapat 5 pilihan menu utama (`#beranda`, `#tentang`, `#layanan`, `#portofolio`, `#kontak`) yang melebihi batas minimum instruksi tugas (minimal 2 pilihan menu seperti *Beranda* dan *Tentang Kami*).
- **Dukungan Aksesibilitas (ARIA):** Dilengkapi atribut `aria-label`, `aria-expanded`, `aria-hidden`, `aria-live="polite"`, dan `tabindex` agar ramah terhadap pembaca layar (*screen readers*) dan navigasi keyboard.

---

### 2. Desain CSS & Kreativitas Estetika (Bobot: 30 + 20 = 50 Poin)
Tampilan antarmuka mengadopsi standar desain visual modern terkini (*State-of-the-Art*):
- **CSS Custom Properties (Variables):** Seluruh variabel warna, bayangan (*shadow*), radius sudut, dan durasi transisi diatur pada root `:root` dan dikonfigurasi ulang secara otomatis pada selector `[data-theme="light"]`.
- **Tema Ganda (Dark & Light Mode):** Tampilan bawaan bergaya *Dark Cyber Elegance* dengan palet warna yang nyaman di mata, serta dapat dialihkan ke *Clean Light Mode* melalui satu klik tombol.
- **Konsep Glassmorphism:** Elemen kartu menggunakan properti `backdrop-filter: blur(14px)` dan latar belakang transparan semi-translusen bergaris tepi halus untuk menghasilkan ilusi kedalaman kaca modern.
- **Tipografi Google Fonts:** Menggunakan *Plus Jakarta Sans* dengan variasi ketebalan bobot yang proporsional dan ukuran responsif berbasis fungsi CSS `clamp()`.
- **Tata Letak Responsif (Mobile-First Ready):** Menggunakan kombinasi dinamis **CSS Grid** (untuk susunan kartu portofolio dan layanan) dan **Flexbox** (untuk bilah navigasi dan formulir).
- **Micro-Animations & Keyframes:**
  - Efek rotasi ikon brand saat *idle* (`@keyframes pulse-glow`).
  - Animasi putaran *loading spinner* (`@keyframes spin`).
  - Efek gemetar (*shake animation*) pada kartu form saat pengguna memasukkan data tidak valid (`@keyframes shakeAnim`).
  - Transisi melayang lembut (*smooth elevate*) saat kursor diarahkan ke kartu portofolio (`transform: translateY(-8px)`).

---

### 3. Fungsionalitas JavaScript (Bobot: 20 Poin)
Seluruh 5 kriteria interaksi JavaScript yang tercantum di lembar instruksi tugas berhasil diimplementasikan secara komprehensif menggunakan **Vanilla JavaScript (tanpa pustaka pihak ketiga)**:

| No | Kriteria Interaksi | Lokasi Implementasi & Deskripsi Teknis |
| :---: | :--- | :--- |
| **1** | **Event Handling** | • Event `DOMContentLoaded` untuk inisialisasi aplikasi.<br>• Event `click` pada toggle tema, filter kategori, kartu proyek, modal close, dan menu hamburger mobile.<br>• Event `scroll` pada jendela peramban untuk mengaktifkan efek blur navbar, tombol *Back to Top*, dan fitur *Scroll Spy*.<br>• Event `input` dan `change` pada kolom formulir untuk validasi instan.<br>• Event `submit` pada formulir kontak.<br>• Event keyboard `keydown` (Enter/Spasi/Escape) untuk aksesibilitas modal dialog. |
| **2** | **DOM Manipulation** | • Pembuatan elemen kartu portofolio secara dinamis menggunakan `document.createElement('article')` dan pengisian konten melalui `innerHTML`.<br>• Penyisipan elemen ke dokumen dengan `appendChild()` dan pembersihan container via penugasan `portfolioGrid.innerHTML = ""`.<br>• Manipulasi kelas CSS dinamis (`classList.add`, `classList.remove`, `classList.toggle`).<br>• Injeksi data dinamis ke elemen `<dialog>` saat pengguna memilih proyek.<br>• Pembuatan dan penghapusan elemen *Toast Notification* dinamis pada sudut layar. |
| **3** | **Style & Animation** | • Pengubahan tema runtime dengan memanipulasi atribut `data-theme` pada elemen akar `<html>` serta penyimpanan status ke `localStorage`.<br>• Animasi penambahan angka metrik hero secara halus menggunakan perhitungan kurva *easing* berbasis `requestAnimationFrame()`.<br>• Animasi umpan balik getaran (*shake*) pada formulir saat submit gagal.<br>• Transisi opacity dan animasi *slide-in/slide-out* pada notifikasi toast. |
| **4** | **Form Validation** | • **Nama Lengkap:** Pemeriksaan panjang karakter (minimal 3 karakter).<br>• **Alamat Email:** Pemeriksaan ekspresi reguler (Regex) standar RFC (`/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`).<br>• **Pilihan Layanan:** Pemeriksaan status seleksi nilai dropdown.<br>• **Pesan:** Pemeriksaan panjang teks (minimal 10 karakter) dilengkapi **fitur penghitung karakter live** (*live character counter*).<br>• **Persetujuan:** Validasi centang kotak persetujuan.<br>• Umpan balik visual seketika berupa garis tepi hijau/merah (`.has-success` / `.has-error`), pesan kesalahan deskriptif, dan animasi tombol loading simulasi saat proses pengiriman. |
| **5** | **AJAX / Fetch API** | • Mengambil data portofolio dari file eksternal `data/projects.json` secara asinkron menggunakan fungsi `async/await` dan `fetch()`.<br>• Pengelolaan status pemuatan (*Loading State*) dengan animasi pemutar (*spinner*).<br>• Penanganan kegagalan (*error handling*) terintegrasi menggunakan blok `try...catch` serta mekanisme cadangan otomatis (*Fallback System*) ke `FALLBACK_PROJECTS` (mencegah error CORS ketika dibuka langsung lewat protokol `file://`).<br>• Fitur tombol kutipan dinamis (*Quote Changer*) yang menyimulasikan pengambilan kutipan asinkron baru. |

---

### 4. Dokumentasi & SRS (Bobot: 30 Poin)
- Dokumen **Software Requirements Specification (SRS)** telah disusun secara mandiri pada berkas [SRS.md](SRS.md) mengacu pada format standar IEEE 830.
- Dokumen tersebut memuat Pendahuluan, Deskripsi Umum Sistem, Kebutuhan Fungsional (FR-01 s/d FR-10), Kebutuhan Non-Fungsional, Alur Data Arsitektur (*Flowchart Logika*), dan Kriteria Keberhasilan Pengujian.

---

## 💻 Cara Menjalankan Proyek Secara Lokal

Tidak memerlukan instalasi dependensi rumit (zero-dependency). Anda dapat menjalankannya dengan beberapa metode:

### Cara 1: Menggunakan Peramban Langsung
1. Buka folder proyek.
2. Klik dua kali pada berkas `index.html` untuk langsung membukanya di Google Chrome, Firefox, atau Edge.
   *(Sistem telah dilengkapi fallback data otomatis jika protokol `file://` membatasi Fetch API)*.

### Cara 2: Menggunakan Local Web Server (Direkomendasikan untuk AJAX Penuh)
Jika Anda memiliki Node.js atau Python terpasang di komputer:

- **Menggunakan Python 3:**
  ```bash
  python3 -m http.server 8000
  ```
  Lalu buka peramban di alamat: `http://localhost:8000`

- **Menggunakan Node.js / npx:**
  ```bash
  npx serve .
  ```
  Lalu buka alamat localhost yang tertera di terminal.

- **Menggunakan VS Code Live Server:**
  Klik kanan pada berkas `index.html` dan pilih **"Open with Live Server"**.

---

## 🛡️ Pernyataan Integritas Akademik
*Seluruh kode HTML, CSS, JavaScript, serta dokumen SRS dalam proyek ini disusun secara mandiri dan sistematis untuk memenuhi seluruh kriteria penilaian Ujian Tengah Semester (UTS) mata kuliah Pemrograman Web dengan menjunjung tinggi integritas akademik dan bebas dari plagiarisme.*
