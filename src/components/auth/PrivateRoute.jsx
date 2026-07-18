import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const CORREO_ADMIN = "admin@tropicglass.com"//cambia el correo por admin@tropicglass.com el que quieras que sea admin

export function PrivateRoute({ children }) {
  const { user, loading } = useAuth()  
  
  if (loading) 
    return <div>Cargando...</div> 
  
  return user ? children : <Navigate to="/login" /> 
}  

export function AdminRoute({ children }) {
  const { user, loading } = useAuth()  
 
  if (loading) return <div>Cargando...</div>
   
  if (!user)  return <Navigate to="/login" />
    
  if (user.email !== CORREO_ADMIN) {
    console.warn("Acceso denegado: Se requieren permisos de administrador.")
    return <Navigate to="/" />
  }
  return children
}

export default PrivateRoute