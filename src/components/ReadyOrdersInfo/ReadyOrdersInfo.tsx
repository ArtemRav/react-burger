import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { TState } from '../../services/reducers'
import style from './ready-orders-info.module.css'

export const ReadyOrdersInfo = () => {
  const orderItems = useSelector((state: TState) => state.ordersList.orders)
  const orderTotal = useSelector((state: TState) => state.ordersList.total)
  const orderTotalToday = useSelector(
    (state: TState) => state.ordersList.totalToday
  )
  const readyOrders = useMemo(
    () =>
      orderItems
        .filter(item => item.status === 'done')
        .map(item => item.number),
    [orderItems]
  )
  const processOrders = useMemo(
    () =>
      orderItems
        .filter(item => item.status !== 'done')
        .map(item => item.number),
    [orderItems]
  )

  return (
    <div className={`${style.main} ml-15`}>
      <div className={`${style.table} mb-15`}>
        <div className={`${style.ready}`}>
          <div className={`${style.title} text text_type_main-medium mb-6`}>
            Готовы:
          </div>
          <ul className={`${style['main-list']} app-scroll`}>
            {readyOrders.map((order, idx) => (
              <li
                className="text text_type_digits-default font-ready mb-2"
                key={idx}
              >
                {order}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${style.process}`}>
          <div className={`${style.title} text text_type_main-medium mb-6`}>
            В работе:
          </div>
          <ul className={`${style['main-list']} app-scroll`}>
            {processOrders.map(order => (
              <li className="text text_type_digits-default mb-2" key={order}>
                {order}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`${style.total} mb-15`}>
        <div className={`${style.label} text text_type_main-medium`}>
          Выполнено за все время:
        </div>
        <div
          className={`${style.qnt} text text_type_digits-large text-highlight`}
        >
          {orderTotal}
        </div>
      </div>

      <div className={`${style.today}`}>
        <div className={`${style.label} text text_type_main-medium`}>
          Выполнено за сегодня:
        </div>
        <div
          className={`${style.qnt} text text_type_digits-large text-highlight`}
        >
          {orderTotalToday}
        </div>
      </div>
    </div>
  )
}
