import { MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/data/site";
import { zonas } from "@/data/zonas";
import { ValuationCard } from "./ValuationCard";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-bone">
      {/* Trama geometrica sutil de fondo (referencia a plano/arquitectura) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#1E3327 1px, transparent 1px), linear-gradient(90deg, #1E3327 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <Container className="relative">
        <div className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-8 lg:py-28">
          <div className="animate-fade-up">
            <Eyebrow>Sevilla &middot; Especialistas en el Aljarafe</Eyebrow>
            <h1 className="mt-5 text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              Maximizamos el valor de tu vivienda antes de venderla.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
              Valoracion, estrategia, reforma y venta de viviendas en Sevilla y
              el Aljarafe. No solo publicamos anuncios: analizamos como sacar el
              maximo partido a tu inmueble.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/valoracion" size="lg">
                Solicita tu valoracion gratuita
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                href={whatsappLink()}
                external
                variant="outline"
                size="lg"
              >
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                Hablar por WhatsApp
              </Button>
            </div>

            <div className="mt-8 flex items-start gap-2 text-sm text-stone-500">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay-500" aria-hidden />
              <p>
                {zonas
                  .slice(0, 6)
                  .map((z) => z.name)
                  .join(" &middot; ")
                  .replace(/&middot;/g, "·")}{" "}
                y mas zonas del Aljarafe.
              </p>
            </div>
          </div>

          <div className="animate-fade-up lg:justify-self-end" style={{ animationDelay: "120ms" }}>
            <ValuationCard />
          </div>
        </div>
      </Container>
    </section>
  );
}
