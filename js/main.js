         // ==========================================================================
        // FUNCIONALIDAD JAVASCRIPT
        // ==========================================================================
        
        // Header que se vuelve sólido al hacer scroll
        window.addEventListener('scroll', function() {
            const header = document.getElementById('main-header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Menú móvil
        const mobileToggle = document.getElementById('mobileToggle');
        const mainNav = document.getElementById('mainNav');
        
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileToggle.textContent = '☰';
            });
        });
        
        // Cookie Consent
        const cookieConsent = document.getElementById('cookieConsent');
        const acceptCookies = document.getElementById('acceptCookies');
        const cookiePreferences = document.getElementById('cookiePreferences');
        
        // Mostrar cookie consent si no se ha aceptado
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                cookieConsent.classList.add('active');
            }, 1000);
        }
        
        acceptCookies.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.classList.remove('active');
            
            // Aquí se cargarían los scripts de terceros como Google AdSense
            // loadAdSenseScript();
        });
        
        cookiePreferences.addEventListener('click', function() {
            alert('En una implementación completa, aquí se mostrarían opciones de configuración de cookies.');
        });
        
        // Formulario de voluntariado
        const volunteerForm = document.getElementById('volunteerForm');
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por tu interés en ser voluntario! Te contactaremos pronto.');
            volunteerForm.reset();
        });
        
        // Selección de método de pago
        const paymentMethods = document.querySelectorAll('.payment-method');
        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                paymentMethods.forEach(m => m.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Animaciones al aparecer en viewport
        function animateOnScroll() {
            const elements = document.querySelectorAll('.fade-up, .card, .about-card, .service-card');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Inicializar elementos con animaciones
        document.querySelectorAll('.fade-up, .card, .about-card, .service-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
        
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);
        
        // Simulación de carga de scripts de terceros después de aceptar cookies
        function loadAdSenseScript() {
            // Esta función cargaría Google AdSense
            console.log('Cargando scripts de anuncios...');
            // Ejemplo:
            // const script = document.createElement('script');
            // script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXX';
            // script.async = true;
            // script.crossOrigin = 'anonymous';
            // document.head.appendChild(script);
            
            // Para Next.js, usar afterInteractive en next/script
        }
        
        // Selector de idioma (simulación)
        const languageSelector = document.querySelector('.language-selector');
        languageSelector.addEventListener('click', function() {
            const currentLang = this.querySelector('span').textContent;
            const newLang = currentLang === 'ES' ? 'EN' : 'ES';
            this.querySelector('span').textContent = newLang;
            
            // En una implementación real, esto redirigiría a /en/ o cargaría contenido en inglés
            if (newLang === 'EN') {
                console.log('Cambiando a versión en inglés...');
                // window.location.href = '/en/';
            }
        });
    
        //HERO CARRUSEL
        const slides = document.querySelectorAll('.hero-image-frame .slide');
        let i = 0;

        setInterval(() => {
        slides[i].classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('active');
    }, 3500);

    // Boton leer mas ...
    document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".about-card");

    cards.forEach(card => {
        const p = card.querySelector(".about-card-content");
        const btn = card.querySelector(".about-readmore-btn");

        if (!p || !btn) return;

        const fullText = p.textContent.trim();
        const limit = 151;

        const shortText = fullText.length > limit
            ? fullText.slice(0, limit) + "…"
            : fullText;

        let expanded = false;

        p.textContent = shortText;

        btn.addEventListener("click", () => {
            expanded = !expanded;

            p.textContent = expanded ? fullText : shortText;
            btn.textContent = expanded ? "Leer menos" : "Leer más";
        });
    });
});

    
