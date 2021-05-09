import React, { useState, useEffect, useContext, useRef } from 'react'

import {useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'

import { db } from '../../Contexts/firebase'



const CompanyList = () => {

  const userContext = useContext(stateContext)
  const history = useHistory()
  const {dataLoading, currentUser} = userContext.userSession
  
  const [userCompanies, setUserCompanies] = useState([])
  const [selectedCompany, setSelectedCompany] = useState({
    id: "",
    Name: ""
  })
  const [toggleCompanyList, setToggleCompanyList] = useState(false)

  const activeCompanyID = useRef("")
  const activeCompanyName = useRef("")

  const isUserLoggedIn = currentUser != undefined ? currentUser : ""

  useEffect(() => {
    
    fetchCompanies()
  }, [isUserLoggedIn]) 

  useEffect(() => {
    reRender()
    userContext.setDataLoading(false)
  }, [dataLoading])

  const reRender = () => {
    dataLoading != false ? fetchCompaniesRefresh() : ""
  }

  const handleChange = (e) => {
    userContext.setDataLoading(true)
    const id = e.target.value
    const name = e.target.options[e.target.selectedIndex].text
    activeCompanyID.current = id
    activeCompanyName.current = name
    userContext.setCurrentCompanyID(id)
    userContext.setCurrentCompany(name)
    userContext.setDataLoading(false)
  }

  const fetchCompanies = async() => {
   
    const companiesRef = await db.collection("Companies").where("Users", "array-contains", currentUser).get()

    const initialCompanyRef = await db.collection("Companies").where("Users", "array-contains", currentUser).limit(1).get()
    
    const initialCompanyID = initialCompanyRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    userContext.setCurrentCompanyID(initialCompanyID[0].id)
    userContext.setCurrentCompany(initialCompanyID[0].Name)
    userContext.setDataLoading(false)

    const companies = companiesRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setUserCompanies(companies)

  }

  const fetchCompaniesRefresh = async() => {
   
    const companiesRef = await db.collection("Companies").where("Users", "array-contains", currentUser).get()

    userContext.setDataLoading(false)

    const companies = companiesRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setUserCompanies(companies)
    setLoading(false)

  }

  const toggleAddCompany = () => {
    
    setAddCompanyModalState(!addCompanyModalState)
  }

  const handleAddCompany = () => {
    history.push("/addcompany")
  }

  const handleToggleCompanyList = () => {
    setToggleCompanyList(!toggleCompanyList)
  }
  
  return (
    <>
    {toggleCompanyList != false ? 
    <>
      <div className="field has-addons has-addons-centered">
        <div className="control is-expanded">
          <div className="select is-rounded is-fullwidth">
            <select onChange={handleChange}>
            <option></option>
            {(userCompanies != "" && dataLoading != true) ? userCompanies.map(company => (
            <option key={company.id} value={company.id} name={company.Name} >
              {company.Name}
              
            </option>
          )) : (
            <option>Add a Company</option>
          )}
        </select>
      </div>
      </div>
        <div className="control">
        
           <button className="button is-black is-rounded" onClick={handleChangeActiveCompany}>  
            Switch
          </button>
           
         
        </div>
        <div className="control">
          <button className="button is-rounded is-small" onClick={handleAddCompany}>  
            Add Company
          </button>
        </div>
    </div>
    </> : "" }
    </>
  )
}

export default CompanyList
