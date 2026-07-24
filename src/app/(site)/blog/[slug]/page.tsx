import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getPost, getPostSlugs, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        date={post.date}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <header className="border-b border-stone-200/70 bg-gradient-to-b from-cream to-bone">
        <Container className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-pine-800"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Volver al blog
            </Link>
            <div className="mt-6 flex items-center gap-3 text-xs">
              <span className="rounded-full bg-pine-50 px-2.5 py-1 font-medium text-pine-700">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-stone-400">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                {formatDate(post.date)}
              </span>
              <span className="text-stone-400">{post.readingTime}</span>
            </div>
            <h1 className="mt-4 text-4xl leading-[1.12] sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-stone-600">
              {post.description}
            </p>
          </div>
        </Container>
      </header>

      <Section>
        <article className="prose-brand mx-auto max-w-3xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </article>
      </Section>

      <FinalCta />
    </>
  );
}
