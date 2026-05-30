# Workshops — guía para agentes

Plataforma de talleres técnicos paso a paso. Sitio estático en **Astro 6** con contenido en Markdown, orientado a aprender haciendo (Angular, TypeScript, etc.).

## Diseño

**Usa el skill `/frontend-design`** para cualquier decisión de UI: layouts, componentes, tipografía, color, motion y atmósfera visual.

Antes de implementar cambios visuales, lee y sigue `.agents/skills/frontend-design/SKILL.md` en la raíz del monorepo. El taller ya tiene una dirección estética definida — **refínala, no la reemplaces** con estética genérica:

- Tema oscuro industrial/editorial
- Acento lima (`#c8ff00`) sobre canvas casi negro
- Tipografía: **Bricolage Grotesque** (display), **Geist Sans** (body), **JetBrains Mono** (meta/navegación)
- Bordes punteados, animación `fade-up` con stagger, prose invertido para pasos

## Stack

| Herramienta | Uso |
|-------------|-----|
| **Astro 6** | Framework, SSG, content collections |
| **Tailwind CSS 4** | Estilos via `@tailwindcss/vite` (no `tailwind.config.js`) |
| `@tailwindcss/typography` | Clase `prose` en contenido de pasos (`.workshop-prose`) |
| **TypeScript** | Tipos en `.ts` y frontmatter validado con Zod |
| **Shiki** | Syntax highlighting (`night-owl`) en bloques de código |
| **pnpm** | Gestor de paquetes |
| **just** | Atajos locales (`just i`, `just serve`, `just fmt`) |

Node **>= 22.12.0**.

## Comandos

Desde `apps/workshops/`:

```bash
pnpm install          # o: just i
pnpm dev              # localhost:4321 — o: just serve
pnpm build            # salida en ./dist/
pnpm preview          # preview del build
```

## Estructura del proyecto

```
src/
├── components/       # Astro: WorkshopCard, StepSidebar, StepNav
├── content/
│   ├── workshops/    # *.json — metadata del taller
│   └── steps/        # {workshop}/{order-slug}.md — pasos del taller
├── layouts/          # BaseLayout, WorkshopLayout
├── lib/workshops.ts  # helpers: rutas, agrupación, orden
├── pages/
│   ├── index.astro                           # listado de talleres
│   └── workshops/[workshop]/
│       ├── index.astro                       # redirect al primer paso
│       └── [step].astro                      # render de cada paso
└── styles/global.css # @theme, tokens, prose, animaciones
```

## Contenido (Astro Content Collections)

Definido en `src/content.config.ts`:

- **`workshops`**: JSON en `src/content/workshops/`. Campos: `title`, `description`, `order`, `level?`, `tags?`.
- **`steps`**: Markdown en `src/content/steps/{workshop-id}/`. Frontmatter: `title`, `titleStep`, `description`, `order`.
  - `title`: heading principal del paso (h1 en el layout).
  - `titleStep`: etiqueta corta para sidenav y navegación prev/next.

Convenciones:

- El **id del workshop** es el nombre del archivo JSON (ej. `ng-init.json` → id `ng-init`).
- Los pasos viven en `src/content/steps/{workshop-id}/` con prefijo numérico (`01-welcome.md`, `02-angular.md`).
- El slug de URL del paso es el nombre del archivo sin extensión (`01-welcome`).
- Rutas: `/` (índice), `/workshops/{workshop}` (primer paso), `/workshops/{workshop}/{step}`.
- El contenido de los pasos está en **español**.

## Tailwind y tokens

Tailwind 4 se configura en `src/styles/global.css` con `@theme`. Usa las utilidades semánticas del proyecto:

| Token | Clase Tailwind | Uso |
|-------|----------------|-----|
| `--color-canvas` | `bg-canvas`, `text-canvas` | Fondo base |
| `--color-surface` | `bg-surface` | Sidebar, cards |
| `--color-surface-raised` | `bg-surface-raised` | Hover, activo |
| `--color-border` | `border-border` | Divisores |
| `--color-text` | `text-text` | Texto principal |
| `--color-muted` | `text-muted` | Texto secundario |
| `--color-faint` | `text-faint` | Meta, labels mono |
| `--color-accent` | `text-accent`, `bg-accent` | Links, CTAs |
| `--font-display` | `font-display` | Títulos |
| `--font-mono` | `font-mono` | Navegación, badges |

- Importa `global.css` desde layouts, no dupliques tokens.
- Contenido markdown de pasos: envolver en `workshop-prose prose prose-invert`.
- Preferir utilidades Tailwind sobre CSS custom salvo animaciones o prose ya definidos.
- Usar `data-astro-prefetch` en links de navegación entre pasos.

## Patrones de código

- **Componentes Astro** con frontmatter `---` para props tipadas con `interface Props`.
- Lógica compartida en `src/lib/workshops.ts` — no duplicar parsing de ids ni ordenamiento.
- Pasos renderizados con `<Content components={{ pre: Code }} />` de `astro:components`.
- Layout de taller: sidebar fija (lg+) + artículo centrado (`max-w-3xl`) + nav fija prev/next.
- Assets estáticos en `public/` (imágenes de tutorial en `public/images/tutorial/`).

## Alcance de cambios

- **UI/layouts/componentes**: seguir tokens y `/frontend-design`.
- **Nuevo taller**: añadir JSON en `workshops/` + carpeta de pasos en `content/steps/`.
- **Nuevo paso**: markdown con frontmatter válido (`title`, `titleStep`, `description`, `order`) y `order` secuencial. No repetir el título como `#` en el cuerpo del markdown.
- No añadir frameworks UI (React, Vue) ni dependencias pesadas sin necesidad.
- Mantener el sitio estático — sin API routes ni SSR salvo que se pida explícitamente.

## Idioma

- UI y copy orientados al usuario final: **español**.
- Código, nombres de archivos y commits: **inglés** (convención del repo).
