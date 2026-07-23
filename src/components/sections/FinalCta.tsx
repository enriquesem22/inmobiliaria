import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/data/site";

export function FinalCta({
  title = "Solicita una valoracion gratuita de tu vivienda",
  subtitle = "Sin compromiso. Analizamos tu inmueble y te decimos como maximizar su valor antes de venderlo.",
  primaryHref = "/valoracion",
  primaryLabel = "Solicitar valoracion gratuita",
}: {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="bg-pine-900 py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl leading-tight text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-pine-100">{subtitle}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={primaryHref} size="lg">
              {primaryLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href={whatsappLink()} external variant="white" size="lg">
              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
              Hablar por WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
