"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WORDS_ES } from "@/lib/words-es";
import { decodeWords, encodeWords, shuffle } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function MemorizaPage() {
  const router = useRouter();
  const params = useSearchParams();

  const nParam = Number(params.get("n"));
  const tParam = Number(params.get("t"));
  const wParam = params.get("w");

  const n = Number.isFinite(nParam) ? Math.min(Math.max(3, Math.floor(nParam)), Math.min(100, WORDS_ES.length)) : 10;
  const t = Number.isFinite(tParam) ? Math.min(Math.max(3, Math.floor(tParam)), 600) : 30;

  // Palabras objetivo: calcular SOLO en el cliente para evitar desajuste de hidratación
  const [words, setWords] = useState<string[] | null>(null);
  const count = words?.length ?? 0;

  useEffect(() => {
    // Este efecto solo corre en el cliente
    const preset = decodeWords(wParam);
    const chosen = preset.length > 0 ? preset : shuffle(WORDS_ES).slice(0, n);
    setWords(chosen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wParam, n]);

  const [secondsLeft, setSecondsLeft] = useState<number>(t);
  const navigatedRef = useRef(false);

  useEffect(() => {
    if (!words || words.length === 0) return;
    setSecondsLeft(t);
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [t, words, router]);

  // Navegar cuando el tiempo llega a 0, fuera del render/update del estado
  useEffect(() => {
    if (!words || words.length === 0) return;
    if (secondsLeft === 0 && !navigatedRef.current) {
      navigatedRef.current = true;
      const encoded = encodeWords(words);
      router.push(`/recordar?w=${encoded}`);
    }
  }, [secondsLeft, words, router]);

  const gridCols = useMemo(() => {
    if (count <= 6) return "grid-cols-2";
    if (count <= 12) return "grid-cols-3";
    if (count <= 20) return "grid-cols-4";
    return "grid-cols-5";
  }, [count]);

  return (
    <div className="font-sans min-h-screen p-8 sm:p-12 flex items-center justify-center">
      <main className="w-full max-w-4xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Memoriza</h1>
          <p className="text-[15px] text-muted-foreground">
            Observa las palabras durante el tiempo indicado y trata de recordarlas.
          </p>
        </header>

        <section className="rounded-xl border p-6 sm:p-8 bg-card text-card-foreground shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Palabras a memorizar: <span className="font-medium text-foreground">{words ? count : "—"}</span>
            </p>
            <div className="inline-flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Tiempo restante:</span>
              <span className="font-mono text-lg tabular-nums" aria-live="polite">{secondsLeft}s</span>
            </div>
          </div>

          {words ? (
            <ul className={`grid ${gridCols} gap-3 sm:gap-4`}>
              {words.map((w, i) => (
                <li
                  key={`${w}-${i}`}
                  className="rounded-md border bg-background px-3 py-2 text-center text-base sm:text-lg"
                >
                  {w}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm opacity-70">Preparando palabras…</div>
          )}

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 md:gap-6">
            <Button
              disabled={!words}
              onClick={() => words && router.push(`/recordar?w=${encodeWords(words)}`)}
              className="w-full sm:w-auto"
            >
              Continuar ahora
            </Button>
            <Button variant="link" asChild>
              <a href="/">Volver al inicio</a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
