export const BUN: string = 'bun'
export const SAUCE: string = 'sauce'
export const MAIN: string = 'main'

export type TIngredientItem = {
  _id?: string
  name?: string
  image?: string
  price: number
  qnt?: number
  type?: string
  calories?: Array<number>
  proteins?: Array<number>
  fat?: Array<number>
  carbohydrates?: Array<number>
  dragId?: string
}

export type TIngredient = {
  ingredient: TIngredientItem
}
