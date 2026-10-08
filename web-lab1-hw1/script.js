const themeToggle = document.querySelector("#theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  root.setAttribute("data-theme", "dark");
  themeToggle.setAttribute("aria-pressed", "true");
  themeToggle.textContent = "☀";
} else {
  root.setAttribute("data-theme", "light");
  themeToggle.setAttribute("aria-pressed", "false");
  themeToggle.textContent = "☾";
}

themeToggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";

  if (isDark) {
    root.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    themeToggle.setAttribute("aria-pressed", "false");
    themeToggle.textContent = "☾";
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeToggle.setAttribute("aria-pressed", "true");
    themeToggle.textContent = "☀";
  }
});