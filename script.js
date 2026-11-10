const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");
const themeToggle = document.querySelector(".theme-toggle");
const rememberThemeToggle = document.querySelector(".theme-remember-input");
const themeColor = document.querySelector('meta[name="theme-color"]');
const themePreferenceKey = "manas-chronicle-theme";
const rememberThemeKey = "manas-chronicle-remember-theme";

const applyTheme = (theme) => {
  const isDark = theme === "dark";
  const nextThemeLabel = isDark ? "Light mode" : "Dark mode";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute("aria-label", `Switch to ${nextThemeLabel.toLowerCase()}`);
  const themeToggleText = themeToggle?.querySelector("span");
  if (themeToggleText) themeToggleText.textContent = nextThemeLabel;
  themeColor?.setAttribute("content", isDark ? "#1d1c1a" : "#f2efe8");
};

if (themeToggle && rememberThemeToggle) {
  const storedPreference = localStorage.getItem(themePreferenceKey);
  const shouldRemember = localStorage.getItem(rememberThemeKey) === "true";
  const initialTheme =
    shouldRemember && (storedPreference === "light" || storedPreference === "dark")
      ? storedPreference
      : "light";

  rememberThemeToggle.checked = shouldRemember && (storedPreference === "light" || storedPreference === "dark");
  applyTheme(initialTheme);

  const savePreference = (theme) => {
    if (rememberThemeToggle.checked) {
      localStorage.setItem(themePreferenceKey, theme);
      localStorage.setItem(rememberThemeKey, "true");
      return;
    }
    localStorage.removeItem(themePreferenceKey);
    localStorage.removeItem(rememberThemeKey);
  };

  themeToggle.addEventListener("click", () => {
    const nextTheme = themeToggle.getAttribute("aria-pressed") === "true" ? "light" : "dark";
    applyTheme(nextTheme);
    savePreference(nextTheme);
  });

  rememberThemeToggle.addEventListener("change", () => {
    const currentTheme = themeToggle.getAttribute("aria-pressed") === "true" ? "dark" : "light";
    savePreference(currentTheme);
  });
}

if (menuToggle && navigation) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navigation.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const imageViewer = document.querySelector(".image-viewer");
const imageViewerImage = imageViewer?.querySelector(".image-viewer-image");
const imageViewerClose = imageViewer?.querySelector(".image-viewer-close");

if (imageViewer instanceof HTMLDialogElement && imageViewerImage instanceof HTMLImageElement && imageViewerClose) {
  document.querySelectorAll(".project-image-button").forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector(".project-architecture");
      if (!(image instanceof HTMLImageElement)) return;
      imageViewerImage.src = image.currentSrc || image.src;
      imageViewerImage.alt = image.alt;
      imageViewer.showModal();
    });
  });

  imageViewerClose.addEventListener("click", () => imageViewer.close());
  imageViewer.addEventListener("click", (event) => {
    if (event.target === imageViewer) imageViewer.close();
  });
  imageViewer.addEventListener("keydown", (event) => {
    if (event.key === "Escape") imageViewer.close();
  });
}
