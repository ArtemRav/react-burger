import style from './feed-page.module.css'
import { ReadyOrdersInfo } from '../../components/ReadyOrdersInfo/ReadyOrdersInfo'
import { OrdersHistory } from '../../components/OrdersHistory/OrdersHistory'

export const FeedPage = () => {
  return (
    <main className={`${style.main} pl-5 pr-5`}>
      <div className="header text text_type_main-large pt-5 pb-5">
        Лента заказов
      </div>
      <div className={style.body}>
        <OrdersHistory />

        <section className={style['right-section']}>
          <ReadyOrdersInfo />
        </section>
      </div>
    </main>
  )
}
