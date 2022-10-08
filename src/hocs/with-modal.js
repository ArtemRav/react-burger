import React from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../components/ModalOverlay/ModalOverlay'

const withModal = () => {
  const modalRoot = document.getElementById('react-modals')

  return class extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        isVisible: false
      }

      this.openModal = this.openModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
    }

    openModal() {
      this.setState({
        isVisible: true
      })
    }

    closeModal() {
      this.setState({
        isVisible: false
      })
    }

    render() {
      const { title } = this.props

      return ReactDOM.createPortal(
        <div className="modal-wrapper">
          <ModalOverlay onClick={this.closeModal} />

          <div className={`modal-wrapper__dialog pb-30`}>
            <div className={`modal-wrapper__header p-10`}>
              <span>{title || ''}</span>
              <CloseIcon onClick={this.closeModal} type="primary" />
            </div>

            <div className="modal-wrapper__header"></div>
          </div>
        </div>,
        modalRoot
      )
    }
  }
}

export default withModal
