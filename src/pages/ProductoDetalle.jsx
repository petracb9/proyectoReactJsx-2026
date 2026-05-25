import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import productos from '../data/productos.json'

function ProductoDetalle() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)

  const encontrado = productos.find(p => p.id === Number(id))
    
  if (!encontrado) {
   return (
      <div className="page-not-found">
        <h2>Producto no encontrado</h2>
        <Link to="/productos">Volver al catálogo</Link>
      </div>
    )
  }

  return (
    <div className="detalle-container">
      <img src={producto.imagen} alt={producto.nombre} className="detalle-img" />
      <div className="detalle-info">
        <span className="item-categoria">{producto.categoria}</span>
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <strong className="detalle-precio">
          ${producto.precio.toLocaleString('es-AR')}
        </strong>
        <Link to="/carrito">
          <button className="item-btn">Agregar al carrito</button>
        </Link>
      </div>
    </div>
  )
}

export default ProductoDetalle