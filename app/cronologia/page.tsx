import Link from "next/link";
import { LIBROS, TEMAS } from "@/data/libros";
import { SectionReveal } from "@/components/SectionReveal";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = { title: "Cronología de la obra · Sintergia" };

export default function CronologiaPage() {
  // Agrupa por año
  const porAnio = new Map<number, typeof LIBROS>();
  for (const l of [...LIBROS].sort((a, b) => a.anio - b.anio)) {
    if (!porAnio.has(l.anio)) porAnio.set(l.anio, []);
    porAnio.get(l.anio)!.push(l);
  }
  const anios = [...porAnio.keys()].sort((a, b) => a - b);
  const minA = anios[0];
  const maxA = anios[anios.length - 1];

  return (
    <div className="mx-auto max-w-page px-5 py-12">
      <Breadcrumbs items={[{ label: "Cronología" }]} />
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tightish text-ink md:text-4xl">
          Cronología de la obra
        </h1>
        <p className="mt-2 max-w-2xl text-subtle">
          Los {LIBROS.length} libros de Jacobo Grinberg-Zylberbaum ordenados en el
          tiempo, de {minA} a {maxA}. Sigue la evolución de su pensamiento, desde
          las primeras obras sobre la construcción de la realidad hasta la Teoría
          Sintérgica y los chamanes de México.
        </p>
      </header>

      <div className="relative">
        {/* línea vertical */}
        <div className="absolute bottom-2 left-[52px] top-2 w-px bg-hair md:left-[60px]" />

        <div className="space-y-8">
          {anios.map((anio, i) => (
            <SectionReveal key={anio} delay={Math.min(i * 0.02, 0.2)}>
              <div className="flex gap-5">
                <div className="flex w-[44px] flex-none flex-col items-center md:w-[52px]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-verde text-sm font-bold text-white shadow-apple md:h-12 md:w-12">
                    {String(anio).slice(2)}
                  </span>
                </div>
                <div className="flex-1 pb-2">
                  <div className="mb-2 text-sm font-semibold text-subtle">{anio}</div>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {porAnio.get(anio)!.map((l) => (
                      <Link
                        key={l.slug}
                        href={`/libro/${l.slug}`}
                        className="card card-hover flex items-center gap-3 p-3.5"
                      >
                        <div
                          className="h-9 w-9 flex-none rounded-lg"
                          style={{
                            background:
                              "linear-gradient(135deg, #1E8E3E, #34C759)",
                          }}
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ink">
                            {l.titulo}
                            {l.subtitulo ? (
                              <span className="font-normal text-subtle">
                                {" "}
                                · {l.subtitulo}
                              </span>
                            ) : null}
                          </p>
                          <p className="truncate text-xs text-subtle">
                            {TEMAS[l.temas[0]].nombre}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-4xl bg-verde-mint p-8 text-center">
        <p className="text-subtle">
          En 1994, tras publicar más de cuarenta libros, Jacobo Grinberg
          desapareció sin dejar rastro.
        </p>
        <Link href="/sobre-jacobo" className="btn-verde mt-5">
          Conocer su historia
        </Link>
      </div>
    </div>
  );
}
