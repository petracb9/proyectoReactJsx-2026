import {Link} from "react-router-dom"
import './Item.css'

function Item({ producto }) {
  const { id, nombre, precio, descripcion, imagen, categoria } = producto
 
  return (
    <div className="item-card">
      <img src={imagen} alt={nombre} className="item-img" />
      <div className="item-info">
        <span className="item-categoria">{categoria}</span>
        <h3 className="item-nombre">{nombre}</h3>
        <p className="item-descripcion">{descripcion}</p>
        <div className="item-footer">
          <strong className="item-precio">${precio.toLocaleString('es-AR')}</strong>
          <button className="item-btn">Agregar al carrito</button>
          <Link to={`/producto/${id}`} className="item-link"></Link>
        </div>
      </div>
    </div>
  )
}

export default Item