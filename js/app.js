// ---- Coordinación de la aplicación ----
// Posee el estado global, las referencias al DOM y conecta los módulos:
// data.js -> render; filters.js -> selección; products.js -> modal.js.
// El frontend consume content/productos.json y content/categorias.json,
// que son el contrato de datos con Decap CMS.

// ---- Referencias al DOM ----
const igLink = document.getElementById("ig-link");
const waMayorista = document.getElementById("wa-mayorista");
const filtersEl = document.getElementById("filters");
const gridEl = document.getElementById("grid");
const emptyEl = document.getElementById("empty");
const loadingEl = document.getElementById("loading");

// ---- Estado ----
let CATEGORIES = [];
let DESIGNS = [];
let activeFilter = "todas";

// ---- Instagram ----
igLink.href = CONFIG.instagramUrl;

// ---- WhatsApp (ventas al por mayor) ----
const waContacto = CONFIG.contactos.find(c => c.nombre === "Erica");
const waMsg = encodeURIComponent("Hola! Me interesa comprar al por mayor");
if(waContacto) waMayorista.href = "https://wa.me/" + waContacto.numero + "?text=" + waMsg;

// ---- Filtros ----
function seleccionarFiltro(id){
  activeFilter = id;
  renderFilters();
  renderGrid();
}

function renderFilters(){
  Filters.render({
    contenedor: filtersEl,
    categorias: CATEGORIES,
    activo: activeFilter,
    onSeleccionar: seleccionarFiltro
  });
}

// ---- Productos ----
function renderGrid(){
  Products.render({
    contenedor: gridEl,
    diseños: DESIGNS,
    tipoActivo: activeFilter,
    onProductClick: item => Modal.abrir(item),
    onEmpty: esVacio => {
      emptyEl.style.display = esVacio ? "block" : "none";
    }
  });
}

// ---- Datos ----
function onDatosCargados(resultado){
  DESIGNS = resultado.designs;
  CATEGORIES = resultado.categories;
  loadingEl.style.display = "none";
  renderFilters();
  renderGrid();
  inyectarItemList();
}

// ---- SEO: ItemList dinámico (datos estructurados) ----
function inyectarItemList(){
  const prev = document.getElementById("ld-items");
  if(prev) prev.remove();

  if(DESIGNS.length === 0) return;

  const base = CONFIG.siteUrl.replace(/\/$/, "");
  const node = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: DESIGNS.map((d, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Product",
        "name": d.nombre,
        "description": d.descripcion,
        "image": base + d.foto
      }
    }))
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "ld-items";
  script.textContent = JSON.stringify(node);
  document.head.appendChild(script);
}

function onErrorCarga(){
  loadingEl.textContent = "No se pudo cargar el catálogo. Probá recargar la página.";
}

// ---- Inicialización ----
Modal.init(CONFIG.contactos);
Data.cargar(onDatosCargados, onErrorCarga);