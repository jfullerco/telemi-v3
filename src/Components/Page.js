import React from 'react'
import { useHistory } from 'react-router-dom'

import Columns from './Layout/Columns'
import Column from './Layout/Column'


const Page = ({title, subtitle, active, pageError, pageSuccess, handleSubmit, handleToggle, autoClose, status, children}) => {

  const history = useHistory()
  
  return(
      <div className="wrapper">
        
          
          <section className="hero is-small">
                <div className="hero-body">
                <Columns options="is-mobile">
                  <Column size="is-three-quarters">
                    <div>
                      <span className="is-size-6">
                        {title}
                      </span> 
                      /
                      <span className="is-size-4">
                        {subtitle}
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
                </div>
              </section>
            

          
          
        
        
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