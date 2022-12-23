import style from './base-sum.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'

type TBaseSum = {
  sum?: number
  qnt?: string
}

export const BaseSum: FC<TBaseSum> = props => {
  return (
    <div className={style.wrapper}>
      <span className="mr-2">{props.sum || props.qnt}</span>
      <CurrencyIcon type="primary" />
    </div>
  )
}
