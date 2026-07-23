import Link from "next/link";
import { Home, Scroll, TrendingUp, Search } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const profiles = [
  {
    icon: Home,
    title: "Propietarios",
    text: "Quieres vender y saber el valor real de tu vivienda, sin perder tiempo y con acompanamiento profesional.",
    href: "/vender",
    cta: "Quiero vender",
  },
  {
    icon: Scroll,
    title: "Herederos",
    text: "Recibes una vivienda en herencia y necesitas valoracion, coordinacion entre herederos y gestion de la venta.",
    href: "/vender",
    cta: "Vivienda heredada",
  },
  {
    icon: TrendingUp,
    title: "Inversores",
    text: "Buscas oportunidades por debajo de mercado, con estudios de rentabilidad y gestion integral de la inversion.",
    href: "/inversores",
    cta: "Busco oportunidades",
  },
  {
    icon: Search,
    title: "Colaboradores",
    text: "Conoces a alguien que quiere vender o detectas oportunidades. Si la operacion se cierra, hay compensacion.",
    href: "/colaboradores",
    cta: "Quiero colaborar",
  },
];

export function ClientProfiles() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Para quien trabajamos"
        title="Te ayudamos, sea cual sea tu situacion"
        align="center"
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {profiles.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className="group flex flex-col rounded-2xl border border-stone-200 bg-cream p-6 transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-pine-700 shadow-sm">
              <p.icon className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="mt-5 text-lg">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
              {p.text}
            </p>
            <span className="mt-4 text-sm font-medium text-clay-600 group-hover:text-clay-700">
              {p.cta} &rarr;
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
