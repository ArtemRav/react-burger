import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../ModalOverlay/ModalOverlay'
import ReactDOM from 'react-dom'
import modalCss from './modal.module.css'
import { FC, useEffect } from 'react'

const ESC_KEYCODE = 27
const modalRoot: any = document.getElementById('modals')

type TModal = {
  title: string
  children: any
  closeModal: () => void
}

export const Modal: FC<TModal> = ({ title, children, closeModal }) => {
  const { wrapper, modal, header, body } = modalCss

  useEffect(() => {
    const onTapEsc = (event: KeyboardEvent): void => {
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