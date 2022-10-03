import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components'
import burgerStyle from './burger-item.module.css'
import PropTypes from 'prop-types'

export const BurgerItem = props => {
  return (
    <li className={`pl-4 pr-4 ${burgerStyle.card}`} key={props.menuItem._id}>
      <img src={props.menuItem.image} alt={props.menuItem.name} />
      <div className={burgerStyle.price}>
        <p className="mr-2 text text_type_digits-default">
          {props.menuItem.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`mt-2 text text_type_main-small ${burgerStyle.desc}`}>
        {props.menuItem.name}
      </p>
      {props.amount && (
        <Counter
          className={burgerStyle.counter}
          count={props.amount}
          size="small"
        />
      )}
    </li>
  )
}

BurgerItem.propTypes = {
  menuItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  })
}
