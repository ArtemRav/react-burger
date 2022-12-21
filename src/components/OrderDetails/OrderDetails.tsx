import orderDetailsCss from './order-details.module.css'
import orderAccepted from '../../images/ingridients/order-accepted.jpg'
import { useAppSelector } from '../../hooks'
import Spinner from '../spinner/spinner'

export const OrderDetails = () => {
  const { number, titleId, titleState, titleInfo, isLoading } = useAppSelector(
    state => state.curOrder
  )

  const getTitleNumber = () => {
    return (
      <p
        className={`text-center text-highlight text text_type_digits-large mb-8`}
      >
        {number}
      </p>
    )
  }

  const getFullForm = () => {
    return (
      <>
        <p
          className={`${orderDetailsCss.identifier} text text_type_main-medium mb-15`}
        >
          {titleId}
        </p>
        <img
          className={orderDetailsCss.img}
          src={orderAccepted}
          alt="Заказ принят"
        />
        <p
          className={`${orderDetailsCss.status} text text_type_main-default mt-15 mb-2`}
        >
          {titleState}
        </p>
        <p
          className={`${orderDetailsCss.info} text text_type_main-default text_color_inactive`}
        >
          {titleInfo}
        </p>
      </>
    )
  }

  const getDetails = () => {
    return (
      <>
        {!!number && getTitleNumber()}
        {!number && <Spinner />}
        {!!number && getFullForm()}
      </>
    )
  }

  return (
    <div className={`${orderDetailsCss.wrapper} pb-30`}>
      {isLoading && <Spinner />}
      {!isLoading && getDetails()}
    </div>
  )
}
