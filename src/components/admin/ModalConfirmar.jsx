import './ModalConfirmar.css'

function ModalConfirmar({ isOpen, onCancel, onConfirm, message }) {
  if (!isOpen) return null 

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel}>Cancelar</button>
          <button onClick={onConfirm} className="confirm-button">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirmar