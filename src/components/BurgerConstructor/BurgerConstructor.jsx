import burgerConstructor from './burger-constructor.module.css'
import PropTypes from 'prop-types'
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import dragIcon from './../../images/constructor/Vector.png'
import { burgerListItemPropTypes } from '../../utils/prop-types'
import { useMemo } from 'react'

export const BurgerConstructor = ({ ingredients }) => {
  const countSum = useMemo(() => {
    return ingredients.reduce((acc, el) => acc + el.price, 0)
  }, [ingredients])

  const burgersList = useMemo(() => {
    return ingredients.filter((_, i, arr) => i !== 0 && i !== arr.length - 1)
  }, [ingredients])

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
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    )
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(burgerListItemPropTypes())
}
