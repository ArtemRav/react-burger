import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { TState } from '../../services/reducers'
import {
  BUN,
  THistoryOrderItem,
  TIngredientItem
} from '../../services/types/data'
import { BaseIcon } from '../BaseIcon/BaseIcon'
import { BaseSum } from '../BaseSum/BaseSum'
import style from './feed-order-item.module.css'

export const FeedOrderItem: FC<THistoryOrderItem> = ({
  name,
  number,
  updatedAt,
  ingredients
}) => {
  const storeIngredients = useSelector(
    (state: TState) => state.allIngredients.ingredientsList
  )

  const orderIngredients = useMemo(
    () =>
      storeIngredients.filter((item: any) => ingredients.includes(item._id)),
    [storeIngredients, ingredients]
  )

  const orderPrice = useMemo(() => {
    return orderIngredients.reduce(
      (acc, el: TIngredientItem) =>
        el.type === BUN ? acc + el.price * 2 : acc + el.price,
      0
    )
  }, [orderIngredients])

  return (
    <div className={`${style['feed-item']} mb-4`}>
      <div className={style['row-title']}>
        <div className="text text_type_digits-default">{number}</div>

        <div className="text text_type_main-default text_color_inactive">
          {updatedAt}
        </div>
      </div>

      <div className="text-overflow-ellipsis text text_type_main-medium">
        {name}
      </div>

      <div className={style['row-details']}>
        <div className={`${style['ingredients-icon-list']} ml-4`}>
          {orderIngredients.map((item: TIngredientItem) => (
            <BaseIcon key={item._id} {...item} />
          ))}
        </div>

        <BaseSum sum={orderPrice} />
      </div>
    </div>
  )
}
