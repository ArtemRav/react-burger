import modalOverlayCss from './modal-overlay.module.css'

export const ModalOverlay = props => {
  return (
    <div onClick={props.closeModal} className={modalOverlayCss.overlay}></div>
  )
}
