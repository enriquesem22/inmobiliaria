import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
};

export type Post = PostMeta & {
  content: string;
};

function readAll(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const words = content.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      category: String(data.category ?? "Guia"),
      readingTime: `${minutes} min de lectura`,
      content,
    };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPosts(): PostMeta[] {
  return readAll().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    category: post.category,
    readingTime: post.readingTime,
  }));
}

export function getPost(slug: string): Post | undefined {
  return readAll().find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return readAll().map((p) => p.slug);
}

/** Formatea una fecha ISO a texto legible en espanol. */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
