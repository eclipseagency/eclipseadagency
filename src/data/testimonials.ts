export interface TestimonialItem {
  type: "testimonial";
  title: string;
  body: string;
  rating: number;
  name: string;
  role: string;
  avatar: string;
}

export interface PlaceholderItem {
  type: "placeholder";
}

export type WallCard = TestimonialItem | PlaceholderItem;

/**
 * 9 cards arranged in a 3-column grid:
 *   Row 1: testimonial | testimonial | placeholder
 *   Row 2: placeholder | testimonial | testimonial
 *   Row 3: testimonial | testimonial | placeholder
 */
export const wallCards: WallCard[] = [
  {
    type: "testimonial",
    title: "Transformed Our Entire Brand Presence",
    body: "Eclipse took our outdated brand and turned it into something truly unforgettable. The creative team understood our vision from day one and delivered beyond every expectation.",
    rating: 5,
    name: "Sarah Al-Rashid",
    role: "CEO, Meridian Studios",
    avatar: "/images/testimonials/avatar-01.svg",
  },
  {
    type: "testimonial",
    title: "340% Increase in Qualified Leads",
    body: "The digital marketing strategy they built generated results we didn't think were possible in the first quarter. Data-driven and brilliantly creative.",
    rating: 5,
    name: "Omar Khalil",
    role: "Marketing Director, Nova Tech",
    avatar: "/images/testimonials/avatar-02.svg",
  },
  { type: "placeholder" },
  { type: "placeholder" },
  {
    type: "testimonial",
    title: "3D Renders That Elevated Our Brand",
    body: "Working with Eclipse on our product renders was a game-changer. The quality and attention to detail elevated our entire brand perception overnight.",
    rating: 5,
    name: "Lina Fahad",
    role: "Founder, Artisan Roasters",
    avatar: "/images/testimonials/avatar-03.svg",
  },
  {
    type: "testimonial",
    title: "Conversion Rate Doubled After Redesign",
    body: "They don't just build websites \u2014 they build experiences. Our conversion rate doubled after the redesign. Truly exceptional work from start to finish.",
    rating: 5,
    name: "Ahmed Nasser",
    role: "CTO, Pulse Fitness",
    avatar: "/images/testimonials/avatar-04.svg",
  },
  {
    type: "testimonial",
    title: "Campaign ROI Exceeded Every Benchmark",
    body: "From concept to execution, the Eclipse team was professional, fast, and incredibly creative. Our campaign results exceeded every benchmark we set.",
    rating: 5,
    name: "Reem Al-Dosari",
    role: "Brand Manager, Oasis Interiors",
    avatar: "/images/testimonials/avatar-05.svg",
  },
  {
    type: "testimonial",
    title: "Stunning UI With Flawless Performance",
    body: "Eclipse brought our app vision to life with stunning UI and flawless performance. They truly care about the end-user experience and it shows in every detail.",
    rating: 5,
    name: "Faisal Harbi",
    role: "Product Lead, Velo Mobility",
    avatar: "/images/testimonials/avatar-06.svg",
  },
  { type: "placeholder" },
];
