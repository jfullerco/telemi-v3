import React from 'react'

const FieldHover = ({isVisible, children}) => {
  return(
    <div className={isVisible === true ? "dropdown is-up is-active" : "is-hidden"}>
      <div className="dropdown-menu">
      <div className="dropdown-content"><div className="dropdown-item">{children}</div></div></div>
    </div>
  )
}
export default FieldHover