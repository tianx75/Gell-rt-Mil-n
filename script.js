document.addEventListener('DOMContentLoaded', function() {
    
    // === LOGIN OLDAL LOGIKÁJA ===
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        const passwordInput = document.getElementById('passwordInput');
        const errorMessage = document.getElementById('errorMessage');
        const loginBox = document.getElementById('loginBox');
        const lockoutMessageContainer = document.getElementById('lockoutMessageContainer');
        const dots = document.querySelectorAll('#attemptsCounter .dot');
        const correctPassword = "stilus"; 
        let attemptsLeft = 3;

        passwordForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            if (attemptsLeft <= 0) return;

            if (passwordInput.value === correctPassword) {
                window.location.href = "katalogus.html"; 
            } else {
                attemptsLeft--;
                const dotToChange = document.querySelector('.attempts-counter .dot:not(.used)');
                if (dotToChange) {
                    dotToChange.classList.add('used');
                }
                
                if (attemptsLeft > 0) {
                    errorMessage.textContent = `Hibás kód. Még ${attemptsLeft} próbálkozás maradt.`;
                    passwordInput.value = ""; 
                } else {
                    errorMessage.textContent = "";
                    loginBox.style.opacity = '0';
                    setTimeout(() => {
                        loginBox.hidden = true;
                        lockoutMessageContainer.hidden = false;
                    }, 500); 
                }
            }
        });
        passwordInput.addEventListener('input', function() { errorMessage.textContent = ""; });
    }

    // === "LEVEL UP" ÉS KATALÓGUS OLDAL KÖZÖS LOGIKÁJA (HAMBURGER MENÜ) ===
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    if (hamburgerIcon) {
        const navUl = document.querySelector('header nav ul');
        hamburgerIcon.addEventListener('click', function() {
            navUl.classList.toggle('mobile-menu-open');
            this.classList.toggle('active'); 
        });
        navUl.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                if (navUl.classList.contains('mobile-menu-open')) {
                    navUl.classList.remove('mobile-menu-open');
                    hamburgerIcon.classList.remove('active');
                }
            });
        });
    }
    
    // === "LEVEL UP" OLDAL SPECIFIKUS LOGIKÁJA (HARMONIKA) ===
    const accordionTriggers = document.querySelectorAll('.levelup-page #szolgaltatasok .accordion-trigger');
    if (accordionTriggers.length > 0) {
        accordionTriggers.forEach(trigger => {
            trigger.addEventListener('click', function () {
                const content = this.nextElementSibling; 
                const isOpen = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isOpen);
                this.classList.toggle('active'); 
                if (!isOpen) {
                    content.hidden = false;
                    requestAnimationFrame(() => {
                        content.style.maxHeight = content.scrollHeight + "px";
                        content.classList.add('open');
                    });
                } else {
                    content.style.maxHeight = null;
                    content.classList.remove('open');
                    content.addEventListener('transitionend', function handler() {
                        if (!content.style.maxHeight) { content.hidden = true; }
                        content.removeEventListener('transitionend', handler);
                    }, { once: true });
                }
            });
        });
    }

    // === KATALÓGUS OLDAL LIGHTBOX LOGIKÁJA ===
    const lightbox = document.getElementById('lightbox');
    const productCards = document.querySelectorAll('.catalog-page .product-card');
    if (lightbox && productCards.length > 0) {
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxClose = document.querySelector('.lightbox-close');

        productCards.forEach(card => {
            card.addEventListener('click', function() {
                const imageSrc = card.querySelector('img').src;
                lightboxImage.src = imageSrc;
                lightbox.hidden = false;
                setTimeout(() => { lightbox.classList.add('visible'); }, 10);
            });
        });

        const closeLightbox = function() {
            lightbox.classList.remove('visible');
            lightbox.addEventListener('transitionend', function() {
                if (!lightbox.classList.contains('visible')) { lightbox.hidden = true; }
            }, { once: true });
        };
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) { closeLightbox(); }
        });
    }
});
