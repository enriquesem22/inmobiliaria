import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Building2, Route, Users, Check } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { PropertyForm } from "@/components/forms/PropertyForm";
import { FinalCta } from "@/components/sections/FinalCta";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { zonas, getZona } from "@/data/zonas";

export function generateStaticParams() {
  return zonas.map((z) => ({ slug: z.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const zona = getZona(params.slug);
  if (!zona) return {};
  return {
    title: `Inmobiliaria en ${zona.name}`,
    description: zona.metaDescription,
    alternates: { canonical: `/zonas/${zona.slug}` },
  };
}

export default function ZonaPage({ params }: { params: { slug: string } }) {
  const zona = getZona(params.slug);
  if (!zona) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Zonas", href: "/zonas" },
          { name: zona.name, href: `/zonas/${zona.slug}` },
        ]}
      />
      <PageHeader
        eyebrow={zona.base ? "Nuestra base · Aljarafe" : "Aljarafe"}
        title={`Inmobiliaria en ${zona.name}`}
        subtitle={zona.claim}
        breadcrumbs={[
          { name: "Inicio", href: "/" },
          { name: "Zonas", href: "/zonas" },
          { name: zona.name, href: `/zonas/${zona.slug}` },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="prose-brand">
              {zona.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-10 text-2xl text-pine-900">
              El mercado de vivienda en {zona.name}
            </h2>
            <ul className="mt-5 space-y-3">
              {zona.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pine-100 text-pine-700">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="text-[15px] text-stone-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-cream p-5">
              <div className="flex items-center gap-2 text-pine-700">
                <Building2 className="h-5 w-5" aria-hidden />
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  Tipo de vivienda
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {zona.housing}
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-cream p-5">
              <div className="flex items-center gap-2 text-pine-700">
                <Route className="h-5 w-5" aria-hidden />
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  Conexiones
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {zona.connectivity}
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-cream p-5">
              <div className="flex items-center gap-2 text-pine-700">
                <Users className="h-5 w-5" aria-hidden />
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  Perfil habitual
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {zona.profile}
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="pine">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pine-800 text-clay-300">
              <MapPin className="h-6 w-6" aria-hidden />
            </span>
          </div>
          <h2 className="text-3xl text-white sm:text-4xl">
            Tienes una vivienda en {zona.name}?
          </h2>
          <p className="mt-4 text-lg text-pine-100">
            Analizamos su valor real teniendo en cuenta el micromercado concreto
            de {zona.name}, no una media generica.
          </p>
        </div>
      </Section>

      <LeadFormSection
        eyebrow={`Valoracion en ${zona.name}`}
        title={`Solicita la valoracion de tu vivienda en ${zona.name}`}
        description="Gratuita y sin compromiso. Te contactamos para concretar la visita."
      >
        <PropertyForm type="valoracion" />
      </LeadFormSection>

      <FinalCta />
    </>
  );
}
