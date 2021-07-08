import React from 'react'
import { FaAngleDown } from "react-icons/fa"

const RelatedFieldDropDown = ({isActive, handleToggle, label, children, type}) => {
  return(
    <>
    <div className={isActive === true ? `dropdown is-active`: `dropdown`}>
      <div className="dropdown-trigger" >
        <div className="has-text-black" onClick={handleToggle}>
        {label && label}
          <span className="icon">
            {label && <FaAngleDown onClick={handleToggle} style={{marginTop: 'auto'}} />}
          </span>
      </div> 
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content p-4">
          {children}
        </div>
      </div>
    </div>
      
    </>

  )
}
export default RelatedFieldDropDown