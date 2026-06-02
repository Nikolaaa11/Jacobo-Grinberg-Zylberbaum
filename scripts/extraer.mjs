// Extrae el texto de cada PDF en /public/libros, lo limpia y lo divide en
// chunks para la búsqueda léxica (RAG). Genera /data/corpus.json.
//
// Uso:  npm run extraer
//
// No requiere claves de IA: solo extrae texto crudo y lo trocea.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LIBROS_DIR = path.join(ROOT, "public", "libros");
const DATA_DIR = path.join(ROOT, "data");

// Catálogo (fuente de verdad compartida con la app)
const LIBROS = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "catalogo.json"), "utf-8")
);

function limpiar(texto) {
  return texto
    .replace(/\r/g, "")
    .replace(/-\n(\w)/g, "$1") // une palabras cortadas por guion
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function trocear(texto, objetivo = 1100, solape = 150) {
  // Trocea por párrafos acumulando ~objetivo palabras, con solape.
  const parrafos = texto.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const chunks = [];
  let actual = [];
  let count = 0;
  for (const p of parrafos) {
    const palabras = p.split(/\s+/).length;
    if (count + palabras > objetivo && actual.length) {
      chunks.push(actual.join("\n\n"));
      // solape: conserva el último párrafo
      const cola = actual[actual.length - 1] || "";
      actual = cola.split(/\s+/).length <= solape ? [cola] : [];
      count = actual.reduce((a, p) => a + p.split(/\s+/).length, 0);
    }
    actual.push(p);
    count += palabras;
  }
  if (actual.length) chunks.push(actual.join("\n\n"));
  return chunks.filter((c) => c.split(/\s+/).length > 30);
}

async function main() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const corpus = [];
  let totalChunks = 0;

  for (const libro of LIBROS) {
    const pdfPath = path.join(LIBROS_DIR, libro.pdf);
    if (!fs.existsSync(pdfPath)) {
      console.warn(`⚠ No encontrado: ${libro.pdf}`);
      continue;
    }
    try {
      const buffer = fs.readFileSync(pdfPath);
      const { text, numpages } = await pdfParse(buffer);
      const limpio = limpiar(text);
      const chunks = trocear(limpio);
      totalChunks += chunks.length;
      corpus.push({
        slug: libro.slug,
        titulo: libro.titulo,
        paginas: numpages,
        palabras: limpio.split(/\s+/).length,
        chunks: chunks.map((texto, i) => ({ id: `${libro.slug}-${i}`, texto })),
      });
      console.log(
        `✔ ${libro.titulo} — ${numpages} págs, ${chunks.length} chunks`
      );
    } catch (e) {
      console.error(`✖ Error en ${libro.pdf}:`, e.message);
    }
  }

  const out = path.join(DATA_DIR, "corpus.json");
  fs.writeFileSync(out, JSON.stringify(corpus));
  console.log(
    `\n✅ ${corpus.length} libros, ${totalChunks} chunks → ${path.relative(ROOT, out)}`
  );
}

main();
