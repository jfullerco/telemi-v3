import React, {useState, createContext, useReducer} from 'react'
import stateReducer from './stateReducer'
import getClients from './Services/dataConnector'
import getClient from './Services/clientService'

export const stateContext = createContext({})

export const StateProvider = (props) => {
    
    const {Provider} = stateContext

    const initialState = {
      userID: "",
      userLevel: "",
      loggedIn: false,
      clientID: "",
      clients: "",
      currClient: "",
      sites: "",
      currSite: "",
      assets: "",
      currAsset: "",
      orders: "",
      currOrder: "",
      tickets: "",
      currTicket: "",      
      dataLoading: false,

    }
    const [userSession, dispatch] = useReducer(stateReducer, initialState)

      const setUser = (id) => {
        dispatch({
          type: "SET_USER",
          payload: id
        })
      };

      const setLoggedIn = (loginState) => {
        dispatch({
          type: "LOGGED_IN",
          payload: loginState
        })
      };

      const setClients = (clients) => {
        dispatch({
          type: "SET_CLIENTS",
          payload: clients
        })
      };

      const setUserLevel = (userLevel) => {
        dispatch({
          type: "SET_USER_LEVEL",
          payload: userLevel
        })
      };

      const setClientID = (id) => {
        dispatch({
          type: "FOCUS_CLIENT_ID",
          payload: id
        })
      };

      const setSites = (sites) => {
        dispatch({
          type: "SET_SITES",
          payload: sites
        })
      };

      const setAssets = (assets) => {
        dispatch({
          type: "SET_ASSETS",
          payload: assets
        })
      };

      const setSiteOrders = (orders) => {
        dispatch({
          type: "SET_SITE_ORDERS",
          payload: orders
        })
      };

      const setCurrClient = (clientID) => {
        dispatch({
          type: "CURR_CLIENT",
          payload: clientID
        })
      }

    const getSession = async (user) => {
      const login = await getClients(user)
      console.log(login)
      setClients(login.data.clients)
      const {data} = await getClient(login.data.clients[0]._id)
      console.log(data)
      setSites(data.sites)
      setAssets(data.assets)
    }

    
    return (
      <Provider value={{ 
          setUser,
          setLoggedIn,
          getSession,
          setClients,
          setUserLevel,
          setClientID,
          setSites,
          setAssets,
          setSiteOrders,
          setCurrClient,
          userSession
      }}>
        {props.children}
      </Provider>
    )
  
}