import { Link } from "react-router-dom"
import './Header.css'

function Header() {
  return (
    <header className="header">
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
