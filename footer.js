// ===== Синхронізований футер (єдине джерело правди для всіх сторінок) =====
(function () {
    if (document.querySelector('footer')) return;

    var footerHTML =
        '<footer class="site-footer">' +
        '  <div class="footer-inner">' +
        '    <div class="footer-brand">' +
        '      <img src="img/Gemini_Generated_Image_xtxn69xtxn69xtxn-Photoroom.png" alt="Вікна та Двері для Оселі" class="footer-brand__img">' +
        '      <span>Вікна та Двері для Оселі</span>' +
        '    </div>' +
        '    <p class="footer-tagline">Вікна та Двері для Оселі — ваш надійний партнер.</p>' +
        '    <nav class="footer-nav" aria-label="Навігація">' +
        '      <a href="index.html">Головна</a>' +
        '      <span class="footer-nav__sep" aria-hidden="true">·</span>' +
        '      <a href="about.html">Про нас</a>' +
        '      <span class="footer-nav__sep" aria-hidden="true">·</span>' +
        '      <a href="catalog.html">Каталог</a>' +
        '      <span class="footer-nav__sep" aria-hidden="true">·</span>' +
        '      <a href="services.html">Послуги та Товари</a>' +
        '    </nav>' +
        '    <div class="footer-social" aria-label="Соціальні мережі">' +
        '      <a href="https://www.facebook.com/share/1DJkxDJw3s/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">' +
        '        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>' +
        '      </a>' +
        '      <a href="https://www.instagram.com/meblicity_" target="_blank" rel="noopener noreferrer" aria-label="Instagram">' +
        '        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>' +
        '      </a>' +
        '    </div>' +
        '    <div class="footer-bottom">' +
        '      <p class="footer-copy">© 2026 Вікна та Двері для Оселі</p>' +
        '    </div>' +
        '  </div>' +
        '</footer>';

    document.body.insertAdjacentHTML('beforeend', footerHTML);
})();
