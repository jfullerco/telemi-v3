import React, {useState, useRef, useEffect, useContext} from 'react'
import {stateContext} from '../../Contexts/stateContext'
import {db} from '../../Contexts/firebase'

const Service = () => {

  const userContext = useContext(stateContext)
  const {currentServiceID, dataLoading} = userContext.userSession 
  const [activeService, setActiveService] = useState()

  useEffect(() => {

  },[])

  const fetchService = async() => {
    const serviceRef = await db.collection("Services").doc(currentServiceID).get()
    const service = serviceRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setActiveService(service)
  }

  return(
    <>
    {activeService.AssetID}
    </>
  )
}
export default Service