import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Button } from "@/components/ui/Button";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { PropertyForm } from "@/components/forms/PropertyForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Vender tu vivienda con estrategia",
  description:
    "Te ayudamos a vender tu vivienda en el Aljarafe con una estrategia personalizada: valoracion, preparacion, comercializacion, negociacion y cierre. Valoracion gratuita.",
  alternates: { canonical: "/vender" },
};

const steps = [
  {
    title: "Como valoramos tu vivienda",
    text: "Analizamos comparables del barrio, el estado del inmueble y la demanda para estimar su valor real de mercado.",
  },
  {
    title: "Como fijamos el precio",
    text: "Diferenciamos entre valor de mercado, precio de salida recomendado y precio probable de cierre. Cada uno tiene su funcion.",
  },
  {
    title: "Que estrategia seguimos",
    text: "Definimos el publico objetivo, el plan de comercializacion y si conviene reformar antes de vender.",
  },
  {
    title: "Como presentamos el inmueble",
    text: "Fotografia profesional, planos, documentacion y una presentacion cuidada que marca la diferencia.",
  },
  {
    title: "Como filtramos compradores",
    text: "Seleccionamos y cualificamos a los interesados para que las visitas sean utiles y seguras.",
  },
  {
    title: "Como negociamos",
    text: "Gestionamos las ofertas con criterio y defendemos tu precio con datos, sin prisas.",
  },
];

export default function VenderPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Vender vivienda", href: "/vender" },
        ]}
      />
      <PageHeader
        eyebrow="Vender vivienda"
        title="Vende tu vivienda con una estrategia, no solo con un anuncio"
        subtitle="Te acompanamos desde la primera consulta hasta la firma, maximizando el valor de tu inmueble en cada paso."
        breadcrumbs={[
          { name: "Inicio", href: "/" },
          { name: "Vender vivienda", href: "/vender" },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#formulario" size="lg">
            Solicitar valoracion gratuita
          </Button>
          <Button href="/valoracion" variant="outline" size="lg">
            Como valoramos
          </Button>
        </div>
      </PageHeader>

      <Section>
        <SectionHeading
          eyebrow="El trabajo detras de cada venta"
          title="Todo lo que hacemos para vender mejor"
          subtitle="No nos limitamos a publicar tu vivienda en los portales. Trabajamos cada fase con metodo."
        />
        <div className="mt-12">
          <FeatureGrid items={steps} columns={3} />
        </div>
      </Section>

      <ProcessSteps withCta={false} />

      <LeadFormSection
        eyebrow="Primer paso"
        title="Cuentanos sobre tu vivienda"
        description="Rellena estos datos y te contactaremos para concretar la visita y la valoracion. Sin compromiso."
      >
        <PropertyForm type="vender" />
      </LeadFormSection>

      <FinalCta
        title="Empieza por conocer el valor real de tu vivienda"
        subtitle="Una valoracion honesta es el punto de partida para vender bien."
      />
    </>
  );
}
