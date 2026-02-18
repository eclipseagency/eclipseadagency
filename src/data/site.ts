export const siteConfig = {
  name: "Eclipse Agency",
  tagline: "From Shadow to Spotlight",
  description:
    "Eclipse is a full-service creative agency specializing in branding, digital marketing, web development, production, 3D design, and animation. We turn bold ideas into unforgettable brand experiences.",
  url: "https://eclipseadagency.com",
  ogImage: "/images/og-image.svg",
  email: "marketing@eclipseadagency.com",
  phone: "01129560357",
  address: "Creative District, Suite 900, Riyadh, Saudi Arabia",
  social: {
    linkedin: "https://linkedin.com/company/eclipseadagency/",
    instagram: "https://www.instagram.com/eclipseadvagency/",
    tiktok: "https://www.tiktok.com/@eclipse.advertising",
    facebook: "https://www.facebook.com/Eclipse.EA",
    behance: "https://www.behance.net/eclipseadvagency",
    pinterest: "https://www.pinterest.com/eclipseadagency/",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Profile", href: "/about" },
    {
      label: "Solutions",
      href: "/solutions",
      children: [
        { label: "Branding", href: "/solutions/branding" },
        { label: "Digital Marketing", href: "/solutions/digital-marketing" },
        { label: "Web & Apps", href: "/solutions/web-apps" },
        { label: "Animation", href: "/solutions/animation" },
      ],
    },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

export const heroContent = {
  badge: "Creative Agency",
  heading: ["From Shadow", "to Spotlight"],
  subheading:
    "We craft bold brands, digital strategies, and immersive experiences that transform businesses and captivate audiences worldwide.",
  cta: { label: "Get Started", href: "/contact" },
  secondaryCta: { label: "View Our Work", href: "/contact" },
  stats: [
    { value: "200+", label: "Projects Delivered" },
    { value: "50+", label: "Happy Clients" },
    { value: "8+", label: "Years of Excellence" },
    { value: "15+", label: "Creative Experts" },
  ],
};

export const servicesOverview = [
  {
    id: "branding",
    slug: "branding",
    icon: "palette",
    title: "Branding & Identity",
    image: "/images/solutions/branding.webp",
    description:
      "We build visual identities that resonate. From logos to full brand systems, we create cohesive brands that stand out in crowded markets.",
    features: [
      "Logo Design",
      "Brand Guidelines",
      "Visual Identity Systems",
      "Brand Strategy",
      "Packaging Design",
      "Brand Audit",
    ],
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    icon: "trending-up",
    title: "Digital Marketing",
    image: "/images/solutions/digital-marketing.webp",
    description:
      "Data-driven campaigns that deliver measurable results. We combine analytics with creativity to maximize your digital presence and ROI.",
    features: [
      "Social Media Management",
      "SEO & SEM",
      "Content Strategy",
      "Email Marketing",
      "Influencer Marketing",
      "Analytics & Reporting",
    ],
  },
  {
    id: "web-apps",
    slug: "web-apps",
    icon: "code",
    title: "Web & App Development",
    image: "/images/solutions/web-apps.webp",
    description:
      "Custom web and mobile solutions built for performance and scale. Responsive, fast, and designed to convert visitors into customers.",
    features: [
      "Web Applications",
      "E-Commerce Solutions",
      "Mobile Applications",
      "UI/UX Design",
      "CMS Development",
      "API Integration",
    ],
  },
  {
    id: "animation",
    slug: "animation",
    icon: "play",
    title: "Motion & Animation",
    image: "/images/solutions/animation.webp",
    description:
      "Dynamic motion graphics and character animation that engage and explain. We animate ideas into compelling visual narratives.",
    features: [
      "Motion Graphics",
      "Explainer Videos",
      "Character Animation",
      "Logo Animation",
      "Kinetic Typography",
      "Social Media Animations",
    ],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We learn about your brand, audience, goals, and market landscape to build a strong strategic foundation.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Using insights from discovery, we develop a tailored plan that aligns creative direction with your business objectives.",
  },
  {
    number: "03",
    title: "Create",
    description:
      "Our team brings the strategy to life through design, development, and content creation across every touchpoint.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "We deploy your project with precision, ensuring everything performs flawlessly across all platforms and devices.",
  },
  {
    number: "05",
    title: "Optimize",
    description:
      "We monitor performance, gather data, and continuously refine to maximize impact and deliver lasting results.",
  },
];

export const portfolioItems: {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}[] = [];

export const testimonials = [
  {
    quote:
      "Eclipse transformed our brand from invisible to unforgettable. Their creative team understood our vision from day one and delivered beyond expectations.",
    name: "Sarah Al-Rashid",
    title: "CEO, Meridian Studios",
    avatar: "/images/testimonials/avatar-01.svg",
    rating: 5,
  },
  {
    quote:
      "The digital marketing strategy they built for us generated a 340% increase in leads within the first quarter. Data-driven and brilliantly creative.",
    name: "Omar Khalil",
    title: "Marketing Director, Nova Technologies",
    avatar: "/images/testimonials/avatar-02.svg",
    rating: 5,
  },
  {
    quote:
      "Working with Eclipse on our 3D product renders was a game-changer. The quality and attention to detail elevated our entire brand perception.",
    name: "Lina Fahad",
    title: "Founder, Artisan Roasters",
    avatar: "/images/testimonials/avatar-03.svg",
    rating: 5,
  },
  {
    quote:
      "They don't just build websites — they build experiences. Our conversion rate doubled after the redesign. Truly exceptional work.",
    name: "Ahmed Nasser",
    title: "CTO, Pulse Fitness",
    avatar: "/images/testimonials/avatar-04.svg",
    rating: 5,
  },
  {
    quote:
      "From concept to execution, the Eclipse team was professional, fast, and incredibly creative. Our campaign ROI exceeded every benchmark we set.",
    name: "Reem Al-Dosari",
    title: "Brand Manager, Oasis Interiors",
    avatar: "/images/testimonials/avatar-05.svg",
    rating: 5,
  },
  {
    quote:
      "Eclipse brought our app vision to life with stunning UI and flawless performance. They truly care about the end-user experience.",
    name: "Faisal Harbi",
    title: "Product Lead, Velo Mobility",
    avatar: "/images/testimonials/avatar-06.svg",
    rating: 4,
  },
];

export const aboutContent = {
  mission:
    "To deliver innovative and effective creative solutions that foster brand growth, meaningful engagement, and measurable business impact.",
  vision:
    "To be a beacon of creativity in the advertising industry, inspiring brands to reach new heights through originality and strategic excellence.",
  story: [
    "Eclipse Agency was born from a belief that every brand deserves to shine. Founded by a team of passionate creatives and strategists, we set out to bridge the gap between bold ideas and real-world results.",
    "Over the years, we've grown from a small studio into a full-service creative powerhouse, serving clients across industries — from startups finding their voice to established enterprises reimagining their presence.",
    "Our approach is simple: we listen deeply, think strategically, and create fearlessly. Every project is a partnership, and every outcome is measured not just in aesthetics, but in impact.",
  ],
  values: [
    {
      title: "Innovation",
      description: "We push boundaries and explore new creative territories with every project.",
    },
    {
      title: "Excellence",
      description: "We hold ourselves to the highest standards in craft, strategy, and execution.",
    },
    {
      title: "Collaboration",
      description: "We work alongside our clients as true partners, sharing knowledge and vision.",
    },
    {
      title: "Impact",
      description: "We measure success by the tangible results we deliver for every brand we touch.",
    },
  ],
  team: [
    { name: "Khalid Al-Mansoori", role: "Founder & Creative Director", image: "/images/team/team-01.svg" },
    { name: "Dana Reeves", role: "Head of Strategy", image: "/images/team/team-02.svg" },
    { name: "Yusuf Ibrahim", role: "Lead Developer", image: "/images/team/team-03.svg" },
    { name: "Nora Al-Fahd", role: "Art Director", image: "/images/team/team-04.svg" },
  ],
};

export const blogPosts = [
  {
    slug: "ai-marketing-trends-2025",
    title: "How AI Is Reshaping Digital Marketing in 2025",
    excerpt:
      "Artificial intelligence is no longer a buzzword — it's the backbone of modern campaigns. Here's what marketers need to know.",
    category: "Digital Marketing",
    date: "2025-01-15",
    image: "/images/blog/blog-01.svg",
    readTime: "5 min",
  },
  {
    slug: "brand-identity-essentials",
    title: "The 7 Pillars of a Strong Brand Identity",
    excerpt:
      "Beyond a logo: the essential elements every brand needs to build recognition, trust, and lasting loyalty.",
    category: "Branding",
    date: "2025-01-08",
    image: "/images/blog/blog-02.svg",
    readTime: "7 min",
  },
  {
    slug: "video-content-strategy",
    title: "Why Video Content Dominates Social Engagement",
    excerpt:
      "Short-form, long-form, live — video is the language of engagement. Learn how to make it work for your brand.",
    category: "Content Strategy",
    date: "2024-12-20",
    image: "/images/blog/blog-03.svg",
    readTime: "4 min",
  },
  {
    slug: "web-performance-matters",
    title: "Speed Wins: Why Web Performance Is a Growth Lever",
    excerpt:
      "Every millisecond counts. How page speed directly impacts conversion rates and search rankings.",
    category: "Web Development",
    date: "2024-12-12",
    image: "/images/blog/blog-04.svg",
    readTime: "6 min",
  },
  {
    slug: "3d-design-ecommerce",
    title: "3D Product Visualization: The Future of E-Commerce",
    excerpt:
      "Interactive 3D renders are replacing flat product photos. Here's why the shift matters for online retail.",
    category: "3D & Innovation",
    date: "2024-11-28",
    image: "/images/blog/blog-05.svg",
    readTime: "5 min",
  },
  {
    slug: "social-media-saudi-arabia",
    title: "Social Media Strategy for the Saudi Market",
    excerpt:
      "Understanding cultural nuances, platform preferences, and content styles that resonate with Saudi audiences.",
    category: "Social Media",
    date: "2024-11-15",
    image: "/images/blog/blog-06.svg",
    readTime: "8 min",
  },
];

export const clientLogos = [
  { name: "HubSpot Certified Partner", image: "/images/clients/partner-01.png" },
  { name: "Google Partner", image: "/images/clients/partner-02.png" },
  { name: "Semrush Certified Agency Partner", image: "/images/clients/partner-03.png" },
  { name: "Adjust Solutions Partner", image: "/images/clients/partner-04.png" },
];

export const footerContent = {
  description:
    "Eclipse Agency is a full-service creative agency helping brands shine through strategic design, digital marketing, and immersive experiences.",
  links: {
    services: [
      { label: "Branding", href: "/solutions/branding" },
      { label: "Digital Marketing", href: "/solutions/digital-marketing" },
      { label: "Web & Apps", href: "/solutions/web-apps" },
      { label: "Animation", href: "/solutions/animation" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
};
