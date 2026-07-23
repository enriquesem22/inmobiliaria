import { NextResponse } from "next/server";

/**
 * RECEPCION DE LEADS
 * -------------------------------------------------------------
 * Punto unico de entrada para todos los formularios de la web
 * (valoracion, venta, inversores, colaboradores, contacto).
 *
 * Ahora mismo valida los datos y los registra en el log del servidor.
 * Para conectarlo a un CRM / hoja de calculo / email, define la variable
 * de entorno LEADS_WEBHOOK_URL (por ejemplo, un webhook de tu CRM,
 * Make/Zapier, o un endpoint propio). El lead se reenviara automaticamente.
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

  const lead = {
    type,
    data,
    meta: {
      ...(body.meta ?? {}),
      receivedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") ?? undefined,
    },
  };

  // Reenvio al CRM/webhook si esta configurado.
  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) {
        console.error("[leads] Error reenviando al webhook:", res.status);
      }
    } catch (err) {
      console.error("[leads] Fallo al contactar con el webhook:", err);
      // No bloqueamos al usuario por un fallo de integracion.
    }
  } else {
    // Sin webhook configurado: dejamos constancia en el log del servidor.
    console.info("[leads] Nuevo lead recibido:", JSON.stringify(lead));
  }

  return NextResponse.json({ ok: true });
}
