import burgerConstructorCss from './burger-constructor.module.css'
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useMemo } from 'react'

import { Modal } from '../Modal/Modal'
import { OrderDetails } from '../OrderDetails/OrderDetails'
import { OrderIngredientList } from '../OrderIngredientList/OrderIngredientList'

import { useHistory, useLocation } from 'react-router-dom'
import { getOrder } from '../../services/actions/order'

import useModal from '../../hooks/useModal'
import { BUN } from '../../services/types/data'
import { useAppDispatch, useAppSelector } from '../../hooks'

export const BurgerConstructor = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const location = useLocation()
  const orderIngredients = useAppSelector(state => state.orderIngredients.items)
  const { modalVisible: modalOpened, showModal, hideModal } = useModal()
  const isAutorized = useAppSelector(state => state.user.loginSuccess)

  const countSum = useMemo(() => {
    return orderIngredients.reduce(
      (acc, el) => (el.type === BUN ? acc + el.price * 2 : acc + el.price),
      0
    )
  }, [orderIngredients])

  const ingredientIds = useMemo(() => {
    return orderIngredients.map(item => item._id)
  }, [orderIngredients])

  const openModal = useCallback(() => {
    if (isAutorized) {
      const data = { ingredients: ingredientIds }
      dispatch(getOrder(data))
      showModal()
    } else {
      showModal()
      history.push({ pathname: '/login', state: { from: location } })
    }
  }, [dispatch, showModal, ingredientIds, history, location, isAutorized])

  const closeModal = useCallback(() => {
    hideModal()
  }, [hideModal])

  return (
    <div
      className={`${burgerConstructorCss.wrapper}`}
      data-test-id="drop-ingredient"
    >
      <OrderIngredientList orderIngredients={orderIngredients} />

      <div className={`${burgerConstructorCss.sum} mt-10`}>
        <div className="flex-wrap mr-10">
          <p className="mr-2 text text_type_digits-default">{countSum}</p>
          <CurrencyIcon type="primary" />
        </div>
        {orderIngredients.length && (
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={openModal}
          >
            Оформить заказ
          </Button>
        )}
      </div>

      {modalOpened && (
        <Modal title="" closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  )
}
