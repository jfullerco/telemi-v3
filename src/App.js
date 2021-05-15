import React, {useState, useEffect, useContext} from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'

import {StateProvider, stateContext} from './Contexts/stateContext'
import {AuthProvider} from './Contexts/AuthContext'

import Hello from './Pages/Hello'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import LogoutButton from './Components/LogoutButton'

import AddCompany from './Pages/Companies/AddCompany'
import AddService from './Pages/Services/AddService'
import AddAccount from './Pages/Accounts/AddAccount'
import AddLocation from './Pages/Locations/AddLocation'
import AddOrder from './Pages/Orders/AddOrder'
import AddTicket from './Pages/Tickets/AddTicket'

import CompanyDetail from './Pages/Companies/CompanyDetail'
import ServiceDetail from './Pages/Services/ServiceDetail'
import AccountDetail from './Pages/Accounts/AccountDetail'
import LocationDetail from './Pages/Locations/LocationDetail'
import OrderDetail from './Pages/Orders/OrderDetail'
import TicketDetail from './Pages/Tickets/TicketDetail'



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
            
            <Route path="/companydetails" component={CompanyDetail} />
            <Route path="/servicedetail" component={ServiceDetail} />
            <Route path="/accountdetail" component={AccountDetail} />
            <Route path="/locationdetail" component={LocationDetail} />
            <Route path="/orderdetail" component={OrderDetail} />
            <Route path="/ticketdetail" component={TicketDetail} />
            
            <Route path="/addcompany" component={AddCompany} />
            <Route path="/addservice" component={AddService} />
            <Route path="/addaccount" component={AddAccount} />
            <Route path="/addlocation" component={AddLocation} />
            <Route path="/addorder" component={AddOrder} />
            <Route path="/addticket" component={AddTicket} />
            
            
          
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
