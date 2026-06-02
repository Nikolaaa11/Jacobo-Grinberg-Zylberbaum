import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { buscar } from "@/lib/rag";
import { getLibro } from "@/data/libros";

export const runtime = "nodejs";
export const maxDuration = 30;

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `Eres un guía experto en la obra completa de Jacobo Grinberg-Zylberbaum.
Respondes ÚNICAMENTE con base en sus libros y en sus conceptos (Teoría Sintérgica, lattice, campo neuronal, sintergia, conciencia, el yo como idea, meditación, chamanismo mexicano, Pachita, potencial transferido).
Reglas:
- Usa los PASAJES proporcionados como tu fuente principal. Si el contexto no basta, apóyate en el conocimiento general de su obra, pero acláralo.
- Cita los libros relevantes por su título cuando los uses.
- Si algo claramente NO pertenece a su obra, dilo con honestidad.
- Tono sereno, claro y didáctico. Responde en español. Usa párrafos breves.`;

function construirContexto(pasajes: { titulo: string; texto: string }[]) {
  if (!pasajes.length) return "";
  return (
    "\n\nPASAJES RELEVANTES DE LA OBRA:\n" +
    pasajes
      .map((p, i) => `[${i + 1}] (${p.titulo})\n${p.texto}`)
      .join("\n\n---\n\n")
  );
}

export async function POST(req: Request) {
  const { messages, libro } = (await req.json()) as {
    messages: Msg[];
    libro?: string;
  };

  const ultima = [...messages].reverse().find((m) => m.role === "user");
  const consulta = ultima?.content ?? "";

  const filtro = libro && getLibro(libro) ? libro : undefined;
  const pasajes = buscar(consulta, 6, filtro);

  const fuentes = Array.from(
    new Map(pasajes.map((p) => [p.slug, { slug: p.slug, titulo: p.titulo }])).values()
  );
  const sourcesHeader = Buffer.from(JSON.stringify(fuentes)).toString("base64");

  // Sin clave: modo demo
  if (!process.env.ANTHROPIC_API_KEY) {
    const texto = demo(consulta, fuentes);
    return new Response(streamFromString(texto), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "x-sources": sourcesHeader,
        "x-demo": "1",
      },
    });
  }

  const contexto = construirContexto(pasajes);
  const sys = SYSTEM + contexto + (filtro ? `\n\n(El usuario pregunta específicamente sobre el libro: ${getLibro(filtro)?.titulo}.)` : "");

  const result = streamText({
    model: anthropic(process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-latest"),
    system: sys,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
    temperature: 0.4,
  });

  const res = result.toTextStreamResponse();
  res.headers.set("x-sources", sourcesHeader);
  return res;
}

function streamFromString(s: string): ReadableStream {
  const encoder = new TextEncoder();
  const palabras = s.split(" ");
  let i = 0;
  return new ReadableStream({
    pull(controller) {
      if (i >= palabras.length) {
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(palabras[i] + " "));
      i++;
    },
  });
}

function demo(consulta: string, fuentes: { titulo: string }[]): string {
  const refs = fuentes.length
    ? ` Para profundizar, revisa: ${fuentes.map((f) => `«${f.titulo}»`).join(", ")}.`
    : "";
  return (
    `Estás en modo demostración (sin clave de IA configurada). ` +
    `Cuando configures ANTHROPIC_API_KEY, responderé con base en los pasajes reales de la obra de Jacobo Grinberg.\n\n` +
    `Tu pregunta fue: "${consulta}".\n\n` +
    `La obra de Grinberg gira en torno a la Teoría Sintérgica: el cerebro, mediante un campo neuronal, ` +
    `interactúa con una estructura fundamental llamada lattice, y de esa interacción surge la realidad que percibimos. ` +
    `Al aumentar la sintergia (coherencia), la percepción se vuelve más unitaria.` +
    refs
  );
}
