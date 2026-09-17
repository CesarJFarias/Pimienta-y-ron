# Catálogo Contenido Specification

## Purpose

Define catalog content changes: the new "Tazas" category, new products sourced from the Web Eri photo set, enriched descriptions, and Decap CMS compatibility.

## Requirements

### Requirement: Tazas category added

`content/categorias.json` **MUST** include a category with id `tazas`, etiqueta `Tazas` and `activa: true`.

#### Scenario: Filter is active

- GIVEN the catalog page loads
- WHEN filters render
- THEN an active button reads "Tazas"
- AND clicking it shows the products of that category

#### Scenario: Admin selects category

- WHEN `admin/config.yml` is loaded by Decap CMS
- THEN the `tipo` select widget includes the option `tazas`
- AND existing options `remeras`, `buzos` remain selectable

### Requirement: New products added

`content/productos.json` **MUST** include the new products derived from the numbered JPEGs (`1.jpeg`–`21.jpeg`). Each item **MUST** follow `{nombre, tipo, descripcion, foto}`; `tipo` **MUST** reference an existing category id; `foto` **MUST** reference an existing file under `assets/uploads/` with a descriptive filename.

#### Scenario: New product appears

- GIVEN a new product was added to the JSON
- WHEN the grid renders under its category filter
- THEN a card shows name, description and the referenced image

#### Scenario: Image exists

- GIVEN the JSON references a photo
- WHEN the deployment serves the file
- THEN the referenced path resolves to an existing image in `assets/uploads/`

### Requirement: Descriptions enriched

Every product description **MUST** be rewritten with meaningful detail (materials, colors, style, use) and correct Spanish orthography (accents, commas, spacing). The "Oso curioso" description **MUST NOT** contain the malformed `"Ilustración ,delineado "` fragment.

#### Scenario: Oso curioso fixed

- GIVEN `productos.json` is read
- WHEN inspecting the "Oso curioso" item
- THEN its description is well-formed with no stray comma

#### Scenario: All descriptions non-empty

- GIVEN the catalog data loads
- WHEN rendering each product
- THEN no description is empty or shorter than two words

### Requirement: Decap CMS compatibility

The data contract **MUST** remain unchanged: field names `nombre`, `tipo`, `descripcion`, `foto` (products) and `id`, `etiqueta`, `activa` (categories). No data migrations, no schema changes. The admin panel **MUST** continue to read and write the same JSON collections.

#### Scenario: Admin loads after change

- GIVEN `admin/config.yml` and the JSON files are updated
- WHEN the admin panel opens `/admin`
- THEN the CMS lists the same collections with the `tazas` option available
- AND creating/editing a product persists without error