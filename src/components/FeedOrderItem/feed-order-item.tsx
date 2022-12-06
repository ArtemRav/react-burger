import { FC } from 'react'
import { TOrderItem } from '../../pages/FeedPage/feed-page'
import { TIngredientItem } from '../../utils/ingredient-types'
import { BaseIcon } from '../BaseIcon/BaseIcon'
import { BaseSum } from '../BaseSum/BaseSum'
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
            <BaseIcon key={item._id} {...item} />
          ))}
        </div>

        <BaseSum sum={price} />
      </div>
    </div>
  )
}
