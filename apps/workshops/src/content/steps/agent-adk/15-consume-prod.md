---
title: 'Consume tu agente desde microservicios'
titleStep: 'Microservicios'
description: 'Integra el agente desplegado con Service Account o ADC usando un cliente HTTP en Python.'
order: 15
prevStep: '14-consume'
nextStep: '16-thank-you'
---

En el paso anterior probaste el agente con un **access token de usuario** (`gcloud auth print-access-token`). Eso sirve para depurar, pero caduca en ~1 hora y no encaja en un microservicio que corre 24/7.

Aquí usas la **misma REST API** del paso 14, pero con autenticación de **Service Account** o **Application Default Credentials (ADC)**. La librería `google-auth` renueva el token por ti; no hace falta ejecutar `gcloud` en cada petición.

> **Nota:** Tu microservicio **no** ejecuta el agente localmente. Solo llama al Reasoning Engine remoto por HTTP.

> **Importante:** Usa `AGENT_ENGINE_REGION` con la región del deploy (la misma `DEPLOY_REGION` del paso 14, p. ej. `us-east1`). No uses `GOOGLE_CLOUD_LOCATION=global` aquí: esa variable es solo para invocar Gemini en local (paso 12).

## 1. Prepara la identidad en GCP

1. En [IAM & Admin → Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts), crea una SA (por ejemplo `agent-client@TU_PROJECT_ID.iam.gserviceaccount.com`).
2. Asígnale el rol **Vertex AI User** (`roles/aiplatform.user`).
3. **Local o CI:** descarga una clave JSON y apúntala con `GOOGLE_APPLICATION_CREDENTIALS`.
4. **Cloud Run, GKE o Compute Engine:** adjunta la SA al servicio y usa ADC (sin clave JSON).

Configura las variables de entorno:

```bash
export GOOGLE_CLOUD_PROJECT=TU_PROJECT_ID
export AGENT_ENGINE_REGION=us-east1
export AGENT_ENGINE_ID=TU_REASONING_ENGINE_ID
export GOOGLE_APPLICATION_CREDENTIALS=/ruta/a/clave-sa.json   # solo local/CI
```

## 2. Cliente Python

Instala dependencias en tu microservicio:

```bash
pip install google-auth requests
```

Ejemplo completo: crear sesión y enviar un mensaje con streaming.

```python
import os

import google.auth
import google.auth.transport.requests
import requests

PROJECT_ID = os.environ["GOOGLE_CLOUD_PROJECT"]
# Región del Reasoning Engine (deploy), no GOOGLE_CLOUD_LOCATION=global del paso 12
REGION = os.environ["AGENT_ENGINE_REGION"]
ENGINE_ID = os.environ["AGENT_ENGINE_ID"]
USER_ID = "u_123"
SESSION_ID = "mysession123"

BASE_URL = (
    f"https://{REGION}-aiplatform.googleapis.com/v1/"
    f"projects/{PROJECT_ID}/locations/{REGION}/reasoningEngines/{ENGINE_ID}"
)


def get_access_token() -> str:
    credentials, _ = google.auth.default(
        scopes=["https://www.googleapis.com/auth/cloud-platform"]
    )
    auth_req = google.auth.transport.requests.Request()
    credentials.refresh(auth_req)
    return credentials.token


def call_agent(class_method: str, input_data: dict, *, stream: bool = False) -> requests.Response:
    headers = {
        "Authorization": f"Bearer {get_access_token()}",
        "Content-Type": "application/json",
    }
    body = {"class_method": class_method, "input": input_data}
    url = f"{BASE_URL}:streamQuery?alt=sse" if stream else f"{BASE_URL}:query"
    return requests.post(url, headers=headers, json=body, stream=stream)


def main():
    # 1. Crear sesión
    response = call_agent(
        "async_create_session",
        {"user_id": USER_ID, "session_id": SESSION_ID},
    )
    response.raise_for_status()
    print("Sesión creada")

    # 2. Enviar mensaje (streaming)
    stream_response = call_agent(
        "async_stream_query",
        {
            "user_id": USER_ID,
            "session_id": SESSION_ID,
            "message": "¿Qué tiempo hace en Madrid?",
        },
        stream=True,
    )
    stream_response.raise_for_status()

    print("Respuesta del agente:")
    for line in stream_response.iter_lines(decode_unicode=True):
        if line:
            print(line)


if __name__ == "__main__":
    main()
```

Prueba preguntas que usen tus tools (clima, productos, etc.) para confirmar que el agente remoto se comporta igual que en el playground.

## 3. Errores frecuentes

| Error | Qué revisar |
|-------|-------------|
| `401 Unauthorized` | Token inválido o SA mal configurada. Comprueba `GOOGLE_APPLICATION_CREDENTIALS` o que la SA esté adjunta al servicio. |
| `403 Forbidden` | La SA del **cliente** necesita `roles/aiplatform.user` en el proyecto. |
| `404 Not Found` | `GOOGLE_CLOUD_PROJECT`, `AGENT_ENGINE_REGION` o `AGENT_ENGINE_ID` incorrectos. |
| Sesión no encontrada | Usa el mismo `session_id` en create y query; ejecuta `async_create_session` antes del mensaje. |
| Credenciales no encontradas | Define `GOOGLE_APPLICATION_CREDENTIALS` en local/CI o adjunta SA en Cloud Run/GKE. |