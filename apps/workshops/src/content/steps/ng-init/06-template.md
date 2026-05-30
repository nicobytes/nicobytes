---
title: Tu primera plantilla
author: Angular Bolivia
description: Aprenderemos a crear nuestra primera plantilla HTML en Angular para construir la interfaz de nuestra aplicación.
order: 6
nextStep: '07-signal'
prevStep: '05-html'
---

# ¡Tu primera plantilla HTML en Angular!

> En este paso, aprenderemos a crear la estructura básica de nuestra aplicación usando HTML. Las plantillas en Angular son archivos HTML que nos permiten definir cómo se verá nuestra aplicación.

---

## Paso #1: Creando el formulario de gastos

Ahora vamos a crear un formulario simple para que los usuarios puedan ingresar sus gastos. Para esto, necesitamos copiar el siguiente código HTML y pegarlo en el archivo `main.ts`, específicamente dentro de la propiedad `template`:

```html
<div class="contenedor-principal">
  <div class="form gasto">
    <h3>Agrega tus gastos aquí</h3>
    <div>
      <label for="nombre-gasto">Nombre:</label>
      <input id="nombre-gasto" type="text" />
    </div>
    <div>
      <label for="cantidad-gasto">Cantidad:</label>
      <input id="cantidad-gasto" type="number" />
    </div>
  </div>
</div>
```

Este código HTML crea:

- Un contenedor principal que agrupa todo nuestro contenido
- Un formulario con un título
- Dos campos de entrada:
  - Un campo de texto para el nombre del gasto
  - Un campo numérico para la cantidad del gasto

Cuando copies este código, deberías ver algo como esto en tu pantalla:

![Página principal de Stackblitz](/images/tutorial/template-1.png)
