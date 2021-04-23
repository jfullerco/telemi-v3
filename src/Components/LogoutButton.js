import React, {useState, useContext} from 'react'
import {Link, Redirect, useHistory} from 'react-router-dom'

import {stateContext} from '../Contexts/stateContext'
import {auth} from '../Contexts/firebase'

const LogoutButton = () => {

  const history = useHistory()
  const userContext = useContext(stateContext)
  
  const [isActive, setIsActive] = useState(false)

  const logOut = () => {
    
    userContext.setLoggedIn(false)
    history.push("/")
  }

  return (
    <div className="navbar is-dark" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">

      <div className="navbar-item">
        <Link to="/dashboard" className="has-text-white">
          TELEMI
        </Link>
      </div>
    
    <a onClick={() => {
            setIsActive(!isActive)
          }}
          role='button'
          className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
          aria-label='menu'
          aria-expanded='false'
          data-target='tiemsNavbar'
        >
      <span aria-hidden='true'></span>
      <span aria-hidden='true'></span>
      <span aria-hidden='true'></span>
    </a>
      </div>
      <div 
        className={`navbar-menu ${isActive ? 'is-active' : ''}`}
        aria-label='menu' 
        id='tiemsNavbar'
      >

      <div className="navbar-end">
        {userContext.userSession.loggedIn != undefined ? (
          <>
          <div className="navbar-item">
          <div className="button is-small is-rounded">
            Create Account
          </div>
          </div>
          <Link to={`/dashboard`} className="navbar-item">
            Dashboard
          </Link>
          <a onClick={() => history.push("/reports")} className="navbar-item">Reports</a>
          <a onClick={logOut} className="navbar-item">
            Logout
          </a>
          </>
        ) : (
          <>
          
          <Link to="/login" className="navbar-item" >
            Login
          </Link>
          </>
        )}

      </div>
    </div>
  </div>
    
  )
}
export default LogoutButton