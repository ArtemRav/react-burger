import burgerConstructor from './burger-constructor.module.css'
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
  const [modalOpened, setModalOpened] = useState(false)

  const countSum = useMemo(() => {
    return ingredients.reduce((acc, el) => acc + el.price, 0)
  }, [ingredients])

  const burgersList = useMemo(() => {
    return ingredients.filter((_, i, arr) => i !== 0 && i !== arr.length - 1)
  }, [ingredients])

  const openModal = item => {
    setModalOpened(true)
  }

  return (
    ingredients.length && (
      <div className={burgerConstructor.wrapper}>
        <div className="ml-6 mb-4">
          <ConstructorElement
            type={'top'}
            isLocked={true}
            text={ingredients[0].name}
            price={ingredients[0].price}
            thumbnail={ingredients[0].image}
          />
        </div>

        <ul className={`app-scroll pr-2 ${burgerConstructor.list}`}>
          {burgersList.map((item, idx, arr) => {
            return (
              <li className={burgerConstructor.li} key={idx}>
                <img
                  className="mr-3"
                  src={dragIcon}
                  alt="drag&drop"
                  style={{ cursor: 'pointer' }}
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
            text={ingredients[ingredients.length - 1].name}
            price={ingredients[ingredients.length - 1].price}
            thumbnail={ingredients[ingredients.length - 1].image}
          />
        </div>

        <div className={burgerConstructor.sum}>
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
          <Modal title="" closeModal={() => setModalOpened(false)}>
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
