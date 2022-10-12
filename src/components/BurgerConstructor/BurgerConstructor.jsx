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

export const BurgerConstructor = () => {
  const { ingredientsList } = useContext(IngredientsContext)
  const [modalOpened, setModalOpened] = useState(false)

  const countSum = useMemo(() => {
    return ingredientsList.reduce((acc, el) => acc + el.price, 0)
  }, [ingredientsList])

  const ingredientsBun = useMemo(() => {
    return ingredientsList.filter(item => item.type !== 'bun')
  }, [ingredientsList])

  const bun = useMemo(
    () => ingredientsList.find(ingredient => ingredient.type === 'bun'),
    [ingredientsList]
  )

  const openModal = () => {
    setModalOpened(true)
  }

  const closeModal = () => {
    setModalOpened(false)
  }

  return (
    ingredientsList.length && (
      <div className={burgerConstructorCss.wrapper}>
        <div className="ml-6 mb-4">
          <ConstructorElement
            type={'top'}
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>

        <ul className={`app-scroll pr-2 ${burgerConstructorCss.list}`}>
          {ingredientsBun.map(item => {
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
                />
              </li>
            )
          })}
        </ul>

        <div className="ml-6 mt-4 mb-10">
          <ConstructorElement
            type={'bottom'}
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>

        <div className={burgerConstructorCss.sum}>
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
  ingredientsList: PropTypes.arrayOf(burgerListItemPropTypes())
}
