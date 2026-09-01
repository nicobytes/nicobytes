---
title: '¡Gracias por completar el taller!'
titleStep: 'Gracias'
description: 'Resumen del recorrido: de cero a un agente con system prompt, function tools y pruebas en el playground local.'
order: 10
prevStep: '09-tool-api'
---

> ¡Felicitaciones! Has completado **Tu primer Agent con Google ADK**. Pasaste de una carpeta vacía a un agente funcional en local, con tools reales y listo para desplegar.

## Lo que construiste

Al terminar este taller tienes un agente funcional con:

- Un **system prompt** estructurado en `prompt.md`, separado del código
- **Function tools** en Python: clima simulado (`get_weather`) y consulta a una API HTTP (`get_products`)
- Pruebas en **playground local** con API key de AI Studio

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

## ¿Qué sigue?

¿Listo para llevar tu agente a producción? Continúa con el taller **[Despliegue tu Agent](/agent-adk-deploy/01-google-project)**: configura Google Cloud, publica en Agent Runtime y consúmelo vía REST API desde microservicios.

También puedes explorar:

1. **Documentación de ADK** — Profundiza en orquestación, callbacks, evaluación y más tools en [adk.dev](https://adk.dev/).
2. **Más tools** — Añade una tool que escriba en una base de datos o conecte RAG con tus propios documentos.
3. **Evaluación** — Antes de escalar tráfico, define evalsets y métricas con `agents-cli eval`.

---

**¡Gracias de nuevo y mucho éxito con tus agentes!**
