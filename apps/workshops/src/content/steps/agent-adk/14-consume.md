---
title: 'Prueba tu agente desplegado'
titleStep: 'Prueba REST'
description: 'Prueba el agente desplegado con un access token temporal y la REST API de Vertex AI Agent Engine.'
order: 14
prevStep: '13-deploy'
nextStep: '15-consume-prod'
---

En el paso anterior desplegaste el agente y anotaste el **Reasoning Engine ID** y la **región del deploy**. Ahora lo consumes desde fuera del playground: la primera opción es la **REST API** con un **access token temporal** generado con `gcloud`.

> **Nota:** El token caduca en poco tiempo (suele durar ~1 hora). Si recibes `401 Unauthorized`, vuelve a ejecutar `gcloud auth print-access-token`.

> **Importante:** La región del Reasoning Engine (`DEPLOY_REGION`) es la que mostró `agents-cli deploy` (por ejemplo `us-east1`). No confundirla con `GOOGLE_CLOUD_LOCATION=global` del paso 12, que solo aplica a invocar Gemini en local.

## 1. Obtén un access token

Con la misma sesión de `gcloud` del paso 11 y el proyecto del paso 10:

```bash
gcloud auth print-access-token
```

Copia el valor o guárdalo en una variable de entorno:

```bash
export ACCESS_TOKEN=$(gcloud auth print-access-token)
export PROJECT_ID=TU_PROJECT_ID
export DEPLOY_REGION=us-east1
export ENGINE_ID=TU_REASONING_ENGINE_ID
```

Sustituye:

- `TU_PROJECT_ID` — el **Project ID** que usaste en el deploy.
- `DEPLOY_REGION` — la **región del deploy** que mostró `agents-cli deploy` (por ejemplo `us-east1`, no `global`).
- `TU_REASONING_ENGINE_ID` — el ID numérico del Reasoning Engine que mostró `agents-cli deploy` al terminar (por ejemplo `1234567890123456789`).

## 2. Crea una sesión

Antes de enviar mensajes, crea una sesión con `async_create_session`. Elige un `user_id` y un `session_id` propios (pueden ser cualquier string; úsalos igual en los siguientes pasos):

```bash
curl --location "https://${DEPLOY_REGION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${DEPLOY_REGION}/reasoningEngines/${ENGINE_ID}:query" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${ACCESS_TOKEN}" \
  --data '{
    "class_method": "async_create_session",
    "input": {
      "user_id": "u_123",
      "session_id": "mysession123"
    }
  }'
```

Si la respuesta es `200 OK`, la sesión quedó creada. Si cambias `session_id`, repite este paso antes de mandar mensajes.

## 3. Envía mensajes (streaming)

Con la sesión activa, usa `async_stream_query` contra el endpoint de **streaming** (`streamQuery?alt=sse`). La respuesta llega en eventos SSE (Server-Sent Events):

```bash
curl --location "https://${DEPLOY_REGION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${DEPLOY_REGION}/reasoningEngines/${ENGINE_ID}:streamQuery?alt=sse" \
  --header "Authorization: Bearer ${ACCESS_TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "class_method": "async_stream_query",
    "input": {
      "user_id": "u_123",
      "session_id": "mysession123",
      "message": "Hola, ¿cómo estás?"
    }
  }'
```

Deberías ver fragmentos de la respuesta del agente en la terminal. Prueba preguntas que usen tus tools (clima, productos, etc.) para comprobar que el despliegue conserva el comportamiento del playground.

## 4. Errores frecuentes

| Error | Qué revisar |
|-------|-------------|
| `401 Unauthorized` | Token expirado → `gcloud auth print-access-token` de nuevo. |
| `404 Not Found` | `PROJECT_ID`, `DEPLOY_REGION` o `ENGINE_ID` incorrectos. |
| Sesión no encontrada | Creaste la sesión con otro `session_id` o no ejecutaste el paso 2. |
| Permisos denegados | La cuenta de `gcloud` necesita roles de Vertex AI en el proyecto (paso 10). |

Con esto ya tienes un flujo mínimo para probar el agente desde cualquier cliente HTTP. El token de usuario caduca pronto y no sirve para microservicios en producción. En el **siguiente paso** verás cómo integrarlo con **Service Account**, ADC y un cliente en **Python** sin depender de `gcloud`.
