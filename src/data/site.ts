export const site = {
  name: "JD CORP",
  description: "JD CORP brings a connected perspective to land development, real estate, construction, investment, trade, hospitality and marketing.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contactEmail: null as string | null,
  social: [] as { label: string; href: string }[],
};

export const navigation = [
  { label: "About", href: "/about" },
  { label: "Sectors", href: "/businesses" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
];
