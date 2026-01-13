// fetch("json/filme.json").then(function(response) {
//     if(response.status == 200)
//         return response.json();
//     else
//         throw "Eroare";
// }).then(function(filmeLocal) {
//     filme = filmeLocal;
//     for (let i = 0; i<filme.length; i++) {
//         let filmCurent = document.getElementById(`${filme[i].id}`)
//         let titluFilmCurent = filmCurent.querySelector("h6");
//         filmCurent.style.backgroundImage = `url("${filme[i].poster}")`;
//         titluFilmCurent.innerText = `${filme[i].titlu} (${filme[i].an})`
//     }
// }).catch(function(err) {
//     alert(err);
// })

function loadDeVazut() {
    return JSON.parse(localStorage.getItem("filmeDeVazut") || "[]");
}

function saveDeVazut(filmeDeVazut) {
    localStorage.setItem("filmeDeVazut", JSON.stringify(filmeDeVazut));
}

let filme = {};
fetch("json/filme.json").then(function(response) {
    if(response.status == 200)
        return response.json();
    else
        throw "Eroare";
}).then(function(filmeLocal) {
    filme = filmeLocal;
    for (let id in filme) {
        let filmCurent = document.getElementById(`${id}`)
        let titluFilmCurent = filmCurent.querySelector("h6");
        let film = filme[id];
        filmCurent.style.backgroundImage = `url("${film.poster}")`;
        titluFilmCurent.innerText = `${film.titlu} (${film.an})`;
    }
    initModal(filme);

}).catch(function(err) {
    alert(err);
})

function initModal(filme) {
    let modal = document.getElementById("film-modal");
    let casete = document.getElementsByClassName("film-card");
    let buton = document.querySelector(".modal-antet button");

    buton.onclick = function() {
        modal.classList.remove("modal-activ");
        document.body.classList.remove("no-scroll");
        document.querySelector("iframe").src="";
    }

    const filmeDeVazut = loadDeVazut();

    for (let caseta of casete) {
        const bookmark = caseta.querySelector(".bookmark");
        const img = bookmark.querySelector("img");
        caseta.addEventListener("click", (e) => {
            if (bookmark.contains(e.target)) {
                e.stopPropagation();
                if (img.src.endsWith("/vazut.png")) {
                    img.src = "resurse/imagini/filme/nevazut.png";
                    const i = filmeDeVazut.indexOf(caseta.id);
                    if (i != -1)
                        filmeDeVazut.splice(i, 1);
                }
                else {
                    img.src = "resurse/imagini/filme/vazut.png";
                    filmeDeVazut.push(caseta.id);
                }
            saveDeVazut(filmeDeVazut);
            console.log(localStorage);
                
            }
            else {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                modal.classList.add("modal-activ");
                document.body.classList.add("no-scroll");
                const poster = document.querySelector(".poster");
                const trailer = document.querySelector("iframe");
                // const imdb = document.querySelector(".imdb");
                // const titlu = document.querySelector(".titlu");
                // const regizor = document.querySelector(".regizor");
                // const distributie = document.querySelector(".distributie");
                const film = filme[caseta.id];
                poster.style.backgroundImage  = `url("${film.poster}")`;
                trailer.src = film.trailer;
                for (let detaliu in film) {
                    if (detaliu != "poster" && detaliu != "trailer") {
                        document.querySelector(`.${detaliu}`).innerText = film[detaliu]
                    }
                }
            }
        });

        

        if (filmeDeVazut.find(id => id === caseta.id)) 
            img.src = "resurse/imagini/filme/vazut.png";

        // bookmark.addEventListener("click", (e) => {
            
        // });
    }
}



