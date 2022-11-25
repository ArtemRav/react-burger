import burgerConstructorCss from './burger-constructor.module.css'
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useMemo } from 'react'

import { Modal } from '../Modal/Modal'
import { OrderDetails } from '../OrderDetails/OrderDetails'
import { OrderIngredientList } from '../OrderIngredientList/OrderIngredientList'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { addIngredient } from '../../services/actions'
import { getOrder } from '../../services/actions/order'
import { useDrop } from 'react-dnd'

import { BUN, TIngredientItem } from '../../utils/ingredient-types'
import useModal from '../../hooks/useModal'
import { TState } from '../../services/reducers'

export const BurgerConstructor = () => {
  const dispatch = useDispatch<any>()
  const history = useHistory()
  const location = useLocation()
  const orderIngredients = useSelector(
    (state: TState) => state.orderIngredients.items
  )
  const { modalVisible: modalOpened, showModal, hideModal } = useModal()
  const isAutorized = useSelector((state: TState) => state.user.loginSuccess)

  const countSum = useMemo(() => {
    return orderIngredients.reduce(
      (acc, el: TIngredientItem) =>
        el.type === BUN ? acc + el.price * 2 : acc + el.price,
      0
    )
  }, [orderIngredients])

  const ingredientIds = useMemo(() => {
    return orderIngredients.map(item => item._id)
  }, [orderIngredients])

  const [{ isHover }, dropForAllRef] = useDrop({
    accept: 'ingredients',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item: any) {
      handleDrop(item)
    }
  })

  const handleDrop = (ingredient: TIngredientItem) => {
    dispatch(addIngredient(ingredient))
  }

  const openModal = useCallback(() => {
    if (isAutorized) {
      const data = { ingredients: ingredientIds }
      dispatch(getOrder(data))
      showModal()
    } else {
      history.push({ pathname: '/login', state: { from: location } })
    }
  }, [dispatch, showModal, ingredientIds, history, location, isAutorized])

  const closeModal = useCallback(() => {
    hideModal()
  }, [hideModal])

  return (
    <div
      ref={dropForAllRef}
      className={`${isHover ? burgerConstructorCss.onHover : ''} 
      ${burgerConstructorCss.wrapper}`}
    >
      <OrderIngredientList orderIngredients={orderIngredients} />

      <div className={`${burgerConstructorCss.sum} mt-10`}>
        <div className="flex-wrap mr-10">
          <p className="mr-2 text text_type_digits-default">{countSum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </div>

      {modalOpened && (
        <Modal title="" closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  )
}
