// Scroll-reveal: elements with .reveal fade/slide in when they enter view.
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(function (el) { observer.observe(el); });
})();

// Enquiry form: opens WhatsApp to the first booking number with a prefilled message.
document.getElementById('enquiry-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var name = document.getElementById('f-name').value.trim();
  var flight = document.getElementById('f-flight').value;
  var msg = document.getElementById('f-msg').value.trim();
  var text = 'Hi! I want to book a paragliding flight in Tehri.';
  if (name) text += ' My name is ' + name + '.';
  text += ' Flight: ' + flight + '.';
  if (msg) text += ' ' + msg;
  window.open('https://wa.me/919897583393?text=' + encodeURIComponent(text), '_blank');
});
