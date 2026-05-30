---
title: ngModel
author: Angular Bolivia
description: En este punto vamos a aprender el uso de ngModel para ingresar nuestros gastos.
order: 8
prevStep: '07-signal'
nextStep: '09-add-expenses'
---

# Usando ngModel

> Ahora aprenderemos sobre ngModel, una característica muy útil de Angular que nos ayuda a conectar lo que el usuario escribe en un formulario con nuestros signals. ¡Es como tener un asistente que toma nota de todo lo que escribimos!

---

## Paso #1: Conectando el formulario con nuestras signals

Hasta ahora, tenemos un formulario HTML y nuestras signals, pero necesitamos una forma de conectarlos. Aquí es donde entra `ngModel`, ¡una herramienta que hace exactamente eso!

### ¿Qué es ngModel y por qué lo necesitamos?

Imagina que tienes un formulario donde los usuarios escriben sus gastos. Necesitas una forma de:

1. Capturar lo que el usuario escribe
2. Guardar esa información en algún lugar
3. Mostrar esa información en la pantalla

`ngModel` hace todo esto por nosotros. Es como un puente que conecta nuestro formulario HTML con nuestras variables en TypeScript.

### ¿Cómo usamos ngModel?

Es muy sencillo. Solo necesitamos agregar `[(ngModel)]="nombreDelSignal"` en los campos de nuestro formulario donde queremos capturar información. Por ejemplo:

```html
<input id="nombre-gasto" type="text" [(ngModel)]="nombreGasto" />
```

```html
<input id="cantidad-gasto" type="number" [(ngModel)]="cantidadGasto" />
```

💡 **Dato curioso**: ¿Ves estos símbolos `[(` y `)]`? En la comunidad de Angular los llamamos "banana in a box" (banana en la caja) porque ¡parece una banana dentro de una caja! 🍌📦
Esta sintaxis especial es muy importante porque le dice a Angular que queremos una conexión en dos direcciones:

- Cuando escribimos en el formulario ➡️ se actualiza nuestra variable
- Cuando actualizamos nuestra variable ➡️ se actualiza el formulario

### ¿Por qué aparece un error en la terminal?

Si al usar ngModel ves un error como este en la terminal:

![Error con ngModel](/images/tutorial/component-1-error.png)

¡No te preocupes! Este error es muy común cuando empezamos a trabajar con formularios en Angular. La solución es simple y te explicamos paso a paso qué hacer:

1. Primero, necesitamos importar el módulo de formularios. Agrega esta línea al inicio de tu archivo:

```ts
import { FormsModule } from '@angular/forms';
```

2. Luego, le decimos a Angular que nuestro componente usará formularios. Agrega `FormsModule` en la sección de imports:

```ts
@Component({
  ...
  imports: [FormsModule],
  ...
})
```

Tu código debería verse así después de estos cambios:

![Agregando FormsModule](/images/tutorial/component-1-error-fix.png)

## Paso #3: ¡Veamos la magia en acción!

Después de implementar todos los cambios, tu componente debería verse así:

```typescript
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
    <div class="contenedor-principal">
      <div class="form gasto">
        <h3>Agrega tus gastos aquí</h3>
        <div>
          <label for="nombre-gasto">Nombre:</label>
          <input id="nombre-gasto" type="text" [(ngModel)]="nombreGasto" />
          <span>Valor actual: {{ nombreGasto() }}</span>
        </div>
        <div>
          <label for="cantidad-gasto">Cantidad:</label>
          <input
            id="cantidad-gasto"
            type="number"
            [(ngModel)]="cantidadGasto"
          />
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

> 💡 **¡Hora de probar!** Escribe algo en los campos del formulario y observa cómo los valores se actualizan instantáneamente en la pantalla. Esta es una de las características más poderosas de Angular: mantener todo sincronizado automáticamente sin que tengamos que escribir código adicional.
