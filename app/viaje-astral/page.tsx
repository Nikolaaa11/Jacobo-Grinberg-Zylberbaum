import Link from "next/link";
import {
  Sparkles,
  Moon,
  Waves,
  Eye,
  Infinity as InfinityIcon,
  Wind,
  ShieldCheck,
  Play,
  AlertTriangle,
  Compass,
} from "lucide-react";
import { getLibro, getConcepto } from "@/data/libros";
import { BookCover } from "@/components/BookCover";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionReveal } from "@/components/SectionReveal";

export const metadata = {
  title: "¿Cómo puedo pasar mi cuerpo a astral? · Sintergia",
  description:
    "El viaje astral y el 'doble' según la obra de Jacobo Grinberg: fundamento sintérgico, guía práctica paso a paso, señales y libros relacionados.",
};

const LIBROS_REL = [
  "chamanes-vii-el-doble",
  "el-potencial-transferido",
  "vision-extra-ocular",
  "el-espacio-y-la-conciencia",
  "retorno-a-la-luz",
  "correlativos-electrofisiologicos",
];

const CONCEPTOS_REL = [
  "comunicacion-sintergica",
  "campo-neuronal",
  "lattice",
  "no-ego",
  "experiencia-unitaria",
];

const FUNDAMENTOS = [
  {
    icon: <InfinityIcon className="h-5 w-5" />,
    titulo: "La conciencia no está encerrada en el cuerpo",
    texto:
      "Para la Teoría Sintérgica, el cerebro interactúa con la Lattice, una estructura no local. Si la conciencia surge de esa relación, su 'lugar' no se reduce al cuerpo físico: puede desplazarse dentro del campo.",
  },
  {
    icon: <Waves className="h-5 w-5" />,
    titulo: "El potencial transferido",
    texto:
      "Grinberg mostró experimentalmente que cerebros que han interactuado pueden correlacionar su actividad a distancia, sin contacto. Es su base empírica para una conexión no local entre conciencias.",
  },
  {
    icon: <Eye className="h-5 w-5" />,
    titulo: "Percibir sin los ojos",
    texto:
      "Sus estudios de visión extra-ocular sugieren que la percepción no depende únicamente de los órganos sensoriales: podemos percibir a través del campo. El 'doble' lleva esa idea al límite.",
  },
  {
    icon: <Moon className="h-5 w-5" />,
    titulo: "El yo es una idea",
    texto:
      "El obstáculo principal es la identificación con el yo y con el esquema corporal. Al soltar esa idea (estados de no-ego), el punto desde el que percibimos puede aflojarse y reubicarse.",
  },
];

const PASOS = [
  {
    t: "Relaja el cuerpo por completo",
    d: "Acostado y en calma, recorre el cuerpo soltando cada zona hasta dejar de sentir su peso. Disuelve poco a poco el esquema corporal.",
  },
  {
    t: "Aquieta el yo",
    d: "Recuerda que el 'yo' es una idea. Suelta la autorreferencia y la narración mental. No hay nadie que deba 'lograr' nada.",
  },
  {
    t: "Aumenta tu sintergia",
    d: "Unifica la atención en un solo campo de experiencia, sin fragmentarla. Esa coherencia creciente es la llave del estado.",
  },
  {
    t: "Expande el espacio de conciencia",
    d: "Siente el espacio interior y déjalo crecer más allá de los límites del cuerpo, disolviendo la frontera entre dentro y fuera.",
  },
  {
    t: "Desplaza el punto de percepción",
    d: "Lleva el 'desde dónde percibes' a un lugar fuera del cuerpo —un rincón de la habitación—. Sostén la percepción ahí, sin forzar.",
  },
  {
    t: "Estabiliza y regresa con suavidad",
    d: "Explora con calma. Para volver, reorienta la atención al cuerpo físico y muévelo poco a poco. Regresa siempre despacio.",
  },
];

const SENALES = [
  "Vibraciones o zumbidos recorriendo el cuerpo.",
  "Sensación de flotar, girar o de pesadez/ligereza repentina.",
  "Impresión de separación o de 'salir' por la cabeza o el pecho.",
  "Percepción sin abrir los ojos; imágenes nítidas del entorno.",
  "Quietud profunda con plena lucidez (umbral vigilia–sueño).",
];

export default function ViajeAstralPage() {
  const libros = LIBROS_REL.map(getLibro).filter(Boolean);
  const conceptos = CONCEPTOS_REL.map(getConcepto).filter(Boolean);

  return (
    <div className="mx-auto max-w-page px-5 py-10">
      <Breadcrumbs items={[{ label: "Viaje astral" }]} />

      {/* HERO */}
      <SectionReveal>
        <span className="tag mb-4">
          <Moon className="mr-1.5 h-3.5 w-3.5" /> El doble · según la obra de Jacobo Grinberg
        </span>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tightish text-ink md:text-5xl">
          ¿Cómo puedo pasar mi cuerpo a astral?
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-subtle">
          El llamado "viaje astral" —proyectar la conciencia fuera del cuerpo—
          aparece en la obra de Grinberg como el fenómeno del <strong>doble</strong>.
          Aquí lo explicamos desde su Teoría Sintérgica y te damos una guía
          práctica para explorarlo con seguridad.
        </p>
      </SectionReveal>

      {/* AVISO / ENCUADRE */}
      <SectionReveal delay={0.05}>
        <div className="mt-8 flex gap-3 rounded-3xl border border-verde/30 bg-verde-mint/60 p-5">
          <AlertTriangle className="h-5 w-5 flex-none text-verde-deep" />
          <p className="text-sm leading-relaxed text-ink/80">
            Esta sección reúne ideas y prácticas <strong>derivadas de los libros
            de Jacobo Grinberg</strong> (especialmente <em>Los Chamanes de México
            VII: El Doble</em>). Es material contemplativo y experiencial, no una
            promesa de resultados ni un consejo médico. Practica con calma, sin
            forzar, y regresa siempre con suavidad.
          </p>
        </div>
      </SectionReveal>

      {/* QUÉ ES EL DOBLE */}
      <section className="mt-14">
        <SectionReveal>
          <h2 className="text-2xl font-bold tracking-tightish text-ink md:text-3xl">
            El "doble" según Grinberg
          </h2>
          <div className="prose-grin mt-4 max-w-3xl">
            <p>
              En la tradición chamánica mexicana que Grinberg estudió, el{" "}
              <strong>doble</strong> es un cuerpo energético capaz de percibir y
              actuar más allá del cuerpo físico. Lejos de descartarlo, Grinberg lo
              interpretó con su propio modelo: si la realidad y la conciencia
              surgen de la interacción entre el <strong>campo neuronal</strong> y
              la <strong>Lattice</strong> —una estructura fundamental y no local—,
              entonces el punto desde el que percibimos no está fijado de manera
              absoluta al cuerpo.
            </p>
            <p>
              "Pasar al astral" sería, en estos términos, <strong>reubicar el foco
              de la conciencia dentro del campo</strong>: percibir desde un lugar
              que no coincide con la posición física del cuerpo. Su experimento
              del potencial transferido y sus estudios de visión extra-ocular
              apuntan a que esa no-localidad de la percepción es posible.
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* FUNDAMENTO SINTÉRGICO */}
      <section className="mt-14">
        <SectionReveal>
          <h2 className="text-2xl font-bold tracking-tightish text-ink md:text-3xl">
            El fundamento sintérgico
          </h2>
          <p className="mt-2 max-w-2xl text-subtle">
            Cuatro ideas de su obra que sostienen la posibilidad del doble.
          </p>
        </SectionReveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {FUNDAMENTOS.map((f, i) => (
            <SectionReveal key={i} delay={i * 0.04}>
              <div className="card h-full p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-verde-mint text-verde-deep">
                  {f.icon}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tightish text-ink">
                  {f.titulo}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-subtle">
                  {f.texto}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* PRÁCTICA PASO A PASO */}
      <section className="mt-16">
        <SectionReveal>
          <div className="flex items-center gap-2">
            <Wind className="h-6 w-6 text-verde" />
            <h2 className="text-2xl font-bold tracking-tightish text-ink md:text-3xl">
              La práctica, paso a paso
            </h2>
          </div>
          <p className="mt-2 max-w-2xl text-subtle">
            Una secuencia construida a partir de sus técnicas de relajación,
            disolución del yo y expansión de la conciencia.
          </p>
        </SectionReveal>

        <div className="mt-8 space-y-4">
          {PASOS.map((p, i) => (
            <SectionReveal key={i} delay={i * 0.03}>
              <div className="card flex gap-4 p-5">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-verde text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tightish text-ink">
                    {p.t}
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink/80">
                    {p.d}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/tecnica/chamanes-vii-el-doble-1" className="btn-ghost">
              <Play className="h-4 w-4" /> Sesión: Relajación para el desdoblamiento
            </Link>
            <Link href="/tecnica/chamanes-vii-el-doble-2" className="btn-verde">
              <Play className="h-4 w-4" /> Sesión: Salida del doble
            </Link>
          </div>
        </SectionReveal>
      </section>

      {/* SEÑALES */}
      <section className="mt-16">
        <SectionReveal>
          <h2 className="text-2xl font-bold tracking-tightish text-ink md:text-3xl">
            Señales que pueden aparecer
          </h2>
          <p className="mt-2 max-w-2xl text-subtle">
            No son obligatorias ni un objetivo en sí; solo indicios frecuentes en
            el umbral del desdoblamiento.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {SENALES.map((s, i) => (
              <li key={i} className="card flex items-start gap-3 p-4">
                <Waves className="mt-0.5 h-5 w-5 flex-none text-verde" />
                <span className="text-[15px] leading-relaxed text-ink/80">{s}</span>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </section>

      {/* SEGURIDAD */}
      <section className="mt-16">
        <SectionReveal>
          <div className="rounded-4xl bg-mist p-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-verde-deep" />
              <h2 className="text-xl font-bold tracking-tightish text-ink">
                Recomendaciones
              </h2>
            </div>
            <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-ink/80">
              {[
                "Practica en un lugar seguro y tranquilo, sin prisa ni expectativa de “lograrlo”.",
                "El miedo cierra el proceso: si sientes temor, respira, observa y regresa.",
                "Vuelve siempre despacio al cuerpo; date un momento antes de levantarte.",
                "La constancia y la relajación importan más que la intensidad.",
                "Si tienes una condición médica o psicológica, consúltalo con un profesional.",
              ].map((r, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-verde" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </section>

      {/* LIBROS RELACIONADOS */}
      <section className="mt-16">
        <SectionReveal>
          <h2 className="text-2xl font-bold tracking-tightish text-ink md:text-3xl">
            Libros donde profundizar
          </h2>
        </SectionReveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {libros.map((l) =>
            l ? (
              <Link
                key={l.slug}
                href={`/libro/${l.slug}`}
                className="card card-hover flex items-center gap-3 p-4"
              >
                <div className="w-12 flex-none">
                  <BookCover titulo={l.titulo} anio={l.anio} tema={l.temas[0]} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug text-ink">
                    {l.titulo}
                    {l.subtitulo ? (
                      <span className="font-normal text-subtle"> · {l.subtitulo}</span>
                    ) : null}
                  </p>
                  <p className="text-xs text-subtle">{l.anio}</p>
                </div>
              </Link>
            ) : null
          )}
        </div>
      </section>

      {/* CONCEPTOS */}
      <section className="mt-14">
        <SectionReveal>
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tightish text-ink">
            <Compass className="h-5 w-5 text-verde" /> Conceptos relacionados
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {conceptos.map((c) =>
              c ? (
                <Link
                  key={c.slug}
                  href={`/conceptos#${c.slug}`}
                  className="rounded-full border border-hair bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-verde hover:text-verde-deep"
                >
                  {c.nombre}
                </Link>
              ) : null
            )}
          </div>
        </SectionReveal>
      </section>

      {/* CTA */}
      <SectionReveal>
        <div className="mt-16 rounded-4xl bg-gradient-to-br from-verde-deep to-verde p-10 text-center text-white">
          <h2 className="text-2xl font-bold tracking-tightish md:text-3xl">
            ¿Preguntas sobre el doble?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/90">
            El asistente puede orientarte citando los libros de Grinberg sobre el
            doble, el potencial transferido y la percepción no local.
          </p>
          <Link
            href="/asistente?libro=chamanes-vii-el-doble"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-verde-deep transition-all hover:bg-white/90 active:scale-[0.98]"
          >
            <Sparkles className="h-4 w-4" />
            Preguntar al asistente
          </Link>
        </div>
      </SectionReveal>
    </div>
  );
}
