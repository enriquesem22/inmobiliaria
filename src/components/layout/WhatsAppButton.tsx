import { whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/** Boton flotante de WhatsApp presente en toda la web. */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus-visible:scale-105 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
