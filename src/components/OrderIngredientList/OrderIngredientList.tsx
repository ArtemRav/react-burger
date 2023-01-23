import { FC, useCallback, useMemo } from 'react'
import style from './order-ingredient-list.module.css'

import { OrderIngredient } from '../OrderIngredient/OrderIngredient'
import { addIngredient, UPDATE_INGREDIENTS_ORDER } from '../../services/actions'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import {
  BUN,
  TConstrElementType,
  TIngredientItem
} from '../../services/types/data'
import { useAppDispatch } from '../../hooks'
import { useDrop } from 'react-dnd'

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

  const orderBunsList = useMemo<Array<TIngredientItem>>(() => {
    return orderIngredients.filter(item => item.type === BUN)
  }, [orderIngredients])

  const orderIngredienstList = useMemo<Array<TIngredientItem>>(() => {
    return orderIngredients.filter(item => item.type !== BUN)
  }, [orderIngredients])

  const moveCard = useCallback<TMoveCard>(
    (dragIndex, hoverIndex) => {
      const dragItem = orderIngredienstList[dragIndex]
      const newIngredients = [...orderIngredienstList]
      newIngredients.splice(dragIndex, 1)
      newIngredients.splice(hoverIndex, 0, dragItem)
      dispatch({
        type: UPDATE_INGREDIENTS_ORDER,
        listItems: bun ? [bun, ...newIngredients, bun] : newIngredients
      })
    },
    [orderIngredienstList, bun, dispatch]
  )

  const [{ isHoverBunTop }, dropBoxBunTopRef] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      isHoverBunTop: monitor.isOver()
    }),
    drop(item: any) {
      handleDropBun(item)
    }
  })

  const [{ isHoverBunBottom }, dropBoxBunBottomRef] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      isHoverBunBottom: monitor.isOver()
    }),
    drop(item: any) {
      handleDropBun(item)
    }
  })

  const [{ isHoverIngredient }, dropBoxIngredientRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHoverIngredient: monitor.isOver()
    }),
    drop(item: any) {
      handleDropIngredient(item)
    }
  })

  const handleDropBun = (ingredient: TIngredientItem) => {
    dispatch(addIngredient(ingredient))
  }

  const handleDropIngredient = (ingredient: TIngredientItem) => {
    dispatch(addIngredient(ingredient))
  }

  const getOrderBun = (type: TConstrElementType, title: string) => {
    return (
      bun && (
        <div>
          <ConstructorElement
            type={type}
            isLocked={true}
            text={`${bun.name} (${title})`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
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
      <div
        ref={dropBoxBunTopRef}
        className={`${
          isHoverBunTop || isHoverBunBottom
            ? `${style['mockup-top']} ${style.onHover}`
            : ''
        } mb-4 ${style.bun} 
        ${!orderBunsList.length ? style['mockup-top'] : ''}`}
      >
        {!orderBunsList.length && (
          <p className={`${style['bun-label']} text text_type_main-medium`}>
            Добавьте булку
          </p>
        )}
        {getOrderBun('top', 'верх')}
      </div>

      <ul
        ref={dropBoxIngredientRef}
        className={`app-scroll ${
          isHoverIngredient ? `${style['mockup-list']} ${style.onHover}` : ''
        } 
        ${style.list} ${
          !orderIngredienstList.length ? style['mockup-list'] : ''
        }`}
      >
        {!orderIngredienstList.length && (
          <li className={`${style['bun-label']} text text_type_main-medium`}>
            Добавьте ингредиент
          </li>
        )}
        {orderIngredienstList.map((item, index) => {
          return getOrderIngredient(item, index)
        })}
      </ul>

      <div
        ref={dropBoxBunBottomRef}
        className={`${
          isHoverBunBottom || isHoverBunTop
            ? `${style['mockup-bottom']} ${style.onHover}`
            : ''
        } mt-4 ${style.bun} 
        ${!orderBunsList.length ? style['mockup-bottom'] : ''}`}
      >
        {!orderBunsList.length && (
          <p className={`${style['bun-label']} text text_type_main-medium`}>
            Добавьте булку
          </p>
        )}
        {getOrderBun('bottom', 'низ')}
      </div>
    </>
  )
}
