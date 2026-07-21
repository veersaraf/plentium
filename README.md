# Plentium

_A positive, unified, and factual way to look at humanity's frontier technologies — the ones carrying us toward a world of abundance._

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![Live](https://img.shields.io/badge/live-plentium.vercel.app-brightgreen)

**Plentium** is an interactive, data-driven web essay. Instead of another doom-scroll, it makes the optimistic case for human progress — told through animated scrollytelling, real datasets, maps, and 3D, across three chapters: **Energy**, **Nuclear**, and **Space**.

🔗 **Live:** [plentium.vercel.app](https://plentium.vercel.app)

<!-- TODO: add a screenshot or short GIF of the landing / a map view here — it's the visual centerpiece. -->

---

## The three chapters

Each is a self-contained, scroll-driven story that pairs a written argument with live visualizations.

- **⚡ Energy — "The Road to Energy Abundance."** How energy consumption drives human development, where the world's power actually comes from, and the rise of clean energy (solar, wind, and nuclear). Country-by-country comparisons on an interactive map.
- **☢️ Nuclear — "Nuclear Seeks Vengeance."** The case for nuclear as clean, dense, and safe — reactor build-out in China and India, the real story on nuclear waste, and the safety record, with the numbers behind each claim.
- **🚀 Space — "The Space Renaissance."** SpaceX's dominance of the global launch market, the Starlink mega-constellation, and what plummeting launch costs unlock for the coming decade.

## What it does

- **Scrollytelling** — sections animate into view with custom reveal, wipe, and decrypt effects (Framer Motion + GSAP) as you read.
- **Interactive maps** — Mapbox GL / react-map-gl and react-simple-maps render country-level energy and launch data geographically.
- **3D** — Three.js / react-three-fiber for spatial visuals.
- **Charts** — Recharts and D3 turn the underlying datasets into readable, animated graphs.
- **Real data, served locally** — curated datasets (`public/data/*.json`: energy mix, capacity, per-country stats, nuclear reactors/waste/safety, etc.) are exposed through Next.js API routes (`/api/energy`, `/api/space`) and fetched with SWR.

## Tech stack

- **Framework:** Next.js (App Router) + React
- **Styling / UI:** Tailwind CSS, Radix UI primitives, shadcn-style components, `lucide-react`
- **Motion:** Framer Motion, GSAP, react-fast-marquee, react-type-animation
- **Maps:** Mapbox GL JS, react-map-gl, react-simple-maps
- **3D:** Three.js, @react-three/fiber, @react-three/drei
- **Data viz:** Recharts, D3 (d3-scale, d3-fetch)
- **Data fetching:** SWR · **Analytics:** Vercel Analytics
- **Deploy:** Vercel

## Run it locally

```bash
git clone https://github.com/veersaraf/plentium
cd plentium
npm install
npm run dev          # http://localhost:3000
```

> **Maps need a Mapbox token.** The map views use Mapbox GL, which requires a free [Mapbox access token](https://account.mapbox.com/access-tokens/). Add it to a `.env.local` file as your app expects (e.g. `NEXT_PUBLIC_MAPBOX_TOKEN=...`); the rest of the site runs without it.

Build for production with `npm run build && npm run start`.

## Project structure

```
app/
  page.js          landing
  energy/          the Energy chapter
  nuclear/         the Nuclear chapter
  space/           the Space chapter
  api/             energy & space data endpoints (read public/data/*.json)
components/        charts, section cards, navbar/menu, animation primitives, ui/
public/data/       the curated datasets behind the charts and maps
```

## Status & credits

A solo project by **[Veer Saraf](https://github.com/veersaraf)**, started 2024. It's a design- and data-forward passion piece about technological optimism — the frontier-tech abundance thesis, made visual.
