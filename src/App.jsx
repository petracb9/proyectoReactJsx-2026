import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Categorias from './pages/Categorias'
import Productos from './pages/Productos'
import ProductoDetalle from './pages/ProductoDetalle'
import Carrito from './pages/Carrito'
import './App.css'

function App() {
  const [carrito, setCarrito] = useState([]) 

  function agregarAlCarrito(producto) {
    setCarrito([...carrito, producto])
  }

  return (
      <Layout cantidadCarrito={carrito.length}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/productos" element={<Productos agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<ProductoDetalle agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} />} />
         </Routes>
      </Layout>  
  )
}

export default App