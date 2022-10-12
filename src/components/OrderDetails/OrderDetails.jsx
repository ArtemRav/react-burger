import orderDetailsCss from './order-details.module.css'
import orderAccepted from '../../images/ingridients/order-accepted.jpg'
import PropTypes from 'prop-types'

export const OrderDetails = ({ orderNum }) => {
  return (
    <div className={`${orderDetailsCss.wrapper} pb-30`}>
      <p
        className={`${orderDetailsCss.number} text text_type_digits-large mb-8`}
      >
        {orderNum || 'Заказ не создан'}
      </p>
      <p
        className={`${orderDetailsCss.identifier} text text_type_main-medium mb-15`}
      >
        идентификатор заказа
      </p>
      <img
        className={orderDetailsCss.img}
        src={orderAccepted}
        alt="Заказ принят"
      />
      <p
        className={`${orderDetailsCss.status} text text_type_main-default mt-15 mb-2`}
      >
        Ваш заказ начали готовить
      </p>
      <p
        className={`${orderDetailsCss.info} text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

OrderDetails.propTypes = {
  orderNum: PropTypes.number.isRequired
}
