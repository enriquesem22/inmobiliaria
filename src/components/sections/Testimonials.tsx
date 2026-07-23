import { Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Espacio preparado para testimonios. No se muestran testimonios
 * inventados: cuando existan opiniones reales de clientes, se anaden
 * en el array `testimonials` y esta seccion los renderizara.
 */
type Testimonial = { quote: string; author: string; context?: string };

const testimonials: Testimonial[] = [];

export function Testimonials() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Confianza"
        title="Lo que dicen nuestros clientes"
        align="center"
      />

      {testimonials.length > 0 ? (
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6"
            >
              <Quote className="h-6 w-6 text-clay-400" aria-hidden />
              <blockquote className="mt-4 flex-1 text-stone-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-pine-900">
                {t.author}
                {t.context && (
                  <span className="block font-normal text-stone-500">
                    {t.context}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-dashed border-stone-300 bg-cream p-8 text-center">
          <Quote className="mx-auto h-8 w-8 text-stone-300" aria-hidden />
          <p className="mt-4 text-stone-600">
            Estamos empezando y preferimos construir nuestra reputacion con
            hechos. Iremos publicando aqui las opiniones de nuestros clientes a
            medida que cerremos operaciones.
          </p>
        </div>
      )}
    </Section>
  );
}
