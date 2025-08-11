"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeWords, encodeWords, normalizeEs, parseUserInputToWords, unique } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function RecordarPage() {
  const params = useSearchParams();
  const router = useRouter();

  const encoded = params.get("w");
  const objetivo = useMemo(() => decodeWords(encoded), [encoded]);

  const [entrada, setEntrada] = useState("");
  const [resultado, setResultado] = useState<
    | null
    | {
        aciertos: string[];
        faltantes: string[];
        extras: string[];
        total: number;
      }
  >(null);

  const objetivoNorm = useMemo(() => objetivo.map((w) => normalizeEs(w)), [objetivo]);

  function evaluar() {
    const tokens = parseUserInputToWords(entrada);
    const tokensNorm = unique(tokens.map((t) => normalizeEs(t))).filter(Boolean);

    // Map normalized -> original for guesses
    const mapaEntrada = new Map<string, string>();
    for (const t of tokens) {
      const n = normalizeEs(t);
      if (n && !mapaEntrada.has(n)) mapaEntrada.set(n, t);
    }

    const setObjetivo = new Set(objetivoNorm);
    const setEntradaNorm = new Set(tokensNorm);

    const aciertosNorm = tokensNorm.filter((t) => setObjetivo.has(t));
    const aciertos = aciertosNorm.map((n) => mapaEntrada.get(n) || n);

    const faltantesNorm = objetivoNorm.filter((w) => !setEntradaNorm.has(w));
    const faltantes = faltantesNorm.map((n, i) => objetivo[objetivoNorm.indexOf(n)]);

    const extrasNorm = tokensNorm.filter((t) => !setObjetivo.has(t));
    const extras = extrasNorm.map((n) => mapaEntrada.get(n) || n);

    const total = objetivo.length;
    const perfecto = aciertos.length === total && extras.length === 0;

    if (perfecto) {
      // Cargar confeti de forma dinámica para mantener el bundle ligero
      import("canvas-confetti").then(({ default: confetti }) => {
        confetti({
          particleCount: 140,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10b981", "#60a5fa", "#f472b6", "#f59e0b"],
        });
      });
    }

    setResultado({ aciertos, faltantes, extras, total });
  }

  if (!objetivo || objetivo.length === 0) {
    return (
      <div className="font-sans min-h-screen p-8 sm:p-12 flex items-center justify-center">
        <main className="w-full max-w-3xl space-y-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">No hay palabras para recordar</h1>
          <p className="text-[15px] text-muted-foreground">
            Vuelve al inicio para configurar una sesión.
          </p>
          <div>
            <Button asChild>
              <a href="/">Ir al inicio</a>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const puntaje = resultado ? `${resultado.aciertos.length}/${resultado.total}` : "";

  return (
    <div className="font-sans min-h-screen p-8 sm:p-12 flex items-center justify-center">
      <main className="w-full max-w-4xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Recordar</h1>
          <p className="text-[15px] text-muted-foreground">
            Escribe las palabras que recuerdes. Puedes separarlas por comas, saltos de línea o varios espacios.
          </p>
        </header>

        <section className="rounded-xl border p-6 sm:p-8 bg-card text-card-foreground shadow-sm space-y-6">
          <p className="text-sm text-muted-foreground">
            Palabras objetivo: <span className="font-medium text-foreground">{objetivo.length}</span>
          </p>

          <div className="grid gap-2">
            <Label htmlFor="entrada">Tus palabras</Label>
            <Textarea
              id="entrada"
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              rows={6}
              placeholder="Ej.: gato, ventana, playa, ..."
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button onClick={evaluar} className="self-start">
              Evaluar
            </Button>
            <Button variant="link" onClick={() => setEntrada("")}>Limpiar</Button>
            <Button variant="link" onClick={() => router.push(`/memoriza?w=${encodeWords(objetivo)}`)}>
              Volver a memorizar
            </Button>
            <Button variant="link" asChild>
              <a href="/">Nueva configuración</a>
            </Button>
          </div>

          {resultado && (
            <div className="pt-4 border-t space-y-6">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">Puntaje:</span>
                <span className="font-mono text-lg tabular-nums">{puntaje}</span>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Aciertos</h3>
                  {resultado.aciertos.length === 0 ? (
                    <p className="text-sm opacity-70">—</p>
                  ) : (
                    <ul className="grid gap-1">
                      {resultado.aciertos.map((w, i) => (
                        <li key={`a-${i}`} className="text-sm">{w}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Faltantes</h3>
                  {resultado.faltantes.length === 0 ? (
                    <p className="text-sm opacity-70">—</p>
                  ) : (
                    <ul className="grid gap-1">
                      {resultado.faltantes.map((w, i) => (
                        <li key={`f-${i}`} className="text-sm">{w}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Extras</h3>
                  {resultado.extras.length === 0 ? (
                    <p className="text-sm opacity-70">—</p>
                  ) : (
                    <ul className="grid gap-1">
                      {resultado.extras.map((w, i) => (
                        <li key={`e-${i}`} className="text-sm">{w}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
