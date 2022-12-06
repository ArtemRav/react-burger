import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'
import { TOrderItem } from '../../pages/FeedPage/feed-page'
import { TIngredientItem } from '../../utils/ingredient-types'
import { BaseIcon } from '../BaseIcon/BaseIcon'
import style from './feed-order-item.module.css'

export const FeedOrderItem: FC<TOrderItem> = ({
  number,
  title,
  ingredients,
  price
}) => {
  return (
    <div className={`${style['feed-item']} mb-4`}>
      <div className={style['row-title']}>
        <div className="text text_type_digits-default">{number}</div>

        <div className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20
        </div>
      </div>

      <div className="text text_type_main-medium">{title}</div>

      <div className={style['row-details']}>
        <div className={`${style['ingredients-icon-list']} ml-4`}>
          {ingredients.map((item: TIngredientItem) => (
            <BaseIcon key={item.name} {...item} />
          ))}
        </div>

        <div className={style['ingredient-price']}>
          <span className="mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
