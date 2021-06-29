import React, {useState, useEffect, useContext, useRef} from 'react'
import { useHistory, Link } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';

import { stateContext } from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'

import GridComponent from './Components/GridComponent'
import {useFilterArray} from '../../Components/Tables/useFilterArray'
import {serviceGridColumns} from '../../Contexts/initialFields'
import SelectInputProps from '../../Components/Forms/SelectInputProps'


const DashboardGrids = ({visible}) => {

  const userContext = useContext(stateContext)
  const history = useHistory()

  const { isStyle, 
          setDataLoading,
          setCurrentGrid,
          setLocations,
          setServices,
          setTickets,
          setOrders,
          setAccounts,
          setUsers,
          setContracts } = userContext

  const { dataLoading,
          currentCompany,
          currentUser,
          currentGrid,
          locations,
          services,
          tickets,
          orders,
          accounts,
          users,
          contracts } = userContext.userSession

  const searchRef = useRef("")

  const [loadingGrid, setLoadingGrid] = useState()
  const [checked, setChecked] = useState(false)
  const [grid, setGrid] = useState(currentGrid != undefined ? currentGrid : "SERVICES")
  
  useEffect(() => {
    setLoadingGrid(true)
    const timer = setTimeout(() => {
      fetchLocations(),
      fetchServices(),
      fetchTickets(),
      fetchOrders(),
      fetchAccounts()
      fetchUsers()
      fetchContracts()
      cancelLoading()
    }, 1000)
    
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

  const fetchAccounts = async() => {

    const accountsRef = await db.collection("Accounts").where("CompanyID", "==", userContext.userSession.currentCompanyID).orderBy("AccountNum").get()

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

    const usersRef = await db.collection("Users").where("Companies", "array-contains", userContext.userSession.currentCompanyID).get()

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
  {docField: 'Vendor', headerName: 'Vendor', key: "1", filterable: true},
  {docField: 'VendorServiceName', headerName: 'Product', key: "2", filterable: true},
  {docField: 'LocationName', headerName: 'Location', key: "3", filterable: true},
  {docField: 'AssetID', headerName: 'Asset ID', key: "4", filterable: false, mobileAnchor: true},
  {docField: 'Type', headerName: 'Type', key: "5", filterable: true}
  ]

  const ticketColumns = [
  {docField: 'Status', headerName: 'Status', key: "1", filterable: true},
  {docField: 'TicketNum', headerName: 'Ticket', key: "2", filterable: false},
  {docField: 'LocationName', headerName: 'Location', key: "3", filterable: true},
  {docField: 'Type', headerName: 'Type', key: "4", filterable: true},
  {docField: 'Details', headerName: 'Details', key: "5", filterable: false}
  ]

  const orderColumns = [
  {docField: 'OrderDate', headerName: 'Date', key: "1", filterable: true},
  {docField: 'Vendor', headerName: 'Vendor', key: "2", filterable: true},
  {docField: 'VendorServiceName', headerName: 'Product', key: "3", filterable: true},
  {docField: 'LocationName', headerName: 'Location', key: "4", filterable: true},
  {docField: 'OrderNum', headerName: 'Order Number', key: "5", filterable: false}
  ]

  const accountColumns = [
  {docField: 'Vendor', headerName: 'Vendor', key: "1", filterable: true},
  {docField: 'AccountNum', headerName: 'Account', key: "2", filterable: true},
  {docField: 'SubAccountNum', headerName: 'Sub-Account', key: "3", filterable: true},
  {docField: 'AccountServiceLocationName', headerName: 'Location', key: "4", filterable: true},
  {docField: 'PostTaxMRC', headerName: 'Cost', key: "5", filterable: false}
  ]

  const userColumns = [
  {docField: 'FirstName', headerName: 'First Name', key: "3"},
  {docField: 'LastName', headerName: 'Last Name', key: "2"},
  {docField: 'Email', headerName: 'Email', key: "1"}
  ]

  const contractColumns = [
  {docField: 'Vendor', headerName: 'Vendor', key: "1"},
  {docField: 'Date', headerName: 'Date', key: "2"},
  {docField: 'Term', headerName: 'Term', key: "3"},
  {docField: 'Details', headerName: 'Details', key: "4"}
  ]
{/**Row Clicks */}
  const handleServiceClick = (id) => {
                    history.push({
                      pathname: `/servicedetail/${id}/${false}/${false}`,
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
                      pathname: `/ticketdetail/${id}/${false}/${false}`,
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
                      pathname: `/accountdetail/${id}/${false}/${false}`,
                      state: {
                      id: id,
                      services: services,
                      locations: locations,
                      accounts: accounts
                      }
                    })
  }

  const handleOrderClick = (id) => {
                    history.push({
                      pathname: `/orderdetail/${id}/${false}/${false}`,
                      state: {
                      id: id,
                      
                      locations: locations,
                      
                      }
                    })
  }

{/**Add Buttons */}
  const handleAddServiceBtn = (id) => {
                    history.push({
                      pathname: `/servicedetail/${id}/${true}/${true}`,
                      state: {
                      id: id,
                      services: services,
                      locations: locations,
                      orders: orders
                      }
                    })
  }

  const handleAddOrderBtn = (id) => {
                    history.push({
                      pathname: `/orderdetail/${id}/${true}/${true}`,
                      state: {
                      id: id,
                      services: services,
                      locations: locations,
                      orders: orders
                      }
                    })
  }

  const handleAddTicketBtn = (id) => {
                    history.push({
                      pathname: `/ticketdetail/${id}/${true}/${true}`,
                      state: {
                      id: id,
                      services: services,
                      locations: locations,
                      accounts: accounts,
                      tickets: tickets
                      }
                    })
  }

  const handleAddAccountBtn = (id) => {
                    {
                    history.push({
                      pathname: `/accountdetail/${id}/${true}/${true}`,
                      state: {
                      id: id,
                      services: services,
                      locations: locations,
                      accounts: accounts,
                      tickets: tickets
                      }
                    })
  }
  }

  const handleFilterServiceClick = (data, colRef, filterRef) => {
     
    const filteredArray = useFilterArray(data, colRef, filterRef)
    setServices(filteredArray)

  }

  const handleFilterTicketClick = (data, colRef, filterRef) => {
     
    const filteredArray = useFilterArray(data, colRef, filterRef)
    setTickets(filteredArray)

  }

  const handleFilterOrderClick = (data, colRef, filterRef) => {
     
    const filteredArray = useFilterArray(data, colRef, filterRef)
    setOrders(filteredArray)

  }

  const handleFilterAccountClick = (data, colRef, filterRef) => {
     
    const filteredArray = useFilterArray(data, colRef, filterRef)
    setAccounts(filteredArray)

  }
  
  const handleGridChange = (e) => {
    const {value} = e.target
    console.log(value)
    setGrid(value)
    setCurrentGrid(value)
  }

return (
  <>
    <div className={loadingGrid != false ? "modal is-active" : "modal"}><div className="loading"></div></div>

    <SelectInputProps placeholder="Change Current View" onChange={(e)=>handleGridChange(e)}>
      <option value="SERVICES">Services</option>
      <option value="TICKETS">Tickets</option>
      <option value="ORDERS">Orders</option>
      <option value="ACCOUNTS">Accounts</option>
      <option value="USERS">Users</option>
      <option value="CONTRACTS">Contracts</option>
    </SelectInputProps>

    <GridComponent 
      label="SERVICES"
      headerFields={serviceColumns}
      data={services}
      resetter={(e)=>setServices(e)}
      handleFilter={(e)=>handleFilterServiceClick(e)}
      handleSearch={(e)=>handleChangeSearchServices(e)}
      handleClick={(e)=>handleServiceClick(e)}
      handleAddBtn={() => handleAddServiceBtn()}
      isVisible={grid}
      isGrid="SERVICES"
      toggleIsVisible={()=>{setServiceIsVisible(!serviceIsVisible)}}
    />

    <GridComponent 
      label="TICKETS"
      headerFields={ticketColumns}
      data={tickets}
      resetter={(e)=>setTickets(e)}
      handleFilter={(e)=>handleFilterTicketClick(e)}
      handleSearch={(e)=>handleChangeSearchTickets(e)}
      handleClick={(e)=>handleTicketClick(e)}
      handleAddBtn={() => handleAddTicketBtn()}
      isVisible={grid}
      isGrid="TICKETS"
      toggleIsVisible={()=>{setTicketIsVisible(!ticketIsVisible)}}
    /> 

    <GridComponent 
      label="ORDERS"
      headerFields={orderColumns}
      data={orders}
      resetter={(e)=>setOrders(e)}
      handleFilter={(e)=>handleFilterOrderClick(e)}
      handleClick={(e)=>handleOrderClick(e)}
      handleAddBtn={() => handleAddOrderBtn()}
      isVisible={grid}
      isGrid="ORDERS"
      toggleIsVisible={()=>{setOrderIsVisible(!orderIsVisible)}}
    /> 

    <GridComponent 
      label="ACCOUNTS"
      headerFields={accountColumns}
      data={accounts}
      resetter={(e)=>setAccounts(e)}
      handleFilter={(e)=>handleFilterAccountClick(e)}
      handleClick={(e)=>handleAccountClick(e)}
      handleAddBtn={() => handleAddAccountBtn()}
      isVisible={grid}
      isGrid="ACCOUNTS"
      toggleIsVisible={()=>{setAccountIsVisible(!accountIsVisible)}}
    /> 

    <GridComponent 
      label="USERS"
      headerFields={userColumns}
      data={users}
      handleClick={(e)=>handleAccountClick(e)}
      handleAddBtn={() => history.push("/adduser")}
      isVisible={grid}
      isGrid="USERS"
      toggleIsVisible={()=>{setUserIsVisible(!userIsVisible)}}
    /> 

    <GridComponent 
      label="CONTRACTS"
      headerFields={contractColumns}
      data={contracts}
      handleClick={(e)=>handleAccountClick(e)}
      handleAddBtn={() => history.push("/addcontract")}
      isVisible={grid}
      isGrid="CONTRACTS"
      toggleIsVisible={()=>{setContractIsVisible(!contractIsVisible)}}
    />
    <p/>
  </>
    
  
  )
}


export default DashboardGrids
