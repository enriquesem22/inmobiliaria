import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, UserRound } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ContactoForm } from "@/components/forms/ContactoForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con nosotros para vender tu vivienda, pedir una valoracion, buscar una inversion o colaborar. Estamos en Castilleja de Guzman, Aljarafe (Sevilla).",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Contacto", href: "/contacto" },
        ]}
      />
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos"
        subtitle="Cuentanos que necesitas y te responderemos lo antes posible. Sin compromiso."
        breadcrumbs={[
          { name: "Inicio", href: "/" },
          { name: "Contacto", href: "/contacto" },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl text-pine-900">Datos de contacto</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
                  <UserRound className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm text-stone-500">Persona de contacto</p>
                  <p className="font-medium text-pine-900">{site.contactPerson}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm text-stone-500">Telefono</p>
                  <a href={`tel:${site.phone}`} className="font-medium text-pine-900 hover:text-clay-600">
                    {site.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-stone-500">WhatsApp</p>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-pine-900 hover:text-clay-600"
                  >
                    Escribir por WhatsApp
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm text-stone-500">Correo</p>
                  <a href={`mailto:${site.email}`} className="font-medium text-pine-900 hover:text-clay-600">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm text-stone-500">Base</p>
                  <p className="font-medium text-pine-900">{site.address}</p>
                  <p className="text-sm text-stone-500">Zona de actuacion: Aljarafe</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm text-stone-500">Horario</p>
                  <p className="font-medium text-pine-900">
                    Nos adaptamos a tu disponibilidad, tambien en visitas.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-2xl text-pine-900">Escribenos</h2>
              <p className="mt-2 text-stone-600">
                Rellena el formulario y te contactamos.
              </p>
              <div className="mt-6">
                <ContactoForm />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
