import React, {useEffect, useState, useRef, useContext, forwardRef} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../Contexts/firebase'
import {stateContext} from '../Contexts/stateContext'

import TextBox from '../Components/Forms/TextInput'
import TextArea from '../Components/Forms/TextArea'
import SelectInputProps from '../Components/Forms/SelectInputProps'
import TextInputAC from '../Components/Forms/TextInputAC'
import DrawerPage from '../Components/DrawerPage'
import Columns from '../Components/Layout/Columns'
import Column from '../Components/Layout/Column'


const QuickAdd = ({
  colRef,
  dataField,
  label,
  handleRelatedSubmit,
  handleRelatedInputChange,
  
  handleClose,
}) => {


  console.log(colRef,
    dataField,
    label,
    handleRelatedSubmit,
    handleRelatedInputChange,
  
    handleClose)
  

  
  

  return (
    <DrawerPage title="Quick Add" handleSubmit={handleRelatedSubmit} pageError={pageError} pageSuccess={pageSuccess} status="new" backbtn="hide" handleClose={()=>handleClose(false)}>
       
      <form>

          
          <TextBox title={label && label} name={dataField} value={""} fieldChanged={(e)=>handleRelatedInputChange(e)} />
          

          
          
      </form>

        
    </DrawerPage>
      
  )
}
export default QuickAdd