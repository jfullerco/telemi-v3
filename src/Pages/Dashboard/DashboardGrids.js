import React, {useState, useEffect, useContext, useRef} from 'react'
import { useHistory } from 'react-router-dom'

import { stateContext } from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'

import GridComponent from './Components/GridComponent'


const DashboardGrids = ({visible}) => {

  const userContext = useContext(stateContext)
  const {applyStyle, setDataLoading} = userContext
  const {dataLoading, currentCompany} = userContext.userSession

  const history = useHistory()

  const [locations, setLocations] = useState()
  const [orders, setOrders] = useState()
  const [services, setServices] = useState([])
  const [accounts, setAccounts] = useState()
  const [tickets, setTickets] = useState()
  const [users, setUsers] = useState()
  const [contracts, setContracts] = useState()
  const [loadingGrid, setLoadingGrid] = useState()
  
  const searchRef = useRef("")

  const [serviceIsVisible, setServiceIsVisible] = useState(false)
  const [ticketIsVisible, setTicketIsVisible] = useState(false)
  const [orderIsVisible, setOrderIsVisible] = useState(false)
  const [accountIsVisible, setAccountIsVisible] = useState(false)
  const [contractIsVisible, setContractIsVisible] = useState(false)
  
  useEffect(() => {
    setLoadingGrid(true)
    const timer = setTimeout(() => {
      fetchLocations(),
      fetchServices(),
      fetchOrders(),
      fetchAccounts()
      fetchTickets()
      fetchContracts()
      cancelLoading()
    }, 2000)
    
    return () => clearTimeout(timer)
    
  }, [currentCompany])

  const cancelLoading = () => {
    setTimeout(() => {setLoadingGrid(false)}, 1000) 
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

  const fetchContracts = async() => {

    const contractsRef = await db.collection("Contracts").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const contracts = contractsRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setContracts(contracts)
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

    const ticketsRef = await db.collection("Tickets").where("CompanyID", "==", userContext.userSession.currentCompanyID).where("Status", "==", "Active").get()

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
  
  const serviceColumns = [
  {docField: 'Vendor', headerName: 'Vendor', key: "1"},
  {docField: 'VendorServiceName', headerName: 'Product', key: "2"},
  {docField: 'LocationName', headerName: 'Location', key: "3"},
  {docField: 'AssetID', headerName: 'Asset ID', key: "4"},
  {docField: 'Type', headerName: 'Type', key: "5"}
  ]

  const accountColumns = [
  {docField: 'Vendor', headerName: 'Vendor', key: "1"},
  {docField: 'AccountNum', headerName: 'Account', key: "2"},
  {docField: 'SubAccountNum', headerName: 'Sub-Account', key: "3"},
  {docField: 'AccountServiceLocationName', headerName: 'Location', key: "4"},
  {docField: 'PostTaxMRC', headerName: 'Cost', key: "5"}
  ]

  const ticketColumns = [
  {docField: 'Status', headerName: 'Status', key: "1"},
  {docField: 'TicketNum', headerName: 'Ticket', key: "2"},
  {docField: 'LocationName', headerName: 'Location', key: "3"},
  {docField: 'Type', headerName: 'Type', key: "4"},
  {docField: 'Details', headerName: 'Details', key: "5"}
  ]

  const orderColumns = [
  {docField: 'OrderDate', headerName: 'Date', key: "1"},
  {docField: 'Vendor', headerName: 'Vendor', key: "2"},
  {docField: 'VendorServiceName', headerName: 'Product', key: "3"},
  {docField: 'LocationName', headerName: 'Location', key: "4"},
  {docField: 'OrderNum', headerName: 'Order Number', key: "5"}
  ]

  const contractColumns = [
  {docField: 'Vendor', headerName: 'Vendor', key: "1"},
  {docField: 'Date', headerName: 'Date', key: "2"},
  {docField: 'Term', headerName: 'Term', key: "3"},
  {docField: 'Details', headerName: 'Details', key: "4"}
  ]
{/**Row Clicks */}
  const handleServiceClick = (id) => {
    
    console.log(id)
                    history.push({
                      pathname: "/servicedetail",
                      state: {
                      id: id,
                      services: services,
                      locations: locations,
                      accounts: accounts
                      }
                    })
  }

  const handleTicketClick = (id) => {
                    history.push({
                      pathname: "/ticketdetail",
                      state: {
                      id: id,
                      services: services,
                      locations: locations,
                      accounts: accounts,
                      tickets: tickets
                      }
                    })
  }

  

  const handleAccountClick = (id) => {
                    history.push({
                      pathname: "/accountdetail",
                      state: {
                      id: id,
                      services: services,
                      locations: locations,
                      accounts: accounts
                      }
                    })
  }

  const handleOrderClick = (id) => {
    
    console.log(id)
                    history.push({
                      pathname: "/orderdetail",
                      state: {
                      id: id,
                      services: services,
                      locations: locations,
                      orders: orders
                      }
                    })
  }

{/**Add Buttons */}

  const handleAddOrderBtn = (id) => {
    
    console.log(id)
                    history.push({
                      pathname: "/addorder",
                      state: {
                      id: id,
                      services: services,
                      locations: locations,
                      orders: orders
                      }
                    })
  }

  const handleAddTicketBtn = () => {
                    history.push({
                      pathname: "/addticket",
                      state: {
                      services: services,
                      locations: locations,
                      accounts: accounts,
                      tickets: tickets
                      }
                    })
  }

return (
  <>
    <div className={loadingGrid != false ? "modal is-active" : "modal"}><div className="loading"></div></div>
    
    <GridComponent 
      label="SERVICES"
      headerFields={serviceColumns}
      data={services}
      handleSearch={(e)=>handleChangeSearchServices(e)}
      handleClick={(e)=>handleServiceClick(e)}
      handleAddBtn={() => history.push("/addservice")}
      isVisible={!serviceIsVisible}
      toggleIsVisible={()=>{setServiceIsVisible(!serviceIsVisible)}}
    />

    <GridComponent 
      label="TICKETS"
      headerFields={ticketColumns}
      data={tickets}
      handleClick={(e)=>handleTicketClick(e)}
      handleAddBtn={() => handleAddTicketBtn()}
      isVisible={ticketIsVisible}
      toggleIsVisible={()=>{setTicketIsVisible(!ticketIsVisible)}}
    /> 

    <GridComponent 
      label="ORDERS"
      headerFields={orderColumns}
      data={orders}
      handleClick={(e)=>handleOrderClick(e)}
      handleAddBtn={() => handleAddOrderBtn()}
      isVisible={orderIsVisible}
      toggleIsVisible={()=>{setOrderIsVisible(!orderIsVisible)}}
    /> 

    <GridComponent 
      label="ACCOUNTS"
      headerFields={accountColumns}
      data={accounts}
      handleClick={(e)=>handleAccountClick(e)}
      handleAddBtn={() => history.push("/addaccount")}
      isVisible={accountIsVisible}
      toggleIsVisible={()=>{setAccountIsVisible(!accountIsVisible)}}
    /> 

    <GridComponent 
      label="CONTRACTS"
      headerFields={contractColumns}
      data={contracts}
      handleClick={(e)=>handleAccountClick(e)}
      handleAddBtn={() => history.push("/addcontract")}
      isVisible={contractIsVisible}
      toggleIsVisible={()=>{setContractIsVisible(!contractIsVisible)}}
    />

    
    
  </>
    
  
  )
}


export default DashboardGrids
