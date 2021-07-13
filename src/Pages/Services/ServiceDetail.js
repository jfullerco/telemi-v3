import React, {useState, useEffect, useContext, useRef} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'
import {serviceDetailFields} from '../../Contexts/initialFields'

import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'
import Page from '../../Components/Page'
import PageInputFields from '../../Components/Forms/PageInputFields'
import DrawerComponent from '../../Components/Layout/DrawerComponent'
import DeleteButton from '../../Components/Buttons/DeleteButton'

import TabBar from '../../Components/Tabs/TabBar'

import PageField from '../../Components/Layout/PageField'
import AddBill from '../Accounts/Bill/AddBill'
import Loading from '../../Components/Loading'
import CheckIfNeedsCache from '../../Components/Conditions/CheckIfNeedsCache'


const ServiceDetailEdit = (state) => {

  const params = useParams()
  const history = useHistory()
  

  const userContext = useContext(stateContext)

  const { serviceTypes, 
          accessTypes, 
          serviceStatusType,
          vendorList, 
          isStyle,
          setBills,
          setCurrentDate,
          setLocations,
          setAccounts } = userContext

  const { locations,
          services, 
          orders, 
          accounts,
          tickets,
          bills,
          currentCompany,
          currentUser } = userContext.userSession
  
  const { currentCompanyID } = params
  const {isNew}  = state.location.state || false 
  const {isDrawerActive} = state.location.state || false
  const { cachedLocations } = state.location.state || []
  const { cachedAccounts } = state.location.state || []
  
  
  
  const [data, setData] = useState("")
  const [activeService, setActiveService] = useState("")
  const [newService, setNewService] = useState()
  const [loading, setLoading] = useState(true)
  const [updated, setUpdated] = useState(false)
  const [pageFields, setPageFields] = useState(serviceDetailFields)
  
  const [pageSuccess, setPageSuccess] = useState(false)
  const [pageError, setPageError] = useState(false)
    
  const [relatedDataToShow, setRelatedDataToShow] = useState("")
  
  const [tab, setTab] = useState("BASIC_INFO")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isBillDrawerOpen, setIsBillDrawerOpen] = useState(false)
  
  const [addRelatedValue, setAddRelatedValue] = useState()
  const [isRelatedActive, setIsRelatedActive] = useState(false)
  const [toggleHoverField, setToggleHoverField] = useState(false)

  useEffect(() => {
    checkForNew(isDrawerActive, isNew)
    setLoading(true)
    fetchService()
    fetchBills()
    
  }, [])

  useEffect(() => {
    fetchService()
    handleInitialFieldMapping("Vendor", vendorList, pageFields)
    handleInitialFieldMapping("LocationName", locations, pageFields)
    handleInitialFieldMapping("Type", serviceTypes, pageFields)
    handleInitialFieldMapping("AccessType", accessTypes, pageFields)
    handleInitialFieldMapping("Status", serviceStatusType, pageFields)
    handleInitialFieldMapping("OrderNum", orders, pageFields)
    handleInitialFieldMapping("AccountNum", accounts, pageFields)
    handleInitialFieldMapping("Bills", bills, pageFields)
  },[loading])

  useEffect(() => {
    
    handleSetLastUpdatedFields()
    handleInitialFieldMapping("Vendor", vendorList, pageFields)
    handleInitialFieldMapping("LocationName", locations, pageFields)
    handleInitialFieldMapping("Type", serviceTypes, pageFields)
    handleInitialFieldMapping("AccessType", accessTypes, pageFields)
    handleInitialFieldMapping("Status", serviceStatusType, pageFields)
    handleInitialFieldMapping("OrderNum", orders, pageFields)
    handleInitialFieldMapping("AccountNum", accounts, pageFields)
    handleInitialFieldMapping("Bills", bills, pageFields)
    
  },[updated])

  const checkForNew = (isDrawerActive, isNew) => {
    isDrawerActive === "true" ? setIsDrawerOpen(true) : ""
    isNew === "true" ? setNewService(true) : ""
  }

  const handleInitialFieldMapping = (field, value, arr) => {

    const indexRef = arr.findIndex(i => i.dataField === field)
    arr[indexRef] = {...arr[indexRef], inputSource: value}
  
  }
  
  const fetchService = async() => {
   
    const serviceRef = await db.collection("Services").doc(params.id).get()
    
    const data = await serviceRef.data()
    const id = await serviceRef.id
    setActiveService({id: id, ...data})
    setData(data)

  }

  const fetchBills = async() => {
    const billsRef = await db.collection("Bills").where("ServiceID", "==", params.id).get()
    const bills = billsRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setBills(bills)
    setLoading(false)
  }  

  const handleSubmit = async(e) => {
    try {
      newService  === true ?
      await db.collection("Services").doc().set(data) : 
      await db.collection("Services").doc(activeService.id).update(data)
      setPageSuccess("Service Added")
    } catch {
      setPageError("Error Adding Service")
    } 
    setNewService(false) 
    setUpdated(true)
    setIsDrawerOpen(!isDrawerOpen)
  }

  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1500)
  }

  const handleToggle = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }


const handleSetLastUpdatedFields = () => {
  setActiveService({
    ...activeService,  
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

const handleChange = (e) => {
  const {name, value} = e.target
  console.log(name, value)
  setActiveService({...activeService, [name]: value})
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
  setActiveService({...activeService, [relatedName]: id, [name]: value})
  setData({...data, [relatedName]: id, [name]: value})
  setUpdated(!updated)
}

const handleAddRelatedValue = (e) => {
  console.log(e)
  setAddRelatedValue(e)
}

const handleToggleRelatedDrawer = (e) => {
  e === "Bills" ? setIsBillDrawerOpen(!isBillDrawerOpen) : null
  
}

const handleToggleViewDrawer = (e) => {
  
  const {source, id, fields, type} = e
  
  const filteredValue = source && source.filter(f => f.id === id).map(i=> ({...i}))
  
  console.log("filtered:", filteredValue, "fields:", fields)
  setRelatedDataToShow({fields: fields, active: filteredValue, type: type})
  setIsDrawerOpen(true)
  
}

const handleSetCache = (value, setValue) => {
  setValue(value)
}

const handleClick = (e) => {
  history.push(`/orderdetail/${currentCompanyID}/${e}`)
}

return (
    <Loading active={loading}>

    <Page 
      title="DETAILS" 
      subtitle={activeService.AssetID} 
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

              <nav className="breadcrumb" aria-label="breadcrumbs"> {/** Refactor this as LastUpdatedComponent Component with Hook */}
                <ul>
                  <li className="is-size-7 is-uppercase">last updated: {activeService.LastUpdated && activeService.LastUpdated}</li>
                  <li className="is-size-7 is-uppercase pl-2">updated by: {activeService.LastUpdatedBy && activeService.LastUpdatedBy}</li>
                </ul>
              </nav>

              {/** Refactor as ViewPageFields Component */}
              {activeService && pageFields.map(field => 
                <>
                  {[activeService].map(service => 
                    <div className={field.visible != false & field.tab === tab ? "" : "is-hidden" }> 
                    <Columns options="is-mobile">
                      <Column size="is-3">

                        <div className="has-text-weight-semibold" key={field.label}>
                          
                          {field.label} 

                          {field.addBtn === true ? 
                            <a className="link has-text-weight-normal is-size-7 pl-2" 
                              onClick={(e) => handleToggleRelatedDrawer(field.relatedCollection)}>   
                              (add)
                            </a> : null}

                        </div>

                      </Column>
                      <Column size="is-narrow">:</Column>
                      <Column>
                      
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
                          <PageField 
                            field={field}
                            fieldData={service}
                            relatedDataMap={
                                field.inputSource && field.inputSource.filter(item => 
                                  item[field.relatedDataField] === service.id).map(i => ({...i}))
                              }
                            toggleViewDrawer={()=>handleToggle()}
                            toggleFieldDropDown={()=>setIsRelatedActive(!isRelatedActive)}
                            isViewRelatedActive={isRelatedActive}
                            handleClick={(e)=>handleClick(e)}
                          />
                        </CheckIfNeedsCache>
                        </CheckIfNeedsCache>
                      </Column>
                    </Columns>
                    </div>
                  )}
                </>
              )}

              <DrawerComponent 
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
                  active={activeService}
                  tab={tab}
                  addRelatedValue={addRelatedValue}
                  handleAddRelatedValue={(e)=>handleAddRelatedValue(e)}
                  resetAddRelatedValue={()=>setAddRelatedValue("")}
                  handleUpdated={()=>setUpdated(!updated)}
                  currentCompany={currentCompany}
                  currentCompanyID={currentCompanyID}
                />

                <DeleteButton 
                  colRef="Services"
                  docRef={activeService.id}
                />

              </DrawerComponent>

              <DrawerComponent
                checked={isBillDrawerOpen}
                hideBtns={true} 
                direction="right"
                handleSubmit={()=> handleBillSubmit()}
              >
                <AddBill 
                  active={activeService}
                  handleClose={(e)=>setIsBillDrawerOpen(e)}
                  handleUpdated={()=>handleUpdated(!updated)}
                />

              </DrawerComponent>

          </div>

        </> : 
          <div className="tile warning"> No record to display </div>
      }    
    </Page>

    </Loading>
    
  )
}
export default ServiceDetailEdit