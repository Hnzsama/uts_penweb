# 🚀 Proyek UTS Pemrograman Web — InovasiTech Studio

> **Website Portofolio Interaktif berbasis HTML5 Semantik, Desain CSS Modular, dan JavaScript Murni (Vanilla JS) yang Ringkas, Bersih, dan Mudah Didemokan.**

---

## 📌 Identitas Proyek & Mahasiswa

- **Mata Kuliah:** Pemrograman Web (UTS)
- **Program Studi / Semester:** Sarjana Terapan (D4) Manajemen Informatika / Semester 3
- **Bobot SKS:** 4 SKS
- **Dosen Pengampu:**
  1. Ari Kurniawan, S.Kom., M.T.
  2. Faris Abdi El Hakim, S.Kom., M.Tr.Kom.
- **Penyusun:**
  - **Nama:** **Luqman Bil As'har**
  - **NIM:** **25091397086**
  - **Kelas:** **2025I**
- **Dokumen Pendukung:** [Dokumen SRS (SRS.md)](SRS.md)

---

## 🌐 Tautan Live Demo & Repositori

- **URL GitHub Pages:**  
  [https://hnzsama.github.io/uts_penweb/](https://hnzsama.github.io/uts_penweb/)
- **URL Repositori GitHub:**  
  [https://github.com/Hnzsama/uts_penweb](https://github.com/Hnzsama/uts_penweb)

---

## 🗂️ Struktur Direktori Proyek (Modular & Ringkas)

Proyek ini sengaja dibuat **sesimpel dan semodular mungkin** (*clean & concise code*) agar sangat mudah dijelaskan dan didemokan baris demi baris di depan dosen penguji:

```text
uts/
├── index.html              # Antarmuka utama (HTML5 Semantik, ~85 baris)
├── css/                    # Modular CSS (Total < 160 baris)
│   ├── layout.css          # Variabel tema, reset, navbar, hero, grid & responsive
│   ├── components.css      # Tombol, kartu proyek, search/filter, form & modal dialog
│   └── style.css           # Master stylesheet yang mengimpor layout & components
├── js/                     # JavaScript Modular (ES Modules)
│   ├── script.js           # Gerbang utama (Entry Point) pengimpor modul via ES Modules
│   ├── theme.js            # Modul pengalih Dark/Light mode & LocalStorage
│   ├── portfolio.js        # Modul AJAX Fetch JSON, DOM Render kartu, filter, search & modal
│   ├── form.js             # Modul validasi formulir kontak real-time & pesan feedback
│   ├── data.js             # Dataset fallback portofolio jika dibuka offline (file://)
│   └── app.js              # Modul navigasi menu responsif (hamburger toggle)
├── data/
│   └── projects.json       # Berkas data JSON portofolio untuk konsumsi Fetch API
├── SRS.md                  # Dokumen Spesifikasi Kebutuhan Perangkat Lunak (IEEE 830)
├── README.md               # Dokumentasi lengkap proyek
└── UTS Pemweb.pdf          # Berkas panduan & lembar soal UTS
```

---

## 📑 Pemenuhan Kriteria Penilaian UTS

### 1. Struktur HTML (Bobot: 20 Poin)
- Menggunakan tag semantik standar HTML5: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dialog>`, dan `<footer>`.
- Navigasi menu utama (`Beranda`, `Tentang Kami`, `Portofolio`, `Kontak`) yang responsif, terstruktur, dan mudah dipahami.
- Konten informatif yang rapi dengan pemisahan seksi yang jelas (*clean, semantic, high readability*).
- **Single Entry Point Clean Import:** `index.html` hanya mengimpor satu berkas CSS (`css/style.css`) dan satu berkas JS (`js/script.js` berjenis `type="module"`), menjaga tag `<head>` dan footer tetap ringkas dan elegan.

---

### 2. Desain CSS Modular & Estetika (Bobot: 30 + 20 = 50 Poin)
- **Modular Architecture:** Kode CSS dibagi secara modular menjadi `css/layout.css` (tata letak & tema) dan `css/components.css` (komponen antarmuka), digabungkan rapi di gerbang utama `css/style.css` menggunakan `@import`.
- **Desain Estetis & Kreativitas:** Tipografi modern Google Fonts *Plus Jakarta Sans*, gradien warna aura, kartu fitur *glassmorphism* dengan `backdrop-filter: blur()`, kartu portofolio berbingkai glow halus, serta micro-interactions hover yang dinamis.
- **CSS Variables & Multi-Theme:** Mendukung Dark Mode (default) dan Light Mode dengan transisi warna yang sangat halus dan kontras sesuai standar WCAG AA.
- **Tata Letak Responsif:** Menggunakan **CSS Grid** untuk portofolio dan fitur serta **Flexbox** untuk navbar, filter controls, dan formulir, adaptif di semua resolusi.

---

### 3. Fungsionalitas JavaScript Modular (Bobot: 20 Poin)
Arsitektur JavaScript dirancang berbasis **ES Modules murni (Vanilla JS)**. Berkas `js/script.js` bertindak sebagai *hub entry point* yang mengimpor seluruh modul independen:

| No | Kriteria Tugas | Berkas Modul | Penjelasan Singkat Kodingan |
| :---: | :--- | :--- | :--- |
| **1** | **Event Handling** | `js/theme.js`, `js/portfolio.js`, `js/form.js`, `js/app.js` | • Event `click` pada tombol tema, menu navigasi mobile (`#navToggle`), filter kategori, kartu proyek, dan tombol close modal.<br>• Event `input` pada kolom pencarian proyek.<br>• Event `submit` pada formulir kontak. |
| **2** | **DOM Manipulation** | `js/portfolio.js`, `js/app.js` | • Merender kartu portofolio ke elemen `#portfolioGrid` secara dinamis.<br>• Membuka dialog modal detail proyek dan mengisi kontennya sesuai ID proyek.<br>• Menampilkan dan menyembunyikan menu navigasi mobile secara responsif. |
| **3** | **Style & Animation** | `js/theme.js` | • Mengganti class `light-theme` pada elemen `<body>` dan menyimpan preferensi ke `localStorage`.<br>• Efek transisi hover kartu portofolio dan modal backdrop. |
| **4** | **Form Validation** | `js/form.js` | • Memeriksa panjang nama minimal 3 karakter.<br>• Memeriksa validitas format email menggunakan Regular Expression (Regex).<br>• Memeriksa pesan minimal 5 karakter.<br>• Menampilkan pesan error/sukses secara interaktif di `#formFeedback`. |
| **5** | **AJAX / Fetch API** | `js/portfolio.js` | • Mengambil data `data/projects.json` menggunakan fungsi asinkron `fetch()`.<br>• Dilengkapi mekanisme fallback ke `FALLBACK_PROJECTS` dari `js/data.js` jika dijalankan secara offline via `file://`. |

---

### 4. Dokumentasi & SRS (Bobot: 30 Poin)
- Berkas [SRS.md](SRS.md) menyediakan spesifikasi lengkap kebutuhan sistem (fungsional & non-fungsional) berbasis standar IEEE 830.

---

## 🎤 Panduan Singkat Presentasi & Demo di Depan Dosen

Jika dosen meminta Anda menunjukkan dan menjelaskan kodingan:

1. **"Coba jelaskan kodingan AJAX-nya":**  
   Buka berkas `js/portfolio.js`. Jelaskan bahwa fungsi `fetch("data/projects.json")` memuat data secara asinkron lalu memanggil `renderProjects(data)`.
2. **"Di mana manipulasi DOM kartu dan modal?":**  
   Buka berkas `js/portfolio.js` pada fungsi `renderProjects` dan fungsi `openDetail`. Jelaskan bagaimana data dipetakan ke elemen HTML kartu dan dialog modal.
3. **"Di mana validasi form?":**  
   Buka berkas `js/form.js`. Tunjukkan pemeriksaan `name.length < 3`, regex `emailRegex.test(email)`, dan `message.length < 5`.
4. **"Bagaimana mode tema (Dark/Light) bekerja?":**  
   Buka berkas `js/theme.js`. Tunjukkan `document.body.classList.toggle("light-theme")` dan penyimpanan ke `localStorage.setItem("theme", ...)`.
5. **"Bagaimana struktur modularitas CSS & JavaScript-nya?":**  
   • **CSS:** `index.html` hanya memuat `css/style.css` sebagai gerbang utama, yang di dalamnya mengimpor `layout.css` dan `components.css` via `@import`.  
   • **JavaScript:** `index.html` hanya memuat `js/script.js` (`type="module"`), yang mengimpor seluruh modul (`theme.js`, `app.js`, `portfolio.js`, `form.js`) sehingga kode tetap rapi, terisolasi, dan mudah dirawat.
