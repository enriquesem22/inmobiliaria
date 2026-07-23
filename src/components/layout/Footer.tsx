import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { zonas } from "@/data/zonas";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-pine-950 text-pine-100">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-pine-200">
              No solo vendemos viviendas. Analizamos como maximizar su valor.
              Valoracion, estrategia, reforma y venta en Sevilla y el Aljarafe.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay-300" aria-hidden />
                <span>{site.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-clay-300" aria-hidden />
                <a href={`tel:${site.phone}`} className="hover:text-white">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-clay-300" aria-hidden />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-clay-300" />
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Escribir por WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Servicios
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-pine-200">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={s.href} className="hover:text-white">
                      {s.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/colaboradores" className="hover:text-white">
                    Colaboradores
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Zonas
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-pine-200">
                {zonas.slice(0, 7).map((z) => (
                  <li key={z.slug}>
                    <Link href={`/zonas/${z.slug}`} className="hover:text-white">
                      {z.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/zonas" className="font-medium text-clay-300 hover:text-white">
                    Ver todas
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Empresa
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-pine-200">
                <li>
                  <Link href="/nosotros" className="hover:text-white">
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-white">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/valoracion" className="hover:text-white">
                    Valoracion gratuita
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-pine-800/60 pt-6 text-sm text-pine-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. Todos los derechos reservados.
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Enlaces legales">
            <Link href="/aviso-legal" className="hover:text-white">
              Aviso legal
            </Link>
            <Link href="/privacidad" className="hover:text-white">
              Politica de privacidad
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Politica de cookies
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
