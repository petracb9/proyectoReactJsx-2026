import {useCart} from '../context/CartContext'
import { Link } from 'react-router-dom'
import './Carrito.css'

function Carrito() {
  const { carrito, removeFromCart, clearCart, totalItems, totalPrecio } = useCart()

  return (
    <div className="carrito-container">
      <h2 className="page-title">Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="cart-list">
          {carrito.map((producto, index) => (
            <div key={index} className="cart-item">
              <h3>{producto.nombre}</h3>
              <p>${producto.precio}</p>
            </div>
          ))}
        </div>
      )}
      <p className="page-subtitle">Todavía no agregaste productos.</p>
    </div>
  )
}

export default Carrito