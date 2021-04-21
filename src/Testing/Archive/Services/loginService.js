import React, {useState, useEffect} from 'react'
import http from './http-common'

const loginService = async (user) => {
  
  return await http.get(`/rest/client-access?metafields=true&q={"telemiUser": "${user}"}&max=1`)
  
}
export default loginService