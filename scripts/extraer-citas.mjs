// Selecciona una frase representativa (cita) de cada libro a partir de los
// chunks de data/corpus.json, filtrando ruido de OCR, y la escribe en
// data/catalogo.json como campo "cita". Si no hay candidata buena, deja el
// libro sin cita.
//
// Uso:  node scripts/extraer-citas.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.resolve(__dirname, "..", "data");

const corpus = JSON.parse(fs.readFileSync(path.join(DATA, "corpus.json"), "utf-8"));
const catalogo = JSON.parse(fs.readFileSync(path.join(DATA, "catalogo.json"), "utf-8"));

const CLAVE = [
  "conciencia", "realidad", "percepción", "percepcion", "sintergia", "sintérgic",
  "experiencia", "mente", "cerebro", "campo", "unidad", "lattice", "ser",
  "espacio", "tiempo", "yo", "meditación", "meditacion", "silencio", "luz",
  "energía", "energia", "vida", "amor", "presente",
];

function limpiar(s) {
  return s
    .replace(/­/g, "") // soft hyphen
    .replace(/[‐‑‒–—]/g, "-") // distintos guiones a "-"
    .replace(/\s+/g, " ")
    .trim();
}

// Heurística de calidad: penaliza ruido típico de OCR.
function esBuena(s) {
  const n = s.length;
  if (n < 70 || n > 210) return false;
  if (!/^[A-ZÁÉÍÓÚÑ¿]/.test(s)) return false; // empieza con mayúscula o apertura
  if (/[|}{<>=~_*\\/]/.test(s)) return false; // símbolos típicos de OCR roto
  if (/\d/.test(s)) return false; // descarta frases con números (índices, págs)
  if (/[a-zñáéíóú][(){}~][a-zñáéíóú]/i.test(s)) return false; // símbolo dentro de palabra
  if (/[a-zñáéíóú]-\s+[a-zñáéíóú]/i.test(s)) return false; // palabra cortada "per- cepto"
  if (/-\s*-/.test(s)) return false;
  if (/(.)\1\1/.test(s)) return false; // runs de un mismo carácter
  if (/\b(I[aeio]|EI|lI|rn|ii)\b/.test(s)) return false; // OCR de la/le/el…
  if (/[a-zñáéíóú][A-ZÁÉÍÓÚÑ]/.test(s)) return false; // mayúscula dentro de palabra (preNa)
  if (/\.\s+\./.test(s)) return false; // ". ." de OCR roto
  if (/\b[A-ZÁÉÍÓÚÑ]{2,}\b(\s+\b[A-ZÁÉÍÓÚÑ]{2,}\b){2,}/.test(s)) return false; // 3+ palabras EN MAYÚSCULAS (encabezados)
  if (/\b(agradec|gracias|dedicad|dedico|copyright)/i.test(s)) return false; // front-matter
  const letras = (s.match(/[a-záéíóúñA-ZÁÉÍÓÚÑ]/g) || []).length;
  if (letras / n < 0.78) return false;
  const palabras = s.split(/\s+/);
  if (palabras.length < 12) return false;
  if (palabras.some((p) => p.length > 22)) return false; // palabras pegadas
  const cortas = palabras.filter((p) => p.replace(/[^a-záéíóúñ]/gi, "").length <= 1).length;
  if (cortas / palabras.length > 0.12) return false;
  // proporción de palabras "de diccionario plausible" (con vocal y solo letras)
  const plausibles = palabras.filter((p) => /^[a-zñáéíóú,.;:]+$/i.test(p) && /[aeiouáéíóú]/i.test(p)).length;
  if (plausibles / palabras.length < 0.85) return false;
  const minus = s.toLowerCase();
  if (!CLAVE.some((k) => minus.includes(k))) return false;
  const mays = (s.match(/[A-ZÁÉÍÓÚÑ]/g) || []).length;
  if (mays / letras > 0.22) return false; // evita títulos/índices en mayúsculas
  return true;
}

function frases(texto) {
  return texto
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿"])/)
    .map(limpiar);
}

let conCita = 0;
for (const libro of catalogo) {
  const entrada = corpus.find((c) => c.slug === libro.slug);
  if (!entrada) continue;
  const candidatas = [];
  for (const ch of entrada.chunks) {
    for (const f of frases(ch.texto)) {
      if (esBuena(f)) {
        const minus = f.toLowerCase();
        const score = CLAVE.filter((k) => minus.includes(k)).length;
        candidatas.push({ f, score });
      }
    }
    if (candidatas.length > 60) break;
  }
  candidatas.sort((a, b) => b.score - a.score);
  if (candidatas.length) {
    libro.cita = candidatas[0].f;
    conCita++;
  } else {
    delete libro.cita;
  }
}

fs.writeFileSync(path.join(DATA, "catalogo.json"), JSON.stringify(catalogo, null, 2) + "\n");
console.log(`Citas asignadas a ${conCita}/${catalogo.length} libros.`);
for (const l of catalogo) {
  console.log(`\n— ${l.titulo}\n   ${l.cita ? '"' + l.cita + '"' : "(sin cita)"}`);
}
