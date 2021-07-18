import React from 'react'
import { useHistory } from 'react-router-dom'

import Columns from './Layout/Columns'
import Column from './Layout/Column'


const Page = ({title, subtitle, active, pageError, pageSuccess, handleSubmit, handleToggle, autoClose, status, backbtn, children}) => {

  const history = useHistory()
  
  return(
      <div className="wrapper">
        {/**<section className="hero is-small">
        <div className="hero-body">
          <Columns options="is-mobile">
                  <Column size="is-three-fifths-mobile is-three-quarters-tablet">
                    <div>
                      <span className="is-size-7-mobile is-size-6-tablet title has-text-black">
                        {title}
                      </span> 
                      
                      <span className={status === "new" ? "is-hidden" : "is-size-5-mobile is-size-4-tablet title has-text-black"}>
                        /{subtitle}
                      </span>
                    </div> 
                  </Column>
                  <Column >
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
                        className={backbtn && backbtn === "hide" ? "is-hidden" : "button is-rounded is-small mr-1"} 
                        onClick={()=>history.push("/dashboard")}
                      >Back</button>

                    </div>
                  </Column>
  </Columns> 
                  
          </div>
        </section>*/}
          
            <div className="py-5">{children}</div>
            <div className="block">
            <div className={pageSuccess && pageSuccess != false ? "notification is-success" : "is-hidden"}>{pageSuccess}</div>
            <div className={pageError && pageError != false ? "notification is-danger" : "is-hidden"}>{pageError}</div>
          </div>
        <Column></Column> 
      </div>
  )
}
export default Page