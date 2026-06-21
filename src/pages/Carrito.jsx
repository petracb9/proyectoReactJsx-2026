import {useCart} from '../context/CartContext'
import { Link } from 'react-router-dom'
import './Carrito.css'

function Carrito() {
  const { carrito, removeFromCart, clearCart, totalItems, totalPrecio } = useCart()

  if (carrito.length === 0) {
     return (
      <div className="carrito-vacio">
        <span className="carrito-empty-icon">🛒</span>
        <h2>Tu carrito esta vacio</h2>
        <p>Todavia no agregaste productos.</p>
        <Link to="/productos" className="cart-btn">Ver productos</Link>
      </div>
    )
  }

  return (
    <div className="carrito-container">
      <h2 className="page-title">Tu Carrito</h2>
  
      <div className="cart-list">
            {carrito.map((producto) => (
              <div key={producto.id} className="cart-item">
                <div className="cart-item-header">
                  <h3>{producto.nombre}</h3>
                  <button
                    className="cart-remove"
                    onClick={() => removeFromCart(producto.id)}
                  >
                    Eliminar
                  </button>
                </div>
                <p>Categoría: {producto.categoria}</p>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Precio unitario: ${producto.precio.toLocaleString('es-AR')}</p>
                <p>Subtotal: ${(producto.precio * producto.cantidad).toLocaleString('es-AR')}</p>
              </div>
            ))}
      </div>

          <div className="cart-summary">
            <p>Total unidades: {totalItems}</p>
            <p>Total precio: ${totalPrecio.toLocaleString('es-AR')}</p>
            <button className="cart-clear" onClick={clearCart}>
              Vaciar carrito
            </button>
            <Link to="/productos" className="cart-link">
              Seguir comprando
            </Link>
            <button className="cart-btn">
              Finalizar compra
            </button>
          </div>
    </div>
  )
}

export default Carrito