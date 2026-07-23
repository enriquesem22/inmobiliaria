import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./Container";
import { Eyebrow } from "./SectionHeading";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; href: string };

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-stone-200/70 bg-gradient-to-b from-cream to-bone">
      <Container className="py-12 sm:py-16 lg:py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Migas de pan"
            className="mb-6 flex flex-wrap items-center gap-1 text-sm text-stone-500"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
                {i < breadcrumbs.length - 1 ? (
                  <Link href={crumb.href} className="hover:text-pine-800">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-pine-800">{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
          {eyebrow && (
            <div className={cn("mb-4", align === "center" && "flex justify-center")}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          )}
          <h1 className="text-4xl leading-[1.1] sm:text-5xl">{title}</h1>
          {subtitle && (
            <p className="mt-5 text-lg leading-relaxed text-stone-600">{subtitle}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </header>
  );
}
