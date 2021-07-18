import React from 'react'

const Field = ({size, children}) => {
  return(
    <div className={size}>
      {children}
    </div>
  )
}
export default Field