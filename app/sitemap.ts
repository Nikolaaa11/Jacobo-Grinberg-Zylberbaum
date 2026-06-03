import type { MetadataRoute } from "next";
import { LIBROS, todasLasTecnicas } from "@/data/libros";
import { RUTAS } from "@/data/rutas";

const BASE = "https://sintergia-blue.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const estaticas = [
    "",
    "/biblioteca",
    "/rutas",
    "/ensenanzas",
    "/tecnicas",
    "/conceptos",
    "/viaje-astral",
    "/cronologia",
    "/asistente",
    "/sobre-jacobo",
  ].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const libros = LIBROS.map((l) => ({
    url: `${BASE}/libro/${l.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const rutas = RUTAS.map((r) => ({
    url: `${BASE}/ruta/${r.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const tecnicas = todasLasTecnicas().map((t) => ({
    url: `${BASE}/tecnica/${t.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));

  return [...estaticas, ...libros, ...rutas, ...tecnicas];
}
