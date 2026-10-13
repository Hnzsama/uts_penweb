import { FALLBACK_PROJECTS } from "./data.js";

export function initPortfolio() {
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
