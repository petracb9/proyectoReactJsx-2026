import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
//import productos from '../data/productos.json'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import './ProductoDetalle.css'

function ProductoDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        setCargando(true)
        const docRef = doc(db, "productos", id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() })
        } else {
          console.error("No se encontró el producto")
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error)
      } finally {
        setCargando(false)
      }
    }

   if (id) {
      obtenerProducto()
    }
  }, [id])
  
  function handleAddToCart() {
    if (producto) {
    addToCart(producto)
    navigate('/carrito')
  }
  }

  if (cargando) {
    return (
      <div className="detalle-spinner">
        <p>Cargando...</p>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="detalle-error">
        <p>Producto no encontrado</p>
        <Link to="/productos" className="detalle-volver">
          Volver al catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="detalle-container">
      <img src={producto.imagen} alt={producto.nombre} className="detalle-img" />
      <div className="detalle-info">
        <span className="detalle-categoria">{producto.categoria}</span>
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <strong className="detalle-precio">
          ${Number(producto.precio).toLocaleString('es-AR')}
        </strong>
        <button className="detalle-btn" onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}

export default ProductoDetalle