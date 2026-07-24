import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { LegalNotice } from "@/components/ui/LegalNotice";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Politica de privacidad",
  description: "Politica de privacidad y tratamiento de datos personales (RGPD).",
  alternates: { canonical: "/privacidad" },
  robots: { index: false, follow: true },
};

export default function PrivacidadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Politica de privacidad"
        breadcrumbs={[
          { name: "Inicio", href: "/" },
          { name: "Politica de privacidad", href: "/privacidad" },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <LegalNotice />
          <div className="prose-brand">
            <p>
              En {site.name} nos tomamos en serio la proteccion de tus datos. Esta
              politica explica quien trata tus datos, con que finalidad y que
              derechos tienes, conforme al Reglamento General de Proteccion de
              Datos (RGPD) y la normativa espanola aplicable.
            </p>

            <h2>1. Responsable del tratamiento</h2>
            <ul>
              <li>Responsable: [Razon social] ({site.name})</li>
              <li>NIF/CIF: [NIF/CIF]</li>
              <li>Domicilio: [Domicilio fiscal completo]</li>
              <li>Correo de contacto: {site.email}</li>
            </ul>

            <h2>2. Con que finalidad tratamos tus datos</h2>
            <p>Tratamos los datos que nos facilitas a traves de los formularios para:</p>
            <ul>
              <li>Atender tu solicitud de valoracion, venta, inversion o colaboracion.</li>
              <li>Contactarte para gestionar tu consulta y prestarte el servicio.</li>
              <li>Enviarte informacion relacionada con tu solicitud.</li>
            </ul>

            <h2>3. Legitimacion</h2>
            <p>
              La base legal para el tratamiento es tu consentimiento, que otorgas al
              marcar la casilla correspondiente al enviar el formulario, y, en su
              caso, la aplicacion de medidas precontractuales a tu peticion.
            </p>

            <h2>4. Conservacion de los datos</h2>
            <p>
              Conservaremos tus datos durante el tiempo necesario para gestionar tu
              solicitud y, posteriormente, durante los plazos legalmente exigidos.
              Cuando dejen de ser necesarios, se suprimiran de forma segura.
            </p>

            <h2>5. Destinatarios</h2>
            <p>
              No cederemos tus datos a terceros salvo obligacion legal. Podremos
              utilizar proveedores de servicios (por ejemplo, herramientas de
              gestion de clientes o alojamiento) que actuan como encargados del
              tratamiento con las debidas garantias. [Detallar proveedores/CRM
              utilizados].
            </p>

            <h2>6. Tus derechos</h2>
            <p>
              Puedes ejercer tus derechos de acceso, rectificacion, supresion,
              oposicion, limitacion del tratamiento y portabilidad escribiendo a{" "}
              {site.email}, indicando el derecho que deseas ejercer. Tambien tienes
              derecho a presentar una reclamacion ante la Agencia Espanola de
              Proteccion de Datos (www.aepd.es).
            </p>

            <h2>7. Seguridad</h2>
            <p>
              Aplicamos medidas tecnicas y organizativas apropiadas para proteger
              tus datos frente a accesos no autorizados, perdida o alteracion.
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
