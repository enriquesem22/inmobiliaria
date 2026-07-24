import { getDb } from "./db";

export type LeadType =
  | "valoracion"
  | "vender"
  | "inversor"
  | "colaborador"
  | "contacto";

export type LeadStatus =
  | "nuevo"
  | "contactado"
  | "en_proceso"
  | "ganado"
  | "perdido";

export type Lead = {
  id: number;
  type: LeadType;
  status: LeadStatus;
  nombre: string | null;
  telefono: string | null;
  email: string | null;
  municipio: string | null;
  data: Record<string, unknown>;
  notas: string | null;
  sourcePath: string | null;
  userAgent: string | null;
  createdAt: string;
  updatedAt: string;
};

export const LEAD_TYPES: { value: LeadType; label: string }[] = [
  { value: "valoracion", label: "Valoracion" },
  { value: "vender", label: "Vender vivienda" },
  { value: "inversor", label: "Inversor" },
  { value: "colaborador", label: "Colaborador" },
  { value: "contacto", label: "Contacto" },
];

export const LEAD_STATUSES: {
  value: LeadStatus;
  label: string;
  className: string;
}[] = [
  { value: "nuevo", label: "Nuevo", className: "bg-clay-100 text-clay-800" },
  { value: "contactado", label: "Contactado", className: "bg-amber-100 text-amber-800" },
  { value: "en_proceso", label: "En proceso", className: "bg-sky-100 text-sky-800" },
  { value: "ganado", label: "Ganado", className: "bg-pine-100 text-pine-800" },
  { value: "perdido", label: "Perdido", className: "bg-stone-200 text-stone-600" },
];

export function typeLabel(type: string): string {
  return LEAD_TYPES.find((t) => t.value === type)?.label ?? type;
}

export function statusMeta(status: string) {
  return (
    LEAD_STATUSES.find((s) => s.value === status) ?? {
      value: status as LeadStatus,
      label: status,
      className: "bg-stone-200 text-stone-600",
    }
  );
}

type LeadRow = {
  id: number;
  type: string;
  status: string;
  nombre: string | null;
  telefono: string | null;
  email: string | null;
  municipio: string | null;
  data: string | null;
  notas: string | null;
  source_path: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
};

function rowToLead(row: LeadRow): Lead {
  let data: Record<string, unknown> = {};
  if (row.data) {
    try {
      data = JSON.parse(row.data) as Record<string, unknown>;
    } catch {
      data = {};
    }
  }
  return {
    id: row.id,
    type: row.type as LeadType,
    status: row.status as LeadStatus,
    nombre: row.nombre,
    telefono: row.telefono,
    email: row.email,
    municipio: row.municipio,
    data,
    notas: row.notas,
    sourcePath: row.source_path,
    userAgent: row.user_agent,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type CreateLeadInput = {
  type: string;
  data: Record<string, unknown>;
  sourcePath?: string;
  userAgent?: string;
};

/** Inserta un lead nuevo y devuelve su id. */
export function createLead(input: CreateLeadInput): number {
  const db = getDb();
  const now = new Date().toISOString();
  const d = input.data ?? {};
  const str = (v: unknown) =>
    v === undefined || v === null || v === "" ? null : String(v);

  const result = db
    .prepare(
      `INSERT INTO leads
        (type, status, nombre, telefono, email, municipio, data, notas, source_path, user_agent, created_at, updated_at)
       VALUES
        (@type, 'nuevo', @nombre, @telefono, @email, @municipio, @data, NULL, @sourcePath, @userAgent, @createdAt, @updatedAt)`,
    )
    .run({
      type: input.type,
      nombre: str(d.nombre),
      telefono: str(d.telefono),
      email: str(d.email),
      municipio: str(d.municipio) ?? str(d.zona),
      data: JSON.stringify(d),
      sourcePath: input.sourcePath ?? null,
      userAgent: input.userAgent ?? null,
      createdAt: now,
      updatedAt: now,
    });

  return Number(result.lastInsertRowid);
}

export type ListFilters = {
  type?: string;
  status?: string;
  search?: string;
};

/** Lista leads con filtros opcionales, del mas reciente al mas antiguo. */
export function listLeads(filters: ListFilters = {}): Lead[] {
  const db = getDb();
  const where: string[] = [];
  const params: Record<string, string> = {};

  if (filters.type) {
    where.push("type = @type");
    params.type = filters.type;
  }
  if (filters.status) {
    where.push("status = @status");
    params.status = filters.status;
  }
  if (filters.search) {
    where.push(
      "(nombre LIKE @q OR telefono LIKE @q OR email LIKE @q OR municipio LIKE @q)",
    );
    params.q = `%${filters.search}%`;
  }

  const sql = `SELECT * FROM leads ${
    where.length ? `WHERE ${where.join(" AND ")}` : ""
  } ORDER BY datetime(created_at) DESC`;

  const rows = db.prepare(sql).all(params) as LeadRow[];
  return rows.map(rowToLead);
}

export function getLead(id: number): Lead | undefined {
  const db = getDb();
  const row = db.prepare("SELECT * FROM leads WHERE id = ?").get(id) as
    | LeadRow
    | undefined;
  return row ? rowToLead(row) : undefined;
}

/** Actualiza el estado o las notas de un lead. */
export function updateLead(
  id: number,
  fields: { status?: LeadStatus; notas?: string },
): void {
  const db = getDb();
  const sets: string[] = [];
  const params: Record<string, unknown> = { id, updatedAt: new Date().toISOString() };

  if (fields.status !== undefined) {
    sets.push("status = @status");
    params.status = fields.status;
  }
  if (fields.notas !== undefined) {
    sets.push("notas = @notas");
    params.notas = fields.notas || null;
  }
  if (sets.length === 0) return;

  sets.push("updated_at = @updatedAt");
  db.prepare(`UPDATE leads SET ${sets.join(", ")} WHERE id = @id`).run(params);
}

export type CrmSummary = {
  total: number;
  byStatus: Record<string, number>;
  byType: Record<string, number>;
};

export function getSummary(): CrmSummary {
  const db = getDb();
  const total = (db.prepare("SELECT COUNT(*) c FROM leads").get() as { c: number }).c;
  const byStatus: Record<string, number> = {};
  const byType: Record<string, number> = {};

  for (const r of db
    .prepare("SELECT status, COUNT(*) c FROM leads GROUP BY status")
    .all() as { status: string; c: number }[]) {
    byStatus[r.status] = r.c;
  }
  for (const r of db
    .prepare("SELECT type, COUNT(*) c FROM leads GROUP BY type")
    .all() as { type: string; c: number }[]) {
    byType[r.type] = r.c;
  }

  return { total, byStatus, byType };
}

/** Genera un CSV con todos los leads (opcionalmente filtrados). */
export function leadsToCsv(leads: Lead[]): string {
  const headers = [
    "id",
    "fecha",
    "tipo",
    "estado",
    "nombre",
    "telefono",
    "email",
    "municipio",
    "notas",
    "datos",
  ];
  const escape = (v: unknown) => {
    const s = v === null || v === undefined ? "" : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };
  const lines = leads.map((l) =>
    [
      l.id,
      l.createdAt,
      typeLabel(l.type),
      statusMeta(l.status).label,
      l.nombre,
      l.telefono,
      l.email,
      l.municipio,
      l.notas,
      JSON.stringify(l.data),
    ]
      .map(escape)
      .join(","),
  );
  return [headers.join(","), ...lines].join("\n");
}
