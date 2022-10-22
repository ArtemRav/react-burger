import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components'
import burgerStyle from './burger-item.module.css'
import { burgerListItemPropTypes } from '../../../utils/prop-types'
import { BurgerItemContext } from '../../../services/burgerItemContext'
import { useContext } from 'react'
import { useDrag } from 'react-dnd'

export const BurgerItem = ({ ingredient }) => {
  const { _id, name, image, price, qnt } = ingredient
  const { openModal } = useContext(BurgerItemContext)

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredients',
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  const showModal = () => {
    openModal(ingredient)
  }

  return (
    <li
      key={_id}
      ref={dragRef}
      style={{ opacity }}
      className={`pl-4 pr-4 ${burgerStyle.card}`}
      onClick={showModal}
    >
      <img src={image} alt={name} />
      <div className={burgerStyle.price}>
        <p className="mr-2 text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`mt-2 text text_type_main-small ${burgerStyle.desc}`}>
        {name}
      </p>
      {!!qnt && (
        <Counter className={burgerStyle.counter} count={qnt} size="small" />
      )}
    </li>
  )
}

BurgerItem.propTypes = {
  ingredient: burgerListItemPropTypes()
}
