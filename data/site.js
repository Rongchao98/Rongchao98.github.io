// Site-wide settings and list content. Edit this file to update the site; no build step needed.

window.SITE = {
  name: 'Rongchao Xu',
  // Lines under the name in the sidebar.
  affiliation: ['Ph.D. Candidate', 'Department of Computer Science', 'Florida State University'],

  // Avatar image, e.g. 'assets/img/avatar.jpg'. Empty shows an "RX" monogram.
  avatar: 'assets/img/avatar.jpg',

  // Author strings highlighted in publication lists.
  selfNames: ['Rongchao Xu'],

  // Shown in the footer as "Last updated".
  updated: '2026-11',

  // Sidebar links. `icon`: mail | scholar | linkedin | github | cv | link. Entries with an empty url are hidden.
  vcard: [
    { icon: 'mail',     text: 'rx21a@fsu.edu',  url: 'mailto:rx21a@fsu.edu' },
    { icon: 'scholar',  text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=mzttMQ8AAAAJ' },
    { icon: 'linkedin', text: 'LinkedIn',       url: 'https://www.linkedin.com/in/rongchao-xu-464843220/?isSelfProfile=true&locale=en-US' },   // TODO: add your LinkedIn URL
    { icon: 'github',   text: 'GitHub',         url: 'https://github.com/Rongchao98' },
  ],

  // Publication topics. Keys are used by `tags` in publications.js.
  topics: {
    gen: { label: 'Generative models', color: '#8250df' },
    st:  { label: 'Spatiotemporal',    color: '#1a7f37' },
    ts:  { label: 'Time series',       color: '#e16f24' },
    uq:  { label: 'Uncertainty',       color: '#bf3989' },
    llm: { label: 'LLMs',              color: '#0969da' },
    cv:  { label: 'Computer vision',   color: '#6e7781' },
  },

  // ── News ──
  // About shows items from the last `recentMonths` months (at least `recentMin`); the News tab shows all, grouped by year.
  // `date` is 'YYYY-MM'. In `html`, {paper-id} becomes a link to that paper (ids from publications.js).
  // Dates follow the DCS Lab news record (guangwang.me/#/news).
  recentMonths: 6,
  recentMin: 2,
  news: [
    { date: '2026-08', html: '{synehr}, on longitudinal EHR synthesis, was accepted to <b>CIKM 2026</b>.' },
    { date: '2026-07', html: 'My first-author paper {mbdiff}, a behavior-aware diffusion model for utility data imputation, was accepted to <b>SIAM SDM 2026</b>.' },
    { date: '2026-05', html: 'Received the <b>Dean’s Award for Doctoral Excellence</b> from Florida State University.' },
    { date: '2026-05', html: '{energymamba}, an uncertainty-aware graph-enhanced Mamba for energy consumption prediction, was accepted to <b>KDD 2026</b>.' },
    { date: '2026-04', html: 'My first-author paper {synhat}, a coarse-to-fine diffusion framework for synthesizing human activity traces, was accepted to <b>IMWUT</b> and will be presented at <b>UbiComp 2026</b>.' },
    { date: '2026-04', html: '{healthmamba}, on reliable healthcare facility visit prediction, was accepted to <b>IJCAI 2026</b>.' },
    { date: '2025-11', html: 'Two papers accepted to <b>AAAI 2026</b>: my first-author paper {geogen} on fine-grained LBSN trajectory generation, and {trustenergy} on reliable user-level energy usage prediction (oral presentation).' },
    { date: '2025-08', html: '{uqgnn}, on uncertainty quantification for multivariate spatiotemporal prediction, was accepted to <b>ACM SIGSPATIAL 2025</b>.' },
    { date: '2025-04', html: 'Received the <b>COGS Grant</b> from Florida State University.' },
    { date: '2025-04', html: 'Our <a href="https://doi.org/10.24963/ijcai.2025/1080" target="_blank" rel="noopener">uncertainty-aware predict-then-optimize framework</a> for equitable post-disaster power restoration was accepted to <b>IJCAI 2025</b>.' },
    { date: '2024-12', html: 'My first-author paper {autostdiff}, an autoregressive diffusion model for asynchronous trajectory generation, was accepted to <b>SIAM SDM 2025</b>.' },
  ],

  // ── Experience tab ──
  education: [
    { title: 'Ph.D., Computer and Information Science', org: 'Florida State University', place: 'Tallahassee, FL',
      date: 'Jan 2023 – Dec 2027 (expected)', note: 'Advisor: Prof. Guang Wang' },
    { title: 'M.S., Computer and Information Science', org: 'Florida State University', place: 'Tallahassee, FL',
      date: 'Aug 2021 – Dec 2022' },
    { title: 'B.Eng., Computer Science and Technology', org: 'Beijing University of Technology', place: 'Beijing, China',
      date: 'Sep 2016 – Jul 2020' },
  ],

  industry: [
    { title: 'Computer Vision Intern', org: 'Sony R&D Center China, Beijing Laboratory', place: 'Beijing, China',
      date: 'Jul 2019 – Oct 2019' },
  ],

  // One entry per award per year, in any order; shown newest first, grouped by year.
  awards: [
    { year: 2026, name: 'Dean’s Award for Doctoral Excellence', org: 'Florida State University' },
    { year: 2026, name: 'NSF Student Travel Award' },
    { year: 2025, name: 'NSF Student Travel Award' },
    { year: 2025, name: 'COGS Grant', org: 'Florida State University' },
    { year: 2025, name: 'Student Conference Travel Award', org: 'FSU Department of Computer Science' },
  ],

  // ── Service tab ──
  // One entry per venue per year, in any order; shown newest first, grouped by year.
  // `role`: a key of `roles` below.
  service: [
    { year: 2027, venue: 'AAAI',           role: 'pc', full: 'AAAI Conference on Artificial Intelligence' },
    { year: 2027, venue: 'KDD',            role: 'pc', full: 'ACM SIGKDD Conference on Knowledge Discovery and Data Mining' },
    { year: 2027, venue: 'WSDM',           role: 'pc', full: 'ACM International Conference on Web Search and Data Mining' },
    { year: 2027, venue: 'SpatialConnect', role: 'pc', full: 'ACM SIGSPATIAL Workshop on Spatial Intelligence for Smart and Connected Communities' },
    { year: 2026, venue: 'AAAI',           role: 'pc', full: 'AAAI Conference on Artificial Intelligence' },
    { year: 2026, venue: 'CIKM',           role: 'pc', full: 'ACM International Conference on Information and Knowledge Management' },
    { year: 2026, venue: 'SIGSPATIAL',     role: 'pc', full: 'ACM SIGSPATIAL International Conference on Advances in GIS' },
    { year: 2026, venue: 'IEEE BigData',   role: 'pc', full: 'IEEE International Conference on Big Data' },
    { year: 2026, venue: 'IEEE MOST',      role: 'pc', full: 'IEEE International Conference on Mobility, Operations, Services and Technologies' },
    { year: 2026, venue: 'SpatialConnect', role: 'pc', full: 'ACM SIGSPATIAL Workshop on Spatial Intelligence for Smart and Connected Communities' },
    { year: 2026, venue: 'IEEE TMC',       role: 'reviewer', full: 'IEEE Transactions on Mobile Computing' },
    { year: 2026, venue: 'IEEE TETCI',     role: 'reviewer', full: 'IEEE Transactions on Emerging Topics in Computational Intelligence' },
    { year: 2026, venue: 'IEEE TSUSC',     role: 'reviewer', full: 'IEEE Transactions on Sustainable Computing' },
    { year: 2026, venue: 'Pattern Recognition', role: 'reviewer', full: 'Pattern Recognition' },
    { year: 2026, venue: 'GIScience & Remote Sensing', role: 'reviewer', full: 'GIScience & Remote Sensing' },
    { year: 2025, venue: 'KDD',            role: 'pc', full: 'ACM SIGKDD Conference on Knowledge Discovery and Data Mining' },
    { year: 2025, venue: 'WWW',            role: 'pc', full: 'The Web Conference' },
  ],
  roles: { pc: 'Program Committee', reviewer: 'Journal Reviewer' },
};
