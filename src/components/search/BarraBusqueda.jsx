import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import './BarraBusqueda.css'

function BarraBusqueda({ busqueda, onBuscar }) { 
  const [inputValue, setInputValue] = useState(busqueda || '')
  useEffect(() => {
    setInputValue(busqueda);
  }, [busqueda]);
 
  const handleChange = (e) => {
    const valor = e.target.value;
    setInputValue(valor)
  
  if (valor.trim() === '') {
      onBuscar('');
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onBuscar(inputValue)
  }
 
  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar vasos personalizados..."
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit" className="search-button" aria-label="Buscar">
          <FiSearch className="search-icon" />
        </button>
      </div>
    </form>
  )
    
}

export default BarraBusqueda