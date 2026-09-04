// ---- Coordinación de la aplicación ----
// Posee el estado global, las referencias al DOM y conecta los módulos:
// data.js -> render; filters.js -> selección; products.js -> modal.js.
// El frontend consume content/productos.json y content/categorias.json,
// que son el contrato de datos con Decap CMS.

// ---- Referencias al DOM ----
const igLink = document.getElementById("ig-link");
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
}

function onErrorCarga(){
  loadingEl.textContent = "No se pudo cargar el catálogo. Probá recargar la página.";
}

// ---- Inicialización ----
Modal.init(CONFIG.contactos);
Data.cargar(onDatosCargados, onErrorCarga);