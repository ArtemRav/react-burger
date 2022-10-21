import { CREATE_ORDER } from '../actions'

const initialState = {
  number: 0,
  titleId: 'идентификатор заказа',
  titleState: 'Ваш заказ начали готовить',
  titleInfo: 'Дождитесь готовности на орбитальной станции',
  titleOrderFailed: 'Заказ не создан'
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return { ...state, number: action.orderNum }
    default:
      return state
  }
}
