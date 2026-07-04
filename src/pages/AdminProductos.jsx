import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import ProductoForm from '../components/admin/ProductoForm'
import ModalConfirmar from '../components/admin/ModalConfirmar'
import './AdminProductos.css'

const AdminProductos = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [productoEditar, setProductoEditar] = useState(null)
  const [productoEliminar, setProductoEliminar] = useState(null)
  const [modalData, setModalData] = useState({ isOpen: false, message: '', onConfirm: null })

  const productosRef = collection(db, 'productos')

 
  async function cargarProductos() {
    try {
      const data = await getDocs(productosRef)
      const productosData = data.docs.map((d) => ({ id: d.id, ...d.data() }))
      setProductos(productosData)
      setLoading(false)
    } catch (err) {
      console.error('cargarProductos error', err)
      setError('Error al cargar los productos')
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  
  async function agregarProducto(producto) {
    try {
      await addDoc(productosRef, producto)
      cargarProductos()
    } catch (err) {
      console.error('agregarProducto error', err)
      setError('Error al agregar el producto')
    }
  }

  
  async function actualizarProducto(id, productoActualizado) {
    try {
      const productoRef = doc(db, 'productos', id)
      await updateDoc(productoRef, productoActualizado)
      cargarProductos()
    } catch (err) {
      console.error('actualizarProducto error', err)
      setError('Error al actualizar el producto')
    }
  }


  async function eliminarProducto(id) {
    try {
      const productoRef = doc(db, 'productos', id)
      await deleteDoc(productoRef)
      cargarProductos()
    } catch (err) {
      console.error('eliminarProducto error', err)
      setError('Error al eliminar el producto')
    }
  }

  const abrirModalConfirmacion = (message, onConfirm) => {
    setModalData({ isOpen: true, message, onConfirm })
  }

  const cerrarModalConfirmacion = () => {
    setModalData({ isOpen: false, message: '', onConfirm: null })
  }

  const manejarConfirmacionEliminar = (id) => {
    abrirModalConfirmacion('¿Estás seguro de que deseas eliminar este producto?', () => {
      eliminarProducto(id)
      cerrarModalConfirmacion()
    })
  }

  function manejarSubmit(producto) {
    if (productoEditar) {
      actualizarProducto(productoEditar.id, producto)
      setProductoEditar(null)
    } else {
      agregarProducto(producto)
    }
  }

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1 className="admin-title">Panel de Administración</h1>
        <p className="admin-subtitle">Gestión y control del catálogo de productos</p>
      </div>
      <div className="admin-container">
        <ProductoForm 
          initialData={productoEditar || {}}
          isEditMode={!!productoEditar}
          onSubmit={manejarSubmit}
          onCancelar={() => setProductoEditar(null)}
        />

        {/* Cargando lista de productos */}
        {loading ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td className='nombre'>{producto.nombre}</td>
                    <td className="price">{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(Number(producto.precio))}</td>
                    <td className='acciones'>
                      <button type="button" className="edit-btn" onClick={() => setProductoEditar(producto)}>Editar</button>
                      <button type="button" className="delete-btn" onClick={() => manejarConfirmacionEliminar(producto.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {modalData.isOpen && (
          <ModalConfirmar
            isOpen={modalData.isOpen}
            message={modalData.message}
            onConfirm={modalData.onConfirm}
            onCancel={cerrarModalConfirmacion}
          />
        )}
      </div>
    </div>
   )
}

export default AdminProductos