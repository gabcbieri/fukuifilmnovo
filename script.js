/* =========================
   BUDGET MODAL
========================= */

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
      <button class="budget-modal__close" type="button" data-budget-close>X</button>
      <p class="budget-modal__eyebrow">WhatsApp</p>
      <h2 id="budget-modal-title">Ir para o WhatsApp?</h2>
      <p>Vamos abrir uma conversa para solicitar seu orçamento.</p>
      <div class="budget-modal__actions">
        <button class="budget-modal__cancel" type="button" data-budget-close>Cancelar</button>
        <a class="budget-modal__confirm" href="#" target="_blank">Continuar</a>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const confirmLink  = modal.querySelector(".budget-modal__confirm");
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
    if (lastFocusedElement) lastFocusedElement.focus();
  };

  budgetTriggers.forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(trigger.href);
    });
  });

  closeControls.forEach(btn => btn.addEventListener("click", closeModal));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
}


/* =========================
   LIGHTBOX
========================= */

const lightboxLinks = Array.from(document.querySelectorAll("[data-lightbox-image]"));

if (lightboxLinks.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.hidden = true;

  lightbox.innerHTML = `
    <button data-lightbox-close>X</button>
    <button data-lightbox-prev><</button>
    <img />
    <button data-lightbox-next>></button>
  `;

  document.body.appendChild(lightbox);

  const img     = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector("[data-lightbox-close]");
  const prevBtn  = lightbox.querySelector("[data-lightbox-prev]");
  const nextBtn  = lightbox.querySelector("[data-lightbox-next]");

  let index = 0;
  let group = lightboxLinks;
  let lastFocus = null;

  function show(i) {
    index = (i + group.length) % group.length;
    const link = group[index];
    img.src = link.href;
    img.alt = link.querySelector("img")?.alt || "";
  }

  function open(link) {
    lastFocus = document.activeElement;
    const groupName = link.dataset.lightboxGroup;
    group = groupName
      ? lightboxLinks.filter(l => l.dataset.lightboxGroup === groupName)
      : lightboxLinks;
    index = group.indexOf(link);
    show(index);
    lightbox.hidden = false;
    closeBtn.focus();
  }

  function close() {
    lightbox.hidden = true;
    img.src = "";
    lastFocus?.focus();
  }

  lightboxLinks.forEach(link => {
    link.addEventListener("click", e => { e.preventDefault(); open(link); });
  });

  closeBtn.onclick = close;
  prevBtn.onclick  = () => show(index - 1);
  nextBtn.onclick  = () => show(index + 1);

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape")      close();
    if (e.key === "ArrowLeft")   show(index - 1);
    if (e.key === "ArrowRight")  show(index + 1);
  });
}


/* =========================
   MENU — HIDE ON SCROLL
========================= */

const menu = document.querySelector(".floating-menu");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const current = window.pageYOffset;

  // Nao esconde quando o menu mobile esta aberto
  if (document.body.classList.contains("menu-open")) return;

  if (current <= 50) {
    menu.classList.remove("hide");
  } else if (current > lastScroll) {
    menu.classList.add("hide");
  } else {
    menu.classList.remove("hide");
  }

  lastScroll = current;
}, { passive: true });


/* =========================
   MENU — MOBILE TOGGLE
========================= */

const nav        = document.getElementById("main-navigation");
const toggleBtn  = document.querySelector(".menu-toggle");

if (nav && toggleBtn) {

  function openMobileMenu() {
    nav.classList.add("open");
    menu.classList.remove("hide");            // garante que o menu aparece
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.innerHTML = `<i class="fas fa-times"></i>`;
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";  // trava scroll da pagina
  }

  function closeMobileMenu() {
    nav.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.innerHTML = `<i class="fas fa-bars"></i>`;
    document.body.classList.remove("menu-open");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", () => {
    nav.classList.contains("open") ? closeMobileMenu() : openMobileMenu();
  });

  // Fecha ao clicar em qualquer link
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Fecha com Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      closeMobileMenu();
      toggleBtn.focus();
    }
  });

  // Fecha ao clicar fora do menu
  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("open")) return;
    if (!menu.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Fecha ao passar para desktop (ex: rotacao de tela)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1023 && nav.classList.contains("open")) {
      closeMobileMenu();
    }
  });
}


/* =========================
   METODO SLIDER
========================= */

const methodSlides  = document.querySelectorAll(".method-slide");
const prevMethodBtn = document.getElementById("prevMethod");
const nextMethodBtn = document.getElementById("nextMethod");

if (methodSlides.length && prevMethodBtn && nextMethodBtn) {

  let currentMethod = 0;

  function updateMethod() {
    methodSlides.forEach(s => s.classList.remove("active"));
    methodSlides[currentMethod].classList.add("active");

    prevMethodBtn.disabled = currentMethod === 0;
    nextMethodBtn.disabled = currentMethod === methodSlides.length - 1;

    prevMethodBtn.classList.toggle("disabled", currentMethod === 0);
    nextMethodBtn.classList.toggle("disabled", currentMethod === methodSlides.length - 1);
  }

  function moveMethod(dir) {
    currentMethod = Math.max(0, Math.min(methodSlides.length - 1, currentMethod + dir));
    updateMethod();
  }

  prevMethodBtn.addEventListener("click", () => moveMethod(-1));
  nextMethodBtn.addEventListener("click", () => moveMethod(1));

  // Swipe touch
  const methodSlider = document.querySelector(".method-slider");
  if (methodSlider) {
    let touchStartX = 0;
    methodSlider.addEventListener("touchstart", e => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    methodSlider.addEventListener("touchend", e => {
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) < 40) return;
      moveMethod(delta < 0 ? 1 : -1);
    }, { passive: true });
  }

  // Teclado (so quando a secao esta visivel)
  document.addEventListener("keydown", (e) => {
    const section = document.querySelector("#metodo");
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    if (e.key === "ArrowLeft")  moveMethod(-1);
    if (e.key === "ArrowRight") moveMethod(1);
  });

  updateMethod();
}


/* =========================
   SERVICOS SLIDER
========================= */

const track      = document.querySelector(".services-track");
const prevServBtn = document.querySelector(".services-section .prev");
const nextServBtn = document.querySelector(".services-section .next");
const cards      = document.querySelectorAll(".service-card");

if (track && prevServBtn && nextServBtn && cards.length) {

  let currentSlide = 0;

  function getSlidesPerView() {
    return window.innerWidth <= 767 ? 1 : 2;
  }

  function getMaxSlide() {
    return Math.ceil(cards.length / getSlidesPerView()) - 1;
  }

  function updateServices() {
    const spv       = getSlidesPerView();
    const cardWidth = cards[0].offsetWidth + 20;
    track.style.transform = `translateX(-${currentSlide * cardWidth * spv}px)`;
  }

  function moveServices(dir) {
    currentSlide = Math.max(0, Math.min(getMaxSlide(), currentSlide + dir));
    updateServices();
  }

  prevServBtn.addEventListener("click", () => moveServices(-1));
  nextServBtn.addEventListener("click", () => moveServices(1));

  // Swipe touch
  let touchStartX = 0;
  track.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  track.addEventListener("touchend", e => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) < 40) return;
    moveServices(delta < 0 ? 1 : -1);
  }, { passive: true });

  // Teclado (so quando a secao esta visivel)
  document.addEventListener("keydown", (e) => {
    const section = document.querySelector("#servicos");
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    if (e.key === "ArrowLeft")  moveServices(-1);
    if (e.key === "ArrowRight") moveServices(1);
  });

  // Recalcula ao redimensionar
  window.addEventListener("resize", () => {
    currentSlide = 0;
    updateServices();
  });

  updateServices();
}


/* =========================
   FAQ
========================= */

document.querySelectorAll(".standards-faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item   = btn.closest(".standards-faq-item");
    const isOpen = item.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", isOpen);
  });
});