import { Suspense } from "react";
import MemorizaClient from "./client";

export default function MemorizaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8 flex items-center justify-center">Cargando…</div>}>
      <MemorizaClient />
    </Suspense>
  );
}
