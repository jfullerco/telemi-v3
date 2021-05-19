import React, {useState, useContext} from 'react'
import {stateContext} from '../../Contexts/stateContext'
import PrintComponents from 'react-print-components'

const AssetReport = (state) => {

  const userContext = useContext(stateContext)

  console.log(state.location.state)

  const [services, setServices] = useState(state.location.state.services)

  const printReport = () => {

  }
  
  return (
    <>
    <span className="title">
      Asset Report
    </span> 
    <div className="level-right">
      <PrintComponents trigger={<button className="button is-rounded is-small">Print</button>}>
      <div className="title">Asset Report</div>
      {services != "" ? services.map(service => (
      <table className="table is-fullwidth" key={service.id}>
      <thead>
          <tr>
            <th style={{width: "20%"}}></th>
            <th style={{width: "20%"}}>Asset ID</th>
            <th style={{width: "20%"}}>Vendor</th>
            <th style={{width: "20%"}}>Service</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="has-text-weight-bold">{service.LocationName}</span>
            </td>
            <td>
              {service.AssetID}
            </td>
            <td>
              {service.Vendor}
            </td>
            <td>
              {service.VendorServiceName}
            </td>
          </tr>
        </tbody>    
      </table>
       )) : "No Assets have been entered"}

      
      </PrintComponents>    
    </div> 
      {services != "" ? services.map(service => (
      <table className="table is-fullwidth" key={service.id}>
      <thead>
          <tr>
            <th style={{width: "20%"}}></th>
            <th style={{width: "20%"}}>Asset ID</th>
            <th style={{width: "20%"}}>Vendor</th>
            <th style={{width: "20%"}}>Service</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="has-text-weight-bold">{service.LocationName}</span>
            </td>
            <td>
              {service.AssetID}
            </td>
            <td>
              {service.Vendor}
            </td>
            <td>
              {service.VendorServiceName}
            </td>
          </tr>
        </tbody>    
      </table>
       )) : "No Assets have been entered"}

      </>
  )
}

export default AssetReport