import { FC } from 'react'
import { TIngredientItem } from '../../services/types/data'
import style from './base-icon.module.css'

export const BaseIcon: FC<TIngredientItem> = ({ image }) => {
  return (
    <div
      className={`${style['base-icon']}`}
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  )
}
