import styles from './nav-item.module.css'
import { NavLink } from 'react-router-dom'
import { FC, ReactNode } from 'react'

type TNavItem = {
  children: ReactNode
  link: string
  name: string
}

export const NavItem: FC<TNavItem> = props => {
  const { children, link, name } = props

  return (
    <div className={styles.item}>
      <NavLink
        to={link}
        exact
        className={`${styles['nav-link']} link flex-wrap text_color_inactive`}
        activeClassName={'app_header__nav_link__active'}
      >
        <div className={`${styles['icon']} icon`}>{children}</div>
        <div className="text ml-2">{name}</div>
      </NavLink>
    </div>
  )
}
