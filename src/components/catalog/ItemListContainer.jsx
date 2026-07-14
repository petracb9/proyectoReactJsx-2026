import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
//import productosData from '../../data/productos.json'
import Item from './Item'
import BarraBusqueda from '../search/BarraBusqueda'
import PaginadorProductos from './PaginadorProductos'
import './ItemListContainer.css'

const POR_PAGINA = 2 //Para la prueba o testear el componente de paginación.

const quitarAcentos = (texto) => {
  return texto ? texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : ""
}

function ItemListContainer({ categoria }) {
  const [busqueda, setBusqueda] = useState('')
  const [paginaActual, setPaginaActual] = useState(1)
  const [cargando, setCargando] = useState(true)

  const location = useLocation()

  useEffect(() => {
    setCargando(false)
  }, [])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const querySearch = queryParams.get('search') || ''
    setBusqueda(querySearch)
    setPaginaActual(1)
  }, [location.search, categoria])

  const porCategoria = categoria
    ? productosData.filter(p => p.categoria === categoria)
    : productosData

  const filtrados = porCategoria.filter((p) => {  
    const busquedaLimpia = quitarAcentos(busqueda.toLowerCase().trim())
    const nombreLimpio = quitarAcentos(p.nombre.toLowerCase())
    const descripcionLimpia = quitarAcentos(p.descripcion.toLowerCase())

    return (
      nombreLimpio.includes(busquedaLimpia) ||
      descripcionLimpia.includes(busquedaLimpia)
    )
  })
    
  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA)

  const productosPagina = filtrados.slice(
    (paginaActual - 1) * POR_PAGINA,
    paginaActual * POR_PAGINA
  )

  function handleBuscar(texto) {
    setBusqueda(texto)
    setPaginaActual(1)
  }

  if (cargando) {
    return (
      <div className="catalogo-spinner">
        <div className="spinner"></div>
        <p className="charge-spinner">Cargando productos...</p>
      </div>
    )
  }

  return (
    <div className="catalog-container">
      <div className="item-list-title">
        <h2 className='page-title'>Catálogo de Productos</h2>
        <p className='page-subtitle'>
          Conoce nuestra selección de vasos personalizados para cócteles,
          eventos y momentos especiales.
        </p>
      </div>

      <BarraBusqueda busqueda={busqueda} onBuscar={handleBuscar} />

      {filtrados.length === 0 ? (
        <div className="catalogo-error-wrapper"> 
          <p className="catalogo-message">
            No se encontraron productos para "{busqueda}"
          </p>
          <button 
            onClick={() => handleBuscar('')} 
            className="producto-link-volver">
            Volver al catálogo
          </button>
        </div>
      ) : (
        <>
        <div className="products-grid">
          {productosPagina.map((producto) => (
            <Item key={producto.id} producto={producto} />
          ))}
        </div>

         <PaginadorProductos
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            onCambiarPagina={setPaginaActual}
          />
        </>
      )}
    </div>
  )
}

export default ItemListContainer