import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { LIBROS, TEMAS, type TemaId } from "@/data/libros";
import { SectionReveal } from "@/components/SectionReveal";

export const metadata = { title: "Enseñanzas · Sintergia" };

export default function EnsenanzasPage() {
  const temas = Object.keys(TEMAS) as TemaId[];

  return (
    <div className="mx-auto max-w-page px-5 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tightish text-ink md:text-4xl">
          Enseñanzas
        </h1>
        <p className="mt-2 max-w-2xl text-subtle">
          Las ideas centrales de toda la obra, reunidas y organizadas por tema.
          Cada enseñanza enlaza a su libro de origen.
        </p>
      </header>

      <div className="space-y-14">
        {temas.map((tema) => {
          const libros = LIBROS.filter((l) => l.temas.includes(tema));
          if (!libros.length) return null;
          return (
            <SectionReveal key={tema}>
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-verde-mint text-verde-deep">
                    <Lightbulb className="h-5 w-5" />
                  </span>
                  <h2 className="text-2xl font-bold tracking-tightish text-ink">
                    {TEMAS[tema].nombre}
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {libros.map((libro) => (
                    <div key={libro.slug} className="card p-6">
                      <Link
                        href={`/libro/${libro.slug}`}
                        className="text-base font-semibold tracking-tightish text-ink hover:text-verde-deep"
                      >
                        {libro.titulo}
                        {libro.subtitulo ? (
                          <span className="font-normal text-subtle"> · {libro.subtitulo}</span>
                        ) : null}
                      </Link>
                      <ul className="mt-3 space-y-2">
                        {libro.ensenanzas.map((e, i) => (
                          <li
                            key={i}
                            className="flex gap-2.5 text-[15px] leading-relaxed text-ink/80"
                          >
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-verde" />
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </SectionReveal>
          );
        })}
      </div>
    </div>
  );
}
