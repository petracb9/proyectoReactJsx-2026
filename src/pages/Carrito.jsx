import {useCart} from '../context/CartContext'
import { Link } from 'react-router-dom'
import './Carrito.css'

function Carrito() {
  const { 
    carrito, 
    removeFromCart, 
    clearCart,
    cantidadMas, 
    cantidadMenos, 
    totalItems, 
    totalPrecio,  
  } = useCart()

  if (carrito.length === 0) {
     return (
      <div className="carrito-vacio">
        <span className="carrito-empty-icon">🛒</span>
        <h2>Tu carrito esta vacio</h2>
        <p>Todavia no agregaste productos.</p>
        <Link to="/productos" className="cart-btn-link">Ver productos</Link>
      </div>
     )
   }

  return (
    <div className="carrito-container">
      <h2 className="page-title">Tu Carrito</h2>
  
      <div className="cart-list">
          {carrito.map((producto) => (
          <div key={producto.id} className="cart-item">
            <div className="cart-item-top-row">
              <div className="cart-item-detalle">
                <h3>{producto.nombre}</h3>
                <span className='cart-item-categoria'>Categoría: {producto.categoria}</span>
              </div>
              
              <div className='cart-item-meta'>

                <div className="cart-item-acciones">

                  <button className="btn-contador btn-minus" 
                    onClick={() => cantidadMenos(producto.id)}>
                    {producto.cantidad === 1 ? '🗑️' : '−'}
                  </button>
                  
                  <span className='cart-item-number'>{producto.cantidad}</span>
                        
                  <button className="btn-contador" 
                    onClick={() => cantidadMas(producto.id)}
                  >+</button>
                </div>
                               
                <span className='cart-item-precio'>Precio unitario: ${producto.precio.toLocaleString('es-AR')}</span>
                <span className='cart-item-subtotal'>Subtotal: <strong>${(producto.precio * producto.cantidad).toLocaleString('es-AR')}</strong></span>
              </div>
            </div>
            <button
                className="cart-delete-btn"
                onClick={() => removeFromCart(producto.id)}
              >
                Eliminar
            </button>
          </div>     
          ))}      
      </div> 

      <div className="cart-summary">
        <p>Total unidades: {totalItems}</p>
        <p>Total precio: ${totalPrecio.toLocaleString('es-AR')}</p>
        <button className="cart-clear" onClick={clearCart}>
          Vaciar carrito
        </button>
        <Link to="/productos" className="cart-link-btn">
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