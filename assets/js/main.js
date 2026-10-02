(function () {
  'use strict';

  const SITE = window.SITE || {};
  const PUBS = window.PUBLICATIONS || [];
  const TOPICS = SITE.topics || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fmtDate = (d) => {
    const [y, m] = String(d).split('-');
    return m ? `${MONTHS[+m - 1]} ${y}` : y;
  };
  const newTab = (url) => (/^(https?:)?\/\//.test(url) || /\.pdf$/i.test(url) ? ' target="_blank" rel="noopener"' : '');

  /* ───────── Icons (16×16) ───────── */
  const STROKE = {
    mail:     '<rect x="1.75" y="3.25" width="12.5" height="9.5" rx="1.5"/><path d="m2.25 4.25 5.75 4.5 5.75-4.5"/>',
    scholar:  '<path d="M8 2.5 1.25 6 8 9.5 14.75 6 8 2.5z"/><path d="M4 7.5v3.25c0 .9 1.8 2 4 2s4-1.1 4-2V7.5M14.75 6v4"/>',
    link:     '<path d="M6.75 9.25l2.5-2.5M7.25 4.5l.9-.9a2.75 2.75 0 0 1 3.9 3.9l-.9.9M8.75 11.5l-.9.9a2.75 2.75 0 0 1-3.9-3.9l.9-.9"/>',
    code:     '<path d="m5.25 4.75-3.5 3.25 3.5 3.25M10.75 4.75l3.5 3.25-3.5 3.25"/>',
    briefcase:'<rect x="1.75" y="4.75" width="12.5" height="9" rx="1.5"/><path d="M5.75 4.75v-1.5a1 1 0 0 1 1-1h2.5a1 1 0 0 1 1 1v1.5M1.75 8.75h12.5"/>',
    book:     '<path d="M2.25 3.25c1.75-.75 3.75-.75 5.75.5v10c-2-1.25-4-1.25-5.75-.5zM13.75 3.25c-1.75-.75-3.75-.75-5.75.5v10c2-1.25 4-1.25 5.75-.5z"/>',
  };
  const FILL = {
    github: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z',
    linkedin: 'M1.5 1h13c.28 0 .5.22.5.5v13a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-13c0-.28.22-.5.5-.5zM3.2 6.2v6.6h2.1V6.2H3.2zm1.05-3.3a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM7 6.2v6.6h2.05V9.5c0-.87.17-1.72 1.25-1.72 1.07 0 1.08 1 1.08 1.77v3.25h2.06V9.17c0-1.79-.39-3.12-2.47-3.12-1 0-1.67.55-1.94 1.07h-.03V6.2H7z',
  };
  const icon = (name) => (FILL[name]
    ? `<svg class="octicon is-fill" viewBox="0 0 16 16" aria-hidden="true"><path d="${FILL[name]}"/></svg>`
    : `<svg class="octicon" viewBox="0 0 16 16" aria-hidden="true">${STROKE[name] || STROKE.link}</svg>`);

  /* ───────── Publication helpers ───────── */
  const SELF = new Set(SITE.selfNames || []);
  const bare = (a) => a.replace(/[*†‡]+$/, '');
  const isFirst = (p) => p.authors && SELF.has(bare(p.authors[0]));

  const authorsHTML = (p) => (p.authors || []).map((a) => {
    const name = bare(a);
    const mark = esc(a.slice(name.length));
    return SELF.has(name) ? `<span class="me">${esc(name)}</span>${mark}` : esc(a);
  }).join(', ');

  const ABSTRACTS = window.ABSTRACTS || {};

  // Title link: official DOI page, else arXiv.
  const paperUrl = (p) => p.paper || (p.doi ? `https://doi.org/${p.doi}` : (p.arxiv ? `https://arxiv.org/abs/${p.arxiv}` : ''));

  /* BibTeX generated from the publication fields (or `bibtex` to override). */
  const bibKey = (p) => {
    const last = bare(p.authors[0]).split(' ').pop().toLowerCase();
    const word = p.title.split(/[^A-Za-z0-9]+/).find(Boolean).toLowerCase();
    return `${last}${p.year}${word}`;
  };
  const bibAuthor = (a) => {
    const parts = bare(a).trim().split(/\s+/);
    const last = parts.pop();
    return parts.length ? `${last}, ${parts.join(' ')}` : last;
  };
  const bibtexOf = (p) => {
    if (p.bibtex) return p.bibtex.trim();
    const preprint = p.type === 'preprint';
    const type = preprint || p.type === 'journal' ? 'article' : 'inproceedings';
    const fields = [
      ['title', `{${p.title}}`],
      ['author', p.authors.map(bibAuthor).join(' and ')],
      preprint
        ? ['journal', p.arxiv ? `arXiv preprint arXiv:${p.arxiv}` : (p.venue || '')]
        : [type === 'article' ? 'journal' : 'booktitle', p.bibVenue || p.venue],
      ['volume', p.volume], ['number', p.number], ['pages', p.pages],
      ['year', String(p.year)],
      ['doi', p.doi],
    ].filter(([, v]) => v);
    return `@${type}{${bibKey(p)},\n${fields.map(([k, v]) => `  ${k.padEnd(9)} = {${v}}`).join(',\n')}\n}`;
  };

  // "KDD '26" → "KDD 2026"
  const badgeOf = (p) => {
    if (p.type === 'preprint') return 'Preprint';
    const s = (p.short || '').replace(/ '(\d\d)$/, ' 20$1');
    return /\d/.test(s) ? s : `${s} ${p.year}`.trim();
  };
  const labelHTML = (p) => `<span class="label${p.type === 'preprint' ? '' : ' is-pub'}">${esc(badgeOf(p))}</span>`;

  const topicHTML = (p) => (p.tags || [])
    .filter((k) => TOPICS[k])
    .map((k) => `<span class="dot" style="--c:${esc(TOPICS[k].color)}">${esc(TOPICS[k].label)}</span>`)
    .join('');

  /* ───────── Profile ───────── */
  function addImage(box, src) {
    const img = new Image();
    img.alt = '';
    img.decoding = 'async';
    img.onload = () => box.classList.add('has-img');
    img.onerror = () => img.remove(); // keep the monogram if the file is missing
    img.src = src;
    box.appendChild(img);
  }

  function renderProfile() {
    $('#affil').innerHTML = (SITE.affiliation || []).map((l) => `<li>${esc(l)}</li>`).join('');
    if (SITE.avatar) {
      addImage($('#avatar'), SITE.avatar);
      addImage($('#mini-avatar'), SITE.avatar);
      $('#avatar img').alt = SITE.name || '';
    }

    $('#vcard').innerHTML = (SITE.vcard || []).filter((v) => v.url).map((v) => `
      <li data-vcard="${esc(v.icon)}">${icon(v.icon)}<a href="${esc(v.url)}"${newTab(v.url)}>${esc(v.text)}</a></li>`).join('');
  }

  // Links with data-flash="mail" briefly highlight that sidebar entry instead of navigating
  // (the href stays as a fallback). The highlight plays once and fades out.
  function initFlashLinks() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-flash]');
      if (!link) return;
      const target = $(`#vcard [data-vcard="${link.dataset.flash}"]`);
      if (!target) return;
      e.preventDefault();
      const r = target.getBoundingClientRect();
      if (r.top < 60 || r.bottom > window.innerHeight) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.remove('is-flash');
      void target.offsetWidth; // restart the animation on repeated clicks
      target.classList.add('is-flash');
    });
    document.addEventListener('animationend', (e) => {
      if (e.target.classList && e.target.classList.contains('is-flash')) e.target.classList.remove('is-flash');
    });
  }

  /* ───────── Tabs ───────── */
  function initTabs() {
    const tabs = $$('.tab[data-tab]');
    const panels = $$('.panel[data-panel]');
    const names = tabs.map((t) => t.dataset.tab);
    const bar = $('.tabbar');

    const show = (scroll) => {
      const want = location.hash.slice(1);
      const name = names.includes(want) ? want : names[0];
      tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === name)));
      panels.forEach((p) => {
        const active = p.dataset.panel === name;
        const wasHidden = p.hidden;
        p.hidden = !active;
        // Fade the newly shown page in when the user switches tabs (not on first load).
        if (active && wasHidden && scroll) {
          p.classList.remove('is-entering');
          void p.offsetWidth;
          p.classList.add('is-entering');
          setTimeout(() => p.classList.remove('is-entering'), 400);
        }
      });
      if (scroll) window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', () => show(true));
    show(false);

    // Show the mini avatar + name in the tab bar once the sidebar name scrolls away.
    const name = $('.profile-name');
    if ('IntersectionObserver' in window && name) {
      new IntersectionObserver(([e]) => bar.classList.toggle('stuck', !e.isIntersecting && e.boundingClientRect.top < 0))
        .observe(name);
    }
  }

  /* ───────── News ───────── */
  const PUB_BY_ID = Object.fromEntries(PUBS.filter((p) => p.id).map((p) => [p.id, p]));
  const shortName = (p) => (p.title.indexOf(':') > 0 ? p.title.slice(0, p.title.indexOf(':')) : p.title);

  // "{geogen}" → link to that paper, labelled with its short name (used by News and the intro).
  const newsHTML = (html) => String(html).replace(/\{([\w-]+)\}/g, (m, id) => {
    const p = PUB_BY_ID[id];
    if (!p) return m;
    const name = esc(shortName(p));
    const url = paperUrl(p);
    return url ? `<a class="news-paper" href="${esc(url)}"${newTab(url)}>${name}</a>` : `<b>${name}</b>`;
  });

  const newsItems = () => (SITE.news || []).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
  // The newest item overall gets the highlighted dot.
  const newsLi = (n, monthOnly, latest) => {
    const label = monthOnly ? fmtDate(n.date).split(' ')[0] : fmtDate(n.date);
    return `<li${n === latest ? ' class="is-latest"' : ''}><time datetime="${esc(n.date)}">${label}</time><span>${newsHTML(n.html)}</span></li>`;
  };

  // 'YYYY-MM' of the month `months` before today.
  const monthsAgo = (months) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - months);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  };

  function renderNews() {
    $$('[data-paper-links]').forEach((el) => { el.innerHTML = newsHTML(el.innerHTML); });

    const items = newsItems();
    const latest = items[0];

    // About: items from the last few months (falls back to the newest `recentMin` if that is too few)
    const recent = $('#recent-news');
    const cutoff = monthsAgo(SITE.recentMonths || 6);
    let shown = items.filter((n) => String(n.date).slice(0, 7) >= cutoff);
    if (shown.length < (SITE.recentMin || 0)) shown = items.slice(0, SITE.recentMin);
    if (!shown.length) recent.closest('section').remove();
    else recent.innerHTML = shown.map((n) => newsLi(n, false, latest)).join('');

    // News tab: all, grouped by year
    const years = [...new Set(items.map((n) => String(n.date).slice(0, 4)))];
    $('#news-all').innerHTML = years.map((y) => `
      <section class="news-year">
        <h2>${esc(y)}</h2>
        <ol class="timeline is-compact">${items.filter((n) => String(n.date).startsWith(y)).map((n) => newsLi(n, true, latest)).join('')}</ol>
      </section>`).join('') || '<p class="muted">No news yet.</p>';
  }

  /* ───────── Paper actions (shared by Selected publications and the Publications tab) ─────────
     Abstract / BibTeX toggle panels and a Code link. `scope` keeps element ids unique per list. */
  function pubActionsHTML(p, scope) {
    const abs = ABSTRACTS[p.id];
    const pid = `${scope}-${esc(p.id)}`;
    return `
      <div class="pub-foot">
        ${abs ? `<button type="button" class="btn-sm" data-panel-btn="abs" aria-expanded="false" aria-controls="abs-${pid}">Abstract</button>` : ''}
        <button type="button" class="btn-sm" data-panel-btn="bib" aria-expanded="false" aria-controls="bib-${pid}">BibTeX</button>
        ${p.code ? `<a class="btn-sm" href="${esc(p.code)}"${newTab(p.code)}>${icon('code')}Code</a>` : ''}
        <span class="pub-topics">${topicHTML(p)}</span>
      </div>
      ${abs ? `<div class="pub-panel" id="abs-${pid}" data-panel-kind="abs" hidden><p>${esc(abs)}</p></div>` : ''}
      <div class="pub-panel pub-bib" id="bib-${pid}" data-panel-kind="bib" hidden>
        <button type="button" class="copy-btn" data-copy>Copy</button>
        <pre>${esc(bibtexOf(p))}</pre>
      </div>`;
  }

  // One handler for every paper on the page: one panel open per paper, plus copy-to-clipboard.
  function initPubActions() {
    const selectText = (pre) => {
      const range = document.createRange();
      range.selectNodeContents(pre);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    };
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-panel-btn]');
      if (btn) {
        const paper = btn.closest('[data-paper]');
        const kind = btn.dataset.panelBtn;
        const opening = btn.getAttribute('aria-expanded') !== 'true';
        $$('[data-panel-btn]', paper).forEach((b) => b.setAttribute('aria-expanded', String(opening && b === btn)));
        $$('.pub-panel', paper).forEach((panel) => { panel.hidden = !(opening && panel.dataset.panelKind === kind); });
        return;
      }
      const copy = e.target.closest('[data-copy]');
      if (copy) {
        const pre = $('pre', copy.parentElement);
        const done = () => { copy.textContent = 'Copied'; setTimeout(() => { copy.textContent = 'Copy'; }, 1500); };
        if (navigator.clipboard) navigator.clipboard.writeText(pre.textContent).then(done, () => selectText(pre));
        else selectText(pre);
      }
    });
  }

  function renderSelected() {
    const ol = $('#pinned');
    const picks = PUBS.filter((p) => p.selected);
    if (!picks.length) { ol.closest('section').remove(); return; }

    // Same title link and actions as the Publications tab.
    ol.innerHTML = picks.map((p) => {
      const primary = paperUrl(p);
      const title = esc(p.title);
      return `
        <li class="card" data-paper>
          <div class="card-head">
            <h3 class="card-title">${primary ? `<a href="${esc(primary)}"${newTab(primary)}>${title}</a>` : title}</h3>
            ${labelHTML(p)}
          </div>
          <p class="card-desc">${esc(p.summary || '')}</p>
          ${pubActionsHTML(p, 'sel')}
        </li>`;
    }).join('');
  }

  /* ───────── Publications tab ───────── */
  function renderPublist() {
    const list = $('#publist');
    const search = $('#pub-search');
    const typeSel = $('#pub-type');
    const topicSel = $('#pub-topic');
    const roleSel = $('#pub-role');

    topicSel.innerHTML = '<option value="all">Topic: All</option>' +
      Object.entries(TOPICS).map(([k, t]) => `<option value="${esc(k)}">${esc(t.label)}</option>`).join('');

    // Newest year first; keep file order within a year.
    const sorted = PUBS.map((p, i) => [p, i]).sort((a, b) => (b[0].year - a[0].year) || (a[1] - b[1])).map(([p]) => p);
    const haystack = (p) => [p.title, p.venue, p.short, p.year, ABSTRACTS[p.id], ...(p.authors || [])].join(' ').toLowerCase();

    const item = (p) => {
      const primary = paperUrl(p);
      const title = esc(p.title);
      return `
        <li class="pub" data-paper data-id="${esc(p.id)}">
          <div class="pub-head">
            <h3 class="pub-title">${primary ? `<a href="${esc(primary)}"${newTab(primary)}>${title}</a>` : title}</h3>
            ${labelHTML(p)}
          </div>
          <p class="pub-authors">${authorsHTML(p)}</p>
          <p class="pub-venue">${esc(p.venue || '')}${p.type === 'preprint' ? '' : `, ${esc(p.year)}`}${p.note ? ` · <span class="me">${esc(p.note)}</span>` : ''}</p>
          ${pubActionsHTML(p, 'all')}
        </li>`;
    };

    function update() {
      const q = search.value.trim().toLowerCase();
      const type = typeSel.value;
      const topic = topicSel.value;
      const role = roleSel.value;
      const shown = sorted.filter((p) =>
        (!q || haystack(p).includes(q)) &&
        (type === 'all' || (type === 'preprint') === (p.type === 'preprint')) &&
        (topic === 'all' || (p.tags || []).includes(topic)) &&
        (role === 'all' || (role === 'first') === isFirst(p)));

      list.innerHTML = shown.length ? shown.map(item).join('') : '<li class="empty">No publications match.</li>';
      const filtered = q || type !== 'all' || topic !== 'all' || role !== 'all';
      $('#pub-count').textContent = filtered ? `${shown.length} result${shown.length === 1 ? '' : 's'} of ${PUBS.length}` : '';
    }

    search.addEventListener('input', update);
    [typeSel, topicSel, roleSel].forEach((s) => s.addEventListener('change', update));
    update();
  }

  /* ───────── Experience + Service ───────── */
  const row = (ic, title, sub, note, meta) => `
    <li>
      <span class="row-icon">${icon(ic)}</span>
      <div class="row-body">
        <div class="row-title">${title}</div>
        ${sub ? `<div class="row-sub">${sub}</div>` : ''}
        ${note ? `<div class="row-note">${note}</div>` : ''}
      </div>
      ${meta ? `<div class="row-meta">${meta}</div>` : ''}
    </li>`;

  function renderExperience() {
    const place = (e) => [e.org, e.place].filter(Boolean).map(esc).join(' · ');
    $('#education').innerHTML = (SITE.education || [])
      .map((e) => row('book', esc(e.title), place(e), esc(e.note || ''), esc(e.date || ''))).join('');
    $('#industry').innerHTML = (SITE.industry || [])
      .map((e) => row('briefcase', esc(e.title), place(e), '', esc(e.date || ''))).join('');
    ['education', 'industry'].forEach((id) => {
      if (!(SITE[id] || []).length) $(`#${id}`).closest('.box').remove();
    });

    yearList($('#awards-box'), {
      title: 'Awards',
      items: SITE.awards || [],
      body: (a) => `<span class="row-title">${esc(a.name)}</span>${a.org ? `<span class="row-sub">${esc(a.org)}</span>` : ''}`,
    });
  }

  function renderService() {
    const roles = SITE.roles || {};
    yearList($('#service-box'), {
      title: 'Service',
      items: SITE.service || [],
      body: (s) => `<span class="row-title">${esc(s.venue)}</span>${s.full ? `<span class="row-sub" title="${esc(s.full)}">${esc(s.full)}</span>` : ''}`,
      meta: (s) => esc(roles[s.role] || s.role || ''),
    });
  }

  /* A box listing items newest-first, grouped by year (the year shows once per group). */
  function yearList(box, { title, items, body, meta }) {
    if (!box) return;
    if (!items.length) { box.remove(); return; }
    const sorted = items.map((it, i) => [it, i])
      .sort((a, b) => (b[0].year - a[0].year) || (a[1] - b[1]))
      .map(([it]) => it);

    let prevYear = null;
    box.innerHTML = `
      <div class="box-header"><h2>${esc(title)}</h2></div>
      <ul class="yrows">${sorted.map((it) => {
        const first = it.year !== prevYear;
        prevYear = it.year;
        return `
          <li class="yrow${first ? ' is-first' : ''}">
            <span class="yrow-year">${first ? esc(it.year) : ''}</span>
            <div class="yrow-body">${body(it)}</div>
            ${meta ? `<span class="yrow-meta">${meta(it)}</span>` : ''}
          </li>`;
      }).join('')}</ul>`;
  }

  function renderFooter() {
    const year = new Date().getFullYear();
    $('#footer').textContent = `© ${year} ${SITE.name || ''}${SITE.updated ? ` · Last updated ${fmtDate(SITE.updated)}` : ''}`;
  }

  renderProfile();
  initFlashLinks();
  initTabs();
  renderNews();
  renderSelected();
  renderPublist();
  initPubActions();
  renderExperience();
  renderService();
  renderFooter();
})();
