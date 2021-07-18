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

  const { 
    setCurrentCompany,
    setCurrentCompanyID,
    setDataLoading } = userContext

  const { 
    dataLoading,
    currentUser,
    userType,
    companies, 
    currentCompany, 
    currentCompanyID } = userContext.userSession
  
  const [selectedCompany, setSelectedCompany] = useState({
    id: "",
    Name: ""
  })
  const [active, setActive] = useState(false)
  
  const activeCompanyID = useRef("")
  const activeCompanyName = useRef("")

  const isUserLoggedIn = currentUser != undefined ? currentUser : ""
  const isUserAdmin = isUserLoggedIn && userType === "Admin" ? true : false
  
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
    setCurrentCompanyID(id)
    setCurrentCompany(name)
    setDataLoading(false)
    setActive(!active)
  }

  const fetchCompanies = async() => {
    
    isUserAdmin != true ?
      companiesRef = await db.collection("Companies").where("Users", "array-contains", currentUser).get() : 
      companiesRef = await db.collection("Companies").get()

    const companies = companiesRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    
    setCurrentCompanyID(companies[0].id)
    setCurrentCompany(companies[0].Name)
    setDataLoading(false)
    setUserCompanies(companies)

  }

  const fetchCompaniesRefresh = async() => {
    isUserAdmin === true ? 
      companiesRef = await db.collection("Companies").get() :
      companiesRef = await db.collection("Companies").where("Users", "array-contains", currentUser).get() 

      const snapshot = companiesRef.docs.map(doc => ({id: doc.id, ...doc.data()}))

    setDataLoading(false)
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
        userType === "Admin" ? 
        <>

                  <CompanyDropDown 
                    isActive={active}
                    handleClick={handleChange}
                    handleToggle={()=> toggleDropdown()}
                    companies={companies}
                    currentCompany={currentCompany}
                  />
        
        </>
        : <span className="title is-size-4 has-text-black">{currentCompany}</span>
      }
    </>
  )
}

export default CompanyList
