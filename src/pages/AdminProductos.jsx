import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
/*import { Link } from 'react-router-dom' si se requiere descomentar*/
import ProductoForm from '../components/admin/ProductoForm'
import ModalConfirmar from '../components/admin/ModalConfirmar'

const AdminProductos = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [productoEditar, setProductoEditar] = useState(null)
  const [productoEliminar, setProductoEliminar] = useState(null)
  const [modalData, setModalData] = useState({ isOpen: false, message: '', onConfirm: null })

  const productosRef = collection(db, 'productos')

  // Función para cargar y leer todos los productos desde Firestore
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Función para agregar un nuevo producto a Firestore
  async function agregarProducto(producto) {
    try {
      await addDoc(productosRef, producto)
      cargarProductos()
    } catch (err) {
      console.error('agregarProducto error', err)
      setError('Error al agregar el producto')
    }
  }

  // Función para actualizar un producto existente en Firestore
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

  // Función para eliminar un producto de Firestore
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

  // Función para abrir el modal de confirmación
  const abrirModalConfirmacion = (message, onConfirm) => {
    setModalData({ isOpen: true, message, onConfirm })
  }

  // Función para cerrar el modal de confirmación
  const cerrarModalConfirmacion = () => {
    setModalData({ isOpen: false, message: '', onConfirm: null })
  }

  // Función para manejar la confirmación de eliminación
  const manejarConfirmacionEliminar = (id) => {
    abrirModalConfirmacion('¿Estás seguro de que deseas eliminar este producto?', () => {
      eliminarProducto(id)
      cerrarModalConfirmacion()
    })
  }

  //Determinar si se está editando un producto o agregando uno nuevo
  function manejarSubmit(producto) {
    if (productoEditar) {
      actualizarProducto(productoEditar.id, producto)
      setProductoEditar(null)
    } else {
      agregarProducto(producto)
    }
  }

  return (
    <div className="admin-container">
      <h2>Administración de Productos</h2>

      {/* Formulario para agregar o editar productos */}
      <ProductoForm
        producto={productoEditar}
        onSubmit={manejarSubmit}
        onCancelar={() => setProductoEditar(null)}
      />

      {/* Cargando lista de productos */}
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
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
                <td>{producto.nombre}</td>
                <td>${Number(producto.precio).toFixed(2)}</td>
                <td>
                  <button onClick={() => setProductoEditar(producto)}>Editar</button>
                  <button onClick={() => manejarConfirmacionEliminar(producto.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalData.isOpen && (
        <ModalConfirmar
          message={modalData.message}
          onConfirm={modalData.onConfirm}
          onCancel={cerrarModalConfirmacion}
        />
      )}
    </div>
  )
}

export default AdminProductos