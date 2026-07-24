import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

/**
 * Conexion a la base de datos SQLite del CRM.
 *
 * Por defecto, la base de datos se guarda en `data/crm.db` (fuera del
 * control de versiones). Puedes cambiar la ruta con la variable de entorno
 * CRM_DATABASE_PATH.
 *
 * Nota sobre despliegue: SQLite requiere un disco persistente (VPS,
 * contenedor con volumen, servidor propio). En plataformas serverless sin
 * disco persistente (p. ej. Vercel) conviene sustituir esta capa por una
 * base de datos gestionada (Postgres, Turso, etc.). La interfaz de
 * `lib/crm.ts` esta pensada para poder cambiar el motor sin tocar el resto.
 */

type DB = Database.Database;

// Cache entre recargas en caliente durante el desarrollo.
const globalForDb = globalThis as unknown as { __crmDb?: DB };

function resolveDbPath(): string {
  const custom = process.env.CRM_DATABASE_PATH;
  if (custom && custom.trim()) return custom;
  return path.join(process.cwd(), "data", "crm.db");
}

function createConnection(): DB {
  const dbPath = resolveDbPath();
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'nuevo',
      nombre TEXT,
      telefono TEXT,
      email TEXT,
      municipio TEXT,
      data TEXT,
      notas TEXT,
      source_path TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
    CREATE INDEX IF NOT EXISTS idx_leads_type ON leads(type);
    CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
  `);

  return db;
}

/** Devuelve la conexion (creandola la primera vez). */
export function getDb(): DB {
  if (!globalForDb.__crmDb) {
    globalForDb.__crmDb = createConnection();
  }
  return globalForDb.__crmDb;
}
