const year = document.querySelector("#copyright-year");
year.textContent = new Date().getFullYear();

const lastModified = document.querySelector("#last-modified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;

const menuButton = document.querySelector("#hamburgerBtn");
const navigation = document.querySelector("#navMenu");

menuButton.addEventListener("click", function () {

    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        menuButton.textContent = "X";
    } else {
        menuButton.textContent = "☰";
    }

});