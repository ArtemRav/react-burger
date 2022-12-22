import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, useMemo } from 'react'
import { useAppSelector } from '../../hooks'
import {
  BUN,
  TOrdersListItem,
  TIngredientItem
} from '../../services/types/data'
import { BaseIcon } from '../BaseIcon/BaseIcon'
import { BaseSum } from '../BaseSum/BaseSum'
import style from './feed-orders-item.module.css'

export const FeedOrdersItem: FC<TOrdersListItem> = ({
  name,
  number,
  createdAt,
  ingredients
}) => {
  const storeIngredients = useAppSelector(
    state => state.allIngredients.ingredientsList
  )
  const limitIngredients = 6

  const orderIngredients = useMemo(
    () =>
      storeIngredients.filter(item => {
        const _id = item._id || ''
        return ingredients.includes(_id)
      }),
    [storeIngredients, ingredients]
  )

  const ingredientsVisible = orderIngredients.slice(0, limitIngredients)
  const overLimitQnt =
    orderIngredients.length > limitIngredients
      ? orderIngredients.length - limitIngredients
      : null

  const orderPrice = useMemo(() => {
    return orderIngredients.reduce(
      (acc, el) => (el.type === BUN ? acc + el.price * 2 : acc + el.price),
      0
    )
  }, [orderIngredients])

  return (
    <div className={`${style['feed-item']} mb-4`}>
      <div className={style['row-title']}>
        <div className="text text_type_digits-default">{number}</div>

        <div className="text text_type_main-default text_color_inactive">
          {<FormattedDate date={new Date(createdAt)} />}
        </div>
      </div>

      <div className="text-overflow-ellipsis text text_type_main-medium">
        {name}
      </div>

      <div className={style['row-details']}>
        <div className={`${style['ingredients-icon-list']} ml-4`}>
          {ingredientsVisible.map((item: TIngredientItem) => (
            <BaseIcon key={item._id} {...item} />
          ))}
          {overLimitQnt && (
            <div className={style['overlimit']}>{`+${overLimitQnt}`}</div>
          )}
        </div>

        <BaseSum sum={orderPrice} />
      </div>
    </div>
  )
}
