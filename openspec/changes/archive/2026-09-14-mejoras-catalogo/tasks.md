# Tasks: Mejoras Catálogo Pimienta & Ron

## Fase 1 — Tanda A: Marca y Redes sociales (sin push)

- [x] 1.1 `js/config.js`: renombrar `Chica 2` → `Lorena` en `CONFIG.contactos`; agregar `siteUrl: "https://pimientayron.netlify.app/"`.
- [x] 1.2 `index.html`: agregar bloque `.social-block` al final de `.header-inner` con: `<p class="social-label">Nuestras redes sociales</p>`, `<a id="ig-link" class="social-btn">Instagram</a>`, `<p class="social-note">Empresas y revendedores...</p>`, `<a id="wa-mayorista" class="social-btn">WhatsApp</a>`.
- [x] 1.3 `index.html`: eliminar el elemento `<footer>`.
- [x] 1.4 `css/styles.css`: estilos `.social-block`, `.social-label`, `.social-btn` (círculo fuego con SVG), `.social-note`; responsive por `flex-wrap` del header.
- [x] 1.5 `css/styles.css`: eliminar reglas `.footer`/`footer a`.
- [x] 1.6 Verificar que `app.js` sigue seteando `#ig-link` con `CONFIG.instagramUrl` y ahora también `#wa-mayorista` (Erica, mensaje por mayor).

## Fase 2 — Tanda B: SEO (sin push)

- [x] 2.1 `index.html` `<head>`: `meta description`, `link canonical`, tags `og:*` y `twitter:*`, `og:image` → `/assets/logo.jpg`.
- [x] 2.2 `index.html`: `<script type="application/ld+json">` estático con `Organization` + `WebSite`.
- [x] 2.3 `js/app.js`: inyección de `<script id="ld-items">` con `ItemList`; no inyecta si `DESIGNS` está vacío.
- [x] 2.4 `js/products.js`: `.thumb` con `<img loading="lazy" decoding="async" alt>`, placeholder "FOTO PENDIENTE" sin `<img>` roto.
- [x] 2.5 `js/modal.js`: `.modal-thumb` con `<img alt={nombre}>`.
- [x] 2.6 `css/styles.css`: `.thumb img` y `.modal-thumb img`.
- [x] 2.7 Crear `robots.txt`.
- [x] 2.8 Crear `sitemap.xml`.
- [x] 2.9 Imagen pesada: `1000460488.png` → `buzo-bandera-flores.jpg` (1080px, q82, 256KB); PNG borrado; ref actualizada.

## Fase 3 — Tanda C: Contenido (archivos protegidos, sin push)

- [x] 3.1 `content/categorias.json`: agregar `{ "id": "tazas", "etiqueta": "Tazas", "activa": false }`.
- [x] 3.2 `admin/config.yml`: `options: ["remeras", "buzos", "tazas"]`.
- [x] 3.3 Revisar JPEGs de `Web Eri`: 13 presentes; por hash, `5.jpeg`=remera-1 y `20.jpeg`=Flor de Corazón (públicos); 11 nuevos (4, 6, 8, 9, 14, 15, 16, 17, 18, 19, 21).
- [x] 3.4 Copiar 11 JPEGs → `assets/uploads/<nombre-descriptivo>.jpg` (renombrados por diseño).
- [x] 3.5 `content/productos.json`: 11 productos nuevos con título y descripción reales provistos por el usuario.
- [x] 3.6 `content/productos.json`: descripciones reescritas (detalle + ortografía + mención de algodón); corrección de titTulos y casing en todo el catálogo.

## Fase 4 — Verificación (sin push)

- [x] 4.1 Validar `productos.json` y `categorias.json` con `ConvertFrom-Json`.
- [x] 4.2 Verificar que cada `foto` existe en `assets/uploads/` y que ningún ref apunta a `1000460488.png`.
- [x] 4.3 Verificar `admin/config.yml` y contrato de datos intacto.
- [x] 4.4 Servidor estático local → revisión visual (header, modal, filtro Tazas, botones, imágenes, SEO).
- [x] 4.5 Verificar escenarios de las specs (social-header, seo, catalogo-contenido) + auditoría de seguridad y QA (CSP/via `_headers`, numeros WhatsApp ofuscados en base64, textContent en todo render → sin XSS).

## Fase 5 — Aprobación y despliegue

- [x] 5.1 Mostrar `git diff --stat` y resumen al usuario para **aprobación explícita**.
- [x] 5.2 Tras aprobación: `git pull` final → `git commit` único (`19b3f18`) → `git push` único (`f72c120..19b3f18`).
- [x] 5.3 Confirmar build en Netlify y verificar `https://pimientayron.netlify.app/` (pendiente: confirmación del build en Netlify dashboard).