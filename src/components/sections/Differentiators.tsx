import { differentiators } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Differentiators() {
  return (
    <Section tone="pine">
      <SectionHeading
        eyebrow="Por que somos diferentes"
        title="No somos una inmobiliaria tradicional"
        subtitle="Estudiamos tecnicamente cada vivienda y trabajamos con una vision de inversion a largo plazo."
        tone="light"
      />
      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {differentiators.map((item) => (
          <div key={item.title} className="flex gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pine-800 text-clay-300">
              <item.icon className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-pine-200">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
