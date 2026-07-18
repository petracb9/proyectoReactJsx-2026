import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { FiMenu, FiX} from 'react-icons/fi'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {setIsMenuOpen(!isMenuOpen)}
  const cerrarMenu = () => {setIsMenuOpen(false)}
  const CORREO_ADMIN = "cpethernandez8@gmail.com" //cambia el correo por admin@tropicglass el que quieras que sea admin

  async function handleLogout() {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand-wrapper" onClick={cerrarMenu}>
          <img src="/images/logo.png" alt="Logo" className="header-logo" />
          <span className="navbar-brand-title">TropicGlass</span>
        </Link>

        <button className="menu-hamburger-btn" onClick={toggleMenu} aria-label="Abrir menú">
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <ul className={`nav-links-wrapper ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={cerrarMenu}>Inicio</Link></li>
          <li><Link to="/categorias" onClick={cerrarMenu}>Categorías</Link></li>
          <li><Link to="/productos" onClick={cerrarMenu}>Productos</Link></li>
          {user && user.email === CORREO_ADMIN && (
            <li><Link to="/admin" onClick={cerrarMenu}>Admin</Link></li>
          )}

          {!user ? (
            <>
              <li><Link to="/login" onClick={cerrarMenu}>Ingresar</Link></li>
              <li><Link to="/registro" onClick={cerrarMenu}>Registrarse</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/perfil" onClick={cerrarMenu}>Mi Perfil</Link></li>
              <li><button onClick={handleLogout} className='nav-logout'>Salir</button></li> 
            </>
          )}

          <li className='cart-item-li'>
            <Link to="/carrito" className='cart-link' onClick={cerrarMenu}>
              <span className="cart-icon">🛒</span>
              {totalItems > 0 && <span className='cart-count'>{totalItems}</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar