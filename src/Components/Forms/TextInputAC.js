import React from 'react'
import Hint from './Hint'

const TextInputAC = ({label, textInputRef, value, handleChange, handleClose, hint, isVisible, children}) => {

  return(
    <div className="field">

      <label className="label">{label}</label>

      <div className="control" aria-haspopup="true" aria-controls="dropdown-menu"> 

        <input 
          className="input is-rounded" 
          type="text" 
          ref={textInputRef} 
          value={value} 
          onChange={handleChange} 
        />

    

    <div className={isVisible != false ? "dropdown is-active is-fullwidth" : "is-hidden"} >

      <div className="dropdown-trigger"></div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">

        <div className="dropdown-content" onBlur={handleClose}>
          <ul><a className="dropdown-item" onClick={handleClose}>-Close-</a></ul>
            {children}
          
        </div>

      </div>
      
    </div>
    
    </div>
    {hint && <Hint>{hint}</Hint>}
    </div>
  )
}
export default TextInputAC