---
title: Presupuesto
author: Angular Bolivia
description: Para controlar nuestros gastos es importante saber cuál es nuestro presupuesto y cuál sería nuestro saldo.
order: 11
prevStep: '10-expenses-list'
nextStep: '12-css'
---

# Agregando presupuesto y saldo

> En esta sección aprenderemos a manejar el presupuesto y calcular el saldo disponible en nuestra aplicación de gastos.

---

## Paso #1: Configuración inicial

Primero, vamos a crear las variables necesarias para manejar nuestro presupuesto y saldo. En el archivo `app.ts`, agregaremos dos señales (signals):

```typescript
presupuesto = signal(0); // Para almacenar el presupuesto total
saldo = signal(0); // Para llevar el control del dinero disponible
```

Ahora, agregaremos en nuestro HTML un formulario para que el usuario pueda ingresar su presupuesto y una sección para mostrar el saldo disponible:

```html
<!-- Formulario para ingresar el presupuesto -->
<div class="form presupuesto">
  <label for="presupuesto">Ingresa tu presupuesto:</label>
  <input id="presupuesto" type="number" [(ngModel)]="presupuesto" />
  <button> Listo </button>
</div>

<!-- Sección para mostrar el saldo -->
<div class="restante">
  <p>Saldo disponible</p>
  <p>{{saldo()}} Bs</p>
</div>
```

Aquí tienes el código completo de cómo debería quedar tu plantilla HTML:

```html
<div class="contenedor-principal">
  <div class="form presupuesto">
    <label for="presupuesto">Ingresa tu presupuesto:</label>
    <input id="presupuesto" type="number" [(ngModel)]="presupuesto()" />
    <button> Listo </button>
  </div>

  <div class="form gasto">
    <h3>Agrega tus gastos aquí</h3>
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
    <button (click)="agregarGasto()">Listo</button>
  </div>

  <div class="contenedor-lista">
    <div class="restante">
      <p>Saldo disponible</p>
      <p>{{saldo()}} Bs</p>
    </div>

    <div class="caja-lista">
      <ul>
        @for (gasto of gastos(); track $index) {
        <li>
          <p>{{gasto.nombre}}</p>
          <div>
            <span>{{gasto.cantidad}} Bs</span>
          </div>
        </li>
        }
      </ul>
    </div>
  </div>
</div>
```

## Paso #2: Manejando el saldo inicial

Ahora crearemos una función que se encargará de guardar nuestro saldo inicial. Es importante entender que cuando comenzamos, nuestro saldo es igual a nuestro presupuesto (porque aún no hemos gastado nada).

Agregamos esta función en nuestro componente:

```typescript
ingresarSaldoInicial(): void {
  this.saldo.set(this.presupuesto());  // El saldo inicial es igual al presupuesto
}
```

Y modificamos nuestro HTML para llamar a esta función cuando el usuario presione Enter o el botón:

```html
<input
  id="presupuesto"
  type="number"
  [(ngModel)]="presupuesto"
  (keyup.enter)="ingresarSaldoInicial()"  <!-- Se ejecuta al presionar Enter -->
/>
<button (click)="ingresarSaldoInicial()"> Listo </button>
```

También necesitamos actualizar nuestra función `agregarGasto` para que reste del saldo cada vez que agregamos un nuevo gasto:

```typescript
agregarGasto(): void {
  const gasto = new Gasto(this.nombreGasto(), this.cantidadGasto());
  this.gastos.update((values) => [...values, gasto]);
  this.saldo.set(this.saldo() - gasto.cantidad);  // Restamos el gasto del saldo
  this.nombreGasto.set('');
  this.cantidadGasto.set(0);
}
```

![Implementación de la lógica para calcular el saldo](/images/tutorial/component-5.png)

## Paso #3: Controlando el flujo de la aplicación

Es importante que el usuario ingrese primero su presupuesto antes de poder agregar gastos. Para lograr esto, usaremos una variable de control y la directiva `@if` de Angular.

Primero, creamos una señal que nos ayudará a controlar esto:

```typescript
saldoInicialIngresado = signal(false);  // Inicialmente no se ha ingresado el saldo

ingresarSaldoInicial(): void {
  this.saldo.set(this.presupuesto());
  this.saldoInicialIngresado.set(true);  // Marcamos que ya se ingresó el saldo
}
```

Luego, usamos la directiva `@if` para mostrar u ocultar secciones de nuestra aplicación:

```html
<!-- El formulario de gastos solo se muestra después de ingresar el presupuesto -->
@if(saldoInicialIngresado()) {
<div class="form gasto">...</div>
}

<!-- El saldo solo se muestra después de ingresar el presupuesto -->
@if(saldoInicialIngresado()) {
<div class="restante">...</div>
}
```

Así se verá nuestra aplicación antes de ingresar el presupuesto:
![Vista inicial sin presupuesto](/images/tutorial/template-5.png)

Y después de ingresar el presupuesto:
![Vista con presupuesto ingresado](/images/tutorial/template-6.png)

## Paso #4: Mejorando la experiencia del usuario

Para hacer nuestra aplicación más intuitiva, vamos a:

1. Ocultar el botón "Listo" después de ingresar el presupuesto
2. Bloquear el campo de presupuesto para que no pueda modificarse

Para el botón, usamos `@if` con el operador de negación `!`:

```html
<!-- El botón solo se muestra si NO se ha ingresado el saldo -->
@if(!saldoInicialIngresado()) {
<button (click)="ingresarSaldoInicial()">Listo</button>
}
```

Para el campo de presupuesto, usamos la propiedad `readonly`:

```html
<input
  id="presupuesto"
  type="number"
  [(ngModel)]="presupuesto"
  (keyup.enter)="ingresarSaldoInicial()"
  [readonly]="saldoInicialIngresado()"  <!-- Se bloquea después de ingresar el saldo -->
/>
```

El código completo de tu componente debería verse así:

```typescript
export class App {
  // Variables para el manejo de gastos
  nombreGasto = signal('chocolate');
  cantidadGasto = signal(10);
  gastos = signal<Gasto[]>([]);

  // Variables para el manejo del presupuesto
  presupuesto = signal(0);
  saldo = signal(0);
  saldoInicialIngresado = signal(false);

  // Función para agregar un nuevo gasto
  agregarGasto(): void {
    const gasto = new Gasto(this.nombreGasto(), this.cantidadGasto());
    this.gastos.update((values) => [...values, gasto]);
    this.saldo.set(this.saldo() - gasto.cantidad);
    this.nombreGasto.set('');
    this.cantidadGasto.set(0);
  }

  // Función para establecer el presupuesto inicial
  ingresarSaldoInicial(): void {
    this.saldo.set(this.presupuesto());
    this.saldoInicialIngresado.set(true);
  }
}
```
