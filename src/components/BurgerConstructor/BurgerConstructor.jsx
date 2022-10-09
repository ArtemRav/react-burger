import burgerConstructorCss from './burger-constructor.module.css'
import PropTypes from 'prop-types'
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import dragIcon from './../../images/constructor/Vector.png'
import { burgerListItemPropTypes } from '../../utils/prop-types'
import { useMemo, useState } from 'react'
import { Modal } from '../Modal/Modal'
import { OrderDetails } from '../OrderDetails/OrderDetails'

export const BurgerConstructor = ({ ingredients }) => {
  const { wrapper, list, li, sum } = burgerConstructorCss
  const [modalOpened, setModalOpened] = useState(false)

  const countSum = useMemo(() => {
    return ingredients.reduce((acc, el) => acc + el.price, 0)
  }, [ingredients])

  const ingredientsList = useMemo(() => {
    return ingredients.filter(item => item.type !== 'bun')
  }, [ingredients])

  const bunsList = useMemo(() => {
    return ingredients.filter(item => item.type === 'bun')
  }, [ingredients])

  const openModal = () => {
    setModalOpened(true)
  }

  const closeModal = () => {
    setModalOpened(false)
  }

  return (
    ingredients.length && (
      <div className={wrapper}>
        <div className="ml-6 mb-4">
          <ConstructorElement
            type={'top'}
            isLocked={true}
            text={bunsList[0].name}
            price={bunsList[0].price}
            thumbnail={bunsList[0].image}
          />
        </div>

        <ul className={`app-scroll pr-2 ${list}`}>
          {ingredientsList.map(item => {
            return (
              <li className={li} key={item._id}>
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
                />
              </li>
            )
          })}
        </ul>

        <div className="ml-6 mt-4 mb-10">
          <ConstructorElement
            type={'bottom'}
            isLocked={true}
            text={bunsList[bunsList.length - 1].name}
            price={bunsList[bunsList.length - 1].price}
            thumbnail={bunsList[bunsList.length - 1].image}
          />
        </div>

        <div className={sum}>
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

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(burgerListItemPropTypes())
}
