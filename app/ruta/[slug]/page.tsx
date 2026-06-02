import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles, BookOpen, Lightbulb } from "lucide-react";
import { RUTAS, getRuta, librosDeRuta } from "@/data/rutas";
import { TEMAS } from "@/data/libros";
import { BookCover } from "@/components/BookCover";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return RUTAS.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const r = getRuta(params.slug);
  return { title: r ? `${r.titulo} · Rutas · Sintergia` : "Ruta · Sintergia" };
}

export default function RutaPage({ params }: { params: { slug: string } }) {
  const ruta = getRuta(params.slug);
  if (!ruta) notFound();
  const libros = librosDeRuta(ruta);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Breadcrumbs
        items={[{ href: "/rutas", label: "Rutas" }, { label: ruta.titulo }]}
      />

      <span className="tag mb-3">
        {TEMAS[ruta.tema].nombre} · {ruta.nivel}
      </span>
      <h1 className="text-3xl font-bold tracking-tightish text-ink md:text-4xl">
        {ruta.titulo}
      </h1>
      <p className="mt-2 text-lg font-medium text-verde-deep">{ruta.lema}</p>
      <p className="mt-4 text-[17px] leading-relaxed text-ink/85">
        {ruta.descripcion}
      </p>
      <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-subtle">
        <BookOpen className="h-4 w-4" /> {libros.length} libros en esta ruta
      </p>

      {/* Secuencia */}
      <ol className="mt-10 space-y-5">
        {libros.map((libro, i) => (
          <li key={libro.slug} className="relative">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-verde text-sm font-semibold text-white">
                  {i + 1}
                </span>
                {i < libros.length - 1 && (
                  <span className="mt-1 w-px flex-1 bg-hair" />
                )}
              </div>
              <Link
                href={`/libro/${libro.slug}`}
                className="card card-hover mb-1 flex flex-1 gap-4 p-4"
              >
                <div className="w-14 flex-none">
                  <BookCover
                    titulo={libro.titulo}
                    anio={libro.anio}
                    tema={libro.temas[0]}
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tightish text-ink">
                    {libro.titulo}
                    {libro.subtitulo ? (
                      <span className="font-normal text-subtle"> · {libro.subtitulo}</span>
                    ) : null}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-subtle">
                    {libro.resumen}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-subtle">
                    <Lightbulb className="h-3.5 w-3.5 text-verde" />
                    {libro.ensenanzas.length} enseñanzas
                    {libro.tecnicas.length > 0
                      ? ` · ${libro.tecnicas.length} técnica${libro.tecnicas.length > 1 ? "s" : ""}`
                      : ""}
                  </span>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ol>

      {/* CTA */}
      <div className="mt-12 rounded-4xl bg-verde-mint p-8 text-center">
        <h3 className="text-xl font-bold tracking-tightish text-ink">
          ¿Dudas mientras lees?
        </h3>
        <p className="mx-auto mt-2 max-w-md text-subtle">
          El asistente puede explicarte cualquier concepto de esta ruta y citar
          los libros.
        </p>
        <Link href="/asistente" className="btn-verde mt-5">
          <Sparkles className="h-4 w-4" />
          Abrir el asistente
        </Link>
      </div>
    </div>
  );
}
