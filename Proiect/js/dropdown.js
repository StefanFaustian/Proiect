const stareMeniu = document.getElementById("dropdown");
const meniuDropdown = document.querySelector(".submeniu-responsive");

document.addEventListener("click", (e) => {
    if (stareMeniu.checked && !meniuDropdown.contains(e.target)) {
        stareMeniu.checked = false;
    }
});

const glob = document.getElementById("glob");
const contor = glob.querySelector("span"); 
const luna = 11;
const ziua = 25;
//const ora = 3;
//const minutul = 47;
let dataCraciun = new Date(2026, luna, ziua);
let aux = {zile: 0, ore: 0, minute: 0, secunde: 0};
const afis = document.createElement("div");
afis.classList.add("afis");
const header = document.querySelector("header");

function counterCraciun(crt = new Date()) {

    if (crt.getMonth() == luna && crt.getDate() == ziua) { // && crt.getHours() == ora && crt.getMinutes() == minutul 
        contor.textContent = "Crăciun fericit!";
        dataCraciun = new Date(new Date().getFullYear() + 1, luna, ziua, ora, minutul);
        header.removeChild(afis)
        return
    }

    let timpRamas = dataCraciun.getTime() - crt.getTime();
    aux.zile = Math.floor(timpRamas/(1000 * 60 * 60 * 24));  //zile
    aux.ore = Math.floor(timpRamas%(1000 * 60 * 60 * 24)/(1000 * 60 * 60));  //ore
    aux.minute = Math.floor(timpRamas%(1000 * 60 * 60)/(1000 * 60))  //minute
    aux.secunde = Math.floor(timpRamas%(1000 * 60)/1000);  //secunde

    for (let unit in aux) {
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
        if (glob.textContent != "Crăciun fericit!") {
            header.contains(afis) ? header.removeChild(afis) : header.append(afis);
            glob.classList.toggle("filtru");
        }
    }

counterCraciun();
let timer = setInterval(counterCraciun,1000);
