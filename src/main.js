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

// Touch gestures for mobile
function initTouchGestures() {
    let startX = 0;
    let startY = 0;

    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;

        let endX = e.changedTouches[0].clientX;
        let endY = e.changedTouches[0].clientY;

        let diffX = startX - endX;
        let diffY = startY - endY;

        // Reset values
        startX = 0;
        startY = 0;
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
    initFormValidation();

    initTouchGestures();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add(
                "bg-white/95",
                "backdrop-blur-sm",
                "shadow-sm",
            );
        } else {
            navbar.classList.remove("shadow-sm");
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

    mobileMenuBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.contains("hidden");

        if (isOpen) {
            mobileMenu.classList.remove("hidden");
            mobileMenuBtn.innerHTML =
                '<i data-feather="x" class="w-6 h-6"></i>';
        } else {
            mobileMenu.classList.add("hidden");
            mobileMenuBtn.innerHTML =
                '<i data-feather="menu" class="w-6 h-6"></i>';
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

// Parallax effect for hero section
function initParallax() {
    const parallaxElements = document.querySelectorAll(".parallax-bg");

    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        parallaxElements.forEach((element) => {
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
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

// Form validation and submission
function initFormValidation() {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (validateForm(form)) {
                handleFormSubmission(form);
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll("input, textarea, select");
        inputs.forEach((input) => {
            input.addEventListener("blur", () => validateField(input));
            input.addEventListener("input", () => clearFieldError(input));
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll(
        "input[required], textarea[required], select[required]",
    );
    let isValid = true;

    inputs.forEach((input) => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = "";

    // Clear previous errors
    clearFieldError(field);

    // Required field validation
    if (field.hasAttribute("required") && !value) {
        errorMessage = "This field is required";
        isValid = false;
    }

    // Email validation
    if (type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = "Please enter a valid email address";
            isValid = false;
        }
    }

    // Display error if invalid
    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    field.classList.add("border-red-500");

    // Create error message element
    const errorElement = document.createElement("div");
    errorElement.className = "text-red-500 text-sm mt-1 field-error";
    errorElement.textContent = message;

    // Insert error message after the field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function clearFieldError(field) {
    field.classList.remove("border-red-500");

    // Remove error message
    const errorElement = field.parentNode.querySelector(".field-error");
    if (errorElement) {
        errorElement.remove();
    }
}

function handleFormSubmission(form) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    submitButton.classList.add("loading");

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        form.reset();

        // Show success message
        showNotification(
            "Message sent successfully! We'll get back to you soon.",
            "success",
        );

        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.classList.remove("loading");
    }, 2000);
}

// Notification system
function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300 ${
        type === "success"
            ? "bg-green-500 text-white"
            : type === "error"
              ? "bg-red-500 text-white"
              : type === "warning"
                ? "bg-yellow-500 text-black"
                : "bg-blue-500 text-white"
    }`;

    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button class="ml-4 text-current opacity-75 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">
                <i data-feather="x" class="w-4 h-4"></i>
            </button>
        </div>
    `;

    document.body.appendChild(notification);
    feather.replace();

    // Slide in
    setTimeout(() => {
        notification.classList.remove("translate-x-full");
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add("translate-x-full");
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Image lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll("img[data-src]");
    const options = {
        threshold: 0.1,
        rootMargin: "50px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                observer.unobserve(img);
            }
        });
    }, options);

    images.forEach((img) => {
        observer.observe(img);
    });
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let ticking = false;

    function updateOnScroll() {
        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
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
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.className = "skip-link";
    skipLink.textContent = "Skip to main content";
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize performance optimizations and accessibility
document.addEventListener("DOMContentLoaded", function () {
    optimizePerformance();
    improveAccessibility();
    initLazyLoading();
});


