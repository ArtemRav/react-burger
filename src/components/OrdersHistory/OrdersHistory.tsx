import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_START
} from '../../services/actions/orders-list'
import { TState } from '../../services/reducers'
import { THistoryOrderItem } from '../../services/types/data'
import { getCookie } from '../../utils/cookie-helper'
import { FeedOrderItem } from '../FeedOrderItem/feed-order-item'
import style from './orders-history.module.css'

type TOrdersHistory = {
  route: string
}

export const OrdersHistory: FC<TOrdersHistory> = ({ route }) => {
  const orderItems = useSelector((state: TState) => state.ordersList.orders)
  const location = useLocation()
  const isConnected = useSelector((state: any) => state.ordersList.wsConnected)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isConnected) {
      dispatch({
        type: WS_CONNECTION_START,
        payload: `?token=${getCookie('accessToken')}`
      })
    }

    return () => {
      if (isConnected) {
        dispatch({
          type: WS_CONNECTION_CLOSE
        })
      }
    }
  }, [dispatch, isConnected])

  return (
    <section className={`${style['list-orders']} app-scroll pr-2`}>
      {orderItems.map((item: THistoryOrderItem, idx) => {
        return (
          <Link
            className="link"
            key={idx}
            to={{
              pathname: `${route}/${item.number}`,
              state: { background: location }
            }}
          >
            <FeedOrderItem {...item} />
          </Link>
        )
      })}
    </section>
  )
}
