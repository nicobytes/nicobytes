export type Course = {
  name: string;
  description: string;
  link: { href: string; label: string };
};

const platzi = (slug: string) => `https://platzi.com/cursos/${slug}/`;

export const courses: Course[] = [
  {
    name: 'Curso para Crear Agentes de AI con LangGraph',
    description: '',
    link: { href: platzi('agentes-langgraph'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Rendimiento en Angular',
    description: '',
    link: { href: platzi('angular-performance'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Angular Forms: Creación y Optimización de Formularios Web',
    description: '',
    link: { href: platzi('angular-forms'), label: 'platzi.com' },
  },
  {
    name: 'Curso de NestJS: Programación Modular, Documentación con Swagger y Deploy',
    description: '',
    link: { href: platzi('nestjs-modular'), label: 'platzi.com' },
  },
  {
    name: 'Curso de NestJS: Persistencia de Datos con MongoDB',
    description: '',
    link: { href: platzi('nestjs-mongodb'), label: 'platzi.com' },
  },
  {
    name: 'Curso de NestJS: Persistencia de Datos con TypeORM',
    description: '',
    link: { href: platzi('nestjs-typeorm'), label: 'platzi.com' },
  },
  {
    name: 'Curso de NestJS: Autenticación con Passport y JWT',
    description: '',
    link: { href: platzi('nestjs-auth'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Backend con NestJS',
    description: '',
    link: { href: platzi('nestjs'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Manipulación de Arrays en JavaScript',
    description: '',
    link: { href: platzi('arrays'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Manipulación Avanzada de Datos con JavaScript',
    description: '',
    link: { href: platzi('arrays-avanzados-javascript'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Fundamentos de Angular',
    description: '',
    link: { href: platzi('angular16'), label: 'platzi.com' },
  },
  {
    name: 'Platzi CONF 2021',
    description: '',
    link: { href: platzi('platziconf2021'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Angular: Componentes y Servicios',
    description: '',
    link: { href: platzi('angular-componentes'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Consumo de APIs REST con Angular',
    description: '',
    link: { href: platzi('angular-apis'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Angular Router: Lazy Loading y Programación Modular',
    description: '',
    link: { href: platzi('angular-modular'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Maquetación con Angular CDK y Tailwind CSS',
    description: '',
    link: { href: platzi('angular-tailwind'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Autenticación con Angular',
    description: '',
    link: { href: platzi('angular-autenticacion'), label: 'platzi.com' },
  },
  {
    name: 'Curso Práctico de Angular: Construye un Clon de Trello',
    description: '',
    link: { href: platzi('angular-trello'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Angular: Creación de Aplicaciones Web',
    description: '',
    link: { href: platzi('angular'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Angular Avanzado',
    description: '',
    link: { href: platzi('angular-avanzado'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Pruebas Unitarias en Angular',
    description: '',
    link: { href: platzi('angular-testing'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Angular: Unit Testing para Servicios',
    description: '',
    link: { href: platzi('angular-unit-testing-servicios'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Angular: Unit Testing para Componentes',
    description: '',
    link: { href: platzi('angular-unit-testing-componentes'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Angular: Unit Testing para Formularios',
    description: '',
    link: { href: platzi('angular-unit-testing-formularios'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Angular: Unit Testing para Rutas',
    description: '',
    link: { href: platzi('angular-unit-testing-routing'), label: 'platzi.com' },
  },
  {
    name: 'Laboratorio de Angular: Optimización Web con Lighthouse y SSR',
    description: '',
    link: { href: platzi('laboratorio-angular-lighthouse'), label: 'platzi.com' },
  },
  {
    name: 'Prueba Técnica: Desarrollo Frontend con Angular',
    description: '',
    link: { href: platzi('laboratorio-angular-prueba'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Backend con Node.js: API REST con Express.js',
    description: '',
    link: { href: platzi('backend-nodejs'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Backend con Node.js: Base de Datos con PostgreSQL',
    description: '',
    link: { href: platzi('backend-nodejs-postgres'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Backend con Node.js: Autenticación con Passport.js y JWT',
    description: '',
    link: { href: platzi('passport'), label: 'platzi.com' },
  },
  {
    name: 'Curso de GraphQL con Node.js',
    description: '',
    link: { href: platzi('nodejs-graphql'), label: 'platzi.com' },
  },
  {
    name: 'Curso de End to End Testing para APIs REST con Node.js',
    description: '',
    link: { href: platzi('e2e-testing-nodejs'), label: 'platzi.com' },
  },
  {
    name: 'Laboratorio de Node.js: Clon de Calendly',
    description: '',
    link: { href: platzi('laboratorio-node-calendly'), label: 'platzi.com' },
  },
  {
    name: 'Curso de TypeScript',
    description: '',
    link: { href: platzi('typescript-22'), label: 'platzi.com' },
  },
  {
    name: 'Curso de TypeScript: Tipos Avanzados y Funciones',
    description: '',
    link: { href: platzi('typescript-tipos-avanzados'), label: 'platzi.com' },
  },
  {
    name: 'Curso de TypeScript: Programación Orientada a Objetos y Asincronismo',
    description: '',
    link: { href: platzi('typescript-poo'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Introducción al Testing con JavaScript',
    description: '',
    link: { href: platzi('javascript-testing'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Frontend Developer',
    description: '',
    link: { href: platzi('frontend-developer-js'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Fundamentos de Python',
    description: '',
    link: { href: platzi('python-fundamentos'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Python: Comprehensions, Funciones y Manejo de Errores',
    description: '',
    link: { href: platzi('python-funciones'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Python: PIP y Entornos Virtuales',
    description: '',
    link: { href: platzi('python-pip'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Introducción al Desarrollo Backend',
    description: '',
    link: { href: platzi('backend'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Introducción a MongoDB',
    description: '',
    link: { href: platzi('mongodb'), label: 'platzi.com' },
  },
  {
    name: 'Curso de Modelado de Datos en MongoDB',
    description: '',
    link: { href: platzi('mongodb-modelado'), label: 'platzi.com' },
  },
];
