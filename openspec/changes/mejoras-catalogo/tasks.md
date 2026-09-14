# Tasks: Mejoras Catálogo Pimienta & Ron

## Fase 1 — Tanda A: Marca y Redes sociales (sin push)

- [ ] 1.1 `js/config.js`: renombrar `Chica 2` → `Lorena` en `CONFIG.contactos`; agregar `siteUrl: "https://pimientayron.netlify.app/"`.
- [ ] 1.2 `index.html`: agregar bloque `.social-block` al final de `.header-inner` con: `<p class="social-label">Redes sociales</p>`, `<a id="ig-link" class="social-btn" ...>Instagram</a>`, `<p class="social-note">Para ventas al por mayor contactarse por Whatsapp</p>`.
- [ ] 1.3 `index.html`: eliminar el elemento `<footer>` (líneas 46-48).
- [ ] 1.4 `css/styles.css`: estilos `.social-block` (flex column, alineado derecha, gap), `.social-label`, `.social-btn` (botón rust, pill), `.social-note`; responsive ≤600px (stack).
- [ ] 1.5 `css/styles.css`: eliminar reglas `.footer`/`footer a`.
- [ ] 1.6 Verificar que `app.js:20` sigue seteando `#ig-link` con `CONFIG.instagramUrl`.

## Fase 2 — Tanda B: SEO (sin push)

- [ ] 2.1 `index.html` `<head>`: `meta description`, `link canonical → https://pimientayron.netlify.app/`, tags `og:*` (title, description, type, url, image, site_name) y `twitter:*` (card, title, description, image). `og:image` → `/assets/logo.jpg`.
- [ ] 2.2 `index.html`: `<script type="application/ld+json">` estático con `Organization` + `WebSite` (name, url, sameAs: instagramUrl).
- [ ] 2.3 `js/app.js`: en `onDatosCargados`, inyectar `<script id="ld-items">` con `ItemList` (name, description, image absoluta, position); **no** inyectar si `DESIGNS` está vacío.
- [ ] 2.4 `js/products.js`: `.thumb` pasa a contenedor con `<img loading="lazy" decoding="async" alt="Alt de {nombre}">`; mantener placeholder "FOTO PENDIENTE" sin `<img>` roto.
- [ ] 2.5 `js/modal.js`: `.modal-thumb` pasa a `<img alt={nombre}>` (carga al abrir, sin lazy).
- [ ] 2.6 `css/styles.css`: `.thumb img` (cover, center, 100%, aspect en `.thumb`) y `.modal-thumb img`.
- [ ] 2.7 Crear `robots.txt` (User-agent: * / Allow: / + Sitemap).
- [ ] 2.8 Crear `sitemap.xml` (url canonical + lastmod 2026-09-14).
- [ ] 2.9 Imagen pesada: PowerShell System.Drawing → redimensionar `1000460488.png` (máx 1080px) → JPG q82 `buzo-bandera-flores.jpg`; **borrar** el PNG; actualizar ref en `productos.json`.

## Fase 3 — Tanda C: Contenido (archivos protegidos, sin push)

- [ ] 3.1 `content/categorias.json`: agregar `{ "id": "tazas", "etiqueta": "Tazas", "activa": false }`.
- [ ] 3.2 `admin/config.yml`: `options: ["remeras", "buzos", "tazas"]` en el widget select de `tipo`.
- [ ] 3.3 Revisar los 21 JPEG de `Web Eri` (Read) → clasificar por categoría, detectar duplicados con catálogo actual, y proponer lista producto→foto→nombre→descripción al usuario para aprobación.
- [ ] 3.4 Copiar/recortar JPEGs aprobados → `assets/uploads/<nombre-descriptivo>.jpg` comprimidos (máx 300KB, System.Drawing).
- [ ] 3.5 `content/productos.json`: agregar items nuevos (esquema `{nombre,tipo,descripcion,foto}` intacto).
- [ ] 3.6 `content/productos.json`: reescribir descripciones de TODOS los productos (detalle + ortografía); corregir coma de "Oso curioso".

## Fase 4 — Verificación (sin push)

- [ ] 4.1 Validar `productos.json` y `categorias.json` con `ConvertFrom-Json`.
- [ ] 4.2 Verificar que cada `foto` existe en `assets/uploads/` y que ningún ref apunta a `1000460488.png`.
- [ ] 4.3 Verificar `admin/config.yml` YAML válido (parse con PowerShell `ConvertFrom-Yaml` si está disponible) y campos del contrato intactos.
- [ ] 4.4 Servidor estático local → revisión visual (header, modal, filtro Tazas, botones WhatsApp, imágenes).
- [ ] 4.5 Verificar escenarios de las specs (social-header, seo, catalogo-contenido).

## Fase 5 — Aprobación y despliegue

- [ ] 5.1 Mostrar `git diff --stat` y resumen al usuario para **aprobación explícita**.
- [ ] 5.2 Tras aprobación: `git pull` final (integrar commits de Decap si hubo) → `git commit` único → `git push` único.
- [ ] 5.3 Confirmar build en Netlify y verificar `https://pimientayron.netlify.app/` (meta, JSON-LD, robots, sitemap).