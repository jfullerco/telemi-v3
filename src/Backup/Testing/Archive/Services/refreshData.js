import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import {stateContext} from '../stateContext'

import loginService from './loginService'
import getClient from './clientService'

const refreshData = () => {
  const {u} = useParams()
  const userContext = useContext(stateContext)

  const initialData = async(u) => {
    const {data: [login]} = await loginService(u)
    userContext.setClients(login.clients)
    const {data} = await getClient(userContext.clients[0]._id)
    userContext.setSites(data.sites)
    userContext.setAssets(data.assets)
  }
  return console.log("this has run")
}

export default refreshData