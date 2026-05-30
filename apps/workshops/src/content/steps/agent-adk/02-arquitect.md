---
title: 'Arquitectura de agentes con Google ADK'
titleStep: 'Arquitectura'
description: 'Mapa rápido de la plataforma de agentes de Google y qué piezas tocaremos en este taller.'
order: 2
prevStep: '01-welcome'
nextStep: '03-setup'
---

Antes de instalar herramientas, mira el mapa de la plataforma. En el taller lo recorreremos juntos; aquí tienes la referencia visual.

![Arquitectura de la plataforma de agentes de Google](/images/adk/platform.png)

## Las piezas del diagrama

- **Usuario y Client** — quien pregunta y la interfaz (playground, app web, Gemini Enterprise).
- **Deployment** — donde corre el agente: **Agent Runtime**, Cloud Run o GKE.
- **Agent Orchestration** — la lógica con [ADK](https://adk.dev/): instrucciones, tools y orquestación.
- **LLMs** — modelos como **Gemini** (Model Garden / AI Studio).
- **Evaluation** — pruebas de calidad antes de producción.
- **IaC, CI/CD, Observabilidad y Data** — despliegue, trazas, métricas y datos (RAG, vector store).

## En este taller

- ADK + system prompt + skills dinámicas
- Playground local con API key de AI Studio
- Despliegue orientado a **Agent Runtime**

El resto del diagrama queda como contexto para cuando escales a producción.

En el siguiente paso instalas **Python**, **uv** y **agents-cli**.
