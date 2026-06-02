// Fusiona el texto OCR (data/ocr/<slug>.txt) dentro de data/corpus.json,
// rellenando los chunks de los libros escaneados sin tocar el resto.
// No necesita los PDFs (que se sirven desde Google Drive).
//
// Uso:  node scripts/merge-ocr.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "data");
const OCR_DIR = path.join(DATA, "ocr");

function limpiar(t) {
  return t
    .replace(/\r/g, "")
    .replace(/-\n(\w)/g, "$1")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function trocear(texto, objetivo = 1100, solape = 150) {
  const parrafos = texto.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const chunks = [];
  let actual = [];
  let count = 0;
  for (const p of parrafos) {
    const palabras = p.split(/\s+/).length;
    if (count + palabras > objetivo && actual.length) {
      chunks.push(actual.join("\n\n"));
      const cola = actual[actual.length - 1] || "";
      actual = cola.split(/\s+/).length <= solape ? [cola] : [];
      count = actual.reduce((a, x) => a + x.split(/\s+/).length, 0);
    }
    actual.push(p);
    count += palabras;
  }
  if (actual.length) chunks.push(actual.join("\n\n"));
  return chunks.filter((c) => c.split(/\s+/).length > 30);
}

const corpus = JSON.parse(fs.readFileSync(path.join(DATA, "corpus.json"), "utf-8"));
const bySlug = Object.fromEntries(corpus.map((c) => [c.slug, c]));

const archivos = fs.existsSync(OCR_DIR)
  ? fs.readdirSync(OCR_DIR).filter((f) => f.endsWith(".txt"))
  : [];

let total = 0;
for (const f of archivos) {
  const slug = f.replace(/\.txt$/, "");
  const entrada = bySlug[slug];
  if (!entrada) {
    console.warn(`⚠ slug sin entrada en corpus: ${slug}`);
    continue;
  }
  const texto = limpiar(fs.readFileSync(path.join(OCR_DIR, f), "utf-8"));
  const chunks = trocear(texto);
  entrada.chunks = chunks.map((t, i) => ({ id: `${slug}-ocr-${i}`, texto: t }));
  total += chunks.length;
  console.log(`✔ ${entrada.titulo}: ${chunks.length} chunks (OCR)`);
}

fs.writeFileSync(path.join(DATA, "corpus.json"), JSON.stringify(corpus));
const conTexto = corpus.filter((c) => c.chunks.length > 0).length;
console.log(
  `\n✅ Fusionados ${archivos.length} libros OCR (${total} chunks).` +
    ` Corpus: ${conTexto}/${corpus.length} libros con texto.`
);
