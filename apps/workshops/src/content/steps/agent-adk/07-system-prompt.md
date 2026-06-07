---
title: 'Define el system prompt de tu agente'
titleStep: 'System prompt'
description: 'Separa el system prompt en un archivo prompt.md con rol, reglas y workflow, y cárgalo desde agent.py con pathlib.'
order: 7
prevStep: '06-google-adk'
nextStep: '08-tools'
---

El `instruction` inline sirve para probar, pero enseguida se vuelve incómodo. La solución: **un archivo aparte** (`prompt.md`) con estructura clara, cargado desde Python.

## 1. Por qué separar el prompt del código

| En `agent.py` (inline) | En `prompt.md` (archivo) |
|------------------------|--------------------------|
| Mezcla lógica y contenido | Código limpio; el prompt es solo texto |
| Difícil de revisar en PRs | Cambios de comportamiento visibles de un vistazo |
| Escapar comillas y saltos de línea | Markdown legible, sin escapes raros |

En ADK el campo sigue llamándose **`instruction`**, pero el valor puede venir de cualquier fuente: un archivo, una base de datos o un builder. Aquí usamos un `.md` junto al agente.

## 2. Crea `app/prompt.md`

Junto a `agent.py`, crea el archivo con esta estructura (seguimos con el pirata del paso anterior):

````markdown
## Role

Responde siempre como un pirata. Usa expresiones náuticas y un tono divertido.

## Rules

- No uses emojis.

## Workflow

1. Pregunta al usuario su nombre.
2. Pregunta al usuario su edad.
3. Pregunta al usuario su ciudad de origen.
4. Pregunta al usuario su ocupación.
5. Pregunta al usuario sus hobbies.
6. Pregunta al usuario su color favorito.
7. Pregunta al usuario su animal favorito.
8. Pregunta al usuario su comida favorita.
9. Pregunta al usuario su bebida favorita.
10. Pregunta al usuario su libro favorito.
````

ADK no interpreta esos encabezados de forma especial; el modelo los lee como texto. Lo que importa es tener **rol, reglas y flujo** separados.

## 3. Carga el prompt en `agent.py`

Sustituye el `instruction="..."` por la lectura del archivo:

```python
import pathlib

agent_root = pathlib.Path(__file__).parent
instruction_path = agent_root / "prompt.md"
instruction_text = instruction_path.read_text(encoding="utf-8").strip()

root_agent = Agent(
    name="root_agent",
    model=Gemini(
        model="gemini-flash-latest",
        retry_options=types.HttpRetryOptions(attempts=3),
    ),
    instruction=instruction_text,
)
```

## 4. Prueba

```bash
agents-cli playground
```

Saluda con *«Ahoy!»*. Debería hablar como pirata, sin emojis, y seguir el workflow preguntándote nombre, edad, ciudad… en orden.

Si cambias `prompt.md`, reinicia el playground (`Ctrl+C` y vuelve a lanzarlo).

En el siguiente paso añadirás **tools** al agente.
