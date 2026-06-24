import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/categorias">Categorías</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        {user && user.isAdmin && (
          <li><Link to="/admin">Admin</Link></li>
        )}
       
        <li>
          <Link to="/carrito" className='cart-link'>
          <span className="cart-icon">🛒</span>
          {totalItems > 0 && (<span className='cart-count'>{totalItems}</span>)}
          </Link>
        </li>
        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/registro">Registro</Link></li>
          
          </>                 
        ) : (
          <>
            <li><Link to="/perfil">Perfil</Link></li>
            <li><button onClick={logout} className='nav-logout'>Cerrar Sesión</button></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar