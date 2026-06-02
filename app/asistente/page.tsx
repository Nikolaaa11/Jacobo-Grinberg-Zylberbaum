import { Suspense } from "react";
import { Asistente } from "@/components/Asistente";

export const metadata = { title: "Asistente IA · Sintergia" };

export default function AsistentePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-5 py-12 text-subtle">Cargando…</div>}>
      <Asistente />
    </Suspense>
  );
}
