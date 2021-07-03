import React from 'react'
import { useHistory } from 'react-router-dom'

import { FaAngleDown } from "react-icons/fa"

const CompanyDropDown = ({currentCompany, companies, isActive, handleClick, handleToggle}) => {
  const history = useHistory()
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
            <a className="dropdown-item" onClick={()=> history.push("/addcompany")}>ADD</a>
            <hr className="dropdown-divider" />
            {companies && companies.map(company => 
              <a 
                className={currentCompany === company.Name ? "dropdown-item is-active": "dropdown-item"} 
                style={{textTransform: "uppercase"}}
                onClick={()=>handleClick({id: company.id, name: company.Name})}
              >
                {company.Name}
              </a>
            )}
          </div>
        </div>

      </div>
    </>
  )
}
export default CompanyDropDown