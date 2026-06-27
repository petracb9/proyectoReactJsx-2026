import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import './Login.css'

function RecuperarPassword() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!email) {
      setError('Ingresa tu correo electrónico')
      return
    }

    setLoading(true)
    try {
      await resetPassword(email)
      setMessage('Revisa tu correo para restablecer la contraseña.')
    } catch (err) {
      setError('Error al enviar el enlace: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <h2>Recuperar contraseña</h2>
      {message && <p className="success">{message}</p>}
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
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando enlace...' : 'Enviar enlace de recuperación'}
        </button>
      </form>
      <p className="forgot-link">
        <Link to="/login">Volver a iniciar sesión</Link>
      </p>
    </div>
  )
}

export default RecuperarPassword
