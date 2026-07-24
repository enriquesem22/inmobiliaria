import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";
import { site } from "@/data/site";
import { isAuthenticated } from "@/lib/auth";
import { logout } from "./actions";

// El panel lee la base de datos: siempre dinamico y en runtime Node.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel CRM",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = isAuthenticated();

  return (
    <div className="min-h-screen bg-stone-50">
      {authed && (
        <header className="border-b border-stone-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-pine-800 text-sm font-semibold text-white">
                S
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-base font-semibold text-pine-900">
                  {site.name}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500">
                  Panel CRM
                </span>
              </span>
            </Link>
            <nav className="flex items-center gap-1">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-pine-900"
              >
                <LayoutDashboard className="h-4 w-4" aria-hidden />
                Leads
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-clay-700"
                >
                  <LogOut className="h-4 w-4" aria-hidden />
                  Salir
                </button>
              </form>
            </nav>
          </div>
        </header>
      )}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
