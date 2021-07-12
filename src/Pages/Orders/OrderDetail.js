import React, {useState, useEffect, useContext, useRef} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'
import {orderDetailFields} from '../../Contexts/initialFields'

import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'
import Page from '../../Components/Page'
import DrawerComponent from '../../Components/Layout/DrawerComponent'
import PageInputFields from '../../Components/Forms/PageInputFields'
import PageField from '../../Components/Layout/PageField'
import SelectField from '../../Components/Forms/SelectField'
import TextBox from '../../Components/Forms/TextBox'
import TextArea from '../../Components/Forms/TextArea'
import TabBar from '../../Components/Tabs/TabBar'
import DeleteButton from '../../Components/Buttons/DeleteButton'
import CheckIfNeedsCache from '../../Components/Conditions/CheckIfNeedsCache'
import Loading from '../../Components/Loading'
import AddLinkSmall from '../../Components/Buttons/AddLinkSmall'

const OrderDetail = (state) => {
  const params = useParams()
  
  const history = useHistory()
  const userContext = useContext(stateContext)

  const { serviceTypes, 
          accessTypes, 
          serviceStatusType,
          orderStatusType,
          orderType,
          vendorList, 
          isStyle,
          setLocations,
          setAccounts,
          setCurrentDate } = userContext

  const { locations,
          services, 
          orders, 
          tickets,
          accounts,
          currentUser,
          currentCompany } = userContext.userSession

  const { currentCompanyID } = params
  const { isNew } = state.location.state || false
  const { isDrawerActive } = state.location.state || false
  const { cachedLocations } = state.location.state || []
  const { cachedAccounts } = state.location.state || []

  const [activeOrder, setActiveOrder] = useState("")
  const [pageFields, setPageFields] = useState(orderDetailFields)
  const [data, setData] = useState()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [newOrder, setNewOrder] = useState(false)
  const [loading, setLoading] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [tab, setTab] = useState("BASIC_INFO")
  const [addRelatedValue, setAddRelatedValue] = useState()
  const [pageSuccess, setPageSuccess] = useState(false)
  const [pageError, setPageError] = useState(false)
  const [isRelatedActive, setIsRelatedActive] = useState(false)
  

  useEffect(() => {
    checkForNew(isDrawerActive, isNew)
    setLoading(true)
    fetchOrder()
  }, [])

  useEffect(() => {
    fetchOrder()
    handleInitialFieldMapping("LocationName", locations, pageFields)
    handleInitialFieldMapping("Vendor", vendorList, pageFields)
    handleInitialFieldMapping("Status", orderStatusType, pageFields)
    handleInitialFieldMapping("Type", orderType, pageFields)
    handleInitialFieldMapping("AssetID", services, pageFields)
  },[loading])
  
  useEffect(() => {
    
    handleSetLastUpdatedFields()
    handleInitialFieldMapping("LocationName", locations, pageFields)
    handleInitialFieldMapping("Vendor", vendorList, pageFields)
    handleInitialFieldMapping("Status", orderStatusType, pageFields)
    handleInitialFieldMapping("Type", orderType, pageFields)
    
  },[updated])

  const checkForNew = (isDrawerActive, isNew) => {
    isDrawerActive === "true" ? setIsDrawerOpen(true) : ""
    isNew === "true" ? setNewOrder(true) : ""
  }
  
  useEffect(()=> {
    newOrder === true ?
    setData({...data, ['CompanyID']: currentCompanyID, ['CompanyName']: currentCompany}) : ""
    console.log(data)
  },[newOrder])

  

  const handleInitialFieldMapping = (field, value, arr) => {
    const indexRef = arr.findIndex(i => i.dataField === field)
    arr[indexRef] = {...arr[indexRef], inputSource: value}
    console.log(arr)
  }

  const handleSetLastUpdatedFields = () => {
    setActiveOrder({
      ...activeOrder,  
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

  const fetchOrder = async() => {
   
    const orderRef = await db.collection("Orders").doc(params.id).get()
    
    const data = await orderRef.data()
    const id = await orderRef.id
    setActiveOrder({id: id, ...data})
    setData(data)
    setLoading(false)
  }

  const handleSubmit = async(e) => {
    try {
      newOrder  === true ?
      await db.collection("Orders").doc().set(data) : 
      await db.collection("Orders").doc(activeOrder.id).update(data)
      setPageSuccess("Order Added")
    } catch {
      setPageError("Error Adding Order")
    } 
    setNewOrder(false) 
    setUpdated(true)
    setIsDrawerOpen(!isDrawerOpen)
  }

  const handleToggle = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const handlePageSuccess = () => {
    setPageSuccess(true)
    setTimeout(() => {setPageSuccess(false)}, 3000)
  }

const handleChange = (e) => {
  
  const {name, value} = e.target
  setActiveOrder({...activeOrder, [name]: value})
  setData({...data, [name]: value})
}

const handleAddRelatedValue = (e) => {
  console.log(e)
  setAddRelatedValue(e)
}

const handleRelatedSelectChange = (e, relatedDataField) => {
  e.preventDefault()
  const selectedValue = e.target.options[e.target.selectedIndex].text
  const id = e.target.options[e.target.selectedIndex].id
  const {name, relatedName} = relatedDataField
  const {value} = e.target
  
  console.log({[relatedName]: id, [name]: value})
  setActiveOrder({...activeOrder, [relatedName]: id, [name]: value})
  setData({...data, [relatedName]: id, [name]: value})
}

const handleSetCache = (value, setValue) => {
  setValue(value)
}

console.log(data)
  return (
    <Loading active={loading}>
      <Page title={`ORDER`} subtitle={activeOrder.OrderNum} active={activeOrder.CompanyName} status="view" handleToggle={()=> handleToggle()} pageSuccess={pageSuccess} pageError={pageError}>
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

            <div className="box p-4 is-rounded">

            {activeOrder && pageFields.map(field => 
                <>
                  {[activeOrder].map(order => 
                    <div className={field.visible != false & field.tab === tab ? "" : "is-hidden" }> 
                    <Columns options="is-mobile">
                      <Column size="is-3">

                        <div className="has-text-weight-semibold" key={field.label}>
                          
                          {field.label} 

                          {field.addBtn === true ? 
                            <AddLinkSmall onClick={(e) => handleToggleRelatedDrawer(field.relatedCollection)} /> 
                          : null}

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
                            fieldData={order}
                            relatedDataMap={
                                field.inputSource && field.inputSource.filter(item => 
                                  item[field.relatedDataField] === order.id).map(i => ({...i}))
                              }
                            toggleViewDrawer={()=>handleToggle()}
                            toggleFieldDropDown={()=>setIsRelatedActive(!isRelatedActive)}
                            isViewRelatedActive={isRelatedActive}
                            handleClick={(e)=> console.log(e)}
                            currentCompanyID={currentCompanyID}
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
                handleClose={() => setIsDrawerOpen(!isDrawerOpen)}
                handleChange={(e) => handleChange(e)}
                handleRelatedSelectChange={(e, related) => handleRelatedSelectChange(e, related)}
                pageFields={pageFields}
                active={activeOrder}
                tab={tab}
                addRelatedValue={addRelatedValue}
                handleAddRelatedValue={(e) => handleAddRelatedValue(e)}
                resetAddRelatedValue={() => setAddRelatedValue("")}
                handleUpdated={() => setUpdated(!updated)}
                currentCompany={currentCompany}
                currentCompanyID={currentCompanyID}
              />

              <DeleteButton
                colRef="Services"
                docRef={activeOrder.id}
              />

            </DrawerComponent>

            <DrawerComponent
              checked={""}
              hideBtns={true}
              direction="right"
              handleSubmit={() => handleRelatedSubmit()}
            >
              
            </DrawerComponent>
                
            
              
            
          </div></> : 
        <div className="tile warning"> No record to display </div>}    
      </Page>
    </Loading>
  )
}
export default OrderDetail