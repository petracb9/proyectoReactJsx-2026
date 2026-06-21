import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Navbar.css'

function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/categorias">Categorías</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li>
          <Link to="/carrito" className='cart-link'>
          <span className="cart-icon">🛒</span>
          {totalItems > 0 && (<span className='cart-count'>{totalItems}</span>)}
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar