import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 sm:p-12 flex items-center justify-center">
      <main className="w-full max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Mnemonics</h1>
          <p className="text-[15px] text-muted-foreground">
            Entrena tu memoria con palabras en español. Configura los
            parámetros y comienza.
          </p>
        </header>

        <section className="rounded-xl border p-6 sm:p-8 bg-card text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Configuración</h2>
          <form action="/memoriza" method="get" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="n">Cantidad de palabras</Label>
                <Input id="n" type="number" name="n" min={3} max={50} defaultValue={10} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="t">Tiempo de visualización (segundos)</Label>
                <Input id="t" type="number" name="t" min={3} max={300} defaultValue={30} required />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Se seleccionarán palabras al azar de un vocabulario común en
              español. Más opciones avanzadas podrán añadirse más adelante.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button type="submit" className="w-full sm:w-auto">Comenzar</Button>
              <Button variant="link" asChild>
                <a href="https://nextjs.org/docs" target="_blank" rel="noreferrer">Ayuda</a>
              </Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
