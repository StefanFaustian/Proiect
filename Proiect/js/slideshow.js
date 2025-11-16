let slides = document.querySelectorAll(".slideshow-wrapper a");
const derStanga = document.querySelector(".stanga");
const derDreapta = document.querySelector(".dreapta");

let slideIndex = 0;
let slideTimeout;

function afisareSlide(n) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    slides[n].classList.add('active');
}

function urmatorulSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    afisareSlide(slideIndex);
    resetareTimeout();
}

function precedentulSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    afisareSlide(slideIndex);
    resetareTimeout();
}

function resetareTimeout() {
    clearTimeout(slideTimeout);
    slideTimeout = setTimeout(urmatorulSlide, 3500);
}

derStanga.addEventListener("click", precedentulSlide);
derDreapta.addEventListener("click", urmatorulSlide);

afisareSlide(slideIndex);
resetareTimeout();
