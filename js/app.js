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
