import React, {useState, createContext, useReducer} from 'react'
import stateReducer from './stateReducer'


export const stateContext = createContext({})

export const StateProvider = (props) => {
    
    const {Provider} = stateContext

    const initialState = {

      userLevel: "",
      loggedIn: false,
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

    const formFields = {
      tickets: {
        ticketNum: ""
      }
    }
    
    const [userSession, dispatch] = useReducer(stateReducer, initialState)

      const setLoggedIn = (loginState) => {
        dispatch({
          type: "LOGGED_IN",
          payload: loginState
        })
      };

      const setUserLevel = (userLevel) => {
        dispatch({
          type: "SET_USER_LEVEL",
          payload: userLevel
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
          userSession
      }}>
        {props.children}
      </Provider>
    )
  
}

