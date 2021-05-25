import React, {useState, useEffect} from 'react'

const Page = ({title, pageError, pageSuccess, handleSubmit, autoClose, children}) => {
  return(
      <>
        <span className="title">
          {title}
        </span> 
        <div className="level">
        <div className="level-left">
          <button className="button is-small is-link is-rounded mr-1" type="submit" onClick={handleSubmit}>ACCOUNTS</button>
          <button className="button is-small is-link is-rounded mr-1" onClick={()=>autoClose()}>TICKETS</button>
        </div> 
        <div className="level-right">
          <button className="button is-small is-link is-rounded mr-1" type="submit" onClick={handleSubmit}>Save</button>
          <button className="button is-small is-rounded mr-1" onClick={()=>autoClose()}>Close</button>
        </div>
        </div> 
        <p className="block">
          {pageSuccess != undefined ? <div className="notification is-success">{pageSuccess}</div> : ""}
        </p>
        
          {children}
        
        <div className="block">
        <div className="notification is-danger is-hidden">{pageError != undefined ? pageError : ""}</div>
         
        </div>
        <div className="modal-card-foot">
          <button className="button is-rounded is-link level-item" type="submit" onClick={handleSubmit}>
            Save
          </button>
          <button className="button is-rounded mr-1" onClick={()=>autoClose()}>Close</button>
        
        </div>     
      </>
  )
}
export default Page