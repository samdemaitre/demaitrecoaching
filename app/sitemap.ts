import type { MetadataRoute } from "next";

const BASE_URL = "https://demaitrecoaching.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about/meet-the-coach",
    "/about/why-us",
    "/about/our-goals",
    "/services/personal-training",
    "/services/hybrid-coaching",
    "/services/online-coaching",
    "/faq",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
