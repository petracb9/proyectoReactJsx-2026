import { useState, useEffect } from "react"
import productosData from '../../data/productos.json'
import Item from "./Item"
import ItemList from "./ItemList"
import BarraBusqueda from '../search/BarraBusqueda'
import PaginadorProductos from './PaginadorProductos'
import "./ItemListContainer.css"

const POR_PAGINA = 6

function ItemListContainer({ categoria }) {
  const [busqueda, setBusqueda] = useState('')
  const [paginaActual, setPaginaActual] = useState(1)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    setCargando(false)
  }, [])

  useEffect(() => {
    setBusqueda('')
    setPaginaActual(1)
  }, [categoria])

  const porCategoria = categoria
    ? productosData.filter(p => p.categoria === categoria)
    : productosData

  const filtrados = porCategoria.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  )

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
          <p>Cargando productos...</p>
        </div>
    )
  }

  return (
    <div className="item-list-container">
      <div className="catalog-container">
        <div className="item-list-title">
          <h2>Catálogo de Productos</h2>
          <p>
            Conoce nuestra selección de vasos personalizados para cócteles,
            eventos y momentos especiales.
          </p>
        </div>

        <BarraBusqueda busqueda={busqueda} onBuscar={handleBuscar} />

        {filtrados.length === 0 ? (
          <p className="catalogo-message">
            No se encontraron productos para "{busqueda}"
          </p>
        ) : (
          <>
            <ItemList productos={productosPagina} />
            <PaginadorProductos
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onCambiarPagina={setPaginaActual}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default ItemListContainer