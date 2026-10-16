/*
Hamburger menu scripting
*/

// Select hamburger menu and off-screen menu elements
const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

// Toggle the menu on click
hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
});

// Close the menu when clicking outside of it
document.addEventListener('click', (event) => {
    const isClickInsideMenu = offScreenMenu.contains(event.target);
    const isClickOnHamMenu = hamMenu.contains(event.target);

    // Close menu if click is outside both the menu and the hamburger icon
    if (!isClickInsideMenu && !isClickOnHamMenu) {
        hamMenu.classList.remove('active');
        offScreenMenu.classList.remove('active');
    }
});

