# Eclipse Agency Website — Full Project Documentation

> **Live site:** [eclipseagency.net](https://eclipseagency.net)
> **Repo:** `eclipseagency/eclipseadagency` (GitHub)
> **Deployed on:** Vercel (auto-deploy from `main` branch)
> **Last updated:** March 2026

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion + CSS keyframes |
| 3D / WebGL | Three.js + React Three Fiber + Drei |
| Post-processing | @react-three/postprocessing |
| Deployment | Vercel |
| Node version | ≥ 20.0.0 |

---

## Project Structure

```
eclipseadagency/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── page.tsx                # Homepage
│   │   ├── layout.tsx              # Root layout (header + footer)
│   │   ├── globals.css             # Global styles & design tokens
│   │   ├── not-found.tsx           # 404 page
│   │   ├── sitemap.ts              # Auto-generated XML sitemap
│   │   ├── robots.ts               # robots.txt config
│   │   ├── about/                  # About Us page
│   │   ├── blog/                   # Blog listing + [slug] detail
│   │   ├── contact/                # Contact page + form
│   │   ├── portfolio/              # Portfolio listing page
│   │   ├── solutions/              # Solutions overview + [slug] pages
│   │   ├── v2/                     # Experimental interactive homepage (Three.js)
│   │   ├── api/contact/            # Contact form API route (server-side)
│   │   │
│   │   ── Portfolio / Project Detail Pages ──
│   │   ├── noon-studio/            # Noon Studio project page
│   │   ├── sparkle/                # Sparkle branding project page
│   │   ├── volume/                 # Volume project page
│   │   ├── qatf/                   # Qatf project page
│   │   ├── waf/                    # Waf project page
│   │   ├── forcup/                 # Forcup project page
│   │   ├── grano-de-cafe/          # Grano de Café project page
│   │   └── sunny-beans/            # Sunny Beans project page
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Navigation with Solutions dropdown
│   │   │   └── Footer.tsx
│   │   ├── sections/               # Full page sections
│   │   │   ├── Hero.tsx            # Homepage hero with astronaut + animations
│   │   │   ├── PageHero.tsx        # Reusable hero for inner pages
│   │   │   ├── ServicesGrid.tsx    # Bento grid layout for services
│   │   │   ├── ServicesOverview.tsx
│   │   │   ├── AboutUsHome.tsx
│   │   │   ├── MissionVision.tsx
│   │   │   ├── PortfolioGrid.tsx   # Section-level portfolio grid
│   │   │   ├── ProcessSection.tsx
│   │   │   ├── ClientLogos.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── TestimonialsWall.tsx
│   │   │   └── CtaBanner.tsx       # CTA banner at bottom of pages
│   │   └── ui/                     # Reusable UI primitives
│   │       ├── Button.tsx
│   │       ├── SectionHeader.tsx
│   │       ├── SectionWrapper.tsx
│   │       ├── Icons.tsx
│   │       ├── CustomCursor.tsx    # Custom animated cursor
│   │       ├── Preloader.tsx       # Cinematic preloader (stars + eclipse arc)
│   │       ├── ImageCarousel.tsx
│   │       ├── Lightbox.tsx        # Full-screen image lightbox
│   │       ├── SunlightGlow.tsx
│   │       └── WireframeBackground.tsx
│   │
│   ├── data/
│   │   ├── site.ts                 # ALL site content (edit here)
│   │   ├── testimonials.ts         # Testimonials data
│   │   └── imageManifest.ts        # Image inventory with locations
│   │
│   ├── hooks/                      # Custom React hooks
│   └── lib/                        # Utility functions
│
├── public/
│   └── images/                     # All site images
│
├── next.config.ts
├── vercel.json
├── package.json
├── tsconfig.json
└── postcss.config.mjs
```

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage: hero, services bento grid, portfolio preview, process, testimonials, clients, CTA |
| `/about` | Company profile: mission, vision, Our Story section, values, animated effects |
| `/solutions` | Solutions overview with anchor nav to individual solution pages |
| `/solutions/[slug]` | Individual solution detail pages (branding, digital marketing, web & apps, production, 3D, animation) |
| `/portfolio` | Portfolio grid — currently shows "coming soon" state |
| `/blog` | Blog listing with category badges and read times |
| `/blog/[slug]` | Individual blog post pages |
| `/contact` | Contact form with validation + honeypot spam protection |
| `/v2` | Experimental interactive homepage with Three.js (for testing only) |
| `/noon-studio` | Project detail page |
| `/sparkle` | Branding project detail page |
| `/volume` | Project detail page |
| `/qatf` | Project detail page |
| `/waf` | Project detail page |
| `/forcup` | Project detail page |
| `/grano-de-cafe` | Project detail page |
| `/sunny-beans` | Project detail page |

---

## Design System / Theme

| Token | Value |
|-------|-------|
| Background | `#0a0a0a` (near black) |
| Elevated BG | `#141414` |
| Primary (orange) | `#ff6b35` |
| Primary Light (gold) | `#f7931e` |
| Text | `#e8e8e8` |
| Text Secondary | `#999999` |
| Glass effect | `rgba(255,255,255,0.05)` + `blur(18px)` |
| Border | `rgba(255,255,255,0.08)` |
| Buttons | Gradient pill, `border-radius: 50px` |
| Font | System + custom (space/modern aesthetic) |

**Theme:** Dark space / cosmic — deep blacks, orange/gold accents, glass morphism, subtle glow effects.

---

## Key Features Built

### Visual & UX
- **Cinematic Preloader** — stars, light rays, eclipse arc animation, logo reveal on first load
- **Custom Animated Cursor** — replaces default browser cursor
- **Sunlight Glow Effect** — ambient lighting component
- **Wireframe Background** — decorative animated wireframe grid
- **Framer Motion** animations throughout (fade-in, slide-up, stagger effects)
- **Values section** on About page — animated entrance effects

### Navigation
- **Solutions dropdown** in header linking to individual solution pages
- **Anchor nav links** on Solutions page for each service section
- Portfolio removed from main nav (redirected to /contact for now)

### Sections
- **Hero** — full-screen with astronaut illustration + space imagery
- **ServicesGrid** — redesigned as a **bento grid** layout
- **PortfolioGrid** — project cards with "LEARN MORE" CTAs linking to internal pages
- **Testimonials** + **TestimonialsWall** — two variants available
- **ClientLogos** — client brand logos strip
- **ProcessSection** — agency workflow steps
- **CtaBanner** — repeated at the bottom of project/solution pages
- **MissionVision** — about page section

### Portfolio / Project Pages
Each project page is a standalone page with:
- Hero section
- Project details / case study content
- CTA Banner at the bottom

Projects currently live:
- Noon Studio, Sparkle, Volume, Qatf, Waf, Forcup, Grano de Café, Sunny Beans

### Contact Form
- Server-side API route at `/api/contact`
- Honeypot field for spam protection
- Server-side logging of submissions

### SEO / Indexing
- `sitemap.ts` — auto-generates XML sitemap
- `robots.ts` — controls crawler access
- **Google Search Console** verification meta tag added to `<head>`

### Experimental (`/v2`)
- Three.js interactive homepage prototype (React Three Fiber + Drei + Postprocessing)
- Kept as `/v2` route for testing — not linked in main navigation

---

## Images

All images live in `/public/images/` and are referenced in `src/data/site.ts`.

### Hero & Key Images
- Astronaut / space photography (multiple variants)
- Eclipse character (custom illustrated astronaut with glow)
- Brand/logo images

### Inner Pages
- Inner page heroes use **custom SVG illustrations** (eclipse-themed, no stock photos on inner pages)
- **Our Story** section on About uses a custom SVG illustration

### To Swap an Image
1. Drop new file into `public/images/` (keep same filename), OR
2. Update the path in `src/data/site.ts`
3. No code changes needed

### Image Inventory
All images are catalogued in `src/data/imageManifest.ts` with their locations and usage.

---

## Content Editing

**All site copy lives in one file:** `src/data/site.ts`

Edit this file to update:
- Navigation links
- Hero headline, subtext, stats
- Service descriptions and features
- Portfolio items and project links
- Testimonials
- Blog posts
- Team members
- Contact information (email, phone, address)

---

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → Open http://localhost:3000

# Build for production
npm run build
npm start

# Lint
npm run lint
```

---

## Deploying

### Vercel (Current)
- Connected to GitHub → auto-deploys on push to `main`
- Config in `vercel.json`
- No extra config needed — Vercel auto-detects Next.js

```bash
# Manual deploy via CLI
npx vercel --prod
```

### Environment Variables
- No `.env` file committed (safe)
- Add any secrets via Vercel dashboard → Project Settings → Environment Variables

---

## Git History Summary (95 commits, 116 PRs)

| Phase | What Was Done |
|-------|--------------|
| 🏗️ Foundation | Built full Next.js site from scratch: homepage, about, blog, contact, portfolio, services |
| 🎨 Design | Dark space theme, design tokens, Tailwind v4, Framer Motion animations |
| 🖼️ Images | Multiple rounds of image replacement — astronaut photos, Eclipse character, SVG illustrations |
| 📂 Solutions | Renamed "Services" → "Solutions", built individual solution pages with anchor nav |
| 🗂️ Portfolio | Added 8 project detail pages (Noon Studio, Sparkle, Volume, Qatf, Waf, Forcup, etc.) |
| ✨ Effects | Cinematic preloader, custom cursor, sunlight glow, wireframe background, animated values section |
| 🎯 UX fixes | Bento grid for services, fixed scrolling performance, mobile carousel experiments (reverted) |
| 🌐 3D/WebGL | Added Three.js + React Three Fiber for experimental `/v2` interactive page |
| 🔍 SEO | Google Search Console verification tag, sitemap, robots.txt |
| 🔧 Maintenance | Various build fixes, image sizing/positioning tweaks, nav adjustments |

---

## Important Notes

- **Portfolio page** (`/portfolio`) currently shows a "coming soon" state — real projects are on individual pages
- **`/v2`** is an experimental Three.js page — not linked in nav, for internal testing only
- **Inner page heroes** use SVG illustrations, not stock photos (intentional design decision)
- **`src/data/site.ts`** is the single source of truth for all content — always edit there first
- **Testimonials** have two components: `Testimonials.tsx` (simple) and `TestimonialsWall.tsx` (full wall layout) — choose per page need
- **Google Search Console** is set up and verified (meta tag in `layout.tsx`)

---

## Useful Commands Quick Reference

```bash
# Run locally
npm run dev

# Build check before deploying
npm run build

# Push to deploy (main branch → Vercel auto-deploys)
git push origin main

# Check current branch
git branch

# View recent history
git log --oneline -20
```

---

*Documentation generated March 2026 — reflects all 95 commits / 116 merged PRs on the project.*
