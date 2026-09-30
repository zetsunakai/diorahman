import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...getProjects().map((p) => ({ url: `${site.url}/karya/${p.slug}`, priority: 0.8 })),
  ];
}
