import Link from "next/link";
import { Route, ArrowRight, BookOpen } from "lucide-react";
import { RUTAS, librosDeRuta } from "@/data/rutas";
import { TEMAS } from "@/data/libros";
import { SectionReveal } from "@/components/SectionReveal";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = { title: "Rutas de lectura · Sintergia" };

export default function RutasPage() {
  return (
    <div className="mx-auto max-w-page px-5 py-12">
      <Breadcrumbs items={[{ label: "Rutas de lectura" }]} />
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tightish text-ink md:text-4xl">
          Rutas de lectura
        </h1>
        <p className="mt-2 max-w-2xl text-subtle">
          Recorridos guiados que ordenan la obra de Jacobo Grinberg para que
          avances paso a paso, según tu interés y nivel.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {RUTAS.map((ruta, i) => {
          const libros = librosDeRuta(ruta);
          return (
            <SectionReveal key={ruta.slug} delay={i * 0.05}>
              <Link
                href={`/ruta/${ruta.slug}`}
                className="card card-hover flex h-full flex-col p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-verde-mint text-verde-deep">
                    <Route className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-subtle">
                    {ruta.nivel}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-tightish text-ink">
                  {ruta.titulo}
                </h2>
                <p className="mt-1 text-sm font-medium text-verde-deep">{ruta.lema}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-subtle">
                  {ruta.descripcion}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-hair pt-4">
                  <span className="inline-flex items-center gap-1.5 text-sm text-subtle">
                    <BookOpen className="h-4 w-4" /> {libros.length} libros ·{" "}
                    {TEMAS[ruta.tema].nombre.split(" ")[0]}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-verde-deep">
                    Empezar <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </SectionReveal>
          );
        })}
      </div>
    </div>
  );
}
