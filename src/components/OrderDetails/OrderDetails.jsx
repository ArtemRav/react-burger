import orderDetailsCss from './order-details.module.css'
import orderAccepted from '../../images/ingridients/order-accepted.jpg'

export const OrderDetails = () => {
  const { wrapper, number, identifier, img, status, info } = orderDetailsCss

  return (
    <div className={`${wrapper} pb-30`}>
      <p className={`${number} text text_type_digits-large mb-8`}>034536</p>
      <p className={`${identifier} text text_type_main-medium mb-15`}>
        идентификатор заказа
      </p>
      <img className={img} src={orderAccepted} alt="Заказ принят" />
      <p className={`${status} text text_type_main-default mt-15 mb-2`}>
        Ваш заказ начали готовить
      </p>
      <p className={`${info} text text_type_main-default text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}
