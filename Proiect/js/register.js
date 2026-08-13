//Expresii regulate
const reEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const rePass = /^(?=.*\d).{8,}$/; //minim 8 caractere si cel putin o cifra

const form = document.querySelector("form");
const emailForm = document.getElementById("email");
const passForm = document.getElementById("pass");
const confPassForm = document.getElementById("conf-pass");

// function loadUsers() {
//     return JSON.parse(localStorage.getItem("users") || "[]");
// }

// function saveUsers(users) {
//     localStorage.setItem("users", JSON.stringify(users));
// }

function seteazaEroare(camp, mesaj) {
    const label = camp.previousElementSibling;
    const span = label.querySelector("span");
    span.textContent = mesaj;
    span.style.color = "red";
}

function reseteazaErori() {
    [emailForm, passForm, confPassForm].forEach(camp => seteazaEroare(camp, ""));
}

function validareForm() {
    reseteazaErori();
    const email = emailForm.value.trim();
    const pass = passForm.value;
    const confPass = confPassForm.value;
    let sw = true;

    if (!reEmail.test(email)) {
        seteazaEroare(emailForm, "E-mail invalid");
        sw = false;
    }

    if(!rePass.test(pass)) {
        seteazaEroare(passForm, "Parola trebuie să conțină minim 8 caractere și cel puțin o cifră");
        sw = false;
    }

    if(confPass != pass) {
        seteazaEroare(confPassForm, "Parolele nu concid");
        sw = false;
    }

    // const users = loadUsers();
    // if (users.find(user => user.email.toLowerCase() === email.toLowerCase())) {
    //     seteazaEroare(emailForm, "E-mailul introdus este deja folosit")
    //     sw = false;
    // }

    return sw;  
}

// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     if (!validareForm())
//         return;

//     const users = loadUsers();
//     users.push({
//         email: emailForm.value.trim(),
//         pass: passForm.value
//     });
//     saveUsers(users);
//     alert("Cont creat cu succes!");
//     e.currentTarget.reset();
//     window.location.href = "scrisoare.html";
// });

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if(!validareForm()) return;

    const userData = {
        email: emailForm.value.trim(),
        password: passForm.value
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            e.target.reset();
            window.location.href = "../scrisoare.html";
        }
        else alert("A aparut o eroare la inregistrare.");
    } catch (error) {
        console.error("Eroare de conexiune: ", error);
        alert("Nu s-a putut realiza conexiunea la server");
    }
});

//console.log(localStorage);
