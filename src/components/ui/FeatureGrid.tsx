import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Rejilla de puntos con titulo y texto opcional. */
export function FeatureGrid({
  items,
  columns = 2,
  className,
}: {
  items: { title: string; text?: string }[];
  columns?: 2 | 3;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-x-8 gap-y-6",
        columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.title} className="flex gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pine-100 text-pine-700">
            <Check className="h-3.5 w-3.5" aria-hidden />
          </span>
          <div>
            <h3 className="text-base font-semibold text-pine-900">{item.title}</h3>
            {item.text && (
              <p className="mt-1 text-sm leading-relaxed text-stone-600">
                {item.text}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Lista simple de comprobacion en una sola columna. */
export function CheckList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pine-100 text-pine-700">
            <Check className="h-3.5 w-3.5" aria-hidden />
          </span>
          <span className="text-[15px] text-stone-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}
