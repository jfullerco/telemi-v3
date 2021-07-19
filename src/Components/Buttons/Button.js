import React from 'react'

const Button = ({label, options, handleSubmit}) => {
  return(
    <div className="field">
    <div className="control">
      <button className={`button is-rounded ${options}`} onClick={handleSubmit}>{label}</button>
    </div>
    </div>
    
  )
}
export default Button