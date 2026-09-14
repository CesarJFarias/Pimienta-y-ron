// ---- CONFIGURACIÓN (editar acá) ----
// Cada contacto es un vendedor. Solo se muestra el "nombre" en la web,
// el número queda ofuscado en base64 y se decodifica en runtime.
// Para cambiarlo: codificar el número con btoa("549261...") desde la consola del navegador.
const CONFIG = {
  contactos: [
    { nombre: "Erica", numero: atob("NTQ5MjYxMzQwMDMzNg==") },
    { nombre: "Lorena", numero: atob("NTQ5MjYxMzYzMzUyOA==") }
  ],
  instagramUrl: "https://www.instagram.com/pimienta_yron",
  siteUrl: "https://pimientayron.netlify.app/"
};