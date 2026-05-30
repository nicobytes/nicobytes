---
title: 'Retos Adicionales'
titleStep: 'Retos Extra'
description: Retos adicionales para el workshop
order: 16
prevStep: '15-congratulations'
---

> ¡Felicitaciones por llegar hasta aquí! 👏 Si quieres seguir practicando y mejorando tu aplicación, te proponemos los siguientes retos que te ayudarán a aprender más sobre Angular.

### Reto 1: Separar el HTML del Componente

Hasta ahora, hemos tenido todo nuestro código HTML y TypeScript en un mismo archivo. Esto es útil para ejemplos pequeños, pero en aplicaciones reales es mejor tener el código organizado en archivos separados.

Vamos a separar nuestro HTML en su propio archivo siguiendo estos pasos:

1. Crea un nuevo archivo llamado `main.html`
2. Copia todo el código HTML que está dentro de la propiedad `template` del componente y pégalo en el nuevo archivo `main.html`
3. En tu componente, cambia la propiedad `template` por `templateUrl` y apunta al nuevo archivo

Tu componente debería quedar así:

```ts
@Component({
  selector: 'app-root',
  templateUrl: 'main.html', // Ahora usamos templateUrl en lugar de template
})
export class App {}
```

### Reto 2: Agregar un Botón de Reinicio

Actualmente, una vez que ingresas tu presupuesto inicial, no hay forma de cambiarlo. ¡Vamos a agregar esta funcionalidad!

Lo que necesitas hacer es:

1. Agregar un botón "Reiniciar" que solo aparezca cuando ya existe un presupuesto ingresado
2. Cuando se haga clic en el botón, la aplicación debe:
   - Borrar todos los gastos registrados
   - Permitir ingresar un nuevo presupuesto
   - Volver al estado inicial de la aplicación

### Reto 3: Crear un Componente para cada Gasto

En Angular, una buena práctica es dividir nuestra aplicación en componentes más pequeños y reutilizables. Vamos a crear un componente específico para mostrar cada gasto individual.

Sigue estos pasos:

1. Crea una nueva carpeta llamada `gasto`
2. Dentro de esta carpeta, crea tres archivos:
   - `gasto.component.html`: Para el template HTML
   - `gasto.component.ts`: Para la lógica del componente
   - `gasto.component.css`: Para los estilos específicos del componente

Tu estructura de archivos quedará así:

```txt
|- src/
    - gasto/
        - gasto.component.html    👈 Nuevo archivo para el HTML del gasto
        - gasto.component.ts      👈 Nuevo archivo para la lógica del gasto
        - gasto.component.css     👈 Nuevo archivo para los estilos del gasto
    - gasto.ts
    - global_styles.css
    - index.html
    - main.html
    - main.ts
    - tsconfig.app.json
```

En el archivo `gasto.component.html`, coloca el HTML para mostrar un solo gasto:

```html
<li>
  <p>{{ gasto.nombre }}</p>
  <div>
    <span>{{ gasto.cantidad }} Bs</span>
    <button (click)="eliminarGasto()">
      <img
        src="https://raw.githubusercontent.com/angular-bolivia/ng-she-workshop/develop/src/assets/trash-icon.svg"
        alt="Eliminar gasto"
      />
    </button>
  </div>
</li>
```

En el archivo `gasto.component.ts`, crea el componente básico:

```ts
import { Component } from '@angular/core';
import { Gasto } from '../gasto';

@Component({
  selector: 'gasto',
  templateUrl: 'gasto.component.html',
})
export class GastoComponent {
  // Aquí agregaremos el Input para recibir el gasto
  // y el Output para emitir el evento de eliminación
}
```

Finalmente, actualiza tu componente principal para usar el nuevo componente de gasto:

```html
<div class="caja-lista">
  <ul>
    @for (gasto of gastos(); track $index) {
    <gasto [gasto]="gasto" (eliminar)="eliminarGasto($event)" />
    }
  </ul>
</div>
```

💡 **Nota**: Para que esto funcione, necesitarás:

- Usar `input` para que el componente gasto reciba la información del gasto
- Usar `output` para emitir el evento cuando se quiera eliminar un gasto
- Registrar el nuevo componente en tu módulo de Angular

¡Inténtalo y no dudes en experimentar con más funcionalidades!

### Reto 4: Optimiza tus Signals con Computed

¡Vamos a hacer nuestra aplicación más eficiente! En Angular, los signals computed son una característica poderosa que nos permite calcular valores automáticamente basados en otros signals. Piensa en ellos como fórmulas en Excel que se actualizan automáticamente cuando cambian los valores de los que dependen.

Actualmente, tenemos estos signals en nuestra aplicación:

```typescript
nombreGasto = signal('chocolate');
cantidadGasto = signal(10);
gastos = signal<Gasto[]>([]);

// Variables para el manejo del presupuesto
presupuesto = signal(0);
saldo = signal(0);
saldoInicialIngresado = signal(false);
```

¿Te has dado cuenta que el `saldo` realmente depende del `presupuesto` y los `gastos`? En lugar de actualizarlo manualmente, podemos hacer que se calcule automáticamente usando un computed signal.

Por ejemplo, podrías convertir el saldo en un computed signal así:

```typescript
saldo = computed(() => {
  const presupuestoActual = this.presupuesto();
  const totalGastos = this.gastos().reduce(
    (total, gasto) => total + gasto.cantidad,
    0,
  );
  return presupuestoActual - totalGastos;
});
```

¡Inténtalo! Identifica qué otros valores en tu aplicación podrían ser computed signals.

### Reto 5: Guarda tus Datos con localStorage

¿Has notado que cada vez que recargas la página pierdes todos tus gastos? 😟 ¡Vamos a solucionarlo!

El localStorage es como una pequeña base de datos en tu navegador que nos permite guardar información incluso después de cerrar la página. Combinando localStorage con signals y effects, podemos crear una experiencia perfecta donde los datos se guarden automáticamente.

Así es como funciona:

1. Primero, guardamos los datos cuando cambien usando un effect:

```typescript
effect(() => {
  // Cada vez que gastos() cambie, se guardará en localStorage
  localStorage.setItem('gastos', JSON.stringify(this.gastos()));
});
```

2. Luego, cuando la aplicación inicie, cargamos los datos guardados:

```typescript
constructor() {
  // Recuperamos los gastos guardados
  const gastosGuardados = localStorage.getItem('gastos');
  if (gastosGuardados) {
    this.gastos.set(JSON.parse(gastosGuardados));
  }
}
```

Retos adicionales para localStorage:

- Guarda también el presupuesto inicial
- Agrega una función para borrar todos los datos guardados cuando se usa el botón de reinicio
- Muestra un mensaje cuando se cargan datos guardados
- Agrega un botón para exportar los datos a un archivo JSON

💡 **Tip**: Recuerda manejar los casos donde localStorage no esté disponible o los datos guardados no sean válidos.

¡Ahora tu aplicación mantendrá los datos incluso después de cerrar el navegador! 🎉

¿Te animas a implementar estas mejoras? Recuerda que la práctica hace al maestro. No dudes en experimentar y agregar tus propias características a la aplicación.
