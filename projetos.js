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
        title: "CADAFALSO",
        images: [
            "img/piove1.jpg",
            "img/piove1.jpg",
            "img/piove1.jpg",
            "img/piove1.jpg"
        ],
        description: `
        Cadafalso é uma produção autoral da FUKUIFILM que explora temas
        de identidade, memória e conflito interno através de uma linguagem
        visual intensa e cinematográfica.

        O filme utiliza fotografia contrastada, composição cuidadosa
        e narrativa simbólica para construir uma experiência emocional
        marcante para o espectador.
        `
    },

    etre: {
        title: "ÊTRE",
        images: [
            "img/piove1.jpg",
            "img/piove1.jpg",
            "img/piove1.jpg",
            "img/piove1.jpg"
        ],
        description: `
        ÊTRE é um projeto experimental focado na percepção humana,
        presença e existência.

        Com uma direção visual minimalista e atmosfera contemplativa,
        o filme propõe uma reflexão sobre quem somos, como ocupamos
        os espaços e como construímos nossa identidade.
        `
    }

};

const filmButtons = document.querySelectorAll(".film-btn");
const filmModal = document.querySelector(".film-modal");

const filmTitle = document.getElementById("film-title");
const filmDescription = document.getElementById("film-description");

const filmImage1 = document.getElementById("film-image-1");
const filmImage2 = document.getElementById("film-image-2");
const filmImage3 = document.getElementById("film-image-3");
const filmImage4 = document.getElementById("film-image-4");

const filmClose = document.querySelector(".film-close");

filmButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filmId = button.dataset.film;
        const film = films[filmId];

        if (!film) return;

        filmTitle.textContent = film.title.toUpperCase();
        filmDescription.textContent = film.description.trim();

        filmImage1.src = film.images[0];
        filmImage2.src = film.images[1];
        filmImage3.src = film.images[2];
        filmImage4.src = film.images[3];

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