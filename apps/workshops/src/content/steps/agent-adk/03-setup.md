---
title: 'Configura tu entorno de desarrollo'
titleStep: Entorno
description: 'Instala Python, uv y el CLI de Google Agents en tu máquina local para construir agentes con ADK.'
order: 3
prevStep: '02-arquitect'
nextStep: '04-create-project'
---

En este paso preparas tu máquina local con las herramientas base del codelab: **Python**, **uv** y el **CLI de Google Agents**. Al terminar, podrás crear y ejecutar el proyecto del agente en el siguiente paso.

## Requisitos

- **Python 3.13** (o la versión que indique el taller)
- **[uv](https://docs.astral.sh/uv/)** para instalar paquetes y gestionar el entorno virtual del proyecto

Usamos **uv** porque es rápido, unifica dependencias y entornos virtuales, y evita pelear con `pip` y `venv` por separado.

![Terminal mostrando la salida del comando uv --version](/images/adk/uv-screenshot.png)

## 1. Comprueba Python

En tu terminal:

```bash
python3 --version
```

Deberías ver **Python 3.13.x** (o la versión mínima indicada en el taller). Si no lo tienes instalado, descárgalo desde [python.org](https://www.python.org/downloads/) o usa el gestor de paquetes de tu sistema operativo.

## 2. Comprueba si ya tienes uv

```bash
uv --version
```

Si ves un número de versión, salta al apartado 3.

## 3. Instala uv (si hace falta)

**macOS y Linux:**

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows** (PowerShell):

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Reinicia la terminal y vuelve a ejecutar `uv --version` para confirmar la instalación. Más opciones en la [documentación oficial de uv](https://docs.astral.sh/uv/getting-started/installation/).

## 4. Instala el CLI de Google Agents

Con `uvx` descargas y ejecutas el instalador del CLI sin instalarlo de forma global:

```bash
uvx google-agents-cli setup
```

Valida que quedó disponible:

```bash
agents-cli info
```

Si el comando muestra la ruta de instalación y la versión del CLI, el entorno local está listo. En el siguiente paso crearás el proyecto del agente con `agents-cli create`.

> **Fun Fact:** [uv](https://docs.astral.sh/uv/) y [Bun](https://bun.sh/) son herramientas muy usadas en el ecosistema de agentes de IA. Recientemente, [Astral anunció una colaboración con OpenAI](https://astral.sh/blog/openai) y [Bun se unió a Anthropic](https://bun.com/blog/bun-joins-anthropic).
