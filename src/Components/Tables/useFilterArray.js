import React, { useState, useEffect } from 'react'
import SelectInputProps from '../Forms/SelectInputProps'

export const useFilterArray = (data, colRef, filterRef) => {
  return data.filter(e => e[colRef] == filterRef)
}

const FilterSelectInput = ({dataRef, colRef}) => {

  const [values, setValues] = useState("")
  

  useEffect(()=> {
    uniqueValues(dataRef, colRef)
    
  },[dataRef])

  const uniqueValues = (dataRef, colRef) => { 
    console.log(colRef)
    const valueArr = dataRef.length > 0 ? [...new Set(dataRef.map(d => d[colRef]))] : ""
    setValues(valueArr)
    
  }

  return(
    <>
      <SelectInputProps>
        {values != "" ? values.map(value => 
          <option key={value}>{value}</option>
        ) : ""}
      </SelectInputProps>
    </>
  )
}
export default FilterSelectInput