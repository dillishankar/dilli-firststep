// 1. Mobile Menu Toggle Logic
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// 2. Typing Animation Logic
const phraseLine1 = "Websites that make your";
const phraseHighlight = "business stand out.";

let i = 0, k = 0;
const typingSpeed = 90;

function startTyping() {
    const textElement = document.getElementById('typing-text');
    const cursorElement = document.querySelector('.typing-cursor');
    if (!textElement) return;

    function typeWriter() {
        if (i < phraseLine1.length) {
            textElement.innerHTML += phraseLine1.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else if (k < phraseHighlight.length) {
            if (k === 0) {
                textElement.innerHTML += `<br /><span class="highlight-wrapper"><span class="highlight-mint" id="highlight-span"></span></span>`;
            }
            const highlightSpan = document.getElementById('highlight-span');
            if (highlightSpan) {
                highlightSpan.innerHTML += phraseHighlight.charAt(k);
            }
            k++;

            if (k === phraseHighlight.length) {
                if (cursorElement) {
                    cursorElement.style.display = 'none';
                }
                const wrapper = document.querySelector('.highlight-wrapper');
                if (wrapper) {
                    wrapper.insertAdjacentHTML('beforeend', `
                        <svg class="hero-underline-stroke" viewBox="0 0 400 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12 C 100 4, 300 3, 395 11" stroke="#111111" stroke-width="2.2" stroke-linecap="round" />
                            <path d="M25 16 C 120 10, 280 9, 375 15" stroke="#111111" stroke-width="1.8" stroke-linecap="round" />
                        </svg>
                    `);
                }
            } else {
                setTimeout(typeWriter, typingSpeed);
            }
        }
    }

    typeWriter();
}

// 3. Page Load & Scroll Observer Initializer
document.addEventListener('DOMContentLoaded', () => {
    startTyping();

    const observerOptions = {
        threshold: 0.25
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => revealObserver.observe(el));
});

// 4. Interactive Stacked Pricing Deck Switcher
function selectPricingCard(selectedWrapper, event) {
    // Prevent switching card layer if user clicks directly on the CTA button
    if (event && (event.target.tagName === 'A' || event.target.closest('a'))) {
        return;
    }

    const allWrappers = document.querySelectorAll('.stacked-card-wrapper');
    
    allWrappers.forEach(wrapper => {
        wrapper.classList.remove('active');
    });

    selectedWrapper.classList.add('active');
}