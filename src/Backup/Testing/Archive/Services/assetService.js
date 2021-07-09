import React, {useState} from 'react'
import http from './http-common'

const getAssets = async (clientID) => {
  
 return await http.get(`/rest/assets`)

}

export default {getAssets}