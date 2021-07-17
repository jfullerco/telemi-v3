import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { stateContext } from '../Contexts/stateContext'
import { db } from '../Contexts/firebase'
import {
  serviceDetailFields,
  orderDetailFields,
  accountDetailFields,
  ticketDetailFields,
  billsDetailFields } from '../Contexts/initialFields'

import Columns from '../Components/Layout/Columns'
import Column from '../Components/Layout/Column'
import Page from '../Components/Page'
import DrawerComponent from '../Components/Layout/DrawerComponent'
import TabBar from '../Components/Tabs/TabBar'
import Loading from '../Components/Loading'
import CheckIfNeedsCache from '../Components/Conditions/CheckIfNeedsCache'
import PageField from '../Components/Layout/PageField'
import FieldLabel from '../Components/Layout/FieldLabel'
import DeleteButton from '../Components/Buttons/DeleteButton'

import PageInputFields from '../Components/Forms/PageInputFields'
import RelatedPageInputFields from '../Components/Forms/RelatedPageInputFields'


const DetailModule = (state) => {

  const params = useParams()
  const history = useHistory()
  
  const { isModule } = params.isModule && params || null

  const userContext = useContext(stateContext)

  const { serviceTypes, 
          accessTypes, 
          serviceStatusType,
          vendorList, 
          isStyle,
          setBills,
          setCurrentDate,
          setLocations,
          setAccounts,
          setServices,
          setNotes } = userContext

  const { locations,
          services, 
          orders, 
          accounts,
          tickets,
          bills,
          notes,
          currentCompany,
          currentUser } = userContext.userSession
  
  const { currentCompanyID } = params
  const {isNew}  = state.location.state || false 
  const {isDrawerActive} = state.location.state || false
  const { cachedLocations } = state.location.state || []
  const { cachedAccounts } = state.location.state || []
  const { cachedServices } = state.location.state || []
  
  const [data, setData] = useState("")
  const [active, setActive] = useState("")
  const [activeSubtitle, setActiveSubtitle] = useState("")
  const [docIsNew, setDocIsNew] = useState()
  const [loading, setLoading] = useState(true)
  const [updated, setUpdated] = useState(false)
  const [pageFields, setPageFields] = useState([])
  const [isQuickAddDataField, setIsQuickAddDataField] = useState("")
  const [isQuickAddDrawerOpen, setIsQuickAddDrawerOpen] = useState(false)
  
  const [pageSuccess, setPageSuccess] = useState(false)
  const [pageError, setPageError] = useState(false)
    
  const [relatedInputData, setRelatedInputData] = useState("")
  const [isRelatedDrawerOpen, setIsRelatedDrawerOpen] = useState(false)
  
  const [tab, setTab] = useState("BASIC_INFO")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  
  const [addRelatedValue, setAddRelatedValue] = useState()
  const [isRelatedActive, setIsRelatedActive] = useState(false)
  

  useEffect(() => {
    setLoading(true)
    handlePageFields(isModule)
    checkForNew(isDrawerActive, isNew)
    fetchPage()
    fetchBills()
    fetchNotes()
    
  }, [])

  useEffect(() => {
    
    handlePageFields(isModule)
    fetchPage()
    fetchBills()
    fetchNotes()
    setTab("BASIC_INFO")
    handleInitialFieldMapping("Vendor", vendorList, pageFields)
    handleInitialFieldMapping("LocationName", locations, pageFields)
    handleInitialFieldMapping("Type", serviceTypes, pageFields)
    handleInitialFieldMapping("AccessType", accessTypes, pageFields)
    handleInitialFieldMapping("Status", serviceStatusType, pageFields)
    handleInitialFieldMapping("OrderNum", orders, pageFields)
    handleInitialFieldMapping("Services", services, pageFields)
    handleInitialFieldMapping("AccountNum", accounts, pageFields)
    handleInitialFieldMapping("Bills", bills, pageFields)
    handleInitialFieldMapping("Notes", notes, pageFields)
    handleSetHeader()
    handleFinishedLoading()
  },[loading])

  useEffect(() => {

    handlePageFields()
    handleSetLastUpdatedFields()
    handleInitialFieldMapping("Vendor", vendorList, pageFields)
    handleInitialFieldMapping("LocationName", locations, pageFields)
    handleInitialFieldMapping("Type", serviceTypes, pageFields)
    handleInitialFieldMapping("AccessType", accessTypes, pageFields)
    handleInitialFieldMapping("Status", serviceStatusType, pageFields)
    handleInitialFieldMapping("OrderNum", orders, pageFields)
    handleInitialFieldMapping("Services", services, pageFields)
    handleInitialFieldMapping("AccountNum", accounts, pageFields)
    handleInitialFieldMapping("Bills", bills, pageFields)
    
  },[updated])

  const handlePageFields = (isModule) => {
    switch (isModule) {
      case "Services": 
        return (
          setPageFields(serviceDetailFields) 
        )
      case "Accounts":
        return (
          setPageFields(accountDetailFields)
        )
      case "Orders":
        return (
          setPageFields(orderDetailFields)
        )
      case "Tickets":
        return (
          setPageFields(ticketDetailFields)
        )
      case "Bills":
        return (
          setPageFields(billsDetailFields)
        )
    }
  }

  const checkForNew = (isDrawerActive, isNew) => {
    isDrawerActive === "true" ? setIsDrawerOpen(true) : ""
    isNew === "true" ? setDocIsNew(true) : ""
  }

  const handleSetHeader = () => {
    const subtitle = pageFields.filter(f => f.isHeader === true).map(field => setActiveSubtitle(field.dataField))
  }

  const handleInitialFieldMapping = (field, value, arr) => {

    const indexRef = arr.findIndex(i => i.dataField === field)
    arr[indexRef] = {...arr[indexRef], inputSource: value}
  
  }
  
  const fetchPage = async() => {
   
    const pageFieldsRef = await db.collection(isModule).doc(params.id).get() 
    const data = await pageFieldsRef.data()
    const id = await pageFieldsRef.id
    await setActive({id: id, ...data})
    await setData(data)
  
  }

  const fetchBills = async() => {
    const billsRef = await db.collection("Bills").where("ServiceID", "==", params.id).get()
    const bills = await billsRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    await setBills(bills)

  } 
  
  const fetchNotes = async() => {
    const notesRef = await db.collection("Notes").where("ServiceID", "==", params.id).get()
    const notes = await notesRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    await setNotes(notes)

  } 

  const handleFinishedLoading = () => {
    setTimeout(() => {setLoading(false)}, 1000)
  }

  const handleSubmit = () => {
      docIsNew === true ?   
      handleSubmitNew(data) : handleSubmitUpdated(data)
  }

  const handleSubmitNew = async(data) => {
    try {
      await db.collection(isModule).doc().set(data) 
      
      setPageSuccess("Saved")
    } catch {
      setPageError("Error saving")
    } 
    setDocIsNew(false) 
    setUpdated(true)
    setIsDrawerOpen(!isDrawerOpen)
  }

  const handleSubmitUpdated = async(data) => { 
      try {
        await db.collection(isModule).doc(params.id).update(data)
        
        setPageSuccess("Saved")
      } catch {
        setPageError("Error saving")
      } 
      setDocIsNew(false) 
      setUpdated(true)
      setIsDrawerOpen(!isDrawerOpen)
  }

  const handleRelatedSubmit = async() => {
    console.log(relatedInputData)
    try {
    await db.collection(relatedInputData.collection).doc().set(relatedInputData.data)
      setPageSuccess(`New ${relatedInputData.label} Saved`)
    } catch {
      setPageError(`Error Saving New ${relatedInputData.label}`)
    }  
      setIsRelatedDrawerOpen(!isRelatedDrawerOpen)
      setLoading(!loading)  
  }

const handleSetLastUpdatedFields = () => {
  setActive({
    ...active,  
    ['LastUpdated']: setCurrentDate(),
    ['LastUpdatedBy']: currentUser,
    ['CompanyID']: currentCompanyID, 
    ['CompanyName']: currentCompany
  })
  setData({
    ...data, 
    ['LastUpdated']: setCurrentDate(),
    ['LastUpdatedBy']: currentUser,
    ['CompanyID']: currentCompanyID, 
    ['CompanyName']: currentCompany
  })
}

const handleToggle = () => {
  setIsDrawerOpen(!isDrawerOpen)
}

const handleChange = (e) => {
  const {name, value} = e.target
  console.log(name, value)
  setActive({...active, [name]: value})
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
  setActive({...active, [relatedName]: id, [name]: value})
  setData({...data, [relatedName]: id, [name]: value})
  setUpdated(!updated)
}

const handleAddRelatedValue = (e) => {
  console.log(e)
  setAddRelatedValue(e)
}

const handleSetCache = (value, setValue) => {
  setValue(value)
}

const handleClick = (e) => {
  setLoading(true)
  history.push({
    pathname: `/${e.colRef}/${currentCompanyID}/${e.id}`,
    state: {
    services: services,
    locations: locations,
    accounts: accounts,
    }
  }) 
}
console.log(relatedInputData)
const handleRelatedDrawer = (field) => {
  field.inputFieldType === "map-list" ? (
  setRelatedInputData({
    collection: field.relatedCollection, 
    pageFields: field.relatedInputFields, 
    label: field.label, 
    data: {
      ['CompanyID']: currentCompanyID,
      ['CompanyName']: currentCompany,
      ['CreatedDate']: setCurrentDate(),
      ['CreatedBy']: currentUser,
      [field.relatedDataField]: params.id
    }  
  })) : (
  setRelatedInputData({
    collection: field.relatedCollection, 
    pageFields: field.relatedInputFields, 
    label: field.label, 
    data: {
      ['CompanyID']: currentCompanyID,
      ['CompanyName']: currentCompany,
      ['CreatedDate']: setCurrentDate(),
      ['CreatedBy']: currentUser,
      [field.relatedDataField]: params.id
    }  
  }))
  setIsRelatedDrawerOpen(true)
}

const handleRelatedInputChange = (e) => {
  const {name, value} = e.target
  setRelatedInputData({
    ...relatedInputData, 
    data: {...relatedInputData.data,
      [name]: value,
    }})
}
return (
    <Loading active={loading}>

    <Page 
      title={isModule.toUpperCase() || "DETAILS"}
      subtitle={active && [active].map(item => item[activeSubtitle] && item[activeSubtitle])} 
      status="view" 
      handleToggle={()=> handleToggle()} 
      pageSuccess={pageSuccess} 
      pageError={pageError}
    >
      {userContext && userContext.userSession != undefined ? 
        <>
          <TabBar>{/** Refactor this as Array/Map */}
            <ul>  
              <li className={tab === "BASIC_INFO" ? "is-active" : ""}><a onClick={()=>setTab("BASIC_INFO")}>Basic Info</a></li>
              <li className={tab === "DETAILS" ? "is-active" : ""}><a onClick={()=>setTab("DETAILS")}>Details</a></li>
              <li className={tab === "SUPPORT" ? "is-active" : ""}><a onClick={()=>setTab("SUPPORT")}>Support</a></li>
              <li className={tab === "BILLING" ? "is-active" : ""}><a onClick={()=>setTab("BILLING")}>Billing</a></li>
              <li className={tab === "NOTES" ? "is-active" : ""}><a onClick={()=>setTab("NOTES")}>Notes</a></li>
            </ul>
          </TabBar>

          <div className="box p-4 is-rounded has-text-black">

              {/** Refactor as ViewPageFields Component */}
              {active && pageFields.map(field => 
                <>
                  {[active].map(docItem => 
                    <div className={field.visible != false & field.tab === tab ? "" : "is-hidden" }> 
                    <hr className={field.hasBreakBefore === true ? "" : "is-hidden"} />
                    <Columns options="is-mobile">
                      <Column size="is-3">

                        <FieldLabel>
                          <Columns options="is-mobile">
                            <Column size="is-11">
                              <div key={field.label}>{field.label} 

                                {field.inputFieldType === "map-list" ? 
                                  <a className="link has-text-weight-normal is-size-7 pl-2" 
                                    onClick={() => handleRelatedDrawer(field)}>   
                                    (add) 
                                  </a> : null}
                                </div>
                              </Column>
                              <Column>:</Column>
                            </Columns>
                        </FieldLabel>

                      </Column>
                     
                      <Column size="pl-5">
                      
                        <CheckIfNeedsCache 
                          value={accounts} 
                          setValue={setAccounts} 
                          handleSetCache={(value, setValue)=>handleSetCache(value, setValue)} fallbackValue={cachedAccounts}
                        >  
                        <CheckIfNeedsCache 
                          value={locations} 
                          setValue={setLocations} 
                          handleSetCache={(value, setValue)=>handleSetCache(value, setValue)} fallbackValue={cachedLocations}
                        >
                        <CheckIfNeedsCache 
                          value={services} 
                          setValue={setServices} 
                          handleSetCache={(value, setValue)=>handleSetCache(value, setValue)} fallbackValue={cachedServices}
                        >     
                          <PageField 
                            field={field}
                            fieldData={docItem}
                            relatedDataMap={
                                field.inputSource && field.inputSource.filter(item => 
                                  item[field.relatedDataField] === docItem.id).map(i => ({...i}))
                              }
                            toggleViewDrawer={()=>handleToggle()}
                            toggleFieldDropDown={()=>setIsRelatedActive(!isRelatedActive)}
                            isViewRelatedActive={isRelatedActive}
                            handleClick={(e)=>handleClick(e)}
                          />
                        </CheckIfNeedsCache>
                        </CheckIfNeedsCache>
                        </CheckIfNeedsCache>
                      </Column>
                    </Columns>
                      
                    </div>
                  )}
                </>
              )}
            
              <DrawerComponent 
                title="Edit"
                checked={isDrawerOpen}
                handleClose={()=>setIsDrawerOpen(!isDrawerOpen)} 
                direction="right"
                handleSubmit={()=> handleSubmit()}
              >

                <PageInputFields 
                  checked={isDrawerOpen}
                  handleClose={()=>setIsDrawerOpen(!isDrawerOpen)}
                  handleChange={(e)=> handleChange(e)}
                  handleRelatedSelectChange={(e, related)=> handleRelatedSelectChange(e, related)}
                  pageFields={pageFields}
                  active={active}
                  tab={tab}
                  addRelatedValue={addRelatedValue}
                  handleAddRelatedValue={(e)=>handleRelatedDrawer(e)}
                  resetAddRelatedValue={()=>setAddRelatedValue("")}
                  handleUpdated={()=>setUpdated(!updated)}
                  currentCompany={currentCompany}
                  currentCompanyID={currentCompanyID}
                />

                <DeleteButton 
                  colRef={isModule}
                  docRef={active.id}
                />

              </DrawerComponent>

              

              <DrawerComponent
                title="Add New"
                checked={isRelatedDrawerOpen}
                direction="right"
                handleClose={()=>setIsRelatedDrawerOpen(!isRelatedDrawerOpen)}
                handleSubmit={()=>handleRelatedSubmit()}
              >
{/** 
                <QuickAdd 
                  colRef={relatedInputData.collection}
                  dataField={relatedInputData.field}
                  label={relatedInputData.label}
                  handleRelatedInputChange={(e)=>handleRelatedInputChange(e)}
                />
*/}
                <RelatedPageInputFields 
                  relatedFields={relatedInputData.pageFields}
                  handleChange={(e)=>handleRelatedInputChange(e)}
                  handleUpdated={()=>setUpdated(!updated)}
                />

                
              </DrawerComponent>

          </div>
          <nav className="breadcrumb" aria-label="breadcrumbs">
              {/** Refactor this as LastUpdatedComponent Component with Hook */}
              <ul>
                <li className="is-size-7 is-uppercase">last updated: {active.LastUpdated && active.LastUpdated}</li>
                <li className="is-size-7 is-uppercase pl-2">updated by: {active.LastUpdatedBy && active.LastUpdatedBy}</li>
              </ul>
            </nav>
        </> : 
          <div className="tile warning"> No record to display </div>
      }    
    </Page>

    </Loading>
    
  )
}
export default DetailModule