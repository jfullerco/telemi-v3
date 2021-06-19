import React, {useState, createContext, useReducer} from 'react'
import stateReducer from './stateReducer'
import {db} from './firebase'



export const stateContext = createContext({})

export const StateProvider = (props) => {
    
    const {Provider} = stateContext

    const initialState = {

      userType: "",
      currentUser: "",
      userFirstName: "",
      loggedIn: false,
      companies: "",
      services: "",
      locations: "",
      accounts: "",
      orders: "",
      quotes: "",
      contracts: "",
      users: "",
      currentCompanyID: "",
      currentCompany: "",
      currentLocationID: "",
      currentLocationName: "",
      currentServiceID: "",
      currentServiceName: "",
      currentTicketID: "",
      currentTicketNum: "",
      currentOrderID: "",
      currentOrderNum: "",
      currentAccountID: "",
      currentAccountNum: "",     
      dataLoading: false,

    }

    const serviceTypes = [
    { id: "Internet",
      Name: "Internet" },
    { id: "Internet with Voice",
      Name: "Internet with Voice" },
    { id: "Ethernet",
      Name: "Ethernet" },
    { id: "MPLS",
      Name: "MPLS" },
    { id: "MPLS with Voice",
      Name: "MPLS with Voice" },
    { id: "SIP Voice",
      Name: "SIP Voice" },
    { id: "Legacy Voice",
      Name: "Legacy Voice" },
    { id: "UCaaS",
      Name: "UCaaS" },
    { id: "Managed Security",
      Name: "Managed Security" },
    { id: "Hosting",
      Name: "Hosting" },
    { id: "Mobility",
      Name: "Mobility" }
    ]

    const accessTypes = [
      { id: "T1",
      Name: "T1" },
      { id: "Ethernet",
      Name: "Ethernet" },
      { id: "Fiber",
      Name: "Fiber" },
      { id: "Cable/DSL",
      Name: "Cable/DSL" },
    ]

    const serviceStatusType = [
      { id: "Active",
      Name: "Active" },
      { id: "Disconnected",
      Name: "Disconnected" },
      { id: "Pending Activation",
      Name: "Pending Activation" },
      { id: "Pending Disconnect",
      Name: "Pending Disconnect" },
    ]

    const orderStatusType = [
      { id: "Ordered",
      Name: "Ordered" },
      { id: "Completed",
      Name: "Completed" },
      { id: "Cancelled",
      Name: "Cancelled" },
    ]

    const vendorList = [
      {id: "AT&T",
      Name: "AT&T"},
      {id: "Verizon",
      Name: "Verizon"},
      {id: "Lumen",
      Name: "Lumen"},
      {id: "Lumos",
      Name: "Lumos"},
      {id: "Windstream",
      Name: "Windstream"},
      {id: "Comcast",
      Name: "Comcast"},
      {id: "Masergy",
      Name: "Masergy"},
      {id: "Spectrum",
      Name: "Spectrum"},
      {id: "Microsoft",
      Name: "Microsoft"}
    ]

    const isStyle = {
      headerStyle: {
        borderBottomStyle: "solid",
        bottomBorderColor: "black"
      }
    }

    const [toggleAdmin, setToggleAdmin] = useState(false)
    const [toggleDevTools, setToggleDevTools] = useState(false)

    const fetchCompanies = async(currentUser) => {
      return await db.collection("Companies").where("Users", "array-contains", currentUser).get()
    }
    
    const [userSession, dispatch] = useReducer(stateReducer, initialState)

      const setLoggedIn = (loginState) => {
        dispatch({
          type: "LOGGED_IN",
          payload: loginState
        })
      };

      const setCurrentUser = (user) => {
        dispatch({
          type: "SET_CURRENT_USER",
          payload: user
        })
      };

      const setUserType = (userType) => {
        dispatch({
          type: "SET_USER_TYPE",
          payload: userType
        })
      };

      const setUserFirstName = (name) => {
        dispatch({
          type: "SET_USER_FNAME",
          payload: name
        })
      };

      const setCompanies = (companies) => {
        dispatch({
          type: "SET_COMPANIES",
          payload: companies
        })
      };

      const setServices = (services) => {
        dispatch({
          type: "SET_SERVICES",
          payload: services
        })
      };

      const setAccounts = (accounts) => {
        dispatch({
          type: "SET_ACCOUNTS",
          payload: accounts
        })
      };

      const setLocations = (locations) => {
        dispatch({
          type: "SET_LOCATIONS",
          payload: locations
        })
      };

      const setTickets = (tickets) => {
        dispatch({
          type: "SET_TICKETS",
          payload: tickets
        })
      };

      const setOrders = (orders) => {
        dispatch({
          type: "SET_ORDERS",
          payload: orders
        })
      }

      const setUsers = (users) => {
        dispatch({
          type: "SET_USERS",
          payload: users
        })
      }

      const setContracts = (contracts) => {
        dispatch({
          type: "SET_CONTRACTS",
          payload: contracts
        })
      }

      const setCurrentCompanyID = (id) => {
        dispatch({
          type: "SET_CURRENT_COMPANYID",
          payload: id
        })
      };

      const setCurrentCompany = (name) => {
        
        dispatch({
          type: "SET_CURRENT_COMPANY",
          payload: name
        })
      };

      const setCurrentLocationID = (id) => {
        dispatch({
          type: "SET_CURRENT_LOCATIONID",
          payload: id
        })
      };

      const setCurrentLocationName = (name) => {
        dispatch({
          type: "SET_CURRENT_LOCATION_NAME",
          payload: name
        })
      };

      const setCurrentServiceID = (id) => {
        dispatch({
          type: "SET_CURRENT_SERVICEID",
          payload: id
        })
      };

      const setCurrentServiceName = (name) => {
        dispatch({
          type: "SET_CURRENT_SERVICE_NAME",
          payload: name
        })
      };

      const setCurrentTicketID = (id) => {
        dispatch({
          type: "SET_CURRENT_TICKETID",
          payload: id
        })
      };

      const setCurrentTicketNum = (num) => {
        dispatch({
          type: "SET_CURRENT_TICKET_NUM",
          payload: num
        })
      };

      const setCurrentOrderID = (id) => {
        dispatch({
          type: "SET_CURRENT_ORDERID",
          payload: id
        })
      };

      const setCurrentOrderNum = (num) => {
        dispatch({
          type: "SET_CURRENT_ORDER_NUM",
          payload: num
        })
      };

      const setCurrentAccountID = (id) => {
        dispatch({
          type: "SET_CURRENT_ACCOUNTID",
          payload: id
        })
      };

      const setCurrentAccountNum = (num) => {
        dispatch({
          type: "SET_CURRENT_ACCOUNT_NUM",
          payload: num
        })
      };

      const setDataLoading = (id) => {
        dispatch({
          type: "SET_DATA_LOADING",
          payload: id
        })
      };

    
    return (
      <Provider value={{ 
          isStyle,
          setDataLoading,
          setLoggedIn,
          setCompanies,
          setServices,
          setAccounts,
          setLocations,
          setTickets,
          setOrders,
          setUsers,
          setContracts,
          setCurrentCompanyID,
          setCurrentCompany,
          setCurrentLocationID,
          setCurrentLocationName,
          setCurrentServiceID,
          setCurrentServiceName,
          setCurrentTicketID,
          setCurrentTicketNum,
          setCurrentOrderID,
          setCurrentOrderNum,
          setCurrentAccountID,
          setCurrentAccountNum,
          serviceTypes,
          accessTypes,
          vendorList,
          serviceStatusType,
          orderStatusType,
          fetchCompanies,
          toggleAdmin,
          setToggleDevTools,
          toggleAdmin,
          setToggleAdmin,
          setUserFirstName,
          setUserType,
          setCurrentUser,
          userSession
      }}>
        {props.children}
      </Provider>
    )
  
}

