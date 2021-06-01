import React from 'react'

const AccountDashboard = () => {
  return(
    <>
    
    <div className="table-container">
        <nav className="level">
          <table className="table is-hoverable is-fullwidth ">
            <thead className="is-size-6">
            <tr>
              <th className="is-hidden-mobile">Vendor</th>
              <th><a onClick={()=>fetchServicesSort("VendorServiceName")}>Product</a></th>
              <th><a onClick={()=>fetchServicesSort("LocationName")}>Location</a></th>
              <th>Asset ID</th>
              <th>Type</th>
              <th><a className="tag is-small is-rounded is-link is-7 has-text-weight-normal" onClick={() => history.push("/addservice")}>Add New</a></th>
            </tr>
            </thead>
          <tbody className="is-size-7">
          {userContext.userSession.dataLoading != true ?
            services != undefined ? services.map(service => (
            
            <tr onClick={()=>
                  history.push({
                      pathname: "/servicedetail",
                      state: {
                      id: service.id,
                      services: services,
                      locations: locations,
                      accounts: accounts
                      }
                    }) 
                  }  key={service.id}>
              <td className="py-5" style={{width: "15%"}} >{service.Vendor}</td>
              <td className="py-5" style={{width: "20%"}}>{service.VendorServiceName} </td>
              <td className="py-5" style={{width: "20%"}}>{service.LocationName}</td>
              <td className="py-5" style={{width: "20%"}}>{service.AssetID}</td>
              <td className="py-5" style={{width: "20%"}}>{service.Type}</td>
              <td className="py-5" style={{width: "15%"}}>
                <span className="icon is-right">
                  <DeleteButton colRef="Services" docRef={service.id} />
                </span>
              </td>
            </tr>
          )) : 
            <tr> 
              <td> 
                <a className="tag is-small is-rounded is-link is-7 has-text-weight-normal" onClick={() => history.push("/addservice")}>
                  Add New
                </a>
              </td> 
            </tr>
          
          : <tr><td>Fetching Data...</td></tr>}

          </tbody>    
        </table>
        </nav>
      </div>
    : ""}
    </>
  )
}
export default AccountDashboard