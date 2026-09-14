# Design: Mejoras Catálogo Pimienta & Ron

## Technical Approach

Ediciones quirúrgicas sobre el frontend estático existente, sin build step ni dependencias. Tres frentes:
1. **social-header**: nuevo bloque en el header reutilizando el layout `space-between` existente; el `<a id="ig-link">` se mueve ahí y conserva la id, así `app.js:20` sigue funcionando sin tocar la lógica. Footer se elimina de HTML y CSS.
2. **seo**: meta tags y JSON-LD estáticos en `<head>`; `ItemList` dinámico inyectado por `app.js` cuando terminan de cargar los datos. Thumbs pasan de `background-image` (CSS, no indexable) a `<img>` con `alt` + `lazy`.
3. **catalogo-contenido**: se agrega valor `tazas` (categoría + opción del select de Decap), productos nuevos derivados de los JPEG con imagen optimizada, y descripciones reescritas. Contrato de datos intacto.

## Architecture Decisions

| Decisión | Opciones | Elegida | Por qué |
|---|---|---|---|
| Botón IG en el header | Quitar a+ JS nuevo vs reutilizar id | Reutilizar `#ig-link` | `app.js` ya le setea el href desde `CONFIG.instagramUrl`; cero lógica nueva |
| Footer | Mantener / eliminar | Eliminar (HTML y CSS) | Decisión del usuario; sin footer no hay duplicación de IG |
| JSON-LD ItemList | Hardcodeado en HTML vs inyectado | Inyectado post-load | Los productos solo existen tras `fetch`; hardcodear daría datos viejos/blanco |
| Thumbs indexables | `<div background-image>` vs `<img>` | `<img alt loading=lazy>` | Google no indexa background-image; `alt` con `item.nombre` |
| Compresión de imágenes | Mantener PNG 2,6MB vs JPG ≤300KB | JPG (renombrado descriptivo) | Core Web Vitals; nombre `buzo-bandera-flores.jpg` |
| Renombrado de fotos | Mantener nombres numéricos vs descriptivos | Descriptivos (kebab-case) | Legibilidad, SEO de URL de imagen |
| Tool de compresión | ImageMagick vs PowerShell System.Drawing | System.Drawing | Sin instalar nada; ya disponible en Windows |

## Data Flow

    Index.html (static: meta, JSON-LD Org/WebSite)
        │
        ▼
    Data.cargar() ──fetch──► content/productos.json + categorias.json
        │
        ▼
    app.js.onDatosCargados()
        ├──► renderFilters()   → Filters
        ├──► renderGrid()      → Products (<img alt lazy>)
        └──► inyecta JSON-LD   → ItemList (∅ si no hay items)
                                      │
    Modal.abrir(item) ──► <img alt=nombre> + contactos wa.me (Lorena)

## File Changes

| File | Action | Descripción |
|------|--------|-------------|
| `index.html` | Modify | `<head>` SEO completo; bloque `.social-block` en header; **borrar** `<footer>` |
| `css/styles.css` | Modify | Estilos `.social-block` + responsive; **borrar** estilos `.footer`; mantener `.brand-*`, `.thumb` pasa a wrapper de img |
| `js/config.js` | Modify | `Chica 2`→`Lorena`; agregar `siteUrl: "https://pimientayron.netlify.app/"` |
| `js/app.js` | Modify | Inyección `ItemList` JSON-LD en `onDatosCargados`; `typeDef` de item genérico |
| `js/products.js` | Modify | `.thumb` a `<img loading="lazy" decoding="async" alt=…>`; clase `.thumb img` |
| `js/modal.js` | Modify | `.modal-thumb` a `<img alt=…>` |
| `content/categorias.json` | Modify (protegido) | + `{id:"tazas", etiqueta:"Tazas", activa:false}` |
| `admin/config.yml` | Modify (protegido) | `options: ["remeras","buzos","tazas"]` |
| `content/productos.json` | Modify (protegido) | Nuevos items + descripciones + refs de foto actualizadas |
| `assets/uploads/*` | Modify | JPGs nuevos (optimizados) ; PNG 2,6MB eliminado |
| `robots.txt` | Create | Allow all + sitemap |
| `sitemap.xml` | Create | URL canonical + lastmod |

## Interfaces / Contracts

```json
// content/productos.json — SIN cambios de esquema v1.0
{ "items": [ { "nombre": "string", "tipo": "string", "descripcion": "string", "foto": "string" } ] }
```

```js
// app.js — inyección ItemList
const ldJSON = { "@context":"https://schema.org", "@type":"ItemList",
  "itemListElement": DESIGNS.map((d,i)=>({ "@type":"ListItem", "position":i+1,
    "item":{ "@type":"Product", "name":d.nombre, "description":d.descripcion,
             "image":CONFIG.siteUrl.replace(/\/$/,"")+d.foto } })) };
```

## Testing Strategy

| Capa | Qué | Cómo |
|---|---|---|
| Datos | JSON válidos | `ConvertFrom-Json` en PowerShell sobre ambos JSON |
| Integridad | Rutas de imágenes existen | Script verifica cada `foto` contra `assets/uploads/` |
| Decap | Select incluye tazas | Revisión de `admin/config.yml` (YAML válido, campos intactos) |
| Manual (local) | Visual de header, modal, filtro Tazas, modal WhatsApp | Servidor estático local + navegador |

## Migration / Rollout

No migration. `git pull` final antes del push para integrar commits de Decap; luego commit + push únicos.

## Open Questions

- [ ] ¿Cuál de los 21 JPEG entra como producto nuevo y cuál ya está publicado? → se resuelve al revisar las imágenes (Tanda C), con validación previa del usuario antes de escribir el JSON.