import React, {useState} from 'react'
import http from './airtableService'

const getClient = async (clientID) => {
  
 return await http.get(`/app3v5MjJ1b1OGZ1f/Clients`)

}

const putClient = async (clientID) => {
  
 return await http.get(`/app3v5MjJ1b1OGZ1f/Clients`)

}
export default { getClient, putClient }