import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
//import productos from '../data/productos.json'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import Item from '../components/catalog/Item'
import Header from '../components/layout/Header'
import BarraBusqueda from '../components/search/BarraBusqueda'
import { LiaGlassMartiniAltSolid,LiaGlassWhiskeySolid,LiaGlassCheersSolid } from 'react-icons/lia'

function Home() {
  const [destacados, setDestacados] = useState([])
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        setCargando(true)
        const querySnapshot = await getDocs(collection(db, "productos"))    
        const lista = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }))
      setDestacados(lista)
    } catch (error) {
      console.error("Error al obtener productos:", error)
    } finally {
      setCargando(false)
    }
   }
    obtenerProductos()
  }, [])

   const handleBuscarDesdeHome = (texto) => {
    navigate(`/productos?search=${encodeURIComponent(texto)}`)
  }
  
  const destacados = productos.slice(0, 4)

  if (cargando) {
    return <div>Cargando inicio...</div>
  }

  return (
    <div className="home-container"> 
      <Header/>
      <div className="home-page">
        <div className="home-intro">
          <h2 className="page-title">TropicGlass</h2>
          <p className="page-subtitle">Vasos personalizados únicos para cada momento.</p>
        </div>

        <div className='home-search-container'>
          <BarraBusqueda onBuscar={handleBuscarDesdeHome} />
        </div>
    
        <div className="home-section">
          <h2 className='section-title'>Nuestras Categorías</h2>
          <div className="category-cards-grid">

            <div className="category-card">
              <div className="category-icon-wrapper icon-tropical">
                <LiaGlassMartiniAltSolid />
              </div>
              <h3>Vasos altos tropicales</h3>
              <p>Ideales para tragos frescos, jugos, cócteles frutales y bebidas con hielo.</p>
            </div>

            <div className="category-card">
              <div className="category-icon-wrapper icon-premiun">
                <LiaGlassWhiskeySolid />
              </div>
              <h3>Vasos cortos premium</h3>
              <p>Perfectos para whisky, tragos clásicos, degustaciones y regalos personalizados.</p>
            </div>

            <div className="category-card">
              <div className="category-icon-wrapper icon-soon">
                <LiaGlassCheersSolid />
              </div>
              <h3>Vasos ediciones especiales</h3>
              <p>Diseños exclusivos para temporadas, bodas, aniversarios y eventos corporativos.</p>
            </div>
          </div>
        </div>
        <div className="home-section">
          <h2 className='section-title'>Productos Destacados</h2>
          <div className="products-grid">
            {destacados.map((producto) => (
              <Item key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home