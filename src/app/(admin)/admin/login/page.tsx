import { redirect } from "next/navigation";
import { Lock, AlertCircle } from "lucide-react";
import { site } from "@/data/site";
import { isAuthenticated, isAdminConfigured } from "@/lib/auth";
import { login } from "../../actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  if (isAuthenticated()) redirect("/admin");

  const configured = isAdminConfigured();
  const hasError = searchParams.error === "1";

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center">
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pine-800 text-white">
            <Lock className="h-6 w-6" aria-hidden />
          </span>
          <h1 className="mt-4 font-serif text-2xl text-pine-900">
            {site.name} · Panel CRM
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Acceso restringido al equipo.
          </p>
        </div>

        {!configured ? (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-clay-200 bg-clay-50 p-4 text-sm text-clay-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <p>
              El panel aun no esta configurado. Define la variable de entorno{" "}
              <code className="rounded bg-white px-1 py-0.5">ADMIN_PASSWORD</code>{" "}
              en el servidor para poder acceder.
            </p>
          </div>
        ) : (
          <form action={login} className="mt-6 space-y-4">
            {hasError && (
              <div className="flex items-start gap-3 rounded-xl border border-clay-200 bg-clay-50 p-3 text-sm text-clay-800">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                <span>Contrasena incorrecta.</span>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-pine-900">
                Contrasena
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-[15px] text-stone-900 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/30"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-clay-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-clay-700"
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
