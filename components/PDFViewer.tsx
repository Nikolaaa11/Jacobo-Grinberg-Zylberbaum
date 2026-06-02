import { FileText, ExternalLink } from "lucide-react";
import { DRIVE_FOLDER } from "@/data/libros";

export function PDFViewer({ titulo }: { titulo: string }) {
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-verde-mint text-verde-deep">
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Texto completo (PDF)</p>
            <p className="text-xs text-subtle">
              «{titulo}» y la obra completa están en Google Drive.
            </p>
          </div>
        </div>
        <a
          href={DRIVE_FOLDER}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-verde px-5 py-2.5 text-sm"
        >
          <ExternalLink className="h-4 w-4" />
          Abrir en Google Drive
        </a>
      </div>
    </div>
  );
}
