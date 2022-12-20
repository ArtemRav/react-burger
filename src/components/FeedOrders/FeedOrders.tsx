import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import {
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_INIT
} from '../../services/actions/feed-orders'
import { TState } from '../../services/reducers'
import { TOrdersListItem } from '../../services/types/data'
import { getCookie } from '../../utils/cookie-helper'
import { FeedOrdersItem } from '../FeedOrdersItem/feed-orders-item'
import style from './feed-orders.module.css'

type TOrdersHistory = {
  route: string
}

export const FeedOrders: FC<TOrdersHistory> = ({ route }) => {
  const feedOrders = useSelector((state: TState) => state.feedOrders.orders)
  const isConnected = useSelector((state: any) => state.feedOrders.isOpen)
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isConnected) {
      dispatch({
        type: FEED_CONNECTION_INIT,
        payload: `?token=${getCookie('accessToken')}`
      })
    }

    return () => {
      if (isConnected) {
        dispatch({
          type: FEED_CONNECTION_CLOSE
        })
      }
    }
  }, [dispatch, isConnected])

  return (
    <section className={`${style['list-orders']} app-scroll pr-2`}>
      {feedOrders.map((item: TOrdersListItem, idx) => {
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
