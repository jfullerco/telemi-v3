import React, {useContext} from 'react'
import {stateContext} from '../Contexts/stateContext'

const DevTools = (props) => {
  const userContext = useContext(stateContext)
  const {
    currentCompanyID,
    currentCompany,
    currentLocationID,
    currentLocationName,
    currentServiceID,
    currentServiceName,
    currentTicket,
    currentOrder,
    currentAccountID,
    dataLoading
  } = userContext.userSession
  const view = props.view
  return (
    <>
    {view === "true" ? (
      
    <div className="notification mt-5 is-black">
      <p className="title is-5">contextViewer</p>
      <div className="box">

        <p className="sub-title">
          currentCompanyID: <code>{currentCompanyID}</code>
        </p>

        <p className="sub-title">
          currentCompany: <code>{currentCompany}</code>
        </p>

        <p className="sub-title">
          currentLocationID: <code>{currentLocationID}</code>
        </p>

        <p className="sub-title">
          currentLocationName: <code>{currentLocationName}</code>
        </p>

        <p className="sub-title">
          currentServiceID: <code>{currentServiceID}</code>
        </p>

        <p className="sub-title">
          currentServiceName: <code>{currentServiceName}</code>
        </p>

        <p className="sub-title">
          currentAccountID: <code>{currentAccountID}</code>
        </p>

        <p className="sub-title">
          dataLoading: <code>{dataLoading.toString()}</code>
        </p>
        
      </div>
      
    </div>
    
    ) : ""}
    </>
  )
}
export default DevTools