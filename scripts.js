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

// Smooth Professional FAQ Accordion Toggle
function toggleFaq(button) {
    const currentItem = button.parentElement;
    const currentAnswer = currentItem.querySelector('.faq-answer');
    const isActive = currentItem.classList.contains('active');

    // Close all other active FAQ items smoothly
    document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== currentItem) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = null;
        }
    });

    // Toggle current item state
    if (isActive) {
        currentItem.classList.remove('active');
        currentAnswer.style.maxHeight = null;
    } else {
        currentItem.classList.add('active');
        // Calculate dynamic height to drive CSS transition smoothly
        currentAnswer.style.maxHeight = currentAnswer.scrollHeight + "px";
    }
}


// Google Apps Script Web App Endpoint
const GOOGLE_SHEET_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyyAD5x0yvrwG1CQB4-d65b6qHNtghC9bfQC_om4HE6sMudzNQnKGa4dDL722sE6pz_/exec";

const whatsappBtn = document.querySelector(".pro-whatsapp-btn");
const whatsappPopup = document.getElementById("whatsappPopup");

// Timed Display Trigger (Shows 4 seconds after page load)
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        if (whatsappBtn) whatsappBtn.classList.add("show");
        setTimeout(() => {
            if (whatsappPopup) whatsappPopup.classList.add("show");
        }, 600);
    }, 4000);
});

function toggleNotificationCard() {
    if (whatsappPopup) {
        whatsappPopup.classList.toggle("show");
    }
}

function closeWhatsApp() {
    if (whatsappPopup) {
        whatsappPopup.classList.remove("show");
    }
}

// Tab Switcher Logic (Direct Chat vs Quick Inquiry Form)
function switchNotifTab(tabName) {
    const chatBtn = document.getElementById("tabChatBtn");
    const formBtn = document.getElementById("tabFormBtn");
    const chatView = document.getElementById("notifChatView");
    const formView = document.getElementById("notifFormView");

    if (tabName === "chat") {
        chatBtn.classList.add("active");
        formBtn.classList.remove("active");
        chatView.classList.add("active");
        formView.classList.remove("active");
    } else {
        formBtn.classList.add("active");
        chatBtn.classList.remove("active");
        formView.classList.add("active");
        chatView.classList.remove("active");
    }
}

// Google Apps Script Form Submission Handler
function handleLeadSubmit(event) {
    event.preventDefault();

    const nameInput = document.getElementById("leadName");
    const phoneInput = document.getElementById("leadPhone");
    const submitBtn = document.getElementById("leadSubmitBtn");
    const successMsg = document.getElementById("formSuccessMsg");

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !phone) return;

    // UI Loading State
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
    submitBtn.disabled = true;

    // Prepare URL-Encoded Data payload for Google Apps Script
    const formData = new URLSearchParams();
    formData.append("Name", name);
    formData.append("Phone", phone);

    fetch(GOOGLE_SHEET_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Bypasses CORS policy issues for Google Apps Script
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString()
    })
        .then(() => {
            // Success Feedback
            submitBtn.innerHTML = `<span>Submitted!</span> <i class="fa-solid fa-check"></i>`;
            successMsg.innerText = "Thank you! We will contact you shortly.";
            document.getElementById("leadCaptureForm").reset();

            setTimeout(() => {
                submitBtn.innerHTML = `<span>Submit Inquiry</span> <i class="fa-solid fa-check"></i>`;
                submitBtn.disabled = false;
            }, 3500);
        })
        .catch((error) => {
            console.error("Error submitting lead:", error);
            submitBtn.innerHTML = `<span>Submit Inquiry</span>`;
            successMsg.innerText = "Something went wrong. Please try WhatsApp chat.";
            submitBtn.disabled = false;
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const cards = Array.from(document.querySelectorAll('.service-cover-card'));
    const viewport = document.getElementById('cardDeckViewport');

    let currentIndex = 0;
    const totalCards = cards.length;
    let autoLoopTimer = null;

    function updateDeck() {
        cards.forEach((card, i) => {
            card.classList.remove('is-center', 'is-left', 'is-right', 'is-hidden');

            let offset = i - currentIndex;
            if (offset < -1) offset += totalCards;
            if (offset > 1) offset -= totalCards;

            if (offset === 0) {
                card.classList.add('is-center');
            } else if (offset === 1) {
                card.classList.add('is-right');
            } else if (offset === -1) {
                card.classList.add('is-left');
            } else {
                card.classList.add('is-hidden');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateDeck();
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.dataset.index, 10);
            if (index !== currentIndex) {
                currentIndex = index;
                updateDeck();
                resetAutoLoop();
            }
        });
    });

    // Slowed down interval to 6.0 seconds for smooth viewing
    function startAutoLoop() {
        autoLoopTimer = setInterval(nextSlide, 6000);
    }

    function resetAutoLoop() {
        clearInterval(autoLoopTimer);
        startAutoLoop();
    }

    viewport.addEventListener('mouseenter', () => clearInterval(autoLoopTimer));
    viewport.addEventListener('mouseleave', () => startAutoLoop());

    updateDeck();
    startAutoLoop();
});



/**
 * Opens the Glassmorphism Testimonial Modal
 * @param {string} name - Client's name
 * @param {string} quote - Client's testimonial message
 * @param {string} avatarSrcOrInitials - Image path (e.g. 'images/client1.jpg') OR initials (e.g. 'DP')
 * @param {string} role - Client's role or company
 */
function openModal(name, quote, avatarSrcOrInitials, role) {
    const modalName = document.getElementById('modalName');
    const modalQuote = document.getElementById('modalQuote');
    const modalAvatar = document.getElementById('modalAvatar');
    const modalRole = document.getElementById('modalRole');
    const modal = document.getElementById('testimonialModal');

    // Populate Modal Content
    if (modalName) modalName.textContent = name;
    if (modalQuote) modalQuote.textContent = `"${quote}"`;
    if (modalRole) modalRole.textContent = role;

    // Smart Avatar Handler (Handles image path vs initials)
    if (modalAvatar) {
        if (avatarSrcOrInitials.includes('/') || avatarSrcOrInitials.includes('.')) {
            // It's an image path
            modalAvatar.style.backgroundImage = `url('${avatarSrcOrInitials}')`;
            modalAvatar.style.backgroundSize = 'cover';
            modalAvatar.style.backgroundPosition = 'center';
            modalAvatar.textContent = '';
        } else {
            // It's initials (fallback)
            modalAvatar.style.backgroundImage = 'none';
            modalAvatar.textContent = avatarSrcOrInitials;
        }
    }

    // Show Modal & Lock Background Scroll
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Closes the Testimonial Modal
 */
function closeModal() {
    const modal = document.getElementById('testimonialModal');
    if (modal) modal.classList.remove('active');

    // Restore Background Scroll
    document.body.style.overflow = '';
}

/**
 * Closes modal when clicking on the blurred background overlay
 */
function closeModalOnOverlay(event) {
    if (event.target.classList.contains('modal-overlay')) {
        closeModal();
    }
}

/**
 * Keyboard Access: Close modal on 'Escape' key press
 */
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Contact Form Submission Handler
function submitContactForm(event) {
    event.preventDefault();

    const form = document.getElementById("websiteContactForm");
    const submitBtn = document.getElementById("contactSubmitBtn");
    const statusMsg = document.getElementById("contactFormStatus");

    const name = document.getElementById("contactName").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !phone || !email || !subject || !message) return;

    // Loading State
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
    submitBtn.disabled = true;

    // Payload formatted for Google Apps Script sheet
    const formData = new URLSearchParams();
    formData.append("Name", name);
    formData.append("Phone", phone);
    formData.append("Email", email);
    formData.append("Subject", subject);
    formData.append("Message", message);

    fetch(GOOGLE_SHEET_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString()
    })
    .then(() => {
        submitBtn.innerHTML = `<span>Sent Successfully!</span> <i class="fa-solid fa-check"></i>`;
        statusMsg.className = "contact-status-msg success";
        statusMsg.innerText = "Thank you! Your message has been sent.";
        form.reset();

        setTimeout(() => {
            submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane btn-arrow"></i>`;
            submitBtn.disabled = false;
        }, 4000);
    })
    .catch((error) => {
        console.error("Error submitting contact form:", error);
        submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane btn-arrow"></i>`;
        statusMsg.className = "contact-status-msg error";
        statusMsg.innerText = "Failed to send message. Please try WhatsApp.";
        submitBtn.disabled = false;
    });
}