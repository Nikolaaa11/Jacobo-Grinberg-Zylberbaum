import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";

export const metadata = { title: "Sobre Jacobo Grinberg · Sintergia" };

const HITOS = [
  { a: "1946", t: "Nace en la Ciudad de México." },
  { a: "1970s", t: "Se forma como neurofisiólogo e investiga la actividad cerebral y la conciencia en la UNAM." },
  { a: "1975", t: "Publica sus primeras obras: La Construcción de la Realidad y La Experiencia Interna." },
  { a: "1987", t: "Tesis doctoral sobre los correlativos electrofisiológicos de la comunicación humana; experimentos del 'potencial transferido'." },
  { a: "Años 80–90", t: "Desarrolla y publica la Teoría Sintérgica y la serie Los Chamanes de México; estudia a la curandera Pachita." },
  { a: "1994", t: "Desaparece sin dejar rastro. Su caso permanece sin resolver." },
];

export default function SobreJacoboPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <SectionReveal>
        <span className="tag mb-4">Biografía</span>
        <h1 className="text-3xl font-bold tracking-tightish text-ink md:text-5xl">
          Jacobo Grinberg-Zylberbaum
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-subtle">
          Neurofisiólogo, investigador y pensador mexicano (1946–desaparecido en
          1994). Dedicó su vida a tender un puente entre la ciencia del cerebro y
          la experiencia de la conciencia.
        </p>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="prose-grin mt-10">
          <p>
            Jacobo Grinberg-Zylberbaum fue uno de los científicos más originales
            y polémicos de México. Formado como neurofisiólogo, dirigió
            investigaciones en la Universidad Nacional Autónoma de México (UNAM)
            donde estudió la actividad eléctrica del cerebro, la percepción y los
            estados de conciencia.
          </p>
          <p>
            Su aportación teórica más ambiciosa fue la{" "}
            <strong>Teoría Sintérgica</strong>, según la cual el cerebro
            interactúa —a través de un campo neuronal— con una estructura
            informacional fundamental que llamó <strong>lattice</strong>. De esa
            interacción surgiría la realidad que percibimos y la conciencia misma.
            Cuanto mayor es la coherencia, o <strong>sintergia</strong>, menor es
            la distorsión y más unitaria la experiencia.
          </p>
          <p>
            En paralelo a su trabajo experimental —incluido el célebre
            experimento del <strong>potencial transferido</strong>, que sugería
            correlaciones cerebrales entre personas aisladas— Grinberg se interesó
            por el chamanismo mexicano. Estudió de cerca a la curandera{" "}
            <strong>Pachita</strong> y escribió la extensa serie{" "}
            <em>Los Chamanes de México</em>, buscando integrar la sabiduría
            tradicional con la neurociencia.
          </p>
          <p>
            En diciembre de <strong>1994</strong>, Grinberg desapareció sin dejar
            rastro. Su caso nunca se resolvió y rodea su figura de un halo de
            misterio. Su obra —más de cuarenta libros— sigue inspirando a quienes
            exploran la frontera entre cerebro, conciencia y realidad.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div className="mt-14 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-bold tracking-tightish text-ink">
            Línea de tiempo
          </h2>
          <Link
            href="/cronologia"
            className="text-sm font-medium text-verde-deep hover:underline"
          >
            Ver cronología de sus 33 libros →
          </Link>
        </div>
        <div className="mt-6 space-y-4">
          {HITOS.map((h) => (
            <div key={h.a} className="flex gap-4">
              <div className="w-20 flex-none text-right text-sm font-semibold text-verde-deep">
                {h.a}
              </div>
              <div className="relative flex-1 border-l border-hair pb-2 pl-5">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-verde" />
                <p className="text-[15px] leading-relaxed text-ink/85">{h.t}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <div className="mt-14 rounded-4xl bg-verde-mint p-8 text-center">
          <h3 className="text-xl font-bold tracking-tightish text-ink">
            Explora su obra con un asistente que la conoce
          </h3>
          <p className="mx-auto mt-2 max-w-md text-subtle">
            Pregunta cualquier cosa sobre sus libros, conceptos y técnicas.
          </p>
          <Link href="/asistente" className="btn-verde mt-5">
            <Sparkles className="h-4 w-4" />
            Abrir el asistente
          </Link>
        </div>
      </SectionReveal>

      <p className="mt-10 text-xs leading-relaxed text-subtle">
        Nota: esta semblanza recoge datos ampliamente difundidos sobre la vida y
        obra de Jacobo Grinberg. Algunos detalles biográficos siguen siendo
        objeto de debate.
      </p>
    </div>
  );
}
