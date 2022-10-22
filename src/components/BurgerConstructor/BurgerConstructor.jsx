import burgerConstructorCss from './burger-constructor.module.css'
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import dragIcon from './../../images/constructor/Vector.png'
import { useCallback, useMemo, useState } from 'react'

import { Modal } from '../Modal/Modal'
import { OrderDetails } from '../OrderDetails/OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { addIngredient, delIngredient } from '../../services/actions'
import { getOrder } from '../../services/actions/order'
import { useDrop } from 'react-dnd'

export const BurgerConstructor = () => {
  const dispatch = useDispatch()
  const orderIngredients = useSelector(state => state.orderIngredients.items)
  const [modalOpened, setModalOpened] = useState(false)

  const countSum = useMemo(() => {
    return orderIngredients.reduce(
      (acc, el) => (el.type === 'bun' ? acc + el.price * 2 : acc + el.price),
      0
    )
  }, [orderIngredients])

  const bunIngredients = useMemo(() => {
    return orderIngredients.filter(item => item.type !== 'bun')
  }, [orderIngredients])

  const ingredientIds = useMemo(() => {
    return orderIngredients.map(item => item._id)
  }, [orderIngredients])

  const bun = useMemo(
    () => orderIngredients.find(ingredient => ingredient.type === 'bun'),
    [orderIngredients]
  )

  const [{ isHover }, refDropContainer] = useDrop({
    accept: 'ingredients',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      handleDrop(item)
    }
  })

  const handleDrop = useCallback(
    ingredient => {
      dispatch(addIngredient(ingredient))
    },
    [dispatch]
  )

  const openModal = useCallback(() => {
    const data = { ingredients: ingredientIds }
    dispatch(getOrder(data))
    setModalOpened(true)
  }, [dispatch, setModalOpened, ingredientIds])

  const closeModal = useCallback(() => {
    setModalOpened(false)
  }, [setModalOpened])

  const deleteIngredient = useCallback(
    item => {
      dispatch(delIngredient(item))
    },
    [dispatch]
  )

  return (
    <div
      ref={refDropContainer}
      className={`${isHover ? burgerConstructorCss.onHover : ''} ${
        burgerConstructorCss.wrapper
      }`}
    >
      <div className={`mb-4 ${burgerConstructorCss.bun}`}>
        {bun && (
          <ConstructorElement
            type={'top'}
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>

      <ul className={`app-scroll ${burgerConstructorCss.list}`}>
        {bunIngredients.map(item => {
          return (
            <li className={burgerConstructorCss.li} key={item.dragId}>
              <img
                className="mr-3 crsr-pointer"
                src={dragIcon}
                alt="drag&drop"
              />
              <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => deleteIngredient(item)}
              />
            </li>
          )
        })}
      </ul>

      <div className={`mt-4 ${burgerConstructorCss.bun}`}>
        {bun && (
          <ConstructorElement
            type={'bottom'}
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>

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
