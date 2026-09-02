# Catálogo Pimienta & Ron — cómo publicarlo

Esta versión ya no se abre como un archivo suelto: como la página busca
los productos en `content/productos.json` en vivo, necesita estar
subida a un hosting para funcionar (abrirla con doble clic no va a
mostrar los productos). Los pasos de acá abajo la dejan publicada,
gratis, con el panel de administración funcionando en `/admin`.

## 1. Subir el proyecto a GitHub

1. Creá una cuenta en https://github.com si no tenés.
2. Creá un repositorio nuevo (puede ser privado).
3. Subí esta carpeta completa a ese repositorio (arrastrando los
   archivos desde la web de GitHub alcanza, no hace falta usar la
   terminal).

## 2. Conectar el repositorio a Netlify

1. Creá una cuenta en https://netlify.com (podés entrar directo con
   la cuenta de GitHub).
2. "Add new site" → "Import an existing project" → elegís el
   repositorio que acabás de subir.
3. Dejá todo por defecto (no hace falta configurar comando de build
   ni carpeta de publicación) y le das "Deploy".
4. En unos segundos vas a tener una URL tipo
   `nombre-random.netlify.app`. Se puede cambiar por un nombre más
   lindo en "Site settings" → "Change site name".

## 3. Activar el panel de administración

1. Dentro del sitio en Netlify, andá a "Site configuration" →
   "Identity" y activalo.
2. En "Registration preferences" elegí "Invite only" (para que nadie
   más se pueda registrar solo).
3. Andá a "Identity" → "Services" → activá "Git Gateway".
4. En la pestaña "Identity" del sitio, "Invite users" y mandale la
   invitación por mail a tu familiar. Le va a llegar un mail para
   crear su contraseña.

## 4. Usar el panel

Una vez invitada, tu familiar entra a `tusitio.netlify.app/admin`,
inicia sesión con el mail y la contraseña que creó, y ya puede:

- Agregar, editar o borrar productos (con foto incluida, arrastrando
  la imagen).
- Agregar categorías nuevas o activar "Gorras" cuando corresponda.

Los cambios quedan visibles en la web en un minuto aproximadamente.

## Configuración pendiente en el código

- Número de WhatsApp y link de Instagram: en `index.html`, dentro del
  bloque `<script>` al final, están las constantes `WHATSAPP_NUMBER`
  e `INSTAGRAM_URL`.
