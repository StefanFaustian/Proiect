const meniuBurger = document.querySelector(".burger-cuprins");
const cuprins = document.querySelector(".container-pag aside");

meniuBurger.addEventListener("click", () => {
    cuprins.classList.toggle("cuprins-activ");

    if (cuprins.classList.contains("cuprins-activ")) {
            meniuBurger.style.backgroundColor = "gainsboro";
        } else {
            meniuBurger.style.backgroundColor = "";
        }
});