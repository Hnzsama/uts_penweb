import { initTheme } from "./theme.js";
import { initNav } from "./app.js";
import { initPortfolio } from "./portfolio.js";
import { initForm } from "./form.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  initPortfolio();
  initForm();
});
