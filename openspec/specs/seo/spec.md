# SEO Specification

## Purpose

Define on-page SEO, structured data, technical SEO files, image indexing, and performance constraints for the static catalog. No build step, no SSR (per AGENTS.md).

## Requirements

### Requirement: Head metadata

The `<head>` **MUST** include: `<meta name="description">`, `<link rel="canonical" href="https://pimientayron.netlify.app/">`, Open Graph tags (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`) and Twitter tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`). The canonical URL **SHALL** be the only value used in `og:url`.

#### Scenario: Crawler reads head

- GIVEN the catalog page is served
- WHEN a crawler parses the HTML
- THEN description, canonical and OG/Twitter tags are present
- AND `og:url` matches the canonical URL

### Requirement: Structured data (JSON-LD)

The page **MUST** embed JSON-LD for `Organization` and `WebSite` statically, and **MUST** inject an `ItemList` JSON-LD node once products are loaded, where each item exposes `name`, `description`, `image` and `url`.

#### Scenario: Products loaded

- GIVEN the catalog finished loading products
- WHEN the app renders the grid
- THEN a JSON-LD `ItemList` script reflects the loaded products with name, description and image

#### Scenario: No products

- GIVEN the catalog has zero products in a category
- WHEN no items are loaded at all
- THEN no `ItemList` node is injected (null render)

### Requirement: Technical SEO files

`robots.txt` **MUST** allow crawling and reference `sitemap.xml`. `sitemap.xml` **MUST** list `https://pimientayron.netlify.app/` as a URL entry with `lastmod`.

#### Scenario: static files served

- GIVEN the site is deployed
- WHEN `/robots.txt` is requested
- THEN it returns crawl permissions and the sitemap URL
- AND `/sitemap.xml` is requested, it lists the canonical URL

### Requirement: Indexable product images

Product card thumbnails **MUST** render as `<img>` elements with descriptive `alt` text (`alt` derived from the product name) and **SHOULD** use `loading="lazy"` and `decoding="async"`.

#### Scenario: Card renders image

- GIVEN a product has a photo
- WHEN its card renders
- THEN the thumbnail is an `<img>` with alt matching the product name and lazy loading active

#### Scenario: Missing photo

- GIVEN a product has no photo
- WHEN its card renders
- THEN a "FOTO PENDIENTE" placeholder is shown instead of a broken image

### Requirement: Main image performance

The "Bandera y flores" product photo **MUST** be served as an optimized JPG of at most 300 KB (replacing `assets/uploads/1000460488.png`, 2.6 MB). The reference in `content/productos.json` **MUST** point to the new file and **MUST NOT** reference the deleted PNG.

#### Scenario: Page weight

- GIVEN the catalog page loads
- WHEN the main product images load
- THEN the heaviest image does not exceed 300 KB
- AND no request resolves to `1000460488.png`

### Requirement: Cart-data contract untouched

The data fields `nombre`, `tipo`, `descripcion`, `foto` **MUST** keep their names; SEO changes **MUST NOT** alter the structure consumed by Decap CMS.