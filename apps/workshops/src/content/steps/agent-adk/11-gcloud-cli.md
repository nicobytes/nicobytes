---
title: 'Instala y configura gcloud CLI'
titleStep: 'gcloud CLI'
description: 'Instala el Google Cloud CLI, inicia sesión y deja listas las credenciales para desplegar tu agente en GCP.'
order: 11
prevStep: '10-google-project'
nextStep: '12-config'
---

En el paso anterior creaste tu **proyecto de GCP** y habilitaste las APIs de Agent Runtime. Ahora instalarás el **Google Cloud CLI** (`gcloud`): autenticarte, elegir el proyecto y dejar credenciales listas para herramientas como `agents-cli deploy`.

En el paso 4 viste un error que pedía `gcloud auth application-default login`. Lo omitimos a propósito; ahora sí lo configurarás.

## 1. Comprueba si ya tienes gcloud

En tu terminal:

```bash
gcloud --version
```

Si ves la versión del SDK y de `bq`, `gsutil`, etc., salta al apartado 3.

## 2. Instala el CLI

### macOS (Apple Silicon)

```bash
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-darwin-arm.tar.gz
tar -xf google-cloud-cli-darwin-arm.tar.gz
./google-cloud-sdk/install.sh
```

Reinicia la terminal o ejecuta:

```bash
source ~/.zshrc
```

### macOS (Intel) y Linux

Instalador interactivo (detecta la arquitectura en macOS y Linux):

```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

En **macOS con Intel**, si prefieres el paquete manual, descarga `google-cloud-cli-darwin-x86_64.tar.gz` desde la [página de descargas](https://cloud.google.com/sdk/docs/install-sdk) y sigue los mismos pasos `tar` + `install.sh` del apartado anterior.

### Windows (PowerShell)

```powershell
(New-Object Net.WebClient).DownloadFile(
  "https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe",
  "$env:Temp\GoogleCloudSDKInstaller.exe"
)
& $env:Temp\GoogleCloudSDKInstaller.exe
```

Cierra y vuelve a abrir PowerShell o CMD tras la instalación.

> **Documentación completa:** [Instalar el Google Cloud CLI](https://cloud.google.com/sdk/docs/install-sdk)

## 3. Inicializa gcloud

```bash
gcloud init
```

El asistente te guiará para:

1. **Iniciar sesión** con tu cuenta de Google (la misma que usaste al crear el proyecto).
2. **Elegir el proyecto** que creaste en el paso 10 (por su Project ID).

## 4. Verifica tus cuentas

Comprueba con qué cuenta de Google has iniciado sesión en el CLI:

```bash
gcloud auth list
```

Verás algo parecido a esto:

```text
Credentialed Accounts
ACTIVE  ACCOUNT
*       tu-correo@gmail.com
```

- La columna **`ACTIVE`** marca la cuenta que `gcloud` usa por defecto (el asterisco `*`).
- Si tienes varias cuentas, cambia la activa con:

```bash
gcloud config set account tu-correo@gmail.com
```

Si la lista está vacía o la cuenta no es la correcta, vuelve a ejecutar `gcloud init` o `gcloud auth login`.

## 5. Verifica la configuración del proyecto

```bash
gcloud config list
```

Comprueba que `project` y `region` (o `compute/region`) apuntan al proyecto y la zona que quieres usar para el despliegue.

## 6. Credenciales ADC

Para que ADK, `agents-cli` y las librerías de Google usen credenciales de aplicación (ADC), ejecuta:

```bash
gcloud auth application-default login
```

Inicia sesión con la misma cuenta de Google que usaste al crear el proyecto. Este comando es el que el playground pedía en el paso 4; lo configurarás de forma explícita en el paso 12 junto con Vertex AI.

Con `gcloud` instalado, autenticado y ADC listas, continúa con la **configuración de Vertex AI** en `.env` en el siguiente paso.
