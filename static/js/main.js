/* ===========================================
   MAIN.JS — Геракл
   =========================================== */

/* --- Мобильное меню --- */
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('menuBtn');
    const nav = document.getElementById('mainNav');
    if (btn && nav) {
        btn.addEventListener('click', function() {
            nav.classList.toggle('open');
        });
    }
});

/* --- Подсветка TOC при скролле --- */
(function() {
    const toc = document.getElementById('sidebarToc');
    if (!toc) return;

    const links = toc.querySelectorAll('a');
    const ids = [];
    links.forEach(function(a) {
        const id = a.getAttribute('href').replace('#', '');
        if (id) ids.push(id);
    });

    window.addEventListener('scroll', function() {
        let active = '';
        ids.forEach(function(id) {
            const el = document.getElementById(id);
            if (el && el.getBoundingClientRect().top < 120) {
                active = id;
            }
        });
        links.forEach(function(a) {
            const href = a.getAttribute('href').replace('#', '');
            a.style.color = (href === active) ? '#8b4513' : '';
            a.style.fontWeight = (href === active) ? '600' : '';
        });
    });
})();

/* --- Прогресс-бар чтения --- */
(function() {
    const bar = document.querySelector('.reading-progress');
    if (!bar) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
            bar.style.width = Math.min(100, (scrollTop / docHeight) * 100) + '%';
        }
    });
})();
