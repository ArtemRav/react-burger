import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { BaseSum } from '../../components/BaseSum/BaseSum'
import { OrderItem } from '../../components/OrderItem/OrderItem'
import { Preloader } from '../../components/Preloader/Preloader'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getOrderMaked } from '../../services/actions/feed-orders-item'
import { BUN, TIngredientItem } from '../../services/types/data'
import style from './order-page.module.css'

export const OrderPage = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()
  const orderData = useAppSelector(state => state.feedOrdersItem.orderContent)
  const orderMakedRequest = useAppSelector(
    state => state.feedOrdersItem.orderMakedRequest
  )

  useEffect(() => {
    dispatch(getOrderMaked(id))
  }, [dispatch, id])

  const storeIngredients = useAppSelector(
    state => state.allIngredients.ingredientsList
  )

  const orderIngredients = useMemo(() => {
    if (storeIngredients.length && orderData?.ingredients?.length) {
      const ingredients = storeIngredients.filter(item =>
        orderData.ingredients.includes(item._id)
      )
      const setIngredients = new Set(ingredients)
      return [...setIngredients].map(item => {
        const allCurIngredients = ingredients.filter(
          elem => elem._id === item._id
        )
        return {
          ...item,
          qnt: item.type === BUN ? 2 : allCurIngredients.length,
          price: item.price * allCurIngredients.length
        }
      })
    }
    return []
  }, [storeIngredients, orderData])

  const orderPrice = useMemo(() => {
    if (orderIngredients.length) {
      return orderIngredients.reduce(
        (acc, el) => (el.type === BUN ? acc + el.price * 2 : acc + el.price),
        0
      )
    }
    return 0
  }, [orderIngredients])

  return (
    <div className={`${style.main} pl-8 pr-8`}>
      {orderMakedRequest && <Preloader />}

      {!orderMakedRequest && (
        <>
          <div className={`${style.number} text text_type_digits-medium mb-10`}>
            {orderData.number}
          </div>

          <div className={`text text_type_main-medium mb-3`}>
            {orderData.name}
          </div>

          <div
            className={`${orderData.statusClass} text text_type_main-default mb-15`}
          >
            {orderData.status}
          </div>

          <div className={`text text_type_main-medium mb-6`}>Состав:</div>

          <ul className={`app-scroll mb-10 pr-24 ${style.order} `}>
            {orderIngredients.map((item: TIngredientItem) => (
              <OrderItem key={item._id} {...item} />
            ))}
          </ul>

          <div className={`${style.summary} pb-8`}>
            <div className="text text_type_main-default text_color_inactive">
              {orderData.date}
            </div>

            <BaseSum sum={orderPrice} />
          </div>
        </>
      )}
    </div>
  )
}
