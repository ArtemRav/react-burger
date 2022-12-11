import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { TState } from '../../services/reducers'
import { THistoryOrderItem } from '../../services/types/data'
import { FeedOrderItem } from '../FeedOrderItem/feed-order-item'
import style from './orders-history.module.css'

type TOrdersHistory = {
  route: string
}

export const OrdersHistory: FC<TOrdersHistory> = ({ route }) => {
  const orderItems = useSelector((state: TState) => state.ordersList.orders)

  const location = useLocation()

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
