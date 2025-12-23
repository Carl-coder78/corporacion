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
        
(() => {
  const hero = document.querySelector('[data-hero-editorial]');
  if (!hero) return;

  const slides = hero.querySelectorAll('.hero-image-slide');
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }, 6000);
})();



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

// MODAL APORTES
const openModalBtn = document.querySelector('[data-open-modal="supportModal"]');
const modal = document.getElementById('supportModal');
const closeEls = modal.querySelectorAll('[data-close-modal]');

openModalBtn.addEventListener('click', () => {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.querySelector('input, select, textarea').focus();
});

closeEls.forEach(el => {
  el.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  openModalBtn.focus();
}

// ===============================
// MODAL PROYECTOS — MAIN PRINCIPAL
// ===============================

const projectModal = document.getElementById('globalProjectModal');
const projectFrame = document.getElementById('globalModalFrame');
const closeBtn = document.querySelector('.global-close');

// ABRIR
document.addEventListener('click', e => {
  const trigger = e.target.closest('[data-modal-url]');
  if (!trigger) return;

  e.preventDefault();

  projectFrame.src = trigger.dataset.modalUrl + '#open';
  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
});

// CERRAR (BOTÓN / ESC / MENSAJE)
function closeProject() {
  projectModal.classList.remove('active');
  projectFrame.src = '';
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeProject);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && projectModal.classList.contains('active')) {
    closeProject();
  }
});

window.addEventListener('message', e => {
  if (e.data === 'CLOSE_PROJECT') {
    closeProject();
  }
});

/* ===============================
   HERO — CARRUSEL + EDITORIAL
   No se pisan
================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ===============================
       IMÁGENES HERO (MISMA LÓGICA ORIGINAL)
    =============================== */
    const slides = document.querySelectorAll('.hero-image-frame .slide');
    const indicators = document.querySelectorAll('.image-indicators .indicator');

    let currentImage = 0;
    let imageInterval;

    function changeImage(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        slides[index].classList.add('active');
        if (indicators[index]) indicators[index].classList.add('active');

        currentImage = index;
    }

    function startImageRotation() {
        clearInterval(imageInterval);
        imageInterval = setInterval(() => {
            const next = (currentImage + 1) % slides.length;
            changeImage(next);
        }, 6000);
    }

    // estado inicial
    changeImage(0);
    startImageRotation();

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            changeImage(index);
            startImageRotation();
        });
    });

    /* ===============================
       STACK EDITORIAL 
    =================== */
    const headlines = document.querySelectorAll('.headline-item');
    let headlineIndex = 1;
    const totalHeadlines = headlines.length;

    function animateHeadlines() {

        if (headlineIndex >= totalHeadlines) {
            for (let i = 1; i < totalHeadlines; i++) {
                headlines[i].classList.remove('active');
            }

            headlineIndex = 1;
            headlines[0].classList.add('active');

            setTimeout(() => {
                headlines[0].classList.remove('active');
                setTimeout(() => {
                    headlines[headlineIndex].classList.add('active');
                    headlineIndex++;
                    setTimeout(animateHeadlines, 3000);
                }, 500);
            }, 3000);

            return;
        }

        if (headlineIndex > 0) {
            headlines[headlineIndex - 1].classList.remove('active');
        }

        headlines[headlineIndex].classList.add('active');
        headlineIndex++;

        setTimeout(animateHeadlines, 3000);
    }

    setTimeout(animateHeadlines, 4000);

});


  /* ===============================
       Data target SCROLL TO
    =============================== */
(function () {

    const modal = document.getElementById('globalProjectModal');
    const body = document.body;

    function closeModalFast() {
        if (!modal) return;

        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';

        // liberar scroll inmediatamente
        body.style.overflow = '';

        // quitar del flujo un poco después
        setTimeout(() => {
            modal.classList.remove('active');
            modal.style.opacity = '';
            modal.style.pointerEvents = '';
        }, 120);
    }

    window.addEventListener('message', function (event) {

        if (!event.data || event.data.type !== 'SCROLL_TO') return;

        const targetEl = document.querySelector(event.data.target);
        if (!targetEl) return;

        // 1️⃣ cerrar modal de forma inmediata visual
        closeModalFast();

        // 2️⃣ scroll casi inmediato
        requestAnimationFrame(() => {
            targetEl.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });

    });

})();




