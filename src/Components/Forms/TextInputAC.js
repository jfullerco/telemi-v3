import React from 'react'
import Hint from './Hint'

const TextInputAC = ({label, textInputRef, value, handleChange, dropDownState, handleClose, hint, children}) => {

  return(
    <div className="field">

    <label className="label">{label}</label>

    <div className="control">

      <input className="input is-rounded" type="text" ref={textInputRef} value={value} onChange={handleChange} aria-haspopup="true" aria-controls="dropdown-menu" />

    

    <div className={dropDownState != false & dropDownState != undefined ? "dropdown is-active is-fullwidth" : "dropdown"}>

      <div className="dropdown-trigger"></div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">

        <div className="dropdown-content" onBlur={handleClose}>
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