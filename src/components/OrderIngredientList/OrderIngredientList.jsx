import { useCallback, useMemo } from 'react'
import style from './order-ingredient-list.module.css'

import { OrderIngredient } from '../OrderIngredient/OrderIngredient'
import { useDispatch } from 'react-redux'
import { UPDATE_INGREDIENTS_ORDER } from '../../services/actions'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

export const OrderIngredientList = ({ orderIngredients }) => {
  const dispatch = useDispatch()

  const bun = useMemo(
    () => orderIngredients.find(ingredient => ingredient.type === 'bun'),
    [orderIngredients]
  )

  const bunIngredients = useMemo(() => {
    return orderIngredients.filter(item => item.type !== 'bun')
  }, [orderIngredients])

  const moveCard = useCallback(
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

  const getOrderBun = (type, title) => {
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
    (item, index) => {
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
