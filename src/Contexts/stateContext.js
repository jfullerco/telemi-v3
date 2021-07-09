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
      bills: "",
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

    const orderType = [
      {
        id: "New",
      Name: "New"
      },
      {
        id: "Change",
        Name: "Change"
      },
      {
        id: "Disconnect",
        Name: "Disconnect"
      },
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
      {id: "Lingo",
      Name: "Lingo"},
      {id: "Comcast",
      Name: "Comcast"},
      {id: "Masergy",
      Name: "Masergy"},
      {id: "Spectrum",
      Name: "Spectrum"},
      {id: "Microsoft",
      Name: "Microsoft"}
    ]

    //** Global Service Calls */

    const fetchLocations = async() => {
      const locationsRef = await db.collection("Locations")
        .where("CompanyID", "==", userSession.currentCompanyID).get()
      const locations = locationsRef.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      }))
      setLocations(locations)
    }

    const refreshLocations = async() => {
      const locationsRef = await db.collection("Locations")
        .where("CompanyID", "==", userSession.currentCompanyID).get()
      const locations = locationsRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setLocations(locations)
    }

    const fetchServices = async() => {
      const servicesRef = await db.collection("Services")
        .where("CompanyID", "==", userSession.currentCompanyID)
        .orderBy("LocationName").get()
      const services = servicesRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setServices(services)
    }

    const refreshServices = async() => {
      const servicesRef = await db.collection("Services")
        .where("CompanyID", "==", userSession.currentCompanyID)
        .orderBy("LocationName").get()
      const services = servicesRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setServices(services)
    }

    const fetchTickets = async() => {
      const ticketsRef = await db.collection("Tickets")
        .where("CompanyID", "==", userSession.currentCompanyID).get()
      const tickets = ticketsRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setTickets(tickets)
    }

    const refreshTickets = async() => {
      const ticketsRef = await db.collection("Tickets")
        .where("CompanyID", "==", userSession.currentCompanyID).get()
      const tickets = ticketsRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setTickets(tickets)
    }

    const fetchOrders = async() => {
      const ordersRef = await db.collection("Orders")
        .where("CompanyID", "==", userSession.currentCompanyID).get()
      const orders = ordersRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setOrders(orders)
    }

    const refreshOrders = async() => {
      const ordersRef = await db.collection("Orders")
        .where("CompanyID", "==", userSession.currentCompanyID).get()
      const orders = ordersRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setOrders(orders)
    }

    const fetchAccounts = async() => {
      const accountsRef = await db.collection("Accounts")
        .where("CompanyID", "==", userSession.currentCompanyID).orderBy("AccountNum").get()
      const accounts = accountsRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setAccounts(accounts)
    }

    const refreshAccounts = async() => {
      const accountsRef = await db.collection("Accounts")
        .where("CompanyID", "==", userSession.currentCompanyID).orderBy("AccountNum").get()
      const accounts = accountsRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setAccounts(accounts)
    }

    const fetchBills = async() => {
      const billsRef = await db.collection("Bills")
        .where("CompanyID", "==", userSession.currentCompanyID).get()
      const bills = billsRef.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      }))
      setBills(bills)
    }
    
    const refreshBills = async() => {
      const billsRef = await db.collection("Bills")
        .where("CompanyID", "==", userSession.currentCompanyID).get()
      const bills = billsRef.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      }))
      setBills(bills)
    }

    const fetchUsers = async() => {
      const usersRef = await db.collection("Users")
        .where("Companies", "array-contains", userSession.currentCompanyID).get()
      const users = usersRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setUsers(users)
    }

    const refreshUsers = async() => {
      const usersRef = await db.collection("Users")
        .where("Companies", "array-contains", userSession.currentCompanyID).get()
      const users = usersRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setUsers(users)
    }

    const fetchContracts = async() => {
      const contractsRef = await db.collection("Contracts")
        .where("CompanyID", "==", userSession.currentCompanyID).get()
      const contracts = contractsRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setContracts(contracts)
    }

    const refreshContracts = async() => {
      const contractsRef = await db.collection("Contracts")
        .where("CompanyID", "==", userSession.currentCompanyID).get()
      const contracts = contractsRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setContracts(contracts)
    }
    
    /** Global Style Variables */
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

      const setUserFirstName = (name) => {
        dispatch({
          type: "SET_USER_FNAME",
          payload: name
        })
      };  

      const setUserType = (userType) => {
        dispatch({
          type: "SET_USER_TYPE",
          payload: userType
        })
      };

      const setCurrentUser = (user) => {
        dispatch({
          type: "SET_CURRENT_USER",
          payload: user
        })
      };
    
      const setLoggedIn = (loginState) => {
          dispatch({
            type: "LOGGED_IN",
            payload: loginState
          })
      };

      const setCompanies = (companies) => {
        dispatch({
          type: "SET_COMPANIES",
          payload: companies
        })
      };

      const setLocations = (locations) => {
        dispatch({
          type: "SET_LOCATIONS",
          payload: locations
        })
      };

      const setServices = (services) => {
        dispatch({
          type: "SET_SERVICES",
          payload: services
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

      const setAccounts = (accounts) => {
        dispatch({
          type: "SET_ACCOUNTS",
          payload: accounts
        })
      };

      const setBills = (bills) => {
        dispatch({
          type: "SET_BILLS",
          payload: bills
        })
      };

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

      const setCurrentGrid = (name) => {
        dispatch({
          type: "SET_CURRENT_GRID",
          payload: name
        })
      };

      const setCurrentDate = () => {
        const currentDate = new Date()
        return currentDate.toISOString().substring(0, 10)
      }

    
    return (
      <Provider value={{ 
          isStyle,

          setUserFirstName,
          setUserType,
          setCurrentUser,
          setLoggedIn,
          setCurrentDate,

          setCompanies,
          setLocations,
          setServices,
          setTickets,
          setOrders,
          setAccounts,
          setBills,
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
          
          fetchCompanies,
          fetchLocations,
          refreshLocations,
          fetchServices,
          refreshServices,
          fetchTickets,
          refreshTickets,
          fetchOrders,
          refreshOrders,
          fetchAccounts,
          refreshAccounts,
          fetchBills,
          refreshBills,
          fetchUsers,
          refreshUsers,
          fetchContracts,
          refreshContracts,

          vendorList,
          serviceTypes,
          accessTypes,
          serviceStatusType,
          orderStatusType,
          orderType,

          setDataLoading,
          setCurrentGrid,

          userSession
      }}>
        {props.children}
      </Provider>
    )
  
}

