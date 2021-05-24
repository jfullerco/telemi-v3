import React, {useState, useEffect, useContext, useRef} from 'react'
import {Link, useHistory, Redirect} from 'react-router-dom'

import {stateContext} from '../../../Contexts/stateContext'
import {db} from '../../../Contexts/firebase'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons'

import DeleteButton from '../../../Components/Buttons/DeleteButton'
import Search from '../../../Components/Search'

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

const DataViewer = ({visible}) => {
  const userContext = useContext(stateContext)
  const {dataLoading, currentCompany} = userContext.userSession

  const history = useHistory()

  const [locations, setLocations] = useState()
  const [orders, setOrders] = useState()
  const [services, setServices] = useState()
  const [accounts, setAccounts] = useState()
  const [tickets, setTickets] = useState()
  const [users, setUsers] = useState()
  const [searchDropDown, setSearchDropDown] = useState(false)
  const searchRef = useRef("")

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

  const [toggleReportsView, setToggleReportsView] = useState(true)

  const [toggleQuotesView, setToggleQuotesView] = useState(false)

  const [toggleUsersView, setToggleUsersView] = useState(false)

  const [toggleSearchServices, setToggleSearchServices] = useState(false)

  const handleToggleServicesAddModal = () => {
    setToggleServicesAddModal(!toggleServicesAddModal)
  }

  const handleServiceDetail = (id) => {
    console.log(history)
    userContext.setCurrentServiceID(id)
    userContext.setLocations(locations)
    history.push("/servicedetail")
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

  const handleToggleTicketDetailModal = (id) => {
    userContext.setCurrentTicketID(id)
    setToggleTicketDetailModal(!toggleTicketDetailModal)
  }

  const handleToggleTicketAddModal = () => {
    setToggleTicketAddModal(!toggleTicketAddModal)
  }

  const handleToggleTicketView = () => {
    fetchTickets()
    setToggleTicketView(!toggleTicketView)
  }

  const handleToggleUsersAddModal = () => {
    setToggleUsersAddModal(!toggleUsersAddModal)
  }

  const handleToggleUsersView = () => {
    setToggleUsersView(!toggleUsersView)
  }

  const handleToggleReportsView = () => {
    setToggleReportsView(!toggleReportsView)
  }

  const handleToggleQuotesView = () => {
    setToggleQuotesView(!toggleQuotesView)
  }

  const handleAccountDetail = (id) => {
    userContext.setCurrentAccountID(id)
    userContext.setDataLoading(true)
    history.push("/accountdetail")
  }

  

  useEffect(() => {
    fetchLocations(),
    fetchServices(),
    fetchOrders(),
    fetchAccounts()
    
  }, [currentCompany])

  useEffect(() => {
    reRender()
    userContext.setDataLoading(false)
  }, [dataLoading])

  const reRender = () => {
    dataLoading != false ? (
    fetchLocations(),
    fetchServices(),
    fetchOrders(),
    fetchAccounts()
    ) : ""
  }
  
  const fetchLocations = async() => {

    const locationsRef = await db.collection("Locations").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const locations = locationsRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setLocations(locations)
    userContext.setDataLoading(false)
  }

  const fetchLocationsSort = async(value) => {

    const locationsRef = await db.collection("Locations").where("CompanyID", "==", userContext.userSession.currentCompanyID).orderBy(value).get()

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
    console.log(services)
  }

  const fetchServicesFilter = async(key, value) => {
  
    const servicesRef = await db.collection("Services").where("CompanyID", "==", userContext.userSession.currentCompanyID).where(key, "==", value).get()

    const services = servicesRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setServices(services)
    userContext.setDataLoading(false)

  }

  const fetchServicesSort = async(value) => {
    console.log(value)
    const servicesRef = await db.collection("Services").where("CompanyID", "==", userContext.userSession.currentCompanyID).orderBy(value).get()

    const services = servicesRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setServices(services)
    userContext.setDataLoading(false)

  }

  const fetchAccounts = async() => {

    const accountsRef = await db.collection("Accounts").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

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

  const handleChangeSearchServices = (e) => {
    
    const {value} = e.target
    value == "" ? fetchServices() : ""
    const servicesAC = services.filter(({LocationName, AssetID, Vendor, Type}) => LocationName.indexOf(value) > -1 || AssetID.indexOf(value) > 1 || Vendor.indexOf(value) > -1 || Type.indexOf(value) > -1 )
    searchRef.current = value
    setServices(servicesAC) 
    
  }

  const handleServicesSuggestedRef = (name, id) => {
    console.log(name)
    console.log(id)
    ticketLocationID.current = id
    ticketLocationName.current = name
    setDropDown("")
  }

return (
  <>
  {visible != false ?
  <>
    
    
     
    <div className="title">
      <div className="field has-addons">
        <p className="control is-expanded has-icons-left">
          <button id="dashboard-button" className="button is-fullwidth is-outlined is-black is-rounded has-text-weight-bold" onClick={handleToggleServicesView}>
          SERVICES 
          </button>
        </p>
      </div>
    </div>
    
      <div className="tile">
      <input className="input is-rounded is-small " placeholder="search" onChange={(e)=>handleChangeSearchServices(e)} />
      </div> 
    
    {toggleServicesView != true ? 
      
      <div className="table-container">
      <nav className="level">
      
        <table className="table is-striped is-hoverable is-fullwidth ">
        
          
        
          <thead className="is-size-6">
            
            <tr>
            <th className="is-hidden-mobile">
              Vendor
            </th>
            <th>
              <a onClick={()=>fetchServicesSort("VendorServiceName")}>Product</a>
            </th>
            <th>
              <a onClick={()=>fetchServicesSort("LocationName")}>Location</a>
            </th>
            <th>
              Asset ID
            </th>
            <th>
              Type
            </th>
            <th>
            <a className="tag is-small is-rounded is-link is-7 has-text-weight-normal" onClick={() => history.push("/addservice")}>
              Add New
            </a>
            </th>
            </tr>
          </thead>
          <tbody className="is-size-7">

          {userContext.userSession.dataLoading != true ?
            services != undefined ? services.map(service => (
            
            <tr onClick={() => handleServiceDetail(service.id)} key={service.id}>
              <td style={{width: "15%"}} className="is-hidden-mobile">{service.Vendor}</td>
              <td style={{width: "20%"}}>{service.VendorServiceName} </td>
              <td style={{width: "20%"}}>{service.LocationName}</td>
              <td style={{width: "20%"}}>{service.AssetID}</td>
              <td style={{width: "20%"}}>{service.Type}</td>
              <td style={{width: "15%"}}>
                
                <span className="icon is-right">
                <DeleteButton colRef="Services" docRef={service.id} />
                </span>
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
          <button id="dashboard-button" className="button is-fullwidth is-outlined is-black is-rounded has-text-weight-bold" onClick={handleToggleAccountView}>
          
          ACCOUNTS 
            
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
            <th className="px-5">Vendor</th>
            <th className="px-5">Account</th>
            <th className="px-5">Sub Account</th>
            <th className="px-5">Location Linked</th>
            <th className="px-5">Monthly Cost</th>
            <th>
              <span className="icon is-left">
              <FontAwesomeIcon 
                icon={faPlus} 
                  onClick={handleToggleAccountAddModal} 
              />
              </span>
            </th>
            </tr>
          </thead>
          <tbody className="is-size-7">
          {userContext.userSession.dataLoading != true ?
            accounts != undefined ? accounts.map(account => (
            
            <tr key={account.id} >
              <td >{account.Vendor}</td>
              <td >{account.AccountNum}</td>
              <td >{account.SubAccountNum}</td>
              <td >{account.AccountServiceLocationName} </td>
              <td >$ {account.PostTaxMRC}</td>
              <td>
                <span className="icon is-left">
                <FontAwesomeIcon icon={faEdit} onClick={()=>
                  history.push({
                      pathname: "/accountdetail",
                      state: {
                      id: account.id,
                      services: services,
                      locations: locations
                      }
                    }) 
                  } /></span>
                <span className="icon is-right">
                <DeleteButton colRef="Accounts" docRef={account.id} />
                </span>
              
              </td>
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
          
          Locations
            
          </button>
        </p>
      </div>
    </div>
    
    
    {toggleLocationView != false ? 
    <div className="table-container">
    <nav className="level">
      <table className="table is-hoverable is-fullwidth">
        <thead >
          <tr>  
            <th>Location Name</th>
            <th>Address</th>
            <th><a onClick={()=>fetchLocationsSort("City")}>City</a></th>
            <th>State</th>
            <th>
              <span className="icon is-left">
              <FontAwesomeIcon 
                icon={faPlus} 
                onClick={handleToggleLocationAddModal} 
              />
              </span>
            </th>
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
      
        Orders 
      
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
          <th>
          <span className="icon is-left">
              <FontAwesomeIcon 
                icon={faPlus} 
                onClick={handleToggleOrderAddModal} 
              />
            </span>
          </th>
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
    {toggleTicketAddModal != false ? <AddTicket locations={locations} accounts={accounts} /> : ""}
    <div className="title">
      <button className="button is-fullwidth is-black is-rounded has-text-weight-semibold" onClick={handleToggleTicketView}>
      Tickets
      
      </button>
      
    </div>
    
    {toggleTicketView != false ? 
    <div className="table-container">
    <nav className="level-center">
      <table className="table is-striped is-fullwidth">
        <thead className="is-size-6">
          <tr>
          <th>
            Status
          </th>
          <th>
            Type
          </th>
          <th>
            Ticket Number
          </th>
          <th>
            Date
          </th>
          <th>
            Location
          </th>
          <th>
            Vendor
          </th>
          <th>

          <span className="icon is-left">
              <FontAwesomeIcon 
                icon={faPlus} 
                onClick={()=>
                  history.push({
                      pathname: "/addticket",
                      state: {
                      locations: locations,
                      accounts: accounts
                      }
                    }) 
                  } 
              />
          </span>
          </th>
          </tr>
        </thead>
        <tbody className="is-size-7">
        {userContext.userSession.dataLoading != true ?
          tickets != undefined ? tickets.map(ticket => (
          <tr key={ticket.id}>
            <td>
              {ticket.Status}
            </td>
            <td>
              {ticket.Type}
            </td>
            <td>
              {ticket.TicketNum}
            </td>
            <td>
              {ticket.DateSubmitted}
            </td>
            <td>
              {ticket.LocationName}
            </td>
            <td>
              {ticket.Vendor}
            </td>
            <td>
              <button className="button is-rounded is-small" onClick={()=>handleToggleTicketDetailModal(ticket.id)}>edit</button>
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

    
    <div className="title">
      <button className="button is-fullwidth is-black is-rounded has-text-weight-semibold" onClick={handleToggleReportsView}>
      Reports
      
      </button>      
    </div>
    
    {toggleReportsView != false ? 
    <div className="table-container">
    <nav className="level is-centered">
      <table className="table is-striped is-fullwidth ">
        <thead className="is-size-6">
          <tr>
            <th className="px-6">Report</th>
          </tr>
        </thead>
        <tbody className="is-size-7">
          <tr>
            <td className="px-6">
              <a onClick={()=>
                  history.push({
                      pathname: "/assetreport",
                      state: {
                      services: services
                      }
                    }) 
                  }>Asset Report</a>
            </td>
          </tr>
        </tbody>    
      </table>
      </nav>
    </div> : ""}

    <div className="title">
      <button className="button is-fullwidth is-black is-rounded has-text-weight-semibold" onClick={handleToggleQuotesView}>
      Quotes
      
      </button>      
    </div>
    
    {toggleQuotesView != false ? 
    <div className="table-container">
    <nav className="level is-centered">
      <table className="table is-striped is-fullwidth ">
        <thead className="is-size-6">
          <tr>
            <th className="px-6">Date</th>
            <th className="px-6">Project</th>
            <th className="px-6">Vendor</th>
            <th className="px-6">Cost</th>
          </tr>
        </thead>
        <tbody className="is-size-7">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td className="px-6">
              <a onClick={()=>
                  history.push({
                      pathname: "/assetreport",
                      state: {
                      services: services
                      }
                    }) 
                  }>View</a>
            </td>
          </tr>
        </tbody>    
      </table>
      </nav>
    </div> : ""}
  
  



    {toggleUsersAddModal != false ? "" : ""}
    <div className="title">
      <button className="button is-fullwidth is-black is-rounded has-text-weight-semibold" onClick={handleToggleUsersView}>
      Users
      
      </button>      
    </div>
    
    {toggleUsersView != false ? 
    <div className="table-container">
    <nav className="level is-centered">
      <table className="table is-striped is-fullwidth ">
        <thead className="is-size-6">
          <tr>
          <th className="px-6">Email</th>
          <th>
            <span className="icon is-left">
              <FontAwesomeIcon 
                icon={faPlus} 
                onClick={handleToggleUsersAddModal} 
              />
            </span>
          </th>
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
  
  </> : ""} </>
)
}
export default DataViewer
