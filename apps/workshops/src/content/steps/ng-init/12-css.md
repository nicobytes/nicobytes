---
title: 'CSS - ¡Hagamos que nuestra app se vea profesional!'
titleStep: CSS
description: Vamos a hacer que nuestra aplicación de gastos se vea profesional y atractiva utilizando CSS para darle estilo.
order: 12
prevStep: '11-budget'
nextStep: '13-delete-expenses'
---

> ¡Felicitaciones! Ya tenemos una aplicación funcional para manejar nuestros gastos. Ahora vamos a dar el siguiente paso: hacer que se vea profesional y atractiva usando CSS.

## ¿Qué es CSS y por qué es importante?

CSS (Cascading Style Sheets o Hojas de Estilo en Cascada) es el lenguaje que usamos para darle estilo y personalidad a nuestras páginas web. Si HTML es la estructura de nuestra página (como el esqueleto), CSS es todo lo visual: colores, tamaños, espaciados, animaciones y más. ¡Es lo que hace que nuestra aplicación pase de ser funcional a ser profesional y atractiva!

## Paso #1: Ubicando nuestro archivo de estilos

En nuestra aplicación de Angular, tenemos un archivo especial llamado `global_styles.css`. Este archivo es muy importante porque contiene todos los estilos que se aplicarán a toda nuestra aplicación.

![Estructura del proyecto](/images/tutorial/global_styles.png)

Para entender cómo funciona CSS, hagamos una prueba sencilla. Si agregamos este código en nuestro archivo `global_styles.css`:

```css
body {
  background-color: red;
}
```

Verás que toda la página se pone roja:

![App con fondo rojo](/images/tutorial/red-app.png)

Este es un ejemplo muy simple, pero nos muestra el poder de CSS: ¡con solo tres líneas de código podemos cambiar completamente el aspecto de nuestra aplicación!

## Paso #2: Aplicando estilos profesionales

Para hacer que nuestra aplicación se vea profesional rápidamente, hemos preparado dos opciones de estilos que puedes usar. Cada una tiene su propia personalidad y diseño:

1. Abre uno de estos enlaces (se abrirán en una nueva pestaña):

   - <a href="https://raw.githubusercontent.com/angular-bolivia/ng-she-workshop/develop/src/styles.css" target="_blank" rel="noopener noreferrer">Opción de estilos #1</a> - Un diseño colorido
   - <a href="https://raw.githubusercontent.com/angular-bolivia/ng-she-workshop/develop/src/styles-v2.css" target="_blank" rel="noopener noreferrer">Opción de estilos #2</a> - Un diseño minimalista

2. Selecciona todo el contenido del enlace que hayas elegido (Ctrl+A o Cmd+A)
3. Cópialo (Ctrl+C o Cmd+C)
4. Pega este contenido en tu archivo `global_styles.css`, reemplazando todo lo que había antes

Si eliges la Opción #1, tu aplicación se verá así:

![App final antes de ingresar presupuesto](/images/tutorial/app-1.png)

## Paso #3: Visualizando nuestra app en pantalla completa

Para ver nuestra aplicación en todo su esplendor, vamos a abrirla en pantalla completa:

1. Busca el botón **Open Preview in new Tab** en la esquina superior derecha
2. Dale clic para abrir la aplicación en una nueva pestaña

> 💡 Nota: Si ves una ventana que dice "Additional step required", no te preocupes. Solo necesitas hacer clic en el botón "Connect to Project" para continuar.

Así se ve la aplicación con cada opción de estilos:

Opción #1 (diseño colorido):
![App final en pantalla completa](/images/tutorial/app-3.png)

Opción #2 (diseño minimalista):
![App final en pantalla completa](/images/tutorial/app-4.png)

¡Y listo! Ahora tienes una aplicación que no solo funciona bien, sino que también se ve profesional. En los siguientes pasos, continuaremos mejorando nuestra aplicación agregando más funcionalidades.
