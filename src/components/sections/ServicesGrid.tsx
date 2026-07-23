import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServicesGrid() {
  return (
    <Section tone="cream" id="servicios">
      <SectionHeading
        eyebrow="Que hacemos"
        title="Servicios pensados para maximizar el valor"
        subtitle="Combinamos analisis tecnico, conocimiento del mercado local y vision de inversion en cada operacion."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={service.href}
            className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-pine-200 hover:shadow-card"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pine-50 text-pine-700 transition-colors group-hover:bg-pine-100">
              <service.icon className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="mt-5 text-xl">{service.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
              {service.summary}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-clay-600">
              Saber mas
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
