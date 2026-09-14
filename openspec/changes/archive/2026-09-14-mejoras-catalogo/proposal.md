# Proposal: Mejoras Catálogo Pimienta & Ron

## Intent

El catálogo está publicado y funcionando, pero necesita: redes sociales visibles en el header (hoy solo hay un link en el footer), el contacto "Chica 2" es un nombre de prueba, falta la categoría Tazas, hay productos nuevos por cargar, las descripciones son demasiado cortas y la página no tiene SEO (no aparece en buscadores). Además hay una imagen de 2,6 MB que degrada la velocidad.

Constraint crítico: **un solo push al final** (credits de Netlify limitados). Nada se impacta en producción sin aprobación explícita del usuario.

## Scope

### In Scope
1. Renombrar contacto "Chica 2" → "Lorena" (botón WhatsApp).
2. Categoría nueva "Tazas" (activa: false → "próximamente").
3. Agregar productos nuevos en sus categorías (fotos desde `Web Eri/1-21.jpeg`).
4. Mejorar descripciones de todos los productos (más detalle).
5. Bloque "Redes sociales" en el extremo derecho del header.
6. Botón de Instagram debajo de "Redes sociales" (se elimina el footer).
7. Texto estático "Para ventas al por mayor contactarse por Whatsapp".
8. SEO on-page: meta tags, canonical, OG/Twitter, JSON-LD, robots.txt, sitemap.xml, imágenes con alt + lazy, comprimir `1000460488.png` (2,6 MB).

### Out of Scope
- Migrar de template/client-side a SSR o build step (violaría AGENTS.md).
- Backend, frameworks, CI/CD, otro CMS.
- Categoría Tazas con productos (no hay fotos aún).
- Páginas individuales por producto.

## Capabilities

### New Capabilities
- `social-header`: header con bloque "Redes sociales", botón Instagram, nota por mayor. Footer eliminado.
- `seo`: meta/OG/Twitter/canonical, JSON-LD dinámico, robots.txt, sitemap.xml, imágenes indexables (alt + lazy), imagen CPU optimizada.
- `catalogo-contenido`: categoría Tazas, productos nuevos, descripciones enriquecidas.

### Modified Capabilities
- None (no existían specs previas).

## Approach

Ediciones directas en frontend + data:
- `js/config.js`: renombrar contacto.
- `index.html`: nuevo bloque social en header, `<head>` SEO, JSON-LD; eliminar footer.
- `css/styles.css`: estilos del bloque social y responsive.
- `js/products.js` + `js/modal.js`: thumbs a `<img loading="lazy" alt>`.
- `js/app.js`: inyectar JSON-LD ItemList con los productos cargados.
- `content/categorias.json` + `admin/config.yml`: agregar "tazas" (categoría y opción del select del admin).
- `content/productos.json`: productos nuevos + descripciones.
- `assets/uploads/`: copiar/renombrar JPEG seleccionados; reemplazar PNG 2,6 MB por JPG comprimido (PowerShell System.Drawing).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `js/config.js` | Modified | Contacto "Lorena" |
| `index.html` | Modified | Header social, SEO head, sin footer |
| `css/styles.css` | Modified | Bloque social + responsive, limpiar footer |
| `js/products.js`, `js/modal.js` | Modified | `<img>` con alt + lazy |
| `js/app.js` | Modified | Inyección JSON-LD |
| `content/productos.json` | Modified (protegido) | Productos nuevos + descripciones |
| `content/categorias.json` | Modified (protegido) | Categoría Tazas |
| `admin/config.yml` | Modified (protegido) | Opción "tazas" en select tipo |
| `assets/uploads/` | Modified | JPGs nuevos, PNG comprimido |
| `robots.txt`, `sitemap.xml` | New | SEO técnico |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Conflicto con commits de Decap (admin escribe directo) | Med | Pull final antes de push; si hay conflicto, resolver y un solo commit |
| Romper Decap CMS al tocar protected files | Baja | Campos intactos; solo agregar valor "tazas" y editar valores |
| Imágenes grandes degradan carga | Med | Comprimir a JPG (~≤300 KB) y lazy loading |
| Descripciones/visión incorrectas de las fotos | Med | Revisión visual en servidor local antes del push |

## Rollback Plan

- Push único → si algo falla en producción, revert del último commit (`git revert`) y segundo push (crédito de respaldo ya contemplado).
- Los JSON y config.yml protegidos se restauran desde el commit anterior si Decap se rompiera.

## Dependencies

- Fotos fuente: `C:\Users\cesar\Desktop\Nueva carpeta\Web Eri\1.jpeg` … `21.jpeg`.
- URL pública para SEO/canonical: `https://pimientayron.netlify.app/`.

## Success Criteria

- [ ] Header muestra "Redes sociales" + Instagram + nota por mayor; footer ya no existe.
- [ ] Botones de WhatsApp muestran "Lorena".
- [ ] Categoría "Tazas · próximamente" visible y deshabilitada.
- [ ] Catálogo con productos nuevos + descripciones detalladas (comas y tildes correctas).
- [ ] `1000460488.png` ya no existe; reemplazado por JPG ≤ 300 KB y referencia actualizada.
- [ ] `curl https://pimientayron.netlify.app/` incluye meta tags, canonical, JSON-LD; robots.txt y sitemap.xml responden.
- [ ] Un solo commit y un solo push (créditos Netlify).