import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import './Header.css'

function Header({ cantidadCarrito }) {
  return (
    <header className="header">
      <div className='header-brand'>
        <Link to="/" className="brand">
          <img src="/images/logo.png" 
             alt="Logo de TropicGlass" 
             className="header-logo" />
      
          <div> 
              <h1 className="header-title">TropicGlass</h1>
          </div>

       </Link>

       <Navbar cantidadCarrito={cantidadCarrito} />
      </div>

      <div className="hero">
        <div className="hero-content">
          <h2>Coctelería tropical para momentos especiales </h2>
          <p>
            Diseños frescos, personalizados y listos para acompañar tus bebidas
            favoritas con estilo.
          </p>

          <Link to="/productos" className="hero-button">
            Ver Productos
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header 
