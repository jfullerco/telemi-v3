import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import {db} from '../../Contexts/firebase'

import AddAccount from '../Accounts/AddAccount'

const AccountDataGrid = ({queryCol, queryID, visible}) => {

  const userContext = useContext(stateContext)
  const {currentUser, currentCompanyID} = userContext.userSession
  const [isVisible, setIsVisible] = useState(false)
  const [toggleModal, setToggleModal] = useState(false) 
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

  const setUnlinkService = async(id) => {
    const accountRef = await db.collection("Accounts").doc(id)
    const res = await accountRef.update({AccountServiceID: ""})
  }

  return(
    <>
    {toggleModal != false ? <AddAccount /> : ""}
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
                <a className="tag is-small is-rounded is-link is-7 has-text-weight-normal" onClick={() => setToggleModal(!toggleModal)}>
                  Add New
                </a>
              </th>
            </tr>
          </thead>
          <tbody className="is-size-7">
          {accounts && accounts.length != 0 ? accounts.map(account => (
            
            <tr key={account.id} >
              <td style={{width: "20%"}}>{account.Vendor}</td>
              <td style={{width: "20%"}}>{account.AccountNum}</td>
              <td style={{width: "20%"}}>{account.SubAccountNum}</td>
              <td style={{width: "20%"}}>{account.AccountServiceLocationName} </td>
              <td style={{width: "20%"}}>$ {account.PostTaxMRC}</td>
              <td>
              <a className="tag is-small is-rounded is-link is-7 has-text-weight-normal" onClick={() => setUnlinkService(account.id)}>
                 Unlink
              </a>
              </td>
            </tr>
            
          )) : (
            <tr> 
              <td> 
                <a className="button is-small is-rounded is-link is-7 has-text-weight-normal" onClick={() => history.push("/addaccount")}>
                  Add New
                </a>
              </td> 
            </tr> 
          )}

          </tbody>    
        </table>
        </nav>
      </div>
    </>
  )
}
export default AccountDataGrid