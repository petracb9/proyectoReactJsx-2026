import { useState, useEffect } from 'react'
import './ProductoForm.css'

function ProductoForm({ onSubmit, initialData = {}, isEditMode = false, producto = null }) {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    descripcion: '',
    imagen: '',
    precio: '',
    stock: '',
  })

  useEffect(() => {
    // Se prefiere utilizar «initialData» explícito; en caso contrario, se recurre a la propiedad 'producto' por motivos de compatibilidad.
    const dataSource = (initialData && Object.keys(initialData).length) ? initialData : producto
    if (isEditMode && dataSource) {
      //campos numéricos de tipo cadena en los campos de entrada
      setFormData({
        nombre: dataSource.nombre || '',
        categoria: dataSource.categoria || '',
        descripcion: dataSource.descripcion || '',
        imagen: dataSource.imagen || '',
        precio: dataSource.precio != null ? String(dataSource.precio) : '',
        stock: dataSource.stock != null ? String(dataSource.stock) : '',
      })
    }
  }, [isEditMode, initialData, producto])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

 
    const precioSanitized = formData.precio != null && formData.precio !== ''
      ? Number(String(formData.precio).replace(/\./g, '').replace(/,/g, '.'))
      : 0

    const stockSanitized = formData.stock != null && formData.stock !== ''
      ? Number(String(formData.stock).replace(/\./g, '').replace(/,/g, '.'))
      : 0

    const payload = {
      ...formData,
      precio: precioSanitized,
      stock: stockSanitized,
    }

    onSubmit(payload)

    setFormData({
      nombre: '',
      categoria: '',
      descripcion: '',
      imagen: '',
      precio: '',
      stock: '',
    })
  }

  return (
    <form className="producto-form" onSubmit={handleSubmit}>
      <h3>{isEditMode ? 'Editar producto' : 'Nuevo producto'}</h3>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="categoría">Categoría:</label>
        <input
          type="text"
          id="categoría"
          name="categoría"
          value={formData.categoría}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="imagen">Imagen:</label>
        <input
          type="text"
          id="imagen"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input
          type="text"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          placeholder="Ej: 4.100 o 4100"
        />
      </div>
      <div className="form-group">
        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />
      </div>
      <button type="submit">{isEditMode ? 'Actualizar' : 'Guardar'}</button>
    </form>
  )
}

export default ProductoForm