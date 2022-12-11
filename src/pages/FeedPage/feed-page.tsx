import style from './feed-page.module.css'
import { ReadyOrdersInfo } from '../../components/ReadyOrdersInfo/ReadyOrdersInfo'
import { OrdersHistory } from '../../components/OrdersHistory/OrdersHistory'
import { Preloader } from '../../components/Preloader/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { WS_CONNECTION_START } from '../../services/actions/orders-list'

export const FeedPage = () => {
  const isConnected = useSelector((state: any) => state.ordersList.wsConnected)
  const dispatch = useDispatch()

  useEffect(() => {
    // Вопрос ревьюверу: почему тут вызов происходит 4 раза, так и не смог разобраться
    // console.log('FEED PAGE')
    dispatch({
      type: WS_CONNECTION_START,
      payload: '/all'
    })
  }, [dispatch])

  return (
    <main className={`${style.main} pl-5 pr-5`}>
      <div className="header text text_type_main-large pt-5 pb-5">
        Лента заказов
      </div>

      {!isConnected && <Preloader />}

      {isConnected && (
        <div className={style.body}>
          <OrdersHistory route="/feed" />

          <section className={style['right-section']}>
            <ReadyOrdersInfo />
          </section>
        </div>
      )}
    </main>
  )
}
