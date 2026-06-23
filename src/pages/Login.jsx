import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'

function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(email, password)
            navigate('/perfil')
        } catch (err) {
            setError('Error al iniciar sesión: ' + err.message)
        } finally {
            setLoading(false)
     }
    }
    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa tu correo electrónico"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
            </form>
            <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
        </div>
    )
}

export default Login