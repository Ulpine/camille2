// Navigation
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const logo = document.querySelector('.logo'); // Ajouter cette ligne

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// NOUVEAU : Logo redirection vers l'accueil au clic
if (logo) {
    logo.addEventListener('click', () => {
        const homeSection = document.querySelector('#accueil');
        if (homeSection) {
            homeSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Fermer le menu mobile si ouvert
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// Smooth scrolling for anchor links
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

// ... le reste du code reste identique ...

// ===== SCROLL EFFECTS =====
// Header background on scroll
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }

    lastScrollY = scrollY;
});

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMATE ON SCROLL (AOS) IMPLEMENTATION =====
class AnimateOnScroll {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        this.createObserver();
        this.observe();
    }

    createObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;

                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, delay);

                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
    }

    observe() {
        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Initialize AOS when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimateOnScroll();
});

// ===== PACK CARDS HOVER EFFECTS =====
// const packCards = document.querySelectorAll('.pack-card');

// packCards.forEach(card => {
//     card.addEventListener('mouseenter', () => {
//         card.style.transform = 'translateY(-8px) scale(1.02)';
//     });

//     card.addEventListener('mouseleave', () => {
//         if (!card.classList.contains('featured')) {
//             card.style.transform = 'translateY(0) scale(1)';
//         } else {
//             card.style.transform = 'translateY(0) scale(1.05)';
//         }
//     });
// });

// ===== PACK SECTION JAVASCRIPT SIMPLIFIÉ =====

document.addEventListener('DOMContentLoaded', function() {

    // ===== VERSION TOGGLE (Pack Événementiel) =====
    const initVersionToggle = () => {
        const versionButtons = document.querySelectorAll('.version-btn');

        if (versionButtons.length === 0) return;

        versionButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Éviter les clics multiples
                if (this.classList.contains('active')) return;

                const version = this.dataset.version;
                const isPremium = version === 'premium';

                // Mise à jour des boutons
                versionButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Éléments à modifier
                const priceEssentiel = document.querySelector('.price-essentiel');
                const pricePremium = document.querySelector('.price-premium');
                const featuresEssentiel = document.querySelector('.features-essentiel');
                const featuresPremium = document.querySelector('.features-premium');

                // Changement de contenu
                if (isPremium) {
                    // Afficher premium
                    if (priceEssentiel) priceEssentiel.style.display = 'none';
                    if (pricePremium) pricePremium.style.display = 'block';
                    if (featuresEssentiel) featuresEssentiel.style.display = 'none';
                    if (featuresPremium) featuresPremium.style.display = 'block';
                } else {
                    // Afficher essentiel
                    if (priceEssentiel) priceEssentiel.style.display = 'block';
                    if (pricePremium) pricePremium.style.display = 'none';
                    if (featuresEssentiel) featuresEssentiel.style.display = 'block';
                    if (featuresPremium) featuresPremium.style.display = 'none';
                }
            });
        });
    };

    // ===== BOUTONS CTA =====
    const initCTAButtons = () => {
        const packCTAs = document.querySelectorAll('.pack-cta');

        packCTAs.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();

                // Scroll vers la section contact
                const ctaSection = document.querySelector('#ctaSection');
                if (ctaSection) {
                    ctaSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }

                // Feedback visuel simple
                const originalText = this.textContent;
                this.textContent = 'Redirection...';

                setTimeout(() => {
                    this.textContent = originalText;
                }, 1000);
            });
        });
    };

    // ===== ANIMATIONS D'APPARITION =====
    const initScrollAnimations = () => {
        const cards = document.querySelectorAll('.pack-card');

        // Style initial
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
        });

        // Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const delay = Array.from(card.parentElement.children).indexOf(card) * 100;

                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, delay);

                    observer.unobserve(card);
                }
            });
        }, {
            threshold: 0.1
        });

        cards.forEach(card => observer.observe(card));
    };

    // ===== INITIALISATION =====
    initVersionToggle();
    initCTAButtons();

    // Attendre un peu pour les animations
    setTimeout(initScrollAnimations, 100);

    console.log('✅ Section Packs initialisée');
});

// ===== TESTIMONIAL CARDS ANIMATION =====
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-6px) rotateY(5deg)';
        card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0deg)';
        card.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
    });
});

// ===== FEATURE CARDS STAGGERED ANIMATION =====
const featureCards = document.querySelectorAll('.feature-card');

const observeFeatures = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observeFeatures.observe(card);
});

// ===== STATISTICS COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element, target) => {
    const duration = 2000;
    const start = performance.now();
    const startValue = 0;

    const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutCubic);

        element.textContent = currentValue + (target.toString().includes('%') ? '%' : '+');

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
};

const observeStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/[^0-9]/g, ''));
            animateCounter(entry.target, number);
            observeStats.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    observeStats.observe(stat);
});

// ===== BUTTON RIPPLE EFFECT =====
// const buttons = document.querySelectorAll('.btn');

// buttons.forEach(button => {
//     button.addEventListener('click', function(e) {
//         const ripple = document.createElement('span');
//         const rect = this.getBoundingClientRect();
//         const size = Math.max(rect.width, rect.height);
//         const x = e.clientX - rect.left - size / 2;
//         const y = e.clientY - rect.top - size / 2;

//         ripple.style.cssText = `
//             position: absolute;
//             width: ${size}px;
//             height: ${size}px;
//             background: rgba(255, 255, 255, 0.3);
//             border-radius: 50%;
//             transform: translate(${x}px, ${y}px) scale(0);
//             animation: ripple 0.6s linear;
//             pointer-events: none;
//         `;

//         this.appendChild(ripple);

//         setTimeout(() => {
//             ripple.remove();
//         }, 600);
//     });
// });

// Add ripple keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== PARALLAX EFFECT FOR HERO SECTION =====
const heroVisual = document.querySelector('.hero-visual');

if (heroVisual) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const rate = scrollY * -0.5;
        heroVisual.style.transform = `translateY(${rate}px)`;
    });
}

// ===== FORM VALIDATION AND SUBMISSION =====
const contactForms = document.querySelectorAll('form');

contactForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Simple form validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });

        if (isValid) {
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'Message envoyé !';
                submitBtn.style.background = '#10b981';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);
        }
    });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    box-shadow: var(--shadow-lg);
    transition: all 0.3s ease;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(100px);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
        scrollToTopBtn.style.transform = 'translateY(100px)';
    }
});

// Scroll reveal animations
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.cta-section').classList.add('visible');
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate service cards sequentially
            if (entry.target.classList.contains('services-preview')) {
                const cards = entry.target.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== PRELOADER =====
const preloader = document.createElement('div');
preloader.className = 'preloader';
preloader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
`;

preloader.innerHTML = `
    <div style="text-align: center;">
        <div style="width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid #2D5A87; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
        <p style="color: #2D5A87; font-weight: 500;">Chargement...</p>
    </div>
`;

// Add spinner animation
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinnerStyle);

document.body.appendChild(preloader);

// Hide preloader when page is loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});

// ===== LAZY LOADING IMAGES =====
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.transition = 'opacity 0.3s ease';
            img.style.opacity = '0';

            img.onload = () => {
                img.style.opacity = '1';
            };

            // Trigger load if image is already cached
            if (img.complete) {
                img.style.opacity = '1';
            }

            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    // Optimized scroll handling here if needed
}));

console.log('🚀 Entrepreneur Boost - Site web chargé avec succès!');
