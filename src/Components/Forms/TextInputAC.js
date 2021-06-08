import React, {useState, useRef, useContext, useEffect} from 'react'
import Hint from './Hint'

const TextInputAC = (props) => {

  const [inputSmall, setInputSmall] = useState(props.inputSmall)

  return(
    <div className="field">

    <label className="label">{props.label}</label>

    <div className="control">

      <input className={inputSmall == "true" ? "input is-rounded is-small" : "input is-rounded"} type="text" value={props.value} onChange={props.handleChange} placeholder={props.defaultValue} aria-haspopup="true" aria-controls="dropdown-menu" />

    

    <div className={props.dropDownState != false & props.dropDownState != undefined ? "dropdown is-active is-fullwidth" : "dropdown"}>

      <div className="dropdown-trigger"></div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">

        <div className="dropdown-content" onBlur={props.handleClose}>
          {props.children}
        </div>

      </div>
      
    </div>
    
    </div>
    {props.hint && <Hint>{props.hint}</Hint>}
    </div>
  )
}
export default TextInputAC