import React from 'react'

const Button = ({label, size, handleSubmit}) => {
  return(
    <div className="field">
    <div className="control">
      <button className="button is-small is-link is-rounded" onClick={handleSubmit}>{label}</button>
    </div>
    </div>
    
  )
}
export default Button