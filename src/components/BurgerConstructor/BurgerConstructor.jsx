import burgerConstructorCss from './burger-constructor.module.css'
import PropTypes from 'prop-types'
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import dragIcon from './../../images/constructor/Vector.png'
import { burgerListItemPropTypes } from '../../utils/prop-types'
import { useContext, useMemo, useState } from 'react'
import { IngredientsContext } from '../../services/appContext'

import { Modal } from '../Modal/Modal'
import { OrderDetails } from '../OrderDetails/OrderDetails'
import { postData } from '../../utils/burger-api'

export const BurgerConstructor = ({ ingredientsList }) => {
  const { handleDelIngredient } = useContext(IngredientsContext)

  const [modalOpened, setModalOpened] = useState(false)
  const [orderNum, setOrderSum] = useState()

  const countSum = useMemo(() => {
    return ingredientsList.reduce((acc, el) => acc + el.price, 0)
  }, [ingredientsList])

  const bunIngredients = useMemo(() => {
    return ingredientsList.filter(item => item.type !== 'bun')
  }, [ingredientsList])

  const ingredientIds = useMemo(() => {
    return ingredientsList.map(item => item._id)
  }, [ingredientsList])

  const bun = useMemo(
    () => ingredientsList.find(ingredient => ingredient.type === 'bun'),
    [ingredientsList]
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
      setOrderSum(number)
    } catch (error) {
      console.error(error)
    }

    setModalOpened(true)
  }

  const closeModal = () => {
    setModalOpened(false)
  }

  const deleteIngredient = item => {
    handleDelIngredient(item)
  }

  return (
    ingredientsList.length && (
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
            <OrderDetails orderNum={orderNum} />
          </Modal>
        )}
      </div>
    )
  )
}

BurgerConstructor.propTypes = {
  ingredientsList: PropTypes.arrayOf(burgerListItemPropTypes())
}
