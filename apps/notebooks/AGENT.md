# apps/notebooks — Agent guide

Colección de **Jupyter notebooks** con ejercicios de algoritmos y entrevistas técnicas. No es una app desplegable: el artefacto principal son los `.ipynb` en `src/`. Este archivo aplica **solo** a `apps/notebooks/`; en un monorepo, sus reglas tienen prioridad sobre un `AGENT.md` en la raíz cuando trabajes aquí.

## Estructura

```
apps/notebooks/
├── AGENT.md           # Este archivo
├── pyproject.toml     # Python ≥3.13, ipykernel (uv)
├── uv.lock            # Lock de Python — commitear
├── deno.json          # Imports Deno/JSR para notebooks TS
├── deno.lock          # Lock Deno — commitear
└── src/
    ├── promisify.ipynb              # Deno / TypeScript
    └── reversed-linked-list.ipynb   # Python
```

## Runtimes

| Notebook | Kernel | Lenguaje | Notas |
|----------|--------|----------|-------|
| `promisify.ipynb` | **Deno** (`kernelspec.name: deno`) | TypeScript | `deno.json` importa `@std/assert` y `jupyter` vía npm |
| `reversed-linked-list.ipynb` | **Python 3** (`.venv`) | Python 3.13+ | Tipado con `from __future__ import annotations` |

No mezclar lenguajes en un mismo notebook. Elegir Python o Deno según el ejercicio.

## Setup y comandos

Ejecutar siempre desde `apps/notebooks/`:

```bash
cd apps/notebooks

# Python (kernel Jupyter)
uv sync
uv run python -m ipykernel install --user --name notebooks --display-name "notebooks (.venv)"

# Deno (kernel TS en notebook)
deno --version   # verificar instalación
```

En el IDE: seleccionar el kernel correcto (`.venv` / `notebooks` para Python, **Deno** para `promisify.ipynb`).

**No commitear:** `.venv/`, `.ipynb_checkpoints/`, `node_modules/`, `.env`.

## Convenciones de notebooks

1. **Celda markdown primero** — enunciado, contrato I/O, casos borde y ejemplos (como en los notebooks existentes).
2. **Celda de código siguiente** — implementación mínima que cumpla el contrato; sin frameworks ni capas extra.
3. **Comprobaciones manuales al final** — `assert` o ejemplos comentados en la misma celda o en una celda aparte; descomentar al validar.
4. **Nombres de archivo** — `kebab-case.ipynb` en `src/`, un ejercicio por archivo.
5. **Idioma del enunciado** — inglés o español según el ejercicio; mantener consistencia dentro del mismo notebook.

### Python

- Clases y funciones con type hints (`Optional`, etc.).
- Listas enlazadas: nodo `ListNode` con `val: str` y `next`; salida como `str` con comas, sin coma final.
- Lista vacía (`head is None`) → `""` salvo que el enunciado diga otra cosa.

### TypeScript (Deno)

- Código en celdas como TypeScript; respetar la firma y el comportamiento del enunciado (p. ej. `promisify(fn, hasCallback = true)` → `"invalid"` si `fn` no es función).
- Promesas: Node-style callback `(error, response)` cuando `hasCallback === true`; función plana cuando es `false`.

## Qué hacer al añadir un ejercicio

1. Crear `src/<nombre-ejercicio>.ipynb` con markdown + implementación + asserts.
2. Si es Python y hace falta una dependencia, añadirla en `pyproject.toml` y ejecutar `uv lock` / `uv sync`.
3. Si es Deno/TS y hace falta un import, añadirlo en `deno.json` y actualizar `deno.lock` si aplica.
4. No generar `README.md`, scripts sueltos ni tests CI salvo que se pida explícitamente.

## Qué evitar

- Refactorizar notebooks existentes sin pedirlo.
- Convertir notebooks a `.py` / `.ts` standalone sin pedirlo.
- Añadir dependencias pesadas (pytest, frameworks web, etc.) para un solo ejercicio.
- Borrar o reescribir soluciones ya correctas al “limpiar” el notebook.
- Incluir secretos, tokens o rutas locales en celdas o outputs.

## Alcance de cambios del agente

| Permitido | Pedir confirmación |
|-----------|-------------------|
| Nuevo notebook en `src/` | Cambiar contrato I/O de un ejercicio publicado |
| Implementación / asserts en celdas | Borrar notebooks |
| `pyproject.toml` / `deno.json` mínimos | Commits o PRs (solo si el usuario lo pide) |
| Formato de celdas (sin cambiar semántica) | Migrar todo el proyecto a otro gestor de paquetes |

## Referencia rápida (notebooks actuales)

- **`promisify`**: envolver `fn` en una función que devuelve `Promise`; `hasCallback` controla estilo Node callback vs función síncrona/async directa.
- **`reversed-linked-list`**: invertir lista en lugar y devolver `val` unidos por `,` (orden head→tail de la lista ya invertida).
