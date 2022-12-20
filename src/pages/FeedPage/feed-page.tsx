import style from './feed-page.module.css'
import { FeedOrders } from '../../components/FeedOrders/FeedOrders'
import { Preloader } from '../../components/Preloader/Preloader'
import { useEffect } from 'react'
import {
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_INIT
} from '../../services/actions/feed-orders'
import { FeedOrdersState } from '../../components/FeedOrdersState/FeedOrdersState'
import { useAppDispatch, useAppSelector } from '../../hooks'

export const FeedPage = () => {
  const isConnected = useAppSelector((state: any) => state.feedOrders.isOpen)
  const feedOrdersList = useAppSelector(state => state.feedOrders.orders)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isConnected) {
      dispatch({
        type: FEED_CONNECTION_INIT,
        wsUrl: '/all'
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
    <main className={`${style.main} pl-5 pr-5`}>
      <div className="header text text_type_main-large pt-5 pb-5">
        Лента заказов
      </div>

      {!isConnected && <Preloader />}

      {isConnected && (
        <div className={style.body}>
          <FeedOrders ordersList={feedOrdersList} route="/feed" />

          <section className={style['right-section']}>
            <FeedOrdersState />
          </section>
        </div>
      )}
    </main>
  )
}
