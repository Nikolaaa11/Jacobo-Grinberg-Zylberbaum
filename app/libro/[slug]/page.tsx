import Link from "next/link";
import { notFound } from "next/navigation";
import { Lightbulb, Sparkles, Compass, Clock, ChevronRight } from "lucide-react";
import {
  LIBROS,
  TEMAS,
  getLibro,
  getConcepto,
  type Libro,
} from "@/data/libros";
import { BookCover } from "@/components/BookCover";
import { PDFViewer } from "@/components/PDFViewer";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return LIBROS.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const libro = getLibro(params.slug);
  return { title: libro ? `${libro.titulo} · Sintergia` : "Libro · Sintergia" };
}

export default function LibroPage({ params }: { params: { slug: string } }) {
  const libro = getLibro(params.slug);
  if (!libro) notFound();

  const relacionados = LIBROS.filter(
    (l) =>
      l.slug !== libro.slug &&
      l.temas.some((t) => libro.temas.includes(t))
  ).slice(0, 4);

  return (
    <article className="mx-auto max-w-page px-5 py-10">
      <Breadcrumbs
        items={[{ href: "/biblioteca", label: "Biblioteca" }, { label: libro.titulo }]}
      />

      {/* Cabecera */}
      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <div className="mx-auto w-44 md:mx-0 md:w-full">
          <BookCover
            titulo={libro.titulo}
            subtitulo={libro.subtitulo}
            anio={libro.anio}
            tema={libro.temas[0]}
          />
        </div>
        <div>
          <div className="flex flex-wrap gap-1.5">
            {libro.temas.map((t) => (
              <Link key={t} href={`/biblioteca?tema=${t}`} className="tag">
                {TEMAS[t].nombre}
              </Link>
            ))}
          </div>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tightish text-ink md:text-4xl">
            {libro.titulo}
          </h1>
          {libro.subtitulo ? (
            <p className="mt-1 text-xl text-subtle">{libro.subtitulo}</p>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-subtle">
            <span>{libro.anio}</span>
            {libro.paginas ? (
              <>
                <span aria-hidden>·</span>
                <span>{libro.paginas} páginas</span>
              </>
            ) : null}
            <span aria-hidden>·</span>
            <span>{libro.ensenanzas.length} enseñanzas</span>
            {libro.tecnicas.length > 0 ? (
              <>
                <span aria-hidden>·</span>
                <span>
                  {libro.tecnicas.length}{" "}
                  {libro.tecnicas.length === 1 ? "técnica" : "técnicas"}
                </span>
              </>
            ) : null}
          </div>
          <p className="mt-5 text-[17px] leading-relaxed text-ink/85">
            {libro.resumen}
          </p>
          <Link
            href={`/asistente?libro=${libro.slug}`}
            className="btn-verde mt-6"
          >
            <Sparkles className="h-4 w-4" />
            Preguntar a la IA sobre este libro
          </Link>
        </div>
      </div>

      {/* Enseñanzas */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tightish text-ink">
          <Lightbulb className="h-6 w-6 text-verde" /> Enseñanzas clave
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {libro.ensenanzas.map((e, i) => (
            <div key={i} className="card p-5">
              <span className="text-sm font-semibold text-verde-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink/85">{e}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Técnicas */}
      {libro.tecnicas.length > 0 && (
        <section className="mt-14">
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tightish text-ink">
            <Sparkles className="h-6 w-6 text-verde" /> Técnicas y prácticas
          </h2>
          <div className="mt-5 space-y-4">
            {libro.tecnicas.map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold tracking-tightish text-ink">
                    {t.nombre}
                  </h3>
                  <div className="flex gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full bg-mist px-3 py-1 text-subtle">
                      <Clock className="h-3.5 w-3.5" /> {t.duracion}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-verde-mint px-3 py-1 text-verde-deep">
                      {t.nivel}
                    </span>
                  </div>
                </div>
                <ol className="mt-4 space-y-2.5">
                  {t.pasos.map((p, j) => (
                    <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
                      <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-verde text-xs font-semibold text-white">
                        {j + 1}
                      </span>
                      {p}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Conceptos */}
      {libro.conceptos.length > 0 && (
        <section className="mt-14">
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tightish text-ink">
            <Compass className="h-6 w-6 text-verde" /> Conceptos relacionados
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {libro.conceptos.map((c) => {
              const concepto = getConcepto(c);
              if (!concepto) return null;
              return (
                <Link
                  key={c}
                  href={`/conceptos#${c}`}
                  className="rounded-full border border-hair bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-verde hover:text-verde-deep"
                >
                  {concepto.nombre}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* PDF */}
      <section className="mt-14">
        <PDFViewer titulo={libro.titulo} />
      </section>

      {/* Relacionados */}
      {relacionados.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold tracking-tightish text-ink">
            Continúa explorando
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {relacionados.map((l: Libro) => (
              <Link
                key={l.slug}
                href={`/libro/${l.slug}`}
                className="card card-hover flex items-center gap-3 p-4"
              >
                <div className="w-12 flex-none">
                  <BookCover
                    titulo={l.titulo}
                    anio={l.anio}
                    tema={l.temas[0]}
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{l.titulo}</p>
                  <p className="text-xs text-subtle">{l.anio}</p>
                </div>
                <ChevronRight className="ml-auto h-4 w-4 flex-none text-subtle" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
