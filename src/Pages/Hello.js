import React, {useState} from 'react'
import Register from './Register'
import {useAuth} from '../Contexts/AuthContext'

const Hello = () => {
  const [modalState, setModalState] = useState(false)
  const handleModalState = () => {
    setModalState(!modalState)
  }
  const currentUser = useAuth()
  
  return (
    <div>
    
      <section className="hero ">
          <div className="hero-body">
            <div className="columns">
                <div className="column">
                  <div className="title has-text-weight-bold"> Telecom is hard... </div>
                    <div className="subtitle has-text-weight-light">
                      Managing it shouldn't be!
                    </div></div>
                    <div className="level">
                      <div className="column level-right">
                        
                        
                      </div>
                    </div>
               
            </div>
          </div>
        </section>
        {modalState === true ? <Register modalState={modalState} /> : ""}
        <div className="columns is-centered ">
          <div className="column">
            
            
            <div className="notification is-light is-parent ">
              <p className="content is-medium">
                <span className="has-text-weight-semibold is-uppercase has-text-black">Think of this as your telecom passport</span>
              
              
                <div className="content is-small has-text-black">
                 <a>Join our quest</a> to bring a single source of truth to Telecom Asset, Billing and Service management where leveraging existing service and billing data will drive more informed purchasing decisions and roadmap adoption. 
                
              </div>
              </p>
              
            </div>
            
          </div>
          <div className="column is-7"></div>
        </div>
    </div>
  )
}
export default Hello