# Portfolio: Hafiz (Dani) Hamdani

Personal portfolio site: selected QA experience and side projects, with a
focus on motion and typography.

**Live:** https://hafizhamdani.my.id/

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- [Motion](https://motion.dev) for scroll and reveal animations
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- [three.js](https://threejs.org) via [react-three-fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://docs.pmnd.rs/drei) for the hero scene

## Design notes

- Single-page layout: preloader, hero, about, experience, selected work, toolbox, contact.
- Motion details: character-split headings, clip-path wipe reveals, hover
  previews on project rows, infinite marquee, custom cursor (desktop only).
- Performance: one light WebGL scene (particle icosahedron, ~2.4k points,
  capped DPR), system-dark palette, no heavyweight media.
- Accessibility: honors `prefers-reduced-motion` (smooth scroll, marquee,
  particle animation and reveals all degrade gracefully).

## Fonts & assets

- [Fraunces](https://fonts.google.com/specimen/Fraunces) and
  [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), Google
  Fonts, SIL Open Font License 1.1, self-hosted at build time via `next/font`.
- Project preview images in `public/previews/` are screenshots of my own
  deployed projects.
- Everything else (grain, icons, 3D scene) is generated in code, no stock
  assets.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Deployed on [Vercel](https://vercel.com). Push to `main` triggers a build.
