/*
This is header scrolling scripts
*/

// Select the header element
const header = document.querySelector("header");

let lastScrollY = 0;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        header.classList.add("hidden");
    } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        header.classList.remove("hidden");
        header.classList.add("visible");
    } else if (currentScrollY <= 100) {
        // At the top of the page
        header.classList.remove("hidden");
        header.classList.remove("visible");
    }

    lastScrollY = currentScrollY;
});

