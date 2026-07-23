import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Button } from "@/components/ui/Button";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { InversorForm } from "@/components/forms/InversorForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Inversion inmobiliaria en el Aljarafe",
  description:
    "Buscamos y analizamos viviendas con potencial de inversion en Sevilla y el Aljarafe: rentabilidad, alquiler, flips, reforma, precio maximo de compra y gestion integral.",
  alternates: { canonical: "/inversores" },
};

const services = [
  { title: "Busqueda de oportunidades", text: "Detectamos viviendas con potencial, incluso antes de salir al mercado." },
  { title: "Analisis de rentabilidad", text: "Calculamos la rentabilidad esperada de cada operacion con criterio." },
  { title: "Estudio de alquiler", text: "Estimamos ingresos y demanda de alquiler en la zona." },
  { title: "Estimacion de reforma", text: "Valoramos el coste de reforma y el valor despues de reforma." },
  { title: "Precio maximo de compra", text: "Definimos hasta cuanto tiene sentido pagar para que la operacion funcione." },
  { title: "Estrategia de salida", text: "Decidimos si conviene vender o alquilar, y con que plazos." },
  { title: "Flips inmobiliarios", text: "Comprar, reformar y vender con una estrategia clara de margen." },
  { title: "Gestion integral", text: "Coordinamos compra, reforma y venta o alquiler de principio a fin." },
];

export default function InversoresPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Inversores", href: "/inversores" },
        ]}
      />
      <PageHeader
        eyebrow="Para inversores"
        title="Oportunidades de inversion con analisis, no con intuicion"
        subtitle="Aplicamos criterio tecnico y financiero para encontrar viviendas que realmente funcionen como inversion en el Aljarafe."
        breadcrumbs={[
          { name: "Inicio", href: "/" },
          { name: "Inversores", href: "/inversores" },
        ]}
      >
        <Button href="#formulario" size="lg">
          Enviar mi perfil de inversion
        </Button>
      </PageHeader>

      <Section>
        <SectionHeading
          eyebrow="Que ofrecemos"
          title="Del analisis a la gestion integral"
          subtitle="Te acompanamos en todo el ciclo de la inversion, con la ventaja de contar con un arquitecto y analista inmobiliario en el equipo."
        />
        <div className="mt-12">
          <FeatureGrid items={services} columns={2} />
        </div>
      </Section>

      <Section tone="pine">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl text-white sm:text-4xl">
            Una vivienda no es una buena inversion por ser barata
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-pine-100">
            Lo es cuando los numeros cuadran: coste de compra, reforma,
            impuestos, tiempos y valor final. Analizamos cada operacion como si
            fuera nuestra, porque a medio plazo tambien invertimos con nuestro
            propio patrimonio.
          </p>
        </div>
      </Section>

      <LeadFormSection
        eyebrow="Cuentanos tu objetivo"
        title="Definamos tu perfil de inversion"
        description="Con estos datos podremos avisarte cuando aparezca una oportunidad que encaje contigo."
      >
        <InversorForm />
      </LeadFormSection>

      <FinalCta
        title="Buscas una oportunidad de inversion?"
        subtitle="Cuentanos que buscas y trabajamos para encontrarla."
        primaryHref="#formulario"
        primaryLabel="Enviar mi perfil"
      />
    </>
  );
}
