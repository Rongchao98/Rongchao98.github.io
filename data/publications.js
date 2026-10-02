// Publications, listed newest year first; order within a year follows this file.
// Abstracts live in abstracts.js (keyed by id); BibTeX is generated from these fields.
//
// Fields:
//   id        short unique id, e.g. 'synhat' (also used for news links and abstracts)
//   title     (required)
//   authors   (required) array of full names; add '*' after a name for equal contribution
//   venue     venue name shown on the page
//   short     badge, e.g. "AAAI '26"
//   year      number
//   type      'conference' | 'journal' | 'preprint'
//             Accepted papers count as peer-reviewed even if only an arXiv version exists yet.
//   tags      topic keys from SITE.topics in site.js (all are shown)
//   doi       DOI; the title links to it when present
//   arxiv     arXiv id; the title links here when there is no DOI
//   code      link to the code
//   note      optional highlight, e.g. 'Oral' or 'Best Paper'
//   selected  true to show under "Selected publications" on the About tab
//   summary   one or two sentences shown on the selected-publication card
// BibTeX extras (optional): bibVenue (official booktitle/journal), volume, number, pages, bibtex (full override)

window.PUBLICATIONS = [
  // ── First-author ─────────────────────────────────────
  {
    id: 'synhat',
    title: 'SynHAT: A Two-Stage Coarse-to-Fine Diffusion Framework for Synthesizing Human Activity Traces',
    authors: ['Rongchao Xu', 'Lin Jiang', 'Dahai Yu', 'Ximiao Li', 'Guang Wang'],
    venue: 'Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies (IMWUT / UbiComp)',
    bibVenue: 'Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies',
    short: "IMWUT '26", year: 2026, type: 'journal',
    tags: ['gen', 'st'],
    doi: '10.1145/3810213', arxiv: '2604.14705',
    code: 'https://github.com/Rongchao98/SynHAT',
    selected: true,
    summary: 'A two-stage diffusion framework that first models coarse latent spatio-temporal traces, then refines them into fine-grained activity traces. It beats prior methods by 52% on spatial and 33% on temporal metrics across four cities.',
  },
  {
    id: 'geogen',
    title: 'GeoGen: A Two-Stage Coarse-to-Fine Framework for Fine-Grained Synthetic Location-Based Social Network Trajectory Generation',
    authors: ['Rongchao Xu', 'Kunlin Cai', 'Lin Jiang', 'Dahai Yu', 'Zhiqing Hong', 'Yuan Tian', 'Guang Wang'],
    venue: 'AAAI Conference on Artificial Intelligence (AAAI)',
    bibVenue: 'Proceedings of the AAAI Conference on Artificial Intelligence', volume: '40', number: '2', pages: '1373--1381',
    short: "AAAI '26", year: 2026, type: 'conference',
    tags: ['gen', 'st'],
    doi: '10.1609/aaai.v40i2.37111', arxiv: '2510.07735',
    code: 'https://github.com/Rongchao98/GeoGen',
    selected: true,
    summary: 'A sparsity-aware spatio-temporal diffusion model learns behavior patterns from reconstructed latent movement sequences. A Transformer then decodes them into fine-grained check-in trajectories.',
  },
  {
    id: 'mbdiff',
    title: 'MBDiff: Multi-View Behavior-Aware Diffusion Model for Probabilistic Utility Data Imputation',
    authors: ['Rongchao Xu', 'Lin Jiang', 'Dahai Yu', 'Ximiao Li', 'Guang Wang'],
    venue: 'SIAM International Conference on Data Mining (SDM)',
    bibVenue: 'Proceedings of the 2026 SIAM International Conference on Data Mining (SDM)',
    short: "SDM '26", year: 2026, type: 'conference',
    tags: ['gen', 'ts'],
    arxiv: '2607.29177',
    code: 'https://github.com/Rongchao98/Utility-Imputation',
    selected: true,
    summary: 'A conditional diffusion model guided by global, local, and instance-level user behavior patterns for imputing incomplete smart-meter data. Working with a major Florida utility (120K+ users), it cut block-missing MAE by up to 29.1% and helped impute 20M+ missing values.',
  },
  {
    id: 'autostdiff',
    title: 'AutoSTDiff: Autoregressive Spatio-Temporal Denoising Diffusion Model for Asynchronous Trajectory Generation',
    authors: ['Rongchao Xu', 'Zhiqing Hong', 'Guang Wang'],
    venue: 'SIAM International Conference on Data Mining (SDM)',
    bibVenue: 'Proceedings of the 2025 SIAM International Conference on Data Mining (SDM)', pages: '538--547',
    short: "SDM '25", year: 2025, type: 'conference',
    tags: ['gen', 'st'],
    doi: '10.1137/1.9781611978520.58',
    code: 'https://github.com/Rongchao98/AutoSTDiff',
    selected: true,
    summary: 'A diffusion model for asynchronous trajectories, such as POI check-ins with irregular intervals and varying lengths, which fixed-interval generators fail to capture.',
  },

  // ── Co-authored ──────────────────────────────────────
  {
    id: 'energymamba',
    title: 'EnergyMamba: An Uncertainty-Aware Graph-Enhanced Selective State Space Model for Energy Consumption Prediction',
    authors: ['Dahai Yu', 'Rongchao Xu', 'Lin Jiang', 'Guang Wang'],
    venue: 'ACM SIGKDD Conference on Knowledge Discovery and Data Mining (KDD)',
    bibVenue: 'Proceedings of the 32nd ACM SIGKDD Conference on Knowledge Discovery and Data Mining',
    short: "KDD '26", year: 2026, type: 'conference',
    tags: ['uq', 'st', 'ts'],
    doi: '10.1145/3770855.3818841', arxiv: '2606.00506',
    code: 'https://github.com/UFOdestiny/EnergyMamba',
  },
  {
    id: 'trustenergy',
    title: 'TrustEnergy: A Unified Framework for Accurate and Reliable User-Level Energy Usage Prediction',
    authors: ['Dahai Yu', 'Rongchao Xu', 'Dingyi Zhuang', 'Yuheng Bu', 'Shenhao Wang', 'Guang Wang'],
    venue: 'AAAI Conference on Artificial Intelligence (AAAI)',
    bibVenue: 'Proceedings of the AAAI Conference on Artificial Intelligence', volume: '40', number: '46', pages: '39558--39566',
    short: "AAAI '26", year: 2026, type: 'conference', note: 'Oral',
    tags: ['uq', 'st', 'ts'],
    doi: '10.1609/aaai.v40i46.41307', arxiv: '2601.13422',
    code: 'https://github.com/UFOdestiny/TrustEnergy',
  },
  {
    id: 'healthmamba',
    title: 'HealthMamba: An Uncertainty-Aware Spatiotemporal Graph State Space Model for Effective and Reliable Healthcare Facility Visit Prediction',
    authors: ['Dahai Yu', 'Lin Jiang', 'Rongchao Xu', 'Guang Wang'],
    venue: 'International Joint Conference on Artificial Intelligence (IJCAI)',
    bibVenue: 'Proceedings of the Thirty-Fifth International Joint Conference on Artificial Intelligence (IJCAI-26)', pages: '7001--7009',
    short: "IJCAI '26", year: 2026, type: 'conference',
    tags: ['uq', 'st'],
    doi: '10.24963/ijcai.2026/779', arxiv: '2602.05286',
    code: 'https://github.com/UFOdestiny/HealthMamba',
  },
  {
    id: 'synehr',
    title: 'SynEHR: Joint Modeling Inter-Visit Temporal Evolution and Intra-Visit Clinical Structure for Longitudinal EHR Synthesis',
    authors: ['Ximiao Li', 'Lin Jiang', 'Rongchao Xu', 'Dahai Yu', 'Zhe He', 'Guang Wang'],
    venue: 'ACM International Conference on Information and Knowledge Management (CIKM)',
    bibVenue: 'Proceedings of the ACM International Conference on Information and Knowledge Management (CIKM)',
    short: "CIKM '26", year: 2026, type: 'conference',
    tags: ['gen', 'ts'],
    doi: '10.1145/3799682.3840734', arxiv: '2608.21673',
    code: 'https://github.com/MiaL7/SynEHR',
  },
  {
    id: 'uqgnn',
    title: 'UQGNN: Uncertainty Quantification of Graph Neural Networks for Multivariate Spatiotemporal Prediction',
    authors: ['Dahai Yu', 'Dingyi Zhuang', 'Lin Jiang', 'Rongchao Xu', 'Xinyue Ye', 'Yuheng Bu', 'Shenhao Wang', 'Guang Wang'],
    venue: 'ACM SIGSPATIAL International Conference on Advances in Geographic Information Systems',
    bibVenue: 'Proceedings of the 33rd ACM International Conference on Advances in Geographic Information Systems', pages: '52--65',
    short: "SIGSPATIAL '25", year: 2025, type: 'conference',
    tags: ['uq', 'st'],
    doi: '10.1145/3748636.3762709', arxiv: '2508.08551',
    code: 'https://github.com/UFOdestiny/UQGNN',
  },
  {
    id: 'power-restoration',
    title: 'Uncertainty-Aware Predict-Then-Optimize Framework for Equitable Post-Disaster Power Restoration',
    authors: ['Lin Jiang', 'Dahai Yu', 'Rongchao Xu', 'Tian Tang', 'Guang Wang'],
    venue: 'International Joint Conference on Artificial Intelligence (IJCAI)',
    bibVenue: 'Proceedings of the Thirty-Fourth International Joint Conference on Artificial Intelligence (IJCAI-25)', pages: '9719--9727',
    short: "IJCAI '25", year: 2025, type: 'conference',
    tags: ['uq', 'st'],
    doi: '10.24963/ijcai.2025/1080', arxiv: '2508.04780',
  },
  {
    id: 'stag',
    title: 'Spatial Temporal Attentional Glimpse for Human Activity Classification in Video',
    authors: ['Jiangtao Kong', 'Rongchao Xu', 'Junliang Xing', 'Kai Li', 'Wei Ma'],
    venue: 'IEEE International Conference on Image Processing (ICIP)',
    bibVenue: '2019 IEEE International Conference on Image Processing (ICIP)', pages: '4040--4044',
    short: "ICIP '19", year: 2019, type: 'conference',
    tags: ['cv'],
    doi: '10.1109/ICIP.2019.8803586',
  },

  // ── Preprints ────────────────────────────────────────
  {
    id: 'zerohat',
    title: 'ZeroHAT: Behavior-Conditioned Zero-Shot Human Activity Trace Generation',
    authors: ['Rongchao Xu', 'Dahai Yu', 'Lin Jiang', 'Guang Wang'],
    venue: 'arXiv preprint', year: 2026, type: 'preprint',
    tags: ['gen', 'st'],
    arxiv: '2609.20310',
  },
  {
    id: 'mobidiff',
    title: 'MobiDiff: Semantic-Aware Multi-Channel Discrete Diffusion for Human Mobility Data Generation',
    authors: ['Rongchao Xu', 'Lin Jiang', 'Dahai Yu', 'Ximiao Li', 'Taichi Liu', 'Desheng Zhang', 'Yuan Tian', 'Guang Wang'],
    venue: 'arXiv preprint', year: 2026, type: 'preprint',
    tags: ['gen', 'st'],
    arxiv: '2607.08357',
  },
  {
    id: 'evirec',
    title: 'EviRec: Continual Evidence Learning for Dual Cold-Start POI Recommendation',
    authors: ['Rongchao Xu', 'Lin Jiang', 'Guang Wang'],
    venue: 'arXiv preprint', year: 2026, type: 'preprint',
    tags: ['st', 'uq'],
    arxiv: '2609.20313',
  },
  {
    id: 'chainuq',
    title: 'ChainUQ: Reasoning Consistency-Aware Uncertainty Quantification for Large Language Models',
    authors: ['Dahai Yu', 'Rongchao Xu', 'Lin Jiang', 'Ximiao Li', 'Guang Wang'],
    venue: 'arXiv preprint', year: 2026, type: 'preprint',
    tags: ['uq', 'llm'],
    arxiv: '2609.26060',
  },
  {
    id: 'trac',
    title: 'TrAC: Trace-Conditioned Answer Consistency for Efficient Uncertainty Quantification in LLMs',
    authors: ['Dahai Yu', 'Lin Jiang', 'Rongchao Xu', 'Guang Wang'],
    venue: 'arXiv preprint', year: 2026, type: 'preprint',
    tags: ['uq', 'llm'],
    arxiv: '2608.00422',
    code: 'https://github.com/UFOdestiny/TrAC',
  },
  {
    id: 'symbouq',
    title: 'SymboUQ: Symbolic Uncertainty Quantification for Spatial Reasoning in LLMs',
    authors: ['Dahai Yu', 'Lin Jiang', 'Rongchao Xu', 'Guang Wang'],
    venue: 'arXiv preprint', year: 2026, type: 'preprint',
    tags: ['uq', 'llm', 'st'],
    arxiv: '2608.00417',
    code: 'https://github.com/UFOdestiny/SymboUQ',
  },
];
