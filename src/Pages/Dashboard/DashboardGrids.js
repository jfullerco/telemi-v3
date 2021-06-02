import React, {useState, useEffect, useContext, useRef} from 'react'
import {Link, useHistory, Redirect} from 'react-router-dom'


import {stateContext} from '../../Contexts/stateContext'
import {db} from '../../Contexts/firebase'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons'

import DeleteButton from '../../Components/Buttons/DeleteButton'

import AddService from '../../Services/AddService'
import LocationDetail from '../../Locations/LocationDetail'
import AddLocation from '../../Locations/AddLocation'
import OrderDetail from '../../Orders/OrderDetail'
import AddOrder from '../../Orders/AddOrder'
import TicketDetail from '../../Tickets/TicketDetail'
import AddTicket from '../../Tickets/AddTicket'
import AccountDetail from '../../Accounts/AccountDetail'
import AddAccount from '../../Accounts/AddAccount'
import CardByService from '../../Services/CardByService'

const serviceColumns = [
  {field: 'Vendor', headerName: 'Vendor'},
  {field: 'VendorServiceName', headerName: 'Product'},
  {field: 'LocationName', headerName: 'Location'},
  {field: 'AssetID', headerName: 'Asset ID'},
  {field: 'Type', headerName: 'Type'}
]

const DashboardGrids = ({visible}) => {
  const userContext = useContext(stateContext)
  const {applyStyle} = userContext
  const {dataLoading, currentCompany} = userContext.userSession

  const history = useHistory()

  const [locations, setLocations] = useState()
  const [orders, setOrders] = useState()
  const [services, setServices] = useState([])
  const [accounts, setAccounts] = useState()
  const [tickets, setTickets] = useState()
  const [users, setUsers] = useState()
  
  const searchRef = useRef("")

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
    const servicesAC = services.filter(({LocationName, AssetID, Vendor, Type}) => LocationName.indexOf(value) > -1 || AssetID.indexOf(value) > -1 || Vendor.indexOf(value) > -1 || Type.indexOf(value) > -1 )
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
  
const res = (services.map(service => Object.keys(service).map(key => console.log(key))))  

return (
    <div className="box">
      
        <div className="title" style={applyStyle.headerStyle}> 
          SERVICES
          <div className="tile is-pulled-right">
          <input className="input is-small is-rounded has-text-black" placeholder="SEARCH" onChange={(e)=>handleChangeSearchServices(e)} />
          </div> 
        </div>
      
        <div className="table-container">
          <nav className="level">
            <table className="table is-hoverable is-fullwidth ">
              <thead className="is-size-6">
              <tr>
                <th className="is-hidden-mobile">Vendor</th>
                <th><a onClick={()=>fetchServicesSort("VendorServiceName")}>Product</a></th>
                <th><a onClick={()=>fetchServicesSort("LocationName")}>Location</a></th>
                <th>Asset ID</th>
                <th>Type</th>
                <th><a className="tag is-small is-rounded is-link is-7 has-text-weight-normal" onClick={() => history.push("/addservice")}>Add New</a></th>
              </tr>
            </thead>
            <tbody className="is-size-7">
              {userContext.userSession.dataLoading != true ?
              services != undefined ? services.map(service => (
            
              <tr onClick={()=>
                  history.push({
                      pathname: "/servicedetail",
                      state: {
                      id: service.id,
                      services: services,
                      locations: locations,
                      accounts: accounts
                      }
                    }) 
                  }  key={service.id}>
                <td className="py-5" style={{width: "15%"}} >{service.Vendor}</td>
                <td className="py-5" style={{width: "20%"}}>{service.VendorServiceName} </td>
                <td className="py-5" style={{width: "20%"}}>{service.LocationName}</td>
                <td className="py-5" style={{width: "20%"}}>{service.AssetID}</td>
                <td className="py-5" style={{width: "20%"}}>{service.Type}</td>
                <td className="py-5" style={{width: "15%"}}>
                  <span className="icon is-right">
                    <DeleteButton colRef="Services" docRef={service.id} />
                  </span>
                </td>
              </tr>
          )) : 
            <tr> 
              <td> 
                <a className="tag is-small is-rounded is-link is-7 has-text-weight-normal" onClick={() => history.push("/addservice")}>
                  Add New
                </a>
              </td> 
            </tr>
          
          : <tr><td>Fetching Data...</td></tr>}

          </tbody>    
        </table>
        </nav>
      </div>
      
    

  
  </div> 
  )
}


export default DashboardGrids
