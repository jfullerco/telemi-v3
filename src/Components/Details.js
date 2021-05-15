import React, {useState, useEffect} from 'react'

const Page = (props) => {
  return(
      <>
        <span className="title">
          {title}
        </span> 
        <div className="level-right">
          <button className="button is-small is-link is-rounded mr-1" type="submit" onClick={handleSubmit}>Save</button>
          <button className="button is-small is-rounded mr-1" onClick={()=>autoClose()}>Close</button>
        </div> 
        <p className="block" />
        <form>
          {children}
        </form>
        <div className="block">
        <div className="notification is-danger is-hidden">{pageError && pageError}</div>
         {success === true ?  <div className="notification is-success">Service Added</div> : ""}
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