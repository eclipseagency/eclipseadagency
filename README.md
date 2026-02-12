# Eclipse Agency Website

A production-ready marketing agency website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, services grid, portfolio, process, testimonials, clients, CTA |
| `/about` | Company profile with mission, vision, story, values, and team |
| `/services` | Detailed service pages for branding, digital marketing, web & apps, production, 3D, animation |
| `/portfolio` | Project showcase grid with categories and tags |
| `/blog` | Blog listing with category badges and read times |
| `/blog/[slug]` | Individual blog post pages |
| `/contact` | Contact form with validation, honeypot spam protection, and API route |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion + CSS keyframes
- **Forms:** API route with server-side logging

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── api/contact/      # Contact form API route
│   ├── about/
│   ├── blog/
│   ├── contact/
│   ├── portfolio/
│   ├── services/
│   ├── globals.css       # Global styles and theme tokens
│   ├── layout.tsx        # Root layout with header/footer
│   ├── page.tsx          # Homepage
│   ├── not-found.tsx     # 404 page
│   ├── sitemap.ts        # Auto-generated sitemap
│   └── robots.ts         # Robots.txt config
├── components/
│   ├── layout/           # Header, Footer
│   ├── sections/         # Page sections (Hero, ServicesGrid, etc.)
│   └── ui/               # Reusable UI components (Button, Icons, etc.)
├── data/
│   ├── site.ts           # All site content (editable)
│   └── imageManifest.ts  # Image inventory with locations
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions
public/
└── images/               # All placeholder images
```

## Content Editing

All site content is centralized in `src/data/site.ts`. Edit this file to update:
- Navigation links
- Hero text and stats
- Service descriptions and features
- Portfolio items
- Testimonials
- Blog posts
- Team members
- Contact information

## Image Swapping

Images are referenced via paths in `src/data/site.ts` and inventoried in `src/data/imageManifest.ts`. To swap images:

1. Replace the file in `public/images/` with your own (keep the same filename)
2. Or update the path in `site.ts` to point to your new file
3. No layout code changes required

## Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

```bash
# Option 1: Via CLI
npx vercel

# Option 2: Via GitHub
# 1. Push to GitHub
# 2. Import at https://vercel.com/new
# 3. Vercel auto-detects Next.js — no config needed
```

## Design System

| Token | Value |
|-------|-------|
| Background | `#0a0a0a` |
| Elevated BG | `#141414` |
| Primary | `#ff6b35` (orange) |
| Primary Light | `#f7931e` (gold) |
| Text | `#e8e8e8` |
| Text Secondary | `#999999` |
| Glass | `rgba(255,255,255,0.05)` with `blur(18px)` |
| Border | `rgba(255,255,255,0.08)` |
| Buttons | Gradient pill, `border-radius: 50px` |
