import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
    updateProfile, 
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
        : user?.email ? user.email.split('@')[0].charAt(0).toUpperCase() : 'U'

    useEffect(()=> {
        document.body.classList.add('login-bg')
        return () => {
            document.body.classList.remove('login-bg')
        }
    }, [])
        
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
       <div className="perfil-page-container">
            <div className="profile-card">
                
                <div className="profile-header">
                    <div className="profile-avatar">{inicial}</div>
                    <h2 className="profile-title">Perfil de Usuario</h2>
                </div>

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

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
                        <div className="form-group">
                            <label>Nombre Completo</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Nombre"
                                required
                            />
                        </div>
                        <div className="profile-actions horizontal-actions">
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Actualizando...' : 'Guardar'}
                            </button>
                            <button type="button" className="btn-cancel" onClick={() => { setEditando(false); setError(''); setMessage('') }}>
                                Cancelar
                            </button>
                        </div>
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
                        <div className="profile-actions horizontal-actions">
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Actualizando...' : 'Actualizar'}
                            </button>
                            <button type="button" className="btn-cancel" onClick={() => { setEditandoPassword(false); setError(''); setMessage(''); setPasswordActual(''); setPasswordNueva(''); setPasswordConfirmar('') }}>
                                Cancelar
                            </button>
                        </div>
                    </form>

                ) : (
                    <>
                        <div className="profile-body">
                            <div className="profile-info-group">
                                <label>Nombre de Usuario</label>
                                <p>{user?.displayName || 'Sin nombre asignado'}</p>
                            </div>
                            <div className="profile-info-group">
                                <label>Correo Electrónico</label>
                                <p>{user?.email}</p>
                            </div>
                        </div>

                        <div className="profile-actions vertical-actions">
                            <button className="btn-secondary" onClick={() => { setEditando(true); setMessage(''); setError('') }}>
                                Editar Nombre
                            </button>
                            <button className="btn-secondary" onClick={() => { setEditandoPassword(true); setMessage(''); setError('') }}>
                                Cambiar contraseña
                            </button>
                            <button className="btn-danger" onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
   
}

export default Perfil