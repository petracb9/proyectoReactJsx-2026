import Item from "./Item"
import './ItemList.css'

function ItemList({ productos }) {
  return (
    <div className="catalogo-grid">
      {productos.map((producto) => (
        <Item key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

export default ItemList