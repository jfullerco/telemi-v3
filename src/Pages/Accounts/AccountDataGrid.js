import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {stateContext} from '../../Contexts/stateContext'
import {db} from '../../Contexts/firebase'

const AccountDataGrid = ({queryCol, queryID, visible}) => {

  const userContext = useContext(stateContext)
  const {currentUser, currentCompanyID} = userContext.userSession
  const [isVisible, setIsVisible] = useState(false) 
  const [accounts, setAccounts] = useState()
  const history = useHistory()

  useEffect(() => {
    fetchAccounts()
  },[]) 
  const fetchAccounts = async() => {
    console.log(queryCol, queryID)
    const accountRef = await db.collection("Accounts").where(queryCol, "==", queryID).get()
    const accountSnapShot = await accountRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setAccounts(accountSnapShot)
  }

  return(
    <>
      <div className="table-container">
      <nav className="level">
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead className="is-size-6">
            <tr>
            <th>Vendor</th>
            <th>Account</th>
            <th>Sub Account</th>
            <th>Location Linked</th>
            <th>Monthly Cost</th>
            <th>
                <a className="tag is-small is-rounded is-link is-7 has-text-weight-normal" onClick={() => history.push("/addaccount")}>
                  Add New
                </a>
              </th>
            </tr>
          </thead>
          <tbody className="is-size-7">
          {userContext.userSession.dataLoading != true ?
            accounts != undefined ? accounts.map(account => (
            
            <tr onClick={()=>
                  history.push({
                      pathname: "/accountdetail",
                      state: {
                      id: account.id,
                      services: services,
                      locations: locations
                      }
                    }) 
                  } 
                key={account.id} >
              <td style={{width: "20%"}}>{account.Vendor}</td>
              <td style={{width: "20%"}}>{account.AccountNum}</td>
              <td style={{width: "20%"}}>{account.SubAccountNum}</td>
              <td style={{width: "20%"}}>{account.AccountServiceLocationName} </td>
              <td style={{width: "20%"}}>$ {account.PostTaxMRC}</td>
              <td>
              
              </td>
            </tr>
            
          )) : 
            <tr> 
              <td> 
                <a className="tag is-small is-rounded is-link is-7 has-text-weight-normal" onClick={() => history.push("/addaccount")}>
                  Add New
                </a>
              </td> 
            </tr> 
          
        : <tr><td>Fetching Data...</td></tr>}

          </tbody>    
        </table>
        </nav>
      </div>
    </>
  )
}
export default AccountDataGrid