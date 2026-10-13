export function initTheme() {
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
