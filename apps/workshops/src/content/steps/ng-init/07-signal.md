---
title: Signals
titleStep: Signals
description: Signals es un sistema que permite a Angular rastrear cómo y dónde se utiliza el estado en una aplicación, permitiendo al framework optimizar las actualizaciones de renderizado.
order: 7
prevStep: '06-template'
nextStep: '08-ngmodel'
---

Los Signals son una característica moderna y emocionante de Angular que nos ayuda a manejar los datos de nuestra aplicación de una forma más inteligente. Imagina que tienes una caja mágica (el Signal) que no solo guarda información, sino que también le avisa automáticamente a Angular cuando esa información cambia. ¡Es como tener un asistente personal que siempre mantiene todo actualizado!

## Paso #1: Creando nuestro primer Signal

Para comenzar a usar Signals en nuestro componente, necesitamos seguir dos pasos muy sencillos:

1. Primero, importamos `signal` desde `@angular/core`. Esta es la herramienta que Angular nos proporciona para crear nuestros Signals.
2. Luego, creamos nuestras variables especiales usando `signal()`.

Veamos un ejemplo práctico:

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `...`,
})
export class App {
  nombreGasto = signal('valor inicial');
  cantidadGasto = signal(1000);
}
```

## Paso #2: Mostrando los valores de nuestros Signals

Una de las cosas más geniales de Angular es que podemos mostrar nuestras variables directamente en la página web usando algo llamado Interpolación. Es muy fácil de usar y funciona como una ventana mágica que muestra el contenido de nuestras variables.

Para mostrar un Signal en nuestro HTML, usamos dobles llaves `{{ }}` y llamamos al Signal como si fuera una función `()`. Los paréntesis son importantes porque le dicen a Angular "¡hey, quiero ver el valor actual de este Signal!".

```html
<span>Valor actual: {{ nombreGasto() }}</span>
<span>Valor actual: {{ cantidadGasto() }}</span>
```

Ahora, veamos cómo se ve todo junto en un formulario bonito para agregar gastos:

```html
<div class="contenedor-principal">
  <div class="form gasto">
    <h3>Agrega tus gastos aquí</h3>
    <div>
      <label for="nombre-gasto">Nombre:</label>
      <input id="nombre-gasto" type="text" />
      <span>Valor actual: {{ nombreGasto() }}</span>
    </div>
    <div>
      <label for="cantidad-gasto">Cantidad:</label>
      <input id="cantidad-gasto" type="number" />
      <span>Valor actual: {{ cantidadGasto() }}</span>
    </div>
  </div>
</div>
```

## Paso #3: ¡Todo junto! El componente completo

Aquí tienes el código completo del componente. No te preocupes si parece mucho código, lo hemos construido paso a paso y cada parte tiene su propósito:

```typescript
import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <div class="contenedor-principal">
      <div class="form gasto">
        <h3>Agrega tus gastos aquí</h3>
        <div>
          <label for="nombre-gasto">Nombre:</label>
          <input id="nombre-gasto" type="text" />
          <span>Valor actual: {{ nombreGasto() }}</span>
        </div>
        <div>
          <label for="cantidad-gasto">Cantidad:</label>
          <input id="cantidad-gasto" type="number" />
          <span>Valor actual: {{ cantidadGasto() }}</span>
        </div>
      </div>
    </div>
  `,
})
export class App {
  nombreGasto = signal('valor inicial');
  cantidadGasto = signal(1000);
}

bootstrapApplication(App);
```

¡Felicitaciones! 🎊 Has creado tu primer componente usando Signals. En el próximo tutorial, aprenderemos algo aún más emocionante: ¡cómo actualizar los valores de nuestros Signals cuando el usuario escriba en los campos de entrada! Esto hará que nuestra aplicación sea verdaderamente interactiva.
