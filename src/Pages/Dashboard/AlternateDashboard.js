import React, {useRef, useContext, useEffect, useState} from 'react'
import {stateContext} from '../../Contexts/stateContext'
import {db} from '../../Contexts/firebase'

const AlternateDashboard = () => {
  const userContext = useContext(stateContext)
  const {currentCompanyID} = userContext.userSession
  const [activeLocations, setActiveLocations] = useState()

  useEffect(() => {
    fetchLocations()
  },[])

  const fetchLocations = async() => {
    console.log(userContext.userSession)
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
      
      <div className="card">

        <div className="card-header">
          {location.LocationName}
        </div>
      
      </div>
      
      )) : ""}
    </>
  )
}
export default AlternateDashboard