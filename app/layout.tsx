import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const TITLE = "Sintergia — Centro de Conocimiento de Jacobo Grinberg-Zylberbaum";
const DESC =
  "Plataforma inteligente con las enseñanzas, conceptos y técnicas de la obra completa de Jacobo Grinberg-Zylberbaum: Teoría Sintérgica, conciencia, meditación y chamanismo.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sintergia-blue.vercel.app"),
  title: {
    default: TITLE,
    template: "%s",
  },
  description: DESC,
  applicationName: "Sintergia",
  keywords: [
    "Jacobo Grinberg",
    "Teoría Sintérgica",
    "lattice",
    "hipercampo",
    "conciencia",
    "meditación",
    "chamanismo",
    "Pachita",
    "viaje astral",
    "el doble",
  ],
  authors: [{ name: "Sintergia" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Sintergia",
    title: TITLE,
    description: DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white font-sans text-ink antialiased">
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
