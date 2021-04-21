import React, {useEffect, useState, useContext} from 'react'
import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

const CompanyProfile = () => {

  const userContext = useContext(stateContext)

  const [locations, setLocations] = useState("")

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async() => {
    const queryLocations = await db.collection("Locations").where("LocationCompany", "==", userContext.currentCompany).get()
    const locationsRef = queryLocations.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setLocations(locationsRef)
  }
console.log(userContext.currentCompany)
  return (
    <div>
    
    </div>
  )
}
export default CompanyProfile