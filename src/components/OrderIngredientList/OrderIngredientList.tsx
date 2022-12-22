import { FC, useCallback, useMemo } from 'react'
import style from './order-ingredient-list.module.css'

import { OrderIngredient } from '../OrderIngredient/OrderIngredient'
import { UPDATE_INGREDIENTS_ORDER } from '../../services/actions'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import {
  BUN,
  TConstrElementType,
  TIngredientItem
} from '../../services/types/data'
import { useAppDispatch } from '../../hooks'

type TOrderIngredients = {
  orderIngredients: Array<TIngredientItem>
}

export const OrderIngredientList: FC<TOrderIngredients> = ({
  orderIngredients
}) => {
  type TMoveCard = (dragIndex: number, hoverIndex: number) => void

  const dispatch = useAppDispatch()

  const bun = useMemo(
    () => orderIngredients.find(ingredient => ingredient.type === BUN),
    [orderIngredients]
  )

  const bunIngredients = useMemo<Array<TIngredientItem>>(() => {
    return orderIngredients.filter(item => item.type !== BUN)
  }, [orderIngredients])

  const moveCard = useCallback<TMoveCard>(
    (dragIndex, hoverIndex) => {
      const dragItem = bunIngredients[dragIndex]
      const newIngredients = [...bunIngredients]
      newIngredients.splice(dragIndex, 1)
      newIngredients.splice(hoverIndex, 0, dragItem)
      dispatch({
        type: UPDATE_INGREDIENTS_ORDER,
        listItems: bun ? [bun, ...newIngredients, bun] : newIngredients
      })
    },
    [bunIngredients, bun, dispatch]
  )

  const getOrderBun = (type: TConstrElementType, title: string) => {
    return (
      bun && (
        <ConstructorElement
          type={type}
          isLocked={true}
          text={`${bun.name} (${title})`}
          price={bun.price}
          thumbnail={bun.image}
        />
      )
    )
  }

  const getOrderIngredient = useCallback(
    (item: TIngredientItem, index: number) => {
      return (
        <OrderIngredient
          key={item.dragId}
          item={item}
          index={index}
          moveCard={moveCard}
        />
      )
    },
    [moveCard]
  )

  return (
    <>
      <div className={`mb-4 ${style.bun}`}>{getOrderBun('top', 'верх')}</div>
      <ul className={`app-scroll ${style.list}`}>
        {bunIngredients.map((item, index) => {
          return getOrderIngredient(item, index)
        })}
      </ul>
      <div className={`mt-4 ${style.bun}`}>{getOrderBun('bottom', 'низ')}</div>
    </>
  )
}
