import burgerConstructorCss from './burger-constructor.module.css'
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import dragIcon from './../../images/constructor/Vector.png'
import { useMemo, useState } from 'react'

import { Modal } from '../Modal/Modal'
import { OrderDetails } from '../OrderDetails/OrderDetails'
import { postData } from '../../utils/burger-api'
import { useDispatch, useSelector } from 'react-redux'
import { CREATE_ORDER, DEL_INGREDIENT_FROM_ORDER } from '../../services/actions'

export const BurgerConstructor = () => {
  const dispatch = useDispatch()
  const orderIngredients = useSelector(state => state.orderIngredients.items)
  const [modalOpened, setModalOpened] = useState(false)

  const countSum = useMemo(() => {
    return orderIngredients.reduce((acc, el) => acc + el.price, 0)
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

  const openModal = async () => {
    const data = { ingredients: ingredientIds }
    try {
      const {
        order: { number }
      } = await postData('orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      dispatch({
        type: CREATE_ORDER,
        orderNum: number
      })
    } catch (error) {
      console.error(error)
    }

    setModalOpened(true)
  }

  const closeModal = () => {
    setModalOpened(false)
  }

  const deleteIngredient = item => {
    dispatch({
      type: DEL_INGREDIENT_FROM_ORDER,
      item
    })
  }

  return (
    orderIngredients.length && (
      <div className={burgerConstructorCss.wrapper}>
        {bun && (
          <div className="ml-6 mb-4">
            <ConstructorElement
              type={'top'}
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}

        <ul className={`app-scroll pr-2 ${burgerConstructorCss.list}`}>
          {bunIngredients.map(item => {
            return (
              <li className={burgerConstructorCss.li} key={item._id}>
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

        {bun && (
          <div className="ml-6 mt-4">
            <ConstructorElement
              type={'bottom'}
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}

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
  )
}
