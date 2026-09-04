// ---- Productos / cards ----
// Render de la grilla de productos. No conoce el modal ni el estado global:
// cuando el usuario selecciona un producto emite onProductClick(item) y
// app.js decide qué hacer con eso.
const Products = {
  render({ contenedor, diseños, tipoActivo, onProductClick, onEmpty }){
    const items = tipoActivo === "todas" ? diseños : diseños.filter(d => d.tipo === tipoActivo);
    contenedor.innerHTML = "";
    onEmpty(items.length === 0);

    items.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Ver detalle de " + item.nombre);
      card.addEventListener("click", () => onProductClick(item));
      card.addEventListener("keydown", e => {
        if(e.key === "Enter" || e.key === " "){
          e.preventDefault();
          onProductClick(item);
        }
      });

      const thumb = document.createElement("div");
      thumb.className = "thumb";
      if(item.foto){
        thumb.style.backgroundImage = "url(" + item.foto + ")";
      } else {
        const mark = document.createElement("span");
        mark.className = "thumb-mark";
        mark.textContent = "FOTO PENDIENTE";
        thumb.appendChild(mark);
      }

      const body = document.createElement("div");
      body.className = "card-body";

      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1);

      const name = document.createElement("p");
      name.className = "card-name";
      name.textContent = item.nombre;

      const desc = document.createElement("p");
      desc.className = "card-desc";
      desc.textContent = item.descripcion;

      body.append(badge, name, desc);
      card.append(thumb, body);
      contenedor.appendChild(card);
    });
  }
};