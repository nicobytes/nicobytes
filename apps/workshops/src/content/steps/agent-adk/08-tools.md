---
title: 'Añade tools a tu agente'
titleStep: 'Herramientas'
description: 'Define una function tool con Python, regístrala en el agente y actualiza el prompt para que sepa cuándo usarla.'
order: 8
prevStep: '07-system-prompt'
nextStep: '09-tool-api'
---

Hasta ahora el agente solo conversa. Para que **haga cosas** — consultar datos, llamar APIs, ejecutar lógica propia — ADK usa **function tools**: funciones Python que el modelo puede invocar cuando lo necesite.

## 1. Qué es una function tool

Una [function tool](https://adk.dev/tools-custom/function-tools/) es una función Python normal. ADK inspecciona su nombre, docstring, parámetros y type hints para generar un esquema que el LLM entiende: **qué hace la tool, cuándo usarla y qué argumentos necesita**.

Pasas la función directamente en `tools=[...]`; el framework la envuelve como `FunctionTool` automáticamente.

## 2. Define `get_weather`

En `app/agent.py`, añade la función **antes** de crear el agente:

```python
def get_weather(city: str, unit: str):
    """
    Retrieves the weather for a city in the specified unit.

    Args:
        city (str): The city name.
        unit (str): The temperature unit, either 'Celsius' or 'Fahrenheit'.
    """
    return {"status": "success", "report": f"Weather for {city} is sunny."}
```

El docstring no es decoración: ADK lo usa para describir la tool al modelo. `city` y `unit` son obligatorios (tienen type hint pero no valor por defecto).

> **Nota:** Aquí devolvemos datos simulados. En un agente real, esta función llamaría a una API de clima.

## 3. Regístrala en el agente

Añade `tools=[get_weather]` al `Agent`:

```python
root_agent = Agent(
    name="root_agent",
    model=Gemini(
        model="gemini-flash-latest",
        retry_options=types.HttpRetryOptions(attempts=3),
    ),
    instruction=instruction_text,
    tools=[get_weather],
)
```

## 4. Actualiza `prompt.md`

El modelo sabe que la tool existe, pero el **prompt** le dice cuándo usarla. En la sección `## Rules`, añade la regla del clima:

````markdown
## Rules

- No uses emojis.
- Usa la herramienta `get_weather` para obtener el clima de la ciudad que el usuario te pida.
````

Sin esta regla, el agente podría inventar el clima en lugar de llamar a la tool.

## 5. Prueba

```bash
agents-cli playground
```

Pregúntale algo como *«¿Qué clima hace en Madrid?»*. Deberías ver en las trazas que el agente invoca `get_weather` con `city` y `unit`, y te responde como pirata usando el resultado.

Si cambias la tool o el prompt, reinicia el playground (`Ctrl+C` y vuelve a lanzarlo).

![ADK Dev UI mostrando la traza de invocación de get_weather en el playground](/images/adk/tool.png)

