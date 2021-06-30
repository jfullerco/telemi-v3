import React, { useState, useEffect, useRef } from 'react'
import SelectInputProps from '../Forms/SelectInputProps'

import { BsFillFunnelFill, BsXCircleFill } from 'react-icons/bs'

export const useFilterArray = ({data, colRef, filterRef}) => {
  return data.filter(e => e[colRef] == filterRef)
}

const FilterSelectInput = ({dataRef, colRef, onSelect, onReset, isFilterable}) => {

  const [values, setValues] = useState("")
  const [initialArr, setInitialArr] = useState()
  const [isFiltered, setIsFiltered] = useState(false)
  const [visible, setVisible] = useState(false)
  
  useEffect(()=> {

    handleBackupArr(dataRef)
    uniqueValues(dataRef, colRef)
     
  },[dataRef])

  const handleBackupArr = (dataRef, initialArr) => {
    const backupArr = isFiltered != true & dataRef.length > 0 ? setInitialArr(dataRef) : ""
  }

  const uniqueValues = (dataRef, colRef) => { 
    const valueArr = dataRef && dataRef.length > 0 ? [...new Set(dataRef.map(d => d[colRef]))] : ""
    setValues(valueArr)
  }

  const handleSelectFilter = (e) => {
    const {value} = e.target
    console.log(value)
    value != "Reset Filter" ? onSelect({data: dataRef, colRef: colRef, filterRef: value}) : handleResetArr(initialArr)
    setIsFiltered(true)
  }

  const handleResetArr = () => {
    onReset(initialArr)
    setIsFiltered(false)
    setVisible(!visible)
  }

  return(
    <>
      {isFilterable && isFilterable != false ? 
      visible != true ? 
      <a className="has-text-weight-small has-text-black ml-2" onClick={()=> setVisible(!visible)}><BsFillFunnelFill /></a> : 
      <a className="has-text-weight-small has-text-black ml-2" onClick={()=> handleResetArr()}><BsXCircleFill /></a> : ""}
      {isFiltered === false ?
      <SelectInputProps
        isVisible={visible}
        size="is-small"
        onChange={(e)=>handleSelectFilter(e)}
      >
        {isFiltered != false ? 
          <option>Reset Filter</option> : ""
        }
        {values != "" ? values.map(value => 
          <option key={value}>{value}</option>
        ) : ""}
      </SelectInputProps> :
      ""}
    </>
  )
}
export default FilterSelectInput