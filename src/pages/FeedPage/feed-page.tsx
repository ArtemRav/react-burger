import style from './feed-page.module.css'
import { FeedOrders } from '../../components/FeedOrders/FeedOrders'
import { Preloader } from '../../components/Preloader/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_INIT
} from '../../services/actions/feed-orders'
import { FeedOrdersState } from '../../components/FeedOrdersState/FeedOrdersState'

export const FeedPage = () => {
  const isConnected = useSelector((state: any) => state.feedOrders.isOpen)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isConnected) {
      dispatch({
        type: FEED_CONNECTION_INIT,
        payload: '/all'
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
          <FeedOrders route="/feed" />

          <section className={style['right-section']}>
            <FeedOrdersState />
          </section>
        </div>
      )}
    </main>
  )
}
