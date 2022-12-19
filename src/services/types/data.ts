export const BUN: string = 'bun'
export const SAUCE: string = 'sauce'
export const MAIN: string = 'main'

export type TBaseIcon = {
  image: string
  name: string
}

export type TTab = {
  id: typeof BUN
  name: string
}

export type TUser = {
  name?: string
  email: string
  password: string
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
  ingredients: Array<string>
}

export type TOrdersList = {
  wsConnected?: boolean
  error?: any
  success: boolean
  orders: Array<TOrdersListItem>
  total: number
  totalToday: number
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
