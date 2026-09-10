// Particle.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 200,
            density: {
                enable: true,
                value_area: 1000
            }
        },
        color: {
            value: ['#ffffff', '#ffd700', '#ff69b4', '#4a90e2', '#9370db']
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.8,
            random: true,
            animation: {
                enable: true,
                speed: 0.5,
                opacity_min: 0.2,
                sync: false
            }
        },
        size: {
            value: 2,
            random: true,
            animation: {
                enable: true,
                speed: 1,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#9370db',
            opacity: 0.2,
            width: 0.5
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Mobile hamburger menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
    const toggleIcon = navToggle.querySelector('i');
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isActive = navLinks.classList.contains('active');
        toggleIcon.classList.toggle('fa-bars', !isActive);
        toggleIcon.classList.toggle('fa-times', isActive);
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggleIcon.classList.add('fa-bars');
            toggleIcon.classList.remove('fa-times');
        });
    });
}

// Scroll-triggered reveal animations
(function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        return;
    }

    const slideTargets = document.querySelectorAll(
        'section > h2, .about-text, .education-card, .skills-category, .experience-card, .cert-card, .project-grid, .contact-content, .credentials-highlight'
    );
    const scaleTargets = document.querySelectorAll('.about-image');

    slideTargets.forEach(el => el.classList.add('reveal'));
    scaleTargets.forEach(el => el.classList.add('reveal-scale'));

    const allTargets = [...slideTargets, ...scaleTargets];

    // Small stagger for elements grouped under the same parent
    const groups = new Map();
    allTargets.forEach(el => {
        const parent = el.parentElement;
        if (!groups.has(parent)) groups.set(parent, []);
        groups.get(parent).push(el);
    });
    groups.forEach(siblings => {
        siblings.forEach((el, i) => {
            el.style.transitionDelay = `${Math.min(i, 5) * 90}ms`;
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            // Only pay the GPU layer cost while the element is actually transitioning
            el.style.willChange = 'opacity, transform';
            el.classList.toggle('reveal-visible', entry.isIntersecting);
            el.addEventListener('transitionend', () => {
                el.style.willChange = 'auto';
            }, { once: true });
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px'
    });

    allTargets.forEach(el => revealObserver.observe(el));
})();
// Get the elements
const carousel = document.querySelector('.cert-carousel');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const card = document.querySelector('.cert-card');

// Calculate the exact distance to scroll
// We assume you want to scroll one full card width plus the gap
const cardWidth = card.offsetWidth;
const gapSize = 20; // Must match the 'gap' value in the CSS

// The scroll distance is the width of one card plus the gap between cards
const scrollDistance = cardWidth + gapSize; 


nextBtn.addEventListener('click', () => {
    // Scroll the carousel to the right by the calculated distance
    carousel.scrollBy({
        left: scrollDistance,
        behavior: 'smooth'
    });
});

prevBtn.addEventListener('click', () => {
    // Scroll the carousel to the left by the calculated distance
    carousel.scrollBy({
        left: -scrollDistance, 
        behavior: 'smooth'
    });
});

// Optional: You could improve this by calculating the scroll distance to show 
// 4 cards at a time (scrollDistance * 4), but scrolling one-by-one feels more intuitive.
