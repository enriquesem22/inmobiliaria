import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/sections/FinalCta";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Gestion de reformas para vender o alquilar mejor",
  description:
    "Estudiamos si una reforma aumenta el valor de tu vivienda y coordinamos la obra: reforma ligera, home staging, cocinas, banos, redistribucion, preparacion para alquiler y reforma integral.",
  alternates: { canonical: "/reformas" },
};

const servicesList = [
  { title: "Reforma ligera", text: "Mejoras puntuales con gran impacto visual y buen retorno." },
  { title: "Home staging", text: "Preparamos la vivienda para que se venda antes y mejor." },
  { title: "Redistribucion", text: "Replanteamos espacios para ganar funcionalidad y valor." },
  { title: "Cocinas y banos", text: "Las estancias que mas influyen en la decision de compra." },
  { title: "Preparacion para alquiler", text: "Dejamos la vivienda lista para alquilar con buenas garantias." },
  { title: "Reforma integral", text: "Cuando el potencial del inmueble justifica una intervencion completa." },
  { title: "Gestion de presupuestos", text: "Comparamos y ordenamos presupuestos para que decidas con claridad." },
  { title: "Coordinacion de obra", text: "Coordinamos gremios y plazos para que no tengas que preocuparte." },
];

export default function ReformasPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Reformas", href: "/reformas" },
        ]}
      />
      <PageHeader
        eyebrow="Reformas"
        title="Reformar o no reformar? Lo decidimos con numeros"
        subtitle="No toda reforma aumenta el valor de venta. Estudiamos cada caso para invertir solo donde tiene sentido."
        breadcrumbs={[
          { name: "Inicio", href: "/" },
          { name: "Reformas", href: "/reformas" },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/valoracion" size="lg">
            Estudiar mi caso
          </Button>
          <Button href="/contacto" variant="outline" size="lg">
            Hablar con el equipo
          </Button>
        </div>
      </PageHeader>

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Nuestro enfoque"
            title="Una reforma solo merece la pena si mejora el resultado"
          />
          <div className="prose-brand mt-6">
            <p>
              Antes de tocar nada, analizamos si una reforma va a mejorar de
              verdad el precio de venta o la rentabilidad del alquiler. A veces
              la respuesta es hacer una intervencion ligera y bien dirigida; otras,
              una reforma integral; y en ocasiones, no reformar y vender tal cual.
            </p>
            <p>
              Con un arquitecto y analista inmobiliario en el equipo, podemos
              estimar costes, plazos y el valor despues de reforma antes de
              empezar. Asi tomas la decision con datos, no por intuicion.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading
          eyebrow="Que podemos coordinar"
          title="Servicios de reforma y mejora"
          subtitle="Coordinamos reformas para mejorar el valor de venta, preparar el alquiler o ejecutar flips."
        />
        <div className="mt-12">
          <FeatureGrid items={servicesList} columns={2} />
        </div>
      </Section>

      <FinalCta
        title="Quieres saber si te conviene reformar antes de vender?"
        subtitle="Analizamos tu vivienda y te decimos si la reforma suma valor."
        primaryHref="/valoracion"
        primaryLabel="Solicitar analisis"
      />
    </>
  );
}
