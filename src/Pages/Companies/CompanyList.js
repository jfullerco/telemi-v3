import React, { useState, useEffect, useContext, useRef } from 'react'

import {useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'

import { db } from '../../Contexts/firebase'

import SelectInputProps from '../../Components/Forms/SelectInputProps'



const CompanyList = () => {

  const userContext = useContext(stateContext)
  const history = useHistory()
  const {dataLoading, currentUser} = userContext.userSession
  
  const [userCompanies, setUserCompanies] = useState([])
  const [selectedCompany, setSelectedCompany] = useState({
    id: "",
    Name: ""
  })
  

  const activeCompanyID = useRef("")
  const activeCompanyName = useRef("")

  const isUserLoggedIn = currentUser != undefined ? currentUser : ""

  useEffect(() => {
    
  }, [isUserLoggedIn]) 

  useEffect(() => {
    
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

  const handleChangeActiveCompany = () => {

  }
  
  return (

    <>
      {
        userContext.userSession.userType != "User" ? 
        <>
        
        <SelectInputProps 
              fieldLabel=""
              fieldInitialValue={userContext.userSession.currentCompanyID}
              fieldInitialOption={""}
              fieldIDRef={activeCompanyID}
              onChange={handleChange}>
                {userContext.userSession.companies != "" ? 
                  userContext.userSession.companies.map(company => (
                    <option value={company.id} key={company.id}> 
                    {company.Name}</option>
                )) : (
                  <option></option>
                )}
            </SelectInputProps>
        
        </>
        : <span className="title is-5 has-text-black">{userContext.userSession.currentCompany}</span>
      }
    </>
  )
}

export default CompanyList
