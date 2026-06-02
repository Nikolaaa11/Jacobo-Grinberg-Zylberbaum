import catalogo from "./catalogo.json";

// Carpeta pública de Google Drive con los PDFs completos de todos los libros.
export const DRIVE_FOLDER =
  "https://drive.google.com/drive/folders/1D118yGIUjZi8ABwXav9DR-TnMGyr4Ero";

export type TemaId =
  | "sintergia"
  | "conciencia-yo"
  | "meditacion"
  | "chamanismo"
  | "percepcion"
  | "poesia-mistica";

export type Tecnica = {
  nombre: string;
  duracion: string;
  nivel: string;
  pasos: string[];
};

export type Libro = {
  id: number;
  slug: string;
  titulo: string;
  subtitulo: string;
  anio: number;
  temas: TemaId[];
  pdf: string;
  resumen: string;
  ensenanzas: string[];
  tecnicas: Tecnica[];
  conceptos: string[];
  paginas?: number;
};

export const LIBROS = catalogo as Libro[];

export const TEMAS: Record<TemaId, { nombre: string; descripcion: string }> = {
  sintergia: {
    nombre: "Teoría Sintérgica y Campo Unificado",
    descripcion:
      "El núcleo del pensamiento de Grinberg: el lattice, el campo neuronal y la sintergia.",
  },
  "conciencia-yo": {
    nombre: "Conciencia y el Yo",
    descripcion: "La naturaleza del yo, la experiencia interna y el Ser.",
  },
  meditacion: {
    nombre: "Meditación y prácticas contemplativas",
    descripcion: "Métodos para aquietar la mente y aumentar la sintergia.",
  },
  chamanismo: {
    nombre: "Chamanismo mexicano y Pachita",
    descripcion:
      "El estudio de los chamanes de México y la curandera Pachita.",
  },
  percepcion: {
    nombre: "Percepción, lenguaje y realidad",
    descripcion:
      "Cómo el cerebro construye la realidad y los límites del lenguaje.",
  },
  "poesia-mistica": {
    nombre: "Poesía y experiencia mística",
    descripcion: "Obras de lenguaje luminoso que evocan lo inefable.",
  },
};

export type Concepto = {
  slug: string;
  nombre: string;
  definicion: string;
};

export const CONCEPTOS: Concepto[] = [
  {
    slug: "teoria-sintergica",
    nombre: "Teoría Sintérgica",
    definicion:
      "Sistema de Grinberg según el cual el cerebro, mediante su campo neuronal, interactúa con una estructura fundamental (el lattice) para producir la realidad percibida. La conciencia y la unidad emergen al aumentar la sintergia.",
  },
  {
    slug: "lattice",
    nombre: "Lattice (retículo pre-espacial)",
    definicion:
      "Matriz informacional fundamental, no espacial ni temporal, que subyace a toda la realidad. De ella el cerebro 'extrae' la imagen del mundo. En su nivel puro es unitario e indiviso.",
  },
  {
    slug: "campo-neuronal",
    nombre: "Campo neuronal / hipercampo",
    definicion:
      "Campo generado por la actividad coherente del cerebro que interactúa con el lattice. Es el mediador entre la neurofisiología y la experiencia consciente.",
  },
  {
    slug: "sintergia",
    nombre: "Sintergia",
    definicion:
      "Contracción de 'síntesis' y 'energía': el grado de orden y coherencia de un sistema. A mayor sintergia, menor distorsión y percepción más unitaria de la realidad.",
  },
  {
    slug: "estructura-primaria",
    nombre: "Estructura primaria de la realidad",
    definicion:
      "El nivel fundamental e informacional de lo real, anterior a la imagen perceptual que el cerebro construye a partir de él.",
  },
  {
    slug: "yo-como-idea",
    nombre: "El Yo como idea",
    definicion:
      "Tesis de que el 'yo' no es una entidad sustancial sino una idea recurrente, un hábito perceptual. Su disolución abre estados de conciencia más amplios.",
  },
  {
    slug: "experiencia-unitaria",
    nombre: "Experiencia unitaria",
    definicion:
      "Vivencia directa de la unidad entre observador y observado, propia de los estados de alta sintergia y de la experiencia mística.",
  },
  {
    slug: "percepcion-realidad",
    nombre: "Percepción y construcción de la realidad",
    definicion:
      "Idea de que no percibimos el mundo tal cual es, sino una construcción cerebral organizada a partir del lattice y filtrada por el lenguaje y la cultura.",
  },
  {
    slug: "comunicacion-sintergica",
    nombre: "Comunicación sintérgica (potencial transferido)",
    definicion:
      "Fenómeno de correlación de la actividad cerebral entre personas aisladas que han interactuado previamente. Base empírica que Grinberg ofrece para la conexión no local a través del campo.",
  },
  {
    slug: "no-ego",
    nombre: "Estados de no-ego",
    definicion:
      "Modos de funcionar sin un centro que se apropie de la experiencia: la acción fluye espontánea y precisa, sin autorreferencia.",
  },
  {
    slug: "pachita",
    nombre: "Pachita",
    definicion:
      "Bárbara Guerrero (Pachita), curandera mexicana cuyas 'cirugías psíquicas' Grinberg estudió como fenómeno que desafía el marco científico ortodoxo.",
  },
];

// Helpers
export function getLibro(slug: string): Libro | undefined {
  return LIBROS.find((l) => l.slug === slug);
}

export function librosPorTema(tema: TemaId): Libro[] {
  return LIBROS.filter((l) => l.temas.includes(tema));
}

export function getConcepto(slug: string): Concepto | undefined {
  return CONCEPTOS.find((c) => c.slug === slug);
}

export function librosDeConcepto(slug: string): Libro[] {
  return LIBROS.filter((l) => l.conceptos.includes(slug));
}

export type TecnicaConLibro = Tecnica & {
  slug: string;
  libroSlug: string;
  libroTitulo: string;
};

export function todasLasTecnicas(): TecnicaConLibro[] {
  const out: TecnicaConLibro[] = [];
  for (const libro of LIBROS) {
    libro.tecnicas.forEach((t, i) => {
      out.push({
        ...t,
        slug: `${libro.slug}-${i + 1}`,
        libroSlug: libro.slug,
        libroTitulo: libro.titulo,
      });
    });
  }
  return out;
}

export function getTecnica(slug: string): TecnicaConLibro | undefined {
  return todasLasTecnicas().find((t) => t.slug === slug);
}
