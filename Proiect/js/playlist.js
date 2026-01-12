const sep = document.getElementById("sep");

function generareCuloare() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function pornesteSchimbCulori() {
    return setInterval(() => {
        let glow = generareCuloare()
        sep.style.backgroundColor = glow;
        sep.style.filter = `drop-shadow(0 0  1rem ${glow})`;
        sep.style.borderColor = generareCuloare();
    }, 1200);
}

let schimbCulori = pornesteSchimbCulori();

sep.onclick = function() {
    const stiluriSep = getComputedStyle(sep);
    console.log(stiluriSep);
    const fundal = document.querySelector("main");
    const iframes = document.getElementsByTagName("iframe");
    fundal.style.backgroundColor = stiluriSep.backgroundColor;
    for (let iframe of iframes) {
        iframe.style.filter = `drop-shadow(0 0  1rem ${stiluriSep.borderColor})`;
        iframe.style.borderColor = stiluriSep.borderColor;
    };
}

sep.onmouseover = function() {
    clearInterval(schimbCulori);
}

sep.onmouseout = function () {
    schimbCulori = pornesteSchimbCulori();
}

