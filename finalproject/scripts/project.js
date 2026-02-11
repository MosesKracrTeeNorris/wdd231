document.addEventListener('DOMContentLoaded', () => {
    // ===============================================
    // 1. GLOBAL UI FUNCTIONALITY (All Pages)
    // ===============================================

    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const mobileNavClose = document.getElementById('mobile-nav-close');

    // --- 1.1 Mobile Navigation Toggle (Retained Logic + Link Close Fix) ---
    if (mobileNavToggle && mobileNavMenu && mobileNavClose) {
        const mainContent = document.querySelector('main');
        
        mobileNavToggle.addEventListener('click', () => {
            mobileNavMenu.classList.add('active');
            // Add inert attribute to main content for accessibility when menu is open
            if (mainContent) mainContent.inert = true; 
        });

        mobileNavClose.addEventListener('click', () => {
            mobileNavMenu.classList.remove('active');
            // Remove inert attribute
            if (mainContent) mainContent.inert = false;
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNavMenu.classList.contains('active')) {
                mobileNavMenu.classList.remove('active');
                if (mainContent) mainContent.inert = false;
            }
        });
        
        // Ensure menu closes when a link is clicked
        mobileNavMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavMenu.classList.remove('active');
                if (mainContent) mainContent.inert = false;
            });
        });
    }

    // --- 1.2 Theme Toggle (Light/Dark Mode) ---
    const savedTheme = localStorage.getItem("theme") || "light";

    function applyTheme(theme) {
        if (theme === "dark") {
            // Using 'dark-mode' class
            document.body.classList.add("dark-mode"); 
            // Update icon to sun
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; 
        } else {
            document.body.classList.remove("dark-mode");
            // Update icon to moon
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem("theme", theme);
    }
    
    // Apply theme on initial load
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            // Toggle theme based on current body class
            const newTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
            applyTheme(newTheme);
        });
    }


    // --- 1.3 Generic Form Submission Handler (Retained Logic) ---
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Using alert() as per the user's original working code
            alert('Thank you! Your submission has been received. We will be in touch shortly.');
            form.reset();
            
            // If the form is the feedback form, ensure the rating is cleared on reset
            if (form.classList.contains('feedback-form')) {
                const clearRatingRadio = document.getElementById('star0');
                if (clearRatingRadio) clearRatingRadio.checked = true;
            }
        });
    });
    
    // --- 1.4 Star Rating Un-rate Fix (NEW LOGIC) ---
    const clearRatingBtn = document.getElementById('clear-rating-btn');
    if (clearRatingBtn) {
        clearRatingBtn.addEventListener('click', () => {
            // Find the hidden 'star0' radio input and check it to clear the rating group.
            const star0 = document.getElementById('star0');
            if (star0) {
                star0.checked = true;
            }
        });
    }

    // --- 1.5 Star Rating Toggle (Tap Again to Clear) ---
const stars = document.querySelectorAll('.rating-stars label');
let currentRating = 0;

if (stars.length > 0) {
  stars.forEach((label, index) => {
    label.addEventListener('click', () => {
      const selectedRating = 5 - index; // due to row-reverse

      if (selectedRating === currentRating) {
        currentRating = 0;
        stars.forEach(l => l.classList.remove('active'));
        document.getElementById('star0').checked = true;
      } else {
        currentRating = selectedRating;
        document.getElementById(`star${selectedRating}`).checked = true;

        stars.forEach((l, i) => {
          l.classList.toggle('active', i <= 5 - selectedRating);
        });
      }
    });
  });
}

    


    // ===============================================
    // 2. MENU PAGE FUNCTIONALITY (menu.html - Retained Logic)
    // ===============================================
    const menuList = document.getElementById('menu-list');
    const filterCategory = document.getElementById('filter-category');
    const sortBy = document.getElementById('sort-by');
    const randomDishBtn = document.getElementById('random-dish-btn');
    const randomDishResult = document.getElementById('random-dish-result');
    
    // Check if ALL essential Menu elements exist before running the logic
    if (menuList && filterCategory && sortBy && randomDishBtn && randomDishResult) {
        const menuItems = Array.from(menuList.querySelectorAll('.menu-item'));
        
        // --- 2.1 Filtering Logic ---
        const filterAndSort = () => {
            const category = filterCategory.value;
            const sortOrder = sortBy.value;

            // 1. Filter
            menuItems.forEach(item => {
                const itemCategory = item.dataset.category;
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // 2. Sort the currently visible items
            const visibleItems = menuItems.filter(item => item.style.display !== 'none');

            visibleItems.sort((a, b) => {
                if (sortOrder === 'default') return 0;

                // Price Sorting
                if (sortOrder.startsWith('price')) {
                    const priceA = parseFloat(a.dataset.price);
                    const priceB = parseFloat(b.dataset.price);
                    if (sortOrder === 'price-asc') return priceA - priceB;
                    if (sortOrder === 'price-desc') return priceB - priceA;
                }

                // Name Sorting
                if (sortOrder.startsWith('name')) {
                    const nameA = a.dataset.name.toLowerCase();
                    const nameB = a.dataset.name.toLowerCase();
                    if (nameA < nameB) return sortOrder === 'name-asc' ? -1 : 1;
                    if (nameA > nameB) return sortOrder === 'name-asc' ? 1 : -1;
                    return 0;
                }
                return 0;
            });

            // 3. Re-append sorted items to the grid
            visibleItems.forEach(item => menuList.appendChild(item));
        };

        filterCategory.addEventListener('change', filterAndSort);
        sortBy.addEventListener('change', filterAndSort);
        // Initial call to set default state
        filterAndSort(); 


        // --- 2.2 Random Dish Selector Logic ---
        randomDishBtn.addEventListener('click', () => {
            // Get all items that are currently visible (if a filter is applied)
            const availableDishes = menuItems.filter(item => item.style.display !== 'none');

           // ...existing code...
        if (availableDishes.length === 0) {
            // Use a string (or template literal) for HTML content
            randomDishResult.innerHTML = `<p>No dishes found in the current category!</p>`;
            return;
        }
// ...existing code...


            const randomIndex = Math.floor(Math.random() * availableDishes.length);
            const chosenDish = availableDishes[randomIndex];

            const dishName = chosenDish.querySelector('h3').textContent;
            const dishDesc = chosenDish.querySelector('p').textContent;
            const dishPrice = chosenDish.querySelector('.price').textContent;
            const dishImageSrc = chosenDish.querySelector('img').getAttribute('src');

            // Update the dedicated result card
            randomDishResult.innerHTML = `
                <img src="${dishImageSrc}" alt="${dishName}" style="width:100px; height:100px; object-fit:cover; border-radius:5px; margin-bottom:10px;">
                <h3>Your Chef's Pick: ${dishName}</h3>
                <p style="text-align:center; margin-bottom: 5px;">${dishDesc}</p>
                <span class="price">${dishPrice}</span>
            `;
        });
    }


    // ===============================================
    // 3. GALLERY PAGE FUNCTIONALITY (gallery.html - Retained Logic)
    // ===============================================
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = lightbox ? lightbox.querySelector('.close-btn') : null;
    const prevBtn = lightbox ? lightbox.querySelector('.prev-btn') : null;
    const nextBtn = lightbox ? lightbox.querySelector('.next-btn') : null;
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    let currentIndex = 0;

    if (lightbox && galleryItems.length > 0) {

        const openLightbox = (index) => {
            currentIndex = index;
            const item = galleryItems[currentIndex];
            const img = item.querySelector('img');
            const caption = item.querySelector('figcaption').textContent;

            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.innerHTML = caption;
        };

        const changeImage = (step) => {
            currentIndex += step;
            if (currentIndex < 0) {
                currentIndex = galleryItems.length - 1;
            } else if (currentIndex >= galleryItems.length) {
                currentIndex = 0;
            }
            openLightbox(currentIndex);
        };

        // Event Listeners for Gallery Items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });

        // Event Listeners for Lightbox Controls
        closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
        prevBtn.addEventListener('click', () => changeImage(-1));
        nextBtn.addEventListener('click', () => changeImage(1));

        // Close when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });

        // Keyboard navigation (Escape, Left, Right)
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'block') {
                if (e.key === 'Escape') lightbox.style.display = 'none';
                if (e.key === 'ArrowLeft') changeImage(-1);
                if (e.key === 'ArrowRight') changeImage(1);
            }
        });
    }
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;
    const copyrightYearElement = document.getElementById('currentyear');
    const lastModifiedElement = document.getElementById('lastModified');
    if (copyrightYearElement) {
        copyrightYearElement.textContent = currentYear;
    }
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last update: ${lastModified}`;
    }
});
