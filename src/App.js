import React, {useState, useEffect, useContext} from 'react'
import {Route, Switch, Link, BrowserRouter as Router} from 'react-router-dom'

import {StateProvider, stateContext} from './Contexts/stateContext'
import {AuthProvider} from './Contexts/AuthContext'

import Hello from './Pages/Hello'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import Register from './Pages/Register'
import NavBar from './Components/NavBar'

import AddCompany from './Pages/Companies/AddCompany'

import AddAccount from './Pages/Accounts/AddAccount'
import AddLocation from './Pages/Locations/AddLocation'
import AddOrder from './Pages/Orders/AddOrder'
import AddTicket from './Pages/Tickets/AddTicket'
import AddUser from './Pages/Users/AddUser'
import AddContract from './Pages/Contracts/AddContract'

import DetailModule from './Pages/DetailModule'
import CompanyDetail from './Pages/Companies/CompanyDetail'
import ServiceDetail from './Pages/Services/ServiceDetail'
import AccountDetail from './Pages/Accounts/AccountDetail'
import LocationDetail from './Pages/Locations/LocationDetail'
import OrderDetail from './Pages/Orders/OrderDetail'
import TicketDetail from './Pages/Tickets/TicketDetail'

import ContractDetail from './Pages/Contracts/ContractDetail'

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
            <Route path="/Related/:isModule/:currentCompanyID/:id" component={DetailModule} />
            <Route path="/accountdetail/:id" component={AccountDetail} />
            <Route path="/locationdetail/:id/:checked/:new" component={LocationDetail} />
            <Route path="/orderdetail/:currentCompanyID/:id" component={OrderDetail} />
            <Route path="/ticketdetail/:id/:checked/:new" component={TicketDetail} />
            <Route path="/contractdetail/:id/:checked/:new" component={ContractDetail} />
            
            <Route path="/addcompany" component={AddCompany} />
            <Route path="/settings" component={UserSettings} />
            
            <Route path="/addaccount" component={AddAccount} />
            <Route path="/addlocation" component={AddLocation} />
            <Route path="/addorder" component={AddOrder} />
            <Route path="/addticket" component={AddTicket} />
            <Route path="/adduser" component={AddUser} />
            <Route path="/addcontract" component={AddContract} />
            
            <Route component={NotFound} />
            </Switch>
            
        </div>
        </div>
        <div className="column is-1 is-hidden-mobile"></div>
        </div>  
        
      <div className="footer">
      <div className="content has-text-right is-size-7 ">
        Telemi developed by J Fuller Co | <Link to="/terms">Terms</Link> | <Link to="/settings">Settings</Link> | <a href="https://www.vecteezy.com/free-vector/network">Vectors by Vecteezy</a>
      </div>
      </div>
      
    </Router>
    </AuthProvider>
    </StateProvider>
  );
}
