const stareMeniu = document.getElementById("dropdown");
const meniuDropdown = document.querySelector(".submeniu-responsive");

document.addEventListener("click", (e) => {
    if (stareMeniu.checked && !meniuDropdown.contains(e.target)) {
        stareMeniu.checked = false;
    }
});

const glob = document.getElementById("glob");
const contor = glob.querySelector("span"); 
let dataCraciun = new Date(`${new Date().getFullYear()} 12 25`);
let aux = {zile: 0, ore: 0, minute: 0, secunde: 0};
const afis = document.createElement("div");
afis.style.display = "none";
document.querySelector("header").appendChild(afis);

function counterCraciun(crt = new Date()) {
    if (crt.getMonth() == 11 && crt.getDate() == 25) {
        contor.textContent = "Crăciun fericit!";
        return
    }
    if (crt.getTime() > dataCraciun.getTime()) 
        dataCraciun = new Date(`${new Date().getFullYear()+1} 12 25`);

    let timpRamas = dataCraciun - crt.getTime();
    aux.zile = Math.floor(timpRamas/(1000 * 60 * 60 * 24));  //zile
    aux.ore = Math.floor(timpRamas%(1000 * 60 * 60 * 24)/(1000 * 60 * 60));  //ore
    aux.minute = Math.floor(timpRamas%(1000 * 60 * 60)/(1000 * 60))  //minute
    aux.secunde = Math.floor(timpRamas%(1000 * 60)/1000);  //secunde

    for (unit in aux) {
        if (aux[unit] == 0)
            continue;
        if (aux[unit] < 20)
            contor.textContent = `${aux[unit]} ${unit}`
        else
            contor.textContent = `${aux[unit]} de ${unit}`
        break;
    }

    afis.innerHTML = `<p class="afis-text">Moș Crăciun ajunge în:</p>
                      <div class="ceas">
                        <div class="unitate">
                            <span>${aux.zile}</span>
                            <span>zile</span>
                        </div>
                        <div class="unitate">
                            <span>${aux.ore}</span>
                            <span>ore</span>
                        </div>
                        <div class="unitate">
                            <span>${aux.minute}</span>
                            <span>minute</span>
                        </div>
                        <div class="unitate">
                            <span>${aux.secunde}</span>
                            <span>secunde</span>
                        </div>
                      </div>
    `
}

    glob.onclick = function() {
        afis.classList.toggle("afis");
        glob.classList.toggle("filtru");
    }

counterCraciun();
setInterval(counterCraciun,1000);
