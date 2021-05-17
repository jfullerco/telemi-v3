import React, {useState, useEffect} from 'react'

const Page = ({title, pageError, pageSuccess, handleSubmit, autoClose, children}) => {
  return(
      <>
        <span className="title">
          {title}
        </span> 
        <div className="level-right">
          <button className="button is-small is-link is-rounded mr-1" type="submit" onClick={handleSubmit}>Save</button>
          <button className="button is-small is-rounded mr-1" onClick={()=>autoClose()}>Close</button>
        </div> 
        <p className="block">
          {pageSuccess != undefined ? <div className="notification is-success">{pageSuccess}</div> : ""}
        </p>
        <form>
          {children}
        </form>
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