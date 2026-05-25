import { useState, useEffect } from "react"
import Item from "./Item"
import ItemList from "./ItemList"
import "./ItemListContainer.css"

function ItemListContainer() {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        fetch("/src/data/productos.json")
            .then((res) => res.json())
            .then((data) => {
               setProductos(data) 
               setCargando(false)
            })
            .catch((err) => {
                console.error("Error al cargar productos:", err)
                setCargando(false)
            })          
    }, [])
    
    return (
        <section className="item-list">
          <div className="item-list-container">
            <h2>Catálogo de Productos</h2>
            <p>
               Conoce nuestra selección de vasos personalizados para cócteles,
               eventos y momentos especiales.
            </p>
          </div>
          {cargando ? (
              <p className="catalogo-message">Cargando productos...</p>
          ) : (
              <div className="catalogo-grid">
                {productos.map((producto) => (
                  <Item key={producto.id} producto={producto} />
                ))}
              </div>
          )}   
        </section>

    )
}

export default ItemListContainer