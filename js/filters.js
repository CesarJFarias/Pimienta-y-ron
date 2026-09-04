// ---- Filtros ----
// Render de los botones de categoría. No conoce el estado global:
// recibe las categorías, la categoría activa y un callback para seleccionar.
const Filters = {
  render({ contenedor, categorias, activo, onSeleccionar }){
    contenedor.innerHTML = "";
    categorias.forEach(cat => {
      const btn = document.createElement("button");
      const disabled = cat.activa === false;
      btn.className = "filter-btn" + (cat.id === activo ? " active" : "") + (disabled ? " disabled" : "");
      btn.textContent = disabled ? cat.etiqueta + " · próximamente" : cat.etiqueta;
      btn.type = "button";
      if(!disabled){
        btn.addEventListener("click", () => {
          onSeleccionar(cat.id);
        });
      }
      contenedor.appendChild(btn);
    });
  }
};