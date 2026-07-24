import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Button } from "@/components/ui/Button";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { PropertyForm } from "@/components/forms/PropertyForm";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Valoracion inmobiliaria en el Aljarafe",
  description:
    "Valoracion comercial y estrategica de tu vivienda en Sevilla y el Aljarafe, basada en comparables, micromercado y las caracteristicas reales del inmueble. Gratuita y sin compromiso.",
  alternates: { canonical: "/valoracion" },
};

const basis = [
  { title: "Datos reales del mercado", text: "Partimos de operaciones y ofertas reales, no de estimaciones genericas." },
  { title: "Comparables del barrio", text: "Comparamos con viviendas similares del mismo entorno inmediato." },
  { title: "Micromercado", text: "Analizamos la oferta y la demanda concreta de tu zona." },
  { title: "Caracteristicas del inmueble", text: "Planta, ascensor, orientacion, terraza, garaje, trastero, antiguedad..." },
  { title: "Estado de conservacion", text: "Valoramos el estado de la vivienda y del edificio." },
  { title: "Demanda y tiempos", text: "Estimamos el tiempo de comercializacion segun la demanda actual." },
  { title: "Potencial de reforma", text: "Analizamos si una reforma puede aumentar el valor de venta." },
  { title: "Tres referencias de precio", text: "Valor de mercado, precio de salida recomendado y precio probable de cierre." },
];

const faqs = [
  {
    question: "La valoracion es una tasacion oficial?",
    answer:
      "No. Se trata de una valoracion comercial y estrategica orientada a la venta, no de una tasacion hipotecaria oficial. Su objetivo es ayudarte a fijar el mejor precio y estrategia para vender.",
  },
  {
    question: "Cuanto cuesta la valoracion?",
    answer:
      "La valoracion inicial es gratuita y sin compromiso. Solo necesitamos los datos de la vivienda y, cuando proceda, una visita.",
  },
  {
    question: "Que diferencia hay entre valor de mercado, precio de salida y precio de cierre?",
    answer:
      "El valor de mercado es una estimacion del valor real del inmueble. El precio de salida es el precio con el que recomendamos publicar para atraer a los compradores adecuados. El precio probable de cierre es una estimacion de la cifra a la que suele cerrarse la operacion.",
  },
  {
    question: "En que zonas valorais?",
    answer:
      "Trabajamos principalmente en el Aljarafe (Castilleja de Guzman, Castilleja de la Cuesta, Gines, Bormujos, Mairena del Aljarafe, San Juan de Aznalfarache, Tomares y Gelves) y ampliaremos a Sevilla capital.",
  },
];

export default function ValoracionPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Valoracion", href: "/valoracion" },
        ]}
      />
      <FaqJsonLd items={faqs} />
      <PageHeader
        eyebrow="Valoracion inmobiliaria"
        title="Cuanto vale tu vivienda? Te lo decimos con datos"
        subtitle="Una valoracion comercial y estrategica basada en el mercado real de tu barrio, no en una cifra generica."
        breadcrumbs={[
          { name: "Inicio", href: "/" },
          { name: "Valoracion", href: "/valoracion" },
        ]}
      >
        <Button href="#formulario" size="lg">
          Solicitar valoracion gratuita
        </Button>
      </PageHeader>

      <Section>
        <SectionHeading
          eyebrow="En que nos basamos"
          title="Una valoracion seria se construye con criterio"
          subtitle="Estos son los factores que analizamos para estimar el valor de tu vivienda."
        />
        <div className="mt-12">
          <FeatureGrid items={basis} columns={2} />
        </div>
      </Section>

      <Section tone="cream">
        <div className="mx-auto max-w-3xl rounded-2xl border border-clay-200 bg-clay-50 p-6 sm:p-8">
          <div className="flex gap-4">
            <Info className="h-6 w-6 shrink-0 text-clay-600" aria-hidden />
            <div>
              <h2 className="text-xl text-pine-900">
                Valoracion comercial, no tasacion hipotecaria
              </h2>
              <p className="mt-2 leading-relaxed text-stone-700">
                Nuestra valoracion es una herramienta estrategica para vender
                mejor. No sustituye a una tasacion oficial homologada, que es la
                que solicitan los bancos para conceder una hipoteca. Si
                necesitas ese documento oficial, te orientamos sobre como
                obtenerlo.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Preguntas frecuentes" title="Dudas habituales sobre la valoracion" />
          <dl className="mt-10 divide-y divide-stone-200">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <dt className="text-lg font-semibold text-pine-900">{faq.question}</dt>
                <dd className="mt-2 leading-relaxed text-stone-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <LeadFormSection
        eyebrow="Valoracion gratuita"
        title="Pide la valoracion de tu vivienda"
        description="Cuantos mas datos nos des, mas precisa sera la valoracion. Te contactaremos para completarla."
      >
        <PropertyForm type="valoracion" />
      </LeadFormSection>

      <FinalCta />
    </>
  );
}
