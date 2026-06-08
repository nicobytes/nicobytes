# Spec: Image Lightbox para ArticleImage

## Objective

Permitir que el lector haga click en imágenes inline de blog y portfolio (`ArticleImage`) para verlas a tamaño completo en un modal con backdrop difuminado.

## Alcance

- **Incluye:** imágenes renderizadas por `ArticleImage.astro` en páginas `blog/[...slug]` y `portfolio/[...slug]`.
- **Excluye:** hero/cover images, imágenes en home/about/cards, y archivos MDX (no requieren cambios).

## Componentes

| Archivo | Rol |
|---------|-----|
| `src/components/ArticleImage.astro` | Thumbnail clickeable con `data-lightbox-*` y URL de zoom pre-calculada via `getImage()` |
| `src/components/ImageLightbox.astro` | Modal compartido: backdrop blur, imagen full-size, cierre por X/Escape/backdrop |
| `src/pages/blog/[...slug].astro` | Monta `<ImageLightbox />` |
| `src/pages/portfolio/[...slug].astro` | Monta `<ImageLightbox />` |

## Success Criteria

- Click en `ArticleImage` abre modal con imagen centrada (`max-h-[90vh]`, `object-contain`).
- Backdrop: `bg-black/60` (light) y `dark:bg-black/80` (dark), sin blur; click fuera de la imagen cierra el modal.
- Cursor: `cursor-zoom-in` en thumbnail, `cursor-zoom-out` en imagen abierta; click en la imagen también cierra.
- Cierre: botón X, click en backdrop, tecla Escape.
- `role="dialog"`, `aria-modal="true"`, alt text propagado.
- `cursor-zoom-in` en thumbnail; scroll del body bloqueado mientras el modal está abierto.
- `pnpm build` sin errores.

## Boundaries

- **Always:** JS vanilla, sin dependencias nuevas, patrón alineado con `MobileNav.astro`.
- **Ask first:** extender zoom a hero images u otras páginas del sitio.
- **Never:** modificar MDX, agregar lightbox global en `BaseLayout`.
