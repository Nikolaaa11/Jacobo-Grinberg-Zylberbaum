// Recuperación léxica (BM25) sobre los chunks extraídos de los PDFs.
// No requiere API de embeddings: indexa data/corpus.json en memoria.
import corpus from "@/data/corpus.json";
import catalogo from "@/data/catalogo.json";

type RawLibro = {
  slug: string;
  titulo: string;
  paginas: number;
  palabras: number;
  chunks: { id: string; texto: string }[];
};

export type Pasaje = {
  id: string;
  slug: string;
  titulo: string;
  texto: string;
  score: number;
};

const STOP = new Set(
  "de la el los las un una unos unas y o u que en a al del se su sus lo le les por para con sin como mas más es son ser este esta estos estas ese esa eso esto su sí no ni qué cuál cómo donde cuando porque entre sobre hacia desde hasta ya muy también pero si sus nos me te lo".split(
    /\s+/
  )
);

function normaliza(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9ñ\s]/g, " ");
}

function tokeniza(s: string): string[] {
  return normaliza(s)
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP.has(t));
}

type Doc = {
  id: string;
  slug: string;
  titulo: string;
  texto: string;
  tokens: string[];
  len: number;
};

let DOCS: Doc[] | null = null;
let DF: Map<string, number> | null = null;
let AVGLEN = 0;

function index() {
  if (DOCS) return;
  DOCS = [];
  DF = new Map();
  const push = (id: string, slug: string, titulo: string, texto: string) => {
    const tokens = tokeniza(texto);
    if (!tokens.length) return;
    DOCS!.push({ id, slug, titulo, texto, tokens, len: tokens.length });
    for (const t of new Set(tokens)) DF!.set(t, (DF!.get(t) || 0) + 1);
  };

  // 1) Chunks reales extraídos de los PDFs.
  const libros = corpus as RawLibro[];
  for (const libro of libros) {
    for (const ch of libro.chunks) {
      push(ch.id, libro.slug, libro.titulo, ch.texto);
    }
  }

  // 2) Contenido curado del catálogo (cubre también los PDFs escaneados).
  const cat = catalogo as {
    slug: string;
    titulo: string;
    subtitulo?: string;
    resumen: string;
    ensenanzas: string[];
  }[];
  for (const libro of cat) {
    const texto = [
      libro.titulo,
      libro.subtitulo,
      libro.resumen,
      libro.ensenanzas.join(". "),
    ]
      .filter(Boolean)
      .join(". ");
    push(`cat-${libro.slug}`, libro.slug, libro.titulo, texto);
  }
  AVGLEN = DOCS.reduce((a, d) => a + d.len, 0) / Math.max(1, DOCS.length);
}

/** Devuelve los pasajes más relevantes para la consulta (BM25). */
export function buscar(query: string, k = 6, filtroSlug?: string): Pasaje[] {
  index();
  if (!DOCS || !DF) return [];
  const qtokens = [...new Set(tokeniza(query))];
  if (!qtokens.length) return [];
  const N = DOCS.length;
  const k1 = 1.5;
  const b = 0.75;

  const candidatos = filtroSlug
    ? DOCS.filter((d) => d.slug === filtroSlug)
    : DOCS;

  const scored = candidatos.map((d) => {
    const tf = new Map<string, number>();
    for (const t of d.tokens) tf.set(t, (tf.get(t) || 0) + 1);
    let score = 0;
    for (const q of qtokens) {
      const f = tf.get(q);
      if (!f) continue;
      const df = DF!.get(q) || 1;
      const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
      score +=
        idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / AVGLEN)));
    }
    return { ...d, score };
  });

  return scored
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map(({ id, slug, titulo, texto, score }) => ({
      id,
      slug,
      titulo,
      texto: texto.length > 1400 ? texto.slice(0, 1400) + "…" : texto,
      score: Math.round(score * 1000) / 1000,
    }));
}
