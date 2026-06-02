import Link from "next/link";
import { Compass } from "lucide-react";
import { CONCEPTOS, librosDeConcepto } from "@/data/libros";
import { SectionReveal } from "@/components/SectionReveal";

export const metadata = { title: "Conceptos · Sintergia" };

export default function ConceptosPage() {
  return (
    <div className="mx-auto max-w-page px-5 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tightish text-ink md:text-4xl">
          Conceptos clave
        </h1>
        <p className="mt-2 max-w-2xl text-subtle">
          El vocabulario esencial del sistema de pensamiento de Jacobo Grinberg.
          Cada concepto enlaza a los libros donde aparece.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {CONCEPTOS.map((c, i) => {
          const libros = librosDeConcepto(c.slug);
          return (
            <SectionReveal key={c.slug} delay={i * 0.03}>
              <div id={c.slug} className="card scroll-mt-24 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-verde-mint text-verde-deep">
                    <Compass className="h-5 w-5" />
                  </span>
                  <h2 className="text-lg font-semibold tracking-tightish text-ink">
                    {c.nombre}
                  </h2>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
                  {c.definicion}
                </p>
                {libros.length > 0 && (
                  <div className="mt-4 border-t border-hair pt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-subtle">
                      Aparece en
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {libros.map((l) => (
                        <Link
                          key={l.slug}
                          href={`/libro/${l.slug}`}
                          className="rounded-full border border-hair px-3 py-1 text-xs font-medium text-ink transition hover:border-verde hover:text-verde-deep"
                        >
                          {l.titulo}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SectionReveal>
          );
        })}
      </div>
    </div>
  );
}
