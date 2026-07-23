import { Building2, Ruler, ArrowUpDown, Compass } from "lucide-react";

/**
 * Tarjeta ilustrativa de valoracion (no contiene datos reales).
 * Comunica visualmente el metodo: distinguimos valor de mercado,
 * precio de salida y precio probable de cierre.
 */
export function ValuationCard() {
  const rows = [
    { label: "Valor de mercado", width: "78%", tone: "bg-pine-500" },
    { label: "Precio de salida recomendado", width: "88%", tone: "bg-clay-500" },
    { label: "Precio probable de cierre", width: "72%", tone: "bg-pine-700" },
  ];

  return (
    <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay-600">
            Informe de valoracion
          </p>
          <p className="mt-1 font-serif text-lg text-pine-900">
            Analisis del inmueble
          </p>
        </div>
        <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-stone-500">
          Ejemplo ilustrativo
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2.5">
        {[
          { icon: Building2, label: "Tipo y planta" },
          { icon: Ruler, label: "Superficie" },
          { icon: ArrowUpDown, label: "Ascensor" },
          { icon: Compass, label: "Orientacion" },
        ].map((chip) => (
          <div
            key={chip.label}
            className="flex items-center gap-2 rounded-lg bg-stone-50 px-3 py-2 text-xs text-stone-600"
          >
            <chip.icon className="h-4 w-4 text-pine-600" aria-hidden />
            {chip.label}
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-600">{row.label}</span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-stone-100">
              <div
                className={`h-full rounded-full ${row.tone}`}
                style={{ width: row.width }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-pine-900 p-4 text-sm text-pine-100">
        Comparamos con viviendas similares del mismo barrio y analizamos la
        demanda para recomendarte el mejor precio de salida.
      </div>
    </div>
  );
}
