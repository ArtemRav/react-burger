import { NavItem } from './NavItem/NavItem'
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import appHeader from './app-header.module.css'

export const AppHeader = () => {
  return (
    <header className={appHeader.header}>
      <nav className="pt-4 pb-4">
        <ul>
          <li className="pt-4 pb-4 pr-5 mr-2">
            <NavItem name="Конструктор" link="/">
              <BurgerIcon type="primary" />
            </NavItem>
          </li>
          <li className="pt-4 pb-4 pr-5 pl-5">
            <NavItem name="Лента заказов" link="/feed">
              <ListIcon type="secondary" />
            </NavItem>
          </li>
          <li className={appHeader.logo}>
            <Logo />
          </li>
          <li className="pt-4 pb-4 pr-5 pl-5">
            <NavItem name="Личный кабинет" link="/profile">
              <ProfileIcon type="secondary" />
            </NavItem>
          </li>
        </ul>
      </nav>
    </header>
  )
}
