import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sintergia — Centro de Conocimiento de Jacobo Grinberg-Zylberbaum",
  description:
    "Plataforma inteligente con las enseñanzas, conceptos y técnicas de la obra completa de Jacobo Grinberg-Zylberbaum: Teoría Sintérgica, conciencia, meditación y chamanismo.",
  keywords: [
    "Jacobo Grinberg",
    "Teoría Sintérgica",
    "lattice",
    "conciencia",
    "meditación",
    "chamanismo",
    "Pachita",
  ],
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
