/* =========================
   MODAL FILMES
========================= */

const films = {

    cadafalso: {

        image: "img/cadafalsohorizontal.jpg",

        description:
            "Um drama psicológico que acompanha diferentes personagens marcados por traumas, culpa e violência, revelando como cada escolha pode conduzir a um inevitável confronto com as próprias consequências.",

        genre: "DRAMA PSICOLÓGICO",
        duration: "14 MIN",
        year: "2024",
        rating: "14",
        classification: "CLASSIFICAÇÃO 14 ANOS",

        director: "Yohana Fukui",
        editor: "—",
        producer: "Jade Monteiro<br>Taly Lima<br>Yohana Fukui",
        cast: "Vêronica Bornhofen (Carla)<br>Sarah Motta (Bárbara)<br>Guilherme Klabunde (Mateus)<br>Sabrina Vianna (Ana)",
        script: "Julia Souza<br>Nicole Cunha<br>Ella Pierreserra",
        runtime: "14 minutos",
        photo: "Juliano Freitas<br>Bruno BM<br>Yohana Fukui<br>Junior Lara",

        trailer: "https://www.youtube.com/watch?v=ilqoIrWkjSc",

        festivals:
            "Festival de Cinema de Goiânia 2024 • Lift-Off Global Network 2024 • Oniros Film Awards 2024"

    },

    etre: {

        image: "img/etrehorizontal.png",

        description:
            "Um curta que explora identidade, pertencimento e a experiência humana através de uma narrativa sensível e intimista.",

        genre: "DRAMA",
        duration: "10 MIN",
        year: "2024",
        rating: "LIVRE",
        classification: "LIVRE PARA TODOS OS PÚBLICOS",

        director: "Yohana Fukui",
        editor: "Pedro Garcia",
        producer: "—",
        cast: "Ella Pierreserra<br>Melyssa Mell Gomes<br>Isadora Tavares",
        script: "Ana Claudia Sguário",
        runtime: "10 minutos",
        photo: "Yohana Fukui",

        trailer: "",

        festivals: ""

    }

};

const filmButtons = document.querySelectorAll(".film-btn");
const filmModal = document.querySelector(".film-modal");
const filmClose = document.querySelector(".film-close");

const filmImage1 = document.getElementById("film-image-1");

const filmDescription = document.getElementById("film-description");

const filmGenre = document.getElementById("film-genre");
const filmDuration = document.getElementById("film-duration");
const filmYear = document.getElementById("film-year");
const filmRating = document.getElementById("film-rating");
const filmClassification = document.getElementById("film-classification");

const filmDirector = document.getElementById("film-director");
const filmEditor = document.getElementById("film-editor");
const filmProducer = document.getElementById("film-producer");
const filmCast = document.getElementById("film-cast");
const filmScript = document.getElementById("film-script");
const filmRuntime = document.getElementById("film-runtime");
const filmPhoto = document.getElementById("film-photo");

const filmTrailer = document.getElementById("film-trailer");
const filmFestivals = document.getElementById("film-festivals");

const filmLineTech = document.getElementById("film-line-tech");
const filmTechBlock = document.getElementById("film-tech-block");
const filmLineBottom = document.getElementById("film-line-bottom");
const filmBottomBlock = document.getElementById("film-bottom-block");
const filmWatchBlock = document.getElementById("film-watch-block");
const filmFestivalsBlock = document.getElementById("film-festivals-block");

let lastFocusedFilmTrigger = null;

if (filmButtons.length && filmModal && filmClose) {

    filmButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filmId = button.dataset.film;
            const film = films[filmId];

            if (!film) return;

            lastFocusedFilmTrigger = button;

            filmImage1.src = film.image;
            filmImage1.alt = filmId;

            filmDescription.textContent = film.description;

            filmGenre.textContent = film.genre;
            filmDuration.textContent = film.duration;
            filmYear.textContent = film.year;
            filmRating.textContent = film.rating;
            filmClassification.textContent = film.classification;

            // FICHA TECNICA — so exibe se o filme tiver esses dados
            const hasTechSheet = !!film.director;

            if (hasTechSheet) {
                filmDirector.innerHTML = film.director;
                filmEditor.innerHTML = film.editor;
                filmProducer.innerHTML = film.producer;
                filmCast.innerHTML = film.cast;
                filmScript.innerHTML = film.script;
                filmRuntime.innerHTML = film.runtime;
                filmPhoto.innerHTML = film.photo;
            }

            filmLineTech.style.display = hasTechSheet ? "" : "none";
            filmTechBlock.style.display = hasTechSheet ? "" : "none";

            // ASSISTIR — so exibe se houver link de trailer
            const hasTrailer = !!film.trailer;

            if (hasTrailer) {
                filmTrailer.href = film.trailer;
            }

            filmWatchBlock.style.display = hasTrailer ? "" : "none";

            // FESTIVAIS E EXIBICOES — so exibe se houver essa informacao
            const hasFestivals = !!film.festivals;

            if (hasFestivals) {
                filmFestivals.textContent = film.festivals;
            }

            filmFestivalsBlock.style.display = hasFestivals ? "" : "none";

            // Linha e bloco inferior somem por completo se nao houver
            // nem trailer nem festivais para mostrar
            const showBottomRow = hasTrailer || hasFestivals;

            filmLineBottom.style.display = showBottomRow ? "" : "none";
            filmBottomBlock.style.display = showBottomRow ? "" : "none";
            filmBottomBlock.classList.toggle("film-bottom--single", showBottomRow && (!hasTrailer || !hasFestivals));

            filmModal.classList.add("active");
            document.body.classList.add("modal-open");
            filmClose.focus();

        });

    });

    function closeFilmModal() {
        filmModal.classList.remove("active");
        document.body.classList.remove("modal-open");
        if (lastFocusedFilmTrigger) lastFocusedFilmTrigger.focus();
    }

    filmClose.addEventListener("click", closeFilmModal);

    filmModal.addEventListener("click", (e) => {
        if (e.target === filmModal) {
            closeFilmModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (!filmModal.classList.contains("active")) return;
        if (e.key === "Escape") {
            closeFilmModal();
        }
    });

}

/* =========================
   MENU — MOBILE TOGGLE
========================= */

const nav = document.getElementById("main-navigation");
const toggleBtn = document.querySelector(".menu-toggle");

if (nav && toggleBtn && menu) {

    function openMobileMenu() {
        nav.classList.add("open");
        menu.classList.remove("hide");
        toggleBtn.setAttribute("aria-expanded", "true");
        toggleBtn.innerHTML = `<i class="fas fa-times"></i>`;
        document.body.classList.add("menu-open");
        document.body.style.overflow = "hidden";
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

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && nav.classList.contains("open")) {
            closeMobileMenu();
            toggleBtn.focus();
        }
    });

    document.addEventListener("click", (e) => {
        if (!nav.classList.contains("open")) return;
        if (!menu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1023 && nav.classList.contains("open")) {
            closeMobileMenu();
        }
    });

}

/* =========================
   HOVER -> TOQUE (MOBILE)
   Ativa estados de :hover (project-card, film-block, service-card,
   projects-gallery img) atraves de toque em telas sem mouse.
========================= */

(function enableTouchHover() {

    const touchHoverSelectors = [
        ".project-card",
        ".service-card",
        ".film-block",
        ".projects-gallery img"
    ];

    const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (!isTouchDevice) return;

    const activeClass = "is-touch-active";

    function clearActive(except) {
        document.querySelectorAll("." + activeClass).forEach(el => {
            if (el !== except) el.classList.remove(activeClass);
        });
    }

    touchHoverSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.addEventListener("touchstart", (e) => {
                const alreadyActive = el.classList.contains(activeClass);
                clearActive(el);
                el.classList.toggle(activeClass, !alreadyActive);
            }, { passive: true });
        });
    });

    document.addEventListener("touchstart", (e) => {
        const insideTarget = touchHoverSelectors.some(sel =>
            e.target.closest(sel)
        );
        if (!insideTarget) clearActive();
    }, { passive: true });

})();