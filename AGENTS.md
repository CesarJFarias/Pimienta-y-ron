# Pimienta & Ron — Reglas para agentes

## Arquitectura

Este proyecto es un sitio estático construido con:

* HTML
* CSS
* Vanilla JavaScript
* JSON
* Decap CMS

No introducir frameworks ni dependencias innecesarias.

## Decap CMS — CRÍTICO

Decap CMS es el sistema utilizado por la persona encargada de administrar el catálogo.

Debe permanecer funcional en todo momento.

### Archivos protegidos

Los siguientes archivos son críticos:

* `admin/index.html`
* `admin/config.yml`
* `content/productos.json`
* `content/categorias.json`

No modificar estos archivos salvo que sea estrictamente necesario.

### Contrato de datos

El frontend consume:

`content/productos.json`

y:

`content/categorias.json`

Estos archivos constituyen el contrato de datos entre Decap CMS y el frontend.

No modificar nombres de campos ni estructura sin verificar primero el impacto en Decap CMS.

### Producto

Mantener actualmente:

```json
{
  "nombre": "...",
  "tipo": "...",
  "descripcion": "...",
  "foto": "..."
}
```

No cambiar durante la refactorización:

* `tipo`
* `foto`
* `nombre`
* `descripcion`

No introducir migraciones de datos automáticamente.

### Categorías

Mantener:

```json
{
  "id": "...",
  "etiqueta": "...",
  "activa": true
}
```

### Regla de modificación

Antes de modificar cualquier archivo dentro de `admin/` o `content/`:

1. Explicar por qué es necesario.
2. Identificar qué funcionalidad puede afectar.
3. Verificar compatibilidad con Decap CMS.
4. No realizar cambios si la refactorización puede completarse sin ellos.

## Frontend

El frontend puede reorganizarse libremente siempre que continúe consumiendo los mismos JSON.

La estructura objetivo es:

```text
index.html
css/styles.css

js/
├── app.js
├── config.js
├── data.js
├── filters.js
├── products.js
└── modal.js
```

## Separación de responsabilidades

`index.html`

* estructura HTML

`css/styles.css`

* estilos

`js/app.js`

* coordinación de la aplicación

`js/config.js`

* configuración

`js/data.js`

* carga de datos

`js/filters.js`

* filtros

`js/products.js`

* productos y cards

`js/modal.js`

* modal y acciones relacionadas

## No hacer

No introducir:

* React
* Vue
* Angular
* TypeScript
* Vite
* Node
* Express
* base de datos
* API
* backend
* otro CMS

salvo que exista una solicitud explícita para hacerlo.

## Principio

Priorizar refactorización sobre reescritura.

No modificar funcionalidades que no formen parte del objetivo solicitado.

Antes de realizar cambios estructurales importantes, inspeccionar el repositorio y comprender las dependencias existentes.