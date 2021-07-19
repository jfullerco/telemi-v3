import React, {useEffect, useState, useRef, useContext} from 'react'
import { useHistory } from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import Page from '../../Components/Page'
import Button from '../../Components/Buttons/Button'
import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'


const AddCompany = ({open}) => {
  const history = useHistory()
  const userContext = useContext(stateContext)
  const { setDataLoading } = userContext
  const { currentUser } = userContext.userSession

  const [checked, setChecked] = useState(true)
  
  const [pageError, setPageError] = useState()
  const [pageSuccess, setPageSuccess] = useState()
  
  const companyName = useRef("")

  const handleSubmit = async(e) => {

    const data = {
      Name: companyName.current.value,
      Users: [currentUser]
    }  

    try {
      await db.collection("Companies").doc().set(data)
      setPageSuccess("Company Added")
      autoClose()
    } catch {
      setPageError("Error Adding Company")
    }
  }

  const autoClose = () => {
    setTimeout(() => {history.push('/dashboard')}, 1500)
  }
  

  return (
    
    <Page subtitle="Add Company" handleSubmit={handleSubmit} status="new" handleToggleReadOnly={() => setInputReadOnly(!inputReadOnly)} pageSuccess={pageSuccess} pageError={pageError} autoClose={autoClose}>

      <form>
        <TextInput
          inputFieldLabel="Company Name"
          inputFieldRef={companyName}
        />
        <Columns options="is-mobile">

          <Column size="is-narrow">
            <Button label="Add" handleSubmit={handleSubmit} options="is-link" />
          </Column>
          <Column size="is-narrow">
            <Button label="Cancel" handleSubmit={() => history.push('/dashboard')} />
          </Column>

        </Columns>

      </form>
    </Page>
    
  )
}
export default AddCompany