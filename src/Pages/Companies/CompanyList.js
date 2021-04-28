import React, { useState, useEffect, useContext, useRef } from 'react'


import {useAuth} from '../../Contexts/AuthContext'

import {stateContext} from '../../Contexts/stateContext'

import { db } from '../../Contexts/firebase'

import AddCompany from './AddCompany'

const CompanyList = () => {

  const {currentUser} = useAuth()
  const userContext = useContext(stateContext)
  const {dataLoading} = userContext.userSession
  
  const [loading, setLoading] = useState()
  
  const [userCompanies, setUserCompanies] = useState([])
  const activeCompanyID = useRef("")
  const activeCompanyName = useRef("")
  
  const [selectedCompany, setSelectedCompany] = useState({
    id: "",
    Name: ""
  })
  const [addCompanyModalState, setAddCompanyModalState] = useState(false)

  useEffect(() => {
    userContext.userSession.currentCompany != "" ? fetchCompaniesRefresh() :
    fetchCompanies()
    setLoading(false)

  }, []) 

  useEffect(() => {
    reRender()
    userContext.setDataLoading(false)
  }, [dataLoading])

  const reRender = () => {
    dataLoading != false ? fetchCompaniesRefresh() : ""
  }

console.log(activeCompanyName.current)
  const handleChange = (e) => {
    const id = e.target.value
    const name = e.target.options[e.target.selectedIndex].text
    activeCompanyID.current = id
    activeCompanyName.current = name
    userContext.setCurrentCompanyID(id)
    userContext.setCurrentCompany(name)
    
  }
console.log({userCompanies})
  const fetchCompanies = async() => {
   
    const companiesRef = await db.collection("Companies").where("Users", "array-contains", currentUser).get()

    const initialCompanyRef = await db.collection("Companies").where("Users", "array-contains", currentUser).limit(1).get()

    const initialCompanyID = initialCompanyRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    userContext.setCurrentCompanyID(initialCompanyID[0].id)
    userContext.setCurrentCompany(initialCompanyID[0].Name)
    userContext.setDataLoading(false)

    const companies = companiesRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setUserCompanies(companies)
    setLoading(false)

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
  
  return (
    <>
    {addCompanyModalState != false ? <AddCompany /> : ""}
    <div className="field has-addons has-addons-centered">
    <div className="control is-expanded">
      <div className="select is-rounded is-fullwidth">
        <select onChange={handleChange}>
          {userContext.userSession.currentCompanyID != "" ? <option value={userContext.userSession.currentCompanyID}>{userContext.userSession.currentCompany}</option> : ""}
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
        {
           
          <button className="button is-black is-rounded" onClick={toggleAddCompany}>  
            Add Company
          </button> 
         }
        </div>
    
    </div>
    </>
  )
}

export default CompanyList
