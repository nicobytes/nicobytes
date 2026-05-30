---
title: 'Configura la API key de Google AI Studio'
titleStep: 'API key'
description: 'Obtén una API key en AI Studio, configúrala en .env y prepara el agente para ejecutarse en local sin Vertex AI.'
order: 5
prevStep: '04-create-project'
nextStep: '06-google-adk'
---

En el paso anterior viste un error de autenticación al ejecutar `agents-cli playground`: por defecto, ADK intenta usar **Vertex AI**. En este paso configurarás una **API key de Google AI Studio** para que el agente funcione en local sin credenciales de `gcloud`.

## 1. Crea tu API key

Entra en [Google AI Studio → API keys](https://aistudio.google.com/apikey) y genera una clave nueva.

![Pantalla de Google AI Studio para crear una API key](/images/adk/api-key.png)

> **Importante:** La API key es personal y confidencial. No la compartas ni la subas a repositorios públicos.

## 2. Configura el archivo `.env`

En la raíz de tu proyecto (junto a `pyproject.toml`), crea o edita el archivo `.env` con estas variables:

```env
GOOGLE_API_KEY=your-api-key-here
GOOGLE_CLOUD_PROJECT=your-project-id-here
GOOGLE_CLOUD_LOCATION=your-region-here
GOOGLE_GENAI_USE_VERTEXAI=0
```

- **`GOOGLE_API_KEY`**: la clave que acabas de generar en AI Studio.
- **`GOOGLE_GENAI_USE_VERTEXAI=0`**: indica al proyecto que use la API de AI Studio en lugar de Vertex AI.

> **Nota:** `GOOGLE_CLOUD_PROJECT` y `GOOGLE_CLOUD_LOCATION` son opcionales mientras uses AI Studio; los necesitarás al configurar Vertex AI en el paso 12.

Comprueba que `.env` esté listado en `.gitignore` para que no se suba a GitHub por accidente.

## 3. Protege tu API key

Las API keys expuestas en repositorios públicos se escanean en minutos. No compartas la tuya y no la incluyas en commits.

Una key filtrada puede generar consumo inesperado en tu cuenta. En mi caso, una vez por descuido dejé una key expuesta y alguien la usó; el resultado fue una factura de casi **4.000 USD**.

![Factura de Google Cloud por consumo no autorizado](/images/adk/bill.png)

![Desglose de costes en la consola de facturación](/images/adk/costes.png)

Despues de muchos emails y gracias al programa del Google Dev Expert, la factura fue reembolsada. Pero fue el error mas tonto y facil de cometer.

En GitHub es fácil encontrar keys filtradas; por ejemplo, [búsquedas por `GOOGLE_API_KEY`](https://github.com/search?q=GOOGLE_API_KEY&type=code):

![Resultados de búsqueda en GitHub con API keys expuestas](/images/adk/github.png)

Si crees que una key se filtró, **revócala de inmediato** en AI Studio y genera una nueva.

## 4. Ajusta `app/agent.py`

El proyecto generado con `agents-cli` incluye código que fuerza Vertex AI. Comenta ese bloque para que el agente lea la configuración desde `.env`:

```python
# app/agent.py
"""
import os
import google.auth

_, project_id = google.auth.default()
os.environ["GOOGLE_CLOUD_PROJECT"] = project_id
os.environ["GOOGLE_CLOUD_LOCATION"] = "global"
os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "True"
"""
```

## 5. Ejecuta el playground

Con la API key en `.env` y el bloque de Vertex AI comentado, vuelve a lanzar el playground:

```bash
agents-cli playground
```

Si todo está bien configurado, el comando abrirá el **ADK Dev UI** en el navegador (por defecto en `http://127.0.0.1:8000`) sin el error de `RefreshError` de Google Auth.

## 6. Envía tu primer mensaje

En la interfaz del playground verás el panel de depuración del ADK: historial de la conversación, trazas de herramientas y la respuesta del modelo. Escribe un saludo en el cuadro de chat y confirma que el agente responde.

![ADK Dev UI con el playground abierto y el primer mensaje enviado al agente](/images/adk/hello.png)

Con esto el agente ya corre en local con tu API key. En el siguiente paso abrirás `app/agent.py` y explorarás cómo ADK define un agente con el campo `instruction`.