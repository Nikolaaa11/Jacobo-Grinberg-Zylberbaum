import { Suspense } from "react";
import { BibliotecaClient } from "@/components/BibliotecaClient";

export const metadata = { title: "Biblioteca · Sintergia" };

export default function BibliotecaPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-page px-5 py-12 text-subtle">Cargando…</div>}>
      <BibliotecaClient />
    </Suspense>
  );
}
