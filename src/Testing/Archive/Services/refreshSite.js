import React, {useContext} from 'react'

import getClient from './clientService'
    
const refreshSite = async (clientID) => {
  return await getClient(clientID)
  }
  
export default refreshSite