/* AI, Hands On — shared behaviour for the landing page and lesson pages.
   Everything here is progressive enhancement: the pages read fine without it. */
(function () {
  'use strict';

  /* Mobile nav toggle */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Copy-to-clipboard buttons: <button data-copy="text"> or data-copy-from="#id" */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
      resolve();
    });
  }
  document.querySelectorAll('[data-copy], [data-copy-from]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var from = btn.getAttribute('data-copy-from');
      if (from) {
        var src = document.querySelector(from);
        if (src) {
          text = Array.prototype.map.call(src.querySelectorAll('.pline'), function (el) {
            return el.textContent.trim();
          }).join('\n');
        }
      }
      if (text == null) return;
      copyText(text).then(function () {
        var original = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 1600);
      });
    });
  });

  /* Quiz: <div class="quiz-item"> with buttons carrying data-correct="true" */
  document.querySelectorAll('.quiz-item').forEach(function (item) {
    var buttons = item.querySelectorAll('.options button');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (item.classList.contains('is-answered')) return;
        item.classList.add('is-answered');
        buttons.forEach(function (b) {
          if (b.getAttribute('data-correct') === 'true') b.classList.add('is-right');
          b.disabled = true;
        });
        if (btn.getAttribute('data-correct') !== 'true') btn.classList.add('is-wrong');
      });
    });
  });

  /* Progress checklist: remembers ticks per page in localStorage */
  var progress = document.querySelector('.progress[data-progress-key]');
  if (progress) {
    var key = 'progress:' + progress.getAttribute('data-progress-key');
    var boxes = progress.querySelectorAll('input[type="checkbox"]');
    var bar = progress.querySelector('.bar span');
    var count = progress.querySelector('[data-progress-count]');
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) { saved = {}; }

    function render() {
      var done = 0;
      boxes.forEach(function (box) {
        box.closest('li').classList.toggle('is-done', box.checked);
        if (box.checked) done += 1;
      });
      if (bar) bar.style.width = Math.round((done / boxes.length) * 100) + '%';
      if (count) count.textContent = done + ' of ' + boxes.length + ' done';
    }
    boxes.forEach(function (box) {
      if (saved[box.id]) box.checked = true;
      box.addEventListener('change', function () {
        saved[box.id] = box.checked;
        try { localStorage.setItem(key, JSON.stringify(saved)); } catch (e) { /* ignore */ }
        render();
      });
    });
    render();
  }

  /* On-this-page: highlight the section in view */
  var onPage = document.querySelectorAll('.on-page a[href^="#"]');
  if (onPage.length && 'IntersectionObserver' in window) {
    var map = {};
    onPage.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          onPage.forEach(function (a) { a.classList.remove('is-active'); });
          var link = map[entry.target.id];
          if (link) link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  /* Open the week accordion named in the URL hash (e.g. index.html#week-2) */
  function openHashTarget() {
    if (!location.hash) return;
    var target = document.querySelector(location.hash);
    if (target && target.tagName === 'DETAILS') target.open = true;
  }
  window.addEventListener('hashchange', openHashTarget);
  openHashTarget();
})();
