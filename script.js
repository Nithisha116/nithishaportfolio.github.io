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

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll reveal animation
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.glass-container');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}
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
document.getElementById('contact-form').addEventListener('submit', async function(event) {
    // 1. Crucial step: Stop the default HTML submission
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const formButton = form.querySelector('.cta-button');

    // 2. Visual feedback while processing
    formButton.disabled = true;
    formButton.textContent = 'Sending...';

    // 3. Perform the submission using the correct URL from the HTML action attribute
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                // Ensure Formspree recognizes the submission as JSON for success/error handling
                'Accept': 'application/json' 
            }
        });

        // 4. Handle response from Formspree
        if (response.ok) {
            formButton.textContent = 'Message Sent! Thank You!';
            form.reset(); // Clear the form inputs

            // Reset button after 3 seconds
            setTimeout(() => {
                formButton.disabled = false;
                formButton.textContent = 'Send Message';
            }, 3000); 
        } else {
            // Log the error to the console for debugging
            console.error('Formspree submission failed:', await response.json());
            
            // Handle error, which might mean the form structure is invalid
            formButton.textContent = 'Error! Check required fields.';
            
            setTimeout(() => {
                formButton.disabled = false;
                formButton.textContent = 'Send Message';
            }, 3000); 
        }
    } catch (error) {
        // 5. Handle network-level failures (e.g., disconnected internet)
        console.error('Network error during form submission:', error);
        formButton.textContent = 'Network Error! Try again later.';

        setTimeout(() => {
            formButton.disabled = false;
            formButton.textContent = 'Send Message';
        }, 3000); 
    }
});