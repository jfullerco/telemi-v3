import React, {useEffect, useState, useRef, useContext, forwardRef} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../Contexts/firebase'
import {stateContext} from '../Contexts/stateContext'

import TextBox from '../Components/Forms/TextBox'
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
}) => {

  return (
    <>
    <TextBox title={label && label} name={dataField}  fieldChanged={(e)=>handleRelatedInputChange(e)} /> 
    </>
  )
}
export default QuickAdd