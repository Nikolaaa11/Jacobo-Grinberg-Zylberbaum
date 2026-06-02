"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Leaf, Menu, X, Sparkles } from "lucide-react";

const NAV = [
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/ensenanzas", label: "Enseñanzas" },
  { href: "/tecnicas", label: "Técnicas" },
  { href: "/conceptos", label: "Conceptos" },
  { href: "/sobre-jacobo", label: "Sobre Jacobo" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hair/70 bg-white/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-page items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-verde text-white">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="text-lg font-semibold tracking-tightish">Sintergia</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active ? "text-verde-deep" : "text-subtle hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/asistente" className="btn-verde ml-2 px-5 py-2.5">
            <Sparkles className="h-4 w-4" />
            Preguntar a la IA
          </Link>
        </div>

        <button
          aria-label="Menú"
          className="rounded-full p-2 text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-hair bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-base font-medium text-ink hover:bg-mist"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/asistente"
              onClick={() => setOpen(false)}
              className="btn-verde mt-2"
            >
              <Sparkles className="h-4 w-4" />
              Preguntar a la IA
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
