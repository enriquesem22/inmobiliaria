import { site } from "@/data/site";
import { zonas } from "@/data/zonas";

/** Inserta un bloque JSON-LD de datos estructurados. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es estatico y controlado por nosotros.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Datos de la empresa como negocio inmobiliario local. */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        name: site.name,
        description: site.description,
        url: site.url,
        email: site.email,
        telephone: site.phone,
        areaServed: zonas.map((z) => ({
          "@type": "City",
          name: z.name,
        })),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Castilleja de Guzman",
          addressRegion: "Sevilla",
          addressCountry: "ES",
        },
        knowsAbout: [
          "Valoracion inmobiliaria",
          "Venta de viviendas",
          "Inversion inmobiliaria",
          "Reformas",
        ],
      }}
    />
  );
}

/** Migas de pan estructuradas. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${site.url}${item.href}`,
        })),
      }}
    />
  );
}

/** Articulo del blog. */
export function ArticleJsonLd({
  title,
  description,
  slug,
  date,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        datePublished: date,
        author: { "@type": "Organization", name: site.name },
        publisher: { "@type": "Organization", name: site.name },
        mainEntityOfPage: `${site.url}/blog/${slug}`,
      }}
    />
  );
}

/** Preguntas frecuentes estructuradas. */
export function FaqJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}
