import React from 'react'
import { useHistory } from 'react-router-dom'

import Columns from './Layout/Columns'
import Column from './Layout/Column'


const Page = ({title, subtitle, active, pageError, pageSuccess, handleSubmit, handleToggle, autoClose, status, children}) => {

  const history = useHistory()
  
  return(
      <div className="wrapper p-3">
        
                <Columns options="is-mobile">
                  <Column size="is-three-quarters">
                    <div>
                      <span className="is-size-6 has-text-weight-bold">
                        {title}
                      </span> 
                      
                      <span className="is-size-4 has-text-weight-normal">
                        /{subtitle}
                      </span>
                    </div> 
                  </Column>
                  <Column size="is-one-quarter">
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
                        className={status === "new" ? "button is-link is-rounded is-small mr-1" : "is-hidden"} 
                        type="submit" 
                        onClick={handleSubmit}
                      >Save</button>

                      <button 
                        className="button is-rounded is-small mr-1" 
                        onClick={()=>history.goBack()}
                      >Back</button>

                    </div>
                  </Column>
                  </Columns>
                
          <div className="block">
            <div className={pageSuccess && pageSuccess != false ? "notification is-success" : "is-hidden"}>Saved</div>
            <div className={pageError && pageError != false ? "notification is-danger" : "is-hidden"}>Error Saving</div>
          </div>
          
            {children}
        <Column></Column> 
      </div>
  )
}
export default Page