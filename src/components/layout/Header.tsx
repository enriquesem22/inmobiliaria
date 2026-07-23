"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { mainNav, site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menu al cambiar de pagina.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Bloquea el scroll del body con el menu movil abierto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "bg-bone/90 backdrop-blur border-b border-stone-200/70"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link href="/" aria-label={`${site.name} - Inicio`} className="shrink-0">
            <Logo />
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Navegacion principal"
          >
            {mainNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-pine-900"
                      : "text-stone-600 hover:text-pine-900",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-pine-900 hover:text-clay-600"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {site.phoneDisplay}
            </a>
            <Button href="/valoracion" size="sm">
              Valoracion gratuita
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-pine-900 hover:bg-pine-50 lg:hidden"
            aria-label={open ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {/* Menu movil */}
      {open && (
        <div className="lg:hidden">
          <div className="border-t border-stone-200/70 bg-bone">
            <Container className="py-4">
              <nav className="flex flex-col" aria-label="Navegacion movil">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-2 py-3 text-base font-medium text-pine-900 hover:bg-pine-50"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 flex flex-col gap-3 border-t border-stone-200/70 pt-4">
                <Button href="/valoracion" size="lg" className="w-full">
                  Solicitar valoracion gratuita
                </Button>
                <a
                  href={`tel:${site.phone}`}
                  className="inline-flex items-center justify-center gap-2 py-2 text-sm font-medium text-pine-900"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  Llamar {site.phoneDisplay}
                </a>
              </div>
            </Container>
          </div>
        </div>
      )}
    </header>
  );
}
