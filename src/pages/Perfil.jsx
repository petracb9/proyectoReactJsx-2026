import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Perfil() {
    const { user, logout } = useAuth()
    const navigate = useNavigate() 
    
    async function handleLogout() {
        try {
            await logout()
            navigate('/login')
        } catch (err) {
            console.error('Error al cerrar sesión:', err)
        }       
    } 

    return (
        <div className="perfil-container">
            <h2>Perfil de Usuario</h2>  
            <p><strong>Nombre:</strong> {user?.displayName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    )
}

export default Perfil