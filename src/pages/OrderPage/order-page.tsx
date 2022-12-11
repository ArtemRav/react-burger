import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BaseSum } from '../../components/BaseSum/BaseSum'
import { OrderItem } from '../../components/OrderItem/OrderItem'
import { Preloader } from '../../components/Preloader/Preloader'
import { getOrderMaked } from '../../services/actions/order-maked'
import { TState } from '../../services/reducers'
import { BUN, TIngredientItem } from '../../services/types/data'
import style from './order-page.module.css'

export type TOrderPage = {
  number: string
  name: string
  state: string
  orderItems: Array<TIngredientItem>
  date: string
  sum: number
}

export const OrderPage = () => {
  const dispatch = useDispatch<any>()
  const { id } = useParams<{ id: string }>()
  const orderMakedRequest = useSelector(
    (state: TState) => state.orderMaked.orderMakedRequest
  )
  const orderData = useSelector(
    (state: TState) => state.orderMaked.orderContent
  )

  useEffect(() => {
    dispatch(getOrderMaked(id))
  }, [dispatch, id])

  const storeIngredients = useSelector(
    (state: TState) => state.allIngredients.ingredientsList
  )

  const orderIngredients = useMemo(() => {
    if (storeIngredients.length && orderData?.ingredients?.length) {
      return storeIngredients.filter((item: any) =>
        orderData.ingredients.includes(item._id)
      )
    }
    return []
  }, [storeIngredients, orderData])

  const orderPrice = useMemo(() => {
    if (orderIngredients.length) {
      return orderIngredients.reduce(
        (acc, el: TIngredientItem) =>
          el.type === BUN ? acc + el.price * 2 : acc + el.price,
        0
      )
    }
    return 0
  }, [orderIngredients])

  return (
    <div className={`${style.main} `}>
      {orderMakedRequest && <Preloader />}

      {!orderMakedRequest && (
        <>
          <div
            className={`${style.number} text text_type_digits-default mb-10`}
          >
            {orderData.number}
          </div>

          <div className={`text text_type_main-medium mb-3`}>
            {orderData.name}
          </div>

          <div className={`font-ready mb-15`}>{orderData.state}</div>

          <div className={`text text_type_main-medium mb-6`}>Состав:</div>

          <ul className={`app-scroll mb-10 pr-24 ${style.order} `}>
            {orderIngredients.map((item: TIngredientItem) => (
              <OrderItem key={item._id} {...item} />
            ))}
          </ul>

          <div className={`${style.summary} `}>
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
