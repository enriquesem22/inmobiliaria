import { TrendingUp, Handshake } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function DualCta() {
  return (
    <Section tone="cream">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col rounded-2xl border border-stone-200 bg-white p-8 sm:p-10">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
            <TrendingUp className="h-6 w-6" aria-hidden />
          </span>
          <h3 className="mt-5 text-2xl">Para inversores</h3>
          <p className="mt-3 flex-1 leading-relaxed text-stone-600">
            Buscamos y analizamos viviendas con potencial: rentabilidad,
            estudio de alquiler, flips, reforma y precio maximo de compra.
            Gestion integral de tu inversion en el Aljarafe.
          </p>
          <div className="mt-6">
            <Button href="/inversores" variant="secondary">
              Ver oportunidades de inversion
            </Button>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-clay-200 bg-clay-50 p-8 sm:p-10">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-clay-600">
            <Handshake className="h-6 w-6" aria-hidden />
          </span>
          <h3 className="mt-5 text-2xl">Colabora con nosotros</h3>
          <p className="mt-3 flex-1 leading-relaxed text-stone-700">
            &iquest;Conoces a alguien que quiera vender una vivienda? Envianos la
            informacion. Si la operacion se cierra, podras recibir una
            compensacion.
          </p>
          <div className="mt-6">
            <Button href="/colaboradores">Enviar una oportunidad</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
