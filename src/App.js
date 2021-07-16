import React, { useContext } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import { StateProvider, stateContext } from './Contexts/stateContext'
import { AuthProvider } from './Contexts/AuthContext'

import Hello from './Pages/Hello'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import Register from './Pages/Register'
import NavBar from './Components/NavBar'
import Footer from './Footer'

import AddCompany from './Pages/Companies/AddCompany'

import DetailModule from './Pages/DetailModule'
import RelatedDetailModule from './Pages/RelatedDetailModule'

import NotFound from './Components/NotFound'
import UserSettings from './Pages/Users/UserSettings'

import "./style.css"

export default function App() {
  
  const user = useContext(stateContext)
  
  return (
    <StateProvider>
    <AuthProvider>
      <Router>
      <NavBar />
       
      <div className="columns is-variable is-1-mobile is-mobile">
      <div className="column is-1 is-hidden-mobile"></div>
      <div className="column is-12-mobile has-text-black">
      <div className="container"> 
          <Switch>
            
            <Route exact path="/"  component={Hello} />
            <Route path="/dashboard" component={Dashboard} />
            
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            
            <Route path="/:isModule/:currentCompanyID/:id" component={DetailModule} />
            <Route path="/Related/:isModule/:currentCompanyID/:id" component={RelatedDetailModule} />
            
            <Route path="/addcompany" component={AddCompany} />
            <Route path="/settings" component={UserSettings} />
            
            <Route component={NotFound} />
            </Switch>
            
        </div>
        </div>
        <div className="column is-1 is-hidden-mobile"></div>
        </div>  
        
      <Footer />
      
    </Router>
    </AuthProvider>
    </StateProvider>
  );
}
