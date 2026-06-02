import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { todasLasTecnicas, getTecnica } from "@/data/libros";
import { SesionTecnica } from "@/components/SesionTecnica";

export function generateStaticParams() {
  return todasLasTecnicas().map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const t = getTecnica(params.slug);
  return { title: t ? `${t.nombre} · Sintergia` : "Técnica · Sintergia" };
}

export default function TecnicaPage({ params }: { params: { slug: string } }) {
  const t = getTecnica(params.slug);
  if (!t) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Link
        href="/tecnicas"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-subtle hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" /> Técnicas
      </Link>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 rounded-full bg-mist px-3 py-1 text-subtle">
          <Clock className="h-3.5 w-3.5" /> {t.duracion}
        </span>
        <span className="rounded-full bg-verde-mint px-3 py-1 text-verde-deep">
          {t.nivel}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tightish text-ink md:text-4xl">
        {t.nombre}
      </h1>
      <Link
        href={`/libro/${t.libroSlug}`}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-verde-deep hover:underline"
      >
        <BookOpen className="h-4 w-4" /> {t.libroTitulo}
      </Link>

      <div className="mt-8">
        <SesionTecnica pasos={t.pasos} />
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tightish text-ink">Pasos</h2>
      <ol className="mt-5 space-y-4">
        {t.pasos.map((p, i) => (
          <li key={i} className="card flex gap-4 p-5">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-verde text-sm font-semibold text-white">
              {i + 1}
            </span>
            <p className="text-[16px] leading-relaxed text-ink/85">{p}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
