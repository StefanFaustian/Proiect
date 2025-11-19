const stareMeniu = document.getElementById("dropdown");
const meniuDropdown = document.querySelector(".submeniu-responsive");

document.addEventListener("click", (e) => {
    if (stareMeniu.checked && !meniuDropdown.contains(e.target)) {
        stareMeniu.checked = false;
    }
});