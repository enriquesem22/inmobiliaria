import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { getLead, typeLabel, statusMeta, LEAD_STATUSES } from "@/lib/crm";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { updateLeadAction } from "../../../actions";

const FIELD_LABELS: Record<string, string> = {
  nombre: "Nombre",
  telefono: "Telefono",
  email: "Correo",
  municipio: "Municipio",
  direccion: "Direccion aproximada",
  tipoVivienda: "Tipo de vivienda",
  superficie: "Superficie (m2)",
  habitaciones: "Habitaciones",
  estado: "Estado",
  ascensor: "Ascensor",
  precioEsperado: "Precio esperado",
  motivo: "Motivo de venta",
  plazo: "Plazo para vender",
  comentarios: "Comentarios",
  presupuesto: "Presupuesto",
  zona: "Zona de interes",
  objetivo: "Objetivo",
  rentabilidadMinima: "Rentabilidad minima",
  financiacion: "Financiacion",
  plazoInversion: "Plazo de inversion",
  relacion: "Relacion con el propietario",
  tipoInmueble: "Tipo de inmueble",
  situacion: "Situacion",
  interes: "Motivo del contacto",
  mensaje: "Mensaje",
};

const HIDDEN_FIELDS = new Set(["nombre", "telefono", "email", "consentimiento"]);

/** Construye un enlace wa.me a partir del telefono del lead (con prefijo ES). */
function leadWhatsApp(phone: string, message: string): string {
  let digits = phone.replace(/[^0-9]/g, "");
  if (digits.length === 9) digits = `34${digits}`; // movil/fijo espanol sin prefijo
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(d);
}

export default function LeadDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { saved?: string };
}) {
  requireAuth();

  const lead = getLead(Number(params.id));
  if (!lead) notFound();

  const meta = statusMeta(lead.status);
  const detailEntries = Object.entries(lead.data).filter(
    ([key, value]) =>
      !HIDDEN_FIELDS.has(key) &&
      value !== undefined &&
      value !== null &&
      String(value).trim() !== "",
  );

  const waMessage = `Hola ${lead.nombre ?? ""}, te contactamos de ${site.name} sobre tu solicitud.`;

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-pine-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Volver a leads
      </Link>

      {searchParams.saved === "1" && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-pine-200 bg-pine-50 p-3 text-sm text-pine-800">
          <CheckCircle2 className="h-5 w-5" aria-hidden />
          Cambios guardados.
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="font-serif text-2xl text-pine-900">
          {lead.nombre ?? `Lead #${lead.id}`}
        </h1>
        <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700">
          {typeLabel(lead.type)}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${meta.className}`}>
          {meta.label}
        </span>
      </div>
      <p className="mt-1 text-sm text-stone-500">
        Recibido el {formatDateTime(lead.createdAt)}
        {lead.sourcePath ? ` · desde ${lead.sourcePath}` : ""}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Datos del lead */}
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Contacto
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {lead.telefono && (
                <a
                  href={`tel:${lead.telefono}`}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-3 py-1.5 text-sm text-pine-900 hover:bg-stone-50"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {lead.telefono}
                </a>
              )}
              {lead.telefono && (
                <a
                  href={leadWhatsApp(lead.telefono, waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-3 py-1.5 text-sm text-pine-900 hover:bg-stone-50"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                  WhatsApp
                </a>
              )}
              {lead.email && (
                <a
                  href={`mailto:${lead.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-3 py-1.5 text-sm text-pine-900 hover:bg-stone-50"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {lead.email}
                </a>
              )}
              {lead.municipio && (
                <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5 text-sm text-stone-700">
                  <MapPin className="h-4 w-4" aria-hidden />
                  {lead.municipio}
                </span>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Detalles de la solicitud
            </h2>
            {detailEntries.length === 0 ? (
              <p className="mt-4 text-sm text-stone-500">
                No se aportaron datos adicionales.
              </p>
            ) : (
              <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {detailEntries.map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">
                      {FIELD_LABELS[key] ?? key}
                    </dt>
                    <dd className="mt-0.5 text-[15px] text-stone-800">
                      {String(value)}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        </div>

        {/* Gestion: estado y notas */}
        <aside>
          <form
            action={updateLeadAction}
            className="rounded-2xl border border-stone-200 bg-white p-6"
          >
            <input type="hidden" name="id" value={lead.id} />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Gestion
            </h2>

            <div className="mt-4">
              <label htmlFor="status" className="text-sm font-medium text-pine-900">
                Estado
              </label>
              <select
                id="status"
                name="status"
                defaultValue={lead.status}
                className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20"
              >
                {LEAD_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="notas" className="text-sm font-medium text-pine-900">
                Notas internas
              </label>
              <textarea
                id="notas"
                name="notas"
                rows={6}
                defaultValue={lead.notas ?? ""}
                placeholder="Anota el seguimiento de este lead..."
                className="mt-1.5 w-full resize-y rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-clay-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-clay-700"
            >
              Guardar cambios
            </button>

            <div className="mt-4 flex items-center gap-2 text-xs text-stone-400">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              Actualizado: {formatDateTime(lead.updatedAt)}
            </div>
          </form>
        </aside>
      </div>
    </div>
  );
}
