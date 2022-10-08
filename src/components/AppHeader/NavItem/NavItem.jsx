import navItem from './nav-item.module.css'
import PropTypes from 'prop-types'

export const NavItem = props => {
  const { children, link, name, isActive } = props

  return (
    <div className={navItem.item}>
      <div className="icon-wrapper mr-2">{children}</div>
      <a
        href={link || '#'}
        className={`${navItem.link} flex-wrap ${
          isActive ? 'font-white' : 'text_color_inactive'
        }`}
      >
        {name}
      </a>
    </div>
  )
}

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  link: PropTypes.string
}
