import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ProjectMeta = {
  title: string;
  category: string;
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
  screenshot?: string;
  screenshotAlt?: string;
};

export type Project = ProjectMeta & { content: string };

const DIR = path.join(process.cwd(), "content/projects");
const PUBLIC = path.join(process.cwd(), "public");

// Only use an existing local raster asset with a meaningful alt text.
// Missing, remote, or incomplete screenshot entries keep the illustration.
function resolveScreenshot(data: Record<string, unknown>) {
  if (
    typeof data.screenshot !== "string" ||
    typeof data.screenshotAlt !== "string" ||
    !data.screenshotAlt.trim()
  )
    return {};
  if (!/^\/[\w./-]+\.(png|jpe?g|webp|avif)$/i.test(data.screenshot)) return {};
  const filename = path.resolve(PUBLIC, `.${data.screenshot}`);
  if (!filename.startsWith(`${PUBLIC}${path.sep}`)) return {};
  try {
    if (!fs.statSync(filename).isFile()) return {};
  } catch {
    return {};
  }
  return {
    screenshot: data.screenshot,
    screenshotAlt: data.screenshotAlt.trim(),
  };
}

function externalUrl(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return undefined;
  try {
    return new URL(value).protocol === "https:" ? value : undefined;
  } catch {
    return undefined;
  }
}

function readAll(): Project[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        ...(data as ProjectMeta),
        content,
        screenshot: undefined,
        screenshotAlt: undefined,
        ...resolveScreenshot(data),
        link: externalUrl(data.link),
        repo: externalUrl(data.repo),
      };
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
