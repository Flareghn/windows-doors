// ===== Каталог: навігація бренди → моделі =====
(function () {
    var brandsSection = document.getElementById('brands-section');
    var modelsSection = document.getElementById('models-section');
    var backBtn = document.getElementById('back-to-brands');
    var brandTitle = document.getElementById('brand-title');
    var brandCards = document.querySelectorAll('.brand-card');

    if (!brandsSection || !modelsSection) return;

    // Назви брендів (заміни на свої)
    var brandNames = {
        '1': 'Бренд 1',
        '2': 'Бренд 2',
        '3': 'Бренд 3',
        '4': 'Бренд 4',
        '5': 'Бренд 5',
        '6': 'Бренд 6'
    };

    // Показати моделі бренду
    brandCards.forEach(function (card) {
        card.addEventListener('click', function () {
            var brandId = card.getAttribute('data-brand');
            var name = brandNames[brandId] || 'Бренд';

            brandTitle.textContent = name;
            brandsSection.classList.add('hidden');
            modelsSection.classList.remove('hidden');

            // Перезапускаємо AOS для карток моделей
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }

            // Скролимо вгору до секції моделей
            modelsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Кнопка "Назад до брендів"
    backBtn.addEventListener('click', function () {
        modelsSection.classList.add('hidden');
        brandsSection.classList.remove('hidden');

        // Перезапускаємо AOS для карток брендів
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        // Скролимо вгору до секції брендів
        brandsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
})();
