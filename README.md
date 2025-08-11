# Mnemonics — Entrenamiento de memoria en español

Aplicación web para entrenar la memoria con palabras en español. Permite configurar la cantidad de palabras a memorizar y el tiempo de visualización, mostrar la lista aleatoria, y luego ingresar las palabras recordadas para evaluar el resultado.

Construida con Next.js 15 (App Router), TailwindCSS 4 y componentes shadcn/ui. Totalmente en español y optimizada para móviles.

## Características

- Configura cantidad de palabras y tiempo de visualización.
- Selección aleatoria de palabras de un vocabulario común en español.
- Flujo guiado: configuración → memorización → recordar/evaluar.
- Interfaz consistente con shadcn/ui (Button, Input, Textarea, Label).
- Theming con tokens Tailwind v4 y soporte claro/oscuro.
- Efecto de confeti al lograr una respuesta perfecta.

## Tecnologías

- Next.js 15, React 19.
- TailwindCSS 4 (con @theme tokens) y utilidades de diseño.
- shadcn/ui (estilos compatibles; componentes locales en `src/components/ui/`).
- `canvas-confetti` para celebraciones.

## Requisitos

- Node.js 18.17+ (recomendado 20+)
- npm, pnpm, yarn o bun

## Instalación

```bash
# instalar dependencias
npm install

# entorno de desarrollo (Turbopack)
npm run dev

# abrir en el navegador
# http://localhost:3000
```

## Scripts disponibles

- `npm run dev` — Inicia el servidor de desarrollo con Turbopack.
- `npm run build` — Compila la aplicación para producción.
- `npm run start` — Sirve la build de producción.
- `npm run lint` — Ejecuta ESLint.

## Uso

1. En la página de inicio (`/`), configura:
   - Cantidad de palabras (`n`, mínimo 3, máximo 50 por UI; límite superior interno 100).
   - Tiempo de visualización en segundos (`t`, mínimo 3, máximo 300 por UI; límite superior interno 600).
2. Pulsa “Memorizar” para ver las palabras durante el tiempo configurado (`/memoriza`).
3. Al terminar el contador o pulsar “Continuar ahora”, pasarás a la página de recordar (`/recordar`).
4. Ingresa las palabras que recuerdes separadas por comas, saltos de línea o espacios y pulsa “Evaluar”.
5. Verás el puntaje, aciertos, faltantes y extras. Si todo es correcto, aparecerá confeti.

## Páginas principales

- `src/app/page.tsx` — Configuración de la sesión (Inputs y Buttons de shadcn/ui).
- `src/app/memoriza/page.tsx` — Muestra las palabras y el contador.
- `src/app/recordar/page.tsx` — Entrada de texto y evaluación de resultados.

## Componentes UI

Componentes shadcn/ui locales:

- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/textarea.tsx`

Utilidad de clases:

- `src/lib/ui.ts` — función `cn()` (clsx + tailwind-merge).

## Theming y estilos

- Variables CSS definidas en `src/app/globals.css` para `--background`, `--foreground`, `--primary`, `--muted`, etc., en modos claro/oscuro.
- Mapeo de tokens con `@theme inline` para usar utilidades como `bg-card`, `text-muted-foreground`, `border`, `bg-background`, etc.
- `body` aplica `font-sans bg-background text-foreground` desde `src/app/layout.tsx`.
- Los contenedores principales usan `bg-card text-card-foreground border` para consistencia.

> Nota: Algunos linters pueden marcar `@apply`/`@theme` como “desconocidos”; Tailwind 4 los procesa correctamente en build.

## Datos y utilidades

- `src/lib/words-es.ts` — Vocabulario común en español.
- `src/lib/utils.ts` — Funciones auxiliares: mezclar, codificar/decodificar palabras en URL, normalización, etc.

## Accesibilidad y móviles

- Diseño responsive y botones grandes en acciones clave.
- Tipografías optimizadas con `next/font` (Geist y Geist Mono).
- Viewport configurado para móviles en `src/app/layout.tsx`.

## Despliegue

Se recomienda Vercel para desplegar aplicaciones Next.js:

1. Ejecuta `npm run build` para compilar.
2. Conecta el repositorio a Vercel o usa la CLI.
3. Configura proyecto como Next.js (no requiere ajustes especiales).

Documentación: https://nextjs.org/docs/app/building-your-application/deploying

## Licencia

Este proyecto se distribuye sin licencia específica. Si deseas añadir una licencia (por ejemplo, MIT), crea un archivo `LICENSE` en la raíz del proyecto.
