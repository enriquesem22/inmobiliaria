import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
        tone === "dark" ? "text-clay-600" : "text-clay-300",
        className,
      )}
    >
      <span
        className={cn(
          "h-px w-6",
          tone === "dark" ? "bg-clay-500/60" : "bg-clay-300/60",
        )}
        aria-hidden
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <div className={cn("mb-4", align === "center" && "flex justify-center")}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl leading-tight",
          tone === "light" && "text-white",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            tone === "light" ? "text-pine-100" : "text-stone-600",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
