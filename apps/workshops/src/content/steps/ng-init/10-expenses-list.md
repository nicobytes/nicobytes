---
title: Lista de gastos
author: Angular Bolivia
description: Aprenderemos a mostrar en pantalla la lista de gastos que el usuario va registrando, usando las características modernas de Angular.
order: 10
prevStep: '09-add-expenses'
nextStep: '11-budget'
---

# Mostrando la Lista de Gastos

> ¡Excelente progreso! Ya aprendimos a guardar los gastos en nuestra aplicación. Ahora vamos a dar el siguiente paso: mostrar estos gastos en pantalla para que los usuarios puedan ver todos sus registros de una forma bonita y ordenada.

---

## Paso #1: Creando la estructura HTML base

Para empezar, vamos a crear una estructura HTML básica que nos servirá para mostrar los gastos. Primero, hagamos un ejemplo sencillo con datos ficticios para visualizar cómo queremos que se vea:

```html
<div class="contenedor-lista">
  <div class="caja-lista">
    <ul>
      <li>
        <p>Chocolates</p>
        <div>
          <span>10 Bs</span>
        </div>
      </li>
      <li>
        <p>Pan</p>
        <div>
          <span>5 Bs</span>
        </div>
      </li>
    </ul>
  </div>
</div>
```

Esta estructura es muy simple:

- Usamos un `<div>` principal como contenedor
- Dentro tenemos una lista `<ul>` que contendrá cada gasto
- Cada gasto será un elemento `<li>` con el nombre y la cantidad

Ahora, vamos a unir esta nueva estructura con nuestro formulario que ya teníamos. Así es como quedará todo junto:

```html
<div class="contenedor-principal">
  <!-- Esta es la parte del formulario que ya teníamos -->
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

  <!-- Esta es la nueva parte que agregamos para mostrar la lista -->
  <div class="contenedor-lista">
    <div class="caja-lista">
      <ul>
        <li>
          <p>Chocolates</p>
          <div>
            <span>10 Bs</span>
          </div>
        </li>
        <li>
          <p>Pan</p>
          <div>
            <span>5 Bs</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
```

Cuando guardes estos cambios, verás algo como esto en tu pantalla:

![Lista de gastos estática inicial](/images/tutorial/template-3.png)

## Paso #2: Haciendo la lista dinámica

¡Ahora viene la parte emocionante! En lugar de mostrar datos fijos como "Chocolates" y "Pan", vamos a hacer que nuestra lista muestre los gastos reales que el usuario va agregando. Para esto, usaremos una característica muy especial de Angular llamada **@for**.

¿Qué es **@for**?
Es una directiva de Angular que nos permite repetir elementos HTML por cada dato que tengamos en una lista. Es como decirle a Angular: "Por favor, crea un elemento `<li>` por cada gasto que encuentres en mi lista de gastos".

Vamos a modificar nuestro código para usar **@for**:

```html
@for (gasto of gastos(); track $index) {
<li>
  <p>{{gasto.nombre}}</p>
  <div>
    <span>{{gasto.cantidad}} Bs</span>
  </div>
</li>
}
```

Analicemos cada parte de este código:

1. `@for (gasto of gastos(); track $index)`:

   - Esta línea le dice a Angular que recorra nuestra lista de `gastos`
   - Por cada gasto, creará una variable temporal llamada `gasto` que podremos usar
   - `track $index` ayuda a Angular a mantener un registro de cada elemento

2. `{{gasto.nombre}}` y `{{gasto.cantidad}}`:
   - Los símbolos `{{}}` son la forma que tiene Angular de mostrar datos dinámicos
   - Dentro de estos símbolos podemos poner cualquier variable o expresión
   - En este caso, mostramos el nombre y la cantidad de cada gasto

## Paso #3: ¡Hora de probar!

Ahora que tenemos todo conectado, cada vez que agregues un nuevo gasto usando el formulario:

1. El gasto se guardará en nuestra lista de `gastos`
2. Angular automáticamente actualizará la pantalla
3. Verás el nuevo gasto aparecer en la lista

¡Pruébalo! Agrega algunos gastos y observa cómo la lista se actualiza automáticamente. Esta es la magia de Angular: mantener sincronizados tus datos con lo que se muestra en pantalla.
