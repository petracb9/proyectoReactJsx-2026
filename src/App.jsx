import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Categorias from './pages/Categorias'
import Productos from './pages/Productos'
import ProductoDetalle from './pages/ProductoDetalle'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Perfil from './pages/Perfil'
import RecuperarPassword from './pages/RecuperarPassword'
import PrivateRoute from './components/auth/PrivateRoute'
import AdminProductos from './pages/AdminProductos'
import AuthProvider from './context/AuthContext'
import CartProvider from './context/CartContext'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <main className="main-content">
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
                 <PrivateRoute>
                   <AdminProductos />
                 </PrivateRoute>
               } />
             </Routes>
          </main>      
          <Footer />
        </CartProvider>
      </AuthProvider>
    </div>
  )
} 

export default App