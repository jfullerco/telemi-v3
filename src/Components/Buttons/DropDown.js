import React from 'react'

const DropDown = ({label, children}) => {
  return(

    <div className="field">
    <label className="label">{label}</label>
    <div className="control">
    <div className={props.dropDownState != false ? "dropdown is-active is-fullwidth" : "dropdown"}>
      <div className="dropdown-trigger">
        <input className={inputSmall == "true" ? "input is-rounded is-small" : "input is-rounded"} type="text" value={props.value} onChange={props.handleChange} aria-haspopup="true" aria-controls="dropdown-menu"/>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {children}
        </div>
      </div>
    </div>
      <div className={hint && hint != undefined ? "" : "is-hidden"}><Hint>{hint}</Hint></div>
    </div>
    </div>

  )
}
export default DropDown