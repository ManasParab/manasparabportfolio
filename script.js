const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");

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
