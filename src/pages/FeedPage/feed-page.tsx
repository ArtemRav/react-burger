import style from './feed-page.module.css'
import { FeedOrderItem } from '../../components/FeedOrderItem/feed-order-item'
import { TIngredientItem } from '../../utils/ingredient-types'
import { data } from '../../utils/data'
import { ReadyOrdersInfo } from '../../components/ReadyOrdersInfo/ReadyOrdersInfo'

export type TOrderItem = {
  number: string
  title: string
  price: number
  ingredients: Array<TIngredientItem>
}

export const FeedPage = () => {
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

  return (
    <main className={`${style.main} pl-5 pr-5`}>
      <div className="header text text_type_main-large pt-5 pb-5">
        Лента заказов
      </div>
      <div className={style.body}>
        <section className={`${style['left-section']} app-scroll`}>
          {orderItems.map(item => (
            <FeedOrderItem key={item.number} {...item} />
          ))}
        </section>
        <section className={style['right-section']}>
          <ReadyOrdersInfo />
        </section>
      </div>
    </main>
  )
}
