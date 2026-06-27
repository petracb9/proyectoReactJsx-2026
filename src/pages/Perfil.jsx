import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { updateProfile, 
    updateEmail,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider
} from 'firebase/auth'
import { auth } from '../firebase/config'
import './Perfil.css'

function Perfil() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [editando, setEditando] = useState(false)
    const [editandoPassword, setEditandoPassword] = useState(false)
    const [passwordActual, setPasswordActual] = useState('')
    const [passwordNueva, setPasswordNueva] = useState('')
    const [passwordConfirmar, setPasswordConfirmar] = useState('')
    const [nombre, setNombre] = useState(user?.displayName || '')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const inicial = user?.displayName
        ? user.displayName.charAt(0).toUpperCase()
        : user.email.split('@')[0].charAt(0).toUpperCase()

    async function handleLogout() {
        try {
            await logout()
            navigate('/')
        } catch (err) {
            console.error('Error al cerrar sesión:', err)
        }
    }

    async function handlePasswordChange(e) {
        e.preventDefault()
        setError('')
        setMessage('')

        if (!passwordActual || !passwordNueva || !passwordConfirmar) {
            setError('Completa todos los campos para cambiar la contraseña.')
            return
        }

        if (passwordNueva !== passwordConfirmar) {
            setError('Las contraseñas nuevas no coinciden.')
            return
        }

        setLoading(true)
        try {
            const credential = EmailAuthProvider.credential(user.email, passwordActual)
            await reauthenticateWithCredential(auth.currentUser, credential)
            await updatePassword(auth.currentUser, passwordNueva)
            setMessage('Contraseña actualizada correctamente.')
            setEditandoPassword(false)
            setPasswordActual('')
            setPasswordNueva('')
            setPasswordConfirmar('')
        } catch (err) {
            console.error('Error al actualizar contraseña:', err)
            setError('Error al actualizar la contraseña: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="perfil-container">
            <h2>Perfil de Usuario</h2>
            <div className="initials">{inicial}</div>
            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}

            {editando ? (
                <form className="perfil-form"
                    onSubmit={async (e) => {
                        e.preventDefault()
                        setLoading(true)
                        setError('')
                        setMessage('')
                        try {
                            await updateProfile(auth.currentUser, { displayName: nombre })
                            setMessage('Nombre actualizado correctamente')
                            setEditando(false)
                        } catch (err) {
                            console.error('Error al actualizar el nombre:', err)
                            setError('Error al actualizar el nombre: ' + err.message)
                        } finally {
                            setLoading(false)
                        }
                    }}
                >
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre"
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Actualizando...' : 'Actualizar'}
                    </button>
                    <button type="button" onClick={() => { setEditando(false); setError(''); setMessage('') }}>
                        Cancelar
                    </button>
                </form>
            ) : editandoPassword ? (
                <form className="perfil-form" onSubmit={handlePasswordChange}>
                    <div className="form-group">
                        <label htmlFor="actualPassword">Contraseña actual</label>
                        <input
                            type="password"
                            id="actualPassword"
                            value={passwordActual}
                            onChange={(e) => setPasswordActual(e.target.value)}
                            placeholder="Ingresa tu contraseña actual"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nuevaPassword">Contraseña nueva</label>
                        <input
                            type="password"
                            id="nuevaPassword"
                            value={passwordNueva}
                            onChange={(e) => setPasswordNueva(e.target.value)}
                            placeholder="Ingresa la nueva contraseña"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmarPassword">Confirmar contraseña nueva</label>
                        <input
                            type="password"
                            id="confirmarPassword"
                            value={passwordConfirmar}
                            onChange={(e) => setPasswordConfirmar(e.target.value)}
                            placeholder="Confirma la nueva contraseña"
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Actualizando...' : 'Actualizar contraseña'}
                    </button>
                    <button type="button" onClick={() => { setEditandoPassword(false); setError(''); setMessage(''); setPasswordActual(''); setPasswordNueva(''); setPasswordConfirmar('') }}>
                        Cancelar
                    </button>
                </form>
            ) : (
                <div className="perfil-info">
                    <p><strong>Nombre:</strong> {user?.displayName}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <button onClick={() => { setEditando(true); setMessage(''); setError('') }}>Editar Nombre</button>
                    <button onClick={() => { setEditandoPassword(true); setMessage(''); setError('') }}>Cambiar contraseña</button>
                    <button onClick={handleLogout}>Salir</button>
                </div>
            )}
        </div>
    )
}

export default Perfil