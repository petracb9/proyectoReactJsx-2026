import ItemListContainer from '../components/catalog/ItemListContainer'

function Productos(agregarAlCarrito) {
  return (
    <div className="productos-page">
      <ItemListContainer agregarAlCarrito={agregarAlCarrito} />
    </div>
  )
}

export default Productos