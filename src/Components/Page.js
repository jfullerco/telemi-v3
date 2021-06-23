import React from 'react'
import { useHistory } from 'react-router-dom'

import Columns from './Layout/Columns'
import Column from './Layout/Column'


const Page = ({title, pageError, pageSuccess, handleSubmit, handleToggle, autoClose, status, children}) => {

  const history = useHistory()
  
  return(
      <div className="wrapper">
        <Columns options="is-vcentered">
          
          <Column size="is-half">
            <div className="title">
              {title}
            </div> 
          </Column>

          <Column size="is-half">
            <div className="mx-2 my-2">

              <button 
                className={status === "edit" ? "button is-link is-rounded is-small mr-1" : "is-hidden"} 
                type="submit" 
                onClick={handleSubmit}
              >Save</button>

              <button 
                className={status === "view" ? "button is-link is-rounded is-small mr-1" : "is-hidden"} 
                type="submit" 
                onClick={handleToggle}
              >Edit</button>

              <button 
                className="button is-rounded is-small mr-1" 
                onClick={()=>history.goBack()}
              >Back</button>

            </div>
          </Column>
          
        </Columns>
        
          <div className="block">
            <div className={pageSuccess != undefined ? "notification is-success" : "is-hidden"}>{pageSuccess}</div>
            <div className={pageError != undefined ? "notification is-danger" : "is-hidden"}>{pageError}</div>
          </div>
          
            {children}
        <Column></Column> 
      </div>
  )
}
export default Page