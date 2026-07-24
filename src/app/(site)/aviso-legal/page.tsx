import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { LegalNotice } from "@/components/ui/LegalNotice";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal y condiciones de uso del sitio web.",
  alternates: { canonical: "/aviso-legal" },
  robots: { index: false, follow: true },
};

export default function AvisoLegalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Aviso legal"
        breadcrumbs={[
          { name: "Inicio", href: "/" },
          { name: "Aviso legal", href: "/aviso-legal" },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <LegalNotice />
          <div className="prose-brand">
            <h2>1. Datos identificativos</h2>
            <p>
              En cumplimiento del deber de informacion recogido en la normativa
              vigente, se facilitan los siguientes datos del titular de este sitio
              web:
            </p>
            <ul>
              <li>Titular / Razon social: [Razon social]</li>
              <li>Nombre comercial: {site.name}</li>
              <li>NIF/CIF: [NIF/CIF]</li>
              <li>Domicilio: [Domicilio fiscal completo]</li>
              <li>Correo electronico: {site.email}</li>
              <li>Sitio web: {site.url}</li>
              <li>Datos registrales (si procede): [Registro Mercantil]</li>
            </ul>

            <h2>2. Objeto</h2>
            <p>
              Este sitio web tiene por objeto ofrecer informacion sobre los
              servicios de intermediacion, valoracion, asesoramiento e inversion
              inmobiliaria prestados por el titular, asi como permitir el contacto
              con potenciales clientes y colaboradores.
            </p>

            <h2>3. Condiciones de uso</h2>
            <p>
              El acceso y uso de este sitio web atribuye la condicion de usuario e
              implica la aceptacion de las condiciones recogidas en este aviso
              legal. El usuario se compromete a hacer un uso adecuado de los
              contenidos y a no emplearlos para actividades ilicitas o contrarias a
              la buena fe.
            </p>

            <h2>4. Propiedad intelectual e industrial</h2>
            <p>
              Los contenidos de este sitio web (textos, disenos, logotipos, codigo
              y demas elementos) son titularidad del titular del sitio o de terceros
              que han autorizado su uso, y estan protegidos por la normativa de
              propiedad intelectual e industrial. Queda prohibida su reproduccion,
              distribucion o transformacion sin autorizacion.
            </p>

            <h2>5. Exclusion de responsabilidad</h2>
            <p>
              La informacion publicada, incluidas las estimaciones de valor y de
              mercado, tiene caracter orientativo y comercial, y no constituye
              tasacion oficial, asesoramiento fiscal, juridico o financiero
              vinculante. El titular no se responsabiliza de las decisiones tomadas
              con base en dicha informacion sin la debida verificacion profesional.
            </p>

            <h2>6. Enlaces externos</h2>
            <p>
              Este sitio puede incluir enlaces a sitios de terceros. El titular no
              se responsabiliza de los contenidos ni de las politicas de privacidad
              de dichos sitios.
            </p>

            <h2>7. Legislacion aplicable</h2>
            <p>
              Este aviso legal se rige por la legislacion espanola. Para cualquier
              controversia sera de aplicacion la normativa vigente y los tribunales
              que legalmente correspondan.
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
