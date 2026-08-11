
    // 1. Mobile Toggle Logic
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
                
                // When finished typing, hide the cursor immediately
                if (k === phraseHighlight.length) {
                    if (cursorElement) {
                        cursorElement.style.display = 'none';
                    }
                } else {
                    setTimeout(typeWriter, typingSpeed);
                }
            }
        }

        typeWriter();
    }

    if (document.readyState === 'complete') {
        startTyping();
    } else {
        window.addEventListener('load', startTyping);
    }
