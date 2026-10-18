export const profile = {
  name: "Hafiz Hamdani",
  shortName: "Dani",
  role: "Software QA Engineer",
  location: "Jakarta, Indonesia",
  timezone: "UTC+7",
  email: "hafizhamdani018@gmail.com",
  github: "https://github.com/hyderoo",
  linkedin: "https://www.linkedin.com/in/hafizhamdani",
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
  summary: string;
  tags: string[];
};

export const experience: Experience[] = [
  {
    period: "Jun 2026 — Present",
    role: "IT Quality Assurance (Contract)",
    org: "Mandiri International Technology · PT Bank Mandiri",
    summary:
      "Functional QA for Livin' by Mandiri, one of Indonesia's biggest mobile banking apps. Regression, smoke, UAT and backward-compatibility testing across 10+ releases, including KSM Emas, Bullion gold savings, Deeplink/Universal Link and a security integration. Roughly 100+ defects reported and tracked in JIRA inside a 16-person QA team, with API checks through Postman and SQL.",
    tags: ["Manual Testing", "Regression", "UAT", "JIRA", "Postman", "SQL"],
  },
  {
    period: "Oct 2025 — Apr 2026",
    role: "IT E2E QA Intern",
    org: "Home Credit Indonesia",
    summary:
      "End-to-end QA for HCI × OPPO projects, including AVANTO. Ran SIT, UAT, smoke and regression cycles; wrote test scenarios and test cases and carried them through review and approval. Hosted daily UAT syncs with OPPO Mainland on progress, findings and clarifications. First exposure to test automation with Selenium and Katalon.",
    tags: ["E2E Testing", "SIT / UAT", "Test Planning", "Selenium", "Katalon"],
  },
  {
    period: "Jan 2024 — Feb 2024",
    role: "Information Systems Development Intern",
    org: "National Land Agency (BPN)",
    summary:
      "Internship on internal information systems: contributed to functional testing and wrote user documentation for the staff using them.",
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
      "Playwright end-to-end suite for ShelfSeeker: 39 tests across desktop and mobile emulation, running in GitHub Actions with a self-updating report dashboard.",
    tags: ["Playwright", "CI/CD", "GitHub Actions"],
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

export const skillGroups = [
  {
    title: "Core QA",
    skills: ["Functional & Manual Testing", "Regression", "Smoke & Sanity", "UAT / SIT", "Test Planning & Design", "Defect Tracking"],
  },
  {
    title: "Tools",
    skills: ["JIRA", "TestRail", "Confluence", "Postman", "SQL", "Git & GitHub"],
  },
  {
    title: "Code & Automation",
    skills: ["TypeScript / JavaScript", "Next.js & React", "Playwright", "Selenium & Katalon", "Python", "Flutter & Dart"],
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
  degree: "B.Eng. Computer Engineering",
  detail: "GPA 3.73/4.00 · graduated Jul 2025",
};
