import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-page flex-col items-center px-5 py-32 text-center">
      <span className="text-6xl font-bold tracking-tightish text-verde-deep">404</span>
      <h1 className="mt-4 text-2xl font-bold tracking-tightish text-ink">
        No encontramos esta página
      </h1>
      <p className="mt-2 text-subtle">Puede que el enlace haya cambiado.</p>
      <Link href="/" className="btn-verde mt-6">
        Volver al inicio
      </Link>
    </div>
  );
}
