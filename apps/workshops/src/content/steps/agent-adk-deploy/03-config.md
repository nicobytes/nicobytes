---
title: 'Configura Vertex AI en tu proyecto'
titleStep: 'Vertex AI'
description: 'Autentica con agents-cli, alinea gcloud y prepara .env para usar Vertex AI en local antes del despliegue.'
order: 3
prevStep: '02-gcloud-cli'
nextStep: '04-deploy'
---

En el paso anterior dejaste **`gcloud` instalado**, con sesión iniciada y el **Project ID** correcto. Ahora pasas de desarrollo local con **API key de AI Studio** (taller anterior) a un entorno listo para **Vertex AI**: autenticación, variables de entorno y una prueba en el playground antes de desplegar en el siguiente paso.

## 1. Verifica la autenticación

Para que ADK y `agents-cli` puedan hablar con Google Cloud, comprueba que las credenciales por defecto de la aplicación (ADC) están activas:

```bash
cd my-first-agent
agents-cli login -i
```

Deberías ver algo parecido a esto:

```text
Authentication

  Authenticated as tu-correo@gmail.com for project tu-project-id (Application Default Credentials)
```

Sustituye `tu-correo@gmail.com` y `tu-project-id` por tu cuenta y el **Project ID** que anotaste en el paso 1.

> **Nota:** La API key de AI Studio sigue sirviendo para iterar en local si la mantienes en `.env`. Cuando uses Vertex (`GOOGLE_GENAI_USE_VERTEXAI=True`), el agente usará las credenciales de `gcloud` y la configuración del proyecto.

## 2. Confirma el proyecto en gcloud

Asegúrate de que el CLI apunta al mismo proyecto que usarás con Vertex:

```bash
gcloud config set project TU_PROJECT_ID
```

Es habitual que `gcloud` muestre un **WARNING** indicando que el proyecto activo no coincide con el **quota project** de tus Application Default Credentials (ADC). Si lo ves, alinea también el proyecto de cuota con el mismo Project ID:

```text
WARNING: Your active project does not match the quota project in your local Application Default Credentials file. This might result in unexpected quota issues.

To update your Application Default Credentials quota project, use the `gcloud auth application-default set-quota-project` command.
Updated property [core/project].
```

Ejecuta el comando que sugiere el aviso (sustituye por tu Project ID):

```bash
gcloud auth application-default set-quota-project TU_PROJECT_ID
```

Puede aparecer además un mensaje sobre etiquetar el entorno (`[environment: untagged]`); no bloquea el taller.

Comprueba la configuración con `gcloud config list` si hace falta.

## 3. Actualiza el archivo `.env`

En la raíz del proyecto (junto a `pyproject.toml`), ajusta `.env` para que el agente use **Vertex AI** en lugar de la API de AI Studio:

```env
GOOGLE_API_KEY=----------
GOOGLE_CLOUD_PROJECT=tu-project-id
GOOGLE_CLOUD_LOCATION=global
GOOGLE_GENAI_USE_VERTEXAI=True
```

- **`GOOGLE_CLOUD_PROJECT`**: el mismo Project ID del paso 1.
- **`GOOGLE_CLOUD_LOCATION`**: indica **dónde se invocan los modelos Gemini** en Vertex AI, no dónde se despliega tu app Python.
- **`GOOGLE_GENAI_USE_VERTEXAI=True`**: indica al SDK que use Vertex AI con las credenciales de GCP.

### Modelos vs región de despliegue

Son dos cosas distintas:

| Concepto | Qué configura | Ejemplo |
| --- | --- | --- |
| **Ubicación del modelo** (`GOOGLE_CLOUD_LOCATION`) | El endpoint de Vertex AI desde el que el agente **llama al LLM** | `global` |
| **Región del servicio** | Dónde corre tu **app Python** en GCP (Cloud Run, Agent Runtime, etc.) | `us-central1`, `us-east1`, … |

Usa **`GOOGLE_CLOUD_LOCATION=global`** porque los modelos más recientes de Gemini (previews y versiones nuevas) solo están disponibles en el endpoint **global**. Si pones una región concreta como `us-east1`, el agente puede fallar al invocar un modelo que no existe en esa ubicación.

La región donde se despliega el contenedor o servicio la elige `agents-cli deploy` en el paso siguiente y **no tiene por qué coincidir** con `global`. Tu app puede correr en `us-central1` y, a la vez, llamar a Gemini por el endpoint global.

Consulta la [matriz de disponibilidad de modelos por región](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations?hl=es-419#united-states) en la documentación de Google Cloud. Verás que los modelos preview (por ejemplo Gemini 3.x) no tienen checkmarks en regiones como `us-central1` o `us-east1`, mientras que los modelos estables de la serie 2.5 sí aparecen en varias regiones de Estados Unidos:

![Disponibilidad de modelos Gemini por región en Estados Unidos](/images/adk/locations.jpeg)

Puedes dejar `GOOGLE_API_KEY` vacía o con un marcador si ya no la usas en este entorno; lo importante para Vertex son el proyecto, `GOOGLE_CLOUD_LOCATION=global` y `GOOGLE_GENAI_USE_VERTEXAI=True`.

## 4. Limpia `app/agent.py`

En el taller anterior comentaste un bloque que forzaba Vertex AI desde código. Con la configuración en `.env`, ese bloque sobra: **elimínalo por completo** (no lo descomentes).

El fragmento a quitar es este:

```python
import os
import google.auth

_, project_id = google.auth.default()
os.environ["GOOGLE_CLOUD_PROJECT"] = project_id
os.environ["GOOGLE_CLOUD_LOCATION"] = "global"
os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "True"
```

Si lo tenías entre comillas triples (`""" ... """`), borra todo el bloque, incluidas las comillas. Así el agente leerá solo las variables de `.env` y las credenciales de `gcloud`.

## 5. Prueba en local con Vertex

Antes de subir a la nube, valida que el agente arranca con la nueva configuración:

```bash
agents-cli playground
```

Abre el **ADK Dev UI** en el navegador y envía un mensaje de prueba. Si aparece un error de autenticación o de proyecto, revisa el apartado 1 y que `.env` coincida con tu Project ID y `GOOGLE_CLOUD_LOCATION=global`.

Cuando el playground responda bien, continúa con el **despliegue en Google Cloud** en el siguiente paso.
