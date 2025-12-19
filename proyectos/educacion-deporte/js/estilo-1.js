// ===============================
// PROJECT VIEW — EMBEDDED CONTROLLER
// ===============================
(() => {
    const container = document.getElementById('projectModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const progressFill = document.getElementById('progressFill');

    if (!container) return;

    const ACTIVE_CLASS = 'active';
    const isIframe = window.self !== window.top;

    function activateView() {
        container.classList.add(ACTIVE_CLASS);
        document.body.style.overflow = 'hidden';

        if (progressFill) {
            progressFill.style.width = '0%';
            requestAnimationFrame(() => {
                progressFill.style.width = '76%';
            });
        }

        if (closeBtn) {
            closeBtn.focus();
        }
    }

    function closeView() {
        if (isIframe) {
            window.parent.postMessage('CLOSE_PROJECT', '*');
            return;
        }

        container.classList.remove(ACTIVE_CLASS);
        document.body.style.overflow = '';
    }

    function init() {
        // El padre siempre carga con #open
        if (location.hash === '#open' || !isIframe) {
            activateView();
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeView);
        }

        container.addEventListener('click', e => {
            if (e.target === container) closeView();
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && container.classList.contains(ACTIVE_CLASS)) {
                closeView();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();

// ===============================
// carrusell
// ===============================
(() => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const slides = Array.from(track.children);
    let index = 0;

    const update = () => {
        track.style.transform = `translateX(-${index * 100}%)`;
    };

    document.querySelector('.carousel-btn.next')?.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        update();
    });

    document.querySelector('.carousel-btn.prev')?.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        update();
    });
})();
