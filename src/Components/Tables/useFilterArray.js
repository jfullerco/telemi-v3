import React, { useState, useEffect, useRef } from 'react'
import SelectInputProps from '../Forms/SelectInputProps'

export const useFilterArray = ({data, colRef, filterRef}) => {
  return data.filter(e => e[colRef] == filterRef)
}

const FilterSelectInput = ({dataRef, colRef, onSelect, onReset}) => {

  const [values, setValues] = useState("")
  const [initialArr, setInitialArr] = useState()
  const [isFiltered, setIsFiltered] = useState(false)
  const [visible, setVisible] = useState(true)
  
  useEffect(()=> {

    handleBackupArr(dataRef)
    uniqueValues(dataRef, colRef)
     
  },[dataRef])
  

  const handleBackupArr = (dataRef) => {
    const backupArr = isFiltered != true & dataRef.length > 0 ? setInitialArr(dataRef) : ""
  }

  const uniqueValues = (dataRef, colRef) => { 
    
    const valueArr = dataRef.length > 0 ? [...new Set(dataRef.map(d => d[colRef]))] : ""
    
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
    
  }

  return(
    <>
    
      <SelectInputProps
        isVisible={visible}
        size="is-small"
        onChange={(e)=>handleSelectFilter(e)}
      >
        {isFiltered != true ? 
          <option>Reset Filter</option> : 
          <option></option>
        }
        {values != "" ? values.map(value => 
          <option key={value}>{value}</option>
        ) : ""}
      </SelectInputProps>
    </>
  )
}
export default FilterSelectInput