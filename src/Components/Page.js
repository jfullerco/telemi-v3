import React, {useState, useEffect} from 'react'
import Columns from './Layout/Columns'
import Column from './Layout/Column'

const Page = ({title, pageError, pageSuccess, handleSubmit, autoClose, children}) => {
  return(
      <>
        <Columns>
          <Column size="is-four-fifths">
            <p className="title px-3 py-3">
              {title}
            </p> 
          </Column>
          <Column size="is-one-fifth">
            <p className="px-3 py-3">
            <button className="button is-small is-link is-rounded mr-1" type="submit" onClick={handleSubmit}>Save</button>
            <button className="button is-small is-rounded mr-1" onClick={()=>autoClose()}>Close</button>
            </p>
          </Column>
        </Columns>
         

          
            
          

          <div className="block">
            {pageSuccess != undefined ? <div className="notification is-success">{pageSuccess}</div> : ""}
          </div>
          <div className="card px-2 py-2">
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

      </div>     
      </>
  )
}
export default Page