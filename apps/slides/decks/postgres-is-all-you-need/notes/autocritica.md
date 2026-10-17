# Autocrítica y plan de diseño — v3

## 1. Qué está mal en la v2 (revisada con capturas de los 44 slides)

| # | Problema | Causa | Gravedad |
|---|----------|-------|----------|
| 1 | Flash negro entre slides | El slide se desvanece y deja ver el contenedor de Slidev (`.slidev-slide-content` usa `bg-main` = #121212; el marco exterior usa `black`). El fondo "parpadea" en cada cambio. | Alta |
| 2 | El código vive en una tarjeta aparte | Panel `#151d19` distinto del fondo: corta el slide en dos superficies y parece un widget pegado encima. | Alta |
| 3 | Scroll horizontal en el código | `.slidev-code` tiene `overflow: auto` y varias líneas llegan al borde. Mis capturas usaban `--hide-scrollbars` y lo escondían: error de verificación mío. | Alta |
| 4 | Código chico | Martian Mono en ancho normal es muy ancha (≈0.7em por carácter); con 1.75rem el bloque ocupa ~35% del alto. | Media |
| 5 | Títulos sin ancla | Centrados en vertical: la posición salta según si tienen 1, 2 o 3 líneas. Al pasar slides el ojo no sabe dónde mirar. | Media |
| 6 | El número del tema es una etiqueta | "01" en mono verde chiquito encima del título = el eyebrow de plantilla. No tiene peso de capítulo. | Media |
| 7 | Párrafos planos | Un bloque blanco uniforme. Se pierde la estructura de concepto.md (premisa + remate): "La seguridad no vive en tu app. / Vive en la base de datos." | Media |
| 8 | Paleta genérica | Negro + verde ácido + bermellón es el default más común. Además el rojo `#f44823` no es el de Angular y choca con el logo oficial. | Media |
| 9 | Logos sin marca | Versiones blancas planas: pierden el verde Supabase y el gradiente Angular. | Baja |
| 10 | Tipografía desaprovechada | Bricolage tiene ejes `opsz` y `wdth` (condensada); no los usaba. | Baja |
| 11 | Párrafo de Declarative Schemas no coincide con su código | Dice "genera migraciones" y el código muestra un `CHECK`. | Baja |

## 2. Plan v3

**Idea:** una sola superficie que nunca cambia, como una sesión de `psql`. El fondo es uno, siempre. Solo cambia el contenido, y todo cuelga de un mismo eje vertical a la izquierda.

### Color (con significado)

| Token | Hex | Uso |
|-------|-----|-----|
| `--ground` | `#0E1512` | Fondo único: slide, contenedor y marco exterior. Verde muy oscuro, derivado del verde Supabase (no un #111 genérico). |
| `--ink` | `#ECF2EE` | Texto principal y remates. |
| `--muted` | `#7C8F86` | Premisas de los párrafos. |
| `--supabase` | `#3ECF8E` | Números de capítulo 01–10. Verde del ícono oficial. |
| `--angular` | `#F50146` | Muestreado del logo oficial. Solo para el hilo de la sorpresa: "La #11…" y el capítulo 11. |

Regla: verde = la secuencia Supabase, rojo = la promesa del hook y su cumplimiento. Nada más lleva color, salvo el código.

### Tipografía

- **Bricolage Grotesque** (una familia, dos voces):
  - Títulos: 800, `wdth 75` (condensada), `opsz 96`, interlineado 0.86. Así entran títulos de ~13rem que llenan el ancho.
  - Párrafos: 500, ancho normal, 5.4rem. La diferencia de ancho separa título de texto sin una segunda familia.
- **Martian Mono** semicondensada para el código, a un tamaño que permite ~50 caracteres en 1040px.

### Retícula

Un eje vertical a 120px del borde izquierdo. Títulos, párrafos, código y logos arrancan exactamente ahí.

```
Título (póster)                 Párrafo                        Código (sin panel)
┌───────────────────────┐       ┌───────────────────────┐      ┌───────────────────────┐
│ 02                    │       │                       │      │                       │
│                       │       │ La seguridad no vive  │      │ create policy "own"   │
│                       │       │ en tu app.   (muted)  │      │   on todos for select │
│ Row Level             │       │ Vive en la base de    │      │ ▌using (auth.uid()…)  │
│ Security              │       │ datos.        (ink)   │      │                       │
└───────────────────────┘       └───────────────────────┘      └───────────────────────┘
número arriba, título abajo,    centrado en vertical,          sobre el mismo fondo,
anclados a márgenes fijos       premisa + remate               línea clave resaltada
```

- Los títulos se anclan abajo: crecen hacia arriba desde la misma línea base, tengan 1 o 2 líneas. El número queda arriba a la izquierda, en la misma familia y en verde: es un capítulo, no una etiqueta.
- Los párrafos van centrados en vertical, con la premisa en `muted` y el remate en `ink`.
- El código va directo sobre el fondo, sin tarjeta ni scroll, con la línea clave resaltada por Slidev y el resto atenuado.

### Principios

1. Un fondo, siempre. La transición solo desvanece contenido.
2. La audacia se gasta en un solo lugar: los títulos condensados gigantes. Párrafos y código, silenciosos.
3. El color significa algo o no aparece.
4. Un eje izquierdo para todo.

## 3. Revisión del plan contra los defaults

- *Fondo casi negro + un acento ácido* → el fondo pasa a ser un verde profundo derivado de la marca. El acento rojo deja de ser genérico: es el rojo del logo Angular y solo marca la sorpresa.
- *Número mono chico encima del título* → el número va en la familia display, en verde, en la esquina opuesta al título. Compone el póster en vez de etiquetarlo.
- *Tarjeta de código* → eliminada. El código comparte la superficie.
- *Todo centrado en vertical* → solo párrafos y código. Los títulos se anclan abajo para dar ritmo y un punto fijo.

## 4. Verificación

- Medir en el navegador real (no solo mirar): `scrollWidth` contra `clientWidth` de cada bloque de código y de cada título, en los 44 slides.
- Capturas sin `--hide-scrollbars`.
- Hoja de contactos completa para revisar ritmo y alineación.

## 5. Resultado de las pasadas de crítica

**Pasada 1 (13rem / código 2.15rem)**
- Auth: `onAuthStateChange((_, s) => {` se salía 33px del margen derecho → código a 2.05rem (queda a 17px).
- Títulos a 13rem usaban la mitad del ancho → subidos a 15.5rem; portada y cierre a 17rem.
- La portada cortaba "Postgres is All / You Need" → salto explícito: "Postgres is / All You Need".
- Líneas atenuadas a 0.38 se veían turbias → 0.45.
- "Conectar Angular con Supabase" ocupaba 3 líneas a tamaño de título → "Angular + Supabase".

**Pasada 2 (hoja completa)**
- Viudas en casi todos los párrafos ("app.", "datos.", "endpoint.", "URLs.") → `text-wrap: balance`.
- Logos chicos para ser el único elemento → 54rem / 50rem.

**Mediciones finales**
- Código: 0 slides con scroll; margen derecho mínimo 17px (Auth).
- Fondos durante la transición: marco, contenedor y body = `#0e1512`, slide = transparente. Solo se desvanece el contenido.
- Fuentes cargadas con ejes: Bricolage `75%–100%`, Martian Mono `75%–112.5%`.

## 6. v4 — ajustes de contenido (pedido del 2026-10-17)

| Cambio | Decisión |
|--------|----------|
| Sin fade de líneas | Se quitó el resaltado `{n}` y la regla `.slidev-code-dishonored`: todo el código en el mismo tono. |
| Contexto del código | `ctx:` en el frontmatter (`angular`, `sql`, `terminal`, `hono`). `layouts/stage.vue` pinta ícono + nombre arriba a la derecha, sobre el margen superior y el eje derecho. Íconos de `@iconify-json/logos` (Angular, PostgreSQL, Hono) y `carbon:terminal`. Nombre en `muted`, sin mayúsculas: dice dónde corre el código sin competir con él. |
| Declarative Schemas ≠ validación | Separados en dos temas: 03 Declarative Schemas (archivo en `supabase/schemas/` + `supabase db schema declarative sync`, verificado en la doc) y 04 Data Validation (el `CHECK`). Pasa de 11 a 12 temas: portada, hook ("La #12") y Self-Hosting en rojo como #12. |
| Storage | Mismo bloque con `upload` y `download`. |
| Edge Functions | Nuevo slide con la función en Hono (contexto Hono) antes del `invoke` desde Angular. |
| Extensiones | Primera línea del bloque SQL: `pg_cron` + `pg_net` (Scheduling), `vector` (AI & Vectors), `pgmq` (Queues). |

Mediciones v4 (49 slides): 0 bloques con scroll; margen derecho mínimo 17px (Auth); la esquina de contexto nunca se cruza con el código (en Hono, el slide más alto, se quitó una línea en blanco para separarlos).

**Pendiente / a vigilar**
- Los títulos de una línea (CRUD, Auth, Queues) dejan mucho aire entre el número y el título. Es intencional (póster), pero si se siente vacío en sala, la alternativa es subir esos títulos a 20rem con una clase `short`.
- `pgmq.read(queue, vt, qty)` y el CHECK de Declarative Schemas conviene confirmarlos contra la doc antes de la charla.
