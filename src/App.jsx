import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Categorias from './pages/Categorias'
import Productos from './pages/Productos'
import ProductoDetalle from './pages/ProductoDetalle'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Perfil from './pages/Perfil'
import RecuperarPassword from './pages/RecuperarPassword'
import { PrivateRoute, AdminRoute } from './components/auth/PrivateRoute'
import AdminProductos from './pages/AdminProductos'
import AuthProvider from './context/AuthContext'
import CartProvider from './context/CartContext'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <CartProvider>
          <Layout />
           <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/categorias" element={<Categorias />} />
               <Route path="/productos" element={<Productos />} />
               <Route path="/producto/:id" element={<ProductoDetalle />} />
               <Route path="/carrito" element={<Carrito />} />
               <Route path="/login" element={<Login />} />
               <Route path="/registro" element={<Registro />} />
               <Route path="/perfil" element={
                 <PrivateRoute>
                   <Perfil />
                 </PrivateRoute>
               } />
               <Route path="/recuperar-password" element={<RecuperarPassword />} />
               <Route path="/admin" element={
                 <AdminRoute>
                   <AdminProductos />
                 </AdminRoute>
               } />
           </Routes>  
          <Layout />
        </CartProvider>
      </AuthProvider>
    </div>
  )
} 

export default App