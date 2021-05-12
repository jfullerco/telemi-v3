import React, {useState, useRef, useContext, useEffect} from 'react'

const TextInputAC = (props) => {


  return(
    <div className={props.dropDownState != false ? "dropdown is-active" : "dropdown"}>
      <div className="dropdown-trigger">
        <input className="input is-rounded is-fullwidth" ref={props.ref} onChange={props.handleChange} aria-haspopup="true" aria-controls="dropdown-menu"/>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {props.children}
        </div>
      </div>
    </div>
  )
}
export default TextInputAC