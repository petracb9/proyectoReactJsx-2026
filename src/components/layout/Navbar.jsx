import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen)
  }

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
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/categorias">Categorías</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        {user && (
          <li><Link to="/admin">Admin</Link></li>
        )}
      </ul>
       
        
        {!user ? (
          <>
            <li><Link to="/login">Ingresar</Link></li>
            <li><Link to="/registro">Registrarse</Link></li>
          </>                 
        ) : (
          <>
            <li><Link to="/perfil">Perfil</Link></li>
            <li><button onClick={handleLogout} className='nav-logout'>Salir</button></li>
          </>
        )}

        <li>
          <Link to="/carrito" className='cart-link'>
          <span className="cart-icon">🛒</span>
          {totalItems > 0 && (<span className='cart-count'>{totalItems}</span>)}
          </Link>
        </li>
      
    </nav>
  )
}

export default Navbar