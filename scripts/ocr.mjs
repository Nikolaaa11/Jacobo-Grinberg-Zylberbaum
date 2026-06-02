// OCR de los PDFs escaneados (sin capa de texto).
// Rasteriza cada página con pdfjs-dist + @napi-rs/canvas y la pasa por
// tesseract.js (español). Guarda el texto en data/ocr/<slug>.txt.
// Resumible: omite libros ya procesados. Por página, escribe progreso.
//
// Uso:  node scripts/ocr.mjs
//
// Lee los PDFs ORIGINALES desde la carpeta padre (no de public/libros,
// que se sirve desde Google Drive).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas } from "@napi-rs/canvas";
import { createWorker } from "tesseract.js";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.resolve(ROOT, ".."); // carpeta con los PDFs originales
const OCR_DIR = path.join(ROOT, "data", "ocr");

const catalogo = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data", "catalogo.json"), "utf-8")
);

// Slugs de los 12 PDFs escaneados (0 chunks en la extracción de texto).
const ESCANEADOS = new Set([
  "la-construccion-de-la-realidad",
  "la-experiencia-interna",
  "la-teoria-sintergica",
  "las-creaciones-de-la-existencia",
  "mas-alla-de-los-lenguajes",
  "la-fuerza-vital-del-cielo-anterior",
  "psicofisiologia-del-poder",
  "en-busca-del-ser",
  "el-vehiculo-de-las-transformaciones",
  "chamanes-iv-cosmovision",
  "chamanes-v-cerebro-y-chamanes",
  "chamanes-vii-el-doble",
]);

class NodeCanvasFactory {
  create(w, h) {
    const canvas = createCanvas(Math.ceil(w), Math.ceil(h));
    return { canvas, context: canvas.getContext("2d") };
  }
  reset(cc, w, h) {
    cc.canvas.width = Math.ceil(w);
    cc.canvas.height = Math.ceil(h);
  }
  destroy(cc) {
    cc.canvas.width = 0;
    cc.canvas.height = 0;
  }
}

async function ocrLibro(worker, libro) {
  const pdfPath = path.join(SOURCE, libro.pdf);
  if (!fs.existsSync(pdfPath)) {
    console.warn(`⚠ No encontrado: ${libro.pdf}`);
    return;
  }
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjs.getDocument({
    data,
    disableFontFace: true,
    isEvalSupported: false,
    canvasFactory: new NodeCanvasFactory(),
    verbosity: 0,
  }).promise;

  const partes = [];
  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(
      Math.ceil(viewport.width),
      Math.ceil(viewport.height)
    );
    const context = canvas.getContext("2d");
    await page.render({ canvasContext: context, viewport }).promise;
    const png = canvas.toBuffer("image/png");
    page.cleanup();

    const {
      data: { text },
    } = await worker.recognize(png);
    partes.push(text.trim());
    if (n % 10 === 0 || n === doc.numPages) {
      process.stdout.write(`\r   ${libro.slug}: ${n}/${doc.numPages} págs`);
    }
  }
  process.stdout.write("\n");
  const salida = path.join(OCR_DIR, `${libro.slug}.txt`);
  fs.writeFileSync(salida, partes.join("\n\n"));
  console.log(`✔ ${libro.titulo} → ${path.relative(ROOT, salida)}`);
}

async function main() {
  if (!fs.existsSync(OCR_DIR)) fs.mkdirSync(OCR_DIR, { recursive: true });
  const pendientes = catalogo.filter(
    (l) =>
      ESCANEADOS.has(l.slug) &&
      !fs.existsSync(path.join(OCR_DIR, `${l.slug}.txt`))
  );
  console.log(
    `OCR — ${pendientes.length} libro(s) pendientes de ${ESCANEADOS.size}.\n`
  );
  if (!pendientes.length) {
    console.log("Nada que hacer. Todos los escaneados ya tienen OCR.");
    return;
  }

  const worker = await createWorker("spa");
  for (const libro of pendientes) {
    try {
      await ocrLibro(worker, libro);
    } catch (e) {
      console.error(`✖ Error en ${libro.slug}:`, e.message);
    }
  }
  await worker.terminate();
  console.log("\n✅ OCR completado. Ahora corre: npm run extraer");
}

main();
