import React, {useState, useContext} from 'react'
import {db} from './Contexts/firebase'
import {useAuth} from './Contexts/AuthContext'
import {stateContext} from './Contexts/stateContext'

const dataConnect = () => {
  
  const currentUser = useAuth()
  const userContext = useContext(stateContext)
  
  const companiesRef = db.collection("Companies").where("Users", "array-contains", currentUser).get()
  
}

export {companiesRef}