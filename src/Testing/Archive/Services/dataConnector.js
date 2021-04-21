import React, {useState} from 'react'
import http from './http-common'

const getClients = async (user) => {
 return await http.get(`/rest/client-access/${user}?metafields=true&fetchchildren=true`)
}

export default getClients