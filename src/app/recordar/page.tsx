import { Suspense } from "react";
import RecordarClient from "./client";

export default function RecordarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8 flex items-center justify-center">Cargando…</div>}>
      <RecordarClient />
    </Suspense>
  );
}
