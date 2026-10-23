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
    period: "Jun 2026 to Present",
    role: "IT Quality Assurance",
    org: "PT Bank Mandiri",
    mono: "BM",
    logo: "/logos/mandiri.png",
    summary:
      "Functional QA for Livin' by Mandiri, a mobile banking app used by millions. Regression, smoke, UAT and backward-compatibility testing across 10+ releases, including KSM Emas, Bullion gold savings, Deeplink/Universal Link and a security integration. Defects reported and tracked in JIRA within a 16-person QA team, with API verification through Postman and SQL.",
    tags: ["Manual Testing", "Regression", "UAT", "JIRA", "Postman", "SQL"],
  },
  {
    period: "Oct 2025 to Apr 2026",
    role: "IT E2E QA Intern",
    org: "Home Credit Indonesia",
    mono: "HC",
    logo: "/logos/home-credit.png",
    summary:
      "End-to-end QA for HCI × OPPO projects, including AVANTO. Ran SIT, UAT, smoke and regression cycles; wrote test scenarios and test cases and carried them through review and approval. Ran daily UAT syncs with OPPO Mainland on progress, findings and clarifications. First exposure to test automation with Selenium and Katalon.",
    tags: ["E2E Testing", "SIT / UAT", "Test Planning", "Selenium", "Katalon"],
  },
  {
    period: "Jan 2024 to Feb 2024",
    role: "Information Systems Development Intern",
    org: "National Land Agency (BPN)",
    mono: "BPN",
    logo: "/logos/bpn.webp",
    summary:
      "Tested internal information systems used by agency staff and wrote the accompanying user documentation.",
    tags: ["Functional Testing", "Documentation"],
  },
];

/** Public, view-only link to the Dewa Management Android APK (demo build). */
export const DEWA_APK_URL =
  "https://drive.google.com/file/d/1L0btTRlFBDIuOV7c9Yzl0UkWHFPUAg1l/view?usp=sharing";

export type Project = {
  index: string;
  title: string;
  year: string;
  description: string;
  tags: string[];
  live?: string;
  repo: string;
  preview?: string;
  /** Public GitHub Actions workflow whose latest run feeds the live badge. */
  ci?: { repo: string; workflow: string };
  /** Link to a test-strategy write-up on this site. */
  strategy?: string;
  /** Link to the architecture diagrams for this project. */
  arch?: string;
  /** Android APK demo download (view-only link). */
  apk?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Worlds 2026 Live",
    year: "2026",
    description:
      "A live tracker for the League of Legends World Championship: match center, bracket, standings, team pages, pick'em and push notifications. Next.js PWA backed by Supabase, syncing the official lolesports feed every 5 minutes.",
    tags: ["Next.js", "TypeScript", "Supabase", "PWA"],
    live: "https://worlds-2026-live.vercel.app",
    repo: "https://github.com/hyderoo/worlds-2026-live",
    preview: "/previews/worlds.webp",
    ci: { repo: "hyderoo/worlds-2026-live", workflow: "CI" },
    strategy: "/strategy",
    arch: "/architecture#worlds",
  },
  {
    index: "02",
    title: "APEX F1",
    year: "2026",
    description:
      "A Formula 1 intelligence dashboard for the 2026 season: calendar, live timing tower, standings, telemetry lab and tyre strategy. 101 unit tests, 19 contract tests and 10 Playwright end-to-end scenarios keep it honest.",
    tags: ["Next.js", "Supabase", "Playwright", "OpenF1 API"],
    live: "https://apex-f1-murex.vercel.app",
    repo: "https://github.com/hyderoo/apex-f1",
    preview: "/previews/apex.webp",
    ci: { repo: "hyderoo/apex-f1", workflow: "CI" },
    arch: "/architecture#apex-f1",
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
    preview: "/previews/karhutla.webp",
    ci: { repo: "hyderoo/karhutla-watch", workflow: "e2e" },
    arch: "/architecture#karhutla",
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
    preview: "/previews/quake.webp",
    ci: { repo: "hyderoo/quakewatch", workflow: "e2e" },
    arch: "/architecture#quakewatch",
  },
  {
    index: "05",
    title: "ShelfSeeker E2E",
    year: "2026",
    description:
      "Playwright end-to-end suite for ShelfSeeker: 39 tests across desktop and mobile emulation, running in GitHub Actions with a self-updating report dashboard and an Allure report per run.",
    tags: ["Playwright", "CI/CD", "GitHub Actions", "Allure"],
    repo: "https://github.com/hyderoo/ShelfSeeker-e2e",
    ci: { repo: "hyderoo/ShelfSeeker-e2e", workflow: "e2e" },
    arch: "/architecture#shelfseeker-e2e",
  },
  {
    index: "06",
    title: "ShelfSeeker",
    year: "2023",
    description:
      "University project turned portfolio piece: a book-discovery app on the OpenLibrary API with a reading list, barcode scan and similar-book suggestions. Redesigned and extended in 2026. The badge here is live from the ShelfSeeker E2E suite (project 05), which tests this deployed app.",
    tags: ["React", "OpenLibrary", "PWA"],
    repo: "https://github.com/hyderoo/ShelfSeeker",
    ci: { repo: "hyderoo/ShelfSeeker-e2e", workflow: "e2e" },
    arch: "/architecture#shelfseeker",
  },
  {
    index: "07",
    title: "Dewa Management App",
    year: "2025",
    description:
      "Final-thesis project: a Flutter mobile app and companion website talking over a REST API, built for a real stakeholder, Dewa Management.",
    tags: ["Flutter", "Dart", "REST API"],
    repo: "https://github.com/hyderoo/dewa-apk",
    ci: { repo: "hyderoo/dewa-apk", workflow: "test" },
    arch: "/architecture#dewa",
    apk: DEWA_APK_URL,
  },
  {
    index: "08",
    title: "SINDAPARKA",
    year: "2024",
    description:
      "Growth-monitoring PWA for posyandu cadres in Parakan Kauman, Temanggung, from a KKN team project with BKKBN in July 2024. The current build runs on Next.js and Supabase, with the PHP/MySQL original kept on the legacy-php branch: record a child's weight and height, get WHO 2006 z-scores on the spot, and follow each child's curve over time. Row Level Security keeps every cadre inside their own posyandu. The current codebase carries 19 unit tests and 22 Playwright end-to-end tests in CI.",
    tags: ["Next.js", "TypeScript", "Supabase", "PWA", "Playwright"],
    live: "https://sindaparka-rho.vercel.app",
    repo: "https://github.com/hyderoo/SINDAPARKA",
    preview: "/previews/sindaparka.webp",
    ci: { repo: "hyderoo/SINDAPARKA", workflow: "CI" },
    arch: "/architecture#sindaparka",
  },
  {
    index: "09",
    title: "RiskLens",
    year: "2026",
    description:
      "Local fraud and transaction-risk analytics on a public synthetic dataset of 13.3 million transactions. FastAPI and DuckDB power a Next.js dashboard with transaction filtering, calibrated LightGBM scores, per-transaction explanations, model evaluation, exposure scenarios and a local case workflow. Historical labels, model estimates and simulated figures are kept separate. README, screenshots and a demo video are on GitHub; no hosted demo.",
    tags: ["Next.js", "TypeScript", "FastAPI", "DuckDB", "LightGBM"],
    repo: "https://github.com/hyderoo/RiskLens",
    preview: "/previews/risklens.webp",
    ci: { repo: "hyderoo/RiskLens", workflow: "CI" },
  },
  {
    index: "10",
    title: "PDF Lab",
    year: "2026",
    description:
      "PDF tools for the Undip community that run entirely in the browser: compare two versions, summarize or translate with Gemini, merge, split, rotate, crop, compress, watermark and more. Files are processed on your device with pdf-lib and pdf.js and never uploaded to a server. Sign-in is restricted to Undip email addresses.",
    tags: ["Next.js", "TypeScript", "pdf-lib", "Auth.js", "Gemini"],
    live: "https://pdflab-undip.vercel.app",
    repo: "https://github.com/hyderoo/pdf-lab",
    preview: "/previews/pdflab.webp",
  },
  {
    index: "11",
    title: "AirSubs",
    year: "2026",
    description:
      "A Chrome extension that puts live captions and translation on any tab: YouTube, Twitch, a livestream, a lecture recording. Tab audio is transcribed by Whisper on Groq's free tier with three accuracy modes; Balanced shows a fast draft and quietly replaces it with the more accurate read a moment later. Translation runs on Chrome's built-in on-device Translator where possible, with an open-weight LLM fallback, and sessions export to .srt.",
    tags: ["Chrome Extension", "Manifest V3", "Whisper", "Groq"],
    repo: "https://github.com/hyderoo/airsubs",
  },
  {
    index: "12",
    title: "php2shell-check",
    year: "2026",
    description:
      "A defensive CLI that checks PHP runtimes against the PHP2Shell fixes (CVE-2026-109618 and CVE-2026-109619). It inventories local installs, SSH hosts, HTTP headers and logs, and tracks which Ubuntu package owns each binary so an unrelated package can never pass as a patch. It reports version and inventory evidence, never a blanket 'site is safe' verdict. 41 tests run in CI on Python 3.9 and 3.12.",
    tags: ["Python", "Security", "CLI", "GitHub Actions"],
    repo: "https://github.com/hyderoo/php2shell-check",
    ci: { repo: "hyderoo/php2shell-check", workflow: "tests" },
  },
];


export type CaseStudy = {
  arch?: string;
  index: string;
  title: string;
  context: string;
  approach: string[];
  takeaway: string;
  links: { label: string; href: string }[];
  ci?: { repo: string; workflow: string };
};

export const caseStudies: CaseStudy[] = [
  {
    index: "A",
    title: "API testing in CI with Postman + Newman",
    context:
      "A self-directed API testing practice against two public Formula 1 APIs (Jolpica and OpenF1). No employer or private data is involved.",
    approach: [
      "Designed a 13-request Postman collection with 41 assertions on real payloads: standings ordering, sequential finishing positions, required fields on every record.",
      "Chained dynamic data between requests: the latest race session key feeds the driver and lap calls.",
      "Verified pagination behaviour and documented each API's error quirks against the live endpoints, including rate limits and empty-result semantics.",
      "Set a 3-second performance budget per response and wired the suite into GitHub Actions: on every change, on demand, and weekly as an availability monitor.",
    ],
    takeaway:
      "Shows how I design API tests: real assertions on real payloads, quirks documented instead of assumed, and a report anyone can open.",
    links: [
      { label: "Live Newman report", href: "https://hyderoo.github.io/api-testing-postman/" },
      { label: "Repository", href: "https://github.com/hyderoo/api-testing-postman" },
    ],
    ci: { repo: "hyderoo/api-testing-postman", workflow: "Newman API tests" },
  },
  {
    index: "B",
    title: "End-to-end testing ShelfSeeker with Playwright",
    context:
      "A full E2E suite for my own book-discovery app: 39 tests running as 78 combinations across desktop Chrome and Pixel 7 emulation in GitHub Actions.",
    approach: [
      "Mapped coverage from user flows first: search, filters, paging, reading list, import/export, then the unhappy paths: server errors, network failure, slow API, offline state.",
      "Intercepted network calls against a mocked OpenLibrary so the suite is deterministic, and documented plainly what that does and does not prove.",
      "Analyzed run history for flakiness and tracked it in a written flaky-test analysis.",
      "Built a self-updating results dashboard and a full Allure report on every CI run.",
    ],
    takeaway:
      "Shows how I think about coverage: user flows before test counts, honest limits stated up front, and results visible without digging through CI logs.",
    links: [
      { label: "Results dashboard", href: "https://hyderoo.github.io/ShelfSeeker-e2e/" },
      { label: "Repository", href: "https://github.com/hyderoo/ShelfSeeker-e2e" },
    ],
    ci: { repo: "hyderoo/ShelfSeeker-e2e", workflow: "e2e" },
  },
  {
    index: "C",
    title: "Keeping a live data app honest: APEX F1",
    context:
      "My F1 dashboard mixes live, delayed, historical and demo data from several providers, a correctness risk if any panel overstates what it knows.",
    approach: [
      "Labelled every panel by data provenance (LIVE, DELAYED, HISTORICAL, DEMO DATA) so the UI never presents delayed or fallback data as live.",
      "Protected that contract with 101 unit tests, 19 contract tests and 10 Playwright end-to-end scenarios in CI.",
      "Used a bundled snapshot of real recorded race data as the demo fallback instead of fabricated numbers.",
    ],
    takeaway:
      "Shows the instinct I test with: the most expensive bugs are the ones where software looks right while saying something false.",
    links: [
      { label: "Live app", href: "https://apex-f1-murex.vercel.app" },
      { label: "Repository", href: "https://github.com/hyderoo/apex-f1" },
    ],
    ci: { repo: "hyderoo/apex-f1", workflow: "CI" },
    arch: "/architecture#apex-f1",
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
    title: "Used at work",
    skills: [
      { name: "JIRA", icon: "/icons/jira.svg" },
      { name: "TestRail", icon: "/icons/testrail.svg" },
      { name: "Confluence", icon: "/icons/confluence.svg" },
      { name: "Postman", icon: "/icons/postman.svg" },
      { name: "SQL", icon: "/icons/sql.webp" },
      { name: "Git & GitHub", icon: "/icons/github.svg" },
      { name: "Selenium & Katalon", icon: "/icons/selenium.svg" },
    ],
  },
  {
    title: "In my side projects",
    skills: [
      { name: "TypeScript / JavaScript", icon: "/icons/typescript.svg" },
      { name: "Next.js & React", icon: "/icons/react.svg" },
      { name: "Python", icon: "/icons/python.svg" },
      { name: "Flutter & Dart", icon: "/icons/flutter.svg" },
      { name: "Supabase", icon: "/icons/supabase.svg" },
      { name: "FastAPI & DuckDB" },
      { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
      { name: "Playwright", icon: "/icons/playwright.webp" },
      { name: "GitHub Actions" },
      { name: "Newman & Allure" },
      { name: "Maestro" },
    ],
  },
  {
    title: "Learning now",
    skills: [{ name: "Rust" }, { name: "Solana & Anchor" }],
  },
];

export const credentials = [
  { name: "ISTQB CTFL", detail: "In preparation, not certified yet" },
  { name: "Playwright 101", detail: "TestMu" },
  { name: "Claude Code in Action", detail: "Anthropic" },
  { name: "TOEFL ITP 603", detail: "Englishvit" },
  { name: "SFC · BAFC · SODFC", detail: "SCRUMstudy, fundamentals" },
];

export const education = {
  school: "Diponegoro University",
  mono: "UNDIP",
  logo: "/logos/undip.webp",
  degree: "B.Eng. Computer Engineering",
  detail: "GPA 3.73/4.00 · graduated Jul 2025",
};

