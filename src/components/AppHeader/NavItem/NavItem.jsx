import './nav-item.css'

export const NavItem = props => {
  return (
    <div className="nav-item">
      <div style={{ display: 'flex' }} className="icon-wrapper mr-2">
        {props.children}
      </div>
      <a
        href={props.link || '#'}
        className="text_color_inactive"
        style={{ color: props.color }}
      >
        {props.name}
      </a>
    </div>
  )
}
