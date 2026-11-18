/*!
 * Gemeinde Wiesing – Interaktion
 * Keine Abhängigkeiten, keine Tracking-Aufrufe, keine Cookies.
 */
(function () {
  'use strict';

  var root = document.documentElement.getAttribute('data-root') || './';
  var docEl = document.documentElement;
  var lastFocus = null;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function on(el, type, fn, opts) {
    if (el) el.addEventListener(type, fn, opts);
  }

  function trapFocus(container, e) {
    var focusables = $$('a[href], button:not([disabled]), input:not([disabled]), select, textarea, summary, [tabindex]:not([tabindex="-1"])', container)
      .filter(function (el) { return el.offsetParent !== null; });
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  /* ---------------------------------------------------------------------- */
  /* Kopfzeile                                                              */
  /* ---------------------------------------------------------------------- */

  var header = $('#site-header');
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle('is-compact', window.scrollY > 40);
  };
  on(window, 'scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------------- */
  /* Mobile Menü                                                           */
  /* ---------------------------------------------------------------------- */

  var mobileMenu = $('#mobile-menu');
  var menuBtn = $('[data-open-menu]');

  function openMenu() {
    if (!mobileMenu) return;
    lastFocus = document.activeElement;
    mobileMenu.hidden = false;
    void mobileMenu.offsetHeight;
    mobileMenu.classList.add('is-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var first = $('a, button', mobileMenu);
    if (first) first.focus();
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('is-open');
    mobileMenu.hidden = true;
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  on(menuBtn, 'click', openMenu);
  $$('[data-close-menu]').forEach(function (b) { on(b, 'click', closeMenu); });
  on(mobileMenu, 'keydown', function (e) {
    if (e.key === 'Escape') { e.preventDefault(); closeMenu(); }
    else if (e.key === 'Tab') trapFocus(mobileMenu, e);
  });

  /* ---------------------------------------------------------------------- */
  /* Desktop-Untermenüs                                                     */
  /* ---------------------------------------------------------------------- */

  var desktopNav = window.matchMedia('(min-width: 1021px)');

  $$('.nav-item').forEach(function (item) {
    var panel = $('.nav-panel', item);
    if (!panel) return;
    var closeTimer;

    var open = function () {
      window.clearTimeout(closeTimer);
      $$('.nav-item.is-open').forEach(function (other) { if (other !== item) other.classList.remove('is-open'); });
      item.classList.add('is-open');
    };
    var close = function () {
      closeTimer = window.setTimeout(function () { item.classList.remove('is-open'); }, 120);
    };

    on(item, 'pointerenter', function () { if (desktopNav.matches) open(); });
    on(item, 'pointerleave', function () { if (desktopNav.matches) close(); });
    on(item, 'focusin', function () { if (desktopNav.matches) open(); });
    on(item, 'focusout', function (e) {
      if (!desktopNav.matches) return;
      if (!item.contains(e.relatedTarget)) close();
    });
  });

  on(document, 'keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openItems = $$('.nav-item.is-open');
    if (openItems.length) {
      openItems.forEach(function (i) { i.classList.remove('is-open'); });
      var active = document.activeElement;
      if (active && active.closest('.nav-item')) {
        var link = active.closest('.nav-item').querySelector('.nav-link');
        if (link) link.focus();
      }
    }
  });

  /* ---------------------------------------------------------------------- */
  /* Dialoge (Suche, Darstellung)                                          */
  /* ---------------------------------------------------------------------- */

  var searchDialog = $('#search-dialog');
  var a11yDialog = $('#a11y-dialog');
  var dialogTrigger = null;

  function openDialog(dialog, trigger) {
    if (!dialog || typeof dialog.showModal !== 'function') return;
    dialogTrigger = trigger || document.activeElement;
    dialog.showModal();
    var field = dialog.querySelector('[data-search-input]');
    if (field) {
      window.setTimeout(function () { field.focus(); }, 40);
    } else {
      var first = dialog.querySelector('button, input, a[href]');
      if (first) window.setTimeout(function () { first.focus(); }, 40);
    }
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    if (dialog.open) dialog.close();
  }

  $$('[data-open-search]').forEach(function (b) {
    on(b, 'click', function () { openDialog(searchDialog, b); });
  });
  $$('[data-open-a11y]').forEach(function (b) {
    on(b, 'click', function () { openDialog(a11yDialog, b); });
  });
  $$('[data-close-dialog]').forEach(function (b) {
    on(b, 'click', function () { closeDialog(b.closest('dialog')); });
  });
  [searchDialog, a11yDialog].forEach(function (d) {
    if (!d) return;
    on(d, 'click', function (e) {
      if (e.target === d) d.close();
    });
    on(d, 'close', function () {
      if (dialogTrigger && dialogTrigger.focus) dialogTrigger.focus();
    });
  });

  /* ---------------------------------------------------------------------- */
  /* Suche                                                                  */
  /* ---------------------------------------------------------------------- */

  var index = Array.isArray(window.WIESING_SEARCH) ? window.WIESING_SEARCH : null;

  function normalise(value) {
    return (value || '')
      .toString()
      .toLowerCase()
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function search(query, limit) {
    if (!index) return [];
    var terms = normalise(query).split(' ').filter(function (t) { return t.length > 1; });
    if (!terms.length) return [];
    var results = [];
    for (var i = 0; i < index.length; i++) {
      var page = index[i];
      var title = normalise(page.t);
      var desc = normalise(page.d);
      var body = normalise(page.x);
      var score = 0;
      var matchedAll = true;
      for (var j = 0; j < terms.length; j++) {
        var t = terms[j];
        var s = 0;
        if (title === t) s += 60;
        else if (title.indexOf(t) === 0) s += 40;
        else if (title.indexOf(t) > -1) s += 28;
        if (desc.indexOf(t) > -1) s += 12;
        if (body.indexOf(t) > -1) s += 6;
        if (s === 0) { matchedAll = false; break; }
        score += s;
      }
      if (!matchedAll) continue;
      results.push({ page: page, score: score });
    }
    results.sort(function (a, b) { return b.score - a.score; });
    return results.slice(0, limit || 20);
  }

  function pageHref(page) {
    return root + (page.u ? page.u + '/' : '') + 'index.html';
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderResults(list, results, query) {
    if (!list) return;
    list.innerHTML = results
      .map(function (r) {
        var p = r.page;
        return '<li><a href="' + pageHref(p) + '">' +
          '<span class="sr-title">' + escapeHtml(p.t) + '</span>' +
          '<span class="sr-meta">' + escapeHtml(p.c || 'Gemeinde Wiesing') + '</span>' +
          '<span class="sr-desc">' + escapeHtml(p.d || '') + '</span>' +
          '</a></li>';
      })
      .join('');
    if (!results.length && query) {
      list.innerHTML = '<li class="search-empty">Keine Treffer für „' + escapeHtml(query) + '“. Versuchen Sie einen anderen Begriff oder rufen Sie uns an: +43 5244 62623.</li>';
    }
  }

  function debounce(fn, delay) {
    var timer;
    return function () {
      var args = arguments;
      window.clearTimeout(timer);
      timer = window.setTimeout(function () { fn.apply(null, args); }, delay);
    };
  }

  if (!index) {
    $$('[data-search-input], [data-search-page-input]').forEach(function (input) {
      on(input, 'focus', function () {
        var hint = input.parentNode.parentNode.querySelector('.search-hint');
        if (hint) hint.textContent = 'Der Suchindex konnte nicht geladen werden. Nutzen Sie bitte die Sitemap oder rufen Sie uns an.';
      });
    });
  } else {
    var runDialogSearch = function (value) {
      var results = search(value, 8);
      renderResults($('[data-search-results]'), results, value);
    };
    on($('[data-search-input]'), 'input', debounce(function (e) { runDialogSearch(e.target.value); }, 160));

    var pageInput = $('[data-search-page-input]');
    var pageList = $('[data-search-page-results]');
    var pageEmpty = $('[data-search-page-empty]');

    function runPageSearch(value) {
      var query = (value || '').trim();
      if (!query) {
        if (pageList) pageList.innerHTML = '';
        if (pageEmpty) pageEmpty.hidden = false;
        return;
      }
      if (pageEmpty) pageEmpty.hidden = true;
      renderResults(pageList, search(query, 40), query);
    }

    on(pageInput, 'input', debounce(function (e) { runPageSearch(e.target.value); }, 160));

    if (pageInput) {
      var params = new URLSearchParams(window.location.search);
      var q = params.get('q');
      if (q) {
        pageInput.value = q;
        runPageSearch(q);
      }
      on(pageInput.form, 'submit', function (e) {
        e.preventDefault();
        runPageSearch(pageInput.value);
        var heading = $('[data-search-page-results]');
        if (heading) heading.setAttribute('tabindex', '-1');
      });
    }
  }

  /* ---------------------------------------------------------------------- */
  /* Darstellung: Textgröße und Kontrast                                    */
  /* ---------------------------------------------------------------------- */

  var STORE_SIZE = 'wiesing.textsize';
  var STORE_CONTRAST = 'wiesing.contrast';

  function readStore(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function writeStore(key, value) {
    try {
      if (value) window.localStorage.setItem(key, value);
      else window.localStorage.removeItem(key);
    } catch (e) { /* Speicher nicht verfügbar: Einstellung gilt nur für diese Seite. */ }
  }

  function applySize(value) {
    if (value === 'lg' || value === 'xl') docEl.setAttribute('data-textsize', value);
    else docEl.removeAttribute('data-textsize');
    $$('input[name="textsize"]').forEach(function (input) {
      input.checked = input.value === (value || 'base');
    });
  }

  function applyContrast(on_) {
    if (on_) docEl.setAttribute('data-contrast', 'high');
    else docEl.removeAttribute('data-contrast');
    var box = $('input[name="contrast"]');
    if (box) box.checked = !!on_;
  }

  var savedSize = readStore(STORE_SIZE);
  var savedContrast = readStore(STORE_CONTRAST) === 'high';
  applySize(savedSize);
  applyContrast(savedContrast);

  $$('input[name="textsize"]').forEach(function (input) {
    on(input, 'change', function () {
      if (!input.checked) return;
      var value = input.value === 'base' ? '' : input.value;
      applySize(input.value);
      writeStore(STORE_SIZE, value);
    });
  });

  on($('input[name="contrast"]'), 'change', function (e) {
    applyContrast(e.target.checked);
    writeStore(STORE_CONTRAST, e.target.checked ? 'high' : '');
  });

  /* ---------------------------------------------------------------------- */
  /* Filter: Formulare, Amtstafel, Veranstaltungen, Zuständigkeiten         */
  /* ---------------------------------------------------------------------- */

  function setupFilter(config) {
    var buttons = config.buttonSelector ? $$(config.buttonSelector) : [];
    var items = $$(config.itemSelector);
    if (!items.length) return;

    var state = { group: 'all', query: '' };
    var input = config.inputSelector ? $(config.inputSelector) : null;
    var count = config.countSelector ? $(config.countSelector) : null;
    var empty = config.emptySelector ? $(config.emptySelector) : null;
    var groupEls = config.groupSelector ? $$(config.groupSelector) : [];

    function apply() {
      var visible = 0;
      items.forEach(function (item) {
        var groupOk = state.group === 'all' || item.getAttribute('data-cat') === state.group || item.getAttribute('data-group') === state.group;
        var text = normalise(item.getAttribute('data-title') || item.textContent);
        var queryOk = !state.query || text.indexOf(normalise(state.query)) > -1;
        var show = groupOk && queryOk;
        item.classList.toggle('hide', !show);
        if (show) visible++;
      });
      if (groupEls.length) {
        groupEls.forEach(function (groupEl) {
          var any = $$(config.itemSelector, groupEl).some(function (el) { return !el.classList.contains('hide'); });
          groupEl.classList.toggle('hide', !any);
        });
      }
      if (count) count.textContent = visible + (config.countSuffix || '');
      if (empty) empty.classList.toggle('hide', visible > 0);
    }

    buttons.forEach(function (btn) {
      on(btn, 'click', function () {
        buttons.forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        state.group = btn.getAttribute(config.buttonAttr) || 'all';
        apply();
      });
      btn.setAttribute('aria-pressed', btn.classList.contains('is-active') ? 'true' : 'false');
    });

    on(input, 'input', debounce(function (e) {
      state.query = e.target.value;
      apply();
    }, 140));

    apply();
  }

  setupFilter({
    buttonSelector: '[data-form-filter]',
    buttonAttr: 'data-form-filter',
    itemSelector: '[data-form-item]',
    groupSelector: '[data-form-group]',
    inputSelector: '[data-form-search]',
    countSelector: '[data-form-count]',
    emptySelector: '[data-form-empty]',
    countSuffix: ' Einträge'
  });

  setupFilter({
    buttonSelector: '[data-tafel-filter]',
    buttonAttr: 'data-tafel-filter',
    itemSelector: '[data-tafel-item]',
    countSelector: '[data-tafel-count]',
    emptySelector: '[data-tafel-empty]',
    countSuffix: ' Einträge'
  });

  setupFilter({
    buttonSelector: '[data-event-filter]',
    buttonAttr: 'data-event-filter',
    itemSelector: '[data-event-item]',
    countSelector: '[data-event-count]',
    emptySelector: '[data-event-empty]',
    countSuffix: ' Termine'
  });

  setupFilter({
    buttonSelector: null,
    itemSelector: '[data-resp-item]',
    inputSelector: '[data-resp-search]',
    countSelector: '[data-resp-count]',
    emptySelector: '[data-resp-empty]',
    countSuffix: ' Themen'
  });

  /* ---------------------------------------------------------------------- */
  /* Kontaktformular: mailto                                                */
  /* ---------------------------------------------------------------------- */

  var contactForm = $('[data-contact-form]');
  if (contactForm) {
    var status = $('[data-form-status]', contactForm);

    on(contactForm, 'submit', function (e) {
      e.preventDefault();

      var required = $$('[required]', contactForm);
      var invalid = null;
      required.forEach(function (field) {
        var ok = field.type === 'checkbox' ? field.checked : field.value.trim() !== '';
        if (field.type === 'email' && ok) ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        field.setAttribute('aria-invalid', ok ? 'false' : 'true');
        if (!ok && !invalid) invalid = field;
      });

      if (invalid) {
        var label = contactForm.querySelector('label[for="' + invalid.id + '"]');
        if (status) {
          status.textContent = 'Bitte prüfen Sie die markierten Felder' +
            (label ? ': ' + label.textContent.replace('*', '').trim() : '') + '.';
        }
        invalid.focus();
        return;
      }

      required.forEach(function (field) { field.setAttribute('aria-invalid', 'false'); });

      var data = new FormData(contactForm);
      var subject = 'Anfrage über die Website: ' + (data.get('subject') || 'Allgemeine Anfrage');
      var lines = [
        'Name: ' + (data.get('name') || ''),
        'E-Mail: ' + (data.get('email') || ''),
        'Telefon: ' + (data.get('phone') || '–'),
        '',
        (data.get('message') || '')
      ];
      var mailto = 'mailto:gemeinde@wiesing.gv.at?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\r\n'));

      if (status) {
        status.textContent = 'Ihr E-Mail-Programm wird geöffnet. Bitte senden Sie die Nachricht dort ab. Alternativ: gemeinde@wiesing.gv.at oder +43 5244 62623.';
      }
      window.location.href = mailto;
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Dezente Einblendung                                                    */
  /* ---------------------------------------------------------------------- */

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var targets = $$('.section-head, .service-row, .news-row, .event-row, .chapter-link, .figure, .facts, .contact-block, .panel, .timeline-item, .quickbar-item, .doc-row');
    targets.forEach(function (el) { el.classList.add('reveal'); });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    targets.forEach(function (el) { observer.observe(el); });
  }
})();