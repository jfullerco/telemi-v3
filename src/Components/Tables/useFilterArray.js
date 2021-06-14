import React, { useState, useEffect } from 'react'
import SelectInputProps from '../Forms/SelectInputProps'

export const useFilterArray = ({data, colRef, filterRef}) => {
  return data.filter(e => e[colRef] == filterRef)
}

const FilterSelectInput = ({dataRef, colRef, onSelect, resetter}) => {

  const [values, setValues] = useState("")
  const [resetValues, setResetValues] = useState(dataRef)
  const [visible, setVisible] = useState(true)
  
  useEffect(()=> {
    uniqueValues(dataRef, colRef)  
  },[dataRef])

  const uniqueValues = (dataRef, colRef) => { 
    
    const valueArr = dataRef.length > 0 ? [...new Set(dataRef.map(d => d[colRef]))] : ""
    setValues(valueArr)
    
  }

  const handleReset = () => {
    e.target.value != "Reset Filter" ? (e)=>onSelect({data: dataRef, colRef: colRef, filterRef: e.target.value}) : resetter(resetValues)
  }

  return(
    <>
      <SelectInputProps
        isVisible={visible}
        onChange={(e)=>onSelect({data: dataRef, colRef: colRef, filterRef: e.target.value})}
      >
        <option>Reset Filter</option>
        {values != "" ? values.map(value => 
          <option key={value}>{value}</option>
        ) : ""}
      </SelectInputProps>
    </>
  )
}
export default FilterSelectInput