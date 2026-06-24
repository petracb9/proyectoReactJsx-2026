import { useState, useEffect } from 'react'
import './ProductoForm.css'

function ProductoForm({ onSubmit, initialData = {}, isEditMode = false }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoría: '',
    imagen: '',
    precio: '',
    stock: '',
  })

    useEffect(() => {
      if (isEditMode && initialData) {
        setFormData(initialData)
      }
    }, [isEditMode, initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form className="producto-form" onSubmit={handleSubmit}>
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
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
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
          type="number"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
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
      <button type="submit">Guardar</button>
    </form>
  )
}

export default ProductoForm