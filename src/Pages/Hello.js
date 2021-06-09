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
    {modalState === true ? <Register modalState={modalState} /> : ""}
      <div className="title has-text-weight-bold"> Telecom is hard... </div>
      <div className="subtitle has-text-weight-light">
        Managing it shouldn't be!
      </div>
      <div className="notification is-light is-parent is-hidden">
      <div className="content is-medium">
      <span className="has-text-weight-semibold is-uppercase has-text-black">Think of this as your telecom passport</span>
      <div className="content is-small has-text-black">
        <a>Join our quest</a> to bring a single source of truth to Telecom Asset, Billing and Service management where leveraging existing service and billing data will drive more informed purchasing decisions and roadmap adoption. 
      </div>
      </div>
      </div>
      </div>
          
  )
}
export default Hello