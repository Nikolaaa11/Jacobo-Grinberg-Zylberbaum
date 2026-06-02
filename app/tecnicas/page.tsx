import Link from "next/link";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { todasLasTecnicas } from "@/data/libros";
import { SectionReveal } from "@/components/SectionReveal";

export const metadata = { title: "Técnicas · Sintergia" };

export default function TecnicasPage() {
  const tecnicas = todasLasTecnicas();

  return (
    <div className="mx-auto max-w-page px-5 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tightish text-ink md:text-4xl">
          Técnicas y prácticas
        </h1>
        <p className="mt-2 max-w-2xl text-subtle">
          Meditaciones y ejercicios contemplativos derivados de la obra de
          Jacobo Grinberg. Ábrelos en modo sesión para practicar con un
          temporizador.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tecnicas.map((t, i) => (
          <SectionReveal key={t.slug} delay={i * 0.03}>
            <Link href={`/tecnica/${t.slug}`} className="card card-hover flex h-full flex-col p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-verde-mint text-verde-deep">
                <Sparkles className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-lg font-semibold tracking-tightish text-ink">
                {t.nombre}
              </h2>
              <p className="mt-1 text-sm text-subtle">
                de <span className="text-ink/70">{t.libroTitulo}</span>
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-mist px-3 py-1 text-subtle">
                  <Clock className="h-3.5 w-3.5" /> {t.duracion}
                </span>
                <span className="rounded-full bg-verde-mint px-3 py-1 text-verde-deep">
                  {t.nivel}
                </span>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-verde-deep">
                Practicar <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </SectionReveal>
        ))}
      </div>
    </div>
  );
}
