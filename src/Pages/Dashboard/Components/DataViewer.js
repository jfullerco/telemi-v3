import React, {useState, useEffect, useContext, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {stateContext} from '../../../Contexts/stateContext'
import {db} from '../../../Contexts/firebase'

import EditServiceModal from '../../Services/EditServiceModal'
import AddService from '../../Services/AddService'
import LocationDetail from '../../Locations/LocationDetail'
import AddLocation from '../../Locations/AddLocation'
import OrderDetail from '../../Orders/OrderDetail'
import AddOrder from '../../Orders/AddOrder'
import TicketDetail from '../../Tickets/TicketDetail'
import AddTicket from '../../Tickets/AddTicket'
import AccountDetail from '../../Accounts/AccountDetail'
import AddAccount from '../../Accounts/AddAccount'

const DataViewer = (props) => {
  const userContext = useContext(stateContext)
  const {dataLoading} = userContext.userSession
  
  const currentCompany = userContext.userSession
  const history = useHistory()

  const [locations, setLocations] = useState()
  const [orders, setOrders] = useState()
  const [services, setServices] = useState()
  const [accounts, setAccounts] = useState()
  const [tickets, setTickets] = useState()
  const [users, setUsers] = useState()

  const [toggleServicesDetailModal, setToggleServicesDetailModal] = useState(false)

  const [toggleServicesAddModal, setToggleServicesAddModal] = useState(false)

  const [toggleServicesView, setToggleServicesView] = useState(false)

  const [toggleAccountDetailModal, setToggleAccountDetailModal] = useState(false)

  const [toggleAccountAddModal, setToggleAccountAddModal] = useState(false)

  const [toggleAccountView, setToggleAccountView] = useState(false)

  const [toggleLocationDetailModal, setToggleLocationDetailModal] = useState(false)

  const [toggleLocationAddModal, setToggleLocationAddModal] = useState(false)

  const [toggleLocationView, setToggleLocationView] = useState(false)

  const [toggleOrderDetailModal, setToggleOrderDetailModal] = useState(false)

  const [toggleOrderAddModal, setToggleOrderAddModal] = useState(false)
  
  const [toggleOrderView, setToggleOrderView] = useState(false)

  const [toggleTicketAddModal, setToggleTicketAddModal] = useState(false)

  const [toggleTicketDetailModal, setToggleTicketDetailModal] = useState(false)
  
  const [toggleTicketView, setToggleTicketView] = useState(false)

  const [toggleUsersAddModal, setToggleUsersAddModal] = useState(false)

  const [toggleUsersView, setToggleUsersView] = useState(false)

  const handleToggleServicesAddModal = () => {
    setToggleServicesAddModal(!toggleServicesAddModal)
  }

  const handleToggleServicesDetailModal = (id) => {
    
    userContext.setCurrentServiceID(id)
    setToggleServicesDetailModal(!toggleServicesDetailModal)
  }

  const handleToggleServicesView = () => {
    setToggleServicesView(!toggleServicesView)
  }

  const handleToggleAccountAddModal = () => {
    setToggleAccountAddModal(!toggleAccountAddModal)
  }

  const handleToggleAccountDetailModal = () => {
    setToggleAccountDetailModal(!toggleAccountDetailModal)
  }

  const handleToggleAccountView = () => {
    setToggleAccountView(!toggleAccountView)
  }
  
  const handleToggleLocationDetailModal = (id) => {
    
    userContext.setCurrentLocationID(id)
    setToggleLocationDetailModal(!toggleLocationDetailModal)
  }

  const handleToggleLocationAddModal = () => {
    setToggleLocationAddModal(!toggleLocationAddModal)
  }

  const handleToggleLocationView = () => {
    setToggleLocationView(!toggleLocationView)
  }

  const handleToggleOrderDetailModal = () => {
    setToggleOrderDetailModal(!toggleOrderDetailModal)
  }

  const handleToggleOrderAddModal = () => {
    setToggleOrderAddModal(!toggleOrderAddModal)
  }

  const handleToggleOrderView = () => {
    setToggleOrderView(!toggleOrderView)
  }

  const handleToggleTicketDetailModal = () => {
    setToggleTicketDetailModal(!toggleTicketDetailModal)
  }

  const handleToggleTicketAddModal = () => {
    setToggleTicketAddModal(!toggleTicketAddModal)
  }

  const handleToggleTicketView = () => {
    setToggleTicketView(!toggleTicketView)
  }

  const handleToggleUsersAddModal = () => {
    setToggleUsersAddModal(!toggleUsersAddModal)
  }

  const handleToggleUsersView = () => {
    setToggleUsersView(!toggleUsersView)
  }

  const handleAccountDetail = (id) => {
    userContext.setCurrentAccountID(id)
    userContext.setDataLoading(true)
    history.push("/accountdetail")
  }

  const handleServiceDetail = (id) => {
    userContext.setCurrentServiceID(id) 
    history.push("/servicedetail")
  }

  useEffect(() => {
    fetchLocations()
    fetchServices()
    fetchOrders()
    fetchAccounts()
  }, [currentCompany])

  useEffect(() => {
    reRender()
    userContext.setDataLoading(false)
  }, [dataLoading])

  const reRender = () => {
    dataLoading != false ? (fetchLocations(),
    fetchServices(),
    fetchOrders(),
    fetchAccounts()) : ""
  }
  
  const fetchLocations = async() => {

    const locationsRef = await db.collection("Locations").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const locations = locationsRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setLocations(locations)

  }

  const fetchOrders = async() => {

    const ordersRef = await db.collection("Orders").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const orders = ordersRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setOrders(orders)

  }

  const fetchServices = async() => {

    const servicesRef = await db.collection("Services").where("CompanyID", "==", userContext.userSession.currentCompanyID).orderBy("LocationName").get()

    const services = servicesRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setServices(services)

  }

  const fetchAccounts = async() => {

    const accountsRef = await db.collection("Accounts").where("CompanyID", "==", userContext.userSession.currentCompanyID).orderBy("ParentAccountNum").get()

    const accounts = accountsRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setAccounts(accounts)

  }

  const fetchTickets = async() => {

    const ticketsRef = await db.collection("Tickets").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const tickets = ticketsRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setTickets(tickets)

  }

  const fetchUsers = async() => {

    const usersRef = await db.collection("Users").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const users = usersRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setUsers(users)

  }

  const handleCheckExistingLocation = (e) => {
    
  }


return (
  <>
    {toggleServicesDetailModal != false ? <EditServiceModal /> : ""}
    {toggleServicesAddModal != false ? <AddService /> : ""}
    
    
    <div className="title">
      <button className="button is-medium is-black is-rounded is-fullwidth has-text-weight-bold" onClick={handleToggleServicesView}>
        Services 
        <div className="is-size-7 ml-3">
        {services != undefined ? 
          <span className="tag is-light">
            {services.length}
          </span> : ""}
      </div>
      </button>
    </div>

    {toggleServicesView != false ? 
      <div className="table-container">
      <nav className="level">
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
            <th className="px-6">Vendor</th>
            <th className="px-6">Vendor Service</th>
            <th className="px-6">Location</th>
            <th className="px-6">Asset ID</th>
            <th><button className="button is-rounded is-small" onClick={handleToggleServicesAddModal}>add</button></th>
            </tr>
          </thead>
          <tbody>
          {services != undefined ? services.map(service => (
            <tr key={service.id} onClick={() => handleServiceDetail(service.id)}>
              <td className="px-6">{service.Vendor}</td>
              <td className="px-6">{service.VendorServiceName} </td>
              <td className="px-6">{service.LocationName}</td>
              <td className="px-6">{service.AssetID}</td>
              <td>
                
                <button className="button is-rounded is-small" onClick={()=>handleToggleServicesDetailModal(service.id)}>edit</button>
                
                </td>
            </tr>
          )) : "No services added"}
          

          </tbody>    
        </table>
        </nav>
      </div>
    : ""}

    {toggleAccountDetailModal != false ? <AccountDetail /> : ""}
    {toggleAccountAddModal != false ? <AddAccount /> : ""}
    
    
    <div className="title">
      <button className="button is-medium is-black is-rounded is-fullwidth has-text-weight-bold" onClick={handleToggleAccountView}>
        Accounts 
        <div className="is-size-7 ml-3">
        {accounts != undefined ? 
          <span className="tag is-light">
            {accounts.length}
          </span> : ""}
      </div>
      </button>
    </div>

    {toggleAccountView != false ? 
      <div className="table-container">
      <nav className="level">
        <table className="table is-striped is-hoverable is-fullwidth has-text-centered">
          <thead>
            <tr>
            <th className="px-6">Vendor</th>
            <th className="px-6">Account</th>
            <th className="px-6">Sub Account</th>
            <th className="px-6">Location Linked</th>
            <th className="px-6">Monthly Cost</th>
            <th><button className="button is-rounded is-small" onClick={handleToggleAccountAddModal}>add</button></th>
            </tr>
          </thead>
          <tbody>
          {accounts != undefined ? accounts.map(account => (
            
            <tr key={account.id} onClick={() => handleAccountDetail(account.id)}>
            {console.log(account)}
              <td >{account.Vendor}</td>
              <td >{account.ParentAccountID === "Parent" ? account.AccountNum : account.ParentAccountNum}</td>
              <td >{account.ParentAccountID != "Parent" ? account.AccountNum : ""}</td>
              <td >{account.AccountServiceLocationName} </td>
              <td >$ {account.PostTaxMRC}</td>
              <td><button className="button is-rounded is-small" onClick={()=>handleToggleAccountDetailModal(account.id)}>edit</button></td>
            </tr>
            
          )) : "No accounts added"}
          

          </tbody>    
        </table>
        </nav>
      </div>
    : ""}

    {toggleLocationDetailModal != false ? <LocationDetail /> : ""}
    {toggleLocationAddModal != false ? <AddLocation /> : ""}

    <div className="title">
      <button className="button is-medium is-black is-rounded is-fullwidth has-text-weight-bold" onClick={handleToggleLocationView}>
      Locations 
      <div className="is-size-7 ml-3">
        {locations != undefined ? 
          <span className="tag is-light">
            {locations.length}
          </span> : ""}
      </div>
      </button>
    </div>
    {toggleLocationView != false ? 
    <div className="table-container">
    <nav className="level">
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>  
            <th className="px-6">Location Name</th>
            <th className="px-6">Address</th>
            <th className="px-6">City</th>
            <th className="px-6">State</th>
            <th><button className="button is-rounded is-small" onClick={handleToggleLocationAddModal}>add</button></th>
          </tr>
        </thead>
        <tbody>
        {locations != undefined ? locations.map(location => (
          <tr key={location.id}>
            <td className="px-6">{location.Name}</td>
            <td className="px-6">{location.Address1} {location.Address2}</td>
            <td className="px-6">{location.City}</td>
            <td className="px-6">{location.State}</td>
            <td><button className="button is-rounded is-small" onClick={()=>handleToggleLocationDetailModal(location.id)}>edit</button></td>
          </tr>
        )) : "No locations to display"}
        

        </tbody>    
      </table>
      </nav>
    </div> : "" }

    {toggleOrderDetailModal != false ? <OrderDetail /> : ""}
    {toggleOrderAddModal != false ? <AddOrder /> : ""}

    <div className="title">
      <button className="button is-medium is-black is-rounded is-fullwidth has-text-weight-bold" onClick={handleToggleOrderView}>
        Orders 
      <span className="is-size-7 ml-3">
        {orders != undefined ? 
          <span className="tag is-light">
            {orders.length}
          </span> : ""}
      </span>
      </button>
      
    </div>
    {toggleOrderView != false ? 
    <div className="table-container">
    <nav className="level">
      <table className="table is-striped is-fullwidth">
        <thead>
        <tr>
          <th className="px-6">Vendor</th>
          <th className="px-6">Order Num</th>
          <th className="px-6">Date</th>
          <th className="px-6">Location</th>
          <th><button className="button is-rounded is-small" onClick={handleToggleOrderAddModal}>add</button></th>
        </tr>
        </thead>
        <tbody>
        {orders != undefined ? orders.map(order => (
          <tr key={order.id}>
            <td className="px-6">
              {order.OrderVendor}
            </td>
            <td className="px-6">
              {order.OrderNum}
            </td>
            <td className="px-6">
              {order.OrderDate}
            </td>
            <td className="px-6">
              {order.LocationName}
            </td>
            <td>
              <button className="button is-rounded is-small" onClick={()=>handleToggleOrderDetailModal(order.id)}>edit</button>
            </td>
          </tr>
        )) : "No orders added"}
        

        </tbody>    
      </table>
      </nav>
    </div> : ""}

    {toggleTicketDetailModal != false ? <TicketDetail /> : ""}
    {toggleTicketAddModal != false ? <AddTicket /> : ""}
    <div className="title">
      <button className="button is-medium is-black is-rounded is-fullwidth has-text-weight-bold" onClick={handleToggleTicketView}>
      Tickets
      <span className="is-size-7 ml-3">
      {tickets != undefined ? <span className="tag is-light">{tickets.length}</span> : ""}
      </span>
      </button>
      
    </div>
    
    {toggleTicketView != false ? 
    <div className="table-container">
    <nav className="level">
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
          <th className="px-6">Vendor</th>
          <th className="px-6">Ticket Number</th>
          <th className="px-6">Date</th>
          <th className="px-6">Location</th>
          <th><button className="button is-rounded is-small" onClick={handleToggleOrderAddModal}>add</button></th>
          </tr>
        </thead>
        <tbody>
        {tickets != undefined ? orders.map(order => (
          <tr key={order.id}>
            <td className="px-6">
              {order.OrderVendor}
            </td>
            <td className="px-6">
              {order.OrderNum}
            </td>
            <td className="px-6">
              {order.OrderDate}
            </td>
            <td className="px-6">
              {order.LocationName}
            </td>
            <td>
              <button className="button is-rounded is-small" onClick={()=>handleToggleLocationDetailModal(location.id)}>edit</button>
            </td>
          </tr>
        )) : "No tickets added"}
        

        </tbody>    
      </table>
      </nav>
    </div> : ""}

    {toggleUsersAddModal != false ? "" : ""}
    <div className="title">
      <button className="button is-medium is-black is-rounded is-fullwidth has-text-weight-bold" onClick={handleToggleUsersView}>
      Users
      <span className="is-size-7 ml-3">
      {users != undefined ? <span className="tag is-light"> {users.length}</span> : ""}
      </span>
      </button>      
    </div>
    
    {toggleUsersView != false ? 
    <div className="table-container">
    <nav className="level is-centered">
      <table className="table is-striped is-fullwidth ">
        <thead>
          <tr>
          <th className="px-6">Email</th>
          <th><button className="button is-rounded is-small" onClick={handleToggleUsersAddModal}>add</button></th>
          </tr>
        </thead>
        <tbody>
        {users != undefined ? users.map(user => (
          <tr key={user.id}>
            <td className="px-6">
              {user.Email}
            </td>
            <td>
              {/** Insert Edit / Delete User */}
            </td>
          </tr>
        )) : "No Users added"}
        </tbody>    
      </table>
      </nav>
    </div> : ""}
  
  </>
)
}
export default DataViewer
