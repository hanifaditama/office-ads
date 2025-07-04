// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown timer
    initCountdown();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Initialize form validation
    initFormValidation();

    // Initialize mobile menu
    initMobileMenu();
});

// Mobile Menu Function
function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        let isMenuOpen = false;

        const toggleMenu = () => {
            isMenuOpen = !isMenuOpen;
            
            // Animate hamburger icon
            const spans = menuButton.querySelectorAll('.hamburger-icon span');
            if (isMenuOpen) {
                // Transform to X
                spans[0].style.transform = 'rotate(45deg) translate(0, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(0, -6px)';
                
                // Open menu
                mobileMenu.classList.remove('-translate-y-full', 'opacity-0');
                mobileMenu.classList.add('translate-y-0', 'opacity-100');
            } else {
                // Reset to hamburger
                spans[0].style.transform = 'rotate(0) translate(0, 0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translate(0, 0)';
                
                // Close menu
                mobileMenu.classList.remove('translate-y-0', 'opacity-100');
                mobileMenu.classList.add('-translate-y-full', 'opacity-0');
            }
        };

        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking menu items
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                toggleMenu();
            }
        });

        // Close menu when scrolling
        window.addEventListener('scroll', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    }
}

// Countdown Timer Function
function initCountdown() {
    const countdownDisplay = document.getElementById('countdown');
    if (!countdownDisplay) return;

    // Set the countdown time (13 hours from now)
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 13);

    // Update countdown every second
    function updateCountdown() {
        const now = new Date();
        const timeDiff = endTime - now;

        if (timeDiff <= 0) {
            countdownDisplay.innerHTML = 'Promo telah berakhir!';
            return;
        }

        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        countdownDisplay.innerHTML = `
            ${String(hours).padStart(2, '0')} jam 
            ${String(minutes).padStart(2, '0')} menit 
            ${String(seconds).padStart(2, '0')} detik
        `;
    }

    // Initial call and set interval
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth Scrolling Function
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

// FAQ Accordion Function
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('svg');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isOpen = !answer.classList.contains('hidden');
                
                // Close all other answers
                document.querySelectorAll('.faq-answer').forEach(a => {
                    a.classList.add('hidden');
                });
                document.querySelectorAll('.faq-question svg').forEach(svg => {
                    svg.style.transform = 'rotate(0deg)';
                });
                
                // Toggle current answer
                if (!isOpen) {
                    answer.classList.remove('hidden');
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    answer.classList.add('hidden');
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        }
    });
}

// Form Validation Function
function initFormValidation() {
    const orderForm = document.querySelector('#orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check robot verification
            const robotCheck = document.querySelector('#robotCheck');
            if (!robotCheck || !robotCheck.checked) {
                showError('Silakan verifikasi bahwa Anda bukan robot');
                return;
            }
            
            // Validate coupon if present
            const couponInput = document.querySelector('#couponCode');
            if (couponInput && couponInput.value) {
                validateCoupon(couponInput.value);
            }
            
            // If all validations pass, show success message
            showSuccess('Pesanan Anda sedang diproses!');
        });
    }
}

// Helper Functions
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4';
    errorDiv.innerHTML = message;
    
    // Remove any existing error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    errorDiv.classList.add('error-message');
    const form = document.querySelector('#orderForm');
    if (form) {
        form.appendChild(errorDiv);
    }
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4';
    successDiv.innerHTML = message;
    
    const form = document.querySelector('#orderForm');
    if (form) {
        form.appendChild(successDiv);
        
        // Clear form
        form.reset();
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}

// Handle scroll events for navbar
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-sm');
        } else {
            nav.classList.remove('shadow-md', 'bg-white/95', 'backdrop-blur-sm');
        }
    }
});
