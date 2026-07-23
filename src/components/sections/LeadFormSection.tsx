import { Section } from "@/components/ui/Section";

/**
 * Seccion con formulario destacado en tarjeta, con anclaje #formulario
 * para poder enlazarla desde los CTAs.
 */
export function LeadFormSection({
  id = "formulario",
  eyebrow,
  title,
  description,
  tone = "cream",
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  tone?: "default" | "cream";
  children: React.ReactNode;
}) {
  return (
    <Section id={id} tone={tone} className="scroll-mt-24">
      <div className="mx-auto max-w-3xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-600">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-3 text-3xl sm:text-4xl">{title}</h2>
        {description && (
          <div className="mt-4 text-lg leading-relaxed text-stone-600">
            {description}
          </div>
        )}
        <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          {children}
        </div>
      </div>
    </Section>
  );
}
