// ===== Ініціалізація AOS (Animate On Scroll) =====
document.addEventListener('DOMContentLoaded', function () {
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: false, duration: 800 });
    }
});

// ===== Динамічні стилі навбару (фон/блюр/висота при завантаженні і скролі) =====
(function () {
    var n = document.querySelector('nav');
    if (!n) return;

    function bgStr(v, opPct) {
        if (!v) return '';
        var o = parseInt(opPct) / 100;
        if (v.charAt(0) === '#') {
            var r = parseInt(v.slice(1, 3), 16) || 0,
                g = parseInt(v.slice(3, 5), 16) || 0,
                b = parseInt(v.slice(5, 7), 16) || 0;
            return 'rgba(' + r + ',' + g + ',' + b + ',' + o + ')';
        }
        return 'color-mix(in srgb, ' + v + ' ' + parseInt(opPct) + '%, transparent)';
    }

    var bg = n.getAttribute('data-nav-initial-bg'),
        op = n.getAttribute('data-nav-initial-opacity') || '100',
        bl = n.getAttribute('data-nav-initial-blur') || '0',
        h = n.getAttribute('data-nav-initial-height'),
        tc = n.getAttribute('data-nav-initial-text'),
        nb = n.getAttribute('data-nav-initial-nobg') === '1';

    if (nb) {
        n.style.setProperty('background', 'transparent', 'important');
    } else {
        if (bg) {
            n.style.setProperty('background', bgStr(bg, op), 'important');
        }
        if (parseInt(bl) > 0) {
            n.style.setProperty('backdrop-filter', 'blur(' + bl + 'px)', 'important');
            n.style.setProperty('-webkit-backdrop-filter', 'blur(' + bl + 'px)', 'important');
        }
    }

    if (h) {
        var d = n.querySelector(':scope>div');
        if (d) d.style.setProperty('min-height', h + 'px', 'important');
    }

    function setTxt(c) {
        if (c) n.querySelectorAll('a,span').forEach(function (e) {
            e.style.setProperty('color', c, 'important');
        });
    }
    setTxt(tc);

    var sbg = n.getAttribute('data-nav-scroll-bg'),
        snb = n.getAttribute('data-nav-scroll-nobg') === '1',
        stc = n.getAttribute('data-nav-scroll-text');

    if (sbg || snb || stc) {
        var sop = n.getAttribute('data-nav-scroll-opacity') || '100',
            sbl = n.getAttribute('data-nav-scroll-blur') || '0',
            sh = n.getAttribute('data-nav-scroll-height'),
            st = parseInt(n.getAttribute('data-nav-scroll-trigger') || '50'),
            sms = n.getAttribute('data-nav-scroll-transition') || '300',
            iBg = n.style.background,
            iBl = n.style.backdropFilter,
            iH = h ? (h + 'px') : '';

        n.style.transition = 'all ' + sms + 'ms ease';

        window.addEventListener('scroll', function () {
            if (window.scrollY > st) {
                if (snb) {
                    n.style.setProperty('background', 'transparent', 'important');
                    n.style.setProperty('backdrop-filter', '', 'important');
                } else if (sbg) {
                    n.style.setProperty('background', bgStr(sbg, sop), 'important');
                    if (parseInt(sbl) > 0) {
                        n.style.setProperty('backdrop-filter', 'blur(' + sbl + 'px)', 'important');
                        n.style.setProperty('-webkit-backdrop-filter', 'blur(' + sbl + 'px)', 'important');
                    }
                }
                if (sh) {
                    var d = n.querySelector(':scope>div');
                    if (d) d.style.setProperty('min-height', sh + 'px', 'important');
                }
                setTxt(stc);
            } else {
                n.style.setProperty('background', iBg, 'important');
                n.style.setProperty('backdrop-filter', iBl || '', 'important');
                if (iH) {
                    var d2 = n.querySelector(':scope>div');
                    if (d2) d2.style.setProperty('min-height', iH, 'important');
                }
                setTxt(tc);
            }
        }, { passive: true });
    }
})();

// ===== Мобільне бургер-меню: побудова і взаємодія =====
(function () {
    var nav = document.querySelector('nav');
    if (!nav) return;

    // Збираємо посилання навігації (пропускаємо логотип і пункти без href або лише з #)
    var links = nav.querySelectorAll('a[href]');
    var menuLinks = [];
    links.forEach(function (a) {
        var href = a.getAttribute('href') || '';
        var text = a.textContent.trim();
        if (!text || text.length > 60) return;
        // Пропускаємо посилання логотипу
        if (a.closest('[data-id*="logo"]')) return;
        // Пропускаємо перемикач мов — це не навігація
        if (a.classList.contains('lang-switcher__link')) return;
        if (a.closest('.lang-switcher, .wg-lang-sw')) return;
        menuLinks.push({ text: text, href: href, target: a.getAttribute('target') || '', cls: a.className || '', el: a });
    });
    if (menuLinks.length < 2) return;

    // Створюємо кнопку-бургер
    var burger = document.createElement('button');
    burger.className = 'lp-burger';
    burger.setAttribute('aria-label', 'Menu');
    for (var i = 0; i < 3; i++) burger.appendChild(document.createElement('span'));

    // Створюємо мобільний оверлей (якщо ще не існує в розмітці)
    var overlay = document.getElementById('lp-mobile-nav');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'lp-mobile-nav';
        overlay.id = 'lp-mobile-nav';

        var closeBtn = document.createElement('button');
        closeBtn.className = 'lp-mobile-nav__close';
        closeBtn.setAttribute('aria-label', 'Close');
        closeBtn.textContent = '×';
        overlay.appendChild(closeBtn);

        var linksWrap = document.createElement('div');
        linksWrap.className = 'lp-mobile-nav__links';
        menuLinks.forEach(function (l) {
            var a = document.createElement('a');
            a.setAttribute('href', l.href);
            if (l.target) a.setAttribute('target', l.target);
            a.className = 'lp-mobile-nav__link';
            a.textContent = l.text;
            linksWrap.appendChild(a);
        });
        overlay.appendChild(linksWrap);
        document.body.appendChild(overlay);
    }

    // Ховаємо посилання навігації на мобільних (вони дублюються в оверлеї)
    menuLinks.forEach(function (l) { l.el.classList.add('lp-desktop-nav'); });

    // Вставляємо бургер у navbar
    var navInner = nav.querySelector('.flex, .grid, [class*="container"], [class*="wrapper"]') || nav;
    navInner.appendChild(burger);

    // Обробники відкриття/закриття
    function openMenu() { overlay.classList.add('lp-mobile-nav--open'); document.body.style.overflow = 'hidden'; }
    function closeMenu() { overlay.classList.remove('lp-mobile-nav--open'); document.body.style.overflow = ''; }

    burger.addEventListener('click', function () {
        overlay.classList.contains('lp-mobile-nav--open') ? closeMenu() : openMenu();
    });
    overlay.querySelector('.lp-mobile-nav__close').addEventListener('click', closeMenu);
    overlay.querySelectorAll('.lp-mobile-nav__link').forEach(function (a) {
        a.addEventListener('click', closeMenu);
    });
})();
