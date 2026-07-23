import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { zonas, zonasFuturas } from "@/data/zonas";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ZonesSection() {
  return (
    <Section tone="cream" id="zonas">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Donde trabajamos"
          title="Especializados en el Aljarafe"
          subtitle="Conocemos cada municipio: su mercado, sus barrios y su tipo de comprador."
          className="max-w-xl"
        />
        <Link
          href="/zonas"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-600 hover:text-clay-700"
        >
          Ver todas las zonas
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {zonas.map((zona) => (
          <Link
            key={zona.slug}
            href={`/zonas/${zona.slug}`}
            className="group flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white px-5 py-4 transition-colors hover:border-pine-300 hover:bg-pine-50"
          >
            <span className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-clay-500" aria-hidden />
              <span className="font-medium text-pine-900">{zona.name}</span>
            </span>
            <ArrowRight className="h-4 w-4 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:text-pine-700" aria-hidden />
          </Link>
        ))}
      </div>

      <p className="mt-6 text-sm text-stone-500">
        Proximamente ampliaremos a {zonasFuturas.join(" y ")}.
      </p>
    </Section>
  );
}
