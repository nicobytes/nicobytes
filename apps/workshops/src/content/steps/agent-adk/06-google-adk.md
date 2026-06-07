---
title: 'Conoce el Google ADK'
titleStep: 'Google ADK'
description: 'Abre app/agent.py, entiende cómo ADK define un agente con Gemini y simplifica el system prompt para ver el efecto al instante.'
order: 6
prevStep: '05-api-key'
nextStep: '07-system-prompt'
---

En el paso anterior el agente ya respondía en el playground. Ahora toca abrir el código y entender **cómo ADK lo define**. El corazón del proyecto está en `app/agent.py`: ahí vive el agente, el modelo y las instrucciones que moldean su personalidad.

## 1. El Google ADK en una frase

El [Agent Development Kit (ADK)](https://adk.dev/) es el SDK de Python de Google para construir agentes. En lugar de armar llamadas al modelo a mano, declaras un **`Agent`** con nombre, modelo, instrucciones y (opcionalmente) herramientas. ADK se encarga del resto: sesiones, historial, trazas en el playground y despliegue.

En este paso nos quedamos con lo mínimo: **un agente que solo conversa**, sin tools.

## 2. Abre `app/agent.py`

El proyecto generado con `agents-cli` incluye un agente de ejemplo parecido a esto:

```python
root_agent = Agent(
    name="root_agent",
    model=Gemini(
        model="gemini-flash-latest",
        retry_options=types.HttpRetryOptions(attempts=3),
    ),
    instruction="You are a helpful AI assistant designed to provide accurate and useful information.",
    tools=[get_weather, get_current_time],
)
```

Léelo con calma. Es la pieza central del taller: todo lo que el agente *es* y *hace* parte de aquí.

## 3. Qué significa cada parámetro

| Parámetro | Qué hace |
|-----------|----------|
| **`name`** | Identificador interno del agente. ADK lo usa en trazas, sesiones y despliegue. |
| **`model`** | El LLM que responde. Aquí es **Gemini** (`gemini-flash-latest`), rápido y barato para iterar en local. |
| **`retry_options`** | Reintentos automáticos si la API falla (red, rate limit, etc.). `attempts=3` es un valor razonable para desarrollo. |
| **`instruction`** | El **system prompt**: la personalidad, tono y reglas del agente. Es lo que más vas a tocar hoy. |
| **`tools`** | Funciones que el modelo puede invocar (clima, hora, APIs…). Las veremos más adelante; por ahora las quitamos. |

> **Nota:** En otros frameworks esto se llama *system prompt* o *system message*. En ADK, el campo se llama **`instruction`**.

## 4. Simplifica el agente

Vamos a dejarlo lo más simple posible para que veas el efecto del `instruction` sin distracciones.

**Elimina** las funciones de herramientas (`get_weather`, `get_current_time`) y sus imports si ya no se usan en ningún otro sitio.

**Deja** el agente así:

```python
root_agent = Agent(
    name="root_agent",
    model=Gemini(
        model="gemini-flash-latest",
        retry_options=types.HttpRetryOptions(attempts=3),
    ),
    instruction="Responde siempre como un pirata. Usa expresiones náuticas y un tono divertido.",
)
```

Sin `tools=`. Sin lógica extra. Solo Gemini + una personalidad clara.

## 5. Prueba el cambio

Guarda el archivo y vuelve a lanzar el playground:

```bash
agents-cli playground
```

Pregúntale algo trivial, por ejemplo *«¿Qué hora es?»* o *«Explícame qué es Python»*. Debería contestarte **como pirata**, aunque no tenga herramientas para consultar la hora real. Eso confirma que el `instruction` manda sobre el tono y el estilo de la respuesta.

![ADK Dev UI con el agente respondiendo como pirata tras cambiar el instruction](/images/adk/camarada.png)


## 6. Tu turno: cambia el `instruction`

El objetivo de este paso es que **sientas** cómo una línea de texto redefine al agente. Prueba una de estas (o inventa la tuya):

- *«Habla como un chef italiano muy dramático.»*
- *«Eres un profesor de historia del siglo XIX, muy formal.»*
- *«Responde en rima corta, siempre.»*

Guarda, recarga el playground y compara las respuestas. Mismo modelo, misma API key, **distinta personalidad**.

En el siguiente paso profundizaremos en un system prompt más estructurado para un agente de verdad. Por ahora, con esto ya dominas la pieza más importante del ADK: **decirle al agente quién es**.
