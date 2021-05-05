import React, {useRef, useContext, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'

import { stateContext } from '../Contexts/stateContext'
import { db } from '../Contexts/firebase'

const ServicesTable = () => {

  const userContext = useContext(stateContext)
  const {dataLoading, setDataLoading, currentCompanyID} = userContext.userSession
  const [services, setServices] = useState()

  useEffect(() => {
    fetchServices()
  },[])

  const fetchServices = async() => {

    const servicesRef = await db.collection("Services").where("CompanyID", "==", currentCompanyID).get()

    const services = await servicesRef.docs.map(doc => ({id: doc.id, ...doc.data()}))

    setServices(services)
    setDataLoading(false)

  }

  return(
    <>
    {dataLoading != false ? 
      <div className="pageloader">
        <span className="title">Loading Data...</span>
      </div> 
    :
    <div className="table-container">
      <nav className="level">
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th></th>
              <th>
                Location
              </th>
              <th>
                Asset ID
              </th>
              <th>
                Account
              </th>
              <th>
                
              </th>
              <th>
                <span className="icon is-left">
                  <FontAwesomeIcon 
                    icon={faPlus} 
                    onClick={handleToggleServicesAddModal} />
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="is-size-7">

          {services != undefined ? services.map(service => (
            
            <tr key={service.id} >
              <td>
                +
              </td>
              <td>
                {service.LocationName}
              </td>
              <td>
                {service.AssetID} 
              </td>
              <td>
                {service.AccountNum}
              </td>
              <td>
                <span className="tag"># of Tickets</span>
              </td>
              <td> 
                <span className="icon is-left">
                  <FontAwesomeIcon icon={faEdit} onClick={(e)=> handleServiceDetail(service.id)} />
                </span>
                <span className="icon is-right">
                  <DeleteButton colRef="Services" docRef={service.id} />
                </span>
              </td>
            </tr>
          )) : 
                <tr> 
                  <td> 
                    <button className="button is-rounded is-small" onClick={handleToggleServicesAddModal}>
                      Add a service
                    </button> 
                  </td> 
                </tr>
            }
          </tbody>    
        </table>
      </nav>
    </div>
    }
    </>
  )
}
export default ServicesTable