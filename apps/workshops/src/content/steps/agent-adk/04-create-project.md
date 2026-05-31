---
title: 'Crea tu primer proyecto de agente'
titleStep: 'Crear proyecto'
description: 'Genera un proyecto ADK con agents-cli, instala dependencias y ejecuta el playground en local.'
order: 4
prevStep: '03-setup'
nextStep: '05-api-key'
---

Con el entorno listo, es momento de crear el proyecto del agente. En este paso usarás **agents-cli** para generar la estructura base, instalar dependencias y abrir el **playground** en tu máquina.

## 1. Crea el proyecto

Desde la carpeta donde quieras trabajar (por ejemplo, tu directorio de proyectos), ejecuta:

```bash
agents-cli create my-first-agent --prototype --yes -d agent_runtime
```

Ahora vamos a la carpeta del proyecto:

```bash
cd my-first-agent
```

Qué hace cada flag:

- **`--prototype` (`-p`)**: crea un proyecto mínimo **sin CI/CD ni infraestructura Terraform**. Ideal para empezar a codear y probar en local; más adelante puedes añadir despliegue con `agents-cli scaffold enhance`.
- **`--yes` (`-y`)**: modo no interactivo; omite prompts y usa los valores por defecto.
- **`-d agent_runtime`**: indica que el destino de despliegue será **Agent Runtime** (Gemini Enterprise Agent Platform). No genera la infraestructura completa en modo prototype, pero deja el proyecto orientado a ese target.

El CLI crea la carpeta `my-first-agent` por ti. No la crees manualmente antes de ejecutar el comando.

> **Nota:** Si prefieres el atajo del quickstart, `agents-cli create my-first-agent --adk` combina ADK + `agent_runtime` + `prototype` y también omite prompts.

## 2. Conoce la estructura del proyecto

Con `--prototype`, el árbol es más liviano que un proyecto con despliegue completo: tendrás el código del agente y la configuración base, pero **no** pipelines de CI/CD ni carpetas de Terraform. Al terminar, deberías ver algo como esto:

```bash
.
├── GEMINI.md
├── README.md
├── agents-cli-manifest.yaml
├── app
│   ├── __init__.py
│   ├── agent.py
│   ├── agent_runtime_app.py
│   └── app_utils
├── deployment_metadata.json
├── pyproject.toml
├── tests
│   ├── eval
│   ├── integration
│   └── unit
└── uv.lock
```

Los archivos más importantes para empezar:

- **`app/agent.py`**: define el agente (modelo, instrucciones y herramientas).
- **`app/agent_runtime_app.py`**: punto de entrada para ejecutar el agente en local y en producción.
- **`pyproject.toml`** y **`uv.lock`**: dependencias del proyecto gestionadas con uv.

## 3. Instala las dependencias

Dentro del directorio del proyecto:

```bash
agents-cli install
```

Este comando crea el entorno virtual con uv e instala las dependencias declaradas en `pyproject.toml`.

## 4. Ejecuta el playground

Con las dependencias instaladas, lanza la interfaz de prueba:

```bash
agents-cli playground
```

Se abrirá una sesión interactiva en el navegador para chatear con tu agente en local.

### Error esperado al primer arranque

Es normal que la primera ejecución falle con un error de autenticación similar a este:

![Terminal mostrando un RefreshError de Google Auth al ejecutar agents-cli playground](/images/adk/gcloud-auth.png)

Por defecto, ADK intenta usar **Vertex AI** y espera credenciales de Google Cloud Application Default Credentials (ADC). Si aún no las tienes configuradas, verás un mensaje como:

```text
google.auth.exceptions.RefreshError: Reauthentication is needed.
Please run 'gcloud auth application-default login' to reauthenticate.
```

Para resolverlo con Vertex AI, autentícate con:

```bash
gcloud auth application-default login
```

En este taller **vamos a omitir ese flujo por ahora**. En el siguiente paso configurarás una **API key de Google AI Studio** para que el agente funcione en local sin depender de Vertex AI.
