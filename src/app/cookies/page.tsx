import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { LegalNotice } from "@/components/ui/LegalNotice";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Politica de cookies",
  description: "Informacion sobre el uso de cookies en este sitio web.",
  alternates: { canonical: "/cookies" },
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Politica de cookies"
        breadcrumbs={[
          { name: "Inicio", href: "/" },
          { name: "Politica de cookies", href: "/cookies" },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <LegalNotice />
          <div className="prose-brand">
            <h2>1. Que son las cookies</h2>
            <p>
              Las cookies son pequenos archivos que se descargan en tu dispositivo
              al navegar por determinadas paginas web y que permiten, entre otras
              cosas, recordar tus preferencias o analizar el uso del sitio.
            </p>

            <h2>2. Cookies que utilizamos</h2>
            <p>
              Actualmente este sitio utiliza unicamente cookies o almacenamiento
              tecnicos necesarios para su funcionamiento, incluida la que guarda tu
              eleccion sobre el aviso de cookies. Estas no requieren consentimiento.
            </p>
            <p>
              Si en el futuro se incorporan cookies analiticas o de terceros (por
              ejemplo, de medicion de audiencia o marketing), se detallaran en esta
              tabla y solo se activaran con tu consentimiento previo:
            </p>

            <div className="overflow-x-scroll-safe">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-300 text-left">
                    <th className="py-2 pr-4">Cookie</th>
                    <th className="py-2 pr-4">Tipo</th>
                    <th className="py-2 pr-4">Finalidad</th>
                    <th className="py-2">Duracion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-stone-200">
                    <td className="py-2 pr-4">cookie-consent-v1</td>
                    <td className="py-2 pr-4">Tecnica</td>
                    <td className="py-2 pr-4">Recordar tu eleccion sobre las cookies</td>
                    <td className="py-2">Persistente</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">[analitica]</td>
                    <td className="py-2 pr-4">Analitica</td>
                    <td className="py-2 pr-4">[Pendiente de configurar]</td>
                    <td className="py-2">[--]</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>3. Gestion de cookies</h2>
            <p>
              Puedes aceptar o rechazar las cookies no esenciales a traves del aviso
              que se muestra al acceder al sitio. Ademas, puedes configurar tu
              navegador para bloquear o eliminar las cookies en cualquier momento.
            </p>

            <h2>4. Mas informacion</h2>
            <p>
              Para cualquier duda sobre esta politica puedes escribirnos a{" "}
              {site.email}.
            </p>

            <p className="text-sm text-stone-500">
              Ultima actualizacion: [fecha]. Documento orientativo que debe ser
              revisado y adaptado por un profesional.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
