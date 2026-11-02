// Tehri Lake Water Sports & Homestay — dynamic behaviour
(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  var headerInner = document.querySelector('.header-inner');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      if (headerInner) headerInner.classList.toggle('wrap-nav', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        if (headerInner) headerInner.classList.remove('wrap-nav');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Image fallback: if a hotlinked photo fails, drop it and show the styled placeholder behind it
  function armFallback(img, containerClass) {
    img.addEventListener('error', function () {
      if (containerClass) img.closest('.' + containerClass).classList.add('img-broken');
      img.remove();
    });
  }
  document.querySelectorAll('.gallery-item img').forEach(function (img) {
    armFallback(img, null);
  });
  var heroImg = document.querySelector('.hero-media img');
  if (heroImg) armFallback(heroImg, 'hero-media');

  // Gallery lightbox
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  var lbCaption = document.getElementById('lightbox-caption');
  var current = -1;

  function show(index) {
    if (!items.length) return;
    current = (index + items.length) % items.length;
    var img = items[current].querySelector('img');
    if (!img) { // broken image: skip to the next one with a photo
      var next = (current + 1) % items.length;
      if (next === current) return;
      show(next);
      return;
    }
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = items[current].getAttribute('data-caption') || img.alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    current = -1;
  }
  items.forEach(function (item, i) {
    item.addEventListener('click', function () { show(i); });
  });
  var closeBtn = document.querySelector('.lightbox-close');
  var prevBtn = document.querySelector('.lightbox-prev');
  var nextBtn = document.querySelector('.lightbox-next');
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // FAQ accordion
  document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var panel = header.nextElementSibling;
      var isOpen = panel.classList.toggle('open');
      header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // Enquiry form -> WhatsApp
  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('f-name').value.trim();
      var date = document.getElementById('f-date').value;
      var interest = document.getElementById('f-interest').value;
      var message = document.getElementById('f-message').value.trim();
      if (!name) {
        document.getElementById('f-name').focus();
        return;
      }
      var lines = ['Hello Tehri Lake Water Sports & Homestay!',
        'I am ' + name + '.',
        'I would like to enquire about: ' + interest + '.'];
      if (date) lines.push('Preferred date: ' + date + '.');
      if (message) lines.push('Message: ' + message);
      var url = 'https://wa.me/917060190564?text=' + encodeURIComponent(lines.join(' '));
      window.open(url, '_blank');
    });
  }
})();
