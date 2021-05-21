import React, {useState, useRef, useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {stateContext} from '../../../Contexts/stateContext'
import {db} from '../../../Contexts/firebase'

const ServicesDashboard = () => {
  
  const {
    setDataLoading,
    userSession: {
      dataLoading,
      currentCompanyID,

      }
    
    } = useContext(stateContext)
  const history = useHistory()

  const [services, setServices] = useState()

  useEffect(() => {
    fetchServices()
  },[currentCompanyID])

  const fetchServices = async() => {

    const servicesRef = await db.collection("Services").where("CompanyID", "==", currentCompanyID).orderBy("LocationName").get()

    const services = servicesRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setServices(services)
    setDataLoading(false)

  }

  return(
    <div className="table-container">
      <nav className="level">
      
        <table className="table is-striped is-hoverable is-fullwidth">
        
          <thead className="is-size-6">
            
            <tr>
            <th>
              Vendor
            </th>
            <th>
              Type
            </th>
            <th>
              Product
            </th>
            <th>
              Location
            </th>
            <th>
              Asset ID
            </th>
            <th>
            <span className="is-left">
              <button className="button is-rounded is-small" onClick={()=>
                    history.push("/addservice") }>
                  Add a service
                </button> 
              </span>
            </th>
            </tr>
          </thead>
          <tbody className="is-size-7">

          {dataLoading != true ?
            services != undefined ? services.map(service => (
            
            <tr key={service.id} onClick={()=>
                    history.push("/servicedetail")}>
              <td>{service.Vendor}</td>
              <td>{service.Type}</td>
              <td>{service.VendorServiceName} </td>
              <td>{service.LocationName}</td>
              <td>{service.AssetID}</td>
              <td>
                
                
                  
                    
                  
                </td>
                
            </tr>
            
          )) : 
            <tr> 
              <td> 
                <button className="button is-rounded is-small" onClick={()=>
                    history.push("/addservice") }>
                  Add a service
                </button> 
              </td> 
            </tr>
          
          : <tr><td>Fetching Data...</td></tr>}

          </tbody>    
        </table>
        </nav>
      </div>
  )
}
export default ServicesDashboard