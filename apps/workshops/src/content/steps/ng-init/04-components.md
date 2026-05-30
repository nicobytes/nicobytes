---
title: Componentes
author: Angular Bolivia
description: Los componentes son los bloques básicos de construcción de las páginas web en Angular. Contienen una parte visual en html (la vista) y una funcional en Typescript.
order: 4
nextStep: '05-html'
prevStep: '03-stackblitz'
---

# ¿Qué son los componentes?

> Imagina que estás construyendo una casa con bloques de LEGO. En Angular, los componentes son como esos bloques de LEGO: piezas fundamentales que al unirlas crean tu página web. Cada componente es una pieza independiente que tiene su propia apariencia (HTML) y su propio comportamiento (TypeScript).

---

Cuando creas un componente en Angular, necesitas tres elementos principales:

1. **Imports (Importaciones)**

   - Son como traer las herramientas que necesitas para trabajar
   - Por ejemplo, siempre necesitarás importar `Component` desde Angular para crear un componente

2. **Decorador @Component**

   - Es como una etiqueta especial que le dice a Angular: "¡Hey, esto es un componente!"
   - Necesita algunos datos importantes:
     - `selector`: Es el nombre que usarás para poner tu componente en el HTML (como una etiqueta nueva)
     - `template`: Es donde escribes el HTML que se mostrará
     - `style`: Es donde defines cómo se verá (los estilos CSS)

3. **Clase del Componente**
   - Es donde escribes toda la lógica de tu componente
   - Aquí defines qué hace tu componente cuando el usuario interactúa con él

Veamos un ejemplo sencillo:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <h1>¡Hola mundo!</h1> `,
})
export class App {
  name = 'Angular';
}
```

Este componente simplemente muestra "¡Hola mundo!" en la página. ¡Es un comienzo simple pero importante!
