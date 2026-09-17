# Social Header Specification

## Purpose

Define the redes sociales presence in the catalog header, the Instagram link relocation, phone-wholesale copy, and the WhatsApp contact labels shown on product buttons.

## Requirements

### Requirement: Header right block "Redes sociales"

The header **MUST** show two blocks aligned at opposite ends: the existing brand block (Pimienta & Ron) on the left, and a new block labeled "Redes sociales" on the right.

#### Scenario: Desktop layout

- GIVEN the catalog page loads on a wide viewport
- WHEN the header renders
- THEN the "Redes sociales" block is placed at the far right, opposite to the brand title
- AND the brand block remains unchanged

#### Scenario: Mobile layout

- GIVEN a narrow viewport (≤600px)
- WHEN the header renders
- THEN the "Redes sociales" block stacks under the brand block without overflow

### Requirement: Instagram button under label

A button labeled "Instagram" **MUST** appear directly below the "Redes sociales" label, linking to `CONFIG.instagramUrl`, opening in a new tab with `rel="noopener"`.

#### Scenario: Open Instagram

- GIVEN the header is rendered
- WHEN the user clicks the Instagram button
- THEN a new tab opens with the URL configured in `js/config.js`

### Requirement: Wholesale note

The static text "Ventas mayorista, minorista, eventos y empresas. Contanos tu idea acá" **MUST** appear below the Instagram button and **MUST NOT** be clickable.

#### Scenario: Note is static

- GIVEN the header is rendered
- WHEN the user inspects the note below the Instagram button
- THEN it displays the wholesale text as plain content
- AND clicking it triggers no navigation

### Requirement: Footer removed

The footer element **MUST** no longer exist in the page, and its styles **MUST** be removed from the stylesheet.

#### Scenario: Page bottom

- GIVEN the catalog page loads
- WHEN reaching the bottom of the page
- THEN no footer bar is rendered

### Requirement: WhatsApp contact labels

The WhatsApp contact buttons **MUST** display configured names from `CONFIG.contactos`. The test name "Chica 2" **MUST** be changed to "Lorena"; phone numbers must remain unchanged.

#### Scenario: Product modal shows contacts

- GIVEN a product modal is open
- WHEN the contact buttons render
- THEN one button reads "Consultar con Lorena"
- AND its `wa.me` link uses the same number as before

#### Scenario: Number unchanged

- GIVEN the configuration was renamed
- WHEN the contact button opens WhatsApp
- THEN the destination number is identical to the pre-rename number