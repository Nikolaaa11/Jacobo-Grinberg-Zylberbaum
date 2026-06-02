import { LIBROS, type Libro, type TemaId } from "./libros";

export type Ruta = {
  slug: string;
  titulo: string;
  lema: string;
  descripcion: string;
  tema: TemaId;
  nivel: "Introductoria" | "Intermedia" | "Avanzada";
  libros: string[]; // slugs en orden de lectura
};

export const RUTAS: Ruta[] = [
  {
    slug: "iniciacion-sintergia",
    titulo: "Iniciación a la Teoría Sintérgica",
    lema: "Del fundamento de la experiencia a la formulación completa.",
    descripcion:
      "El recorrido troncal del pensamiento de Grinberg: cómo el cerebro construye la realidad y cómo, a partir de la interacción entre el campo neuronal y la Lattice, se formula la Teoría Sintérgica.",
    tema: "sintergia",
    nivel: "Introductoria",
    libros: [
      "los-fundamentos-de-la-experiencia",
      "la-construccion-de-la-realidad",
      "el-cerebro-consciente",
      "el-espacio-y-la-conciencia",
      "la-teoria-sintergica",
    ],
  },
  {
    slug: "naturaleza-del-yo",
    titulo: "La naturaleza del Yo y la conciencia",
    lema: "Quién eres cuando sueltas la idea de quién eres.",
    descripcion:
      "Una indagación sobre la experiencia interna, el yo como construcción y los estados de no-ego, hasta el fluir sin centro.",
    tema: "conciencia-yo",
    nivel: "Intermedia",
    libros: [
      "la-experiencia-interna",
      "el-yo-como-idea",
      "en-busca-del-ser",
      "fluir-sin-el-yo",
      "las-creaciones-de-la-existencia",
    ],
  },
  {
    slug: "camino-meditacion",
    titulo: "El camino de la meditación",
    lema: "Práctica contemplativa, de la atención a la unidad.",
    descripcion:
      "Una secuencia práctica: aprender a meditar, volver la conciencia sobre sí misma y reconocer los sabores de la iluminación.",
    tema: "meditacion",
    nivel: "Introductoria",
    libros: [
      "la-meditacion",
      "meditacion-auto-alusiva",
      "retorno-a-la-luz",
      "la-conquista-del-templo",
      "el-sabor-de-la-iluminacion",
    ],
  },
  {
    slug: "chamanismo-pachita",
    titulo: "Chamanismo mexicano y Pachita",
    lema: "La sabiduría de los chamanes de México.",
    descripcion:
      "La serie completa Los Chamanes de México, desde la psicología autóctona hasta el doble, junto con la psicofisiología del poder.",
    tema: "chamanismo",
    nivel: "Intermedia",
    libros: [
      "chamanes-i-psicologia-autoctona",
      "chamanes-ii-misticismo-indigena",
      "chamanes-iii-pachita",
      "chamanes-iv-cosmovision",
      "chamanes-v-cerebro-y-chamanes",
      "chamanes-vi-la-voz-del-ver",
      "chamanes-vii-el-doble",
      "psicofisiologia-del-poder",
    ],
  },
  {
    slug: "percepcion-comunicacion",
    titulo: "Percepción y comunicación entre cerebros",
    lema: "Los límites del lenguaje y el potencial transferido.",
    descripcion:
      "La cara experimental de su obra: cómo el lenguaje recorta la percepción, la visión extra-ocular y la evidencia del potencial transferido entre cerebros.",
    tema: "percepcion",
    nivel: "Avanzada",
    libros: [
      "mas-alla-de-los-lenguajes",
      "vision-extra-ocular",
      "el-potencial-transferido",
      "correlativos-electrofisiologicos",
    ],
  },
];

export function getRuta(slug: string): Ruta | undefined {
  return RUTAS.find((r) => r.slug === slug);
}

export function librosDeRuta(ruta: Ruta): Libro[] {
  return ruta.libros
    .map((s) => LIBROS.find((l) => l.slug === s))
    .filter((l): l is Libro => Boolean(l));
}
