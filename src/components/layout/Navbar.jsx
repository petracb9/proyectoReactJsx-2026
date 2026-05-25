import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar({ cantidadCarrito }) {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/categorias">Categorías</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/carrito">Carrito 🛒 ({ cantidadCarrito > 0 && <span className='cart-count'>{cantidadCarrito}</span> })</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar