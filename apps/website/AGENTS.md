# Website — guía para agentes

Sitio personal de **Nicolas Molina (@nicobytes)** en [nicobytes.com](https://nicobytes.com). Astro 6 SSG con blog bilingüe (EN/ES), portfolio y páginas estáticas. Desplegado en **Cloudflare Pages**.

## Prioridades transversales

Antes de implementar cualquier cambio, evalúalo en este orden:

1. **SEO** — metadatos, estructura semántica, hreflang, JSON-LD, sitemap
2. **Performance** — imágenes optimizadas, JS mínimo, compresión, Core Web Vitals
3. **Accesibilidad** — skip link, contraste, alt text, foco visible

Usa los skills del monorepo cuando aplique:

- `.agents/skills/seo/SKILL.md` — meta tags, structured data, contenido indexable
- `.agents/skills/performance/SKILL.md` y `.agents/skills/core-web-vitals/SKILL.md` — LCP, CLS, INP
- `.agents/skills/frontend-design/SKILL.md` — decisiones de UI (refinar la estética existente, no reemplazarla)

## Stack

| Herramienta | Uso |
|-------------|-----|
| **Astro 6** | SSG, content collections, `astro:assets` |
| **Tailwind CSS 4** | Estilos via `@tailwindcss/vite` + `@tailwindcss/typography` |
| **MDX** | Posts de blog con componentes Astro embebidos |
| **Shiki** | Syntax highlighting (`night-owl`) |
| **KaTeX** | Fórmulas matemáticas (`remark-math` + `rehype-katex`) |
| **Partytown** | Google Analytics fuera del main thread |
| **astro-compressor** | Gzip + Brotli en build |
| **@astrojs/sitemap** | Sitemap automático (filtra rutas `noindex`) |
| **pnpm** | Gestor de paquetes |
| **just** | Atajos locales (`just i`, `just serve`, `just fmt`) |

Node **>= 22.12.0**. Site URL: `https://nicobytes.com`. Trailing slash: **always**.

## Comandos

Desde `apps/website/`:

```bash
pnpm install          # o: just i
pnpm dev              # localhost:4321 — o: just serve
pnpm build            # salida en ./dist/
pnpm preview          # preview del build
pnpm format           # Prettier — o: just fmt
```

Deploy: build estático a `./dist/` → Cloudflare Pages (`wrangler.toml`).

## Estructura del proyecto

```
src/
├── assets/images/        # Imágenes globales (perfil, logos, about)
├── components/           # Astro: Header, Prose, ArticleImage, Card, etc.
├── content/
│   ├── blog/             # {slug}/index.mdx (EN) + es.mdx (ES opcional)
│   └── portfolio/        # {slug}/index.mdx
├── layouts/
│   └── BaseLayout.astro  # SEO, OG, Twitter, hreflang, JSON-LD, GA
├── lib/
│   ├── seo/jsonLd.ts     # Schemas: BlogPosting, Person, CreativeWork…
│   ├── getOgImageUrl.ts  # OG images optimizadas (1200px JPG)
│   ├── formatDate.ts
│   └── navItems.ts
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── blog/index.astro
│   ├── blog/[...slug].astro
│   ├── portfolio/index.astro
│   ├── portfolio/[...slug].astro
│   └── feed.xml.ts       # RSS
├── styles/global.css     # @theme, tokens, animaciones, skip-link
└── content.config.ts     # Schemas Zod para blog y portfolio
public/                   # favicon, cv.pdf, og_image.jpg
```

## Contenido (Content Collections)

Definido en `src/content.config.ts`.

### Blog

Carpeta por artículo en `src/content/blog/{slug}/`:

| Archivo | Idioma | URL |
|---------|--------|-----|
| `index.mdx` | `en` (default) | `/blog/{slug}/` |
| `es.mdx` | `es` | `/blog/es/{translationSlug ?? slug}/` |

Frontmatter requerido: `title`, `description`, `date` (ISO `YYYY-MM-DD`).

Opcionales: `heroImage` (import relativo), `categories`, `repoLink`, `draft`, `lang`, `translationSlug`.

Convenciones:

- El **slug** es el nombre de la carpeta (`hybrid-search/` → id `hybrid-search`).
- Traducciones: mismo directorio, `es.mdx` con `lang: "es"`. Usa `translationSlug` si la URL en español difiere del slug EN.
- Imágenes del artículo: colocalas en la carpeta del post; en MDX usa `ArticleImage` o import directo.
- El listado en `/blog/` muestra solo posts EN (`lang === "en"`).
- No repetir el `title` como `#` en el cuerpo — el layout ya renderiza `<h1>`.

### Portfolio

Carpeta por proyecto en `src/content/portfolio/{slug}/index.mdx`.

Frontmatter: `title`, `description`, `image` (requerido), `date`, `type` (`private`|`public`), `url?`, `draft?`.

Ruta: `/portfolio/{slug}/`.

## Fórmulas matemáticas (LaTeX)

El pipeline Markdown ya incluye `remark-math` y `rehype-katex` (configurado en `astro.config.mjs`). El CSS de KaTeX se carga en `blog/[...slug].astro`.

**Siempre usa LaTeX** para ecuaciones, notación matemática y símbolos formales. No uses Unicode ad hoc ni imágenes para fórmulas.

### Sintaxis en MDX/Markdown

Inline (dentro de una frase):

```md
El score RRF es $ \text{score}(d) = \sum \frac{1}{k + \text{rank}_i(d)} $.
```

Bloque (ecuación destacada):

```md
$$
\text{score}(d) = \sum_{i} \frac{1}{k + \text{rank}_i(d)}
$$
```

Reglas:

- Preferir `$...$` inline y `$$...$$` en bloque (delimitadores estándar de remark-math).
- Usar `\text{}` para palabras dentro de fórmulas; `\frac{}{}` para fracciones; subíndices `_` y superíndices `^`.
- Evitar fórmulas excesivamente largas inline — pásalas a bloque `$$`.
- No añadir scripts ni CSS de KaTeX manualmente; ya está integrado.
- Si un post nuevo usa muchas ecuaciones, verifica legibilidad en dark mode (prose invert).

## SEO

El sitio ya tiene infraestructura SEO — **extiéndela, no la dupliques**.

### Metadatos (`BaseLayout.astro`)

Al crear o editar páginas, pasa siempre:

- `title` — conciso, keyword-relevante
- `description` — 150–160 caracteres, único por página
- `image` — OG image (hero del post o default `/og_image.jpg`)
- `type` — `"article"` en posts, `"website"` en el resto
- `lang` — `en` o `es-CO` según idioma
- `alternates` — hreflang EN/ES + `x-default` en posts bilingües
- `jsonLd` — schema apropiado desde `src/lib/seo/jsonLd.ts`

### Structured data

| Página | Schema |
|--------|--------|
| Blog post | `blogPostingSchema()` |
| Blog index | `blogIndexSchema()` |
| Portfolio | `creativeWorkSchema()` |
| Home / About | `personSchema()`, `websiteSchema()` |

### Checklist por nuevo contenido

- [ ] `title` y `description` únicos y descriptivos
- [ ] Un solo `<h1>` (viene del layout, no del MDX)
- [ ] Jerarquía `h2` → `h3` sin saltos
- [ ] `heroImage` con alt text (= title o descriptivo)
- [ ] Links externos: ya tienen `target="_blank"` + `rel="noopener noreferrer"` via rehype
- [ ] Traducción ES con `hreflang` correcto si existe par EN
- [ ] `draft: true` mientras no esté listo para publicar
- [ ] Redirects legacy en `astro.config.mjs` si cambias slugs o rutas de imágenes

### Rutas excluidas del sitemap

`/thank-you/`, `/courses/`, `/speaking/` — tienen `noindex` o están fuera del sitemap.

## Performance

Objetivo: **100 Lighthouse** en performance. Cada cambio debe preservar o mejorar Core Web Vitals.

### Imágenes

- **Hero / LCP**: `astro:assets` `<Image>` con `loading="eager"`, `fetchpriority="high"`, `format="webp"`, `widths` + `sizes`.
- **Contenido**: `ArticleImage.astro` (lazy, webp, quality 80) o el mismo patrón.
- **OG**: `getOgImageUrl()` genera JPG 1200px — no subir PNGs enormes sin optimizar.
- Colocar assets en la carpeta del post, no en `public/` salvo estáticos globales.

### JavaScript y CSS

- Sitio **estático** — sin SSR, API routes ni frameworks UI (React/Vue) salvo petición explícita.
- GA via **Partytown** — no mover gtag al main thread.
- Prefetch global en hover (`astro.config.mjs`) — mantener en links de navegación.
- Dark mode: script inline anti-FOUC en `BaseLayout`; preferencia en `localStorage`.
- No añadir dependencias pesadas sin justificación clara.

### Build y entrega

- `astro-compressor`: gzip + brotli automáticos — no desactivar.
- Sitemap generado en build — nuevas rutas estáticas se incluyen solas (salvo filtro `noindex`).
- Verificar con `pnpm build && pnpm preview` antes de considerar listo.

### Prose y tipografía

- Contenido markdown: envolver en `<Prose>` (`prose prose-compact dark:prose-invert`).
- Tokens de tipografía en `typography.ts` — no override inline masivo.
- Respetar `prefers-reduced-motion` (ya en `global.css`).

## Diseño

Estética editorial minimalista con acento teal/cyan:

- Light/dark via clase `dark` en `<html>` (toggle en Header)
- Gradiente acento: cyan → emerald (`--accent-gradient`)
- Cards con borde lateral en listados; scroll-reveal con stagger
- Componentes reutilizables: `Card`, `Container`, `SimpleLayout`, `Button`

Al cambiar UI, mantener coherencia con páginas existentes (Home, Blog, About, Portfolio).

## Patrones de código

- Componentes Astro con `interface Props` tipada en frontmatter `---`.
- Lógica compartida en `src/lib/` — no duplicar helpers de SEO, fechas u OG.
- Posts MDX: `<Content />` dentro de `<Prose>`; componentes custom (`ArticleImage`) importados en frontmatter.
- Redirects de URLs legacy en `astro.config.mjs` → mantener al renombrar slugs o mover imágenes.
- Formato: Prettier (`pnpm format`) con plugins Astro y Tailwind.

## Alcance de cambios

| Tarea | Acción |
|-------|--------|
| Nuevo post EN | Carpeta en `content/blog/{slug}/index.mdx` |
| Traducción ES | `es.mdx` en la misma carpeta + `lang: "es"` |
| Nuevo proyecto | `content/portfolio/{slug}/index.mdx` |
| Nueva página | `src/pages/*.astro` + props SEO en `BaseLayout` |
| Cambio visual | Tokens existentes + skill frontend-design |
| Fórmulas | LaTeX via `$...$` / `$$...$$` — nunca imágenes |

No añadir React/Vue, no introducir SSR, no commitear secrets.

## Idioma

- **UI y copy del sitio**: inglés (default).
- **Blog**: inglés primario; español como traducción opcional con hreflang.
- **Código, nombres de archivos y commits**: inglés (convención del repo).
