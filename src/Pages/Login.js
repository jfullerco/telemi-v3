import React, {useState, useEffect, useContext, useRef} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {useAuth} from '../Contexts/AuthContext'


export default function Login() {

  const emailRef = useRef("")
  const passwordRef = useRef("")
  const {login} = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [modalState, setModalState] = useState(true)
  const [loginError, setLoginError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (emailRef.current.value && passwordRef.current.value === null) {
      return setLoginError('Both email and password required')
    }
    try {
      setLoginError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/dashboard")
    } catch {
      setLoginError('Email or Password is incorrect')
      console.log(loginError)
    }
    setLoading(false)
   
  }

  const handleModalClose = () => {
    setModalState(false)
  }

  return(
    <div className={modalState === true ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">Login</div>
        <div className="modal-card-body">
          
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email</label>
                <div className="control">
                  <input className="input" type="email" ref={emailRef} />
                </div>
            </div>
            <div className="field">
              <label>Password</label>
                <div className="control">
                  <input className="input" type="password" ref={passwordRef}/>
                </div>
            </div>
          
        
            <div className={loginError != "" ? "block notification is-danger" : "block"}>
              <div className="level-item is-centered">{loginError != "" ? loginError : ""}</div>
            </div>
        
        <div className="modal-card-foot">
          
          <button 
            type="submit" 
            className={loading !== true ? "button level-item" : "button is-loading"} 
            disabled={loading}
          >
            Login
          </button>
          
          <div className="content is-small">
            Create account 
          <Link to="/register">Register</Link></div>
        
        </div>
        </form>
          <button 
            className="modal-close is-large" 
            aria-label="close" 
            onClick={()=>handleModalClose}
          >
          </button>  
        </div>
      </div>
    </div>
  )

}