# Skill Registry — Pimienta-y-ron

## Project Conventions (source of truth: AGENTS.md)

- Site estático: HTML + CSS + Vanilla JS + JSON + **Decap CMS**. No frameworks ni dependencias.
- **Protegidos** (no tocar sin justificar): `admin/index.html`, `admin/config.yml`, `content/productos.json`, `content/categorias.json`.
- Contrato de datos: producto `{nombre, tipo, descripcion, foto}`; categoría `{id, etiqueta, activa}`. No cambiar nombres de campos ni estructura.
- Frontend modular: `index.html`, `css/styles.css`, `js/{app,config,data,filters,products,modal}.js`. Respetar responsabilidades.
- Principio: refactorizar > reescribir; no modificar lo que no es del objetivo.
- **Flujo**: un solo push al final (credits Netlify). Nada se pushea sin aprobación del usuario.

## User Skills relevantes

| Skill | Trigger | Compact rules |
|-------|---------|---------------|
| frontend-design-direction | cambio visual de UI | (aplicar criterio de diseño consistente con marca; Jost/Cormorant Garamond, paleta actual) |
| frontend-a11y | forms, modales, navegación por teclado | (semántica ARIA, focus management, labels) |

## Ignored

- `sdd-*`, `_shared`, `skill-registry` (no son skills de proyecto).