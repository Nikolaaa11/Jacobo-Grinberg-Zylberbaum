"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles, Send, Leaf, BookOpen, User } from "lucide-react";
import { getLibro } from "@/data/libros";

type Msg = { role: "user" | "assistant"; content: string };
type Fuente = { slug: string; titulo: string };

const SUGERENCIAS = [
  "¿Qué es la Teoría Sintérgica?",
  "Guíame en una meditación auto-alusiva",
  "¿Quién fue Pachita?",
  "Explica qué es el lattice",
];

export function Asistente() {
  const params = useSearchParams();
  const libroSlug = params.get("libro") || undefined;
  const libro = libroSlug ? getLibro(libroSlug) : undefined;

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);
  const [fuentes, setFuentes] = useState<Fuente[]>([]);
  const [demo, setDemo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, cargando]);

  async function enviar(texto: string) {
    const pregunta = texto.trim();
    if (!pregunta || cargando) return;
    setInput("");
    setFuentes([]);
    const nuevos: Msg[] = [...messages, { role: "user", content: pregunta }];
    setMessages(nuevos);
    setCargando(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nuevos, libro: libroSlug }),
      });

      const sourcesB64 = res.headers.get("x-sources");
      if (sourcesB64) {
        try {
          setFuentes(JSON.parse(atob(sourcesB64)));
        } catch {}
      }
      setDemo(res.headers.get("x-demo") === "1");

      if (!res.body) throw new Error("Sin respuesta");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copia = [...m];
          copia[copia.length - 1] = {
            role: "assistant",
            content: copia[copia.length - 1].content + chunk,
          };
          return copia;
        });
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Hubo un error al responder. Inténtalo de nuevo." },
      ]);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-64px)] max-w-3xl flex-col px-5">
      {/* Encabezado */}
      <div className="py-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-verde text-white">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold tracking-tightish text-ink">
              Asistente Sintergia
            </h1>
            <p className="text-sm text-subtle">
              {libro ? (
                <>
                  Preguntando sobre{" "}
                  <Link href={`/libro/${libro.slug}`} className="text-verde-deep hover:underline">
                    {libro.titulo}
                  </Link>
                </>
              ) : (
                "Responde con base en la obra de Jacobo Grinberg"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto pb-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-verde-mint text-verde-deep">
              <Leaf className="h-8 w-8" />
            </span>
            <p className="mt-4 max-w-sm text-subtle">
              Pregunta lo que quieras sobre las enseñanzas, conceptos y técnicas
              de Jacobo Grinberg.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SUGERENCIAS.map((s) => (
                <button
                  key={s}
                  onClick={() => enviar(s)}
                  className="rounded-full border border-hair bg-white px-4 py-2 text-sm text-ink transition hover:border-verde hover:text-verde-deep"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <span
              className={`flex h-8 w-8 flex-none items-center justify-center rounded-full ${
                m.role === "user" ? "bg-ink text-white" : "bg-verde text-white"
              }`}
            >
              {m.role === "user" ? <User className="h-4 w-4" /> : <Leaf className="h-4 w-4" />}
            </span>
            <div
              className={`max-w-[80%] whitespace-pre-wrap rounded-3xl px-5 py-3 text-[15px] leading-relaxed ${
                m.role === "user"
                  ? "bg-ink text-white"
                  : "border border-hair bg-white text-ink/90"
              }`}
            >
              {m.content || (cargando && i === messages.length - 1 ? "…" : "")}
            </div>
          </div>
        ))}

        {/* Fuentes */}
        {fuentes.length > 0 && !cargando && (
          <div className="ml-11">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-subtle">
              Fuentes
            </p>
            <div className="flex flex-wrap gap-1.5">
              {fuentes.map((f) => (
                <Link
                  key={f.slug}
                  href={`/libro/${f.slug}`}
                  className="inline-flex items-center gap-1 rounded-full border border-hair bg-white px-3 py-1 text-xs font-medium text-ink transition hover:border-verde hover:text-verde-deep"
                >
                  <BookOpen className="h-3 w-3" /> {f.titulo}
                </Link>
              ))}
            </div>
          </div>
        )}

        {demo && (
          <div className="ml-11 rounded-2xl bg-verde-mint px-4 py-2 text-xs text-verde-deep">
            Modo demostración · configura ANTHROPIC_API_KEY para respuestas completas.
          </div>
        )}
      </div>

      {/* Entrada */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          enviar(input);
        }}
        className="sticky bottom-0 bg-white py-4"
      >
        <div className="flex items-center gap-2 rounded-full border border-hair bg-white p-1.5 pl-5 shadow-apple focus-within:border-verde focus-within:ring-2 focus-within:ring-verde/20">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta…"
            disabled={cargando}
            className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-subtle"
          />
          <button
            type="submit"
            disabled={cargando || !input.trim()}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-verde text-white transition hover:bg-verde-deep disabled:opacity-40"
            aria-label="Enviar"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
