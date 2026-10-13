function initTheme() {
  const toggleBtn = document.getElementById("themeToggle");
  const isLight = localStorage.getItem("theme") === "light";

  if (isLight) {
    document.body.classList.add("light-theme");
  }

  if (toggleBtn) {
    toggleBtn.textContent = isLight ? "☀️" : "🌙";

    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const currentLight = document.body.classList.contains("light-theme");
      toggleBtn.textContent = currentLight ? "☀️" : "🌙";
      localStorage.setItem("theme", currentLight ? "light" : "dark");
    });
  }
}
