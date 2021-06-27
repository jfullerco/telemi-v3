import React, { useState, useEffect, useContext, useRef } from 'react'

import {useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'

import { db } from '../../Contexts/firebase'

import SelectInputProps from '../../Components/Forms/SelectInputProps'
import CompanyDropDown from '../../Components/DropDowns/CompanyDropDown'
import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'
import Button from '../../Components/Buttons/Button'




const CompanyList = () => {

  const history = useHistory()

  const userContext = useContext(stateContext)
  const {dataLoading, currentUser, currentCompany, companies} = userContext.userSession
  
  const [selectedCompany, setSelectedCompany] = useState({
    id: "",
    Name: ""
  })
  const [active, setActive] = useState(false)
  
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

  const handleChange = ({id, name}) => {
    userContext.setDataLoading(true)
    activeCompanyID.current = id
    activeCompanyName.current = name
    userContext.setCurrentCompanyID(id)
    userContext.setCurrentCompany(name)
    userContext.setDataLoading(false)
    setActive(!active)
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

  const toggleDropdown = () => {
    setActive(!active)
  }

  const handleAddCompany = () => {
    history.push("/addcompany")
  }
  
  return (

    <>
      {
        userContext.userSession.userType != "User" ? 
        <>

                  <CompanyDropDown 
                    isActive={active}
                    handleClick={handleChange}
                    handleToggle={()=> toggleDropdown()}
                    companies={companies}
                    currentCompany={currentCompany}
                  />
        
        </>
        : <span className="title is-5 has-text-black">{userContext.userSession.currentCompany}</span>
      }
    </>
  )
}

export default CompanyList
