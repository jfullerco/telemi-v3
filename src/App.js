import React, {useState, useEffect, useContext} from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'

import {StateProvider, stateContext} from './Contexts/stateContext'
import {AuthProvider} from './Contexts/AuthContext'

import Hello from './Pages/Hello'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import LogoutButton from './Components/LogoutButton'
import LocationList from './Pages/Locations/LocationList'
import AccountDetail from './Pages/Accounts/AccountDetail'
import ServiceDetail from './Pages/Services/ServiceDetail'
import Service from './Pages/Services/Service'

import DevTools from './Testing/DevTools'
import "./style.css"

export default function App() {
  
  const user = useContext(stateContext)
  
  return (
    <StateProvider>
    <AuthProvider>
      <Router>
      <LogoutButton />
      <div className="container is-max-desktop is-one-third-tablet is-max-fullhd"> 
      <div id="wrapper" className="column">
      
       
          <Switch>
            
            <Route exact path="/"  component={Hello} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/locations" component={LocationList} />
            <Route path="/accountdetail" component={AccountDetail} />
            <Route path="/servicedetail" component={ServiceDetail} />
            <Route path="/service" component={Service} />
            
            
          
          </Switch>
        <DevTools view="true" />
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
