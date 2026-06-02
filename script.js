const budgetTriggers = document.querySelectorAll("[data-budget-trigger]");
if (budgetTriggers.length) {
  const modal = document.createElement("div");
  modal.className = "budget-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "budget-modal-title");
  modal.hidden = true;
  modal.innerHTML = `
    <div class="budget-modal__overlay" data-budget-close></div>
    <div class="budget-modal__panel">
      <button class="budget-modal__close" type="button" aria-label="Fechar" data-budget-close>X</button>
      <p class="budget-modal__eyebrow">WhatsApp</p>
      <h2 id="budget-modal-title">Ir para o WhatsApp?</h2>
      <p>Vamos abrir uma conversa para solicitar seu orçamento.</p>
      <div class="budget-modal__actions">
        <button class="budget-modal__cancel" type="button" data-budget-close>Cancelar</button>
        <a class="budget-modal__confirm" href="#" target="_blank" rel="noreferrer">Continuar</a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  const confirmLink = modal.querySelector(".budget-modal__confirm");
  const closeControls = modal.querySelectorAll("[data-budget-close]");
  let lastFocusedElement = null;
  const openModal = (href) => {
    lastFocusedElement = document.activeElement;
    confirmLink.href = href;
    modal.hidden = false;
    document.body.classList.add("budget-modal-open");
    confirmLink.focus();
  };
  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("budget-modal-open");
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };
  budgetTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(trigger.href);
    });
  });
  closeControls.forEach((control) => {
    control.addEventListener("click", closeModal);
  });
  confirmLink.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}

const lightboxLinks = Array.from(document.querySelectorAll("[data-lightbox-image]"));
if (lightboxLinks.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Visualizacao de imagem");
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <button class="image-lightbox__close" type="button" aria-label="Fechar" data-lightbox-close>X</button>
    <button class="image-lightbox__nav image-lightbox__nav--prev" type="button" aria-label="Imagem anterior" data-lightbox-prev>&lt;</button>
    <img class="image-lightbox__image" src="" alt="" />
    <button class="image-lightbox__nav image-lightbox__nav--next" type="button" aria-label="Proxima imagem" data-lightbox-next>&gt;</button>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector(".image-lightbox__image");
  const closeButton = lightbox.querySelector("[data-lightbox-close]");
  const prevButton = lightbox.querySelector("[data-lightbox-prev]");
  const nextButton = lightbox.querySelector("[data-lightbox-next]");
  let currentImageIndex = 0;
  let currentLightboxGroup = lightboxLinks;
  let lastFocusedImageLink = null;

  const showImage = (index) => {
    currentImageIndex = (index + currentLightboxGroup.length) % currentLightboxGroup.length;
    const link = currentLightboxGroup[currentImageIndex];
    const image = link.querySelector("img");
    lightboxImage.src = link.href;
    lightboxImage.alt = image ? image.alt : link.textContent.trim();
  };

  const openLightbox = (link) => {
    lastFocusedImageLink = document.activeElement;
    const groupName = link.dataset.lightboxGroup;
    currentLightboxGroup = groupName
      ? lightboxLinks.filter((item) => item.dataset.lightboxGroup === groupName)
      : lightboxLinks;
    showImage(currentLightboxGroup.indexOf(link));
    lightbox.hidden = false;
    document.body.classList.add("image-lightbox-open");
    closeButton.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImage.src = "";
    document.body.classList.remove("image-lightbox-open");
    if (lastFocusedImageLink) {
      lastFocusedImageLink.focus();
    }
  };

  const showPreviousImage = () => {
    showImage(currentImageIndex - 1);
  };

  const showNextImage = () => {
    showImage(currentImageIndex + 1);
  };

  lightboxLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openLightbox(link);
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  prevButton.addEventListener("click", showPreviousImage);
  nextButton.addEventListener("click", showNextImage);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) {
      return;
    }
    if (event.key === "Escape") {
      closeLightbox();
    }
    if (event.key === "ArrowLeft") {
      showPreviousImage();
    }
    if (event.key === "ArrowRight") {
      showNextImage();
    }
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const floatingMenu = document.querySelector(".floating-menu");
const menuContents = document.querySelector(".menu-contents");
const menuClose = document.querySelector("[data-menu-close]");

if (menuToggle && floatingMenu && menuContents) {
  const closeMenu = () => {
    floatingMenu.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuContents.setAttribute("aria-hidden", "true");
  };

  const openMenu = () => {
    floatingMenu.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu");
    menuContents.setAttribute("aria-hidden", "false");
  };

  menuToggle.addEventListener("click", () => {
    if (floatingMenu.classList.contains("menu-open")) {
      closeMenu();
      return;
    }

    openMenu();
  });

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }

  menuContents.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

const standardsFaqButtons = document.querySelectorAll(".standards-faq-question");

standardsFaqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".standards-faq-item");

    if (!item) {
      return;
    }

    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

const video = document.getElementById("introVideo");
video.src =
  window.innerWidth <= 1098
  ? "https://res.cloudinary.com/dtv1yh9pa/video/upload/v1779385108/intromobile_ur8wg0.mp4"
    : "https://res.cloudinary.com/dtv1yh9pa/video/upload/intro_zgtmgs.mp4";

video.load();