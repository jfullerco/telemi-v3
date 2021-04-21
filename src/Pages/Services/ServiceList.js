import React, {useState, useContext, useEffect} from 'react'

import {stateContext} from '../../Contexts/stateContext'
import {db} from '../../Contexts/firebase'

const ServiceList = () => {
  const userContext = useContext(stateContext)
  const currentLocation = userContext.userSession
  const [activeServices, setActiveServices] = useState("")

  useEffect(() => {
    fetchServices()
  },[])

  const fetchServices = () => {
    const servicesRef = db.collection("Services").where("LocationID", "==", currentLocation).get()
    const services = servicesRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setActiveServices(services)
  }

  return (
    <>

      <div className="block"> 
          <section className="hero is-info is-small">
            <div className="hero-body">
              <p className="title">Services</p>
            <div className="subtitle"></div>
            </div>
          </section>
        </div>

        
    </>
  )
}
export default ServiceList