import React from 'react'

const Column = ({options, isVisible, children}) => {
  return(
    <div className={isVisible != false ? `column ${options}` : `column ${size} is-hidden`}>{children}</div>
  )
}
export default Column