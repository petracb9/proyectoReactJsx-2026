import productos from "../data/productos.json";
import Item from "../components/catalog/Item";

function Categorias() {
  const vasosAltos = productos.filter(
    (producto) => producto.categoria === "vasos-altos"
  );

  const vasosCortos = productos.filter(
    (producto) => producto.categoria === "vasos-cortos"
  );

  return (
    <div className="categories-page">
      <div className="page-title">
        <h2>Categorías</h2>
        <p>Elige el estilo de vaso ideal para cada bebida.</p>
      </div>

      <div className="category-section">
        <h3 className="category-title">Vasos altos tropicales</h3>

        <div className="products-grid">
          {vasosAltos.map((producto) => (
            <Item key={producto.id} producto={producto} />
          ))}
        </div>
      </div>

      <div className="category-section">
        <h3 className="category-title">Vasos cortos premium</h3>

        <div className="products-grid">
          {vasosCortos.map((producto) => (
            <Item key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categorias