import './PaginadorProductos.css'

function PaginadorProductos({ paginaActual, totalPaginas, onCambiarPagina }) {
  if (totalPaginas <= 1) return null

  return (
    <div className="paginador">
      <button
        className="paginador-btn"
        onClick={() => onCambiarPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        ← Anterior
      </button>

      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
        <button
          key={num}
          className={`paginador-num ${paginaActual === num ? 'activo' : ''}`}
          onClick={() => onCambiarPagina(num)}
        >
          {num}
        </button>
      ))}

      <button
        className="paginador-btn"
        onClick={() => onCambiarPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        Siguiente →
      </button>
    </div>
  )
}

export default PaginadorProductos