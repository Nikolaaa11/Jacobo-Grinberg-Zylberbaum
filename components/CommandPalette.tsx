"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  BookOpen,
  Compass,
  Sparkles,
  Route,
  Moon,
  FileText,
  CornerDownLeft,
} from "lucide-react";
import { LIBROS, CONCEPTOS, todasLasTecnicas } from "@/data/libros";
import { RUTAS } from "@/data/rutas";

type Item = {
  tipo: string;
  icon: React.ReactNode;
  titulo: string;
  sub?: string;
  href: string;
  buscar: string;
};

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function buildIndex(): Item[] {
  const items: Item[] = [];
  const paginas = [
    { t: "Biblioteca", h: "/biblioteca", i: <BookOpen className="h-4 w-4" /> },
    { t: "Rutas de lectura", h: "/rutas", i: <Route className="h-4 w-4" /> },
    { t: "Enseñanzas", h: "/ensenanzas", i: <Sparkles className="h-4 w-4" /> },
    { t: "Técnicas", h: "/tecnicas", i: <Sparkles className="h-4 w-4" /> },
    { t: "Conceptos", h: "/conceptos", i: <Compass className="h-4 w-4" /> },
    { t: "¿Cómo pasar mi cuerpo a astral?", h: "/viaje-astral", i: <Moon className="h-4 w-4" /> },
    { t: "Cronología de la obra", h: "/cronologia", i: <FileText className="h-4 w-4" /> },
    { t: "Asistente IA", h: "/asistente", i: <Sparkles className="h-4 w-4" /> },
    { t: "Sobre Jacobo", h: "/sobre-jacobo", i: <FileText className="h-4 w-4" /> },
  ];
  for (const p of paginas)
    items.push({ tipo: "Sección", icon: p.i, titulo: p.t, href: p.h, buscar: norm(p.t) });

  for (const l of LIBROS)
    items.push({
      tipo: "Libro",
      icon: <BookOpen className="h-4 w-4" />,
      titulo: l.titulo,
      sub: l.subtitulo || String(l.anio),
      href: `/libro/${l.slug}`,
      buscar: norm(`${l.titulo} ${l.subtitulo} ${l.resumen}`),
    });

  for (const c of CONCEPTOS)
    items.push({
      tipo: "Concepto",
      icon: <Compass className="h-4 w-4" />,
      titulo: c.nombre,
      sub: "Glosario",
      href: `/conceptos#${c.slug}`,
      buscar: norm(`${c.nombre} ${c.definicion}`),
    });

  for (const r of RUTAS)
    items.push({
      tipo: "Ruta",
      icon: <Route className="h-4 w-4" />,
      titulo: r.titulo,
      sub: r.lema,
      href: `/ruta/${r.slug}`,
      buscar: norm(`${r.titulo} ${r.lema} ${r.descripcion}`),
    });

  for (const t of todasLasTecnicas())
    items.push({
      tipo: "Técnica",
      icon: <Sparkles className="h-4 w-4" />,
      titulo: t.nombre,
      sub: t.libroTitulo,
      href: `/tecnica/${t.slug}`,
      buscar: norm(`${t.nombre} ${t.libroTitulo}`),
    });

  return items;
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(buildIndex, []);

  // Atajo ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const resultados = useMemo(() => {
    const needle = norm(q.trim());
    if (!needle) return index.filter((i) => i.tipo === "Sección").slice(0, 6);
    const tokens = needle.split(/\s+/);
    return index
      .map((it) => {
        let score = 0;
        for (const t of tokens) {
          if (!it.buscar.includes(t)) return { it, score: -1 };
          if (norm(it.titulo).includes(t)) score += 2;
          score += 1;
        }
        if (norm(it.titulo).startsWith(needle)) score += 3;
        return { it, score };
      })
      .filter((r) => r.score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((r) => r.it);
  }, [q, index]);

  useEffect(() => {
    setSel(0);
  }, [q]);

  function go(item: Item) {
    setOpen(false);
    router.push(item.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, resultados.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && resultados[sel]) {
      e.preventDefault();
      go(resultados[sel]);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Buscar"
        className="flex items-center gap-2 rounded-full border border-hair bg-white px-3 py-2 text-sm text-subtle transition hover:border-verde/50 hover:text-ink"
      >
        <Search className="h-4 w-4" />
        <span className="hidden lg:inline">Buscar</span>
        <span className="hidden rounded-md border border-hair bg-mist px-1.5 py-0.5 text-[11px] font-medium lg:inline">
          ⌘K
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/30 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-3xl border border-hair bg-white shadow-apple-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-hair px-4">
              <Search className="h-5 w-5 flex-none text-subtle" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Busca libros, conceptos, técnicas…"
                className="w-full bg-transparent py-4 text-[15px] outline-none placeholder:text-subtle"
              />
              <kbd className="hidden rounded-md border border-hair bg-mist px-1.5 py-0.5 text-[11px] text-subtle sm:inline">
                Esc
              </kbd>
            </div>

            <ul className="max-h-[55vh] overflow-y-auto p-2">
              {resultados.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-subtle">
                  Sin resultados para “{q}”.
                </li>
              )}
              {resultados.map((it, i) => (
                <li key={it.href + i}>
                  <button
                    onMouseEnter={() => setSel(i)}
                    onClick={() => go(it)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition ${
                      i === sel ? "bg-verde-mint" : "hover:bg-mist"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg ${
                        i === sel ? "bg-verde text-white" : "bg-mist text-subtle"
                      }`}
                    >
                      {it.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">
                        {it.titulo}
                      </span>
                      {it.sub ? (
                        <span className="block truncate text-xs text-subtle">{it.sub}</span>
                      ) : null}
                    </span>
                    <span className="flex-none rounded-full bg-mist px-2 py-0.5 text-[11px] text-subtle">
                      {it.tipo}
                    </span>
                    {i === sel && (
                      <CornerDownLeft className="h-4 w-4 flex-none text-verde-deep" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
