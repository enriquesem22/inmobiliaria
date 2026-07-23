import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Aplica fondo y espaciado de seccion. */
  tone?: "default" | "cream" | "pine" | "none";
  children: React.ReactNode;
};

const tones: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "bg-bone",
  cream: "bg-cream",
  pine: "bg-pine-900 text-pine-50",
  none: "",
};

export function Section({
  id,
  className,
  containerClassName,
  tone = "default",
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn(tones[tone], "py-16 sm:py-20 lg:py-24", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
