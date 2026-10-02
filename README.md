# rongchao xu · personal website

A GitHub-profile-style academic homepage. It is plain HTML/CSS/JS with no build step: open `index.html` in a browser to preview.

Tabs: **About** (default: intro, recent news, selected publications) · **News** · **Publications** · **Experience** (education, industry, awards) · **Service**.

```
index.html              page skeleton + README intro text
data/site.js            profile, sidebar, news, education, industry, awards, service
data/publications.js    publication list (+ which papers are "selected")
data/abstracts.js       paper abstracts, keyed by publication id
assets/css/style.css    all styles (color tokens at the top)
assets/js/main.js       rendering, tabs, publication search/filters
assets/cv/              CV PDF (kept local: ignored by .gitignore, not published)
assets/img/             avatar, logo (+ icon-32/180/192.png resized from logo.png)
```

## Common edits

- **Photo**: put the image in `assets/img/` and set `avatar: 'assets/img/avatar.jpg'` in `data/site.js`. A square image works best; it is cropped to a circle.
- **Sidebar**: the lines under the name are `affiliation` in `data/site.js`; the links below are `vcard` (entries with an empty `url` are hidden).
- **Intro text**: edit the README box in `index.html`.
- **Add a paper**: add an entry to `data/publications.js` with an `id`, `tags`, and optionally `doi`, `arxiv` and `code`. The title links to the DOI page, or to arXiv if there is no DOI. Accepted papers use `type: 'conference'` or `'journal'` even if only an arXiv version exists yet.
- **Abstract / BibTeX buttons**: abstracts go in `data/abstracts.js` under the paper's `id`. BibTeX is generated from the paper's fields; add `bibVenue`, `volume`, `number` and `pages` for a complete entry, or `bibtex` to override it entirely.
- **Selected publications**: set `selected: true` and add a `summary`. An even number fills the 2-column grid.
- **News**: add `{ date: 'YYYY-MM', html: '…' }` to `news` in `data/site.js`. Write `{paper-id}` (e.g. `{geogen}`) to link a paper by its short name. About shows items from the last `recentMonths` months (at least `recentMin`); the News tab shows all, grouped by year. The newest item gets the orange dot.
- **Awards / service**: add one line per item per year to `awards` or `service` in `data/site.js`, in any order. They are sorted newest first and grouped by year.
- **Education / industry**: edit the matching arrays in `data/site.js`.
- **Add a tab** (e.g. Teaching): add `<a class="tab" href="#teaching" data-tab="teaching">Teaching</a>` to the tab bar and `<div class="panel" data-panel="teaching">…</div>` inside `<main>`.

## Deploy (GitHub Pages)

1. Create a repo named `<username>.github.io` (e.g. `Rongchao98.github.io`).
2. Push these files to the default branch.
3. The site is live at `https://<username>.github.io`.
