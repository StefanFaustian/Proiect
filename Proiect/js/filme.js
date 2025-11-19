const filme = [
    {
        id: "film1",
        titlu: "O viață minunată",
        poster: "resurse/imagini/filme/wonderful.png",
        an: 1946,
        imdb: 8.6,
        sinopsis: "",
        regizor: "",
        distributie: "",
        trailer: ""
    },

    {
        id: "film2",
        titlu: "Greu de ucis",
        poster: "resurse/imagini/filme/diehard.png",
        an: 1988,
        imdb: 8.6,
        sinopsis: "",
        regizor: "",
        distributie: "",
        trailer: ""
    },

    {
        id: "film3",
        titlu: "Singur acasă",
        poster: "resurse/imagini/filme/homealone.png",
        an: 1990,
        imdb: 7.7,
        sinopsis: "",
        regizor: "",
        distributie: "",
        trailer: ""
    },

    {
        id: "film4",
        titlu: "Cum a furat Grinch Crăciunul",
        poster: "resurse/imagini/filme/grinch1.png",
        an: 2000,
        imdb: 6.4,
        sinopsis: "",
        regizor: "",
        distributie: "",
        trailer: ""
    },

    {
        id: "film5",
        titlu: "The Holdovers",
        poster: "resurse/imagini/filme/holdovers.png",
        an: 2023,
        imdb: 7.9,
        sinopsis: "",
        regizor: "",
        distributie: "",
        trailer: ""
    },

    {
        id: "film6",
        titlu: "Singur acasă 2 - Pierdut în New York",
        poster: "resurse/imagini/filme/homealone2.png",
        an: 1992,
        imdb: 6.9,
        sinopsis: "",
        regizor: "",
        distributie: "",
        trailer: ""
    },

    {
        id: "film7",
        titlu: "Expresul polar",
        poster: "resurse/imagini/filme/polarexpress.png",
        an: 2004,
        imdb: 6.6,
        sinopsis: "",
        regizor: "",
        distributie: "",
        trailer: ""
    },

    {
        id: "film8",
        titlu: "Armă mortală",
        poster: "resurse/imagini/filme/lethalweapons.png",
        an: 1987,
        imdb: 7.6,
        sinopsis: "",
        regizor: "",
        distributie: "",
        trailer: ""
    },

    {
        id: "film9",
        titlu: "Cu ochii larg închiși",
        poster: "resurse/imagini/filme/eyeswideshut.png",
        an: 1999,
        imdb: 7.5,
        sinopsis: "",
        regizor: "Stanley Kubrick",
        distributie: "",
        trailer: ""
    },

    {
        id: "film10",
        titlu: "Batman revine",
        poster: "resurse/imagini/filme/batman.png",
        an: 1992,
        imdb: 7.1,
        sinopsis: "",
        regizor: "Tim Burton",
        distributie: "",
        trailer: ""
    },
];


for (let i = 0; i<filme.length; i++) {
    // let grid = document.getElementById("wrapper-grid");
    // grid.appendChild("a")
    let filmCurent = document.getElementById(`${filme[i].id}`)
    let titluFilmCurent = filmCurent.querySelector("h6");
    filmCurent.style.backgroundImage = `url("${filme[i].poster}")`;
    titluFilmCurent.innerText = `${filme[i].titlu} (${filme[i].an})`
}
