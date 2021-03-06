import React from 'react'
import { useHistory } from 'react-router-dom'
import { FaChevronCircleDown } from "react-icons/fa"
import { FaChevronCircleUp } from "react-icons/fa"


const RelatedFieldDropDown = ({isActive, handleToggle, views, activeView, handleView, value, handleEditDrawer}) => {
  const history = useHistory()

  return(
    <>
    
    <div className="notification is-rounded is-12">
      
      <nav className="level">
      <span className="is-size-4"><strong>{value}</strong></span>
      <div className={isActive === true ? `dropdown is-active` : `dropdown`}>
        <div className="dropdown-trigger" >
          <div className="pl-1" onClick={handleToggle}>
            
            <span className="pr-1">
              {activeView && activeView}
            </span>
            <span className="icon pl-1">

              <FaChevronCircleUp onClick={handleToggle} style={{ marginTop: 'auto' }} className={isActive === true ? "icon is-small" : "is-hidden"} />
              <FaChevronCircleDown onClick={handleToggle} style={{ marginTop: 'auto' }} className={isActive === false ? "icon is-small" : "is-hidden"} />

            </span>
          </div>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <a className="dropdown-item" onClick={()=>handleEditDrawer()}>EDIT</a>
            <hr className="dropdown-divider" />
            {views.map(view =>

              <a className="dropdown-item" onClick={() => handleView(view)}>{view}</a>

            )}
          </div>
        </div>
      </div>
      
          
        
     
              </nav>
    </div>
</>
  )
}
export default RelatedFieldDropDown