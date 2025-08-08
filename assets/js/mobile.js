// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (!mobileMenuToggle || !mainNav) return; // Exit if elements don't exist

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Prevent scrolling when mobile menu is open
    const style = document.createElement('style');
    style.textContent = `
        body.menu-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});

// Touch/Swipe handling for better mobile experience
document.addEventListener('DOMContentLoaded', function() {
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, {passive: true});

    document.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const mainNav = document.getElementById('mainNav');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        if (!mainNav || !mobileMenuToggle) return;

        // Detect swipe gestures
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Horizontal swipe threshold
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            // Swipe right to open menu (from left edge)
            if (deltaX > 0 && touchStartX < 50 && !mainNav.classList.contains('active')) {
                mobileMenuToggle.classList.add('active');
                mainNav.classList.add('active');
                document.body.classList.add('menu-open');
            }
            // Swipe left to close menu
            else if (deltaX < 0 && mainNav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    }, {passive: true});
});

// Improved viewport height handling for mobile browsers
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initial viewport height
setVH();

// Update on resize and orientation change
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', function() {
    setTimeout(setVH, 100); // Small delay to ensure proper measurement
});

// Image lazy loading for better mobile performance
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        // Observe all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Smooth scroll behavior for mobile anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mainNav = document.getElementById('mainNav');
                const mobileMenuToggle = document.getElementById('mobileMenuToggle');
                if (mainNav && mainNav.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });
});
