// ---- Carga de datos ----
// Lee los JSON que componen el contrato de datos con Decap CMS.
// No conoce el DOM: delega el resultado vía callbacks a app.js.
const Data = {
  async cargar(onSuccess, onError){
    try{
      const [productosRes, categoriasRes] = await Promise.all([
        fetch("content/productos.json?_=" + Date.now()),
        fetch("content/categorias.json?_=" + Date.now())
      ]);
      const productosData = await productosRes.json();
      const categoriasData = await categoriasRes.json();

      const designs = productosData.items || [];
      const categories = [{ id: "todas", etiqueta: "Todas", activa: true }, ...(categoriasData.items || [])];

      onSuccess({ designs, categories });
    } catch (err){
      onError();
    }
  }
};