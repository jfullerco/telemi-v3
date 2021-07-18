import React from 'react'
import { useHistory } from 'react-router-dom'
import { FaChevronCircleDown } from "react-icons/fa"
import { FaChevronCircleUp } from "react-icons/fa"

const RelatedFieldDropDown = ({isActive, handleToggle, views, activeView, handleView, value}) => {
  const history = useHistory()

  return(
    <div className="notification is-rounded is-12">
      <button className="delete" onClick={() => history.goBack()}></button>
      <nav className="level">
      <span className="is-size-4">{value}</span>
      <div className={isActive === true ? `dropdown is-active` : `dropdown`}>
        <div className="dropdown-trigger" >
          <div className="pl-1" onClick={handleToggle}>
            
            <span className=" is-size-7 pr-1" style={{ fontVariant: ['small-caps'] }}>
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
            {views.map(view =>

              <a className="dropdown-item" onClick={() => handleView(view)}>{view}</a>

            )}
          </div>
        </div>
      </div>
      
          
        
     
              </nav>
    </div>

  )
}
export default RelatedFieldDropDown