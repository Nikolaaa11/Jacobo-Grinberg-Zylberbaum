import type { TemaId } from "@/data/libros";

const GRADIENTS: Record<TemaId, string> = {
  sintergia: "from-[#1E8E3E] to-[#34C759]",
  "conciencia-yo": "from-[#0E7C5A] to-[#34C759]",
  meditacion: "from-[#2BA84A] to-[#7BD88F]",
  chamanismo: "from-[#155D33] to-[#2BA84A]",
  percepcion: "from-[#1E8E3E] to-[#5CC97A]",
  "poesia-mistica": "from-[#2BA84A] to-[#34C759]",
};

export function BookCover({
  titulo,
  subtitulo,
  anio,
  tema,
  className = "",
}: {
  titulo: string;
  subtitulo?: string;
  anio: number;
  tema: TemaId;
  className?: string;
}) {
  return (
    <div
      className={`relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${GRADIENTS[tema]} p-4 text-white ${className}`}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-black/10" />
      <span className="relative text-[10px] font-medium uppercase tracking-widest text-white/70">
        Jacobo Grinberg
      </span>
      <div className="relative">
        <h3 className="text-[15px] font-semibold leading-tight tracking-tightish">
          {titulo}
        </h3>
        {subtitulo ? (
          <p className="mt-1 text-xs leading-snug text-white/80">{subtitulo}</p>
        ) : null}
        <span className="mt-2 inline-block text-xs text-white/70">{anio}</span>
      </div>
    </div>
  );
}
