import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Compass,
  Brain,
  ArrowRight,
  Layers,
} from "lucide-react";
import { LIBROS, TEMAS, CONCEPTOS, type TemaId } from "@/data/libros";
import { SectionReveal } from "@/components/SectionReveal";
import { BookCard } from "@/components/BookCard";

const TEMA_ICON: Record<TemaId, React.ReactNode> = {
  sintergia: <Layers className="h-5 w-5" />,
  "conciencia-yo": <Brain className="h-5 w-5" />,
  meditacion: <Sparkles className="h-5 w-5" />,
  chamanismo: <Compass className="h-5 w-5" />,
  percepcion: <BookOpen className="h-5 w-5" />,
  "poesia-mistica": <Sparkles className="h-5 w-5" />,
};

export default function Home() {
  const destacados = LIBROS.filter((l) =>
    ["la-teoria-sintergica", "el-potencial-transferido", "chamanes-iii-pachita", "la-meditacion"].includes(
      l.slug
    )
  );

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-verde-mint/40 to-white" />
        <div className="relative mx-auto max-w-page px-5 pb-16 pt-20 text-center md:pt-28">
          <SectionReveal>
            <span className="tag mb-5">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Centro de conocimiento · {LIBROS.length} libros
            </span>
          </SectionReveal>
          <SectionReveal delay={0.05}>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-[1.07] tracking-tightish text-ink md:text-6xl">
              La obra completa de{" "}
              <span className="text-verde-deep">Jacobo Grinberg</span>, viva e
              inteligente.
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-subtle">
              Explora las enseñanzas, conceptos y técnicas de su Teoría
              Sintérgica, su trabajo sobre la conciencia, la meditación y el
              chamanismo mexicano. Pregunta lo que quieras a un asistente que
              conoce sus libros.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/asistente" className="btn-verde">
                <Sparkles className="h-4 w-4" />
                Preguntar a la IA
              </Link>
              <Link href="/biblioteca" className="btn-ghost">
                <BookOpen className="h-4 w-4" />
                Explorar la biblioteca
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-page px-5">
        <SectionReveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { n: `${LIBROS.length}`, l: "Libros" },
              { n: "6", l: "Temas" },
              { n: `${CONCEPTOS.length}`, l: "Conceptos clave" },
              { n: "1", l: "Asistente IA" },
            ].map((s) => (
              <div key={s.l} className="card p-6 text-center">
                <div className="text-3xl font-bold tracking-tightish text-verde-deep">
                  {s.n}
                </div>
                <div className="mt-1 text-sm text-subtle">{s.l}</div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* TEMAS */}
      <section className="mx-auto max-w-page px-5 pt-20">
        <SectionReveal>
          <h2 className="text-2xl font-bold tracking-tightish text-ink md:text-3xl">
            Recorre su pensamiento por temas
          </h2>
          <p className="mt-2 max-w-2xl text-subtle">
            Seis grandes hilos atraviesan toda su obra.
          </p>
        </SectionReveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(TEMAS) as TemaId[]).map((id, i) => {
            const count = LIBROS.filter((l) => l.temas.includes(id)).length;
            return (
              <SectionReveal key={id} delay={i * 0.04}>
                <Link
                  href={`/biblioteca?tema=${id}`}
                  className="card card-hover flex h-full flex-col p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-verde-mint text-verde-deep">
                    {TEMA_ICON[id]}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tightish text-ink">
                    {TEMAS[id].nombre}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-subtle">
                    {TEMAS[id].descripcion}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-verde-deep">
                    {count} libros <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </SectionReveal>
            );
          })}
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="mx-auto max-w-page px-5 pt-20">
        <SectionReveal>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tightish text-ink md:text-3xl">
                Libros esenciales
              </h2>
              <p className="mt-2 text-subtle">Por dónde empezar.</p>
            </div>
            <Link
              href="/biblioteca"
              className="hidden items-center gap-1 text-sm font-medium text-verde-deep hover:underline sm:inline-flex"
            >
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </SectionReveal>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {destacados.map((libro, i) => (
            <SectionReveal key={libro.slug} delay={i * 0.05}>
              <BookCard libro={libro} />
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* CTA ASISTENTE */}
      <section className="mx-auto max-w-page px-5 pt-20">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-verde-deep to-verde p-10 text-white md:p-16">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
            <div className="relative max-w-xl">
              <h2 className="text-3xl font-bold tracking-tightish md:text-4xl">
                Habla con la obra de Jacobo
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/90">
                El asistente responde con base en sus libros y cita las fuentes.
                Pregunta por la Teoría Sintérgica, una meditación o quién fue
                Pachita.
              </p>
              <Link
                href="/asistente"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-verde-deep transition-all hover:bg-white/90 active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4" />
                Abrir el asistente
              </Link>
            </div>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
