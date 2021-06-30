import React, {useState, useEffect, useContext, useRef} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'
import {accountDetailFields} from '../../Contexts/initialFields'

import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'
import Page from '../../Components/Page'
import EditDocDrawer from '../../Components/Layout/EditDocDrawer'
import SelectField from '../../Components/Forms/SelectField'
import TextArea from '../../Components/Forms/TextArea'
import TabBar from '../../Components/Tabs/TabBar'
import TextBox from '../../Components/Forms/TextBox'
import SelectBox from '../../Components/Forms/SelectBox'

const AccountDetail = (state) => {

  const params = useParams()
  const history = useHistory()
  const userContext = useContext(stateContext)

  const { serviceTypes, 
          accessTypes, 
          serviceStatusType,
          vendorList, 
          isStyle,
          setCurrentDate } = userContext

  const { locations,
          services, 
          orders,
          accounts, 
          tickets,
          currentUser,
          currentCompany,
          currentCompanyID } = userContext.userSession
  
  const [activeAccount, setActiveAccount] = useState("")
  const [data, setData] = useState()
  const [checked, setChecked] = useState(false)
  const [newAccount, setNewAccount] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [tab, setTab] = useState("BASIC_INFO")
  const [pageSuccess, setPageSuccess] = useState(false)
  const [pageError, setPageError] = useState(false)
  const pageFields = accountDetailFields.map(obj => ({...obj}))

  useEffect(() => {
    params.checked === "true" ? setChecked(true) : ""
    params.new === "true" ? setNewAccount(true) : 
    fetchAccount()
    
  }, [])

  useEffect(()=> {
    newAccount === true ?
    setData({...data, ['CompanyID']: currentCompanyID, ['CompanyName']: currentCompany}) : ""
    console.log(data)
  },[newAccount])

  useEffect(() => {
    handleSetLastUpdatedFields()
  },[updated])

  const fetchAccount = async() => {
   
    const accountRef = await db.collection("Accounts").doc(state.location.state.id).get()

    const data = await accountRef.data()
    const id = await accountRef.id
    setActiveAccount({id: id, ...data})
    setData(data)
  }

  const fetchBills = async() => {
    const billsRef = await db.collection("Bills").where("AccountID", "==", state.location.state.id).get()
    const bills = billsRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setBills(bills)
  }
  
  const handleSubmit = async(e) => {

    console.log(data)
    const res = await db.collection("Accounts").doc(state.location.state.id).update(data)
    history.push("/dashboard")
  }

  const handleSetLastUpdatedFields = () => {
    setActiveAccount({
      ...activeAccount,  
      ['LastUpdated']: setCurrentDate(),
      ['LastUpdatedBy']: currentUser
    })
    setData({
      ...data, 
      ['LastUpdated']: setCurrentDate(),
      ['LastUpdatedBy']: currentUser
    })
  }  

const handleChange = (e) => {
  const {name, value} = e.target
  setActiveAccount({...activeAccount, [name]: value})
  setData({...data, [name]: value})
  setUpdated(!updated)
}

const handleRelatedSelectChange = (e, relatedDataField) => {
  e.preventDefault()
  const selectedValue = e.target.options[e.target.selectedIndex].text
  const id = e.target.options[e.target.selectedIndex].id
  const {name, relatedName} = relatedDataField
  const {value} = e.target
  
  console.log({[relatedName]: id, [name]: value})
  setActiveAccount({...activeAccount, [relatedName]: id, [name]: value})
  setData({...data, [relatedName]: id, [name]: value})
  setUpdated(!updated)
}

const handleToggle = () => {
  setChecked(!checked)
}
  

  const billColumns = [
  {docField: 'Date', headerName: 'Date', key: "1"},
  {docField: 'Cost', headerName: 'Cost', key: "2"},
  {docField: 'DisputedCost', headerName: 'Cost Disputed', key: "3"}
  ] 

  const handleAddBillBtn = (id) => {
    history.push({
      pathname: "/addbill",
        state: {
          AccountNum: activeAccount.AccountNum,
          AccountID: state.location.state.id
          }
        })
  }

  return (
    <Page title="Account" subtitle={activeAccount && activeAccount.AccountNum} status={updated === true ? "edit" : "view"} handleToggle={()=> handleToggle()} pageSuccess={pageSuccess} pageError={pageError}>
        {userContext && userContext.userSession != undefined ? 
          <>
            <TabBar>
              <ul>
              <li className={tab === "BASIC_INFO" ? "is-active" : ""}><a onClick={()=>setTab("BASIC_INFO")}>Basic Info</a></li>
              <li className={tab === "DETAILS" ? "is-active" : ""}><a onClick={()=>setTab("DETAILS")}>Details</a></li>
              <li className={tab === "SUPPORT" ? "is-active" : ""}><a onClick={()=>setTab("SUPPORT")}>Support</a></li>
              <li className={tab === "BILLING" ? "is-active" : ""}><a onClick={()=>setTab("BILLING")}>Billing</a></li>
              </ul>
            </TabBar>
            <nav className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li className="is-size-7 is-uppercase">last updated: {activeAccount && activeAccount.LastUpdated && activeAccount.LastUpdated}</li>
                <li className="is-size-7 is-uppercase">updated by: {activeAccount && activeAccount.LastUpdatedBy && activeAccount.LastUpdatedBy}</li>
              </ul>
            </nav>
            {activeAccount && pageFields.map(el => 
              <>
                {[activeAccount].map(h => 
                  <div className={el.visible != false & el.tab === tab ? "" : "is-hidden" }> 
                  <Columns options="is-mobile">
                    <Column size="is-5-mobile is-3-fullhd">
                      <div className="has-text-weight-semibold" key={el.label}>
                        {el.label} 
                      </div>
                    </Column>
                    <Column size="is-1 is-narrow">:</Column>
                    <Column >
                      <div>{h[el.dataField]}</div>
                    </Column>
                  </Columns>
                  </div>
                )}
              </>
            )}

            <EditDocDrawer 
              title="BASIC INFO" 
              checked={checked} 
              handleClose={()=>setChecked(!checked)} 
              handleSubmit={()=> handleSubmit()} 
              colRef="Accounts" 
              docRef={activeAccount.id}
            >
              {pageFields.filter(t => t.tab === tab).map(h => { 
                switch (h.inputFieldType) {

                  case "related-select":
                    return (
                      
                            <SelectField type="select" title={h.label} name={h.dataField} value={activeAccount && activeAccount[h.dataField]} handleChange={(e)=>handleRelatedSelectChange(e, {name: h.dataField, relatedName: h.relatedDataField})} >
                              <option></option>
                                {h.inputSource && h.inputSource.map(i => 
                                  <option id={i[h.inputID]} name={i[h.dataField]}>
                                    {i[h.inputValue]}
                                  </option>
                                )}
                            </SelectField>
                        
                    ) 

                  case "select":
                    return (
                      
                            <SelectField type="select" title={h.label} name={h.dataField} value={activeAccount && activeAccount[h.dataField]} handleChange={(e)=>handleChange(e)} >
                              <option></option>
                                {h.inputSource && h.inputSource.map(i => 
                                  <option name={i[h.dataField]}>
                                    {i[h.inputValue]} 
                                  </option>
                                )}
                            </SelectField>
                        
                    ) 

                  case "text":
                    return (
                      
                          <TextBox title={h.label} name={h.dataField} value={activeAccount && activeAccount[h.dataField]} fieldChanged={(e)=>handleChange(e)} />
                        
                    ) 

                  case "text-area":
                    return (
                      
                          <TextArea title={h.label} name={h.dataField} value={activeAccount && activeAccount[h.dataField]} fieldChanged={(e)=>handleChange(e)} />
                        
                    ) 

                  case "datepicker":
                    return (
                      
                          <TextBox 
                            id="datetime-local"
                            title={h.label}
                            type="date" 
                            name={h.dataField} 
                            className="input is-rounded is-small"
                            value={activeAccount && activeAccount[h.dataField]} 
                            fieldChanged={(e)=>handleChange(e)} 
                          />
                        
                    ) 
  
                  }
                }
              )}
              
            </EditDocDrawer>
          </> : 
        <div className="tile warning"> No record to display </div>}    
      </Page>
          
    
  )
}
export default AccountDetail