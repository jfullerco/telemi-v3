import React, {useState, useContext} from 'react'
import {Link, Redirect, useHistory} from 'react-router-dom'

import {stateContext} from '../Contexts/stateContext'
import {useAuth} from '../Contexts/AuthContext'
import {auth} from '../Contexts/firebase'

const NavBar = () => {

  const history = useHistory()
  const userContext = useContext(stateContext)
  const {userFirstName} = userContext.userSession
  const {currentUser, logOutUser} = useAuth()
  
  const [isActive, setIsActive] = useState(false)

  const handleNewUserButton = () => {
    history.push("/register")
  }

  const logOut = async() => {
    
    await auth.signOut()
    logOutUser()
    history.push("/")
    
  }

  return (
    <nav className="navbar is-black is-fixed-top" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">

      <div className="navbar-item">
        <Link to="/dashboard" className="has-text-white">
          TELEMI
        </Link><span className="is-size-7 pl-1">beta</span>
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
        
        {currentUser != undefined ? (
          <>
          
            
            <a className="navbar-item" onClick={()=>history.push("/dashboard")}>{userFirstName}</a>
            
          <div className="navbar-item has-dropdown is-hoverable">

            <a className="navbar-link" onClick={()=>history.push("/dashboard")}>Dashboard</a>
  
            <div className="navbar-dropdown">
              <a className="navbar-item" onClick={()=>history.push("/settings")}>SETTINGS</a>
            </div>
            
          </div>

          <a onClick={()=>logOut()} className="navbar-item">
            Logout
          </a>
          
          </>
        ) : (
          <>
          <div className="navbar-item" onClick={()=>handleNewUserButton()}>
          <button className="button is-small is-rounded has-background-grey-lighter">Create Account</button>
          </div>
          <Link to="/login" className="navbar-item" >
            Login
          </Link>
          </>
        )}

      </div>
    </div>
  </nav>
    
  )
}
export default NavBar