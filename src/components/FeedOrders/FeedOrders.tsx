import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TOrdersListItem } from '../../services/types/data'
import { FeedOrdersItem } from '../FeedOrdersItem/feed-orders-item'
import style from './feed-orders.module.css'

type TOrdersHistory = {
  route: string
  ordersList: Array<TOrdersListItem>
}

export const FeedOrders: FC<TOrdersHistory> = ({ route, ordersList }) => {
  const location = useLocation()

  return (
    <section className={`${style['list-orders']} app-scroll pr-2`}>
      {ordersList.map((item, idx) => {
        return (
          <Link
            className="link"
            key={idx}
            to={{
              pathname: `${route}/${item.number}`,
              state: { background: location }
            }}
          >
            <FeedOrdersItem {...item} />
          </Link>
        )
      })}
    </section>
  )
}
