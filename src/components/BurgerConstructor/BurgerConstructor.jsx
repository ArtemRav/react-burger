import { data } from '../../utils/data'
import burgerConstructor from './burger-constructor.module.css'
import PropTypes from 'prop-types'
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import dragIcon from './../../images/constructor/Vector.png'
import { burgerListItemPropTypes } from '../../utils/prop-types'

export const BurgerConstructor = () => {
  const countSum = () => {
    return data.reduce((acc, el) => acc + el.price, 0)
  }

  const getBurgersList = () => {
    return data.filter((el, i, arr) => i !== 0 && i !== arr.length - 1)
  }

  return (
    <div className={burgerConstructor.wrapper}>
      <div className="ml-6 mb-4">
        <ConstructorElement
          type={'top'}
          isLocked={true}
          text={data[0].name}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>
      <ul className={`app-scroll pr-2 ${burgerConstructor.list}`}>
        {getBurgersList().map((item, idx, arr) => {
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
          text={data[data.length - 1].name}
          price={data[data.length - 1].price}
          thumbnail={data[data.length - 1].image}
        />
      </div>

      <div className={burgerConstructor.sum}>
        <div className="flex-wrap mr-10">
          <p className="mr-2 text text_type_digits-default">{countSum()}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerListItemPropTypes())
}
