"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export function SesionTecnica({ pasos }: { pasos: string[] }) {
  const [seg, setSeg] = useState(0);
  const [activo, setActivo] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (activo) {
      ref.current = setInterval(() => setSeg((s) => s + 1), 1000);
    } else if (ref.current) {
      clearInterval(ref.current);
    }
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [activo]);

  const mm = String(Math.floor(seg / 60)).padStart(2, "0");
  const ss = String(seg % 60).padStart(2, "0");

  return (
    <div className="card p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="text-5xl font-bold tabular-nums tracking-tightish text-ink">
          {mm}:{ss}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActivo((v) => !v)}
            className="btn-verde"
            aria-label={activo ? "Pausar" : "Iniciar"}
          >
            {activo ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {activo ? "Pausar" : "Iniciar sesión"}
          </button>
          <button
            onClick={() => {
              setActivo(false);
              setSeg(0);
            }}
            className="btn-ghost"
            aria-label="Reiniciar"
          >
            <RotateCcw className="h-4 w-4" />
            Reiniciar
          </button>
        </div>
        <p className="text-center text-sm text-subtle">
          Sigue los pasos a tu ritmo. El temporizador es solo una guía.
        </p>
      </div>
    </div>
  );
}
