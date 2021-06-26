import React from 'react'

const CompanyDropDown = ({currentCompany, companies, isActive, handleClick, handleToggle}) => {
  
  return(

    <div className={isActive === true ? `dropdown is-active`: `dropdown`}>

      <div className="dropdown-trigger">
        <div className="title has-text-black is-size-3 is-size-5-mobile" style={{textTransform: "uppercase"}} onClick={handleToggle}>{currentCompany}</div>
      </div>

      <div className="dropdown-menu">
        <div className="dropdown-content">
          {companies && companies.map(company => 
            <a 
              className={currentCompany === company.Name ? "dropdown-item is-active": "dropdown-item"} 
              onClick={()=>handleClick({id: company.id, name: company.Name})}
            >
              {company.Name}
            </a>
          )}
        </div>
      </div>

    </div>

  )
}
export default CompanyDropDown