export type Publication = "draft" | "published";
export type SectorGroup = "Built environment" | "Trade & services";

export type Business = {
  slug: string;
  name: string;
  index: string;
  group: SectorGroup;
  headline: string;
  step: string;
  need: string;
  notes: string[];
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
  detailImage: string;
  detailImageAlt: string;
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

// Sector copy describes what each business does in general terms. Do not add figures, clients,
// locations or project claims here until they have been verified and approved.
export const businesses: Business[] = [
  { slug: "land-development", name: "Land Development", index: "01", group: "Built environment", headline: "Everything starts with ground.", step: "Secures and prepares the ground the rest is built on.", need: "A plot of land, or the search for one", notes: ["Finding land that suits the intended use, then checking title, access and constraints before anything is committed.", "Bringing adjoining parcels together where a single plot is too small for a good plan.", "Roads, services and plot layout resolved early, so later stages start on prepared ground."], description: "We find, assemble and prepare land, with access, services and layout resolved, so a plot is ready to become a place.", image: "/images/gallery-land.jpg", imageAlt: "Aerial view of a master-planned residential community", status: "published", services: ["Site identification", "Land assembly", "Layout & infrastructure"] },
  { slug: "real-estate", name: "Real Estate", index: "02", group: "Built environment", headline: "Addresses worth keeping.", step: "Turns prepared land into homes and commercial addresses.", need: "Homes or commercial space to plan, sell or let", notes: ["Homes planned around how people actually live: light, storage, outlook and privacy.", "Offices, shops and mixed-use space designed for the tenants who will occupy them.", "Pricing, sales and leasing handled with straight answers and clear paperwork."], description: "Homes and commercial spaces planned around daily life and finished to hold their value long after handover.", image: "/images/gallery-realestate.jpg", imageAlt: "Contemporary luxury residential architecture at dusk", status: "published", services: ["Residential", "Commercial", "Sales & leasing"] },
  { slug: "construction", name: "Construction", index: "03", group: "Built environment", headline: "Drawn once. Built properly.", step: "Raises the structure, floor by floor.", need: "Drawings that need to become a building", notes: ["Structures built to the drawings, in the right order, with site safety treated as part of the job.", "Foundations, frames and the civil works that sit below and around a building.", "Interiors and finishes completed to the standard a building is remembered for."], description: "We turn drawings into structure, with the sequencing, safety and finish a building is judged by.", image: "/images/infrastructure.jpg", imageAlt: "Cranes above a large urban construction site", status: "published", services: ["Building works", "Civil & structural", "Fit-out & finishing"] },
  { slug: "investment", name: "Investment", index: "04", group: "Trade & services", headline: "Capital with patience.", step: "Funds the work and holds what lasts.", need: "Capital to place, or a project that needs it", notes: ["Opportunities tested on numbers, site and timing before any money moves.", "Participation sized to the opportunity and set out in clear terms for every partner.", "Completed assets held and maintained for income over the long term."], description: "We back opportunities we understand, size them carefully and stay with them through the cycle.", image: "/images/tower.jpg", imageAlt: "Contemporary glass towers rising against the sky", status: "published", services: ["Opportunity appraisal", "Structured participation", "Long-hold assets"] },
  { slug: "import-export", name: "Import & Export", index: "05", group: "Trade & services", headline: "Goods across borders.", step: "Moves materials and merchandise between markets.", need: "Goods or materials to move between markets", notes: ["Finding reliable suppliers for materials and merchandise, and checking them before orders are placed.", "Freight booked, documents prepared and customs cleared without last-minute surprises.", "Delivery to site, store or warehouse on the date that was agreed."], description: "Sourcing, shipping and clearing goods between markets, with the paperwork in order and the timing kept.", image: "/images/import-export.jpg", imageAlt: "Aerial view of shipping containers in a port", status: "published", services: ["Sourcing", "Freight & clearance", "Distribution"] },
  { slug: "hotels-resorts", name: "Hotels & Resorts", index: "06", group: "Built environment", headline: "The art of arrival.", step: "Opens the doors and looks after the guest.", need: "A hotel, resort or guest experience to run", notes: ["City hotels planned around the guest who arrives tired and leaves rested.", "Resort places designed with the landscape, not imposed on it.", "Daily operations: front of house, rooms, food and the many small details guests notice."], description: "Hospitality runs on small things done well: the welcome, the room, the table and the reason to return.", image: "/images/hotel-resorts.jpg", imageAlt: "Resort swimming pool surrounded by palm trees", status: "published", services: ["Hotels", "Resorts", "Guest operations"] },
  { slug: "marketing-services", name: "Marketing Services", index: "07", group: "Trade & services", headline: "Make it known.", step: "Gives every project a name and a voice.", need: "A project, place or launch to make known", notes: ["A clear position and a name that people remember after one hearing.", "Campaigns built for the people a project is meant to reach, and measured against that.", "Openings and launches planned so the first impression is the right one."], description: "Positioning, campaigns and launches that give a project a name people remember and a reason to visit.", image: "/images/marketing-services.jpg", imageAlt: "Creative studio materials arranged on a desk", status: "published", services: ["Brand & positioning", "Campaigns", "Launches"] },
];

export const serviceLenses = [
  { index: "01", title: "Appraise", description: "Study the site, the market and the figures, then say plainly whether it works.", theme: "READ" },
  { index: "02", title: "Plan", description: "Fix the scope, budget and programme, and put them in writing.", theme: "COMMIT" },
  { index: "03", title: "Deliver", description: "Coordinate the people, materials and approvals the work depends on.", theme: "BUILD" },
  { index: "04", title: "Operate", description: "Run, maintain and improve what has been built.", theme: "STAY" },
] as const;

export const projects: Project[] = [
  { slug: "study-in-form", title: "Study in Form", category: "Architecture", description: "An editorial exploration of structural rhythm and light. This is not a JD CORP project.", image: "/images/hero.jpg", imageAlt: "Illustrative sculptural modernist building against the sky", detailImage: "/images/composition-walnut-portal.jpg", detailImageAlt: "Conceptual walnut and stone portal material study", status: "published" },
  { slug: "urban-perspective", title: "Urban Perspective", category: "Urbanism", description: "An illustrative look at density, material, and the contemporary city. This is not a JD CORP project.", image: "/images/tower.jpg", imageAlt: "Illustrative glass office towers seen from below", detailImage: "/images/composition-brass-inlay.jpg", detailImageAlt: "Conceptual brass inlay against dark stone", status: "published" },
  { slug: "inside-out", title: "Inside / Out", category: "Interiors", description: "A visual study of space and atmosphere. This is not a JD CORP project.", image: "/images/interior.jpg", imageAlt: "Illustrative contemporary workspace interior", detailImage: "/images/composition-ivory-joinery.jpg", detailImageAlt: "Conceptual ivory stone and walnut joinery", status: "published" },
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
