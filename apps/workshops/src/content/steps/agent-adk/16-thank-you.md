---
title: '¡Gracias por completar el taller!'
titleStep: 'Gracias'
description: 'Resumen del recorrido completo: de cero a un agente desplegado en Agent Runtime e integrado en producción.'
order: 16
prevStep: '15-consume-prod'
---

> ¡Felicitaciones! Has completado **Tu primer Agent con Google ADK**. Pasaste de una carpeta vacía a un agente desplegado en la nube, con tools reales e integración lista para microservicios.

## Lo que construiste

Al terminar este taller tienes un agente funcional con:

- Un **system prompt** estructurado en `prompt.md`, separado del código
- **Function tools** en Python: clima simulado (`get_weather`) y consulta a una API HTTP (`get_products`)
- Pruebas en **playground local** con API key de AI Studio y, más adelante, con **Vertex AI**
- Un **despliegue en Agent Runtime** con `agents-cli deploy`
- **Consumo del agente** vía REST API: primero con token de usuario, después con **Service Account / ADC** desde Python

## Recorrido del taller

| Paso | Qué hiciste |
|------|-------------|
| **Bienvenida** | Conociste el objetivo del codelab y los requisitos |
| **Arquitectura** | Viste el mapa de la plataforma: ADK, Gemini, Agent Runtime |
| **Entorno** | Instalaste Python, `uv` y `agents-cli` |
| **Crear proyecto** | Generaste el scaffold con `agents-cli create` y abriste el playground |
| **API key** | Configuraste AI Studio para ejecutar el agente en local |
| **Google ADK** | Exploraste `app/agent.py` y el rol de `Agent`, `Gemini` e `instruction` |
| **System prompt** | Moviste las instrucciones a `prompt.md` con rol, reglas y workflow |
| **Herramientas** | Añadiste `get_weather` como function tool |
| **API externa** | Conectaste `get_products` a la Platzi Fake Store API con `requests` |
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
