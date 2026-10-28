import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { businesses, insights, projects } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/businesses", "/projects", "/services", "/sustainability", "/insights", "/careers", "/contact", "/privacy", "/terms"];
  return [...routes, ...businesses.filter((item) => item.status === "published").map((item) => `/businesses/${item.slug}`), ...projects.filter((item) => item.status === "published").map((item) => `/projects/${item.slug}`), ...insights.filter((item) => item.status === "published").map((item) => `/insights/${item.slug}`)].map((route) => ({ url: `${site.url}${route}`, changeFrequency: "monthly" as const, priority: route ? .6 : 1 }));
}
