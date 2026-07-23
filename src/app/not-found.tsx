import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-6xl font-semibold text-pine-200">404</p>
      <h1 className="mt-4 text-3xl">Pagina no encontrada</h1>
      <p className="mt-3 max-w-md text-stone-600">
        Lo sentimos, la pagina que buscas no existe o ha cambiado de direccion.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" size="lg">
          Volver al inicio
        </Button>
        <Button href="/valoracion" variant="outline" size="lg">
          Solicitar valoracion
        </Button>
      </div>
    </Container>
  );
}
