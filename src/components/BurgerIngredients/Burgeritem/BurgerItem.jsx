import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components'
import burgerStyle from './burger-item.module.css'
import { burgerListItemPropTypes } from '../../../utils/prop-types'
import PropTypes from 'prop-types'

export const BurgerItem = ({ menuItem, openModal, amount }) => {
  const showModal = () => {
    openModal(menuItem)
  }

  return (
    <li
      className={`pl-4 pr-4 ${burgerStyle.card}`}
      key={menuItem._id}
      onClick={showModal}
    >
      <img src={menuItem.image} alt={menuItem.name} />
      <div className={burgerStyle.price}>
        <p className="mr-2 text text_type_digits-default">{menuItem.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`mt-2 text text_type_main-small ${burgerStyle.desc}`}>
        {menuItem.name}
      </p>
      {amount && (
        <Counter className={burgerStyle.counter} count={amount} size="small" />
      )}
    </li>
  )
}

BurgerItem.propTypes = {
  menuItem: burgerListItemPropTypes(),
  openModal: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired
}
