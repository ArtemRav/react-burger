import { NavItem } from './NavItem/NavItem'
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import appHeader from './app-header.module.css'
import { useCallback, useState } from 'react'

export const AppHeader = () => {
  const [activeTabName, setActiveTabName] = useState('constructor')

  const isActiveTab = useCallback(
    tab => {
      return activeTabName === tab
    },
    [activeTabName]
  )

  return (
    <header className={appHeader.header}>
      <nav className="pt-4 pb-4">
        <ul>
          <li
            className="pt-4 pb-4 pr-5 pl-5 mr-2"
            onClick={() => setActiveTabName('constructor')}
          >
            <NavItem name="Конструктор" isActive={isActiveTab('constructor')}>
              <BurgerIcon
                type={isActiveTab('constructor') ? 'primary' : 'secondary'}
              />
            </NavItem>
          </li>
          <li
            className="pt-4 pb-4 pr-5 pl-5"
            onClick={() => setActiveTabName('feed')}
          >
            <NavItem name="Лента заказов" isActive={isActiveTab('feed')}>
              <ListIcon type={isActiveTab('feed') ? 'primary' : 'secondary'} />
            </NavItem>
          </li>
          <li className={appHeader.logo}>
            <Logo />
          </li>
          <li
            className="pt-4 pb-4 pr-5 pl-5"
            onClick={() => setActiveTabName('account')}
          >
            <NavItem name="Личный кабинет" isActive={isActiveTab('account')}>
              <ProfileIcon
                type={isActiveTab('account') ? 'primary' : 'secondary'}
              />
            </NavItem>
          </li>
        </ul>
      </nav>
    </header>
  )
}
