import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../ModalOverlay/ModalOverlay'
import ReactDOM from 'react-dom'
import modalCss from './modal.module.css'
import { useEffect } from 'react'

const modalRoot = document.getElementById('root')

export const Modal = ({ title, children, closeModal }) => {
  const { wrapper, modal, header, body } = modalCss

  useEffect(() => {
    const onTapEsc = event => {
      const ESC_KEYCODE = 27
      if (event.keyCode === ESC_KEYCODE) {
        closeModal()
      }
    }

    document.addEventListener('keyup', onTapEsc)

    return () => {
      document.removeEventListener('keyup', onTapEsc)
    }
  }, [closeModal])

  return ReactDOM.createPortal(
    <div className={wrapper}>
      <ModalOverlay closeModal={closeModal} />

      <div className={`${modal}`}>
        <div className={`${header} p-10`}>
          <span className="text text_type_main-large">{title || ''}</span>
          <CloseIcon onClick={closeModal} type="primary" />
        </div>

        <div className={body}>{children}</div>
      </div>
    </div>,
    modalRoot
  )
}
