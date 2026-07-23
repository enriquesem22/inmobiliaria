import type { Metadata } from "next";
import { Users, HandCoins, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { ColaboradorForm } from "@/components/forms/ColaboradorForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Colabora y gana con cada operacion",
  description:
    "Conoces a alguien que quiere vender una vivienda en el Aljarafe? Envianos la oportunidad. Si la operacion se cierra, podras recibir una compensacion.",
  alternates: { canonical: "/colaboradores" },
};

const whoCanCollaborate = [
  "Vecinos y conocidos",
  "Porteros y conserjes",
  "Administradores de fincas",
  "Abogados y gestores",
  "Reformistas, electricistas y fontaneros",
  "Agentes independientes",
  "Cualquiera que conozca a un propietario interesado en vender",
];

const how = [
  {
    icon: Users,
    title: "1. Nos cuentas la oportunidad",
    text: "Rellena el formulario con lo que sepas. No hace falta que sea informacion exacta ni completa.",
  },
  {
    icon: ShieldCheck,
    title: "2. La estudiamos con discrecion",
    text: "Analizamos la oportunidad y contactamos con el propietario de forma profesional y respetuosa.",
  },
  {
    icon: HandCoins,
    title: "3. Si se cierra, te compensamos",
    text: "Si la operacion llega a buen puerto, hablamos de tu compensacion por la colaboracion.",
  },
];

export default function ColaboradoresPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Colaboradores", href: "/colaboradores" },
        ]}
      />
      <PageHeader
        eyebrow="Colaboradores"
        title="Conoces una vivienda que podria venderse? Hablemos"
        subtitle="Estamos creando una red de personas que detectan oportunidades inmobiliarias. Si tu aviso termina en operacion, recibes una compensacion."
        breadcrumbs={[
          { name: "Inicio", href: "/" },
          { name: "Colaboradores", href: "/colaboradores" },
        ]}
      >
        <Button href="#formulario" size="lg">
          Enviar una oportunidad
        </Button>
      </PageHeader>

      <Section>
        <SectionHeading
          eyebrow="Como funciona"
          title="Sencillo, transparente y sin compromiso"
          align="center"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {how.map((item) => (
            <div key={item.title} className="rounded-2xl border border-stone-200 bg-white p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-clay-50 text-clay-600">
                <item.icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Quien puede colaborar"
              title="Cualquiera que conozca una oportunidad"
              subtitle="No necesitas experiencia inmobiliaria. Solo conocer a alguien que quiera o pueda vender."
            />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {whoCanCollaborate.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <LeadFormSection
        eyebrow="Envia tu oportunidad"
        title="Cuentanos lo que sepas"
        description="Trataremos la informacion con total discrecion. Cuantos mas datos, mejor podremos valorarla."
        tone="default"
      >
        <ColaboradorForm />
      </LeadFormSection>

      <FinalCta
        title="Tienes una oportunidad en mente?"
        subtitle="Envianosla. Si se cierra, te compensamos."
        primaryHref="#formulario"
        primaryLabel="Enviar oportunidad"
      />
    </>
  );
}
