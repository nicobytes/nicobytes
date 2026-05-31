---
title: 'Agregando gastos'
titleStep: 'Agregando gastos'
description: ¡Genial! Ya aprendimos sobre Interpolation y cómo mostrar datos en nuestra aplicación. Ahora vamos a dar el siguiente paso, crear una función que nos permita guardar nuestros gastos de manera interactiva.
order: 9
prevStep: '08-ngmodel'
nextStep: '10-expenses-list'
---

> ¡Genial! Ya aprendimos sobre Interpolation y cómo mostrar datos en nuestra aplicación. Ahora vamos a dar el siguiente paso: crear una función que nos permita guardar nuestros gastos de manera interactiva.

---

## Paso #1: Creando nuestra lista de gastos

Primero, necesitamos un lugar donde guardar nuestros gastos. Para esto, en el archivo `main.ts`, vamos a crear un nuevo signal llamado `gastos` que será una lista donde guardaremos todos nuestros gastos:

```ts
export class App {
  nombreGasto = signal('chocolate');
  cantidadGasto = signal(10);
  gastos = signal([]); // Esta será nuestra lista de gastos
}
```

¿Te fijaste en algo especial? La variable `gastos` se crea de una forma un poco diferente:

```ts
gastos = signal([]);
```

Los corchetes `[]` indican que estamos creando una lista (también llamada **Array**). Una lista es como una caja donde podemos guardar muchos valores. Cuando queramos agregar un nuevo gasto a esta lista, usaremos este código:

```ts
gastos.update((values) => [...values, gasto]);
```

No te preocupes si esta sintaxis te parece un poco extraña al principio. Lo que hace es tomar todos los gastos que ya teníamos (representados por `...values`) y agregar uno nuevo al final (`gasto`).

## Paso #2: Creando una estructura para nuestros gastos

Para mantener nuestro código organizado, vamos a crear una `Class` que nos ayudará a manejar cada gasto de manera ordenada.

¿Qué es una clase? 🤔 Piensa en ella como un molde o una receta. Así como una receta de galletas te dice qué ingredientes necesitas, una clase nos dice qué información necesitamos para crear un gasto.

Vamos a crear un nuevo archivo llamado `gasto.ts` dentro de la carpeta `src` con el siguiente código:

```ts
export class Gasto {
  nombre: string;
  cantidad: number;

  constructor(nombreGasto: string, cantidadGasto: number) {
    this.nombre = nombreGasto;
    this.cantidad = cantidadGasto;
  }
}
```

Esta clase es como nuestro formulario para crear gastos. Cada vez que queramos crear un nuevo gasto, necesitaremos dos cosas:

- Un nombre (que será un texto)
- Una cantidad (que será un número)

Tu estructura de archivos debería verse así:

![Clase gasto](/images/tutorial/component-4.png)

## Paso #3: Creando la función para agregar gastos

Ahora vamos a crear una función que nos ayude a guardar cada gasto. Una función es como una receta que le dice a la computadora qué pasos debe seguir para realizar una tarea.

En el archivo `main.ts`, vamos a agregar nuestra función `agregarGasto`:

```ts
export class App {
  nombreGasto = signal('chocolate');
  cantidadGasto = signal(10);
  gastos = signal<Gasto[]>([]);

  agregarGasto(): void {
    const gasto = new Gasto(this.nombreGasto(), this.cantidadGasto());
    this.gastos.update((values) => [...values, gasto]);
    console.log(this.gastos());
  }
}
```

¡Importante! 📝 No olvides agregar esta línea al inicio del archivo para poder usar nuestra clase Gasto:

```ts
import { Gasto } from './gasto';
```

## Paso #4: Conectando nuestra función con la interfaz

Ahora necesitamos una forma de llamar a nuestra función cuando el usuario quiera agregar un gasto. En Angular, podemos hacer esto de varias formas:

- Cuando el usuario presione Enter en un campo
- Cuando haga clic en un botón

Vamos a actualizar nuestro HTML para agregar estas funcionalidades:

```html
<div>
  <label for="nombre-gasto">Nombre:</label>
  <input
    id="nombre-gasto"
    type="text"
    [(ngModel)]="nombreGasto"
    (keyup.enter)="agregarGasto()"
  />
</div>
<div>
  <label for="cantidad-gasto">Cantidad:</label>
  <input
    id="cantidad-gasto"
    type="number"
    [(ngModel)]="cantidadGasto"
    (keyup.enter)="agregarGasto()"
  />
</div>
<button (click)="agregarGasto()">Agregar Gasto</button>
```

Cuando escribimos `(keyup.enter)="agregarGasto()"`, le estamos diciendo a Angular: "Cuando el usuario presione la tecla Enter, ejecuta la función agregarGasto".

De manera similar, `(click)="agregarGasto()"` significa: "Cuando el usuario haga clic en el botón, ejecuta la función agregarGasto".

El resultado se verá así:

![Llamar a la función agregarGasto desde la plantilla](/images/tutorial/template-2.png)

## Paso #5: Mejorando la experiencia del usuario

Para hacer nuestra aplicación más fácil de usar, vamos a limpiar los campos después de agregar un gasto. Esto permitirá al usuario agregar un nuevo gasto más rápidamente.

Actualizamos nuestra función `agregarGasto` así:

```ts
agregarGasto(): void {
  const gasto = new Gasto(this.nombreGasto(), this.cantidadGasto());
  this.gastos.update(values => [...values, gasto]);
  console.log(this.gastos());

  this.nombreGasto.set('');
  this.cantidadGasto.set(0);
}
```

¡Y listo! 🎉 Ahora tienes una aplicación que puede guardar gastos de manera interactiva. En el siguiente paso, aprenderemos cómo mostrar todos estos gastos en pantalla.

## Paso #6: Mostrar el resultado en consola

Para verificar que nuestro código está funcionando, tenemos la siguiente linea de código:

```ts
console.log(this.gastos());
```

Esta linea de código nos permite imprimir el resultado de la lista de gastos en la consola del navegador.

![Resultado en consola](/images/tutorial/console.png)
