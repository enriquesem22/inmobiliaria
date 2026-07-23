import type { Metadata } from "next";
import {
  Building2,
  Handshake,
  Briefcase,
  Cpu,
  Heart,
  MapPinned,
  ShieldCheck,
  LineChart,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/sections/FinalCta";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Sobre nosotros: una empresa familiar del Aljarafe",
  description:
    "Somos una empresa familiar de servicios e inversion inmobiliaria en el Aljarafe. Combinamos conocimiento tecnico, comercial y empresarial, con transparencia y vision a largo plazo.",
  alternates: { canonical: "/nosotros" },
};

const values = [
  { icon: Heart, title: "Origen familiar", text: "Somos un proyecto familiar, con la implicacion y el compromiso que eso supone." },
  { icon: MapPinned, title: "Conocimiento de la zona", text: "Vivimos y trabajamos en el Aljarafe. Conocemos sus municipios y su mercado." },
  { icon: Building2, title: "Experiencia tecnica", text: "Un arquitecto y analista inmobiliario lidera el analisis de cada vivienda." },
  { icon: LineChart, title: "Vision de inversion", text: "Miramos cada operacion tambien desde la rentabilidad y el largo plazo." },
  { icon: ShieldCheck, title: "Transparencia", text: "Te contamos las cosas como son, aunque no siempre sea lo que se espera oir." },
  { icon: Handshake, title: "Relaciones a largo plazo", text: "Preferimos acompanarte bien una vez que prometerte de mas." },
];

const team = [
  {
    icon: Building2,
    name: "Enrique",
    role: "Arquitecto y analista inmobiliario",
    text: "Valoracion, analisis de inversiones, estudios de viabilidad, reformas y estrategia.",
  },
  {
    icon: Handshake,
    name: "Captacion y relacion comercial",
    role: "Experiencia previa en captacion inmobiliaria",
    text: "Captacion de propietarios, prospeccion, visitas, seguimiento y negociacion.",
  },
  {
    icon: Briefcase,
    name: "Estrategia y apoyo empresarial",
    role: "Experiencia empresarial",
    text: "Apoyo estrategico, contactos, negociacion y vision de empresa.",
  },
  {
    icon: Cpu,
    name: "Procesos y tecnologia",
    role: "Ingenieria",
    text: "Procesos, automatizacion, sistemas y datos para mejorar la operativa.",
  },
];

const vision = [
  "Flips propios",
  "Compra de viviendas",
  "Compra de pequenos edificios",
  "Promociones residenciales",
  "Inversion con terceros",
  "Creacion de patrimonio en alquiler",
];

export default function NosotrosPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Nosotros", href: "/nosotros" },
        ]}
      />
      <PageHeader
        eyebrow="Sobre nosotros"
        title="Una empresa familiar con enfoque tecnico y financiero"
        subtitle="Nacimos en Castilleja de Guzman, en el corazon del Aljarafe, con una idea: ayudar a los propietarios a tomar mejores decisiones sobre su vivienda."
        breadcrumbs={[
          { name: "Inicio", href: "/" },
          { name: "Nosotros", href: "/nosotros" },
        ]}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="prose-brand">
            <p>
              No queremos ser una inmobiliaria mas. Somos una empresa de
              servicios e inversion inmobiliaria que combina el conocimiento de
              un arquitecto y analista, la experiencia comercial en captacion, la
              vision empresarial y la mejora de procesos y tecnologia.
            </p>
            <p>
              Empezamos centrandonos en la intermediacion, ayudando a vender
              viviendas con estrategia y a encontrar oportunidades de inversion.
              Nuestro objetivo a largo plazo es crecer de forma seria y
              sostenible, siempre desde la transparencia y el conocimiento local.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading
          eyebrow="Como somos"
          title="Lo que nos define"
        />
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="flex gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-pine-700 shadow-sm">
                <value.icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-semibold text-pine-900">{value.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{value.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="El equipo"
          title="Conocimiento tecnico, comercial y empresarial"
          subtitle="Un equipo que combina perfiles complementarios para cuidar cada fase del proceso."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="rounded-2xl border border-stone-200 bg-white p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
                <member.icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg">{member.name}</h3>
              <p className="mt-1 text-sm font-medium text-clay-600">{member.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{member.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="pine">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Vision a largo plazo"
              title="Empezamos por la intermediacion, con una meta mas amplia"
              subtitle="Queremos evolucionar de forma progresiva, sin ofrecer hoy servicios que todavia no podemos ejecutar."
              tone="light"
            />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {vision.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-pine-700 bg-pine-800/60 px-4 py-3 text-sm text-pine-50"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="cream">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-2xl text-pine-900 sm:text-3xl">
            Hablemos de tu vivienda
          </h2>
          <p className="mt-3 text-stone-600">
            Estes donde estes en el proceso, podemos ayudarte a decidir con
            criterio.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/valoracion" size="lg">
              Solicitar valoracion gratuita
            </Button>
            <Button href="/contacto" variant="outline" size="lg">
              Contactar
            </Button>
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
