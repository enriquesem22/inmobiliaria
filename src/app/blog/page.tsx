import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog inmobiliario del Aljarafe",
  description:
    "Guias practicas sobre valoracion, venta, herencias, reformas e inversion inmobiliaria en Sevilla y el Aljarafe.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />
      <PageHeader
        eyebrow="Blog"
        title="Guias para vender, invertir y decidir con criterio"
        subtitle="Contenido practico y honesto sobre el mercado inmobiliario del Aljarafe. Sin humo."
        breadcrumbs={[
          { name: "Inicio", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />

      <Section>
        {posts.length === 0 ? (
          <p className="text-stone-600">Pronto publicaremos nuestros primeros articulos.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-pine-50 px-2.5 py-1 font-medium text-pine-700">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-stone-400">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                    {formatDate(post.date)}
                  </span>
                </div>
                <h2 className="mt-4 text-xl leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:text-clay-700">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
                  {post.description}
                </p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 font-medium text-clay-600 group-hover:text-clay-700"
                  >
                    Leer articulo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                  <span className="text-stone-400">{post.readingTime}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>

      <FinalCta />
    </>
  );
}
