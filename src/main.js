// Smooth scroll function
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize Feather Icons
document.addEventListener("DOMContentLoaded", function () {
    feather.replace();

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize all functionality
    initNavigation();
    initCounters();
    initMobileMenu();
    initSmoothScroll();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
        // Update active navigation link
        updateActiveNavLink();
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll("section[id]");
        const scrollPos = window.scrollY + 100;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute("id");
            const navLink = document.querySelector(`a[href="#${id}"]`);

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach((link) => link.classList.remove("active"));
                if (navLink) navLink.classList.add("active");
            }
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = mobileMenuBtn.querySelector('[data-feather="menu"]');
    const closeIcon = mobileMenuBtn.querySelector('[data-feather="x"]');
    const navbar = document.getElementById("navbar");

    mobileMenuBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.contains("hidden");

        if (isOpen) {
            mobileMenu.classList.remove("hidden");
            mobileMenuBtn.innerHTML =
                '<i data-feather="x" class="w-6 h-6"></i>';
            navbar.classList.add("navbar-scrolled");
        } else {
            mobileMenu.classList.add("hidden");
            mobileMenuBtn.innerHTML =
                '<i data-feather="menu" class="w-6 h-6"></i>';

            if (!navbar.classList.contains('navbar-scrolled')) {
                navbar.classList.remove("navbar-scrolled");
            }
        }

        feather.replace();
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = mobileMenu.querySelectorAll('a[href^="#"]');
    mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            mobileMenuBtn.innerHTML =
                '<i data-feather="menu" class="w-6 h-6"></i>';
            feather.replace();
        });
    });
}

// Counter animations with CountUp.js
function initCounters() {
    const counters = document.querySelectorAll(".counter");
    const options = {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute("data-target"));
                
                // Use CountUp.js for smooth animation
                try {
                    if (typeof countUp !== 'undefined' && countUp.CountUp) {
                        const countUpInstance = new countUp.CountUp(counter, target, {
                            duration: 2.5,
                            useEasing: true,
                            useGrouping: true,
                            separator: ',',
                        });
                        
                        if (!countUpInstance.error) {
                            countUpInstance.start();
                        } else {
                            console.error(countUpInstance.error);
                            counter.textContent = target.toLocaleString();
                        }
                    } else {
                        // Fallback to simple animation if CountUp not available
                        animateCounterFallback(counter, target);
                    }
                } catch (error) {
                    console.error('CountUp error:', error);
                    animateCounterFallback(counter, target);
                }
                
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach((counter) => {
        observer.observe(counter);
    });
}

// Fallback counter animation function
function animateCounterFallback(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2500; // 2.5 seconds
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, stepTime);
}

// Error handling
window.addEventListener("error", (e) => {
    console.error("JavaScript error:", e.error);
    // You can add error reporting here
});

// Accessibility improvements
function improveAccessibility() {
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll(
        "button, a, input, textarea, select",
    );

    interactiveElements.forEach((element) => {
        element.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && element.tagName === "BUTTON") {
                element.click();
            }
        });
    });

    // Add skip to content link
    // const skipLink = document.createElement("a");
    // skipLink.href = "#main-content";
    // skipLink.className = "skip-link";
    // skipLink.textContent = "Skip to main content";
    // document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize performance optimizations and accessibility
document.addEventListener("DOMContentLoaded", function () {
    improveAccessibility();
});


