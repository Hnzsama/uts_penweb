/**
 * INOVASITECH STUDIO — MAIN JAVASCRIPT LOGIC
 * Mata Kuliah: Pemrograman Web (UTS)
 * 
 * Mengimplementasikan 5 Kriteria Interaksi JavaScript:
 * 1. Event Handling (Click, Scroll, Input, Submit, Keyup, Resize)
 * 2. DOM Manipulation (Dynamic card generation, modal popups, toast notifications)
 * 3. Style & Animation (Theme Switcher, scroll spy, counter animation, shake effect)
 * 4. Form Validation (Live regex & minlength validation, custom feedback UI)
 * 5. AJAX / Fetch API (Asynchronous JSON data fetching with fallback and loading state)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Global State
  const state = {
    projects: [],
    activeCategory: "all",
    searchQuery: "",
    theme: localStorage.getItem("inovasitech_theme") || "dark",
    currentQuoteIndex: 0
  };

  /* ==========================================================================
     1. INISIALISASI & STYLE/THEME MANAGEMENT
     ========================================================================== */
  const themeToggle = document.getElementById("themeToggle");
  const htmlRoot = document.documentElement;

  // Terapkan tema yang tersimpan
  function applyTheme(theme) {
    state.theme = theme;
    htmlRoot.setAttribute("data-theme", theme);
    localStorage.setItem("inovasitech_theme", theme);
  }

  // Terapkan tema awal
  applyTheme(state.theme);

  // Event Handling: Klik tombol switch tema (Dark / Light)
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
      showToast(
        `Tema diubah ke ${newTheme === "dark" ? "Mode Gelap 🌙" : "Mode Terang ☀️"}`,
        "info"
      );
    });
  }

  /* ==========================================================================
     2. EVENT HANDLING: NAVBAR, SCROLL SPY, & MOBILE DRAWER
     ========================================================================== */
  const siteHeader = document.getElementById("siteHeader");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const backToTopBtn = document.getElementById("backToTopBtn");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const sections = document.querySelectorAll("main section[id]");

  // Toggle Hamburger Menu Mobile
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      mobileMenuBtn.classList.toggle("active");
      mobileMenuBtn.setAttribute("aria-expanded", isOpen);
      mobileDrawer.setAttribute("aria-hidden", !isOpen);
    });

    // Tutup drawer ketika salah satu link diklik
    mobileNavLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileMenuBtn.classList.remove("active");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileDrawer.setAttribute("aria-hidden", "true");
      });
    });
  }

  // Event Handling: Window Scroll (Sticky Header, Scroll Spy, Back to Top)
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Header Blur Effect
    if (scrollY > 50) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }

    // Back To Top Visibility
    if (scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }

    // Scroll Spy: Update active menu based on viewport position
    let currentSectionId = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
      mobileNavLinks.forEach(link => {
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });

  // Tombol kembali ke atas
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ==========================================================================
     3. ANIMASI ANGKA STATISTIK (HERO COUNTER)
     ========================================================================== */
  function animateCounters() {
    const counters = document.querySelectorAll(".metric-number");
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute("data-target"), 10) || 0;
      const duration = 1500; // 1.5 detik
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out curve
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(easeOutQuad * target);
        counter.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }
  animateCounters();

  /* ==========================================================================
     4. AJAX / FETCH API: MEMUAT DATA PORTOFOLIO DARI JSON
     ========================================================================== */
  const portfolioGrid = document.getElementById("portfolioGrid");
  const portfolioEmptyState = document.getElementById("portfolioEmptyState");
  const projectSearchInput = document.getElementById("projectSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const filterButtonGroup = document.getElementById("filterButtonGroup");
  const resetFilterBtn = document.getElementById("resetFilterBtn");

  /**
   * Mengambil data portofolio dari file eksternal data/projects.json via AJAX (Fetch API).
   * Dilengkapi penanganan fallback jika dijalankan langsung lewat browser (file://).
   */
  async function fetchProjects() {
    try {
      // Menampilkan indikator pemuatan (Loading State)
      portfolioGrid.innerHTML = `
        <div class="portfolio-loading">
          <div class="spinner"></div>
          <p>Memuat portofolio melalui Fetch API...</p>
        </div>
      `;

      // Melakukan request asinkron Fetch
      const response = await fetch("data/projects.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      state.projects = data;
    } catch (error) {
      console.warn("Fetch API error atau CORS file:// terdeteksi. Menggunakan fallback data:", error);
      // Fallback data dari data.js agar aplikasi tetap berjalan sempurna di lingkungan offline
      state.projects = typeof FALLBACK_PROJECTS !== "undefined" ? FALLBACK_PROJECTS : [];
    } finally {
      // DOM Manipulation: Render hasil data ke tampilan
      renderPortfolio();
    }
  }

  /* ==========================================================================
     5. DOM MANIPULATION: RENDERING KARTU PORTOFOLIO DINAMIS
     ========================================================================== */
  function renderPortfolio() {
    // Filter berdasarkan kategori dan teks pencarian
    const filtered = state.projects.filter(project => {
      const matchCategory = state.activeCategory === "all" || project.category === state.activeCategory;
      const query = state.searchQuery.toLowerCase().trim();
      const matchSearch = !query || 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tech.some(t => t.toLowerCase().includes(query));
      return matchCategory && matchSearch;
    });

    // Bersihkan isi container sebelumnya (DOM Manipulation)
    portfolioGrid.innerHTML = "";

    if (filtered.length === 0) {
      portfolioEmptyState.style.display = "block";
      return;
    }

    portfolioEmptyState.style.display = "none";

    // Membangun elemen kartu secara dinamis
    filtered.forEach(project => {
      const card = document.createElement("article");
      card.className = "project-card glass-card";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Lihat detail proyek ${project.title}`);

      // Tech tags markup
      const tagsHtml = project.tech
        .map(t => `<span class="tech-tag">${t}</span>`)
        .join("");

      card.innerHTML = `
        <div class="project-thumb">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
          <span class="project-badge">${project.badge}</span>
        </div>
        <div class="project-content">
          <span class="project-category">${project.categoryLabel}</span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <div class="project-tags">
            ${tagsHtml}
          </div>
          <div class="project-footer">
            <span class="project-client">Klien: ${project.client}</span>
            <span class="view-detail-link">Detail <i class="fa-solid fa-arrow-up-right-from-square"></i></span>
          </div>
        </div>
      `;

      // Event Handling: Klik kartu proyek untuk memicu dialog modal
      card.addEventListener("click", () => openProjectModal(project));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProjectModal(project);
        }
      });

      portfolioGrid.appendChild(card);
    });
  }

  // Event Handling: Filter Kategori Proyek
  if (filterButtonGroup) {
    filterButtonGroup.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;

      filterButtonGroup.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      state.activeCategory = btn.getAttribute("data-filter");
      renderPortfolio();
    });
  }

  // Event Handling: Real-time Search Input
  if (projectSearchInput) {
    projectSearchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = state.searchQuery.length > 0 ? "block" : "none";
      }
      renderPortfolio();
    });
  }

  // Clear Search Button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      projectSearchInput.value = "";
      state.searchQuery = "";
      clearSearchBtn.style.display = "none";
      projectSearchInput.focus();
      renderPortfolio();
    });
  }

  // Reset Filter Button on Empty State
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener("click", () => {
      state.activeCategory = "all";
      state.searchQuery = "";
      if (projectSearchInput) projectSearchInput.value = "";
      if (clearSearchBtn) clearSearchBtn.style.display = "none";
      if (filterButtonGroup) {
        filterButtonGroup.querySelectorAll(".filter-btn").forEach(b => {
          b.classList.toggle("active", b.getAttribute("data-filter") === "all");
        });
      }
      renderPortfolio();
    });
  }

  /* ==========================================================================
     6. DOM MANIPULATION: MODAL DETAIL PROYEK
     ========================================================================== */
  const projectModal = document.getElementById("projectModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalBody = document.getElementById("modalBody");

  function openProjectModal(project) {
    if (!projectModal || !modalBody) return;

    const tagsHtml = project.tech
      .map(t => `<span class="tech-tag">${t}</span>`)
      .join("");

    modalBody.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="modal-thumb">
      <span class="project-category">${project.categoryLabel} &bull; ${project.year}</span>
      <h2 class="modal-title" id="modalTitle">${project.title}</h2>
      <div class="modal-meta-row">
        <span><strong>Klien:</strong> ${project.client}</span>
        <span><strong>Status:</strong> ${project.badge}</span>
      </div>
      <div class="modal-stats-box">
        <i class="fa-solid fa-chart-line"></i> <strong>Dampak Hasil:</strong> ${project.stats}
      </div>
      <p class="modal-desc">${project.description}</p>
      <div class="modal-tech-stack">
        <strong><i class="fa-solid fa-layer-group"></i> Teknologi Terpakai:</strong>
        <div class="project-tags" style="margin-top: 0.5rem;">${tagsHtml}</div>
      </div>
    `;

    // Tampilkan modal secara native dengan dialog API
    if (typeof projectModal.showModal === "function") {
      projectModal.showModal();
    } else {
      projectModal.setAttribute("open", "");
    }
    projectModal.setAttribute("aria-hidden", "false");
  }

  function closeProjectModal() {
    if (!projectModal) return;
    if (typeof projectModal.close === "function") {
      projectModal.close();
    } else {
      projectModal.removeAttribute("open");
    }
    projectModal.setAttribute("aria-hidden", "true");
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeProjectModal);
  }

  // Tutup modal jika klik di luar area dialog
  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
    // Support Escape key
    projectModal.addEventListener("cancel", () => {
      projectModal.setAttribute("aria-hidden", "true");
    });
  }

  /* ==========================================================================
     7. AJAX / FETCH SIMULATION: KUTIPAN DINAMIS (QUOTE CHANGER)
     ========================================================================== */
  const newQuoteBtn = document.getElementById("newQuoteBtn");
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");

  if (newQuoteBtn && quoteText && quoteAuthor) {
    newQuoteBtn.addEventListener("click", async () => {
      newQuoteBtn.disabled = true;
      quoteText.style.opacity = "0.3";

      // Simulasi delay asynchronous fetching
      await new Promise(resolve => setTimeout(resolve, 300));

      const quotes = typeof INSPIRATIONAL_QUOTES !== "undefined" ? INSPIRATIONAL_QUOTES : [
        { quote: "Kode yang rapi adalah cerminan pikiran yang teratur.", author: "Pengembang Web" }
      ];

      state.currentQuoteIndex = (state.currentQuoteIndex + 1) % quotes.length;
      const selected = quotes[state.currentQuoteIndex];

      quoteText.textContent = `"${selected.quote}"`;
      quoteAuthor.textContent = `— ${selected.author}`;
      quoteText.style.opacity = "1";
      newQuoteBtn.disabled = false;
    });
  }

  /* ==========================================================================
     8. FORM VALIDATION & FEEDBACK UI
     ========================================================================== */
  const contactForm = document.getElementById("contactForm");
  const inputName = document.getElementById("inputName");
  const inputEmail = document.getElementById("inputEmail");
  const selectService = document.getElementById("selectService");
  const inputMessage = document.getElementById("inputMessage");
  const checkAgree = document.getElementById("checkAgree");
  const charCounter = document.getElementById("charCounter");
  const submitBtn = document.getElementById("submitBtn");

  // Regex validasi email standar RFC
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /**
   * Helper untuk validasi field tunggal dan manipulasi visual DOM
   */
  function validateField(inputElement, condition, groupElement) {
    if (condition) {
      groupElement.classList.remove("has-error");
      groupElement.classList.add("has-success");
      return true;
    } else {
      groupElement.classList.remove("has-success");
      groupElement.classList.add("has-error");
      return false;
    }
  }

  // Real-time live counter untuk textarea pesan
  if (inputMessage && charCounter) {
    inputMessage.addEventListener("input", () => {
      const length = inputMessage.value.trim().length;
      charCounter.textContent = `${length} / 250 karakter (min. 10)`;
      if (length >= 10) {
        charCounter.classList.add("valid");
      } else {
        charCounter.classList.remove("valid");
      }
      validateField(
        inputMessage,
        length >= 10,
        document.getElementById("groupMessage")
      );
    });
  }

  // Real-time validation pada event input & blur
  if (inputName) {
    inputName.addEventListener("input", () => {
      const isValid = inputName.value.trim().length >= 3;
      validateField(inputName, isValid, document.getElementById("groupName"));
    });
  }

  if (inputEmail) {
    inputEmail.addEventListener("input", () => {
      const isValid = emailRegex.test(inputEmail.value.trim());
      validateField(inputEmail, isValid, document.getElementById("groupEmail"));
    });
  }

  if (selectService) {
    selectService.addEventListener("change", () => {
      const isValid = selectService.value !== "";
      validateField(selectService, isValid, document.getElementById("groupService"));
    });
  }

  if (checkAgree) {
    checkAgree.addEventListener("change", () => {
      const isValid = checkAgree.checked;
      validateField(checkAgree, isValid, document.getElementById("groupAgree"));
    });
  }

  // Event Handling: Submit Form
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Validasi seluruh input secara menyeluruh
      const isNameValid = validateField(
        inputName,
        inputName.value.trim().length >= 3,
        document.getElementById("groupName")
      );

      const isEmailValid = validateField(
        inputEmail,
        emailRegex.test(inputEmail.value.trim()),
        document.getElementById("groupEmail")
      );

      const isServiceValid = validateField(
        selectService,
        selectService.value !== "",
        document.getElementById("groupService")
      );

      const isMessageValid = validateField(
        inputMessage,
        inputMessage.value.trim().length >= 10,
        document.getElementById("groupMessage")
      );

      const isAgreeValid = validateField(
        checkAgree,
        checkAgree.checked,
        document.getElementById("groupAgree")
      );

      const isFormValid = isNameValid && isEmailValid && isServiceValid && isMessageValid && isAgreeValid;

      if (!isFormValid) {
        // Animasi Shake pada form jika ada kesalahan
        contactForm.classList.add("shake");
        setTimeout(() => contactForm.classList.remove("shake"), 500);

        showToast("Mohon periksa kembali kolom formulir yang masih belum valid.", "error");
        return;
      }

      // Tampilkan status proses (Loading State)
      const btnText = submitBtn.querySelector(".btn-text");
      const btnSpinner = submitBtn.querySelector(".btn-spinner");
      submitBtn.disabled = true;
      btnText.textContent = "Mengirimkan Pesan...";
      btnSpinner.style.display = "inline-block";

      // Simulasi pengiriman data via AJAX (Fetch mock)
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Reset Form State
      contactForm.reset();
      document.querySelectorAll(".form-group").forEach(group => {
        group.classList.remove("has-success", "has-error");
      });
      if (charCounter) {
        charCounter.textContent = "0 / 250 karakter min";
        charCounter.classList.remove("valid");
      }

      submitBtn.disabled = false;
      btnText.textContent = "Kirim Pesan Sekarang";
      btnSpinner.style.display = "none";

      // Feedback Berhasil
      showToast(
        `Terima kasih, ${inputName.value || "Kawan"}! Pesan Anda berhasil dikirim secara simulasi.`,
        "success"
      );
    });
  }

  /* ==========================================================================
     9. DOM MANIPULATION: TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  const toastContainer = document.getElementById("toastContainer");

  function showToast(message, type = "info") {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let icon = `<i class="fa-solid fa-circle-info"></i>`;
    if (type === "success") icon = `<i class="fa-solid fa-circle-check"></i>`;
    if (type === "error") icon = `<i class="fa-solid fa-triangle-exclamation"></i>`;

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-msg">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Auto-remove setelah 4 detik
    setTimeout(() => {
      toast.classList.add("hide");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 350);
    }, 3800);
  }

  // Mulai memuat data portofolio
  fetchProjects();
});
