import React, {useRef, useContext, useEffect, useState} from 'react'
import {stateContext} from '../../Contexts/stateContext'
import {db} from '../../Contexts/firebase'

const LocationList = () => {
  const userContext = useContext(stateContext)
  const {currentCompanyID, dataLoading} = userContext.userSession
  const [activeLocations, setActiveLocations] = useState()

  useEffect(() => {
    console.log(userContext.userSession)
    fetchLocations()
  },[])

  useEffect(() => {
    fetchLocations()
  },[currentCompanyID])

  const fetchLocations = async() => {
    
    const locationsRef = await db.collection("Locations").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()
    const locations = locationsRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
      
    setActiveLocations(locations)
    console.log(activeLocations)
  }

  return(
    <>
      {activeLocations != undefined ? activeLocations.map(location => (
      
      <div className="card block px-2 py-2">
          <div className="title is-size-6 has-text-weight-semibold">{location.Name}</div>
          <span className="has-text-weight-light is-size-7">{location.Address1} {location.Address2}</span>
          <span className="level-right">
          <div className="tag is-rounded"># of services</div>
          <div className="tag is-rounded"># of orders</div>
          <div className="tag is-rounded"># of tickets</div>
          </span>
        
      
      </div>
      
      )) : ""}
    </>
  )
}
export default LocationList