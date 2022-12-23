export const BUN: string = 'bun'
export const SAUCE: string = 'sauce'
export const MAIN: string = 'main'

export type TTab = {
  id: typeof BUN
  name: string
}

export type TConstrElementType = 'top' | 'bottom' | undefined

export type TUser = {
  name: string
  email: string
  password: string
}

export type TUserState = {
  loginRequest: boolean
  loginFailed: boolean
  loginSuccess: boolean
  isAuthChecked: boolean
  userInfo: TUser
}

export type TIngredientsInfo = {
  ingredientsRequest: boolean
  ingredientsFailed: boolean
  ingredientsList: Array<TIngredientItem>
  ingredientTabs: Array<TTab>
}

export type TOrderIngredient = {
  items: Array<TIngredientItem>
}

export type TRecoverPassword = {
  recoverPasswordRequest: boolean
  recoverPasswordSuccess: boolean
  recoverPasswordFailed: boolean
}

export type TResetPassword = {
  resetPasswordRequest: boolean
  resetPasswordSuccess: boolean
  resetPasswordFailed: boolean
}

export type TOrder = {
  number: number
  titleId: string
  titleState: string
  titleInfo: string
  titleOrderFailed: string
  orderRequest: boolean
  orderFailed: boolean
}

export type TOrdersListItem = {
  _id: string
  name: string
  status: string
  number: number
  createdAt: string
  updatedAt: string
  statusClass: string
  ingredients: Array<string>
}

export type TOrdersItem = {
  orderMakedRequest: boolean
  orderMakedFailed: boolean
  orderContent: TFeedOrdersItemData | any
}

export type TFeedOrdersItemData = {
  _id: string
  name: string
  status: string
  number: number
  date: string
  ingredients: Array<string>
}

export type TOrdersList = {
  orders: Array<TOrdersListItem>
  isCreated: boolean
  isOpen?: boolean
  total: number
  totalToday: number
  error?: unknown
}

export type TIngredientItem = {
  id?: string
  _id?: string
  name: string
  image: string
  price: number
  qnt: number
  type?: string
  calories?: number
  proteins?: number
  fat?: number
  carbohydrates?: number
  dragId?: string
}

export type TIngredient = {
  ingredient: TIngredientItem
}
