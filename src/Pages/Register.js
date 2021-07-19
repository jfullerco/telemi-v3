import React, {useContext, useRef, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {useAuth} from '../Contexts/AuthContext'

const Register = (props) => {
  
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const {signup} = useAuth()
  const history = useHistory()
  const [signupError, setSignupError] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalState, setModalState] = useState(true)

  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setSignupError('Passwords do not match')
    }
    try {
      setSignupError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch {
      setSignupError('Failed to create an account')
    }
    setLoading(false)
    history.push('/login')
    handleModalClose()
  }

  const handleModalClose = () => {
    setModalState(false)
  }

  return (
    
    <div className={modalState === true ? "modal is-active" : "modal"}>
    <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">Register</div>
        <div className="modal-card-body">
          <form>
            <label>Email</label>
            <input className="input" type="email" ref={emailRef} />
            <label>Password</label>
            <input className="input" type="password" ref={passwordRef}/>
            <label>Confirm Password</label>
            <input className="input" type="password" ref={confirmPasswordRef} />
          </form>
        <div className="block">
          <div className="notification is-danger is-hidden">{signupError}</div>
        </div>
        <div className="modal-card-foot">
          
          <button className={loading !== true ? "button is-rounded is-link is-link level-item" : "button is-loading"} 
          type="submit" disabled={loading} onClick={handleSubmit}
          >
            Register
          </button>
          
          <button className="button is-rounded" onClick={()=>history.push("/login")}>Login</button>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={handleModalClose}></button>  
        </div>
      </div>
    </div>
    
  )
}

export default Register