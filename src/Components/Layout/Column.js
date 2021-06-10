import React from 'react'

const Column = ({options, size, isVisible, children}) => {
  return(
    <div className={isVisible != false ? `column ${options} ${size}` : `column ${size} is-hidden`}>{children}</div>
  )
}
export default Column