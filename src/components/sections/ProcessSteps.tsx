import { sellingProcess } from "@/data/process";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function ProcessSteps({ withCta = true }: { withCta?: boolean }) {
  return (
    <Section id="proceso">
      <SectionHeading
        eyebrow="Como trabajamos"
        title="Un proceso claro, de la primera consulta a la firma"
        subtitle="Sin sorpresas y con transparencia en cada paso. Asi acompanamos a cada propietario."
      />
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sellingProcess.map((step) => (
          <li
            key={step.number}
            className="relative rounded-2xl border border-stone-200 bg-white p-6"
          >
            <span className="font-serif text-4xl font-semibold text-pine-100">
              {step.number}
            </span>
            <h3 className="mt-2 text-lg">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
      {withCta && (
        <div className="mt-10 flex justify-center">
          <Button href="/vender" size="lg">
            Empezar por la primera consulta
          </Button>
        </div>
      )}
    </Section>
  );
}
