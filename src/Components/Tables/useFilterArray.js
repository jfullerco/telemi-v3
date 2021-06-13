import React, { useState, useEffect } from 'react'
import SelectInputProps from '../Forms/SelectInputProps'

export const useFilterArray = (data, colRef, filterRef) => {
  return data.filter(e => e[colRef] == filterRef)
}

const FilterSelectInput = ({dataRef, colRef}) => {

  const [values, setValues] = useState("")
  const [visible, setVisible] = useState(false)
  
  useEffect(()=> {
    uniqueValues(dataRef, colRef)
    
  },[dataRef])

  const uniqueValues = (dataRef, colRef) => { 
    
    const valueArr = dataRef.length > 0 ? [...new Set(dataRef.map(d => d[colRef]))] : ""
    setValues(valueArr)
    
  }

  return(
    <>
      <SelectInputProps
        isVisible={visible}
      >
        {values != "" ? values.map(value => 
          <option key={value}>{value}</option>
        ) : ""}
      </SelectInputProps>
    </>
  )
}
export default FilterSelectInput