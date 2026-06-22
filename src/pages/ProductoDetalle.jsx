import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import productos from '../data/productos.json'
import './ProductoDetalle.css'

function ProductoDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const producto = productos.find(p => p.id === Number(id))

  if (!producto) {
   return (
      <div className="page-not-found">
        <h2>Producto no encontrado</h2>
        <Link to="/productos">Volver al catálogo</Link>
      </div>
    )
  }

  function handleAddToCart() {
    addToCart(producto)
    navigate('/carrito')
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
      
        <button className="item-btn" onClick={handleAddToCart}>
           Agregar al carrito
        </button>
      </div>
    </div>
  )
}

export default ProductoDetalle