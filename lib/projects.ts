import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ProjectMeta = {
  title: string;
  slug: string;
  year: number;
  role: string;
  tools: string[];
  detailTools: string[];
  summary: string;
  kind:
    "booking" | "manufacturing" | "inventory" | "inventory-app" | "makeup-site";
  description: string;
  features: string[];
  featured: boolean;
  order: number;
  link?: string;
  repo?: string;
};

export type Project = ProjectMeta & { content: string };

const DIR = path.join(process.cwd(), "content/projects");

function readAll(): Project[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data, content } = matter(raw);
      return { ...(data as ProjectMeta), content };
    })
    .sort((a, b) => a.order - b.order);
}

export function getProjects(): Project[] {
  return readAll();
}

export function getFeatured(): ProjectMeta[] {
  return readAll()
    .filter((p) => p.featured)
    .slice(0, 6)
    .map(({ content: _c, ...meta }) => meta);
}

export function getProject(slug: string) {
  const all = readAll();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  return { project: all[i], next: all[(i + 1) % all.length] };
}
