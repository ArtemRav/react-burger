import modalOverlayCss from './modal-overlay.module.css'

export const ModalOverlay = (props: { closeModal: () => void }) => {
  return (
    <div onClick={props.closeModal} className={modalOverlayCss.overlay}></div>
  )
}
