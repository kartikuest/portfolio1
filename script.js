(function () {
  'use strict';
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  function closeMenu() { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  document.getElementById('year').textContent = new Date().getFullYear();

  var copyBtn = document.getElementById('copy-email');
  var msg = document.getElementById('copy-msg');
  var email = 'kartikshukla08866@gmail.com';
  function say(t) { msg.textContent = t; setTimeout(function () { msg.textContent = ''; }, 3000); }
  function fallback() {
    var t = document.createElement('textarea');
    t.value = email; t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    document.body.removeChild(t);
    say(ok ? 'Email copied.' : 'Copy failed. Please select the email address manually.');
  }
  copyBtn.addEventListener('click', function () {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(function () { say('Email copied.'); }, fallback);
    } else { fallback(); }
  });

  // Resume: shows the download button only if resume.pdf exists next to index.html
  var link = document.getElementById('resume-link');
  var status = document.getElementById('resume-status');
  if (location.protocol !== 'file:' && window.fetch) {
    fetch('resume.pdf', { method: 'HEAD' }).then(function (r) {
      if (r.ok) { link.hidden = false; status.hidden = true; }
    }).catch(function () {});
  }

  // Highlight current section in navigation
  var links = document.querySelectorAll('.menu a');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { io.observe(s); });
  }
})();
