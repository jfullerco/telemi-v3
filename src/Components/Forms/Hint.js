import React from 'react'

const Hint = ({isVisible, children}) => {
  return(
    <div className={isVisible != false ? " is-family-sans-serif is-size-7 has-text-weight-light pl-4" : "is-hidden"}>
      {children}
    </div>
  )
}
export default Hint