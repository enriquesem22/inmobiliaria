import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const points = [
  "Valoracion detallada del precio de mercado",
  "Estudio del micromercado y del barrio",
  "Comparacion con viviendas similares",
  "Recomendacion del precio de salida",
  "Estimacion del precio probable de cierre",
  "Analisis sobre si conviene reformar antes de vender",
  "Preparacion y presentacion profesional del inmueble",
  "Acceso a una base de compradores e inversores",
  "Gestion integral de la venta",
];

export function ValueProposition() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <Eyebrow>Nuestra propuesta</Eyebrow>
          <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">
            No solo vendemos viviendas.{" "}
            <span className="text-clay-600">Analizamos como maximizar su valor.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-stone-600">
            Ayudamos a cada propietario a tomar la mejor decision con datos,
            criterio tecnico y una estrategia personalizada. Este es el trabajo
            que hay detras de cada venta.
          </p>
          <div className="mt-8">
            <Button href="/valoracion" size="lg">
              Solicitar valoracion gratuita
            </Button>
          </div>
        </div>

        <ul className="grid gap-3 rounded-2xl border border-stone-200 bg-white p-6 sm:grid-cols-1 sm:p-8">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pine-100 text-pine-700">
                <Check className="h-3.5 w-3.5" aria-hidden />
              </span>
              <span className="text-[15px] text-stone-700">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
