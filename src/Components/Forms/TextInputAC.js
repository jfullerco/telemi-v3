import React, {useState, useRef, useContext, useEffect} from 'react'

const TextInputAC = (props) => {


  return(
    <div className="field">
    <label className="label">{props.label}</label>
    <div className="control">
    <div className={props.dropDownState != false ? "dropdown is-active is-fullwidth" : "dropdown"}>
      <div className="dropdown-trigger">
        <input className="input is-rounded " type="text" value={props.value} onChange={props.handleChange} aria-haspopup="true" aria-controls="dropdown-menu"/>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {props.children}
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}
export default TextInputAC