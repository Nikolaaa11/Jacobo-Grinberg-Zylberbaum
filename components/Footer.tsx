import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-hair bg-mist">
      <div className="mx-auto max-w-page px-5 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-verde text-white">
                <Leaf className="h-4 w-4" />
              </span>
              <span className="text-lg font-semibold tracking-tightish">Sintergia</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-subtle">
              Centro de conocimiento dedicado a la obra completa de Jacobo
              Grinberg-Zylberbaum. Proyecto de divulgación con fines educativos.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <h4 className="font-semibold text-ink">Explorar</h4>
              <ul className="mt-3 space-y-2 text-subtle">
                <li><Link href="/rutas" className="hover:text-ink">Rutas de lectura</Link></li>
                <li><Link href="/biblioteca" className="hover:text-ink">Biblioteca</Link></li>
                <li><Link href="/ensenanzas" className="hover:text-ink">Enseñanzas</Link></li>
                <li><Link href="/tecnicas" className="hover:text-ink">Técnicas</Link></li>
                <li><Link href="/conceptos" className="hover:text-ink">Conceptos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-ink">Más</h4>
              <ul className="mt-3 space-y-2 text-subtle">
                <li><Link href="/asistente" className="hover:text-ink">Asistente IA</Link></li>
                <li><Link href="/sobre-jacobo" className="hover:text-ink">Sobre Jacobo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-ink">Fuente</h4>
              <ul className="mt-3 space-y-2 text-subtle">
                <li>
                  <a
                    href="https://www.survivalafterdeath.blogspot.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink"
                  >
                    survivalafterdeath
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-hair pt-6 text-xs leading-relaxed text-subtle">
          La obra y las enseñanzas pertenecen a Jacobo Grinberg-Zylberbaum. Este
          sitio recopila y organiza su trabajo con fines educativos y de
          divulgación, sin ánimo de lucro. Los textos completos provienen de la
          digitalización publicada en survivalafterdeath.blogspot.com.
        </div>
      </div>
    </footer>
  );
}
