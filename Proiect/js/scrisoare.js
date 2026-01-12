const butonAuth = document.getElementById("autentificare");
const modal = document.getElementById("login-modal");
const modalForm = modal.querySelector("form");
const loginEmail = document.getElementById("email");
const loginPass = document.getElementById("pass");
const imgStatus = document.querySelector("#autentificare img");
const textStatus = document.querySelector("#autentificare span");
const userStatus = document.querySelector(".status");
const emailStatus = document.querySelector(".status-mail");
const textIntro = document.querySelector(".intro-scrisoare span");

const scrisoareForm = document.getElementById("scrisoare-form");
const campuriForm = scrisoareForm.querySelectorAll("input, textarea");
// const nume = document.getElementById("nume");
// const mail = document.getElementById("mail");
// const varsta = document.getElementById("varsta");
// const mesaj = document.getElementById("mesaj");
const trimite = document.getElementById("trimite");

document.addEventListener("DOMContentLoaded", () => {

    function verificareCampuri() {
        let valid = true
        campuriForm.forEach(camp => {
            if (!camp.value.trim())
                valid = false;
        });
        trimite.disabled = !valid;
    }
    campuriForm.forEach(camp => {
        camp.addEventListener("input", verificareCampuri);
    });
});

trimite.addEventListener("click", (e) => {
    e.preventDefault();
    const mail = document.getElementById("mail");
    const nume = document.getElementById("nume");
    const reEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const raport = document.querySelector(".input-grup span");
    if(!reEmail.test(mail.value.trim())) {
         raport.textContent = " (E-mailul trebuie să fie valid)";
    }
       
    else {
        raport.textContent = "";
        scrisoareForm.submit();
        alert(`Alabaster Snowball: Am preluat scrisoarea, ${nume.value}. Poți verifica la adresa de e-mail furnizată când a ajuns scrisoarea la Moș Crăciun.`);
    }

})

function toggleCampuri(activ) {
    // nume.disabled = active == false ? "disabled" : "";
    // mail.disabled = active == false ? "disabled" : "";
    // varsta.disabled = active == false ? "disabled" : "";
    // mesaj.disabled = active == false ? "disabled" : "";
    //trimite.disabled = active == false ? "disabled" : "";
    campuriForm.forEach(camp => {
        console.log(camp);
        camp.disabled = !activ //== false ? "disabled" : ""
    });
    scrisoareForm.reset();
}

toggleCampuri(true);

function validareScrisoare() {
    while(!(nume && mail && varsta && mesaj))
        trimite.disabled = "";
}

validareScrisoare();

function actualizareStatus() {
    if (localStorage.getItem("user") != null) {
        imgStatus.src = "resurse/imagini/scrisoare/logout.png";
        textStatus.textContent = "Logout";
        butonAuth.classList.add("logout");
        userStatus.innerText = "Conectat";
        textIntro.innerHTML = "Acum ai ocazia"
        toggleCampuri(true);
        emailStatus.textContent = `(${JSON.parse(localStorage.getItem("user")).email})`;
    }
}

function loadUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

function removeUser() {
    localStorage.removeItem("user");
}

function seteazaEroare(camp, mesaj) {
    const label = camp.previousElementSibling;
    const span = label.querySelector("span");
    span.textContent = mesaj;
    span.style.color = "red";
}

function reseteazaErori() {
    [loginEmail, loginPass].forEach(camp => seteazaEroare(camp, ""));
}

function validareLogin() {
    reseteazaErori();
    const email = loginEmail.value.trim();
    const pass = loginPass.value;
    const users = loadUsers();
    const u = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (!u) {
        seteazaEroare(loginEmail, "E-mailul introdus nu este asociat unui cont")
        return false;
    }
    if (u.pass != pass) {
        seteazaEroare(loginPass, "Parola este greșită");
        return false;
    }

    return true;
}

modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validareLogin())
        return

    const users = loadUsers();
    saveUser(users.find(user => user.email.toLowerCase() === loginEmail.value.trim().toLowerCase()));
    modalForm.reset();
    window.location.href = "scrisoare.html";
});

if (textStatus.textContent == "Login") toggleCampuri(false);

butonAuth.onclick = function() {
    if (textStatus.textContent == "Logout") {
        imgStatus.src = "resurse/imagini/scrisoare/login.png";
        textStatus.textContent = "Login";
        butonAuth.classList.remove("logout");
        userStatus.textContent = "";
        emailStatus.textContent = "";
        textIntro.innerHTML = "Conectează-te la un cont ca"
        toggleCampuri(false);
        removeUser();
    }
    else {
        modal.classList.add("modal-activ");
    }
}

if (location.hash === "#login") {
    modal.classList.add("modal-activ");
}

console.log(localStorage);
actualizareStatus();