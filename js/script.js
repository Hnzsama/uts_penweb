const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: "FinTech Banking App",
    category: "web",
    description: "Aplikasi dashboard finansial interaktif untuk analitik keuangan secara real-time.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Smart Home IoT",
    category: "mobile",
    description: "Antarmuka aplikasi kontrol perangkat rumah pintar dengan integrasi sensor IoT.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Nusantara Coffee Brand",
    category: "desain",
    description: "Identitas visual dan katalog digital produk kopi nusantara ramah lingkungan.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Telemedicine Care Portal",
    category: "web",
    description: "Portal layanan konsultasi dokter online dan rekam medis digital pasien.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
  }
];

function initTheme() {
  const toggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const isLight = localStorage.getItem("theme") === "light";

  if (isLight) {
    document.body.classList.add("light-theme");
  }

  updateIcon(isLight);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const currentLight = document.body.classList.contains("light-theme");
      updateIcon(currentLight);
      localStorage.setItem("theme", currentLight ? "light" : "dark");
    });
  }

  function updateIcon(light) {
    if (!themeIcon) return;
    themeIcon.src = light
      ? "assets/images/sun-regular-full.svg"
      : "assets/images/moon-regular-full.svg";
  }
}

function initPortfolio() {
  let projects = [];
  const grid = document.getElementById("portfolioGrid");
  const searchInput = document.getElementById("searchInput");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  fetch("data/projects.json")
    .then(res => res.json())
    .then(data => {
      projects = data;
      renderProjects(projects);
    })
    .catch(() => {
      projects = typeof FALLBACK_PROJECTS !== "undefined" ? FALLBACK_PROJECTS : [];
      renderProjects(projects);
    });

  function renderProjects(list) {
    if (!grid) return;
    if (list.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">Proyek tidak ditemukan.</p>`;
      return;
    }

    grid.innerHTML = list.map(item => `
      <article class="card" onclick="openDetail(${item.id})">
        <div class="card-thumb-wrap">
          <img src="${item.image}" alt="${item.title}" class="card-thumb" loading="lazy">
        </div>
        <div class="card-body">
          <span class="card-tag">${item.category.toUpperCase()}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </article>
    `).join("");
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.filter;
      const filtered = category === "all" ? projects : projects.filter(p => p.category === category);
      renderProjects(filtered);
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const keyword = e.target.value.toLowerCase().trim();
      const filtered = projects.filter(p =>
        p.title.toLowerCase().includes(keyword) || p.description.toLowerCase().includes(keyword)
      );
      renderProjects(filtered);
    });
  }

  window.openDetail = (id) => {
    const p = projects.find(item => item.id === id);
    if (!p || !modal) return;

    modalBody.innerHTML = `
      <img src="${p.image}" alt="${p.title}" class="modal-img">
      <span class="card-tag">${p.category.toUpperCase()}</span>
      <h2 class="modal-title">${p.title}</h2>
      <p class="modal-desc">${p.description}</p>
    `;
    modal.showModal();
  };

  if (modalClose) {
    modalClose.addEventListener("click", () => modal.close());
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });
  }
}

function initForm() {
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (name.length < 3) {
      showFeedback("Nama wajib diisi minimal 3 karakter!", "error");
      return;
    }

    if (!emailRegex.test(email)) {
      showFeedback("Format alamat email tidak valid!", "error");
      return;
    }

    if (message.length < 5) {
      showFeedback("Pesan wajib diisi minimal 5 karakter!", "error");
      return;
    }

    showFeedback(`Terima kasih, ${name}! Pesan Anda berhasil dikirim.`, "success");
    form.reset();
  });

  function showFeedback(text, type) {
    if (!feedback) return;
    feedback.textContent = text;
    feedback.className = `feedback-box ${type}`;
    feedback.style.display = "block";
  }
}

function initNav() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    navToggle.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.textContent = "☰";
    });
  });

  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove("open");
      navToggle.textContent = "☰";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  initPortfolio();
  initForm();
});
