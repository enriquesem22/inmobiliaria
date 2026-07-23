"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "cookie-consent-v1";

/**
 * Banner de consentimiento de cookies (RGPD).
 * Guarda la eleccion del usuario en localStorage. Las cookies o scripts
 * no esenciales (analitica, marketing) SOLO deben cargarse cuando
 * `consent === "accepted"`. Comprueba este valor antes de inyectarlos.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* almacenamiento no disponible */
    }
    setVisible(false);
    // Si en el futuro se anaden scripts de analitica/marketing,
    // dispara aqui su carga cuando value === "accepted".
    window.dispatchEvent(
      new CustomEvent("cookie-consent", { detail: value }),
    );
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
    >
      <div className="mx-auto max-w-content rounded-2xl border border-stone-200 bg-white p-5 shadow-card sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm leading-relaxed text-stone-700">
            Usamos cookies propias y de terceros para el funcionamiento de la
            web y, con tu permiso, para analizar el uso y mejorar el servicio.
            Puedes aceptar, rechazar o consultar mas informacion en nuestra{" "}
            <Link
              href="/cookies"
              className="font-medium text-clay-600 underline underline-offset-2 hover:text-clay-700"
            >
              politica de cookies
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-3">
            <Button variant="outline" size="sm" onClick={() => decide("rejected")}>
              Rechazar
            </Button>
            <Button size="sm" onClick={() => decide("accepted")}>
              Aceptar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
