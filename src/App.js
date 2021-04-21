import React, {useState, useEffect, useContext} from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'

import {StateProvider, stateContext} from './Contexts/stateContext'
import {AuthProvider} from './Contexts/AuthContext'

import Hello from './Pages/Hello'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import LogoutButton from './Components/LogoutButton'
import AccountDetail from './Pages/Accounts/AccountDetail'

import DevTools from './Testing/DevTools'
import "./style.css"

export default function App() {
  
  const user = useContext(stateContext)
  
  return (
    <StateProvider>
    <AuthProvider>
      <Router>
      <LogoutButton />
      <div className="container is-max-desktop"> 
      <div className="column">
      
       
          <Switch>
            
            <Route exact path="/"  component={Hello} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/accountdetail" component={AccountDetail} />
            
            
          
          </Switch>
        <DevTools view="false" />
        </div>  
        
      <div className="footer">
      <div className="content has-text-right is-size-7">
        Telemi by J Fuller Co| Terms | Settings
      </div>
      </div>
      </div>
    </Router>
    </AuthProvider>
    </StateProvider>
  );
}
