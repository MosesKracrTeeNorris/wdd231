// These are area of references to the menu
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

// Area of click event listener to the hamburger button
menuToggle.addEventListener('click', () => {
    // Toggle the 'open' class on the navigation
    mainNav.classList.toggle('open');
    
    // Update attribute for accessibility
    const isExpanded = mainNav.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    
    // Change hamburger icon to X when open
    if (isExpanded) {
        menuToggle.textContent = '✕';
    } else {
        menuToggle.textContent = '☰';
    }
});

// The menu closes when window is resized to larger view
// This area prevents the menu from staying open when switched
window.addEventListener('resize', () => {
    if (window.innerWidth >= 640) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
    }
});

