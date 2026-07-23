import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Marca de la empresa: un signo geometrico abstracto (referencia a
 * arquitectura y vivienda) junto al nombre. Al ser texto, el nombre
 * se actualiza automaticamente desde `site.name`.
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <rect
          width="32"
          height="32"
          rx="8"
          className={tone === "dark" ? "fill-pine-800" : "fill-white"}
        />
        {/* Tejado / arco abstracto */}
        <path
          d="M8 21.5L16 9l8 12.5"
          className={tone === "dark" ? "stroke-clay-400" : "stroke-pine-800"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M11.5 21.5v-4.5M20.5 21.5v-4.5"
          className={tone === "dark" ? "stroke-white" : "stroke-pine-800"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-lg font-semibold tracking-tight",
            tone === "dark" ? "text-pine-900" : "text-white",
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            "mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em]",
            tone === "dark" ? "text-stone-500" : "text-pine-100",
          )}
        >
          {site.region}
        </span>
      </span>
    </span>
  );
}
