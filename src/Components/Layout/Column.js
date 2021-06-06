import React from 'react'

const Column = ({size, isVisible, children}) => {
  return(
    <div className={isVisible != false ? `column ${size}` : `column ${size} is-hidden`}>{children}</div>
  )
}
export default Column