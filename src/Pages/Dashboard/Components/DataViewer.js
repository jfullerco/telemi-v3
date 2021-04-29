import React, {useState, useEffect, useContext, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {stateContext} from '../../../Contexts/stateContext'
import {db} from '../../../Contexts/firebase'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faNetworkWired, faBuilding, faSort, faCube } from '@fortawesome/free-solid-svg-icons'


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
    history.push("/service")
    
  }

  const handleToggleServicesView = () => {
    userContext.setDataLoading(true)
    fetchServices()
    setToggleServicesView(!toggleServicesView)
  }

  const handleToggleAccountAddModal = () => {
    setToggleAccountAddModal(!toggleAccountAddModal)
  }

  const handleToggleAccountDetailModal = () => {
    setToggleAccountDetailModal(!toggleAccountDetailModal)
  }

  const handleToggleAccountView = () => {
    userContext.setDataLoading(true)
    fetchAccounts()
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
    userContext.setDataLoading(true)
    fetchLocations()
    setToggleLocationView(!toggleLocationView)
  }

  const handleToggleOrderDetailModal = (id) => {
    console.log(id)
    userContext.setCurrentOrderID(id)
    setToggleOrderDetailModal(!toggleOrderDetailModal)
  }

  const handleToggleOrderAddModal = () => {
    setToggleOrderAddModal(!toggleOrderAddModal)
  }

  const handleToggleOrderView = () => {
    userContext.setDataLoading(true)
    fetchOrders()
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
    history.push("/service")
  }

  /** useEffect(() => {
    
    
    
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
  **/
  
  const fetchLocations = async() => {

    const locationsRef = await db.collection("Locations").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const locations = locationsRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setLocations(locations)
    userContext.setDataLoading(false)
  }

  const fetchOrders = async() => {

    const ordersRef = await db.collection("Orders").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const orders = ordersRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setOrders(orders)
    userContext.setDataLoading(false)
  }

  const fetchServices = async() => {

    const servicesRef = await db.collection("Services").where("CompanyID", "==", userContext.userSession.currentCompanyID).orderBy("LocationName").get()

    const services = servicesRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setServices(services)
    userContext.setDataLoading(false)

  }

  const fetchAccounts = async() => {

    const accountsRef = await db.collection("Accounts").where("CompanyID", "==", userContext.userSession.currentCompanyID).orderBy("ParentAccountNum").get()

    const accounts = accountsRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setAccounts(accounts)
    userContext.setDataLoading(false)
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
      <div className="field has-addons">
        <p className="control is-expanded has-icons-left">
          <button className="button is-fullwidth is-black is-rounded has-text-weight-semibold" onClick={handleToggleServicesView}>
          <span className="icon is-left px-6">
            <FontAwesomeIcon icon={faNetworkWired} />
          </span>
          Services 
            <div className="is-size-7 ml-3">
              {services != undefined ? 
              <span className="tag is-light">
                {services.length}
              </span> : ""}
            </div>
          </button>
        </p>
      </div>
    </div>

    {toggleServicesView != false ? 
      
      <div className="table-container">
      <nav className="level">
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead className="is-size-6">
            <tr>
            <th className="px-6">
              Vendor
            </th>
            <th className="px-6">Vendor Service</th>
            <th className="px-6">Location</th>
            <th className="px-6">Asset ID</th>
            <th><button className="button is-rounded is-small" onClick={handleToggleServicesAddModal}>add</button></th>
            </tr>
          </thead>
          <tbody className="is-size-7">
          {userContext.userSession.dataLoading != true ?
          services != undefined ? services.map(service => (
            <tr key={service.id} onClick={() => handleServiceDetail(service.id)}>
              <td className="px-6">{service.Vendor}</td>
              <td className="px-6">{service.VendorServiceName} </td>
              <td className="px-6">{service.LocationName}</td>
              <td className="px-6">{service.AssetID}</td>
              <td>
                
                <button className="button is-rounded is-small" onClick={()=>handleServicesDetail(service.id)}>edit</button>
                
                </td>
            </tr>
          )) : 
            <tr> 
              <td> 
                <button className="button is-rounded is-small" onClick={handleToggleServicesAddModal}>
                  Add a service
                </button> 
              </td> 
            </tr>
          
          : <tr><td>Fetching Data...</td></tr>}

          </tbody>    
        </table>
        </nav>
      </div>
      
    : ""}

    {toggleAccountDetailModal != false ? <AccountDetail /> : ""}
    {toggleAccountAddModal != false ? <AddAccount /> : ""}
    
    
    <div className="title">
      <div className="field has-addons">
        <p className="control is-expanded has-icons-left">
          <button className="button is-fullwidth is-black is-rounded has-text-weight-semibold" onClick={handleToggleAccountView}>
          <span className="icon is-left px-6">
            <FontAwesomeIcon icon={faArchive} />
          </span>
          Accounts 
            <div className="is-size-7 ml-3">
              {accounts != undefined ? 
              <span className="tag is-light">
                {accounts.length}
              </span> : ""}
            </div>
          </button>
        </p>
      </div>
    </div>

    {toggleAccountView != false ? 
      <div className="table-container">
      <nav className="level">
        <table className="table is-striped is-hoverable is-fullwidth has-text-centered">
          <thead className="is-size-6">
            <tr>
            <th className="px-6">Vendor</th>
            <th className="px-6">Account</th>
            <th className="px-6">Sub Account</th>
            <th className="px-6">Location Linked</th>
            <th className="px-6">Monthly Cost</th>
            <th><button className="button is-rounded is-small" onClick={handleToggleAccountAddModal}>add</button></th>
            </tr>
          </thead>
          <tbody className="is-size-7">
          {userContext.userSession.dataLoading != true ?
            accounts != undefined ? accounts.map(account => (
            
            <tr key={account.id} onClick={() => handleAccountDetail(account.id)}>
              <td >{account.Vendor}</td>
              <td >{account.ParentAccountID === "Parent" ? account.AccountNum : account.ParentAccountNum}</td>
              <td >{account.ParentAccountID != "Parent" ? account.AccountNum : ""}</td>
              <td >{account.AccountServiceLocationName} </td>
              <td >$ {account.PostTaxMRC}</td>
              <td><button className="button is-rounded is-small" onClick={()=>handleToggleAccountDetailModal(account.id)}>edit</button></td>
            </tr>
            
          )) : 
            <tr> 
              <td> 
                <button className="button is-rounded is-small" onClick={handleToggleAccountAddModal}>
                  Add an Account
                </button> 
              </td> 
            </tr> 
          
        : <tr><td>Fetching Data...</td></tr>}

          </tbody>    
        </table>
        </nav>
      </div>
    : ""}

    {toggleLocationDetailModal != false ? <LocationDetail /> : ""}
    {toggleLocationAddModal != false ? <AddLocation /> : ""}

    <div className="title">
      <div className="field has-addons">
        <p className="control is-expanded has-icons-left">
          <button className="button is-fullwidth is-black is-rounded has-text-weight-semibold" onClick={handleToggleLocationView}>
          <span className="icon is-left px-6">
            <FontAwesomeIcon icon={faBuilding} />
          </span>
          Locations
            <div className="is-size-7 ml-3">
              {locations != undefined ? 
              <span className="tag is-light">
                {locations.length}
              </span> : ""}
            </div>
          </button>
        </p>
      </div>
    </div>
    
    {toggleLocationView != false ? 
    <div className="table-container">
    <nav className="level">
      <table className="table is-hoverable is-fullwidth">
        <thead className="is-size-6">
          <tr>  
            <th className="px-6">Location Name</th>
            <th className="px-6">Address</th>
            <th className="px-6">City</th>
            <th className="px-6">State</th>
            <th><button className="button is-rounded is-small" onClick={handleToggleLocationAddModal}>add</button></th>
          </tr>
        </thead>
        <tbody className="is-size-7">
        {userContext.userSession.dataLoading != true ?
          locations != undefined ? locations.map(location => (
          <tr key={location.id}>
            <td className="px-6">{location.Name}</td>
            <td className="px-6">{location.Address1} {location.Address2}</td>
            <td className="px-6">{location.City}</td>
            <td className="px-6">{location.State}</td>
            <td><button className="button is-rounded is-small" onClick={()=>handleToggleLocationDetailModal(location.id)}>edit</button></td>
          </tr>
        )) : 
          <tr> 
              <td> 
                <button className="button is-rounded is-small" onClick={handleToggleLocationAddModal}>
                  Add a Location
                </button> 
              </td> 
            </tr>
          : <tr><td>Fetching Data...</td></tr>}
        

        </tbody>    
      </table>
      </nav>
    </div> : "" }

    {toggleOrderDetailModal != false ? <OrderDetail /> : ""}
    {toggleOrderAddModal != false ? <AddOrder /> : ""}

    <div className="title">
    <div className="field has-addons">
        <p className="control is-expanded has-icons-left">
      <button className="button is-fullwidth is-black is-rounded has-text-weight-semibold" onClick={handleToggleOrderView}>
      <span className="icon is-left px-6">
        <FontAwesomeIcon icon={faCube} />
      </span>
        Orders 
      <span className="is-size-7 ml-3">
        {orders != undefined ? 
          <span className="tag is-light">
            {orders.length}
          </span> : ""}
      </span>
      </button>
      </p>
    </div>  
    </div>
    {toggleOrderView != false ? 
    <div className="table-container">
    <nav className="level">
      <table className="table is-striped is-fullwidth">
        <thead className="is-size-6">
        <tr>
          <th className="px-6">Vendor</th>
          <th className="px-6">Order Num</th>
          <th className="px-6">Date</th>
          <th className="px-6">Location</th>
          <th><button className="button is-rounded is-small" onClick={handleToggleOrderAddModal}>add</button></th>
        </tr>
        </thead>
        <tbody className="is-size-7">
        {userContext.userSession.dataLoading != true ?
          orders != undefined ? orders.map(order => (
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
        )) : 
          <tr> 
              <td> 
                <button className="button is-rounded is-small" onClick={handleToggleOrderAddModal}>
                  Add an Order
                </button> 
              </td> 
            </tr>
        : <tr><td>Fetching Data...</td></tr>}
        

        </tbody>    
      </table>
      </nav>
    </div> : ""}

    {toggleTicketDetailModal != false ? <TicketDetail /> : ""}
    {toggleTicketAddModal != false ? <AddTicket /> : ""}
    <div className="title">
      <button className="button is-fullwidth is-black is-rounded has-text-weight-semibold" onClick={handleToggleTicketView}>
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
        <thead className="is-size-6">
          <tr>
          <th className="px-6">Vendor</th>
          <th className="px-6">Ticket Number</th>
          <th className="px-6">Date</th>
          <th className="px-6">Location</th>
          <th><button className="button is-rounded is-small" onClick={handleToggleOrderAddModal}>add</button></th>
          </tr>
        </thead>
        <tbody className="is-size-7">
        {userContext.userSession.dataLoading != true ?
          tickets != undefined ? orders.map(order => (
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
        )) : 
          <tr> 
              <td> 
                <button className="button is-rounded is-small" onClick={handleToggleTicketAddModal}>
                  Add a Ticket
                </button> 
              </td> 
            </tr>
        : <tr><td>Fetching Data...</td></tr>}
        

        </tbody>    
      </table>
      </nav>
    </div> : ""}

    {toggleUsersAddModal != false ? "" : ""}
    <div className="title">
      <button className="button is-fullwidth is-black is-rounded has-text-weight-semibold" onClick={handleToggleUsersView}>
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
        <thead className="is-size-6">
          <tr>
          <th className="px-6">Email</th>
          <th><button className="button is-rounded is-small" onClick={handleToggleUsersAddModal}>add</button></th>
          </tr>
        </thead>
        <tbody className="is-size-7">
        {userContext.userSession.dataLoading != true ?
          users != undefined ? users.map(user => (
          <tr key={user.id}>
            <td className="px-6">
              {user.Email}
            </td>
            <td>
              {/** Insert Edit / Delete User */}
            </td>
          </tr>
        )) : 
          <tr> 
              <td> 
                <button className="button is-rounded is-small" onClick={handleToggleUsersAddModal}>
                  Add a User
                </button> 
              </td> 
            </tr>
        : <tr><td>Fetching Data...</td></tr>}
        </tbody>    
      </table>
      </nav>
    </div> : ""}
  
  </>
)
}
export default DataViewer
