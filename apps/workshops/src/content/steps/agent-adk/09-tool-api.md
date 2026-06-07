---
title: 'Tool que llama a una API'
titleStep: 'API externa'
description: 'Instala requests, define una function tool que consulta una API HTTP y regístrala junto a get_weather en el agente.'
order: 9
prevStep: '08-tools'
nextStep: '10-google-project'
---

En el paso anterior `get_weather` devolvía datos simulados. Ahora vas a crear una tool que **llama a una API real** por HTTP y devuelve solo lo que el agente necesita.

Usaremos la [Platzi Fake Store API](https://api.escuelajs.co/docs) para listar productos de una tienda ficticia.

![Platzi Fake API](/images/adk/fakeapi.png)

> **Nota:** Esta API es pública y no requiere API key. En producción usarías variables de entorno para URLs y credenciales, y manejarías errores de red con mensajes claros para el usuario.

## 1. Instala `requests`

Dentro del directorio del proyecto:

```bash
uv add requests
```

Eso añade la dependencia a `pyproject.toml` y la instala en el entorno virtual. En `app/agent.py`, importa el módulo al inicio del archivo:

```python
import requests
```

## 2. Define `get_products`

Añade la función **antes** de crear el agente (junto a `get_weather`):

```python
def get_products():
    """
    Retrieves the list of products from the Platzi Fake Store API.

    Returns:
        A list of products with title and price only.
    """
    url = "https://api.escuelajs.co/api/v1/products"
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    products = response.json()
    return [{"title": product["title"], "price": product["price"]} for product in products]
```

Qué hace cada parte:

- **`requests.get(..., timeout=10)`**: petición GET con límite de tiempo para no bloquear el agente si la API no responde.
- **`raise_for_status()`**: si la API devuelve 4xx o 5xx, lanza una excepción en lugar de devolver basura al modelo.
- **La lista por comprensión**: el JSON trae muchos campos; solo devuelves `title` y `price` para ahorrar tokens y mantener la respuesta enfocada.

No tiene parámetros: el modelo la invoca sin argumentos cuando el usuario pide ver productos o precios.

## 3. Regístrala en el agente

Pasa **ambas** tools en `tools=[...]`:

```python
root_agent = Agent(
    name="root_agent",
    model=Gemini(
        model="gemini-flash-latest",
        retry_options=types.HttpRetryOptions(attempts=3),
    ),
    instruction=instruction_text,
    tools=[get_weather, get_products],
)
```

ADK expone las dos function tools al modelo; elegirá cuál usar según la pregunta del usuario.

## 4. Actualiza `prompt.md`

En la sección `## Rules`, deja las reglas del clima y añade la de productos:

````markdown
## Rules

- No uses emojis.
- Usa la herramienta `get_weather` para obtener el clima de la ciudad que el usuario te pida.
- Usa la herramienta `get_products` para obtener los productos de la tienda.
````

Sin la regla de `get_products`, el modelo podría inventar precios en lugar de llamar a la API.

## 5. Prueba

```bash
agents-cli playground
```


![ADK Dev UI con la respuesta del agente tras invocar get_products](/images/adk/products.png)


Prueba ambos caminos:

- *«¿Qué clima hace en Barcelona?»* → debería invocar `get_weather`.
- *«¿Qué productos hay en la tienda?»* o *«Muéstrame precios de la tienda»* → debería invocar `get_products` y resumir títulos y precios como pirata.

Con el agente funcionando en local con tools reales, el siguiente bloque del taller es **desplegarlo en Google Cloud**. El primer paso es crear tu **proyecto en Google Cloud** y habilitar las APIs necesarias.
