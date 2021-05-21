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
    { id: "Dedicated Internet",
      Name: "Dedicated Internet" },
    { id: "Dedicated Internet with Voice",
      Name: "Dedicated Internet with Voice" },
    { id: "Switched Ethernet",
      Name: "Switched Ethernet" },
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
          setDataLoading,
          setLoggedIn,
          setCompanies,
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
          serviceStatusType,
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

