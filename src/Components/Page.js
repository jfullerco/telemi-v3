import React from 'react'
import { useHistory } from 'react-router-dom'

import Columns from './Layout/Columns'
import Column from './Layout/Column'


const Page = ({title, pageError, pageSuccess, handleSubmit, autoClose, children}) => {
  
  const history = useHistory()
  
  return(
      <>
        <Columns options="is-vcentered">
          <Column size="is-9 is-8-tablet is-12-mobile">
            <a className="link is-size-6" onClick={()=>history.goBack()}>{`< Back`}</a>
            <div className="title">
              {title}
            </div> 
          </Column>
          <Column size="is-3 is-4-tablet is-12-mobile is-aligned-right">
            <div className="mx-2 my-2">
            <button className="button is-link is-rounded mr-1" type="submit" onClick={handleSubmit}>Save</button>
            <button className="button is-rounded mr-1" onClick={()=>autoClose()}>Close</button>
            </div>
          </Column>
        </Columns>
        
          <div className="block">
            <div className={pageSuccess != undefined ? "notification is-success" : "is-hidden"}>{pageSuccess}</div>
            <div className={pageError != undefined ? "notification is-danger" : "is-hidden"}>{pageError}</div>
          </div>
          
            {children}

          <div className="py-6">
            <button className="button is-rounded is-link mr-2" type="submit" onClick={handleSubmit}>
              Save
            </button>
            <button className="button is-rounded mr-2" onClick={()=>autoClose()}>Close</button>
        </div>

           
      </>
  )
}
export default Page