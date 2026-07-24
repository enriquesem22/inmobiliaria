"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  SESSION_COOKIE,
  verifyPassword,
  getSessionValue,
  isAuthenticated,
} from "@/lib/auth";
import { updateLead, type LeadStatus } from "@/lib/crm";

const VALID_STATUSES: LeadStatus[] = [
  "nuevo",
  "contactado",
  "en_proceso",
  "ganado",
  "perdido",
];

/** Inicia sesion en el panel del CRM. */
export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    redirect("/admin/login?error=1");
  }
  const value = getSessionValue();
  if (!value) {
    redirect("/admin/login?error=1");
  }
  cookies().set(SESSION_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  });
  redirect("/admin");
}

/** Cierra la sesion. */
export async function logout() {
  cookies().delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/** Actualiza el estado y las notas de un lead. */
export async function updateLeadAction(formData: FormData) {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id <= 0) {
    redirect("/admin");
  }
  const statusRaw = String(formData.get("status") ?? "");
  const status = VALID_STATUSES.includes(statusRaw as LeadStatus)
    ? (statusRaw as LeadStatus)
    : undefined;
  const notas = String(formData.get("notas") ?? "");

  updateLead(id, { status, notas });
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin");
  redirect(`/admin/leads/${id}?saved=1`);
}
