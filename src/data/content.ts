export type Publication = "draft" | "published";
export type SectorGroup = "Built environment" | "Trade & services";

export type Business = {
  slug: string;
  name: string;
  index: string;
  group: SectorGroup;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  status: "focus" | "published";
  services: string[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  location?: string;
  description: string;
  image: string;
  imageAlt: string;
  status: Publication;
};

export type Insight = {
  slug: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  body: string[];
  image: string;
  status: Publication;
};

// Focus areas are public editorial pathways, not verified operating divisions or service claims.
// Only change status to "published" after the division and its scope are confirmed.
export const businesses: Business[] = [
  { slug: "land-development", name: "Land Development", index: "01", group: "Built environment", headline: "Where places begin.", description: "From open land to planned communities, we shape sites for what comes next.", image: "/images/land-development.jpg", imageAlt: "Aerial view of a residential land development", status: "published", services: ["Land strategy", "Site planning", "Planned communities"] },
  { slug: "real-estate", name: "Real Estate", index: "02", group: "Built environment", headline: "Places built to hold value.", description: "Residential and commercial spaces considered for living, working and long-term worth.", image: "/images/real-estate.jpg", imageAlt: "Modern residential apartment buildings", status: "published", services: ["Residential", "Commercial space", "Property value"] },
  { slug: "construction", name: "Construction", index: "03", group: "Built environment", headline: "Plans become structures.", description: "Bringing drawings, materials and craft together to build with care and precision.", image: "/images/infrastructure.jpg", imageAlt: "Cranes above a large urban construction site", status: "published", services: ["Built works", "Site delivery", "Civil & structural"] },
  { slug: "investment", name: "Investment", index: "04", group: "Trade & services", headline: "Capital with a long view.", description: "A considered approach to opportunity, weighing ambition against discipline.", image: "/images/investment.jpg", imageAlt: "Modern glass buildings rising against the sky", status: "published", services: ["Opportunity review", "Portfolio thinking", "Long-term value"] },
  { slug: "import-export", name: "Import & Export", index: "05", group: "Trade & services", headline: "Goods in motion.", description: "Connecting markets through trade routes, logistics and dependable relationships.", image: "/images/import-export.jpg", imageAlt: "Aerial view of shipping containers in a port", status: "published", services: ["Trade routes", "Logistics", "Market reach"] },
  { slug: "hotels-resorts", name: "Hotels & Resorts", index: "06", group: "Built environment", headline: "Hospitality designed for memory.", description: "Places where guests arrive, rest and remember, shaped for comfort and character.", image: "/images/hotel-resorts.jpg", imageAlt: "Resort swimming pool surrounded by palm trees", status: "published", services: ["Guest experience", "Resort places", "Hospitality design"] },
  { slug: "marketing-services", name: "Marketing Services", index: "07", group: "Trade & services", headline: "Stories that travel.", description: "Clear positioning and considered communication that helps ideas reach people.", image: "/images/marketing-services.jpg", imageAlt: "Creative studio materials arranged on a desk", status: "published", services: ["Brand communication", "Campaign thinking", "Audience reach"] },
];

export const serviceLenses = [
  { index: "01", title: "Strategy & planning", description: "Understand the challenge and agree on a clear next step.", theme: "DEFINE" },
  { index: "02", title: "Engineering & design", description: "Bring technical ideas, design goals and practical needs together.", theme: "SHAPE" },
  { index: "03", title: "Delivery & execution", description: "Plan the decisions and coordination needed to move an idea forward.", theme: "REALIZE" },
  { index: "04", title: "Operations & evolution", description: "Consider the people and systems that will use the result over time.", theme: "SUSTAIN" },
] as const;

export const projects: Project[] = [
  { slug: "study-in-form", title: "Study in Form", category: "Architecture", description: "An editorial exploration of structural rhythm and light. This is not a JD CORP project.", image: "/images/hero.jpg", imageAlt: "Sculptural white modernist building against the sky", status: "published" },
  { slug: "urban-perspective", title: "Urban Perspective", category: "Urbanism", description: "An illustrative look at density, material, and the contemporary city. This is not a JD CORP project.", image: "/images/tower.jpg", imageAlt: "Glass office towers seen from below", status: "published" },
  { slug: "inside-out", title: "Inside / Out", category: "Interiors", description: "A visual study of space and atmosphere. This is not a JD CORP project.", image: "/images/interior.jpg", imageAlt: "Bright contemporary workspace interior", status: "published" },
];

export const insights: Insight[] = [];
export const vacancies: { title: string; location: string; href: string; status: Publication }[] = [];

export const visible = <T extends { status: Publication }>(entries: T[]) =>
  entries.filter((entry) => entry.status === "published" || process.env.NODE_ENV !== "production");

export const isPreview = (entry: { status: Publication }) => entry.status === "draft";

export const gallery = [
  { src: "/images/gallery-land.jpg", alt: "Aerial view of a neighbourhood taking shape", title: "Land Development", subtitle: "01 / BUILT ENVIRONMENT" },
  { src: "/images/gallery-realestate.jpg", alt: "Contemporary home exterior at dusk", title: "Real Estate", subtitle: "02 / BUILT ENVIRONMENT" },
  { src: "/images/gallery-construction.jpg", alt: "Tower cranes against the sky", title: "Construction", subtitle: "03 / BUILT ENVIRONMENT" },
  { src: "/images/gallery-investment.jpg", alt: "Financial charts on a trading screen", title: "Investment", subtitle: "04 / TRADE & SERVICES" },
  { src: "/images/gallery-trade.jpg", alt: "Cargo ship loaded with containers at sea", title: "Import & Export", subtitle: "05 / TRADE & SERVICES" },
  { src: "/images/gallery-resort.jpg", alt: "Resort pool viewed from above", title: "Hotels & Resorts", subtitle: "06 / HOSPITALITY" },
  { src: "/images/gallery-marketing.jpg", alt: "Team reviewing campaign materials together", title: "Marketing Services", subtitle: "07 / TRADE & SERVICES" },
];
