"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { LIBROS, TEMAS, type TemaId } from "@/data/libros";
import { BookCard } from "@/components/BookCard";

const TEMA_IDS = Object.keys(TEMAS) as TemaId[];

export function BibliotecaClient() {
  const params = useSearchParams();
  const [tema, setTema] = useState<TemaId | "todos">("todos");
  const [q, setQ] = useState("");
  const [orden, setOrden] = useState<"anio" | "titulo">("anio");

  useEffect(() => {
    const t = params.get("tema") as TemaId | null;
    if (t && TEMA_IDS.includes(t)) setTema(t);
  }, [params]);

  const libros = useMemo(() => {
    let out = [...LIBROS];
    if (tema !== "todos") out = out.filter((l) => l.temas.includes(tema));
    if (q.trim()) {
      const needle = q
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "");
      out = out.filter((l) =>
        `${l.titulo} ${l.subtitulo} ${l.resumen} ${l.ensenanzas.join(" ")}`
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .includes(needle)
      );
    }
    out.sort((a, b) =>
      orden === "anio" ? a.anio - b.anio : a.titulo.localeCompare(b.titulo)
    );
    return out;
  }, [tema, q, orden]);

  return (
    <div className="mx-auto max-w-page px-5 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tightish text-ink md:text-4xl">
          Biblioteca
        </h1>
        <p className="mt-2 text-subtle">
          Los {LIBROS.length} libros de Jacobo Grinberg-Zylberbaum, organizados y
          listados.
        </p>
      </header>

      {/* Controles */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por título, idea o enseñanza…"
            className="w-full rounded-full border border-hair bg-white py-3 pl-11 pr-10 text-sm outline-none transition focus:border-verde focus:ring-2 focus:ring-verde/20"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-subtle hover:text-ink"
              aria-label="Limpiar"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setTema("todos")}
            className={chip(tema === "todos")}
          >
            Todos
          </button>
          {TEMA_IDS.map((id) => (
            <button key={id} onClick={() => setTema(id)} className={chip(tema === id)}>
              {TEMAS[id].nombre.split(" ")[0]}
            </button>
          ))}
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value as "anio" | "titulo")}
            className="ml-auto rounded-full border border-hair bg-white px-4 py-2 text-sm text-ink outline-none focus:border-verde"
          >
            <option value="anio">Ordenar por año</option>
            <option value="titulo">Ordenar por título</option>
          </select>
        </div>
      </div>

      <p className="mb-5 text-sm text-subtle">
        {libros.length} {libros.length === 1 ? "libro" : "libros"}
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {libros.map((libro) => (
          <BookCard key={libro.slug} libro={libro} />
        ))}
      </div>

      {libros.length === 0 && (
        <div className="card mt-4 p-12 text-center text-subtle">
          No se encontraron libros con esos criterios.
        </div>
      )}
    </div>
  );
}

function chip(active: boolean) {
  return `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
    active
      ? "border-verde bg-verde text-white"
      : "border-hair bg-white text-subtle hover:text-ink"
  }`;
}
