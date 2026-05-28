# Spec: Mejora SEO / Performance / Accessibility — nicobytes.com

## Objective

Elevar la calidad web de nicobytes.com en SEO técnico, Core Web Vitals y WCAG 2.2 AA en rutas principales (home, about, blog, portfolio).

## Tech Stack

- Astro 6 + MDX + Tailwind v4
- Sharp, Partytown, astro-compressor
- Deploy: Cloudflare Pages

## Commands

```bash
cd apps/website && npm run dev
cd apps/website && npm run build
cd apps/website && npm run preview
npx lighthouse http://localhost:4321 --only-categories=seo,performance,accessibility
```

## Success Criteria

### SEO
- [x] `public/robots.txt` con sitemap URL
- [x] `public/og_image.jpg` (1200×630)
- [x] JSON-LD en home, about, blog, portfolio
- [x] Meta artículo en blog posts
- [x] `twitter:creator` = `@nicobytes`
- [x] 404 con description específica
- [x] Sitemap excluye thank-you, courses, speaking
- [x] courses/speaking con noindex

### Performance
- [ ] General Sans vía Astro Fonts API — revertido a Fontshare CDN (tipografía preferida)
- [x] LCP images con `fetchpriority="high"`
- [x] Imágenes quality 80, format webp
- [x] Scroll-reveal guard
- [x] Prefetch en navegación

### Accessibility
- [x] Skip link → `#main-content`
- [x] `:focus-visible` global
- [x] Mobile nav: aria-expanded, Escape, inert
- [x] `prefers-reduced-motion`
- [x] Portfolio heading hierarchy
- [x] Contrast fixes en metadata

## Boundaries

- **Always:** trailing slash URLs, noindex en páginas draft/no listas, build antes de merge
- **Ask first:** nuevas dependencias, consent mode GA, llms.txt
- **Never:** secrets en repo, bloquear crawlers sin decisión
