import React from 'react'

const AccountDashboard = () => {
  return(
    <>
    <div className="title">
      <div className="field has-addons">
        <p className="control is-expanded has-icons-left">
          <button id="dashboard-button" className="button is-fullwidth is-outlined is-black is-rounded has-text-weight-bold" onClick={handleToggleAccountView}>
          
          ACCOUNTS 
            
          </button>
        </p>
      </div>
    </div>

    {toggleAccountView != false ? 
      <div className="table-container">
      <nav className="level">
        <table className="table is-striped is-hoverable is-fullwidth has-text-centered">
          <thead className="is-size-6">
            <tr>
            <th className="px-5">Vendor</th>
            <th className="px-5">Account</th>
            <th className="px-5">Sub Account</th>
            <th className="px-5">Location Linked</th>
            <th className="px-5">Monthly Cost</th>
            <th>
              <span className="icon is-left">
              <FontAwesomeIcon 
                icon={faPlus} 
                  onClick={handleToggleAccountAddModal} 
              />
              </span>
            </th>
            </tr>
          </thead>
          <tbody className="is-size-7">
          {userContext.userSession.dataLoading != true ?
            accounts != undefined ? accounts.map(account => (
            
            <tr key={account.id} >
              <td >{account.Vendor}</td>
              <td >{account.AccountNum}</td>
              <td >{account.SubAccountNum}</td>
              <td >{account.AccountServiceLocationName} </td>
              <td >$ {account.PostTaxMRC}</td>
              <td>
                <span className="icon is-left">
                <FontAwesomeIcon icon={faEdit} onClick={()=>
                  history.push({
                      pathname: "/accountdetail",
                      state: {
                      id: account.id,
                      services: services,
                      locations: locations
                      }
                    }) 
                  } /></span>
                <span className="icon is-right">
                <DeleteButton colRef="Accounts" docRef={account.id} />
                </span>
              
              </td>
            </tr>
            
          )) : 
            <tr> 
              <td> 
                <button className="button is-rounded is-small" onClick={handleToggleAccountAddModal}>
                  Add an Account
                </button> 
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