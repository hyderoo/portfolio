export const profile = {
  name: "Hafiz Hamdani",
  shortName: "Dani",
  role: "Software QA Engineer",
  location: "Jakarta, Indonesia",
  timezone: "UTC+7",
  email: "hafizhamdani018@gmail.com",
  github: "https://github.com/hyderoo",
  linkedin: "https://www.linkedin.com/in/hafizhamdani",
  cv: "/cv-hafiz-hamdani.pdf",
};

export const stats = [
  { value: "~1 yr", label: "of QA experience in mobile banking & fintech" },
  { value: "5,000+", label: "test cases executed on a live banking app" },
  { value: "10+", label: "production releases tested end to end" },
  { value: "16", label: "people in the QA team I work in" },
];

export type Experience = {
  period: string;
  role: string;
  org: string;
  mono: string;
  logo?: string;
  /** True when the logo file carries its own solid background (render as a tile, no glow). */
  logoTile?: boolean;
  summary: string;
  tags: string[];
};

export const experience: Experience[] = [
  {
    period: "Jun 2026 — Present",
    role: "IT Quality Assurance (Contract)",
    org: "Mandiri International Technology · PT Bank Mandiri",
    mono: "BM",
    logo: "/logos/mandiri.png",
    logoTile: true,
    summary:
      "Functional QA for Livin' by Mandiri, a mobile banking app used by millions. Regression, smoke, UAT and backward-compatibility testing across 10+ releases, including KSM Emas, Bullion gold savings, Deeplink/Universal Link and a security integration. Defects reported and tracked in JIRA within a 16-person QA team, with API verification through Postman and SQL.",
    tags: ["Manual Testing", "Regression", "UAT", "JIRA", "Postman", "SQL"],
  },
  {
    period: "Oct 2025 — Apr 2026",
    role: "IT E2E QA Intern",
    org: "Home Credit Indonesia",
    mono: "HC",
    logo: "/logos/home-credit.png",
    logoTile: true,
    summary:
      "End-to-end QA for HCI × OPPO projects, including AVANTO. Ran SIT, UAT, smoke and regression cycles; wrote test scenarios and test cases and carried them through review and approval. Ran daily UAT syncs with OPPO Mainland on progress, findings and clarifications. First exposure to test automation with Selenium and Katalon.",
    tags: ["E2E Testing", "SIT / UAT", "Test Planning", "Selenium", "Katalon"],
  },
  {
    period: "Jan 2024 — Feb 2024",
    role: "Information Systems Development Intern",
    org: "National Land Agency (BPN)",
    mono: "BPN",
    logo: "/logos/bpn.png",
    summary:
      "Tested internal information systems used by agency staff and wrote the accompanying user documentation.",
    tags: ["Functional Testing", "Documentation"],
  },
];

export type Project = {
  index: string;
  title: string;
  year: string;
  description: string;
  tags: string[];
  live?: string;
  repo: string;
  preview?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Worlds 2026 Live",
    year: "2026",
    description:
      "A live tracker for the League of Legends World Championship: match center, bracket, standings, team pages, pick'em and push notifications. Next.js PWA backed by Supabase, syncing the official lolesports feed every minute.",
    tags: ["Next.js", "TypeScript", "Supabase", "PWA"],
    live: "https://worlds-2026-live.vercel.app",
    repo: "https://github.com/hyderoo/worlds-2026-live",
    preview: "/previews/worlds.png",
  },
  {
    index: "02",
    title: "APEX F1",
    year: "2026",
    description:
      "A Formula 1 intelligence dashboard for the 2026 season: calendar, live timing tower, standings, telemetry lab and tyre strategy. 37 unit tests and 10 Playwright end-to-end scenarios keep it honest.",
    tags: ["Next.js", "Supabase", "Playwright", "OpenF1 API"],
    live: "https://apex-f1-murex.vercel.app",
    repo: "https://github.com/hyderoo/apex-f1",
    preview: "/previews/apex.png",
  },
  {
    index: "03",
    title: "KARHUTLA Watch",
    year: "2026",
    description:
      "Indonesian forest- and land-fire monitoring: NASA FIRMS hotspots, air-quality stations and modelled smoke plumes on one map, proxied through serverless functions.",
    tags: ["React", "TypeScript", "Vite", "NASA FIRMS"],
    live: "https://karhutla-watch.vercel.app",
    repo: "https://github.com/hyderoo/karhutla-watch",
    preview: "/previews/karhutla.png",
  },
  {
    index: "04",
    title: "QuakeWatch",
    year: "2026",
    description:
      "Real-time earthquake dashboard pulling from USGS worldwide, BMKG for Indonesia and JMA for Japan, with regional views and a 60-second refresh.",
    tags: ["React", "USGS", "BMKG", "JMA"],
    live: "https://quakewatch-one.vercel.app",
    repo: "https://github.com/hyderoo/quakewatch",
    preview: "/previews/quake.png",
  },
  {
    index: "05",
    title: "ShelfSeeker E2E",
    year: "2026",
    description:
      "Playwright end-to-end suite for ShelfSeeker: 39 tests across desktop and mobile emulation, running in GitHub Actions with a self-updating report dashboard and an Allure report per run.",
    tags: ["Playwright", "CI/CD", "GitHub Actions", "Allure"],
    repo: "https://github.com/hyderoo/ShelfSeeker-e2e",
  },
  {
    index: "06",
    title: "ShelfSeeker",
    year: "2023",
    description:
      "University project turned portfolio piece: a book-discovery app on the OpenLibrary API with a reading list, barcode scan and similar-book suggestions. Redesigned and extended in 2026.",
    tags: ["React", "Firebase", "OpenLibrary"],
    repo: "https://github.com/hyderoo/ShelfSeeker",
  },
  {
    index: "07",
    title: "Dewa Management App",
    year: "2025",
    description:
      "Final-thesis project: a Flutter mobile app and companion website talking over a REST API, built for a real stakeholder, Dewa Management.",
    tags: ["Flutter", "Dart", "REST API"],
    repo: "https://github.com/hyderoo/dewa-apk",
  },
];

export type CaseStudy = {
  index: string;
  title: string;
  context: string;
  approach: string[];
  takeaway: string;
  links: { label: string; href: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    index: "A",
    title: "API testing in CI with Postman + Newman",
    context:
      "A self-directed API testing practice against two public Formula 1 APIs (Jolpica and OpenF1) — no employer or private data involved.",
    approach: [
      "Designed a 13-request Postman collection with 33 assertions on real payloads: standings ordering, sequential finishing positions, required fields on every record.",
      "Chained dynamic data between requests — the latest race session key feeds the driver and lap calls.",
      "Verified pagination behaviour and documented each API's error quirks against the live endpoints, including rate limits and empty-result semantics.",
      "Set a 3-second performance budget per response and wired the suite into GitHub Actions: on every change, on demand, and weekly as an availability monitor.",
    ],
    takeaway:
      "Shows how I design API tests: real assertions on real payloads, quirks documented instead of assumed, and a report anyone can open.",
    links: [
      { label: "Live Newman report", href: "https://hyderoo.github.io/api-testing-postman/" },
      { label: "Repository", href: "https://github.com/hyderoo/api-testing-postman" },
    ],
  },
  {
    index: "B",
    title: "End-to-end testing ShelfSeeker with Playwright",
    context:
      "A full E2E suite for my own book-discovery app — 39 tests running as 78 combinations across desktop Chrome and Pixel 7 emulation in GitHub Actions.",
    approach: [
      "Mapped coverage from user flows first: search, filters, paging, reading list, import/export, then the unhappy paths — server errors, network failure, slow API, offline state.",
      "Intercepted network calls against a mocked OpenLibrary so the suite is deterministic — and documented plainly what that does and does not prove.",
      "Analyzed run history for flakiness and tracked it in a written flaky-test analysis.",
      "Built a self-updating results dashboard and a full Allure report on every CI run.",
    ],
    takeaway:
      "Shows how I think about coverage: user flows before test counts, honest limits stated up front, and results visible without digging through CI logs.",
    links: [
      { label: "Results dashboard", href: "https://hyderoo.github.io/ShelfSeeker-e2e/" },
      { label: "Repository", href: "https://github.com/hyderoo/ShelfSeeker-e2e" },
    ],
  },
  {
    index: "C",
    title: "Keeping a live data app honest: APEX F1",
    context:
      "My F1 dashboard mixes live, delayed, historical and demo data from several providers — a correctness risk if any panel overstates what it knows.",
    approach: [
      "Labelled every panel by data provenance — LIVE, DELAYED, HISTORICAL, DEMO DATA — so the UI never presents delayed or fallback data as live.",
      "Protected that contract with 37 unit tests and 10 Playwright end-to-end scenarios in CI.",
      "Used a bundled snapshot of real recorded race data as the demo fallback instead of fabricated numbers.",
    ],
    takeaway:
      "Shows the instinct I test with: the most expensive bugs are the ones where software looks right while saying something false.",
    links: [
      { label: "Live app", href: "https://apex-f1-murex.vercel.app" },
      { label: "Repository", href: "https://github.com/hyderoo/apex-f1" },
    ],
  },
];

export type Skill = { name: string; icon?: string };

export const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Core QA",
    skills: [
      { name: "Functional & Manual Testing" },
      { name: "Regression" },
      { name: "Smoke & Sanity" },
      { name: "UAT / SIT" },
      { name: "Test Planning & Design" },
      { name: "Defect Tracking" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "JIRA", icon: "/icons/jira.svg" },
      { name: "TestRail", icon: "/icons/testrail.svg" },
      { name: "Confluence", icon: "/icons/confluence.svg" },
      { name: "Postman", icon: "/icons/postman.svg" },
      { name: "SQL", icon: "/icons/sql.png" },
      { name: "Git & GitHub", icon: "/icons/github.svg" },
    ],
  },
  {
    title: "Code & Automation",
    skills: [
      { name: "TypeScript / JavaScript", icon: "/icons/typescript.svg" },
      { name: "Next.js & React", icon: "/icons/react.svg" },
      { name: "Playwright", icon: "/icons/playwright.png" },
      { name: "Selenium & Katalon", icon: "/icons/selenium.svg" },
      { name: "Python", icon: "/icons/python.svg" },
      { name: "Flutter & Dart", icon: "/icons/flutter.svg" },
    ],
  },
];

export const credentials = [
  { name: "ISTQB CTFL", detail: "In preparation — not certified yet" },
  { name: "Playwright 101", detail: "TestMu" },
  { name: "Claude Code in Action", detail: "Anthropic" },
  { name: "TOEFL ITP — 603", detail: "Englishvit" },
  { name: "SFC · BAFC · SODFC", detail: "SCRUMstudy, fundamentals" },
];

export const education = {
  school: "Diponegoro University",
  mono: "UNDIP",
  logo: "/logos/undip.png",
  degree: "B.Eng. Computer Engineering",
  detail: "GPA 3.73/4.00 · graduated Jul 2025",
};
