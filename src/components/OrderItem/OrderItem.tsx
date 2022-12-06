import { FC } from 'react'
import { TIngredientItem } from '../../utils/ingredient-types'
import { BaseIcon } from '../BaseIcon/BaseIcon'
import { BaseSum } from '../BaseSum/BaseSum'
import style from './order-item.module.css'

export const OrderItem: FC<TIngredientItem> = item => {
  return (
    <li className={`${style.wrapper} ml-4 mb-5 pr-10`}>
      <div className={style.info}>
        <BaseIcon key={item._id} {...item} />
        <div className="text text_type_main-default ml-4">{item.name}</div>
      </div>
      <div className={style.sum}>
        <BaseSum qnt={`${item.qnt} x ${item.price}`} />
      </div>
    </li>
  )
}
