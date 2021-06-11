import React from 'react'

const Column = ({options, size, isVisible, children}) => {
  return(
    <div className={isVisible != false ? `column ${options} ${size}` : `column is-hidden`}>{children}</div>
  )
}
export default Column