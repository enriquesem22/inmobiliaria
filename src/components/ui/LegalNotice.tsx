import { AlertTriangle } from "lucide-react";

/**
 * Aviso visible para el administrador del sitio: recuerda completar los
 * datos legales reales antes de publicar. Elimina este componente de las
 * paginas legales cuando los textos esten revisados y completados.
 */
export function LegalNotice() {
  return (
    <div className="mb-8 flex items-start gap-3 rounded-xl border border-clay-200 bg-clay-50 p-4 text-sm text-clay-800">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      <p>
        <strong>Plantilla pendiente de completar.</strong> Sustituye los campos
        entre corchetes por los datos reales de la empresa y revisa este texto
        con un profesional antes de publicarlo. Despues, elimina este aviso.
      </p>
    </div>
  );
}
