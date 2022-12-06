export const BUN: string = 'bun'
export const SAUCE: string = 'sauce'
export const MAIN: string = 'main'

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
