# Slides — guía para agentes

Catálogo de presentaciones en **Slidev**. Varios decks comparten una sola instalación de dependencias. La home es una página estática, generada en el build, que los lista en una timeline. La salida de `dist/` es lo que se publica en un Worker de assets (`slides.nicobytes.com`).

## Stack

| Herramienta | Uso |
|-------------|-----|
| **Slidev 53** | Cada deck |
| **Vue 3** | Layouts y componentes de un deck |
| **pnpm** | Una instalación para todos los decks |
| **just** | Atajos locales |
| **wrangler** | Deploy a un Worker de assets |

Node **>= 22.12.0**. No hay Astro ni Tailwind: la home es HTML y CSS propios.

## Comandos

Desde `apps/slides/`:

```bash
pnpm install                              # o: just i
pnpm deck postgres-is-all-you-need        # Slidev en localhost:3030
pnpm build                                # dist/ con home + decks
pnpm preview                              # sirve dist/ en localhost:4173
pnpm deploy                               # wrangler deploy, después del build
```

## Estructura

```
decks/<slug>/
  deck.json       # catálogo de la home
  slides.md       # entrada de Slidev
  style.css       # estilo de ese deck
  index.html      # head del deck (fuentes)
  layouts/        # layouts de ese deck
  public/         # assets servidos en la raíz del deck
  notes/          # notas, no se publican
home/
  template.html   # esqueleto; el build inyecta <!-- decks -->
  home.css
scripts/
  build.mjs       # slidev build + index.html + _redirects
  preview.mjs
  deck.mjs
```

Slidev toma `components/`, `layouts/`, `public/`, `style.css` e `index.html` desde la carpeta del `slides.md`, no desde la raíz de la app. Las dependencias viven solo en el `package.json` de `apps/slides/`.

## Nuevo deck

1. Crear `decks/<slug>/` con `slides.md` y `deck.json`.
2. No añadir otro `package.json` ni reinstalar Slidev.
3. `deck.json` requiere `title`, `description` y `date` (`YYYY-MM-DD`). `tags` es opcional. `draft: true` lo excluye de la home y del build.
4. El estilo, las fuentes y los layouts van dentro de esa carpeta.
5. La home enlaza a `/{slug}/`. El build usa `--base /{slug}/`.

## Home

La timeline sale de los `deck.json`, ordenados por fecha descendente. Copy en español. Superficie oscura, Bricolage Grotesque, acento lima. Al cambiar la home, seguir `.agents/skills/frontend-design/SKILL.md`. Para autorar diapositivas, seguir `.agents/skills/slidev/SKILL.md`.

## Idioma

- UI de la home: **español**.
- Código, nombres de archivos y commits: **inglés**.
