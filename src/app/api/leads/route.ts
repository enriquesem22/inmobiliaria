import { NextResponse } from "next/server";
import { createLead } from "@/lib/crm";

// El CRM usa SQLite (modulo nativo): esta ruta corre en runtime Node.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * RECEPCION DE LEADS
 * -------------------------------------------------------------
 * Punto unico de entrada para todos los formularios de la web
 * (valoracion, venta, inversores, colaboradores, contacto).
 *
 * Cada lead se guarda en el CRM (base de datos SQLite) y puede consultarse
 * en el panel de administracion (/admin).
 *
 * Ademas, si defines la variable de entorno LEADS_WEBHOOK_URL, el lead se
 * reenvia tambien a ese webhook (CRM externo, Make/Zapier, endpoint propio).
 *
 * Ejemplo (.env.local):
 *   LEADS_WEBHOOK_URL=https://hooks.tu-crm.com/xxxx
 */

type LeadPayload = {
  type?: string;
  data?: Record<string, unknown>;
  meta?: Record<string, unknown>;
};

const KNOWN_TYPES = [
  "valoracion",
  "vender",
  "inversor",
  "colaborador",
  "contacto",
];

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cuerpo de la peticion invalido." },
      { status: 400 },
    );
  }

  const type = typeof body.type === "string" ? body.type : "contacto";
  const data = (body.data ?? {}) as Record<string, unknown>;

  // Validacion minima en servidor (la validacion detallada esta en cliente).
  const name = String(data.nombre ?? "").trim();
  const phone = String(data.telefono ?? "").trim();
  const email = String(data.email ?? "").trim();
  const consent = data.consentimiento === true || data.consentimiento === "true";

  if (!KNOWN_TYPES.includes(type)) {
    return NextResponse.json(
      { ok: false, error: "Tipo de solicitud no reconocido." },
      { status: 400 },
    );
  }
  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "El nombre es obligatorio." },
      { status: 422 },
    );
  }
  if (!phone && !email) {
    return NextResponse.json(
      { ok: false, error: "Indica un telefono o un correo de contacto." },
      { status: 422 },
    );
  }
  if (!consent) {
    return NextResponse.json(
      { ok: false, error: "Es necesario aceptar la politica de privacidad." },
      { status: 422 },
    );
  }

  const meta = (body.meta ?? {}) as Record<string, unknown>;
  const userAgent = request.headers.get("user-agent") ?? undefined;
  const sourcePath =
    typeof meta.path === "string" ? meta.path : undefined;

  // 1) Guardar el lead en el CRM (base de datos).
  try {
    createLead({ type, data, sourcePath, userAgent });
  } catch (err) {
    console.error("[leads] Error guardando el lead en el CRM:", err);
    return NextResponse.json(
      { ok: false, error: "No se pudo registrar la solicitud. Intentalo de nuevo." },
      { status: 500 },
    );
  }

  // 2) Reenvio opcional a un webhook externo (CRM, Make/Zapier...).
  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          data,
          meta: { ...meta, receivedAt: new Date().toISOString(), userAgent },
        }),
      });
      if (!res.ok) {
        console.error("[leads] Error reenviando al webhook:", res.status);
      }
    } catch (err) {
      console.error("[leads] Fallo al contactar con el webhook:", err);
      // No bloqueamos al usuario por un fallo de integracion externa.
    }
  }

  return NextResponse.json({ ok: true });
}
