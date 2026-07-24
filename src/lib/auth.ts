import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Autenticacion simple del panel del CRM (un unico administrador).
 *
 * Configuracion (variables de entorno):
 *   ADMIN_PASSWORD   -> contrasena de acceso al panel. Sin ella, el panel
 *                       queda deshabilitado (nadie puede entrar).
 *
 * La sesion se guarda en una cookie httpOnly cuyo valor es un token
 * derivado de la contrasena. No se almacena la contrasena en la cookie.
 */

export const SESSION_COOKIE = "crm_session";

function adminPassword(): string | undefined {
  const p = process.env.ADMIN_PASSWORD;
  return p && p.length > 0 ? p : undefined;
}

/** Indica si el panel esta configurado (hay contrasena definida). */
export function isAdminConfigured(): boolean {
  return adminPassword() !== undefined;
}

/** Token de sesion derivado de la contrasena. */
function sessionToken(): string | null {
  const pass = adminPassword();
  if (!pass) return null;
  return createHmac("sha256", pass).update("sem2a-crm-session-v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** Comprueba la contrasena introducida en el login. */
export function verifyPassword(input: string): boolean {
  const pass = adminPassword();
  if (!pass) return false;
  return safeEqual(input, pass);
}

/** Valor a guardar en la cookie de sesion tras un login correcto. */
export function getSessionValue(): string | null {
  return sessionToken();
}

/** Indica si la peticion actual esta autenticada. */
export function isAuthenticated(): boolean {
  const expected = sessionToken();
  if (!expected) return false;
  const cookie = cookies().get(SESSION_COOKIE)?.value;
  if (!cookie) return false;
  return safeEqual(cookie, expected);
}

/** Redirige al login si la sesion no es valida. Uso en server components. */
export function requireAuth(): void {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }
}
