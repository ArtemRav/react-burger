import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../ModalOverlay/ModalOverlay'
import ReactDOM from 'react-dom'
import modalCss from './modal.module.css'
import { useCallback, useEffect } from 'react'

const modalRoot = document.getElementById('root')

export const Modal = ({ title, children, closeModal }) => {
  const { wrapper, modal, header, body } = modalCss

  const onTapEsc = useCallback(
    event => {
      if (event.keyCode === 27) {
        closeModal()
      }
    },
    [closeModal]
  )

  useEffect(() => {
    document.addEventListener('keyup', onTapEsc)

    return () => {
      document.removeEventListener('keyup', onTapEsc)
    }
  }, [onTapEsc])

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
