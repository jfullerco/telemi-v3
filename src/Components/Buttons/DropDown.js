import React from 'react'
import Hint from '../Forms/Hint'

const DropDown = ({label, dropDownState, handleChange, hint, children}) => {
  return(
    <>
    <div className={dropDownState != false ? "dropdown is-active" : "dropdown"}>
      <div className="dropdown-trigger" onChange={()=>handleChange()}>
        <a onChange={handleChange} aria-haspopup="true" aria-controls="dropdown-menu">{label && label}</a>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {children}
        </div>
      </div>
    </div>
      <div className={hint && hint != undefined ? "" : "is-hidden"}><Hint>{hint}</Hint></div>
    </>

  )
}
export default DropDown