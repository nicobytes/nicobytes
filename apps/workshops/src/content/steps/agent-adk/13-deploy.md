---
title: 'Despliega tu agente en Google Cloud'
titleStep: 'Despliegue'
description: 'Publica el agente en GCP con agents-cli deploy y anota el Reasoning Engine ID y la región del deploy.'
order: 13
prevStep: '12-config'
nextStep: '14-consume'
---

En el paso anterior dejaste **Vertex AI configurado** en `.env`, limpiaste `app/agent.py` y comprobaste el agente en el **playground**. Ahora lo publicas en tu proyecto de GCP con `agents-cli deploy`.

## 1. Despliega el agente

Desde la raíz del proyecto, indica el **mismo Project ID** que anotaste en el paso 10 y que tienes en `.env` (`GOOGLE_CLOUD_PROJECT`):

```bash
agents-cli deploy --project TU_PROJECT_ID
```

Sustituye `TU_PROJECT_ID` por tu Project ID real.

> **⏱ La primera vez tarda:** crear el agente en **Agent Runtime** suele llevar **entre 5 y 10 minutos** (empaquetado del código, imagen, reasoning engine, etc.). Es normal que la terminal parezca “quieto” un rato. **No cierres la terminal** hasta ver `✅ Deployment successful!` o un mensaje claro de error.

El comando prepara la infraestructura en ese proyecto de GCP (según la plantilla del proyecto) y publica el agente.

> **Importante:** El despliegue crea y usa recursos facturables en Google Cloud. Revisa que la **facturación** esté activa en el proyecto y que entiendas los costos asociados a Agent Runtime.

Si el comando se interrumpe (timeout, cierre de terminal, etc.), el despliegue puede seguir en segundo plano en GCP. Comprueba el estado con:

```bash
agents-cli deploy --status
```

(o la opción equivalente de tu versión del CLI).

### Salida esperada si todo salió bien

Al final deberías ver algo parecido a esto (los IDs y rutas serán los tuyos):

```text
Using project root directory: /ruta/a/my-first-agent
  📦 Auto-generated requirements: app/app_utils/.requirements.txt

    ╔═══════════════════════════════════════════════════════════╗
    ║   🤖 DEPLOYING AGENT TO VERTEX AI AGENT ENGINE 🤖         ║
    ╚═══════════════════════════════════════════════════════════╝

📋 Deployment Parameters:
  Project: my-workshop-project
  Location: us-east1
  Display Name: my-first-agent
  ...

🚀 Creating agent: my-first-agent (this can take 5-10 minutes)...
   Operation: projects/.../locations/us-east1/reasoningEngines/.../operations/...
   If this command is interrupted, run 'agents-cli deploy --status' to check progress.

✅ Deployment successful!
Agent Runtime ID: projects/123456789012/locations/us-east1/reasoningEngines/1234567890123456789
Service Account: service-123456789012@gcp-sa-aiplatform-re.iam.gserviceaccount.com

📊 Open Console Playground: https://console.cloud.google.com/vertex-ai/agents/...
```

Anota el **Agent Runtime ID** (Reasoning Engine ID) y la **región del deploy** (`us-east1` u otra). Si aparece, guarda también el enlace al **Console Playground**; los usarás en el siguiente paso.

## 2. Comprueba el despliegue en la consola

Abre [Deployments on Agent Runtime](https://console.cloud.google.com/agent-platform/runtimes) y confirma que tu agente aparece en la tabla con el **Display Name** que definiste (por ejemplo `my-first-agent`), la **región** correcta y el framework **google-adk**:

![Listado de despliegues en Agent Runtime con el agente activo en la consola de Google Cloud](/images/adk/service.png)

Si ves tu fila en **Deployments on Agent Runtime**, el servicio ya está publicado. En el siguiente paso consumirás ese agente vía **REST API** con el Reasoning Engine ID y la región que anotaste.

Si el deploy falla por permisos o APIs, vuelve al paso 10 (proyecto y APIs habilitadas) y al paso 12 (autenticación y `.env` con el mismo Project ID).
