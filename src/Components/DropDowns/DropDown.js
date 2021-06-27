import React from 'react'
import { FaAngleDown } from "react-icons/fa"

const CompanyDropDown = ({currentOption, options, isActive, handleClick, handleToggle}) => {
  
  return(
    <>
      <div className={isActive === true ? `dropdown is-active`: `dropdown`}>
        <div className="dropdown-trigger " >
          <div className="title has-text-black" style={{textTransform: "uppercase"}} onClick={handleToggle}>
          {currentCompany}
            <span className="icon is-large">
              {currentCompany && <FaAngleDown onClick={handleToggle} style={{marginTop: 'auto'}} />}
            </span>
        </div>
      </div>

        <div className="dropdown-menu">
          <div className="dropdown-content">
            {options && options.map(option => 
              <a 
                className={currentOption === option.Name ? "dropdown-item is-active": "dropdown-item"} 
                style={{textTransform: "uppercase"}}
                onClick={()=>handleClick({id: option.id, name: option.Name})}
              >
                {option.Name}
              </a>
            )}
          </div>
        </div>

      </div>
    </>
  )
}
export default CompanyDropDown