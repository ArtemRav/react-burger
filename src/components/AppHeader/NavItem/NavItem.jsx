import navItem from './nav-item.module.css'
import PropTypes from 'prop-types'

export const NavItem = props => {
  return (
    <div className={navItem.item}>
      <div style={{ display: 'flex' }} className="icon-wrapper mr-2">
        {props.children}
      </div>
      <a
        href={props.link || '#'}
        className={`${navItem.link} text_color_inactive`}
        style={{ color: props.color }}
      >
        {props.name}
      </a>
    </div>
  )
}

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  link: PropTypes.string
}
