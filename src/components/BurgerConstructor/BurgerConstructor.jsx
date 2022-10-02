import { data } from '../../utils/data'
import burgerConstructor from './burger-constructor.module.css'
import PropTypes from 'prop-types'
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import dragIcon from './../../images/constructor/Vector.png'

export const BurgerConstructor = props => {
  return (
    <div className={burgerConstructor.wrapper}>
      <ul className={`main-scrollbar mb-10 pr-2 ${burgerConstructor.list}`}>
        {data.map((item, idx, arr) => {
          if (idx === 0 || idx === arr.length - 1) {
            return (
              <li className="pl-6" key={idx}>
                <ConstructorElement
                  type={idx === 0 ? 'top' : 'bottom'}
                  isLocked={true}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            )
          }
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
      <div className={burgerConstructor.sum}>
        <div style={{ display: 'flex' }} className="mr-10">
          <p className="mr-2 text text_type_digits-default">
            {data.reduce((acc, el) => acc + el.price, 0)}
          </p>
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number
    })
  )
}
