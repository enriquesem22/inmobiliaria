import Link from "next/link";
import { Download, Inbox, ArrowRight } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import {
  listLeads,
  getSummary,
  typeLabel,
  statusMeta,
  LEAD_TYPES,
  LEAD_STATUSES,
} from "@/lib/crm";

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function buildQuery(params: Record<string, string | undefined>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) sp.set(k, v);
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export default function AdminDashboard({
  searchParams,
}: {
  searchParams: { type?: string; status?: string; q?: string };
}) {
  requireAuth();

  const { type, status, q } = searchParams;
  const leads = listLeads({ type, status, search: q });
  const summary = getSummary();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl text-pine-900">Leads</h1>
          <p className="mt-1 text-sm text-stone-500">
            {summary.total} solicitudes recibidas en total.
          </p>
        </div>
        <a
          href={`/admin/export${buildQuery({ type, status, q })}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-pine-900 hover:bg-stone-50"
        >
          <Download className="h-4 w-4" aria-hidden />
          Exportar CSV
        </a>
      </div>

      {/* Resumen por estado */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Link
          href="/admin"
          className={`rounded-xl border p-4 transition-colors ${
            !status && !type && !q
              ? "border-pine-300 bg-white"
              : "border-stone-200 bg-white hover:border-stone-300"
          }`}
        >
          <p className="text-2xl font-semibold text-pine-900">{summary.total}</p>
          <p className="mt-1 text-xs font-medium text-stone-500">Total</p>
        </Link>
        {LEAD_STATUSES.map((s) => (
          <Link
            key={s.value}
            href={`/admin${buildQuery({ status: s.value, type, q })}`}
            className={`rounded-xl border p-4 transition-colors ${
              status === s.value
                ? "border-pine-300 bg-white"
                : "border-stone-200 bg-white hover:border-stone-300"
            }`}
          >
            <p className="text-2xl font-semibold text-pine-900">
              {summary.byStatus[s.value] ?? 0}
            </p>
            <p className="mt-1 text-xs font-medium text-stone-500">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Filtros por tipo + busqueda */}
      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/admin${buildQuery({ status, q })}`}
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${
              !type ? "bg-pine-800 text-white" : "bg-white text-stone-600 hover:bg-stone-100"
            }`}
          >
            Todos
          </Link>
          {LEAD_TYPES.map((t) => (
            <Link
              key={t.value}
              href={`/admin${buildQuery({ type: t.value, status, q })}`}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                type === t.value
                  ? "bg-pine-800 text-white"
                  : "bg-white text-stone-600 hover:bg-stone-100"
              }`}
            >
              {t.label}
              {summary.byType[t.value] ? (
                <span className="ml-1.5 text-xs opacity-70">
                  {summary.byType[t.value]}
                </span>
              ) : null}
            </Link>
          ))}
        </div>

        <form action="/admin" method="get" className="flex gap-2">
          {type && <input type="hidden" name="type" value={type} />}
          {status && <input type="hidden" name="status" value={status} />}
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Buscar nombre, telefono, email..."
            className="w-full rounded-full border border-stone-300 bg-white px-4 py-2 text-sm focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20 lg:w-72"
          />
          <button
            type="submit"
            className="rounded-full bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-900"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Tabla de leads */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-white">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Inbox className="h-10 w-10 text-stone-300" aria-hidden />
            <p className="mt-3 text-stone-500">
              No hay leads que coincidan con el filtro.
            </p>
          </div>
        ) : (
          <div className="overflow-x-scroll-safe">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-left text-xs uppercase tracking-wide text-stone-500">
                  <th className="px-4 py-3 font-medium">Fecha</th>
                  <th className="px-4 py-3 font-medium">Tipo</th>
                  <th className="px-4 py-3 font-medium">Nombre</th>
                  <th className="px-4 py-3 font-medium">Contacto</th>
                  <th className="px-4 py-3 font-medium">Municipio</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {leads.map((lead) => {
                  const meta = statusMeta(lead.status);
                  return (
                    <tr key={lead.id} className="hover:bg-stone-50">
                      <td className="whitespace-nowrap px-4 py-3 text-stone-500">
                        {formatDateTime(lead.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-700">
                          {typeLabel(lead.type)}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-pine-900">
                        {lead.nombre ?? "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-stone-600">
                        {lead.telefono ?? lead.email ?? "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-stone-600">
                        {lead.municipio ?? "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.className}`}
                        >
                          {meta.label}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="inline-flex items-center gap-1 font-medium text-clay-600 hover:text-clay-700"
                        >
                          Ver
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
