import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { zonas } from "@/data/zonas";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticPages = [
    "",
    "/vender",
    "/valoracion",
    "/inversores",
    "/colaboradores",
    "/reformas",
    "/nosotros",
    "/zonas",
    "/blog",
    "/contacto",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const zonePages = zonas.map((z) => ({
    url: `${base}/zonas/${z.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...zonePages, ...blogPages];
}
