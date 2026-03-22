/* =============================================
   Link Preview — всплывающая картинка при наведении
   ============================================= */
(function() {
  'use strict';

  // Создаём элемент превью
  var preview = document.createElement('div');
  preview.className = 'link-preview';
  preview.innerHTML = '<img src="" alt=""><div class="link-preview-title"></div>';
  document.body.appendChild(preview);

  var img = preview.querySelector('img');
  var titleEl = preview.querySelector('.link-preview-title');
  var hideTimeout, showTimeout;

  // Получаем карту из data-атрибута
  var mapEl = document.getElementById('linkPreviewData');
  if (!mapEl) return;

  var linkMap;
  try { linkMap = JSON.parse(mapEl.textContent); } catch(e) { return; }

  // Находим все внутренние ссылки в статье
  var links = document.querySelectorAll('article p a[href^="/"], article li a[href^="/"], .fact-box a[href^="/"], .hub-intro a[href^="/"], .hub-outro a[href^="/"], .labor-block-text a[href^="/"], .hub-table a[href^="/"], .about-block a[href^="/"], .intro-block a[href^="/"]');

  links.forEach(function(link) {
    var href = link.getAttribute('href');
    var data = linkMap[href];
    if (!data || !data.img) return;

    link.addEventListener('mouseenter', function(e) {
      clearTimeout(hideTimeout);
      showTimeout = setTimeout(function() {
        img.src = data.img;
        img.alt = data.title || '';
        titleEl.textContent = data.title || '';

        // Позиционируем
        var rect = link.getBoundingClientRect();
        var scrollY = window.scrollY || window.pageYOffset;
        var scrollX = window.scrollX || window.pageXOffset;

        var top = rect.bottom + scrollY + 8;
        var left = rect.left + scrollX + (rect.width / 2) - 140;

        // Не уходить за край экрана
        if (left < 10) left = 10;
        if (left + 280 > document.documentElement.clientWidth - 10) {
          left = document.documentElement.clientWidth - 290;
        }
        // Если не помещается снизу — показать сверху
        if (rect.bottom + 200 > window.innerHeight) {
          top = rect.top + scrollY - 200;
        }

        preview.style.top = top + 'px';
        preview.style.left = left + 'px';
        preview.classList.add('visible');
      }, 300);
    });

    link.addEventListener('mouseleave', function() {
      clearTimeout(showTimeout);
      hideTimeout = setTimeout(function() {
        preview.classList.remove('visible');
      }, 150);
    });
  });
})();
