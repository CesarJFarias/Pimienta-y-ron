// ---- Modal ----
// Vista de detalle de un producto con los botones de contacto por WhatsApp.
// Recibe la lista de contactos en init() y expone abrir(item) / cerrar().
const Modal = {
  init(contactos){
    this.contactos = contactos;
    this.el = document.getElementById("modal");
    this.thumb = document.getElementById("modal-thumb");
    this.badge = document.getElementById("modal-badge");
    this.name = document.getElementById("modal-name");
    this.desc = document.getElementById("modal-desc");
    this.contacts = document.getElementById("modal-contacts");
    this.close = this.el.querySelector(".modal-close");

    this.close.addEventListener("click", () => this.cerrar());
    this.el.addEventListener("click", e => {
      if(e.target === this.el) this.cerrar();
    });
    window.addEventListener("keydown", e => {
      if(e.key === "Escape" && this.el.classList.contains("open")) this.cerrar();
    });
  },

  abrir(item){
    this.badge.textContent = item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1);
    this.name.textContent = item.nombre;
    this.desc.textContent = item.descripcion;

    this.thumb.style.backgroundImage = item.foto
      ? "url(" + item.foto + ")"
      : "none";

    const msg = encodeURIComponent("Hola! Me interesa el diseño \"" + item.nombre + "\"");
    this.contacts.innerHTML = "";
    this.contactos.forEach(c => {
      const btn = document.createElement("a");
      btn.className = "contact-btn";
      btn.href = "https://wa.me/" + c.numero + "?text=" + msg;
      btn.target = "_blank";
      btn.rel = "noopener";
      btn.textContent = "Consultar con " + c.nombre;
      this.contacts.appendChild(btn);
    });

    this.el.classList.add("open");
    this.el.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  },

  cerrar(){
    this.el.classList.remove("open");
    this.el.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }
};