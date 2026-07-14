import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
//import productos from  '../data/productos.json'
import Item from '../components/catalog/Item'

function Categorias() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        setCargando(true)
        const querySnapshot = await getDocs(collection(db, "productos"))
        const lista = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setProductos(lista)
      } catch (error) {
        console.error("Error al obtener productos:", error)
      } finally {
        setCargando(false)
      }
    }
    obtenerProductos()
  }, [])

  const vasosAltos = productos.filter(
    (producto) => (producto.categoria || producto.categoría) === "vasos-altos"
  )

  const vasosCortos = productos.filter(
    (producto) => (producto.categoria || producto.categoría) === "vasos-cortos"
  )

   if (cargando) {
    return <div>Cargando categorías...</div>
  }

  return (
    <div className='categories-page'>
      <div className='categories-intro'>
        <h2 className='page-title'>Categorías</h2>
        <p className='page-subtitle'>Elige el estilo de vaso ideal para cada bebida.</p>
      </div>

      <div className="category-section">
        <h3 className="category-title">Vasos altos tropicales</h3>
        <div className="products-grid">
          {vasosAltos.map((producto) => (
            <Item key={producto.id} producto={producto} />
          ))}
        </div>
      </div>

      <div className="category-section">
        <h3 className="category-title">Vasos cortos premium</h3>
        <div className="products-grid">
          {vasosCortos.map((producto) => (
            <Item key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categorias