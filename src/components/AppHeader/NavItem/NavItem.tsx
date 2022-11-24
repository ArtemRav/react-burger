import styles from './nav-item.module.css'
import { NavLink } from 'react-router-dom'
import { FC } from 'react'

type TNavItem = {
  children: any
  link: string
  name: string
}

export const NavItem: FC<TNavItem> = props => {
  const { children, link, name } = props

  return (
    <div className={styles.item}>
      <div className="icon-wrapper mr-2">{children}</div>
      <NavLink
        to={link}
        exact
        className={`${styles.link} flex-wrap text_color_inactive`}
        activeClassName={'font-white'}
      >
        {name}
      </NavLink>
    </div>
  )
}
