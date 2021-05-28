import React, {useState, useContext} from 'react'
import {stateContext} from '../../Contexts/stateContext'
import PrintComponents from 'react-print-components'

const AccountReport = (state) => {

  const userContext = useContext(stateContext)

  console.log(state.location.state)

  const [accounts, setAccounts] = useState(state.location.state.accounts)

  const printReport = () => {

  }
  
  return (
    <>
    <span className="title">
      Account Report
    </span> 
    <div className="level-right">
      <PrintComponents trigger={<button className="button is-rounded is-small">Print</button>}>
      <div className="title">Account Report</div>
      {accounts != "" ? accounts.map(account => (
      <table className="table is-fullwidth" key={account.id}>
      <thead>
          <tr>
            <th style={{width: "20%"}}>Location</th>
            <th style={{width: "20%"}}>Account #</th>
            <th style={{width: "20%"}}>Sub Account #</th>
            <th style={{width: "20%"}}>Monthly Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="has-text-weight-bold">{account.LocationName}</span>
            </td>
            <td>
              {account.AccountNum}
            </td>
            <td>
              {account.SubAccountNum}
            </td>
            <td>
              {account.MRC}
            </td>
          </tr>
        </tbody>    
      </table>
       )) : "No Assets have been entered"}

      
      </PrintComponents>    
    </div> 
      {accounts != "" ? accounts.map(account => (
      <table className="table is-fullwidth" key={account.id}>
      <thead>
          <tr>
            <th style={{width: "20%"}}></th>
            <th style={{width: "20%"}}>Account #</th>
            <th style={{width: "20%"}}>Sub Account #</th>
            <th style={{width: "20%"}}>Monthly Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="has-text-weight-bold">{account.AccountServiceLocationName}</span>
            </td>
            <td>
              {account.AccountNum}
            </td>
            <td>
              {account.SubAccountNum}
            </td>
            <td>
              {account.MRC}
            </td>
          </tr>
        </tbody>    
      </table>
       )) : "No Accounts have been entered"}

      </>
  )
}

export default AccountReport