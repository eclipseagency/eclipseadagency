/**
 * Image Manifest
 * ─────────────
 * Lists every image used on the site and where it appears.
 * Swap images by replacing the files in /public/images/ — no layout code changes required.
 *
 * All images are referenced via the `src` field (relative to /public).
 */

export interface ImageEntry {
  src: string;
  alt: string;
  width: number;
  height: number;
  usedOn: string;
}

export const imageManifest: ImageEntry[] = [
  // ── Hero ──
  { src: "/images/hero-astronaut.svg", alt: "Astronaut illustration", width: 600, height: 600, usedOn: "Homepage hero" },

  // ── Portfolio ──
  { src: "/images/portfolio/project-01.jpg", alt: "Meridian Studios branding project", width: 800, height: 600, usedOn: "Portfolio grid, Homepage featured" },
  { src: "/images/portfolio/project-02.jpg", alt: "Pulse Fitness web platform", width: 800, height: 600, usedOn: "Portfolio grid" },
  { src: "/images/portfolio/project-03.jpg", alt: "Verde Organic packaging", width: 800, height: 600, usedOn: "Portfolio grid" },
  { src: "/images/portfolio/project-04.jpg", alt: "Skyline Properties video", width: 800, height: 600, usedOn: "Portfolio grid" },
  { src: "/images/portfolio/project-05.jpg", alt: "Nova Technologies campaign", width: 800, height: 600, usedOn: "Portfolio grid" },
  { src: "/images/portfolio/project-06.jpg", alt: "Artisan Roasters 3D renders", width: 800, height: 600, usedOn: "Portfolio grid" },
  { src: "/images/portfolio/project-07.jpg", alt: "Echo Music animation", width: 800, height: 600, usedOn: "Portfolio grid" },
  { src: "/images/portfolio/project-08.jpg", alt: "Atlas Voyages web app", width: 800, height: 600, usedOn: "Portfolio grid" },

  // ── Blog ──
  { src: "/images/blog/blog-01.jpg", alt: "AI marketing trends article", width: 800, height: 450, usedOn: "Blog grid" },
  { src: "/images/blog/blog-02.jpg", alt: "Brand identity article", width: 800, height: 450, usedOn: "Blog grid" },
  { src: "/images/blog/blog-03.jpg", alt: "Video content article", width: 800, height: 450, usedOn: "Blog grid" },
  { src: "/images/blog/blog-04.jpg", alt: "Web performance article", width: 800, height: 450, usedOn: "Blog grid" },
  { src: "/images/blog/blog-05.jpg", alt: "3D e-commerce article", width: 800, height: 450, usedOn: "Blog grid" },
  { src: "/images/blog/blog-06.jpg", alt: "Social media Saudi Arabia article", width: 800, height: 450, usedOn: "Blog grid" },

  // ── Team ──
  { src: "/images/team/team-01.jpg", alt: "Khalid Al-Mansoori", width: 400, height: 400, usedOn: "About page team section" },
  { src: "/images/team/team-02.jpg", alt: "Dana Reeves", width: 400, height: 400, usedOn: "About page team section" },
  { src: "/images/team/team-03.jpg", alt: "Yusuf Ibrahim", width: 400, height: 400, usedOn: "About page team section" },
  { src: "/images/team/team-04.jpg", alt: "Nora Al-Fahd", width: 400, height: 400, usedOn: "About page team section" },

  // ── Testimonials ──
  { src: "/images/testimonials/avatar-01.jpg", alt: "Sarah Al-Rashid", width: 80, height: 80, usedOn: "Testimonials section" },
  { src: "/images/testimonials/avatar-02.jpg", alt: "Omar Khalil", width: 80, height: 80, usedOn: "Testimonials section" },
  { src: "/images/testimonials/avatar-03.jpg", alt: "Lina Fahad", width: 80, height: 80, usedOn: "Testimonials section" },
  { src: "/images/testimonials/avatar-04.jpg", alt: "Ahmed Nasser", width: 80, height: 80, usedOn: "Testimonials section" },

  // ── Clients ──
  { src: "/images/clients/client-01.svg", alt: "Meridian Studios logo", width: 160, height: 60, usedOn: "Client logos strip" },
  { src: "/images/clients/client-02.svg", alt: "Nova Technologies logo", width: 160, height: 60, usedOn: "Client logos strip" },
  { src: "/images/clients/client-03.svg", alt: "Pulse Fitness logo", width: 160, height: 60, usedOn: "Client logos strip" },
  { src: "/images/clients/client-04.svg", alt: "Verde Organic logo", width: 160, height: 60, usedOn: "Client logos strip" },
  { src: "/images/clients/client-05.svg", alt: "Skyline Properties logo", width: 160, height: 60, usedOn: "Client logos strip" },
  { src: "/images/clients/client-06.svg", alt: "Artisan Roasters logo", width: 160, height: 60, usedOn: "Client logos strip" },
  { src: "/images/clients/client-07.svg", alt: "Echo Music logo", width: 160, height: 60, usedOn: "Client logos strip" },
  { src: "/images/clients/client-08.svg", alt: "Atlas Voyages logo", width: 160, height: 60, usedOn: "Client logos strip" },

  // ── Misc ──
  { src: "/images/og-image.jpg", alt: "Eclipse Agency open graph image", width: 1200, height: 630, usedOn: "SEO meta tags" },
  { src: "/images/about-hero.jpg", alt: "Agency workspace", width: 1200, height: 600, usedOn: "About page hero" },
];
