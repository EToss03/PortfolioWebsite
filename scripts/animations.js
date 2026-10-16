/*
Scrolling animation scripts
*/

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

// Add scroll event listener
document.addEventListener("scroll", () => {
    const fadeInElements = document.querySelectorAll(".fade-in");
    fadeInElements.forEach((element) => {
        if (isInViewport(element)) {
            element.classList.add("active");
        }
    });
});

// Trigger animations for already-visible elements on load
document.addEventListener("DOMContentLoaded", () => {
    const fadeInElements = document.querySelectorAll(".fade-in");
    fadeInElements.forEach((element) => {
        if (isInViewport(element)) {
            element.classList.add("active");
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the element is visible

// Select all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

console.log("Fade-in animaitions loaded properly");

