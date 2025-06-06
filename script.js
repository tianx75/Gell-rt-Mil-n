document.addEventListener('DOMContentLoaded', function() {
    
    // === LOGIN OLDAL LOGIKÁJA ===
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        const passwordInput = document.getElementById('passwordInput');
        const errorMessage = document.getElementById('errorMessage');
        const loginBox = document.getElementById('loginBox');
        const lockoutMessageContainer = document.getElementById('lockoutMessageContainer');
        const correctPassword = "stilus"; 
        let attemptsLeft = 3;

        passwordForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            if (attemptsLeft <= 0) return;

            if (passwordInput.value === correctPassword) {
                window.location.href = "landing.html"; 
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

    // === HAMBURGER MENÜ LOGIKÁJA (Minden oldalon, ahol van) ===
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    if (hamburgerIcon) { 
        const navUl = document.querySelector('header nav ul');
        hamburgerIcon.addEventListener('click', function() {
            navUl.classList.toggle('mobile-menu-open');
            this.classList.toggle('active'); 
        });
        navUl.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function(e) {
                if (link.getAttribute('href').startsWith('#')) {
                    if (navUl.classList.contains('mobile-menu-open')) {
                        navUl.classList.remove('mobile-menu-open');
                        hamburgerIcon.classList.remove('active');
                    }
                }
            });
        });
    }
    
    // === LIGHTBOX LOGIKA (Minden oldalon, ahol van galéria) ===
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxClose = document.querySelector('.lightbox-close');
        
        document.addEventListener('click', function(e) {
            // Ellenőrizzük, hogy a kattintott elem egy galéria képe-e
            if (e.target.closest('.gallery-grid') && e.target.tagName === 'IMG') {
                const imageSrc = e.target.src;
                lightboxImage.src = imageSrc;
                lightbox.hidden = false;
                setTimeout(() => { lightbox.classList.add('visible'); }, 10);
            }
        });

        const closeLightbox = function() {
            lightbox.classList.remove('visible');
            lightbox.addEventListener('transitionend', function() {
                if (!lightbox.classList.contains('visible')) {
                    lightbox.hidden = true;
                }
            }, { once: true });
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

});
