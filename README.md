# 🌿 Sintergia — Centro de Conocimiento de Jacobo Grinberg-Zylberbaum

Plataforma inteligente que reúne, organiza y hace accesibles las **enseñanzas, conceptos y técnicas** de la obra completa (33 libros) del neurofisiólogo mexicano **Jacobo Grinberg-Zylberbaum**.

- 📚 **Biblioteca** de los 33 libros con filtros por tema, año y búsqueda.
- 💡 **Enseñanzas** clave de cada obra, organizadas por tema.
- 🧘 **Técnicas y meditaciones** con guía paso a paso y modo sesión (temporizador).
- 🧭 **Glosario de conceptos** (Teoría Sintérgica, lattice, sintergia, potencial transferido…).
- ✨ **Asistente IA (RAG)** que responde con base en los textos reales de los libros y cita las fuentes.

Diseño minimalista estilo **Apple verde sobre blanco**. Stack: **Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion + Vercel AI SDK (Claude)**.

---

## 🚀 Puesta en marcha local

```bash
npm install
cp .env.example .env.local   # añade tu ANTHROPIC_API_KEY (opcional para modo demo)
npm run dev                  # http://localhost:3000
```

Sin `ANTHROPIC_API_KEY`, el asistente funciona en **modo demostración** (respuestas de ejemplo + fuentes reales del RAG). Con la clave, responde Claude usando los pasajes recuperados.

---

## 🔑 Variables de entorno

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `ANTHROPIC_API_KEY` | Para el asistente real | Clave de Anthropic (https://console.anthropic.com). |
| `ANTHROPIC_MODEL` | No | Modelo de Claude. Por defecto `claude-3-5-sonnet-latest`. |

---

## 🧠 Cómo funciona el asistente (RAG)

- El texto de cada PDF se extrae con `scripts/extraer.mjs` (usando `pdf-parse`) y se trocea en *chunks* → `data/corpus.json` (ya incluido, ~5.8 MB).
- En cada pregunta, `lib/rag.ts` recupera los pasajes más relevantes mediante **búsqueda léxica BM25** (sin necesidad de API de embeddings).
- Esos pasajes se inyectan en el *system prompt* y **Claude** redacta la respuesta citando las fuentes.

### Regenerar el corpus (si cambias los PDFs o el catálogo)

```bash
npm run extraer   # vuelve a leer /public/libros y reescribe data/corpus.json
```

> ⚠️ **12 de los 33 PDFs están escaneados (sin capa de texto)**, por lo que no aportan pasajes al RAG (p. ej. *La Teoría Sintérgica*, *La Construcción de la Realidad*). El catálogo curado (`data/catalogo.json`) sí cubre los 33 libros con resúmenes, enseñanzas, técnicas y conceptos. Para incorporarlos al RAG haría falta un paso de **OCR** (ver más abajo).

---

## 📦 Estructura

```
app/                 Rutas (App Router)
  page.tsx           Landing
  biblioteca/        Grid de libros con filtros
  libro/[slug]/      Detalle de cada libro + visor PDF
  ensenanzas/        Enseñanzas por tema
  tecnicas/          Catálogo de técnicas
  tecnica/[slug]/    Técnica + modo sesión
  conceptos/         Glosario
  asistente/         Chat IA
  sobre-jacobo/      Biografía
  api/chat/          Endpoint del asistente (Claude + RAG)
components/          UI (Navbar, Footer, BookCard, Asistente, etc.)
data/
  catalogo.json      Fuente de verdad: los 33 libros + contenido curado
  corpus.json        Texto troceado para el RAG (generado)
  libros.ts          Tipos + helpers + temas + conceptos
lib/rag.ts           Recuperación léxica BM25
scripts/extraer.mjs  Extractor de texto de los PDFs
public/libros/       Los 33 PDFs
```

---

## ☁️ Despliegue en Vercel + GitHub

> Repositorio destino: `github.com/Nikolaaa11/Jacobo-Grinberg-Zylberbaum`

### ⚠️ Importante sobre los PDFs y GitHub
Los 33 PDFs pesan **~412 MB** (el mayor, 48.6 MB). El **subidor web de GitHub limita a 25 MB por archivo**, y varios PDFs lo superan: **debes subir por línea de comandos (git)**, que admite hasta 100 MB por archivo (todos los nuestros caben).

### 1) Subir el código por git CLI (recomendado)

```bash
cd sintergia
git init
git add .
git commit -m "Sintergia: centro de conocimiento de Jacobo Grinberg"
git branch -M main
git remote add origin https://github.com/Nikolaaa11/Jacobo-Grinberg-Zylberbaum.git
git push -u origin main
```

Si el push de 412 MB es lento o la red lo corta, ver la alternativa de **PDFs externos** abajo.

### 2) Conectar con Vercel
1. Entra a [vercel.com](https://vercel.com) → **Add New → Project**.
2. **Import** el repositorio `Jacobo-Grinberg-Zylberbaum`.
3. Framework detectado automáticamente: **Next.js** (no cambies nada).
4. En **Environment Variables** añade `ANTHROPIC_API_KEY` (y opcional `ANTHROPIC_MODEL`).
5. **Deploy**. Listo.

### Alternativa: PDFs fuera del repo (recomendado si el repo pesa mucho)
Para mantener el repo ligero:
1. Sube los PDFs a un bucket (Vercel Blob, S3, Cloudinary, Google Drive público…).
2. Añade un campo `pdfUrl` en `data/catalogo.json` y úsalo en `components/PDFViewer.tsx` y en `libro/[slug]/page.tsx` en lugar de `/libros/...`.
3. Añade `public/libros/*.pdf` a `.gitignore`.

El RAG seguirá funcionando porque depende de `data/corpus.json`, no de los PDFs.

---

## 🔭 Mejoras futuras (opcionales)

- **OCR** de los 12 PDFs escaneados (p. ej. `tesseract.js` o un servicio de OCR) para incorporarlos al RAG.
- Migrar el RAG a **embeddings + pgvector** (Vercel Postgres) para recuperación semántica.
- Modo oscuro.
- Mapa visual (grafo) de conceptos.

---

## 📄 Aviso

La obra y las enseñanzas pertenecen a **Jacobo Grinberg-Zylberbaum**. Este proyecto recopila y organiza su trabajo con fines **educativos y de divulgación**, sin ánimo de lucro. Los textos provienen de la digitalización publicada en `survivalafterdeath.blogspot.com`.
