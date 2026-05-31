---
title: 'Crea tu proyecto en Google Cloud'
titleStep: 'Proyecto GCP'
description: 'Crea un proyecto en Google Cloud, activa la facturación y habilita las APIs de Agent Runtime.'
order: 10
prevStep: '09-tool-api'
nextStep: '11-gcloud-cli'
---

Hasta ahora el agente corre en local con una **API key de AI Studio** (paso 5). Para **desplegar** en Google Cloud necesitas un **proyecto de GCP**: el contenedor de recursos, facturación y permisos donde vivirá el agente en la nube.

En este paso crearás (o elegirás) ese proyecto y habilitarás las APIs de **Agent Runtime**. En el siguiente paso instalarás **gcloud CLI** para autenticarte y conectar tu máquina con GCP.

## 1. Crea (o elige) un proyecto en Google Cloud

Necesitas un **proyecto de GCP** donde desplegar el agente.

1. Entra en [Google Cloud Console](https://console.cloud.google.com/).
2. En el selector de proyectos (arriba), elige **New Project** / **Nuevo proyecto**.
3. Asigna un **nombre** (por ejemplo `Demo`) y revisa el **Project ID** generado — no se puede cambiar después.
4. Si tu cuenta pertenece a una organización, elige la correcta en **Organization**; en cuentas personales suele quedar vacío.
5. Pulsa **Create**.

![Pantalla de Google Cloud Console para crear un nuevo proyecto](/images/adk/google-project.png)

Anota el **Project ID** (no el nombre): lo usarás en `gcloud init`, en variables de entorno y al ejecutar `agents-cli deploy`.

> **Nota:** El despliegue consume recursos de GCP. Es **normal** que Google Cloud te pida configurar una **cuenta de facturación** asociada al proyecto — al crearlo o al habilitar las APIs. Completa ese paso para activar la facturación antes de continuar. Si ya configuraste `GOOGLE_CLOUD_PROJECT` en tu `.env` (paso 5), puedes reutilizar ese mismo proyecto siempre que tenga los permisos necesarios.

## 2. Habilita las APIs de Agent Runtime

Con el proyecto creado y seleccionado en la consola, debes activar las APIs que usa **Agent Runtime** antes de desplegar.

1. Abre [Deployments on Agent Runtime](https://console.cloud.google.com/agent-platform/runtimes) en Google Cloud Console.
2. Confirma que el **Project ID** correcto aparece en el selector de proyectos (arriba).
3. Si la plataforma aún no está lista, verás el aviso *"Agent Platform API has not been enabled"* y un modal **Enable required APIs**.
4. Revisa la lista de APIs pendientes (Agent Platform API, Agent Registry API, Compute Engine API, IAM, etc.) y pulsa **Enable**.

![Modal para habilitar las APIs requeridas de Agent Platform](/images/adk/enable.png)

La activación puede tardar unos minutos. Cuando termine, la página de **Deployments on Agent Runtime** quedará disponible y podrás continuar con la instalación de **gcloud CLI** en el siguiente paso.
