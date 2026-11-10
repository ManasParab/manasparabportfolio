const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");
const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

const applyTheme = (theme) => {
  const isSystem = theme === "system";
  const isDark = isSystem ? systemTheme.matches : theme === "dark";
  if (isSystem) {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = theme;
  }
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeColor?.setAttribute("content", isDark ? "#1d1c1a" : "#f2efe8");
};

if (themeToggle) {
  const storedPreference = localStorage.getItem("manas-chronicle-theme");
  applyTheme(
    storedPreference === "light" || storedPreference === "dark"
      ? storedPreference
      : "system",
  );

  themeToggle.addEventListener("click", () => {
    const nextTheme = themeToggle.getAttribute("aria-pressed") === "true" ? "light" : "dark";
    localStorage.setItem("manas-chronicle-theme", nextTheme);
    applyTheme(nextTheme);
  });

  systemTheme.addEventListener("change", (event) => {
    if (!localStorage.getItem("manas-chronicle-theme")) {
      applyTheme("system");
    }
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
