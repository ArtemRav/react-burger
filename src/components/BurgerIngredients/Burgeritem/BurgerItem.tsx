import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-item.module.css'
import { useDrag } from 'react-dnd'
import { Link, useLocation } from 'react-router-dom'
import { TIngredient } from '../../../services/types/data'

export const BurgerItem = ({ ingredient }: TIngredient) => {
  const location = useLocation()
  const { _id, name, image, price, qnt } = ingredient

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredients',
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  return (
    <Link
      to={{ pathname: `/ingredients/${_id}`, state: { background: location } }}
      className={style.link}
    >
      <li
        key={_id}
        ref={dragRef}
        style={{ opacity }}
        className={`pl-4 pr-4 ${style.card}`}
      >
        <img src={image} alt={name} />
        <div className={style.price}>
          <p className="mr-2 text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`mt-2 text text_type_main-small ${style.desc}`}>{name}</p>
        {!!qnt && (
          <Counter extraClass={style.counter} count={qnt} size="small" />
        )}
      </li>
    </Link>
  )
}
