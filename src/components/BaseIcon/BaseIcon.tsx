import { FC } from 'react'
import { TBaseIcon } from '../../services/types/data'
import style from './base-icon.module.css'

export const BaseIcon: FC<TBaseIcon> = ({ image }) => {
  return (
    <div
      className={`${style['base-icon']}`}
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  )
}
