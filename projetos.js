/* =========================
   GALERIA DE PROJETOS
========================= */

const projects = {

    1: [
        "img/foto1tortinha.jpeg",
        "img/foto2.jpg",
        "img/foto3.jpeg"
    ],

    2: [
        "img/foto2.jpg",
        "img/foto4.jpeg",
        "img/foto1tortinha.jpeg"
    ],

    3: [
        "img/foto3.jpeg",
        "img/foto1tortinha.jpeg",
        "img/foto4.jpeg"
    ],

    4: [
        "img/foto4.jpeg",
        "img/foto2.jpg",
        "img/foto3.jpeg"
    ],

    5: [
        "img/foto1tortinha.jpeg",
        "img/foto3.jpeg",
        "img/foto2.jpg"
    ],

    6: [
        "img/foto2.jpg",
        "img/foto4.jpeg",
        "img/foto1tortinha.jpeg"
    ],

    7: [
        "img/foto3.jpeg",
        "img/foto2.jpg",
        "img/foto4.jpeg"
    ],

    8: [
        "img/foto4.jpeg",
        "img/foto1tortinha.jpeg",
        "img/foto3.jpeg"
    ]

};

const projectCards = document.querySelectorAll(".project-card");
const projectModal = document.querySelector(".project-modal");
const modalImage = document.getElementById("modal-image");

const closeModalBtn = document.querySelector(".close-modal");
const prevArrowBtn = document.querySelector(".prev-arrow");
const nextArrowBtn = document.querySelector(".next-arrow");

let currentProject = [];
let currentIndex = 0;

if (
    projectCards.length &&
    projectModal &&
    modalImage &&
    closeModalBtn &&
    prevArrowBtn &&
    nextArrowBtn
) {

    projectCards.forEach(card => {

        card.addEventListener("click", () => {

            const projectId = card.dataset.project;

            currentProject = projects[projectId];

            if (!currentProject) return;

            currentIndex = 0;

            modalImage.src = currentProject[currentIndex];

            projectModal.classList.add("active");
        });

    });

    function nextImage() {

        if (!currentProject.length) return;

        currentIndex++;

        if (currentIndex >= currentProject.length) {
            currentIndex = 0;
        }

        modalImage.src = currentProject[currentIndex];
    }

    function prevImage() {

        if (!currentProject.length) return;

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = currentProject.length - 1;
        }

        modalImage.src = currentProject[currentIndex];
    }

    nextArrowBtn.addEventListener("click", (e) => {

        e.stopPropagation();
        nextImage();

    });

    prevArrowBtn.addEventListener("click", (e) => {

        e.stopPropagation();
        prevImage();

    });

    closeModalBtn.addEventListener("click", () => {

        projectModal.classList.remove("active");

    });

    projectModal.addEventListener("click", (e) => {

        if (e.target === projectModal) {

            projectModal.classList.remove("active");

        }

    });

    document.addEventListener("keydown", (e) => {

        if (!projectModal.classList.contains("active")) return;

        if (e.key === "ArrowRight") {
            nextImage();
        }

        if (e.key === "ArrowLeft") {
            prevImage();
        }

        if (e.key === "Escape") {
            projectModal.classList.remove("active");
        }

    });

}

const menu = document.querySelector(".floating-menu");

let lastScroll = 0;

window.addEventListener("scroll", () => {

    const currentScroll = window.pageYOffset;

    // topo da página
    if (currentScroll <= 50) {
        menu.classList.remove("hide");
        return;
    }

    // rolando para baixo
    if (currentScroll > lastScroll) {
        menu.classList.add("hide");
    }

    // rolando para cima
    else {
        menu.classList.remove("hide");
    }

    lastScroll = currentScroll;
});

/* =========================
   MODAL FILMES
========================= */

const films = {

    cadafalso: {

        image: "img/cadafalsohorizontal.jpg",

        description:
            "Entre memórias fragmentadas e silêncios profundos, uma jovem enfrenta os ecos de um passado que insiste em permanecer. Cadafalso é uma jornada sensorial sobre identidade, culpa e a busca por pertencimento.",

        genre: "DRAMA PSICOLÓGICO",
        duration: "14 MIN",
        year: "2024",
        rating: "14",

        director: "Yohanna Fukui",
        editor: "Yohanna Fukui",
        producer: "FUKUIFILM",
        cast: "Júlia Souza, Ace Monteiro, Laís Ferreira",
        script: "Yohanna Fukui",
        runtime: "14 minutos",
        photo: "Yohanna Fukui",

        trailer: "#",

        festivals:
            "Festival de Cinema de Goiânia 2024 • Lift-Off Global Network 2024 • Oniros Film Awards 2024"

    },

    etre: {

        image: "img/etrehorizontal.png",

        description:
            "ÊTRE investiga presença, memória e existência através de uma narrativa contemplativa e visualmente minimalista.",

        genre: "EXPERIMENTAL",
        duration: "12 MIN",
        year: "2024",
        rating: "12",

        director: "Yohanna Fukui",
        editor: "Yohanna Fukui",
        producer: "FUKUIFILM",
        cast: "A definir",
        script: "Yohanna Fukui",
        runtime: "12 minutos",
        photo: "Yohanna Fukui",

        trailer: "#",

        festivals:
            "Em circuito de festivais"

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

const filmDirector = document.getElementById("film-director");
const filmEditor = document.getElementById("film-editor");
const filmProducer = document.getElementById("film-producer");
const filmCast = document.getElementById("film-cast");
const filmScript = document.getElementById("film-script");
const filmRuntime = document.getElementById("film-runtime");
const filmPhoto = document.getElementById("film-photo");

const filmTrailer = document.getElementById("film-trailer");
const filmFestivals = document.getElementById("film-festivals");

filmButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filmId = button.dataset.film;
        const film = films[filmId];

        if (!film) return;

        filmImage1.src = film.image;

        filmDescription.textContent = film.description;

        filmGenre.textContent = film.genre;
        filmDuration.textContent = film.duration;
        filmYear.textContent = film.year;
        filmRating.textContent = film.rating;

        filmDirector.textContent = film.director;
        filmEditor.textContent = film.editor;
        filmProducer.textContent = film.producer;
        filmCast.textContent = film.cast;
        filmScript.textContent = film.script;
        filmRuntime.textContent = film.runtime;
        filmPhoto.textContent = film.photo;

        filmTrailer.href = film.trailer;

        filmFestivals.textContent = film.festivals;

        filmModal.classList.add("active");

    });

});

filmClose.addEventListener("click", () => {

    filmModal.classList.remove("active");

});

filmModal.addEventListener("click", (e) => {

    if (e.target === filmModal) {

        filmModal.classList.remove("active");

    }

});

document.addEventListener("keydown", (e) => {

    if (!filmModal.classList.contains("active")) return;

    if (e.key === "Escape") {

        filmModal.classList.remove("active");

    }

});