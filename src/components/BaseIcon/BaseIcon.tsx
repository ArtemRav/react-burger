import { FC } from 'react'
import style from './base-icon.module.css'

type TBaseIcon = {
  image: string
  name: string
}

export const BaseIcon: FC<TBaseIcon> = ({ image }) => {
  return (
    <div
      className={`${style['base-icon']}`}
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  )
}
