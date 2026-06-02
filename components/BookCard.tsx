import Link from "next/link";
import type { Libro } from "@/data/libros";
import { TEMAS } from "@/data/libros";
import { BookCover } from "./BookCover";

export function BookCard({ libro }: { libro: Libro }) {
  return (
    <Link href={`/libro/${libro.slug}`} className="group block">
      <div className="card card-hover h-full p-3">
        <BookCover
          titulo={libro.titulo}
          subtitulo={libro.subtitulo}
          anio={libro.anio}
          tema={libro.temas[0]}
          className="shadow-sm"
        />
        <div className="px-1.5 pb-1 pt-3">
          <h3 className="text-[15px] font-semibold leading-snug tracking-tightish text-ink">
            {libro.titulo}
            {libro.subtitulo ? (
              <span className="font-normal text-subtle"> · {libro.subtitulo}</span>
            ) : null}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-subtle">
            {libro.resumen}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {libro.temas.slice(0, 2).map((t) => (
              <span key={t} className="tag">
                {TEMAS[t].nombre.split(" ")[0]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
