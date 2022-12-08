import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { data } from '../../utils/data'
import { TIngredientItem } from '../../utils/ingredient-types'
import { FeedOrderItem } from '../FeedOrderItem/feed-order-item'
import style from './orders-history.module.css'

export type TOrderItem = {
  number: string
  title: string
  price: number
  ingredients: Array<TIngredientItem>
}

type TOrdersHistory = {
  route: string
}

export const OrdersHistory: FC<TOrdersHistory> = ({ route }) => {
  const orderItems: ReadonlyArray<TOrderItem> = [
    {
      number: '#034535',
      title: 'Death Star Starship Main бургер',
      price: 480,
      ingredients: data.slice(0, 5)
    },
    {
      number: '#034534',
      title: 'Interstellar бургер',
      price: 560,
      ingredients: data.slice(5, 8)
    },
    {
      number: '#034533',
      title: 'Black Hole Singularity острый бургер',
      price: 510,
      ingredients: data.slice(10, 12)
    },
    {
      number: '#034537',
      title: 'Death Star Starship Main бургер',
      price: 480,
      ingredients: data.slice(0, 5)
    },
    {
      number: '#034538',
      title: 'Interstellar бургер',
      price: 560,
      ingredients: data.slice(10, 14)
    },
    {
      number: '#034539',
      title: 'Black Hole Singularity острый бургер',
      price: 510,
      ingredients: data.slice(10, 15)
    }
  ]

  const location = useLocation()

  return (
    <section className={`${style['list-orders']} app-scroll pr-2`}>
      {orderItems.map(item => {
        const orderId = item.number.slice(1)
        return (
          <Link
            className="link"
            key={item.number}
            to={{
              pathname: `${route}/${orderId}`,
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
