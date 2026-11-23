export const site = {
  name: "JD CORP",
  description: "JD CORP is one group with seven businesses: land development, real estate, construction, investment, import and export, hotels and resorts, and marketing services.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contactEmail: null as string | null,
  social: [] as { label: string; href: string }[],
};

export const navigation = [
  { label: "About", href: "/about" },
  { label: "Businesses", href: "/businesses" },
  { label: "How we engage", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Journal", href: "/insights" },
];
