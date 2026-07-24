import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { zonas, zonasFuturas } from "@/data/zonas";

export const metadata: Metadata = {
  title: "Zonas de actuacion en el Aljarafe",
  description:
    "Trabajamos en los principales municipios del Aljarafe: Castilleja de Guzman, Castilleja de la Cuesta, Gines, Bormujos, Mairena del Aljarafe, San Juan de Aznalfarache, Tomares y Gelves.",
  alternates: { canonical: "/zonas" },
};

export default function ZonasPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Zonas", href: "/zonas" },
        ]}
      />
      <PageHeader
        eyebrow="Zonas de actuacion"
        title="Especialistas en el Aljarafe, municipio a municipio"
        subtitle="Conocemos de cerca cada localidad: su mercado, sus barrios y el perfil de comprador. Elige tu municipio para saber mas."
        breadcrumbs={[
          { name: "Inicio", href: "/" },
          { name: "Zonas", href: "/zonas" },
        ]}
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {zonas.map((zona) => (
            <Link
              key={zona.slug}
              href={`/zonas/${zona.slug}`}
              className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-pine-200 hover:shadow-card"
            >
              <div className="flex items-center gap-2 text-clay-600">
                <MapPin className="h-4 w-4" aria-hidden />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {zona.base ? "Nuestra base" : "Aljarafe"}
                </span>
              </div>
              <h2 className="mt-3 text-xl">{zona.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
                {zona.claim}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-pine-800">
                Ver{" "}
                <span className="lowercase">inmobiliaria en {zona.name}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-stone-500">
          Proximamente ampliaremos nuestra actividad a {zonasFuturas.join(" y ")}.
        </p>
      </Section>

      <FinalCta />
    </>
  );
}
