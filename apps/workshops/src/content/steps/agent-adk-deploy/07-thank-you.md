---
title: '¡Gracias por completar el taller!'
titleStep: 'Gracias'
description: 'Resumen del recorrido de despliegue: de GCP a Agent Runtime e integración en producción con REST y microservicios.'
order: 7
prevStep: '06-consume-prod'
---

> ¡Felicitaciones! Has completado **Despliegue tu Agent**. Llevaste el agente que construiste en el taller anterior desde tu máquina local hasta **Agent Runtime** en la nube, con consumo REST e integración lista para microservicios.

## Lo que lograste

En este taller desplegaste e integraste tu agente con:

- Un **proyecto de Google Cloud** con facturación y APIs de Agent Runtime habilitadas
- **gcloud CLI** autenticado y credenciales ADC listas
- **Vertex AI** configurado en `.env` para probar el agente en local antes del deploy
- Un **despliegue en Agent Runtime** con `agents-cli deploy`
- **Consumo del agente** vía REST API: primero con token de usuario, después con **Service Account / ADC** desde Python

## Recorrido del taller

| Paso | Qué hiciste |
|------|-------------|
| **Proyecto GCP** | Creaste el proyecto, activaste facturación y las APIs de Agent Runtime |
| **gcloud CLI** | Instalaste y autenticaste el CLI de Google Cloud |
| **Vertex AI** | Alineaste `agents-cli`, `gcloud` y `.env` para Vertex AI en local |
| **Despliegue** | Publicaste el agente en Agent Runtime y guardaste el Reasoning Engine ID |
| **Prueba REST** | Probaste `async_create_session` y `async_stream_query` con `curl` |
| **Microservicios** | Integraste el agente con SA/ADC desde Python |

## ¿Qué sigue?

El viaje no termina aquí. Algunas ideas para seguir:

1. **Documentación de ADK** — Profundiza en orquestación, callbacks, evaluación y más tools en [adk.dev](https://adk.dev/).
2. **Agent Engine** — Gestiona acceso, sesiones y observabilidad en la [consola de Vertex AI](https://console.cloud.google.com/vertex-ai/agents/agent-engines).
3. **Evaluación** — Antes de escalar tráfico, define evalsets y métricas con `agents-cli eval`.
4. **Observabilidad** — Trazas, logs y analytics para entender qué hace tu agente en producción.
5. **Skills dinámicas** — Cuando tu agente crezca en capacidades, explora cargar skills en runtime.

¿Quieres ir más lejos con el mismo proyecto? Prueba añadir una tool que escriba en una base de datos, conectar RAG con tus propios documentos, o publicar el agente en Gemini Enterprise.

---

**¡Gracias de nuevo y mucho éxito con tus agentes!**
