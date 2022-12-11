import { BaseSum } from '../../components/BaseSum/BaseSum'
import { OrderItem } from '../../components/OrderItem/OrderItem'
import { TIngredientItem } from '../../services/types/data'
import { data } from '../../utils/data'
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
  const orderData: TOrderPage = {
    number: '#034533',
    name: 'Black Hole Singularity острый бургер',
    state: 'Выполнен',
    orderItems: data.slice(0, 5),
    date: 'Вчера, 13:50',
    sum: 510
  }

  return (
    <div className={`${style.main} `}>
      <div className={`${style.number} text text_type_digits-default mb-10`}>
        {orderData.number}
      </div>

      <div className={`text text_type_main-medium mb-3`}>{orderData.name}</div>

      <div className={`font-ready mb-15`}>{orderData.state}</div>

      <div className={`text text_type_main-medium mb-6`}>Состав:</div>

      <ul className={`app-scroll mb-10 pr-24 ${style.order} `}>
        {orderData.orderItems.map((item: TIngredientItem) => (
          <OrderItem key={item._id} {...item} />
        ))}
      </ul>

      <div className={`${style.summary} `}>
        <div className="text text_type_main-default text_color_inactive">
          {orderData.date}
        </div>

        <BaseSum sum={orderData.sum} />
      </div>
    </div>
  )
}
