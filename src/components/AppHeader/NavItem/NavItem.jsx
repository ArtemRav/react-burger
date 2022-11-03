import styles from './nav-item.module.css'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

export const NavItem = props => {
  const { children, link, name } = props

  return (
    <div className={styles.item}>
      <div className="icon-wrapper mr-2">{children}</div>
      <NavLink
        to={link}
        className={`${styles.link} flex-wrap text_color_inactive`}
        activeClassName={'font-white'}
      >
        {name}
      </NavLink>
    </div>
  )
}

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  link: PropTypes.string
}
