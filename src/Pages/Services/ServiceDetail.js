import React, {useState, useEffect, useContext, useRef} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'
import {serviceDetailFields} from '../../Contexts/initialFields'

import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'
import Page from '../../Components/Page'
import EditDocDrawer from '../../Components/Layout/EditDocDrawer'
import ViewDocDrawer from '../../Components/Layout/ViewDocDrawer'

import TabBar from '../../Components/Tabs/TabBar'

import PageField from '../../Components/Layout/PageField'
import AddBill from '../Accounts/Bill/AddBill'


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
          refreshLocations } = userContext

  const { locations,
          services, 
          orders, 
          accounts,
          tickets,
          bills,
          currentCompanyID,
          currentCompany,
          currentUser } = userContext.userSession

  const [newService, setNewService] = useState(false)
  const [loading, setLoading] = useState()
  const [updated, setUpdated] = useState(false)
  const [pageFields, setPageFields] = useState(serviceDetailFields)
  const [modalState, setModalState] = useState()
  const [pageSuccess, setPageSuccess] = useState(false)
  const [pageError, setPageError] = useState(false)

  const [activeService, setActiveService] = useState("")
  const [data, setData] = useState()
  const [relatedDataToShow, setRelatedDataToShow] = useState("")
  
  const [tab, setTab] = useState("BASIC_INFO")
  const [isEditDrawerActive, setIsEditDrawerActive] = useState(false)
  const [isViewDrawerActive, setIsViewDrawerActive] = useState(false)
  
  const [addRelatedValue, setAddRelatedValue] = useState()
  const [isRelatedActive, setIsRelatedActive] = useState(false)
  const [toggleHoverField, setToggleHoverField] = useState(false)

  useEffect(() => {
    setLoading(true)
    params.checked === "true" ? setChecked(true) : ""
    params.new === "true" ? setNewService(true) : 
    fetchService()
    fetchBills()
  }, [])

  useEffect(() => {
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
    newService === true ?
    setData({...data, ['CompanyID']: currentCompanyID, ['CompanyName']: currentCompany}) : ""
    console.log(data)
  },[newService])

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

  const handleInitialFieldMapping = (field, value, arr) => {

    const indexRef = arr.findIndex(i => i.dataField === field)
    arr[indexRef] = {...arr[indexRef], inputSource: value}
  
  }

  const fetchService = async() => {
   
    const serviceRef = await db.collection("Services").doc(state.location.state.id).get()
    
    const data = await serviceRef.data()
    const id = await serviceRef.id
    setActiveService({id: id, ...data})
    setData(data)

  }

  const fetchBills = async() => {
    const billsRef = await db.collection("Bills").where("ServiceID", "==", state.location.state.id).get()
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
      setPageSuccess("Ticket Added")
      setNewService(false) 
    } catch {
      setPageError("Error Adding Ticket")
    } 
    handleToggle()
  }

  const handleToggle = () => {
    setIsEditDrawerActive(!isEditDrawerActive)
  }

  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1500)
  }


const handleSetLastUpdatedFields = () => {
  setActiveService({
    ...activeService,  
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

const handleToggleMapField = (e) => {
  setModalState(e)
}

const handleToggleViewDrawer = (e) => {
  
  const {source, id, fields, type} = e
  
  const filteredValue = source && source.filter(f => f.id === id).map(i=> ({...i}))
  
  console.log("filtered:", filteredValue, "fields:", fields)
  setRelatedDataToShow({fields: fields, active: filteredValue, type: type})
  setIsViewDrawerActive(true)
  
}



  return (
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
          <TabBar>
            <ul>  
              <li className={tab === "BASIC_INFO" ? "is-active" : ""}><a onClick={()=>setTab("BASIC_INFO")}>Basic Info</a></li>
              <li className={tab === "DETAILS" ? "is-active" : ""}><a onClick={()=>setTab("DETAILS")}>Details</a></li>
              <li className={tab === "SUPPORT" ? "is-active" : ""}><a onClick={()=>setTab("SUPPORT")}>Support</a></li>
              <li className={tab === "BILLING" ? "is-active" : ""}><a onClick={()=>setTab("BILLING")}>Billing</a></li>
              <li className={tab === "NOTES" ? "is-active" : ""}><a onClick={()=>setTab("NOTES")}>Notes</a></li>
            </ul>
          </TabBar>

          <div className="box p-4 is-rounded">

              <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                  <li className="is-size-7 is-uppercase">last updated: {activeService.LastUpdated && activeService.LastUpdated}</li>
                  <li className="is-size-7 is-uppercase pl-2">updated by: {activeService.LastUpdatedBy && activeService.LastUpdatedBy}</li>
                </ul>
              </nav>

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
                              onClick={() => handleToggleMapField(field.relatedCollection)}>   
                              (add)
                            </a> : null}

                        </div>

                      </Column>
                      <Column size="is-1 is-narrow">:</Column>
                      <Column >

                        <PageField 
                          field={field}
                          fieldData={service}
                          relatedDataMap={
                              field.inputSource && field.inputSource.filter(item => 
                                item[field.relatedDataField] === service.id).map(i => ({...i}))
                            }
                          toggleViewDrawer={()=>handleToggleViewDrawer(!isViewDrawerActive)}
                          toggleFieldDropDown={()=>setIsRelatedActive(!isRelatedActive)}
                          isViewRelatedActive={isRelatedActive}
                        />

                      </Column>
                    </Columns>
                    </div>
                  )}
                </>
              )}

              <EditDocDrawer 
                title="BASIC INFO" 
                checked={isEditDrawerActive} 
                handleClose={()=>setIsEditDrawerActive(!isEditDrawerActive)} 
                handleSubmit={()=> handleSubmit()} 
                handleChange={(e)=> handleChange(e)}
                handleRelatedSelectChange={(e, related)=> handleRelatedSelectChange(e, related)}
                pageFields={pageFields}
                active={activeService}
                tab={tab}
                direction="right"
                colRef="Services"
                docRef={activeService.id}
                addRelatedValue={addRelatedValue}
                handleAddRelatedValue={(e)=>handleAddRelatedValue(e)}
                resetAddRelatedValue={()=>setAddRelatedValue("")}
                handleUpdated={()=>setUpdated(!updated)}
                currentCompany={currentCompany}
                currentCompanyID={currentCompanyID}
              />

              <ViewDocDrawer 
                checked={isViewDrawerActive}
                dataToShow={relatedDataToShow}
                handleClose={()=>setIsViewDrawerActive(!isViewDrawerActive)} 
                direction="right"
              />

              <div className={modalState === "Bills" ? "" : "is-hidden"}>
                <AddBill 
                  accountID={activeService.AccountID}
                  accountNum={activeService.AccountNum}
                  subAccountNum={activeService.SubAccountNum}
                  groupNum={activeService.GroupNum}
                  assetID={activeService.AssetID}
                  serviceID={activeService.id}
                  
                  resetState={()=>handleToggleMapField()}
                  handleUpdated={()=>handleUpdated(!updated)}
                />
              </div>

          </div>

        </> : 
          <div className="tile warning"> No record to display </div>
      }    
    </Page>
  )
}
export default ServiceDetailEdit