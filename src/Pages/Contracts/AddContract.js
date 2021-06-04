import React, {useState, useEffect, useContext, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'

import TextInput from '../../Components/Forms/TextInput'
import SelectInput from '../../Components/Forms/SelectInput'
import Page from '../../Components/Page'

const AddContract = () => {
  const history = useHistory()
  const userContext = useContext(stateContext)
  const {serviceTypes, accessTypes, serviceStatusType} = userContext
  const {currentCompanyID, currentCompany, currentUser} = userContext.userSession

  const [pageSuccess, setPageSuccess] = useState()
  const [pageError, setPageError] = useState()
  
  const contractName = useRef("")
  const contractVendor = useRef("")
  const contractDate = useRef("")
  const contractTerm = useRef("")
  const contractFile = useRef("")
  
  

  const [activeContract, setActiveContract] = useState("")


  const handleSubmit = async() => {
    const data = {
      Vendor: contractVendor.current.value,
      Date: contractDate.current.value,
      Term: contractTerm.current.value,
      File: contractFile.current,
      CompanyID: currentCompanyID,
      CompanyName: currentCompany,
      LastUpdatedBy: currentUser,
      LastUpdated: Date()
      
    }  
    console.log(data)
    const res = await db.collection("Contracts").doc().set(data)
    userContext.setDataLoading(true)
    autoClose()
  }

  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1000)
  }

  const handleFileChange = async(e) => {
    const file = e.target.files[0]
    const imageRef = store.storage().ref(currentCompanyID).child(`${contractName.current.value}'-'${currentCompanyName}`)
    await imageRef.put(file)
    contractFile.current = await imageRef.getDownloadURL() 
  }
console.log(contractFile.current)

  return (
      <Page title="Add Contract" handleSubmit={handleSubmit} pageSuccess={pageSuccess} pageError={pageError} autoClose={autoClose}>
      {userContext && userContext.userSession != undefined ?
          <form>

            <TextInput 
              inputFieldLabel="Name"
              inputFieldRef={contractName}
              inputFieldValue={activeContract.Name}
            />
            
            <TextInput 
              inputFieldLabel="Vendor"
              inputFieldRef={contractVendor}
              inputFieldValue={activeContract.Vendor}
            />

            <TextInput 
              inputFieldLabel="Date Signed"
              inputFieldRef={contractDate}
              inputFieldValue={activeContract.Date}
            />
            
            <TextInput 
              inputFieldLabel="Term"
              inputFieldRef={contractTerm}
              inputFieldValue={activeContract.Term}
            />

            <div className="file is-boxed">
            <label className="file-label">
              <input className="file-input" type="file" name="resume" ref={contractFile} onChange={(e)=>handleFileChange(e)}/>
              <span className="file-cta">
                <span className="file-icon">
                  <i className="faUpload"></i>
                </span>
                <span className="file-label">Choose a file...</span>
              </span>
            </label>
            </div>

            <p className="title has-text-black" id="Accounts">Accounts</p>
  
          </form>

    : <div className="tile warning"> No record to display</div>}    
    </Page>
  )
}
export default AddContract