"use client";

import Link from "next/link";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

/** Envia un lead a la API. Devuelve true si se registro correctamente. */
export async function submitLead(
  type: string,
  data: Record<string, unknown>,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        data,
        meta: {
          path: typeof window !== "undefined" ? window.location.pathname : "",
        },
      }),
    });
    const json = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
    };
    if (!res.ok || !json.ok) {
      return { ok: false, error: json.error ?? "No se pudo enviar la solicitud." };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Ha ocurrido un problema de conexion. Intentalo de nuevo.",
    };
  }
}

export function FormSuccess({ title, message }: { title?: string; message?: string }) {
  return (
    <div className="rounded-2xl border border-pine-200 bg-pine-50 p-8 text-center">
      <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-pine-600 text-white">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h3 className="text-2xl text-pine-900">{title ?? "Solicitud recibida"}</h3>
      <p className="mx-auto mt-3 max-w-md text-stone-600">
        {message ??
          "Gracias por escribirnos. Revisaremos tu solicitud y te contactaremos lo antes posible."}
      </p>
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-3 rounded-xl border border-clay-200 bg-clay-50 p-4 text-sm text-clay-800">
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export function ConsentText() {
  return (
    <>
      He leido y acepto la{" "}
      <Link
        href="/privacidad"
        className="font-medium text-clay-600 underline underline-offset-2 hover:text-clay-700"
      >
        politica de privacidad
      </Link>{" "}
      y el tratamiento de mis datos para gestionar mi solicitud.
    </>
  );
}

export function SubmitButton({
  status,
  children,
}: {
  status: SubmitStatus;
  children: React.ReactNode;
}) {
  return (
    <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
      <Send className="h-4 w-4" aria-hidden />
      {status === "submitting" ? "Enviando..." : children}
    </Button>
  );
}
