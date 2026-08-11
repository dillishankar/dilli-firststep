
    // 1. Mobile Toggle Logic
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 2. Typing Animation Logic (Strict 2 Lines)
    const phraseLine1 = "Websites that make your";
    const phraseHighlight = "business stand out.";

    let i = 0, k = 0;
    const typingSpeed = 90; // Smooth typing speed

    function startTyping() {
        const textElement = document.getElementById('typing-text');
        if (!textElement) return;

        function typeWriter() {
            // Line 1: "Websites that make your"
            if (i < phraseLine1.length) {
                textElement.innerHTML += phraseLine1.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            } 
            // Line 2: Break line + Highlighted "business stand out."
            else if (k < phraseHighlight.length) {
                if (k === 0) {
                    textElement.innerHTML += `<br /><span class="highlight-mint" id="highlight-span"></span>`;
                }
                const highlightSpan = document.getElementById('highlight-span');
                if (highlightSpan) {
                    highlightSpan.innerHTML += phraseHighlight.charAt(k);
                }
                k++;
                setTimeout(typeWriter, typingSpeed);
            }
        }

        typeWriter();
    }

    // Trigger on load
    if (document.readyState === 'complete') {
        startTyping();
    } else {
        window.addEventListener('load', startTyping);
    }