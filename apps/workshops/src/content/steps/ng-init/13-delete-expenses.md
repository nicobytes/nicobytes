---
title: Eliminando gastos
author: Angular Bolivia
description: ¿Llegaste muy rápido hasta aquí? Si aún queda tiempo para que termine el taller, podemos ver cómo eliminar gastos de nuestra lista.
order: 13
prevStep: '12-css'
nextStep: '14-share'
---

# Eliminando gastos

> ¿Llegaste muy rápido hasta aquí? Si aún queda tiempo para que termine el taller, podemos ver cómo eliminar gastos de nuestra lista.

---

## Paso #1: Crear la función para eliminar gastos

En el archivo `main.ts` vamos a crear una nueva función llamada `eliminarGasto`. Esta función nos permitirá:

1. Eliminar un gasto específico de nuestra lista
2. Actualizar nuestro saldo sumando el valor del gasto eliminado

La función necesita dos parámetros:

- `indiceGasto`: La posición del gasto en la lista que queremos eliminar
- `cantidadGasto`: El valor en Bolivianos del gasto que vamos a eliminar

Aquí está el código:

```typescript
eliminarGasto(indiceGasto: number, cantidadGasto: number): void {
  this.gastos.update((values) => values.filter((_, index) => index !== indiceGasto));
  this.saldo.set(this.saldo() + cantidadGasto);
}
```

¿Qué hace esta función?

1. Usa `filter()` para crear una nueva lista que excluye el gasto que queremos eliminar
2. Actualiza nuestro saldo sumando el valor del gasto que acabamos de eliminar

## Paso #2: Agregar el botón para eliminar en la plantilla

Ahora necesitamos agregar un botón que nos permita eliminar cada gasto. Para esto, vamos a modificar nuestra plantilla HTML.

Angular nos proporciona una variable especial llamada `$index` que nos indica la posición de cada elemento en nuestra lista. Vamos a usar esta variable para saber qué gasto queremos eliminar.

Así quedará nuestro código HTML:

```html
@for (gasto of gastos(); track $index) {
<li>
  <p>{{gasto.nombre}}</p>
  <div>
    <span>{{gasto.cantidad}} Bs</span>
    <!-- Agregamos el botón para eliminar -->
    <button (click)="eliminarGasto($index, gasto.cantidad)">
      <img
        src="https://raw.githubusercontent.com/angular-bolivia/ng-she-workshop/develop/src/assets/trash-icon.svg"
        alt="Eliminar gasto"
      />
    </button>
  </div>
</li>
}
```

¿Qué hemos agregado?

1. Un botón con un ícono de basura
2. Cuando hacemos clic en el botón, llamamos a nuestra función `eliminarGasto`
3. Le pasamos el `$index` (posición del gasto) y la `cantidad` del gasto

Y así se verá nuestra app con el nuevo botón para eliminar:

![Eliminar gastos](/images/tutorial/template-7.png)
